/**
 * Difficulty Adjustment Module
 */

export async function init(container) {
    container.innerHTML = `
        <div class="theory-section">
            <h3><span class="icon">⚙️</span> The Rookie's View: The "Adjustable" Test</h3>
            <p>
                Imagine a teacher gives a math test. If the whole class finishes in 2 minutes, the teacher realizes the test was too easy. Next time, they add harder questions to make sure it takes the full 10 minutes.
            </p>
            <div style="background: rgba(255,255,255,0.05); padding: 15px; border-radius: 8px; font-size: 0.85rem; margin-bottom: 1rem;">
                <strong>In Blockchain:</strong> If "Hashrate" (miner power) goes up, blocks are found too fast. The network automatically makes the "riddle" harder to keep the heartbeat at exactly 10 minutes.
            </div>
            <div class="rookie-tip">
                <span class="rookie-tip-icon">💡</span>
                <div>
                    <strong>Pro Tip:</strong> This is why Bitcoin always has a 10-minute block time, even though computers today are millions of times faster than they were in 2009!
                </div>
            </div>
        </div>

        <div class="interactive-card">
            <div class="card-title">
                Self-Correction Simulator
                <span class="tag">Math Lab</span>
            </div>
            
            <div style="background: rgba(16, 185, 129, 0.05); border: 1px solid var(--accent-green); border-radius: 1rem; padding: 1.5rem;">
                <div style="display: flex; flex-wrap: wrap; gap: 1.5rem; justify-content: space-between; margin-bottom: 2rem;">
                    <div style="flex: 1; min-width: 200px;">
                        <div style="font-size: 0.7rem; color: var(--text-secondary)">CURRENT TARGET (DIFFICULTY)</div>
                        <div style="font-family: var(--font-mono); font-size: 0.85rem; color: var(--accent-green); word-break: break-all;" id="target-display">0000ffff...</div>
                    </div>
                    <div style="text-align: right;">
                        <div style="font-size: 0.7rem; color: var(--text-secondary)">AVG BLOCK TIME</div>
                        <div style="font-size: 1.8rem; font-weight: bold;" id="block-time-display">10.0s</div>
                    </div>
                </div>

                <div style="margin-bottom: 2rem;">
                    <label style="font-size: 0.8rem; display: block; margin-bottom: 0.5rem;">Network Hashrate (Computing Power)</label>
                    <input type="range" id="hashrate-slider" min="1" max="100" value="50" style="width: 100%;">
                    <div style="display: flex; justify-content: space-between; font-size: 0.7rem; color: var(--text-secondary); margin-top: 8px;">
                        <span>Few Miners</span>
                        <span id="hashrate-val" style="color: var(--text-primary); font-weight: bold;">50 TH/s</span>
                        <span>Mining Army</span>
                    </div>
                </div>

                <div id="mining-status" style="height: 50px; display: flex; align-items: center; justify-content: center; background: rgba(0,0,0,0.3); border-radius: 8px; font-size: 0.85rem; border: 1px solid var(--border-color);">
                    <span id="discovery-msg" style="color: var(--text-secondary)">Network is currently mining...</span>
                </div>
            </div>

            <div class="interactive-card" style="margin-top: 2rem; background: #020617; border-style: dashed;">
                <h4>Force Alignment</h4>
                <p style="font-size: 0.85rem; color: var(--text-secondary); margin-top: 0.5rem;">
                    Wait for an "Adjustment Period" or click below to manually trigger the math recalculation.
                </p>
                <button id="adjust-now" class="btn" style="width: 100%; margin-top: 1.5rem; background: var(--accent-blue)">CALCULATE NEW DIFFICULTY</button>
            </div>
        </div>
    `;

    const targetEl = document.getElementById('target-display');
    const timeEl = document.getElementById('block-time-display');
    const hashrateSlider = document.getElementById('hashrate-slider');
    const hashrateVal = document.getElementById('hashrate-val');
    const adjustBtn = document.getElementById('adjust-now');
    const statusMsg = document.getElementById('discovery-msg');

    let currentTarget = 0x0000FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF;
    let actualBlockTime = 10.0;
    const targetPeriod = 10.0; // Goal is 10s

    function updateTargetDisplay() {
        targetEl.textContent = "0x" + currentTarget.toString(16).padStart(64, '0').slice(0, 32) + "...";
    }

    function calculateBlockTime() {
        // High hashrate = lower block time. 
        // Logic: Inverse relationship. At hashrate 50, time is roughly 10s.
        const hr = parseInt(hashrateSlider.value);
        actualBlockTime = (50 / hr) * (targetPeriod * (0xFFFF / (currentTarget >> 48)));
        timeEl.textContent = actualBlockTime.toFixed(1) + "s";

        if (actualBlockTime < 8) timeEl.style.color = "#ef4444";
        else if (actualBlockTime > 12) timeEl.style.color = 'var(--accent-orange)';
        else timeEl.style.color = 'var(--accent-green)';
    }

    hashrateSlider.addEventListener('input', () => {
        hashrateVal.textContent = hashrateSlider.value + " TH/s";
        calculateBlockTime();
    });

    adjustBtn.addEventListener('click', () => {
        adjustBtn.disabled = true;
        adjustBtn.textContent = "Recalculating Difficulty...";

        setTimeout(() => {
            // New Target = Old Target * (Actual Time / Goal Time)
            const ratio = actualBlockTime / targetPeriod;
            currentTarget = Math.floor(currentTarget * ratio);

            // Bounds to prevent target from going too high/low in this simple sim
            if (currentTarget < 0x00000000FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF) currentTarget = 0x00000000FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF;
            if (currentTarget > 0x0000FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF) currentTarget = 0x0000FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF;

            updateTargetDisplay();
            calculateBlockTime();

            adjustBtn.textContent = "Difficulty Updated!";
            setTimeout(() => {
                adjustBtn.disabled = false;
                adjustBtn.textContent = "FORCE RETARGET (Adjustment Period)";
            }, 1000);
        }, 1500);
    });

    updateTargetDisplay();
    calculateBlockTime();
}
