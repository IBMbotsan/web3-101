/**
 * Blockchain Module: The Immutable Chain
 */

export async function init(container) {
    container.innerHTML = `
        <div class="theory-section">
            <h3><span class="icon">🔗</span> The Rookie's View: The Tower of Glue</h3>
            <p>
                A blockchain isn't just a list; it's a <strong>Chain</strong>. Each block is "glued" to the one before it using its hash.
            </p>
            <div style="display: flex; gap: 1rem; margin-bottom: 1rem; background: rgba(59, 130, 246, 0.05); padding: 15px; border-radius: 8px; font-size: 0.85rem; border: 1px solid rgba(59, 130, 246, 0.2);">
                <div style="font-size: 1.5rem;">🗼</div>
                <div>
                    Imagine a stack of glass blocks. Each block has the fingerprint of the block below it engraved on its bottom. If you swap a block at the bottom, the fingerprints on <strong>every block above it</strong> will no longer match. The whole tower turns red!
                </div>
            </div>
            <div class="rookie-tip">
                <span class="rookie-tip-icon">💡</span>
                <div>
                    <strong>Pro Tip:</strong> This is why it's called "Immutable" (unchangeable). To change one transaction from 3 years ago, you would have to redo the "Work" for every single block created since then.
                </div>
            </div>
        </div>

        <div class="chain-wrapper" style="overflow-x: auto; padding-bottom: 2rem; margin-bottom: 2rem; -webkit-overflow-scrolling: touch;">
            <div id="blocks-row" style="display: flex; gap: 1.5rem; padding: 10px;">
                <!-- Blocks will be injected here -->
            </div>
        </div>

        <div class="interactive-card" style="background: #020617; border-style: dashed;">
            <div class="card-title">Network Controller</div>
            <p style="color: var(--text-secondary); font-size: 0.9rem;">
                Try changing the <strong>Data</strong> in Block #1 and watch the "Prev Hash" links break in the blocks to the right.
            </p>
            <div style="margin-top: 1.5rem; display: flex; flex-wrap: wrap; gap: 1rem;">
                <button id="add-block" class="btn" style="background: var(--accent-blue)">+ DATA BLOCK</button>
                <button id="reset-chain" class="btn" style="background: transparent; border: 1px solid var(--border-color)">WIPE & RESET</button>
            </div>
        </div>
    `;

    const blocksRow = document.getElementById('blocks-row');
    const addBtn = document.getElementById('add-block');
    const resetBtn = document.getElementById('reset-chain');

    let chainData = [
        { index: 1, nonce: 452, data: "Genesis Block", prev: "0000000000" },
        { index: 2, nonce: 891, data: "Alice pays Bob 10 BTC", prev: "" },
        { index: 3, nonce: 120, data: "Bob pays Charlie 2 BTC", prev: "" }
    ];

    async function renderChain() {
        blocksRow.innerHTML = '';
        let lastHash = "00000000000000000000000000000000";

        for (let i = 0; i < chainData.length; i++) {
            const block = chainData[i];
            const currentPrev = (i === 0) ? block.prev : lastHash;
            const currentHash = await sha256(block.index + block.nonce + block.data + currentPrev);
            const isValid = currentHash.startsWith("00"); // Simpler difficulty for visual chain

            const blockEl = document.createElement('div');
            blockEl.className = 'interactive-card';
            blockEl.style.minWidth = '300px';
            blockEl.style.borderTop = `4px solid ${isValid ? 'var(--accent-green)' : 'var(--accent-orange)'}`;

            blockEl.innerHTML = `
                <div style="display: flex; justify-content: space-between; margin-bottom: 1rem;">
                    <span style="font-weight: bold">BLOCK #${block.index}</span>
                    <span style="font-size: 0.7rem; color: ${isValid ? 'var(--accent-green)' : 'var(--accent-orange)'}">
                        ${isValid ? '● VALID' : '● INVALID'}
                    </span>
                </div>
                
                <div class="input-group">
                    <label>Nonce</label>
                    <input type="text" class="block-nonce-field" data-index="${i}" value="${block.nonce}">
                </div>
                
                <div class="input-group">
                    <label>Data</label>
                    <textarea class="block-data-field" data-index="${i}" rows="2">${block.data}</textarea>
                </div>

                <div style="font-size: 0.65rem; color: var(--text-secondary); margin-bottom: 0.5rem;">
                    <div>PREV: <span style="font-family: var(--font-mono)">${currentPrev.substring(0, 20)}...</span></div>
                    <div style="margin-top: 0.25rem;">HASH: <span style="font-family: var(--font-mono); color: ${isValid ? 'var(--text-primary)' : 'var(--accent-orange)'}">${currentHash.substring(0, 20)}...</span></div>
                </div>

                <button class="mine-block-btn btn" data-index="${i}" style="width: 100%; font-size: 0.75rem; padding: 0.5rem; ${isValid ? 'display:none' : ''}">
                    Fix Block (Mine)
                </button>
            `;

            blocksRow.appendChild(blockEl);
            lastHash = currentHash;
        }

        // Add event listeners to new elements
        document.querySelectorAll('.block-nonce-field').forEach(el => {
            el.addEventListener('input', (e) => {
                chainData[e.target.dataset.index].nonce = e.target.value;
                renderChain();
            });
        });

        document.querySelectorAll('.block-data-field').forEach(el => {
            el.addEventListener('input', (e) => {
                chainData[e.target.dataset.index].data = e.target.value;
                renderChain();
            });
        });

        document.querySelectorAll('.mine-block-btn').forEach(el => {
            el.addEventListener('click', async (e) => {
                const idx = e.target.dataset.index;
                e.target.textContent = "Mining...";
                e.target.disabled = true;

                let nonce = 0;
                let found = false;
                const prevHash = (idx == 0) ? chainData[0].prev : await calculatePrevHash(idx);

                while (!found) {
                    const hash = await sha256(chainData[idx].index + nonce + chainData[idx].data + prevHash);
                    if (hash.startsWith("00")) {
                        chainData[idx].nonce = nonce;
                        found = true;
                    }
                    nonce++;
                    if (nonce % 1000 === 0) await new Promise(r => setTimeout(r, 0));
                }
                renderChain();
            });
        });
    }

    async function calculatePrevHash(index) {
        let lastHash = chainData[0].prev;
        for (let i = 0; i < index; i++) {
            lastHash = await sha256(chainData[i].index + chainData[i].nonce + chainData[i].data + lastHash);
        }
        return lastHash;
    }

    addBtn.addEventListener('click', () => {
        const lastBlock = chainData[chainData.length - 1];
        chainData.push({
            index: lastBlock.index + 1,
            nonce: 0,
            data: "New Transaction",
            prev: ""
        });
        renderChain();
    });

    resetBtn.addEventListener('click', () => {
        chainData = [
            { index: 1, nonce: 452, data: "Genesis Block", prev: "00000000000000000000000000000000" },
            { index: 2, nonce: 891, data: "Alice pays Bob 10 BTC", prev: "" },
            { index: 3, nonce: 120, data: "Bob pays Charlie 2 BTC", prev: "" }
        ];
        renderChain();
    });

    renderChain();
}

async function sha256(message) {
    const msgBuffer = new TextEncoder().encode(message);
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}
