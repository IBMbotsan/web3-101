/**
 * Money Legos (Composability) Module
 */

export async function init(container) {
    container.innerHTML = `
        <div class="theory-section">
            <h3><span class="icon">🧱</span> The Rookie's View: The Lego Bricks</h3>
            <p>
                In the old world, if you wanted to build a bank, you had to build everything from scratch. In Web3, you just snap things together.
            </p>
            <div style="display: flex; gap: 1rem; margin-bottom: 1rem; background: rgba(16, 185, 129, 0.05); padding: 15px; border-radius: 8px; font-size: 0.85rem; border: 1px solid rgba(16, 185, 129, 0.2);">
                <div style="font-size: 1.5rem;">🏗️</div>
                <div>
                    Imagine every app (Uniswap, Aave, Compound) is a <strong>Lego Brick</strong>. You can take a <strong>Lending</strong> brick, snap it into a <strong>Swap</strong> brick, and then put a <strong>Saving</strong> brick on top. You only have to write the "glue" that connects them! This is called <strong>Composability</strong>.
                </div>
            </div>
            <div class="rookie-tip">
                <span class="rookie-tip-icon">💡</span>
                <div>
                    <strong>Pro Tip:</strong> This is why DeFi grows so much faster than traditional finance. Developers don't waste time re-inventing the wheel; they just build cooler cars using wheels that already exist.
                </div>
            </div>
        </div>

        <div class="interactive-card">
            <div class="card-title">
                Money Lego Stack Builder
                <span class="tag">Composability</span>
            </div>
            
            <div style="background: rgba(0,0,0,0.2); border: 1px solid var(--border-color); border-radius: 1rem; padding: 1.5rem; display: flex; flex-direction: column; align-items: center; gap: 1rem;">
                <h4 style="margin-bottom: 1rem; font-size: 0.8rem; color: var(--text-secondary); letter-spacing: 1px;">STACK YOUR DEFI STRATEGY</h4>
                
                <div id="lego-stack" style="display: flex; flex-direction: column-reverse; gap: 6px; width: 100%; max-width: 280px; min-height: 150px; border-bottom: 4px solid #1e293b; padding-bottom: 10px; margin-bottom: 1rem;">
                    <!-- Legos go here -->
                </div>

                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(130px, 1fr)); gap: 10px; width: 100%;">
                    <button class="lego-btn" data-type="yield" style="background: var(--accent-green); height: 40px; font-weight: bold; font-size: 0.65rem;">+ YIELD VAULT</button>
                    <button class="lego-btn" data-type="dex" style="background: var(--accent-blue); height: 40px; font-weight: bold; font-size: 0.65rem;">+ DEX SWAP</button>
                    <button class="lego-btn" data-type="lend" style="background: var(--accent-purple); height: 40px; font-weight: bold; font-size: 0.65rem;">+ LENDING POOL</button>
                    <button id="reset-legos" class="btn" style="background: transparent; border: 1px solid var(--border-color); height: 40px; justify-content: center; font-size: 0.65rem;">RESET</button>
                </div>
                
                <button id="execute-stack" class="btn" style="width: 100%; margin-top: 1rem; background: var(--accent-orange); display: none;">EXECUTE COMPOSITE TX</button>
            </div>

            <div id="lego-feedback" class="result-area" style="margin-top: 2rem; min-height: 5rem;">
                <p>Add components to build a "Money Lego" stack.</p>
            </div>
        </div>

        <style>
            .lego-btn {
                padding: 10px;
                border-radius: 6px;
                border: none;
                color: white;
                font-size: 0.7rem;
                cursor: pointer;
                transition: transform 0.2s;
            }
            .lego-btn:hover { transform: translateY(-2px); }
            
            .lego-block {
                width: 100%;
                height: 40px;
                border-radius: 4px;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 0.75rem;
                font-weight: bold;
                animation: dropIn 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                box-shadow: 0 4px 6px rgba(0,0,0,0.3);
            }
            @keyframes dropIn {
                from { transform: translateY(-50px); opacity: 0; }
                to { transform: translateY(0); opacity: 1; }
            }
        </style>
    `;

    const stack = document.getElementById('lego-stack');
    const legoBtns = document.querySelectorAll('.lego-btn');
    const executeBtn = document.getElementById('execute-stack');
    const resetBtn = document.getElementById('reset-legos');
    const feedback = document.getElementById('lego-feedback');

    const blocks = {
        yield: { label: '💰 YIELD GENERATOR', color: 'var(--accent-green)' },
        dex: { label: '🔄 UNISWAP SWAP', color: 'var(--accent-blue)' },
        lend: { label: '🏦 AAVE LENDING', color: 'var(--accent-purple)' }
    };

    let activeStack = [];

    legoBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            if (activeStack.length >= 5) return;
            const type = btn.dataset.type;
            activeStack.push(type);

            const block = document.createElement('div');
            block.className = 'lego-block';
            block.style.backgroundColor = blocks[type].color;
            block.textContent = blocks[type].label;
            stack.appendChild(block);

            executeBtn.style.display = 'block';
            feedback.innerHTML = `<p>Added <strong>${blocks[type].label}</strong> to the transaction sequence.</p>`;
        });
    });

    executeBtn.addEventListener('click', async () => {
        executeBtn.disabled = true;
        executeBtn.textContent = "Processing Composite Transaction...";

        for (let i = 0; i < stack.children.length; i++) {
            stack.children[i].style.filter = "brightness(1.5)";
            stack.children[i].style.transform = "scale(1.05)";
            await new Promise(r => setTimeout(r, 600));
            stack.children[i].style.filter = "none";
            stack.children[i].style.transform = "none";
        }

        feedback.innerHTML = `<h4 style="color:var(--accent-orange)">TRANSACTION ATOMICITY! ✅</h4>
                             <p style="font-size:0.8rem">All ${activeStack.length} protocol calls were executed in a single atomic transaction. One failure would have rolled back everything!</p>`;
        executeBtn.textContent = "Transaction Confirmed";
    });

    resetBtn.addEventListener('click', () => {
        stack.innerHTML = '';
        activeStack = [];
        executeBtn.style.display = 'none';
        executeBtn.disabled = false;
        executeBtn.textContent = "EXECUTE COMPOSITE TX";
        feedback.innerHTML = `<p>Add components to build a "Money Lego" stack.</p>`;
    });
}
