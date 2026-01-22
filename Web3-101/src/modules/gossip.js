/**
 * P2P Gossip Protocol Module
 */

export async function init(container) {
    container.innerHTML = `
        <div class="theory-section">
            <h3><span class="icon">📢</span> The Rookie's View: Schoolyard Secrets</h3>
            <p>
                In a decentralized world, there is no "Central Radio Station" that broadcasts transactions. Instead, nodes use a <strong>Gossip Protocol</strong>.
            </p>
            <div style="display: flex; gap: 1rem; margin-bottom: 1rem; background: rgba(255,255,255,0.05); padding: 15px; border-radius: 8px; font-size: 0.85rem;">
                <div style="font-size: 1.5rem;">🗣️</div>
                <div>
                    It's like telling a secret to 3 friends. They each tell 3 other friends. By the "6th degree," almost everyone in the school knows the secret. <strong>Efficiency through cooperation!</strong>
                </div>
            </div>
            <div class="rookie-tip">
                <span class="rookie-tip-icon">💡</span>
                <div>
                    <strong>Pro Tip:</strong> Gossip protocols are designed to be "Anti-Fragile." Even if half the nodes in the world go offline, the message will still find a way to propagate through the remaining connections.
                </div>
            </div>
        </div>

        <div class="interactive-card">
            <div class="card-title">
                Network Topology Simulator
                <span class="tag">Interactive</span>
            </div>
            
            <div style="background: #020617; border: 1px solid var(--border-color); border-radius: 1rem; padding: 1rem; position: relative; overflow: hidden; min-height: 350px;">
                <div id="p2p-nodes" style="position: relative; height: 300px; width: 100%; max-width: 400px; margin: 0 auto;">
                    <!-- Nodes will be placed here -->
                </div>

                <div style="text-align: center; margin-top: 1rem;">
                    <button id="reset-gossip" class="btn" style="font-size: 0.75rem;">Reset & Reconnect Nodes</button>
                    <p style="font-size: 0.7rem; color: var(--text-secondary); margin-top: 1rem;">Click any node to "Broadcast a Secret"!</p>
                </div>
            </div>

            <div id="gossip-stats" class="result-area" style="margin-top: 1.5rem; display: flex; justify-content: space-around; align-items: center; flex-wrap: wrap; gap: 1rem;">
                <div style="text-align: center;">
                    <div style="font-size: 0.7rem; color: var(--text-secondary)">NODES REACHED</div>
                    <div style="font-size: 1.5rem; font-weight: bold; color: var(--accent-blue)" id="reached-count">0 / 12</div>
                </div>
                <div style="text-align: center;">
                    <div style="font-size: 0.7rem; color: var(--text-secondary)">PROPAGATION SPEED</div>
                    <div style="font-size: 1.5rem; font-weight: bold; id="prop-time" color: var(--text-primary)">0 ms</div>
                </div>
            </div>
        </div>

        <style>
            .p2p-node {
                position: absolute;
                width: 30px;
                height: 30px;
                background: #1e293b;
                border: 2px solid var(--border-color);
                border-radius: 50%;
                cursor: pointer;
                transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 0.6rem;
                color: var(--text-secondary);
                z-index: 2;
            }
            .p2p-node.active {
                background: var(--accent-blue);
                border-color: #93c5fd;
                box-shadow: 0 0 15px var(--accent-blue);
                color: white;
            }
            .p2p-connection {
                position: absolute;
                background: var(--border-color);
                height: 1px;
                transform-origin: 0 0;
                z-index: 1;
                opacity: 0.3;
            }
            .p2p-connection.active {
                background: var(--accent-blue);
                height: 2px;
                opacity: 0.8;
                box-shadow: 0 0 5px var(--accent-blue);
            }
        </style>
    `;

    const nodeContainer = document.getElementById('p2p-nodes');
    const reachedCountEl = document.getElementById('reached-count');
    const propTimeEl = document.getElementById('prop-time');
    const resetBtn = document.getElementById('reset-gossip');

    const numNodes = 12;
    const nodes = [];
    const connections = [];

    // Initialize nodes
    function createNodes() {
        nodeContainer.innerHTML = '';
        nodes.length = 0;
        connections.length = 0;

        for (let i = 0; i < numNodes; i++) {
            const angle = (i / numNodes) * Math.PI * 2;
            const radius = 100;
            const x = Math.cos(angle) * radius + 180; // offset to center
            const y = Math.sin(angle) * radius + 150;

            const node = document.createElement('div');
            node.className = 'p2p-node';
            node.style.left = x + 'px';
            node.style.top = y + 'px';
            node.textContent = i + 1;
            node.dataset.id = i;

            const nodeData = { id: i, x: x + 15, y: y + 15, active: false, neighbors: [], el: node };
            nodes.push(nodeData);
            nodeContainer.appendChild(node);

            node.addEventListener('click', () => startGossip(i));
        }

        // Randomly connect nodes
        for (let i = 0; i < numNodes; i++) {
            for (let j = i + 1; j < numNodes; j++) {
                // Connect if within range or just random
                const dist = Math.sqrt(Math.pow(nodes[i].x - nodes[j].x, 2) + Math.pow(nodes[i].y - nodes[j].y, 2));
                if (dist < 120 || Math.random() < 0.1) {
                    nodes[i].neighbors.push(j);
                    nodes[j].neighbors.push(i);
                    drawConnection(nodes[i], nodes[j]);
                }
            }
        }
    }

    function drawConnection(n1, n2) {
        const dx = n2.x - n1.x;
        const dy = n2.y - n1.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const angle = Math.atan2(dy, dx) * 180 / Math.PI;

        const line = document.createElement('div');
        line.className = 'p2p-connection';
        line.style.width = dist + 'px';
        line.style.left = n1.x + 'px';
        line.style.top = n1.y + 'px';
        line.style.transform = `rotate(${angle}deg)`;

        nodeContainer.appendChild(line);
        connections.push({ n1: n1.id, n2: n2.id, el: line });
    }

    let activeCount = 0;
    let startTime = 0;

    async function startGossip(nodeId) {
        if (activeCount > 0) return; // already running

        startTime = Date.now();
        activeCount = 0;
        nodes.forEach(n => { n.active = false; n.el.classList.remove('active'); });
        connections.forEach(c => c.el.classList.remove('active'));

        propagateNode(nodeId);
    }

    async function propagateNode(nodeId) {
        const node = nodes[nodeId];
        if (node.active) return;

        node.active = true;
        node.el.classList.add('active');
        activeCount++;
        reachedCountEl.textContent = `${activeCount} / ${numNodes}`;

        propTimeEl.textContent = (Date.now() - startTime) + " ms";

        // Gossip to neighbors with random delay
        node.neighbors.forEach(neighborId => {
            setTimeout(() => {
                // Highlight connection
                connections.forEach(c => {
                    if ((c.n1 === nodeId && c.n2 === neighborId) || (c.n1 === neighborId && c.n2 === nodeId)) {
                        c.el.classList.add('active');
                    }
                });
                propagateNode(neighborId);
            }, 300 + Math.random() * 500);
        });
    }

    resetBtn.addEventListener('click', createNodes);
    createNodes();
}
