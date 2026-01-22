/**
 * Restaking Module: Shared Security (EigenLayer)
 */

export async function init(container) {
    container.innerHTML = `
        <div class="theory-section">
            <h3><span class="icon">🛡️</span> The Rookie's View: The Shared Bodyguard</h3>
            <p>
                If you want to start a new blockchain or a data service, you need an army of "Bodyguards" to protect it. That's very expensive.
            </p>
            <div style="display: flex; gap: 1rem; margin-bottom: 1rem; background: rgba(245, 158, 11, 0.05); padding: 15px; border-radius: 8px; font-size: 0.85rem; border: 1px solid rgba(245, 158, 11, 0.2);">
                <div style="font-size: 1.5rem;">💂</div>
                <div>
                    Ethereum already has a massive army of <strong>Bodyguards</strong> (Validators). <strong>Restaking</strong> allows those same guards to protect your new network <em>at the same time</em>. They get paid twice, and you get the world's best security from Day 1. It's like your neighbor's security team also keeping an eye on your house for a small extra fee!
                </div>
            </div>
            <div class="rookie-tip">
                <span class="rookie-tip-icon">💡</span>
                <div>
                    <strong>Pro Tip:</strong> This is the core idea of <strong>EigenLayer</strong>. It turns Ethereum's massive "Proof of Stake" into a reusable pool of trust that any other app can borrow.
                </div>
            </div>
        </div>

        <div class="interactive-card">
            <div class="card-title">
                Restaking & Shared Security
                <span class="tag">EigenLayer</span>
            </div>
            
            <div style="display: flex; flex-direction: column; gap: 1.5rem;">
                
                <!-- Base Layer -->
                <div style="padding: 1.2rem; background: rgba(59, 130, 246, 0.03); border: 2px solid var(--accent-blue); border-radius: 1rem; text-align: center;">
                    <div style="font-weight: bold; color: var(--accent-blue); margin-bottom: 4px; font-size: 0.8rem; letter-spacing: 1px;">BASE LAYER: ETHEREUM BEACON CHAIN</div>
                    <div style="font-size: 0.75rem; color: var(--text-secondary)">Security provided by <span style="color: var(--text-primary); font-weight: bold;">32M+ Staked ETH</span></div>
                </div>

                <!-- Middle Layer -->
                <div style="padding: 1.2rem; background: rgba(0,0,0,0.2); border: 1px dashed rgba(245,158,11,0.3); border-radius: 12px; position: relative; text-align: center;">
                    <div style="color: var(--accent-orange); font-weight: bold; font-size: 0.7rem; letter-spacing: 1px; margin-bottom: 1rem;">EIGENLAYER (RE-USE OF TRUST)</div>
                    <div style="display: flex; gap: 1rem; justify-content: center; align-items: center;">
                        <div id="restake-node" style="width: 45px; height: 45px; background: var(--accent-orange); border-radius: 12px; display: flex; align-items: center; justify-content: center; opacity: 0.2; transition: all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275); font-size: 1.5rem;">💎</div>
                        <div style="text-align: left;">
                            <div style="font-size: 0.75rem; font-weight: bold;">Restaking Status</div>
                            <div style="font-size: 0.65rem; color: var(--text-secondary);">Using stETH to secure new services</div>
                        </div>
                    </div>
                </div>

                <!-- Top Layer: AVSs -->
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem;">
                    <div class="avs-card" id="avs-1" style="display: flex; flex-direction: column; justify-content: center;">
                        <div style="font-size: 0.65rem; color: var(--text-secondary); margin-bottom: 4px;">AVS (ORACLE NETWORK)</div>
                        <div style="font-weight: bold; color: var(--accent-green);">+0.5% Bonus Yield</div>
                    </div>
                    <div class="avs-card" id="avs-2" style="display: flex; flex-direction: column; justify-content: center;">
                        <div style="font-size: 0.65rem; color: var(--text-secondary); margin-bottom: 4px;">AVS (DATA LAYER)</div>
                        <div style="font-weight: bold; color: var(--accent-green);">+1.2% Bonus Yield</div>
                    </div>
                </div>

                <button id="restake-btn" class="btn" style="background: var(--accent-orange); width: 100%; margin-top: 1rem;">DEPOSIT stETH TO RESTAKE</button>
            </div>

            <div id="restake-feedback" class="result-area" style="margin-top: 2rem; min-height: 5rem;">
                <p>Use your staked assets to secure multiple networks and earn "points" or yield.</p>
            </div>
        </div>

        <style>
            .avs-card {
                padding: 15px;
                background: rgba(255, 255, 255, 0.05);
                border: 1px solid var(--border-color);
                border-radius: 8px;
                text-align: center;
                transition: var(--transition);
            }
            .avs-card.active { border-color: var(--accent-orange); background: rgba(245, 158, 11, 0.1); }
        </style>
    `;

    const restakeBtn = document.getElementById('restake-btn');
    const node = document.getElementById('restake-node');
    const avs1 = document.getElementById('avs-1');
    const avs2 = document.getElementById('avs-2');
    const feedback = document.getElementById('restake-feedback');

    restakeBtn.addEventListener('click', async () => {
        restakeBtn.disabled = true;
        restakeBtn.textContent = "Negotiating Security...";

        node.style.opacity = "1";
        node.style.transform = "scale(1.2)";

        await new Promise(r => setTimeout(r, 1000));

        avs1.classList.add('active');
        avs2.classList.add('active');

        feedback.innerHTML = `<h4>Restaking Active! 🚀</h4>
                             <p style="font-size:0.8rem">You have committed your stETH to protect these two Actively Validated Services (AVSs). You are now earning Ethereum rewards + AVS rewards.</p>`;

        restakeBtn.textContent = "Restaked Successfully";
    });
}
