/**
 * Stablecoins Module: Maintaining the Peg
 */

export async function init(container) {
    container.innerHTML = `
        <div class="theory-section">
            <h3><span class="icon">⚖️</span> The Rookie's View: The Rubber Band</h3>
            <p>
                Bitcoin can drop 20% in a day. That makes it hard to use for groceries. <strong>Stablecoins</strong> solve this by staying at exactly <strong>$1.00</strong>.
            </p>
            <div style="display: flex; gap: 1rem; margin-bottom: 1rem; background: rgba(16, 185, 129, 0.05); padding: 15px; border-radius: 8px; font-size: 0.85rem; border: 1px solid rgba(16, 185, 129, 0.2);">
                <div style="font-size: 1.5rem;">💸</div>
                <div>
                    Imagine the price is tied to a $1.00 pole by a <strong>Rubber Band</strong>. If the price tries to fly away, the band pulls it back. In the <strong>DAI</strong> model, this "band" is a pile of ETH collateral. If you don't keep enough ETH in your vault, the system sells your ETH to keep the $1.00 peg safe.
                </div>
            </div>
            <div class="rookie-tip">
                <span class="rookie-tip-icon">💡</span>
                <div>
                    <strong>Pro Tip:</strong> There are two main types. <strong>Centralized</strong> (USDC/USDT) where a company holds real $ in a bank, and <strong>Decentralized</strong> (DAI) where smart contracts hold crypto collateral on-chain.
                </div>
            </div>
        </div>

        <div class="interactive-card">
            <div class="card-title">
                Stablecoin Security Lab (CDP)
                <span class="tag">Collateral Debt</span>
            </div>
            
            <div style="background: rgba(16, 185, 129, 0.02); border: 1px solid var(--accent-green); border-radius: 1rem; padding: 1.5rem;">
                <h4 style="color: var(--accent-green); text-align: center; margin-bottom: 1.5rem; font-size: 0.9rem; letter-spacing: 1px;">YOUR DECENTRALIZED VAULT</h4>
                
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1.5rem; margin-bottom: 1.5rem;">
                    <div style="background: rgba(0,0,0,0.2); padding: 1.2rem; border-radius: 12px; border: 1px solid rgba(255,255,255,0.05);">
                        <div style="font-size: 0.7rem; color: var(--text-secondary); margin-bottom: 4px;">COLLATERAL (ETH)</div>
                        <div style="display: flex; flex-direction: column;">
                            <div style="font-size: 1.8rem; font-weight: bold; color: var(--text-primary);">1.00 ETH</div>
                            <div style="font-size: 0.85rem; color: var(--accent-green); font-weight: bold;">Value: $<span id="eth-price-s">2,000</span></div>
                        </div>
                    </div>
                    <div style="background: rgba(0,0,0,0.2); padding: 1.2rem; border-radius: 12px; border: 1px solid rgba(255,255,255,0.05);">
                        <div style="font-size: 0.7rem; color: var(--text-secondary); margin-bottom: 4px;">DEBT (MINTED STABLE)</div>
                        <div style="font-size: 1.8rem; font-weight: bold; color: var(--text-secondary);">$1,000.00</div>
                        <div style="font-size: 0.65rem; color: var(--text-secondary); margin-top: 4px;">Borrowed at 1:1 Peg</div>
                    </div>
                </div>

                <div style="margin-top: 2rem;">
                    <div style="display: flex; justify-content: space-between; font-size: 0.8rem; margin-bottom: 0.5rem;">
                        <span>Collateralization Ratio</span>
                        <span id="collateral-ratio-label" style="color: var(--accent-green); font-weight: bold;">200%</span>
                    </div>
                    <div style="height: 10px; background: #1e293b; border-radius: 5px; overflow: hidden;">
                        <div id="ratio-bar" style="width: 200%; background: var(--accent-green); height: 100%;"></div>
                    </div>
                    <p style="font-size: 0.7rem; color: var(--text-secondary); margin-top: 0.5rem;">Liquidation Threshold: 150%</p>
                </div>

                <div style="margin-top: 2rem; border-top: 1px solid var(--border-color); padding-top: 1.5rem;">
                    <label style="font-size: 0.75rem;">Simulate ETH Price Crash:</label>
                    <input type="range" id="price-slider" min="1000" max="3000" value="2000" style="width: 100%; margin-top: 0.5rem;">
                </div>
            </div>

            <div id="stable-feedback" class="result-area" style="margin-top: 1.5rem; min-height: 4rem;">
                <p>Move the slider to see how price changes affect your stablecoin's security.</p>
            </div>
        </div>

        <style>
            #ratio-bar { transition: width 0.3s ease, background-color 0.3s ease; }
        </style>
    `;

    const priceSlider = document.getElementById('price-slider');
    const ethPriceEl = document.getElementById('eth-price-s');
    const ratioLabel = document.getElementById('collateral-ratio-label');
    const ratioBar = document.getElementById('ratio-bar');
    const feedback = document.getElementById('stable-feedback');

    const debt = 1000;

    priceSlider.addEventListener('input', () => {
        const price = parseInt(priceSlider.value);
        ethPriceEl.textContent = price.toLocaleString();

        const ratio = (price / debt) * 100;
        ratioLabel.textContent = ratio.toFixed(0) + "%";

        // Visual updates
        let color = 'var(--accent-green)';
        if (ratio < 160) color = 'var(--accent-orange)';
        if (ratio < 150) color = '#ef4444';

        ratioBar.style.width = Math.min(ratio, 300) / 3 + "%";
        ratioBar.style.backgroundColor = color;
        ratioLabel.style.color = color;

        if (ratio < 150) {
            feedback.innerHTML = `<h4 style="color:#ef4444">⚠️ LIQUIDATION!</h4>
                                 <p style="font-size: 0.8rem">Your collateral value ($${price.toLocaleString()}) fell below the 150% margin requirement. A keeper bot would now auction your ETH to repay the $1,000 debt.</p>`;
        } else {
            feedback.innerHTML = `<p>Price is stable. Your vault is healthy.</p>`;
        }
    });
}
