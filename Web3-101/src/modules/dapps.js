/**
 * dApps Module: The Full Stack
 */

export async function init(container) {
    container.innerHTML = `
        <div class="interactive-card">
            <div class="card-title">
                The dApp Architecture
                <span class="tag">System Design</span>
            </div>
            
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 3rem; position: relative; padding: 0 1rem;">
                <!-- Connection Lines -->
                <div style="position: absolute; top: 50%; left: 0; right: 0; height: 1px; background: var(--border-color); z-index: 1;"></div>
                
                <div class="stack-node" id="node-ui">
                    <div class="node-icon">💻</div>
                    <div class="node-label">Frontend (UI)</div>
                </div>
                
                <div class="stack-node" id="node-wallet">
                    <div class="node-icon">🦊</div>
                    <div class="node-label">Wallet (Signer)</div>
                </div>

                <div class="stack-node" id="node-provider">
                    <div class="node-icon">🔌</div>
                    <div class="node-label">Provider (RPC)</div>
                </div>

                <div class="stack-node" id="node-chain">
                    <div class="node-icon">⛓️</div>
                    <div class="node-label">Blockchain</div>
                </div>
            </div>

            <div id="flow-explanation" class="result-area" style="min-height: 5rem; border-left-color: var(--accent-blue)">
                <p>Click "Run Transaction" to see how data flows from your browser to the chain.</p>
            </div>

            <div style="margin-top: 2rem; text-align: center;">
                <button id="run-flow" class="btn">Run Transaction Flow</button>
            </div>
        </div>

        <style>
            .stack-node {
                background: var(--sidebar-bg);
                border: 1px solid var(--border-color);
                border-radius: 1rem;
                padding: 1.5rem 1rem;
                width: 120px;
                text-align: center;
                z-index: 2;
                transition: var(--transition);
            }
            .stack-node.active {
                border-color: var(--accent-blue);
                box-shadow: 0 0 20px rgba(59, 130, 246, 0.4);
                transform: scale(1.1);
            }
            .node-icon {
                font-size: 2rem;
                margin-bottom: 0.5rem;
            }
            .node-label {
                font-size: 0.7rem;
                font-weight: 600;
                text-transform: uppercase;
                color: var(--text-secondary);
            }
        </style>
    `;

    const nodes = {
        ui: document.getElementById('node-ui'),
        wallet: document.getElementById('node-wallet'),
        provider: document.getElementById('node-provider'),
        chain: document.getElementById('node-chain')
    };
    const explanation = document.getElementById('flow-explanation');
    const runBtn = document.getElementById('run-flow');

    async function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

    async function runFlow() {
        runBtn.disabled = true;

        // Step 1: UI
        Object.values(nodes).forEach(n => n.classList.remove('active'));
        nodes.ui.classList.add('active');
        explanation.innerHTML = "<strong>1. User interaction:</strong> You click a button in your browser to 'Buy an NFT'.";
        await sleep(2000);

        // Step 2: Wallet
        nodes.ui.classList.remove('active');
        nodes.wallet.classList.add('active');
        explanation.innerHTML = "<strong>2. Signing:</strong> Your Wallet (like MetaMask) asks you to sign the transaction with your <strong>Private Key</strong>.";
        await sleep(2000);

        // Step 3: Provider
        nodes.wallet.classList.remove('active');
        nodes.provider.classList.add('active');
        explanation.innerHTML = "<strong>3. Broadcasting:</strong> The signed transaction is sent to a Node Provider (RPC) which broadcasts it to the network.";
        await sleep(2000);

        // Step 4: Chain
        nodes.provider.classList.remove('active');
        nodes.chain.classList.add('active');
        explanation.innerHTML = "<strong>4. Settlement:</strong> Miners include your transaction in a block. The NFT is now yours, permanently recorded on the chain!";
        await sleep(3000);

        Object.values(nodes).forEach(n => n.classList.remove('active'));
        explanation.innerHTML = "Transaction Complete! The chain state has been updated across thousands of nodes worldwide.";
        runBtn.disabled = false;
    }

    runBtn.addEventListener('click', runFlow);
}
