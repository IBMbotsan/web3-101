/**
 * Proof of Work Module
 */

export async function init(container) {
    container.innerHTML = `
        <div class="theory-section">
            <h3><span class="icon">⚡</span> The Rookie's View: The Digital Scratch Card</h3>
            <p>
                Proof of Work is a lottery that anyone can join, but you have to pay for the "tickets" with electricity.
            </p>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; margin-bottom: 1rem;">
                <div style="background: rgba(245, 158, 11, 0.05); padding: 12px; border-radius: 8px; font-size: 0.85rem; border: 1px solid rgba(245, 158, 11, 0.2);">
                    <strong>The Lottery:</strong> Miners "guess" numbers millions of times per second. The first one to find a "winning" number gets to add the next block.
                </div>
                <div style="background: rgba(255,255,255,0.05); padding: 12px; border-radius: 8px; font-size: 0.85rem;">
                    <strong>The Security:</strong> Because it's so expensive to play (electricity), nobody wants to cheat. If you cheat, the network ignores you, and you wasted all that money for nothing.
                </div>
            </div>
            <div class="rookie-tip">
                <span class="rookie-tip-icon">💡</span>
                <div>
                    <strong>Pro Tip:</strong> This is why Bitcoin is so secure. To "re-write" the last hour of transactions, you would need to own a supercomputer bigger than 51% of all the miners in the world combined!
                </div>
            </div>
        </div>

        <div class="interactive-card">
            <div class="card-title">
                Mining Simulation Lab (PoW)
                <span class="tag">Security Cost</span>
            </div>
            
            <div style="background: #020617; padding: 1.5rem; border-radius: 1rem; border: 1px solid var(--border-color); text-align: center;">
                <div style="font-size: 0.75rem; color: var(--text-secondary); margin-bottom: 0.5rem;">Network Target Difficulty</div>
                <div style="font-family: var(--font-mono); font-size: 1.5rem; font-weight: bold; color: var(--accent-orange); margin-bottom: 2rem;" id="pow-difficulty">00000...</div>
                
                <button id="mine-pow" class="btn" style="width: 100%; max-width: 300px; height: 60px; font-size: 1.1rem; justify-content: center; background: linear-gradient(to right, var(--accent-orange), #f97316); margin: 0 auto;">
                    🔨 START MINING
                </button>
                
                <div id="pow-stats" style="margin-top: 2rem; display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; text-align: left;">
                    <div style="background: rgba(255,255,255,0.05); padding: 1rem; border-radius: 0.5rem;">
                        <span style="font-size: 0.7rem; color: var(--text-secondary)">Hashes Calculated</span>
                        <div id="hashes-count" style="font-family: var(--font-mono); font-weight: bold">0</div>
                    </div>
                    <div style="background: rgba(255,255,255,0.05); padding: 1rem; border-radius: 0.5rem;">
                        <span style="font-size: 0.7rem; color: var(--text-secondary)">Electricity (Mock)</span>
                        <div id="energy-count" style="font-family: var(--font-mono); font-weight: bold; color: var(--accent-orange)">0 kWh</div>
                    </div>
                </div>
            </div>

            <div id="pow-result" style="margin-top: 1.5rem; text-align: center; font-weight: bold; color: var(--accent-green)"></div>
        </div>
    `;

    const mineBtn = document.getElementById('mine-pow');
    const hashesEl = document.getElementById('hashes-count');
    const energyEl = document.getElementById('energy-count');
    const resultEl = document.getElementById('pow-result');

    let mining = false;
    const target = "00000";

    mineBtn.addEventListener('click', async () => {
        if (mining) {
            mining = false;
            mineBtn.textContent = "🔨 Start Mining";
            return;
        }

        mining = true;
        mineBtn.textContent = "⛏️ Mining... (Stop)";
        resultEl.textContent = "";

        let hashes = 0;
        while (mining) {
            hashes++;
            const hash = await sha256(Math.random().toString());

            if (hashes % 100 === 0) {
                hashesEl.textContent = hashes.toLocaleString();
                energyEl.textContent = (hashes * 0.001).toFixed(2) + " kWh";
                await new Promise(r => setTimeout(r, 0));
            }

            if (hash.startsWith(target)) {
                resultEl.textContent = "🏆 BLOCK FOUND! 6.25 BTC REWARD";
                mining = false;
                mineBtn.textContent = "🔨 Start Mining Again";
                break;
            }
        }
    });
}

async function sha256(message) {
    const msgBuffer = new TextEncoder().encode(message);
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}
