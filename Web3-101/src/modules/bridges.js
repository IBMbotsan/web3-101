/**
 * Cross-Chain Bridges Module
 */

export async function init(container) {
    container.innerHTML = `
        <div class="theory-section">
            <h3><span class="icon">🌉</span> The Rookie's View: The Lock & Mint</h3>
            <p>
                Blockchains are like isolated islands. To move your money from Island A (Ethereum) to Island B (Solana), you can't just sail there.
            </p>
            <div style="display: flex; gap: 1rem; margin-bottom: 1rem; background: rgba(59, 130, 246, 0.05); padding: 15px; border-radius: 8px; font-size: 0.85rem; border: 1px solid rgba(59, 130, 246, 0.2);">
                <div style="font-size: 1.5rem;">🏝️</div>
                <div>
                    Imagine you put your gold in a <strong>Safe</strong> (Lock) on Island A. The safe-keeper then sends a <strong>Messenger</strong> to Island B. Island B then prints a <strong>Receipt</strong> (Mint) that is worth exactly the same. You can spend that receipt on Island B! To get your gold back, you just "burn" the receipt, and Island A unlocks your safe.
                </div>
            </div>
            <div class="rookie-tip">
                <span class="rookie-tip-icon">💡</span>
                <div>
                    <strong>Pro Tip:</strong> This is why bridges are high-risk. If a hacker breaks into the "Safe" on Island A, then all the "Receipts" on Island B become worthless paper. Always use battle-tested bridges!
                </div>
            </div>
        </div>

        <div class="interactive-card">
            <div class="card-title">
                Bridge Simulator (Lock & Mint)
                <span class="tag">Interoperability</span>
            </div>
            
            <div style="display: flex; flex-direction: column; md-flex-direction: row; gap: 1.5rem; align-items: stretch; justify-content: space-between; position: relative; background: rgba(0,0,0,0.2); padding: 1.5rem; border-radius: 1rem; border: 1px solid var(--border-color);">
                
                <!-- Chain A -->
                <div style="flex: 1; padding: 1.2rem; background: rgba(59, 130, 246, 0.03); border: 1px solid rgba(59, 130, 246, 0.2); border-radius: 12px; text-align: center; display: flex; flex-direction: column; justify-content: center;">
                    <h4 style="color: var(--accent-blue); margin-bottom: 0.5rem; font-size: 0.75rem; letter-spacing: 1px;">CHAIN A (ETHEREUM)</h4>
                    <div id="chain-a-assets" style="font-size: 1.8rem; font-weight: bold; margin-bottom: 1rem; color: var(--text-primary);">100 ETH</div>
                    <button id="bridge-lock" class="btn" style="width: 100%; justify-content: center; font-weight: bold; font-size: 0.75rem;">🌉 LOCK & BRIDGE</button>
                    <div id="a-status" style="font-size: 0.65rem; color: var(--text-secondary); margin-top: 1rem; font-family: var(--font-mono);">STATUS: READY</div>
                </div>

                <!-- Bridge Transport (Desktop Only) -->
                <div class="desktop-only" style="display: flex; flex-direction: column; justify-content: center; align-items: center; min-width: 60px;">
                    <div id="bridge-cargo" style="font-size: 1.8rem; opacity: 0; transition: all 1s cubic-bezier(0.4, 0, 0.2, 1); z-index: 10;">📦</div>
                    <div style="height: 2px; width: 100%; background: var(--border-color); margin-top: -10px;"></div>
                </div>

                <!-- Chain B -->
                <div style="flex: 1; padding: 1.2rem; background: rgba(168, 85, 247, 0.03); border: 1px solid rgba(168, 85, 247, 0.2); border-radius: 12px; text-align: center; display: flex; flex-direction: column; justify-content: center;">
                    <h4 style="color: var(--accent-purple); margin-bottom: 0.5rem; font-size: 0.75rem; letter-spacing: 1px;">CHAIN B (SOLANA)</h4>
                    <div id="chain-b-assets" style="font-size: 1.8rem; font-weight: bold; margin-bottom: 1rem; color: var(--text-secondary);">0 wETH</div>
                    <div id="b-status" style="font-size: 0.65rem; color: var(--text-secondary); margin-top: 1.5rem; font-family: var(--font-mono); height: 1.5rem;">WAITING...</div>
                </div>
            </div>

            <div id="bridge-feedback" class="result-area" style="margin-top: 2rem; min-height: 5rem;">
                <p>Transfer assets across chains using the <strong>Lock & Mint</strong> mechanism.</p>
            </div>
        </div>
    `;

    const lockBtn = document.getElementById('bridge-lock');
    const cargo = document.getElementById('bridge-cargo');
    const aAssets = document.getElementById('chain-a-assets');
    const bAssets = document.getElementById('chain-b-assets');
    const aStatus = document.getElementById('a-status');
    const bStatus = document.getElementById('b-status');
    const feedback = document.getElementById('bridge-feedback');

    lockBtn.addEventListener('click', async () => {
        lockBtn.disabled = true;

        // 1. Lock
        aStatus.innerHTML = "🔒 <strong>Locking Assets...</strong>";
        aAssets.style.opacity = "0.5";
        feedback.innerHTML = "<strong>Step 1:</strong> You sent 10 ETH to the Bridge Contract on Chain A. They are now locked in a vault.";

        await new Promise(r => setTimeout(r, 1500));

        // 2. Transport
        cargo.style.opacity = "1";
        cargo.style.transform = "translateX(150%)";
        feedback.innerHTML = "<strong>Step 2:</strong> Oracle nodes observe the lock and relay the message to Chain B.";

        await new Promise(r => setTimeout(r, 1500));

        // 3. Mint
        cargo.style.opacity = "0";
        cargo.style.transform = "translateX(0)";
        bAssets.textContent = "10 wETH";
        bAssets.style.color = "var(--accent-purple)";
        bStatus.innerHTML = "✨ <strong>Minted Wrapped ETH!</strong>";
        feedback.innerHTML = "<strong>Step 3:</strong> Chain B minted 10 'Wrapped ETH' for you. You now have the same value on Polygon!";

        lockBtn.textContent = "Bridge More Assets";
        setTimeout(() => lockBtn.disabled = false, 2000);
    });
}
