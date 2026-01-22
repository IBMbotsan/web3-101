/**
 * Merkle Trees Module: Efficient Data Verification
 */

export async function init(container) {
    let txs = ["Tx 1: Pay 5", "Tx 2: Pay 10", "Tx 3: Pay 2", "Tx 4: Pay 8"];

    container.innerHTML = `
        <div class="theory-section">
            <h3><span class="icon">🌳</span> The Rookie's View: The Tournament Bracket</h3>
            <p>
                Imagine a giant sports tournament with 64 teams. If you want to prove who won the finals (the <strong>Root</strong>), do you need to watch all 63 games?
            </p>
            <div style="display: flex; gap: 1rem; margin-bottom: 1rem; background: rgba(255,255,255,0.05); padding: 15px; border-radius: 8px; font-size: 0.85rem;">
                <div style="font-size: 1.5rem;">🏆</div>
                <div>
                    No! You only need to see the "winners" in your specific path to the final. A <strong>Merkle Tree</strong> does this for transactions. It bundles thousands of transactions into one single "Root" hash.
                </div>
            </div>
            <div class="rookie-tip">
                <span class="rookie-tip-icon">💡</span>
                <div>
                    <strong>Pro Tip:</strong> This is how your phone can verify a transaction without downloading the whole 500GB blockchain. It just asks the network for the "Path" (Proof) leading to the current Block Root.
                </div>
            </div>
        </div>

        <div class="interactive-card">
            <div class="card-title">
                Merkle Tree Visualizer
                <span class="tag">Data Integrity</span>
            </div>
            
            <div id="tree-container" style="margin-bottom: 2.5rem; position: relative; height: 280px; padding-top: 10px; overflow: hidden; border: 1px solid var(--border-color); border-radius: 1rem; background: rgba(0,0,0,0.2);">
                <!-- Tree visualization will be rendered here -->
            </div>

            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); gap: 1rem;">
                ${txs.map((tx, i) => `
                    <div class="input-group" style="margin-bottom: 0;">
                        <label style="font-size: 0.7rem;">Transaction ${i + 1}</label>
                        <input type="text" class="tx-input" data-index="${i}" value="${tx}" style="font-size: 0.8rem; padding: 0.5rem;">
                    </div>
                `).join('')}
            </div>
        </div>

        <style>
            .merkle-node {
                position: absolute;
                background: var(--sidebar-bg);
                border: 1px solid var(--border-color);
                border-radius: 4px;
                padding: 4px 8px;
                font-family: var(--font-mono);
                font-size: 0.65rem;
                width: 100px;
                text-align: center;
                transition: all 0.3s ease;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }
            .merkle-node.root { border-color: var(--accent-orange); }
            .merkle-node.level-1 { border-color: var(--accent-purple); }
            .merkle-node.leaf { border-color: var(--accent-blue); }
            
            .merkle-line {
                position: absolute;
                background: var(--border-color);
                height: 1px;
                z-index: 0;
            }
        </style>
    `;

    const treeContainer = document.getElementById('tree-container');
    const inputs = document.querySelectorAll('.tx-input');

    async function updateTree() {
        const currentTxs = Array.from(inputs).map(i => i.value);

        // Level 2: Leaves (Hashes of transactions)
        const leafHashes = await Promise.all(currentTxs.map(tx => sha256(tx)));

        // Level 1: Combined hashes
        const combined1 = await sha256(leafHashes[0] + leafHashes[1]);
        const combined2 = await sha256(leafHashes[2] + leafHashes[3]);

        // Level 0: Root
        const root = await sha256(combined1 + combined2);

        renderTree(leafHashes, [combined1, combined2], root);
    }

    function renderTree(leaves, level1, root) {
        treeContainer.innerHTML = '';

        // Positions
        const width = treeContainer.offsetWidth;
        const rootPos = { x: width / 2 - 50, y: 0 };
        const l1Pos = [
            { x: width / 4 - 50, y: 100 },
            { x: (3 * width) / 4 - 50, y: 100 }
        ];
        const leafPos = [
            { x: width / 8 - 50, y: 200 },
            { x: (3 * width) / 8 - 50, y: 200 },
            { x: (5 * width) / 8 - 50, y: 200 },
            { x: (7 * width) / 8 - 50, y: 200 }
        ];

        // Draw Nodes
        const nodes = [
            { h: root, x: rootPos.x, y: rootPos.y, cls: 'root' },
            { h: level1[0], x: l1Pos[0].x, y: l1Pos[0].y, cls: 'level-1' },
            { h: level1[1], x: l1Pos[1].x, y: l1Pos[1].y, cls: 'level-1' },
            ...leaves.map((h, i) => ({ h, x: leafPos[i].x, y: leafPos[i].y, cls: 'leaf' }))
        ];

        nodes.forEach(node => {
            const el = document.createElement('div');
            el.className = `merkle-node ${node.cls}`;
            el.style.left = node.x + 'px';
            el.style.top = node.y + 'px';
            el.innerHTML = `<strong>${node.cls.toUpperCase()}</strong><br>${node.h.substring(0, 10)}...`;
            treeContainer.appendChild(el);
        });
    }

    inputs.forEach(input => {
        input.addEventListener('input', updateTree);
    });

    updateTree();

    // Add resize listener
    window.addEventListener('resize', updateTree);
}

async function sha256(message) {
    const msgBuffer = new TextEncoder().encode(message);
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}
