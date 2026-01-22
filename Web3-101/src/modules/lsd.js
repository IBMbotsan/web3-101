/**
 * Liquid Staking (LSD) Module
 */

export async function init(container) {
    container.innerHTML = `
        <div class="theory-section">
            <h3><span class="icon">🎟️</span> The Rookie's View: The Coat Check</h3>
            <p>
                Staking normally locks your money in a vault. But <strong>Liquid Staking</strong> lets you have your cake and eat it too.
            </p>
            <div style="display: flex; gap: 1rem; margin-bottom: 1rem; background: rgba(59, 130, 246, 0.05); padding: 15px; border-radius: 8px; font-size: 0.85rem; border: 1px solid rgba(59, 130, 246, 0.2);">
                <div style="font-size: 1.5rem;">🧥</div>
                <div>
                    Imagine giving your heavy coat (ETH) to a <strong>Coat Check</strong>. They give you a small plastic token (stETH). You can't wear the coat while eating, but you can trade the token with someone else for their dessert! Later, you give the token back to the desk to get your coat.
                </div>
            </div>
            <div class="rookie-tip">
                <span class="rookie-tip-icon">💡</span>
                <div>
                    <strong>Pro Tip:</strong> Tokens like <strong>stETH</strong> (from Lido) or <strong>rETH</strong> (from Rocket Pool) allow you to earn staking rewards (~4% per year) while still using that money to buy other things or lend it out in DeFi!
                </div>
            </div>
        </div>

        <div class="interactive-card">
            <div class="card-title">
                Staking Mobility Comparison
                <span class="tag">Efficiency</span>
            </div>
            
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.5rem;">
                <!-- Traditional Staking -->
                <div style="background: rgba(255, 255, 255, 0.05); border: 1px solid var(--border-color); border-radius: 1rem; padding: 1.5rem; text-align: center; display: flex; flex-direction: column; justify-content: space-between;">
                    <div>
                        <h4 style="margin-bottom: 0.5rem; font-size: 1rem;">Direct Staking</h4>
                        <div style="font-size: 2rem; font-weight: bold; margin-bottom: 1rem; color: var(--text-secondary);" id="locked-eth">0 ETH</div>
                        <div style="padding: 0.5rem; background: #ef4444; color: white; border-radius: 8px; font-size: 0.7rem; margin-bottom: 1rem; font-weight: bold;">🔒 ASSETS LOCKED</div>
                    </div>
                    <p style="font-size: 0.75rem; color: var(--text-secondary); margin-bottom: 1.5rem;">Assets are stuck in the validator. Unstaking takes days.</p>
                    <button id="stake-direct" class="btn" style="width: 100%; justify-content: center;">Stake 32 ETH</button>
                </div>

                <!-- Liquid Staking -->
                <div style="background: rgba(59, 130, 246, 0.05); border: 1px solid var(--accent-blue); border-radius: 1rem; padding: 1.5rem; text-align: center; display: flex; flex-direction: column; justify-content: space-between;">
                    <div>
                        <h4 style="color: var(--accent-blue); margin-bottom: 0.5rem; font-size: 1rem;">Liquid Staking</h4>
                        <div style="display: flex; flex-direction: column; gap: 4px; margin-bottom: 1rem;">
                            <div style="font-size: 1.2rem; font-weight: bold; text-decoration: line-through; opacity: 0.5;" id="lsd-eth">0 ETH</div>
                            <div style="font-size: 2.2rem; font-weight: bold; color: var(--accent-blue);" id="lsd-steth">0 stETH</div>
                        </div>
                        <div style="padding: 0.5rem; background: var(--accent-green); color: white; border-radius: 8px; font-size: 0.7rem; margin-bottom: 1rem; font-weight: bold;">🌊 ASSETS LIQUID</div>
                    </div>
                    <p style="font-size: 0.75rem; color: var(--text-secondary); margin-bottom: 1.5rem;">You get stETH. You can sell or use it immediately.</p>
                    <button id="stake-liquid" class="btn" style="width: 100%; background: var(--accent-blue); justify-content: center;">Stake any amount</button>
                </div>
            </div>

            <div id="lsd-feedback" class="result-area" style="margin-top: 1.5rem; min-height: 4rem; border-left-color: var(--accent-blue); background: #020617; border-style: dashed;">
                <p>Choose a method to see how capital mobility changes.</p>
            </div>
        </div>
    `;

    const lockedEth = document.getElementById('locked-eth');
    const lsdEth = document.getElementById('lsd-eth');
    const lsdStEth = document.getElementById('lsd-steth');
    const stakeDirect = document.getElementById('stake-direct');
    const stakeLiquid = document.getElementById('stake-liquid');
    const feedback = document.getElementById('lsd-feedback');

    stakeDirect.addEventListener('click', () => {
        lockedEth.textContent = "32 ETH";
        feedback.innerHTML = "<strong>Locked!</strong> Your 32 ETH is now securing the network. You are earning ~4% APR, but you cannot use these funds in DeFi until you unstake (takes days/weeks).";
        stakeDirect.disabled = true;
        stakeDirect.textContent = "Staking...";
    });

    stakeLiquid.addEventListener('click', () => {
        const amount = 32;
        lsdEth.textContent = "0 ETH";
        lsdStEth.textContent = amount + " stETH";
        feedback.innerHTML = "<strong>Liquid!</strong> You deposited 32 ETH into a pool. You received 32 stETH. While your original ETH earns rewards, you can take this stETH and use it as collateral for a loan or swap it back to ETH instantly!";
        stakeLiquid.disabled = true;
        stakeLiquid.textContent = "Staking...";
    });
}
