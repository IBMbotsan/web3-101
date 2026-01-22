/**
 * Testnets & Faucets Module
 */

export async function init(container) {
    container.innerHTML = `
        <div class="theory-section">
            <h3><span class="icon">🧪</span> The Rookie's View: The Monopoly Money</h3>
            <p>
                Building on a blockchain is scary because mistakes are expensive. <strong>Testnets</strong> are the solution.
            </p>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; margin-bottom: 1rem;">
                <div style="background: rgba(255,255,255,0.05); padding: 12px; border-radius: 8px; font-size: 0.85rem;">
                    <strong>Mainnet:</strong> The real world. If you deploy a bug here, you lose real money. Every transaction costs several dollars.
                </div>
                <div style="background: rgba(168, 85, 247, 0.05); padding: 12px; border-radius: 8px; font-size: 0.85rem; border: 1px solid rgba(168, 85, 247, 0.2);">
                    <strong>Sepolia (Testnet):</strong> A sandbox. The ETH here is "Play Money". It looks and acts real, but it's free and valueless.
                </div>
            </div>
            <div class="rookie-tip">
                <span class="rookie-tip-icon">💡</span>
                <div>
                    <strong>Pro Tip:</strong> To get this Play Money, you use a <strong>Faucet</strong>. It's a website that sends you a tiny bit of test ETH once a day so you can practice your coding for free!
                </div>
            </div>
        </div>

        <div class="interactive-card">
            <div class="card-title">
                Environment Selection Lab
                <span class="tag">Safe Practice</span>
            </div>
            
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.5rem;">
                <!-- Mainnet View -->
                <div class="network-card" id="mainnet-card">
                    <div class="network-header">ETHEREUM MAINNET (REAL $)</div>
                    <div style="padding: 1.5rem; text-align: center;">
                        <div style="font-size: 0.75rem; color: var(--text-secondary); margin-bottom: 4px;">REAL BALANCE</div>
                        <div style="font-size: 2.2rem; font-weight: bold; color: #94a3b8">0.00 ETH</div>
                        <div style="font-size: 0.8rem; color: var(--text-secondary); margin-top: 4px;">Market Value: $0.00</div>
                        <button class="btn disabled" style="width: 100%; margin-top: 1.5rem; background: #1e293b; border: 1px solid #334155; height: 45px; cursor: not-allowed; justify-content: center;">Insufficient Funds</button>
                    </div>
                </div>

                <!-- Testnet View -->
                <div class="network-card active" id="testnet-card" style="border-width: 2px;">
                    <div class="network-header" style="background: var(--accent-purple)">SEPOLIA TESTNET (FREE)</div>
                    <div style="padding: 1.5rem; text-align: center;">
                        <div style="font-size: 0.75rem; color: var(--text-secondary); margin-bottom: 4px;">UTILITY BALANCE</div>
                        <div id="test-eth-bal" style="font-size: 2.2rem; font-weight: bold; color: var(--accent-purple)">0.00 ETH</div>
                        <div style="font-size: 0.8rem; color: var(--text-secondary); margin-top: 4px;">Market Value: $0.00 (Free)</div>
                        <button id="faucet-btn" class="btn" style="width: 100%; margin-top: 1.5rem; background: var(--accent-purple); height: 45px; justify-content: center;">CLAIM TEST ETH</button>
                    </div>
                </div>
            </div>

            <div id="testnet-feedback" class="result-area" style="margin-top: 2rem; min-height: 5rem;">
                <p>Developers use <strong>Faucets</strong> to get free test tokens. Request some Sepolia ETH to start your journey.</p>
            </div>
        </div>

        <style>
            .network-card {
                background: #020617;
                border: 1px solid var(--border-color);
                border-radius: 12px;
                overflow: hidden;
                transition: var(--transition);
                opacity: 0.6;
            }
            .network-card.active {
                opacity: 1;
                border-color: var(--accent-purple);
                box-shadow: 0 0 20px rgba(168, 85, 247, 0.1);
            }
            .network-header {
                background: #1e293b;
                padding: 8px;
                font-size: 0.7rem;
                font-weight: bold;
                text-align: center;
                color: white;
            }
        </style>
    `;

    const faucetBtn = document.getElementById('faucet-btn');
    const balEl = document.getElementById('test-eth-bal');
    const feedback = document.getElementById('testnet-feedback');

    let bal = 0.0;

    faucetBtn.addEventListener('click', async () => {
        faucetBtn.disabled = true;
        faucetBtn.textContent = "Verifying captcha...";

        await new Promise(r => setTimeout(r, 1000));
        faucetBtn.textContent = "Processing tx...";

        await new Promise(r => setTimeout(r, 1000));

        bal += 0.5;
        balEl.textContent = bal.toFixed(2) + " ETH";
        feedback.innerHTML = `<h4 style="color:var(--accent-purple)">Faucet Success! ✅</h4>
                             <p style="font-size:0.8rem">Your Sepolia wallet is now funded. You can use this ETH to deploy contracts and interact with dApps on the testnet without spending real money.</p>`;

        faucetBtn.textContent = "Wait 24h to reuse";
    });
}
