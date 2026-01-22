/**
 * Proof of Stake Module
 */

export async function init(container) {
    container.innerHTML = `
        <div class="theory-section">
            <h3><span class="icon">💰</span> The Rookie's View: The Shareholders Meeting</h3>
            <p>
                Proof of Stake is like owning shares in a company.
            </p>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; margin-bottom: 1rem;">
                <div style="background: rgba(16, 185, 129, 0.05); padding: 12px; border-radius: 8px; font-size: 0.85rem; border: 1px solid rgba(16, 185, 129, 0.2);">
                    <strong>Staking:</strong> You lock up your coins to show you care about the network. The more you lock up, the better your chance of being the "Manager" for the next block.
                </div>
                <div style="background: rgba(239, 68, 68, 0.05); padding: 12px; border-radius: 8px; font-size: 0.85rem; border: 1px solid rgba(239, 68, 68, 0.2);">
                    <strong>Slashing:</strong> If you try to cheat, the network takes a massive chunk of your locked coins. You lose real money, so it's not worth it!
                </div>
            </div>
            <div class="rookie-tip">
                <span class="rookie-tip-icon">💡</span>
                <div>
                    <strong>Pro Tip:</strong> Ethereum switched from PoW to PoS in 2022 (The Merge). This reduced its energy consumption by <strong>99.9%</strong>—it's now as green as a typical web app!
                </div>
            </div>
        </div>

        <div class="interactive-card">
            <div class="card-title">
                Staking Dashboard (PoS)
                <span class="tag">Security via Capital</span>
            </div>
            
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 2rem;">
                <div>
                    <div class="input-group">
                        <label>Your Personal Stake (ETH)</label>
                        <input type="number" id="stake-amount" value="32" style="font-weight: bold; color: var(--accent-green);">
                        <small style="color: var(--text-secondary); font-size: 0.7rem;">Minimum for a full node is 32 ETH.</small>
                    </div>
                    <div class="input-group">
                        <label>Total Network Stake</label>
                        <input type="text" value="1,000,000 ETH" readonly style="background: rgba(0,0,0,0.2);">
                    </div>
                    <button id="stake-btn" class="btn" style="width: 100%; height: 50px; background: var(--accent-green); justify-content: center; font-weight: bold;">START VALIDATING</button>
                </div>

                <div style="background: #020617; border: 1px solid var(--border-color); border-radius: 1rem; padding: 1.5rem; display: flex; flex-direction: column; justify-content: center; align-items: center;">
                    <span style="font-size: 0.7rem; color: var(--text-secondary)">Your Chance:</span>
                    <div id="chance-display" style="font-size: 2.5rem; font-weight: bold; color: var(--accent-green)">0.0032%</div>
                    <p style="font-size: 0.8rem; margin-top: 1rem; text-align: center; color: var(--text-secondary)">If you act maliciously, your stake is <strong>Slashed</strong>.</p>
                </div>
            </div>

            <div id="validator-log" class="result-area" style="margin-top: 2rem; border-left-color: var(--accent-purple); height: 150px; overflow-y: auto; display: block;">
                <span class="result-label">Validator Network Log</span>
                <div id="log-content" style="font-size: 0.8rem;">Ready to validate...</div>
            </div>
        </div>
    `;

    const stakeInput = document.getElementById('stake-amount');
    const stakeBtn = document.getElementById('stake-btn');
    const chanceDisplay = document.getElementById('chance-display');
    const logContent = document.getElementById('log-content');

    stakeInput.addEventListener('input', () => {
        const val = parseFloat(stakeInput.value) || 0;
        const chance = (val / 1000000 * 100).toFixed(4);
        chanceDisplay.textContent = chance + "%";
    });

    stakeBtn.addEventListener('click', async () => {
        stakeBtn.disabled = true;
        stakeBtn.textContent = "Staking Active...";

        let counter = 0;
        while (counter < 20) {
            counter++;
            const isWinner = Math.random() < (parseFloat(stakeInput.value) / 1000000);
            const time = new Date().toLocaleTimeString();

            if (isWinner) {
                logContent.innerHTML = `<div style="color: var(--accent-green)">[${time}] YOU WERE CHOSEN! Validating block... Reward: 0.05 ETH</div>` + logContent.innerHTML;
                break;
            } else {
                logContent.innerHTML = `<div>[${time}] Node 0x${Math.random().toString(16).slice(2, 8)} chosen. Syncing...</div>` + logContent.innerHTML;
            }

            await new Promise(r => setTimeout(r, 1500));
        }

        stakeBtn.disabled = false;
        stakeBtn.textContent = "Stake Assets";
    });
}
