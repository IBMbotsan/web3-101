/**
 * Contract Deployment Logic Module
 */

export async function init(container) {
    container.innerHTML = `
        <div class="theory-section">
            <h3><span class="icon">👶</span> The Rookie's View: The Birth Certificate</h3>
            <p>
                How does a contract "appear" on the blockchain? It's not uploaded like a file to a server.
            </p>
            <div style="display: flex; gap: 1rem; margin-bottom: 1rem; background: rgba(245, 158, 11, 0.05); padding: 15px; border-radius: 8px; font-size: 0.85rem; border: 1px solid rgba(245, 158, 11, 0.2);">
                <div style="font-size: 1.5rem;">🏥</div>
                <div>
                    Imagine the <strong>0x0 Address</strong> is a Universal Hospital. When you send your code's "DNA" (the Bytecode) to this address, the hospital creates a new "Baby" (the Contract) and gives it its own house (a unique Address).
                </div>
            </div>
            <div class="rookie-tip">
                <span class="rookie-tip-icon">💡</span>
                <div>
                    <strong>Pro Tip:</strong> The contract's address isn't random! It's calculated using your address + your <strong>Nonce</strong>. This means if you know your math, you can predict exactly where your contract will "live" before you even send it!
                </div>
            </div>
        </div>

        <div class="interactive-card">
            <div class="card-title">
                Contract Genesis Visualizer
                <span class="tag">Address 0x0</span>
            </div>
            
            <div style="background: rgba(0,0,0,0.2); border: 1px solid var(--border-color); border-radius: 1rem; padding: 1.5rem; margin-bottom: 1.5rem;">
                <div style="display: flex; flex-wrap: wrap; gap: 1.5rem; align-items: center; justify-content: center; margin-bottom: 2rem;">
                    <div style="text-align: center; flex: 1; min-width: 140px;">
                        <div style="font-size: 0.7rem; color: var(--text-secondary); margin-bottom: 4px;">CREATOR (SOURCE)</div>
                        <div style="font-family: var(--font-mono); font-size: 0.8rem; background: rgba(255,255,255,0.05); padding: 6px; border-radius: 4px;">0x71...8976f</div>
                        <div style="font-size: 0.65rem; color: var(--accent-blue); margin-top: 4px; font-weight: bold;">TX NONCE: <span id="nonce-val">5</span></div>
                    </div>
                    <div style="font-size: 1.5rem; color: var(--text-secondary);">➡️</div>
                    <div style="text-align: center; flex: 1; min-width: 140px;">
                        <div style="font-size: 0.7rem; color: var(--text-secondary); margin-bottom: 4px;">TARGET (0x0)</div>
                        <div style="font-family: var(--font-mono); font-size: 0.8rem; color: #ef4444; background: rgba(239, 68, 68, 0.1); padding: 6px; border-radius: 4px;">0x000...000</div>
                        <div style="font-size: 0.65rem; color: #ef4444; margin-top: 4px; font-weight: bold;">(Creation Mode)</div>
                    </div>
                </div>

                <div id="deploy-anim" style="height: 100px; display: flex; align-items: center; justify-content: center; margin-bottom: 1rem; border: 1px dashed var(--border-color); border-radius: 8px;">
                    <button id="deploy-btn" class="btn" style="background: var(--accent-orange)">🚀 BROADCAST DEPLOYMENT TX</button>
                    <div id="loading-spinner" style="display: none; font-size: 1.5rem;" class="spin">⚙️</div>
                </div>

                <div id="deployment-result" style="display: none; padding: 1rem; background: rgba(16, 185, 129, 0.1); border: 1px solid var(--accent-green); border-radius: 8px;">
                    <div style="font-size: 0.7rem; color: var(--accent-green); margin-bottom: 4px;">NEW CONTRACT ADDRESS:</div>
                    <div id="final-address" style="font-family: var(--font-mono); font-size: 0.9rem; font-weight: bold; word-break: break-all;">0x...</div>
                    <p style="font-size: 0.7rem; color: var(--text-secondary); margin-top: 10px;">Derived using: <strong>keccak256(rlp.encode([sender, nonce]))</strong></p>
                </div>
            </div>
        </div>

        <style>
            .spin { animation: rotation 2s infinite linear; }
            @keyframes rotation { from { transform: rotate(0deg); } to { transform: rotate(359deg); } }
        </style>
    `;

    const deployBtn = document.getElementById('deploy-btn');
    const spinner = document.getElementById('loading-spinner');
    const result = document.getElementById('deployment-result');
    const addressEl = document.getElementById('final-address');
    const nonceEl = document.getElementById('nonce-val');

    let nonce = 5;

    deployBtn.addEventListener('click', async () => {
        deployBtn.style.display = 'none';
        spinner.style.display = 'block';

        await new Promise(r => setTimeout(r, 2000));

        spinner.style.display = 'none';
        result.style.display = 'block';

        // Randomly generate a "deterministic" looking address
        const newAddress = "0x" + Math.random().toString(16).slice(2, 42);
        addressEl.textContent = newAddress;

        nonce++;
        nonceEl.textContent = nonce;
    });
}
