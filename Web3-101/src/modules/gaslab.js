/**
 * Gas Optimization Lab Module
 */

export async function init(container) {
    container.innerHTML = `
        <div class="theory-section">
            <h3><span class="icon">⛽</span> The Rookie's View: The Road Trip</h3>
            <p>
                Every single line of code you write on Ethereum costs "Gas". If your code is heavy, your users pay more.
            </p>
            <div style="display: flex; gap: 1rem; margin-bottom: 1rem; background: rgba(245, 158, 11, 0.05); padding: 15px; border-radius: 8px; font-size: 0.85rem; border: 1px solid rgba(245, 158, 11, 0.2);">
                <div style="font-size: 1.5rem;">🚚</div>
                <div>
                    Imagine a cross-country road trip. <strong>State Storage</strong> is like towing a 10-ton trailer; it burns a massive amount of fuel (20,000 Gas). <strong>Memory</strong> is like carrying a snack in your pocket; it's light and nearly free (3 Gas).
                </div>
            </div>
            <div class="rookie-tip">
                <span class="rookie-tip-icon">💡</span>
                <div>
                    <strong>Pro Tip:</strong> Most "Gas Optimization" is just keeping as much data as possible in <strong>Memory</strong> during a transaction and only writing to <strong>Storage</strong> at the very last second.
                </div>
            </div>
        </div>

        <div class="interactive-card">
            <div class="card-title">
                Gas Cost Lab (Storage vs Memory)
                <span class="tag">Efficiency</span>
            </div>
            
            <div style="background: rgba(0,0,0,0.2); border: 1px solid var(--border-color); border-radius: 1rem; padding: 1rem; margin-bottom: 1.5rem;">
                <h4 style="text-align: center; margin-bottom: 1.5rem; font-size: 0.9rem; color: var(--text-secondary);">Which operation burns more fuel?</h4>
                
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 1.5rem;">
                    <!-- Option A -->
                    <div style="background: rgba(239, 68, 68, 0.05); border: 1px solid rgba(239, 68, 68, 0.2); border-radius: 1rem; padding: 1.5rem; text-align: center; display: flex; flex-direction: column; justify-content: space-between;">
                        <div>
                            <h5 style="color: #ef4444; margin-bottom: 0.5rem; font-size: 0.7rem; letter-spacing: 1px;">SSTORE (STORAGE)</h5>
                            <code style="display: block; font-size: 0.75rem; background: #000; padding: 8px; border-radius: 4px; margin-bottom: 1rem;">uint balance = 100;</code>
                            <div style="font-size: 2rem; font-weight: bold; color: #ef4444; margin-bottom: 0.5rem;">20,000</div>
                            <div style="font-size: 0.6rem; color: var(--text-secondary); margin-bottom: 1.5rem;">GAS UNITS</div>
                        </div>
                        <button id="run-storage" class="btn" style="width: 100%; justify-content: center; background: #ef4444; font-weight: bold;">WRITE TO DISK</button>
                    </div>

                    <!-- Option B -->
                    <div style="background: rgba(16, 185, 129, 0.05); border: 1px solid rgba(16, 185, 129, 0.2); border-radius: 1rem; padding: 1.5rem; text-align: center; display: flex; flex-direction: column; justify-content: space-between;">
                        <div>
                            <h5 style="color: var(--accent-green); margin-bottom: 0.5rem; font-size: 0.7rem; letter-spacing: 1px;">MSTORE (MEMORY)</h5>
                            <code style="display: block; font-size: 0.75rem; background: #000; padding: 8px; border-radius: 4px; margin-bottom: 1rem;">memory uint x = 100;</code>
                            <div style="font-size: 2rem; font-weight: bold; color: var(--accent-green); margin-bottom: 0.5rem;">3</div>
                            <div style="font-size: 0.6rem; color: var(--text-secondary); margin-bottom: 1.5rem;">GAS UNITS</div>
                        </div>
                        <button id="run-memory" class="btn" style="width: 100%; justify-content: center; background: var(--accent-green); font-weight: bold;">WRITE TO RAM</button>
                    </div>
                </div>

                <div id="gas-meter" style="margin-top: 2rem; border-top: 1px solid var(--border-color); padding-top: 2rem;">
                    <div style="display: flex; justify-content: space-between; font-size: 0.8rem; margin-bottom: 0.5rem;">
                        <span>Total Gas Consumed</span>
                        <span id="gas-sum">0</span>
                    </div>
                    <div style="height: 12px; background: #1e293b; border-radius: 6px; overflow: hidden;">
                        <div id="gas-bar" style="width: 0%; background: var(--accent-orange); height: 100%; transition: width 0.3s ease;"></div>
                    </div>
                </div>
            </div>

            <div id="lab-feedback" class="result-area" style="margin-top: 1.5rem; min-height: 4rem;">
                <p>Run operations to see how they impact the total cost of a transaction.</p>
            </div>
        </div>
    `;

    const storageBtn = document.getElementById('run-storage');
    const memoryBtn = document.getElementById('run-memory');
    const gasSumEl = document.getElementById('gas-sum');
    const gasBar = document.getElementById('gas-bar');
    const feedback = document.getElementById('lab-feedback');

    let totalGas = 0;
    const maxGas = 50000;

    function update() {
        gasSumEl.textContent = totalGas.toLocaleString();
        const percent = Math.min((totalGas / maxGas) * 100, 100);
        gasBar.style.width = percent + "%";

        if (totalGas > 25000) feedback.innerHTML = `<h4 style="color:#ef4444">High Gas Usage!</h4><p style="font-size:0.8rem">Storing variables on the global state is very expensive. Try to use local memory for calculations.</p>`;
    }

    storageBtn.addEventListener('click', () => {
        totalGas += 20000;
        update();
    });

    memoryBtn.addEventListener('click', () => {
        totalGas += 3;
        update();
    });
}
