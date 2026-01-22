/**
 * AMMs & DeFi Math Module
 */

export async function init(container) {
    container.innerHTML = `
        <div class="theory-section">
            <h3><span class="icon">🦄</span> The Rookie's View: The Magic Candy Jar</h3>
            <p>
                In a normal market, if you want to buy an Apple, you need a Seller. In DeFi, you just need a <strong>Magic Jar</strong>.
            </p>
            <div style="display: flex; gap: 1rem; margin-bottom: 1rem; background: rgba(16, 185, 129, 0.05); padding: 15px; border-radius: 8px; font-size: 0.85rem; border: 1px solid rgba(16, 185, 129, 0.2);">
                <div style="font-size: 1.5rem;">🏺</div>
                <div>
                    Imagine a jar that always has 50 Apples and 50 Oracles. If you want an Apple, you just drop an Orange into the jar and take an Apple out. The jar uses a magic math rule (<strong>x * y = k</strong>) to make sure it's never empty. You don't need a person on the other side; you just need the jar!
                </div>
            </div>
            <div class="rookie-tip">
                <span class="rookie-tip-icon">💡</span>
                <div>
                    <strong>Pro Tip:</strong> If you try to take 40 Apples at once from a jar that only has 50, the jar will demand 1,000 Oranges for them! This is called <strong>Slippage</strong>. The bigger the jar (The Liquidity), the less you pay for each swap.
                </div>
            </div>
        </div>

        <div class="interactive-card">
            <div class="card-title">
                AMM Pool Simulator
                <span class="tag">Math-Driven Liquidity</span>
            </div>
            
            <div style="background: rgba(16, 185, 129, 0.02); border: 1px solid var(--accent-green); border-radius: 1rem; padding: 1.5rem; margin-bottom: 1.5rem;">
                <h4 style="text-align: center; color: var(--accent-green); margin-bottom: 1.5rem; font-size: 0.8rem; letter-spacing: 1px;">THE LIQUIDITY POOL (x * y = k)</h4>
                
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(120px, 1fr)); gap: 1rem; align-items: center; justify-content: center; margin-bottom: 2rem;">
                    <div style="text-align: center; background: rgba(0,0,0,0.2); padding: 1rem; border-radius: 12px; border: 1px solid rgba(255,255,255,0.05);">
                        <div style="font-size: 0.65rem; color: var(--text-secondary); margin-bottom: 4px;">ETH (x)</div>
                        <div style="font-size: 1.6rem; font-weight: bold; color: var(--text-primary);" id="pool-x">100</div>
                    </div>
                    <div style="text-align: center; background: rgba(0,0,0,0.2); padding: 1rem; border-radius: 12px; border: 1px solid rgba(255,255,255,0.05);">
                        <div style="font-size: 0.65rem; color: var(--text-secondary); margin-bottom: 4px;">USDC (y)</div>
                        <div style="font-size: 1.6rem; font-weight: bold; color: var(--text-primary);" id="pool-y">200,000</div>
                    </div>
                    <div style="text-align: center; background: rgba(245, 158, 11, 0.05); padding: 1rem; border-radius: 12px; border: 1px solid rgba(245, 158, 11, 0.2);">
                        <div style="font-size: 0.65rem; color: var(--accent-orange); margin-bottom: 4px;">CONSTANT (k)</div>
                        <div style="font-size: 1rem; font-weight: bold; color: var(--accent-orange);" id="pool-k">20M</div>
                    </div>
                </div>

                <!-- Swap form -->
                <div style="background: rgba(0,0,0,0.2); padding: 1.5rem; border-radius: 0.75rem; border: 1px solid var(--border-color);">
                    <div class="input-group">
                        <label>Swap ETH for USDC</label>
                        <div style="display: flex; gap: 1rem;">
                            <input type="text" id="swap-input" value="1" style="flex: 1;">
                            <button id="run-swap" class="btn" style="background: var(--accent-green)">SWAP</button>
                        </div>
                    </div>
                    <div id="swap-details" style="font-size: 0.8rem; color: var(--text-secondary); display: none;">
                        You will receive: <strong id="swap-output" style="color: var(--text-primary)">...</strong> USDC<br>
                        Price Impact: <strong id="price-impact" style="color: #ef4444">...</strong>
                    </div>
                </div>
            </div>

            <div class="interactive-card" style="margin-top: 2rem; background: #020617;">
                <h4 style="margin-bottom: 1rem;">Current ETH Price: <span id="eth-price" style="color: var(--accent-green)">$2,000</span></h4>
                <p style="font-size: 0.85rem; color: var(--text-secondary)">
                    The price is simply <strong>Pool Y / Pool X</strong>. As you buy ETH, there is less ETH in the pool and more USDC, making the next ETH more expensive. This is <strong>Slippage</strong>.
                </p>
            </div>
        </div>
    `;

    const poolXEl = document.getElementById('pool-x');
    const poolYEl = document.getElementById('pool-y');
    const poolKEl = document.getElementById('pool-k');
    const swapInput = document.getElementById('swap-input');
    const swapBtn = document.getElementById('run-swap');
    const swapDetails = document.getElementById('swap-details');
    const swapOutput = document.getElementById('swap-output');
    const impactEl = document.getElementById('price-impact');
    const priceEl = document.getElementById('eth-price');

    let x = 100;
    let y = 200000;
    let k = x * y;

    function updateView() {
        poolXEl.textContent = x.toLocaleString(undefined, { maximumFractionDigits: 2 });
        poolYEl.textContent = y.toLocaleString(undefined, { maximumFractionDigits: 2 });
        priceEl.textContent = "$" + (y / x).toLocaleString(undefined, { minimumFractionDigits: 2 });
    }

    swapBtn.addEventListener('click', () => {
        const dx = parseFloat(swapInput.value) || 0;
        if (dx <= 0) return;

        // Formula: (x + dx) * (y - dy) = k
        // y - dy = k / (x + dx)
        // dy = y - (k / (x + dx))

        const oldPrice = y / x;
        const dy = y - (k / (x + dx));

        x += dx;
        y -= dy;

        const newPrice = y / x;
        const impact = ((newPrice - oldPrice) / oldPrice * 100).toFixed(2);

        swapOutput.textContent = dy.toLocaleString(undefined, { maximumFractionDigits: 2 });
        impactEl.textContent = impact + "%";
        swapDetails.style.display = 'block';

        updateView();

        swapBtn.textContent = "Swapped!";
        setTimeout(() => swapBtn.textContent = "SWAP", 1000);
    });

    updateView();
}
