/**
 * Proxies & Upgrades Module
 */

export async function init(container) {
    container.innerHTML = `
        <div class="theory-section">
            <h3><span class="icon">🔄</span> The Rookie's View: The Forwarding Address</h3>
            <p>
                Once you deploy a smart contract, you can't change it. So how do apps like Uniswap or Aave "upgrade" to new versions?
            </p>
            <div style="display: flex; gap: 1rem; margin-bottom: 1rem; background: rgba(59, 130, 246, 0.05); padding: 15px; border-radius: 8px; font-size: 0.85rem; border: 1px solid rgba(59, 130, 246, 0.2);">
                <div style="font-size: 1.5rem;">📫</div>
                <div>
                    Imagine you have a <strong>PO Box</strong> (the Proxy). The users always send letters there. Behind the scenes, the post office has a <strong>Forwarding Address</strong> that points to a real house (the Logic Contract). If you build a better house, you just update the forwarding address. The users never even notice!
                </div>
            </div>
            <div class="rookie-tip">
                <span class="rookie-tip-icon">💡</span>
                <div>
                    <strong>Pro Tip:</strong> This works using <strong>delegatecall</strong>. It's a special way for the Proxy to "rent" the brain of the Logic contract, but keep all the "memories" (your tokens, your name, etc.) inside its own body.
                </div>
            </div>
        </div>

        <div class="interactive-card">
            <div class="card-title">
                Proxy Upgrade Simulator
                <span class="tag">Mutable Architecture</span>
            </div>
            
            <div style="background: rgba(0,0,0,0.2); border: 2px solid var(--accent-blue); border-radius: 1rem; padding: 1.5rem; position: relative;">
                <h4 style="text-align: center; color: var(--accent-blue); margin-bottom: 1.5rem; font-size: 0.8rem; letter-spacing: 1px;">THE PROXY (PERMANENT ADDRESS)</h4>
                
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1.5rem; align-items: center; justify-content: center;">
                    <!-- State Storage -->
                    <div style="background: #020617; border: 1px solid var(--border-color); border-radius: 12px; padding: 1.5rem; text-align: center; border-bottom: 3px solid var(--accent-blue);">
                        <div style="font-size: 0.7rem; color: var(--text-secondary); margin-bottom: 8px;">PROXY STATE</div>
                        <div style="font-size: 1.8rem; font-weight: bold; color: var(--text-primary);">Total: <span id="proxy-count">102</span></div>
                        <div style="font-size: 0.6rem; color: var(--accent-blue); margin-top: 4px;">(This never moves)</div>
                    </div>

                    <!-- Logic Contract -->
                    <div id="logic-box" style="background: rgba(168, 85, 247, 0.05); border: 1px solid var(--accent-purple); border-radius: 12px; padding: 1.5rem; text-align: center; transition: all 0.4s ease;">
                        <h5 id="logic-title" style="color: var(--accent-purple); font-size: 0.8rem; margin-bottom: 8px;">LOGIC V1</h5>
                        <code style="display: block; font-size: 0.75rem; background: #000; padding: 8px; border-radius: 4px; margin-bottom: 1rem;">count += 1</code>
                        <button id="run-logic" class="btn" style="width: 100%; justify-content: center; font-size: 0.75rem; background: var(--accent-purple); font-weight: bold;">RUN LOGIC</button>
                    </div>
                </div>

                <div style="margin-top: 3rem; text-align: center; border-top: 1px solid var(--border-color); padding-top: 2rem;">
                    <h5 style="margin-bottom: 1.5rem;">Admin: Upgrade to V2?</h5>
                    <button id="upgrade-btn" class="btn" style="background: var(--accent-orange); padding: 0.8rem 2rem;">🚀 POINT PROXY TO V2 LOGIC</button>
                </div>
            </div>

            <div id="proxy-feedback" class="result-area" style="margin-top: 2rem; min-height: 4rem;">
                <p>The Proxy uses <strong>delegatecall</strong> to run code from another contract <em>inside its own context</em>.</p>
            </div>
        </div>

        <style>
            #logic-box.upgraded { border-color: var(--accent-green); background: rgba(16, 185, 129, 0.1); }
            #logic-box.upgraded #logic-title { color: var(--accent-green); }
        </style>
    `;

    const countEl = document.getElementById('proxy-count');
    const runBtn = document.getElementById('run-logic');
    const upgradeBtn = document.getElementById('upgrade-btn');
    const logicBox = document.getElementById('logic-box');
    const logicTitle = document.getElementById('logic-title');
    const logicCode = logicBox.querySelector('code');
    const feedback = document.getElementById('proxy-feedback');

    let count = 102;
    let version = 1;

    runBtn.addEventListener('click', () => {
        if (version === 1) count += 1;
        else count += 100; // V2 is a 10x multiplier!

        countEl.textContent = count;
        runBtn.textContent = "Executed!";
        setTimeout(() => runBtn.textContent = "Increment", 1000);
    });

    upgradeBtn.addEventListener('click', () => {
        version = 2;
        logicBox.classList.add('upgraded');
        logicTitle.textContent = "Logic V2 (Multi-Boost)";
        logicCode.textContent = "count + 100";
        feedback.innerHTML = `<h4 style="color:var(--accent-orange)">UPGRADE SUCCESSFUL!</h4>
                             <p style="font-size:0.8rem">The Proxy's state (Count: ${count}) was preserved, but its behavior changed. Now increments by 100!</p>`;
        upgradeBtn.disabled = true;
        upgradeBtn.textContent = "Currently Pointing to V2";
    });
}
