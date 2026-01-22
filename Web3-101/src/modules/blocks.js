/**
 * Blocks Module: Anatomy of a Block
 */

export async function init(container) {
    container.innerHTML = `
        <div class="theory-section">
            <h3><span class="icon">🎟️</span> The Rookie's View: The Golden Ticket</h3>
            <p>
                A <strong>Block</strong> is just a box of data (like transactions). But to stick it onto the blockchain, you need to find a <strong>Golden Ticket</strong>.
            </p>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; margin-bottom: 1rem;">
                <div style="background: rgba(245, 158, 11, 0.05); padding: 12px; border-radius: 8px; font-size: 0.85rem; border: 1px solid rgba(245, 158, 11, 0.2);">
                    <strong>The Nonce:</strong> Think of this as a combo lock. You keep spinning the numbers (0, 1, 2...) until the block "clicks" into place.
                </div>
                <div style="background: rgba(255,255,255,0.05); padding: 12px; border-radius: 8px; font-size: 0.85rem;">
                    <strong>The Hash:</strong> The "winning" hash must start with zeros. Finding those zeros is hard, but checking them is easy!
                </div>
            </div>
            <div class="rookie-tip">
                <span class="rookie-tip-icon">💡</span>
                <div>
                    <strong>Pro Tip:</strong> This "Spinning the Nonce" is exactly what Bitcoin miners do. They do it trillions of times per second to find one valid block every 10 minutes.
                </div>
            </div>
        </div>

        <div class="interactive-card">
            <div class="card-title">
                Block Anatomy & Mining Lab
                <span class="tag">PoW Core</span>
            </div>
            
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 1.5rem; margin-bottom: 1.5rem;">
                <div>
                   <div class="input-group">
                        <label>Block Index</label>
                        <input type="text" id="block-index" value="1" readonly style="background: rgba(0,0,0,0.2);">
                    </div>
                    <div class="input-group">
                        <label>Nonce (The Lucky Number)</label>
                        <input type="number" id="block-nonce" value="72608" style="font-weight: bold; color: var(--accent-orange);">
                    </div>
                </div>
                <div>
                    <div class="input-group">
                        <label>Timestamp</label>
                        <input type="text" id="block-time" value="${new Date().toLocaleTimeString()}" readonly style="background: rgba(0,0,0,0.2);">
                    </div>
                    <div class="input-group">
                        <label>Previous Block Hash</label>
                        <input type="text" id="block-prev" value="0000abc123..." readonly style="background: rgba(0,0,0,0.2); font-size: 0.75rem;">
                    </div>
                </div>
            </div>

            <div class="input-group">
                <label>Data (Transactions, messages, etc.)</label>
                <textarea id="block-data" rows="2" style="font-size: 0.9rem;">Genesis Transaction: Alice pays Bob 50 BTC</textarea>
            </div>

            <button id="mine-btn" class="btn" style="width: 100%; margin: 1rem 0; height: 50px; background: linear-gradient(to right, var(--accent-orange), var(--accent-purple)); justify-content: center; font-weight: bold;">
                ⛏️ MINE THIS BLOCK
            </button>

            <div class="result-area" id="block-hash-card" style="background: #020617; border-left: 4px solid var(--accent-orange);">
                <span class="result-label">Current Block Hash</span>
                <div id="block-hash" style="font-family: var(--font-mono); font-size: 0.85rem; word-break: break-all; color: var(--text-secondary);"></div>
            </div>
        </div>
    `;

    const indexInput = document.getElementById('block-index');
    const nonceInput = document.getElementById('block-nonce');
    const dataInput = document.getElementById('block-data');
    const prevInput = document.getElementById('block-prev');
    const hashOutput = document.getElementById('block-hash');
    const hashCard = document.getElementById('block-hash-card');
    const mineBtn = document.getElementById('mine-btn');

    const difficulty = "0000";

    async function updateHash() {
        const data = indexInput.value + nonceInput.value + dataInput.value + prevInput.value;
        const hash = await sha256(data);
        hashOutput.textContent = hash;

        if (hash.startsWith(difficulty)) {
            hashCard.style.borderLeftColor = "var(--accent-green)";
            mineBtn.style.background = "var(--accent-green)";
            mineBtn.textContent = "✅ Block Mined!";
        } else {
            hashCard.style.borderLeftColor = "var(--accent-orange)";
            mineBtn.style.background = "linear-gradient(to right, var(--accent-orange), var(--accent-purple))";
            mineBtn.textContent = "⛏️ Mine Block";
        }
    }

    nonceInput.addEventListener('input', updateHash);
    dataInput.addEventListener('input', updateHash);

    mineBtn.addEventListener('click', async () => {
        mineBtn.disabled = true;
        mineBtn.textContent = "Mining...";
        let nonce = 0;
        let found = false;

        while (!found) {
            const data = indexInput.value + nonce + dataInput.value + prevInput.value;
            const hash = await sha256(data);
            if (hash.startsWith(difficulty)) {
                nonceInput.value = nonce;
                hashOutput.textContent = hash;
                found = true;
            }
            nonce++;

            // Artificial delay to prevent freezing and show progress
            if (nonce % 500 === 0) {
                await new Promise(r => setTimeout(r, 0));
                mineBtn.textContent = `Mining... (Nonce: ${nonce})`;
            }
        }

        mineBtn.disabled = false;
        updateHash();
    });

    updateHash();
}

async function sha256(message) {
    const msgBuffer = new TextEncoder().encode(message);
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}
