/**
 * Soft vs Hard Forks Module
 */

export async function init(container) {
    container.innerHTML = `
        <div class="theory-section">
            <h3><span class="icon">🛣️</span> The Rookie's View: The Road Split</h3>
            <p>
                A blockchain works because everyone follows the <strong>same rules</strong>. But what happens when people want to change the rules?
            </p>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1rem;">
                <div style="background: rgba(59, 130, 246, 0.05); padding: 12px; border-radius: 8px; font-size: 0.85rem; border: 1px solid rgba(59, 130, 246, 0.2);">
                    <strong>Soft Fork (Upgrade):</strong> Like adding a "No Smoking" sign in a cafe. The old rules still work, but there's a new restriction. Everyone stays together.
                </div>
                <div style="background: rgba(239, 68, 68, 0.05); padding: 12px; border-radius: 8px; font-size: 0.85rem; border: 1px solid rgba(239, 68, 68, 0.2);">
                    <strong>Hard Fork (Split):</strong> Like changing the cafe into a gym. People who want coffee go one way; people who want to lift go the other. The community splits into two.
                </div>
            </div>
            <div class="rookie-tip">
                <span class="rookie-tip-icon">💡</span>
                <div>
                    <strong>Pro Tip:</strong> Ethereum's famous "The DAO" event was a Hard Fork. Some people wanted to reverse a hack (Modern Ethereum), others wanted to keep the "Code is Law" rule (Ethereum Classic).
                </div>
            </div>
        </div>

        <div class="interactive-card">
            <div class="card-title">
                Chain Split Visualizer
                <span class="tag">Consensus</span>
            </div>
            
            <div style="background: #020617; border: 1px solid var(--border-color); border-radius: 1rem; padding: 1.5rem; overflow-x: auto; min-height: 250px; position: relative;">
                <div id="fork-timeline" style="display: flex; align-items: center; gap: 10px; min-height: 180px; position: relative; padding-bottom: 2rem;">
                    <!-- Shared history -->
                    <div class="block-f">#1</div>
                    <div class="block-f">#2</div>
                    <div class="block-f" id="fork-point" style="border-style: dashed; border-color: var(--accent-orange)">#3 (UPGRADE)</div>
                </div>

                <div style="display: flex; flex-wrap: wrap; gap: 1rem; margin-top: 1rem; border-top: 1px solid var(--border-color); padding-top: 1.5rem;">
                    <button id="trigger-hard" class="btn" style="flex: 1; min-width: 150px; background: #ef4444">SIMULATE HARD FORK (SPLIT)</button>
                    <button id="trigger-soft" class="btn" style="flex: 1; min-width: 150px; background: var(--accent-blue)">SIMULATE SOFT FORK (UPGRADE)</button>
                    <button id="reset-fork" class="btn" style="flex: 0.2; min-width: 80px; background: transparent; border: 1px solid var(--border-color)">Reset</button>
                </div>
            </div>

            <div id="fork-feedback" class="result-area" style="margin-top: 1.5rem; min-height: 5rem;">
                <p>Choose an upgrade type to see the network's reaction!</p>
            </div>
        </div>

        <style>
            .block-f {
                flex-shrink: 0;
                width: 80px;
                height: 50px;
                background: var(--sidebar-bg);
                border: 1px solid var(--border-color);
                border-radius: 4px;
                display: flex;
                align-items: center;
                justify-content: center;
                font-family: var(--font-mono);
                font-size: 0.8rem;
                position: relative;
                z-index: 2;
            }
            .block-f::after {
                content: "—";
                position: absolute;
                right: -15px;
                color: var(--border-color);
            }
            .block-f:last-child::after { content: ""; }
            
            .fork-branch {
                position: absolute;
                left: 270px; /* offset of block #3 */
                display: flex;
                flex-direction: column;
                gap: 50px;
                padding-left: 90px;
            }
            .branch-row { display: flex; align-items: center; gap: 10px; }
            .branch-label { font-size: 0.6rem; color: var(--text-secondary); width: 60px; }
        </style>
    `;

    const timeline = document.getElementById('fork-timeline');
    const hardBtn = document.getElementById('trigger-hard');
    const softBtn = document.getElementById('trigger-soft');
    const resetBtn = document.getElementById('reset-fork');
    const feedback = document.getElementById('fork-feedback');

    hardBtn.addEventListener('click', () => {
        timeline.innerHTML += `
            <div class="fork-branch">
                <div class="branch-row">
                    <span class="branch-label">OLD RULES</span>
                    <div class="block-f" style="border-color: #64748b">#4a</div>
                    <div class="block-f" style="border-color: #64748b">#5a</div>
                </div>
                <div class="branch-row">
                    <span class="branch-label" style="color:#ef4444">NEW RULES</span>
                    <div class="block-f" style="border-color: #ef4444">#4b</div>
                    <div class="block-f" style="border-color: #ef4444">#5b</div>
                </div>
            </div>
        `;
        feedback.innerHTML = `<h4 style="color:#ef4444">Hard Fork Event!</h4>
                             <p style="font-size:0.8rem">The network split. Nodes running NEW rules consider OLD nodes invalid. Two separate coins/chains now exist (e.g., Bitcoin and Bitcoin Cash).</p>`;
        hardBtn.disabled = true;
        softBtn.disabled = true;
    });

    softBtn.addEventListener('click', () => {
        // In soft fork, the upgraded nodes include a more restrictive rule
        // Old nodes still see blocks as valid.
        timeline.innerHTML += `
            <div class="block-f" style="border-color: var(--accent-blue); background: rgba(59, 130, 246, 0.1)">#4</div>
            <div class="block-f" style="border-color: var(--accent-blue); background: rgba(59, 130, 246, 0.1)">#5</div>
        `;
        feedback.innerHTML = `<h4 style="color:var(--accent-blue)">Soft Fork Event!</h4>
                             <p style="font-size:0.8rem">This is a backward-compatible upgrade. Old nodes accept the new blocks. Miners must majority-agree to enforce the new rule (e.g., SegWit).</p>`;
        hardBtn.disabled = true;
        softBtn.disabled = true;
    });

    resetBtn.addEventListener('click', () => {
        timeline.innerHTML = `
            <div class="block-f">#1</div>
            <div class="block-f">#2</div>
            <div class="block-f" id="fork-point">#3 (UPGRADE)</div>
        `;
        feedback.innerHTML = `<p>Choose an upgrade type to see how nodes and the chain react.</p>`;
        hardBtn.disabled = false;
        softBtn.disabled = false;
    });
}
