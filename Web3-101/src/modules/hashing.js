/**
 * Hashing Module: SHA-256 Playground
 */

export async function init(container) {
    container.innerHTML = `
        <div class="theory-section">
            <h3><span class="icon">🖐️</span> The Rookie's View: The Digital Fingerprint</h3>
            <p>
                Imagine you have a giant 1,000-page book. A <strong>Hash</strong> is like a tiny, 1-line "fingerprint" of that entire book.
            </p>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1rem;">
                <div style="background: rgba(255,255,255,0.05); padding: 10px; border-radius: 8px; font-size: 0.85rem;">
                    <strong>Unique:</strong> If you change just <em>one comma</em> in those 1,000 pages, the fingerprint (hash) will look completely different.
                </div>
                <div style="background: rgba(255,255,255,0.05); padding: 10px; border-radius: 8px; font-size: 0.85rem;">
                    <strong>Secret:</strong> You can see the fingerprint, but you can never "guess" what the book says just by looking at it.
                </div>
            </div>
            <div class="rookie-tip">
                <span class="rookie-tip-icon">💡</span>
                <div>
                    <strong>Pro Tip:</strong> Blockchains use hashes to "link" blocks. If someone tries to cheat and change data in an old block, the hash changes, and the whole chain "breaks" because the link no longer fits!
                </div>
            </div>
        </div>

        <div class="interactive-card">
            <div class="card-title">
                Fingerprint Generator (SHA-256)
                <span class="tag">Cryptography</span>
            </div>
            
            <div class="input-group">
                <label for="hash-input">Type anything (text, numbers, emojis) to see its fingerprint:</label>
                <textarea id="hash-input" placeholder="e.g. 'Alice sends 10 coins to Bob'" rows="3" style="font-size: 1rem;"></textarea>
            </div>

            <div class="result-area" style="background: #020617; border: 1px solid var(--border-color); border-left: 4px solid var(--accent-blue); padding: 1.5rem;">
                <span class="result-label">The Immutable Hash</span>
                <div id="hash-output" style="word-break: break-all; font-family: var(--font-mono); font-size: 0.85rem; color: var(--accent-blue);">e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855</div>
            </div>
        </div>
    `;

    const input = document.getElementById('hash-input');
    const output = document.getElementById('hash-output');

    input.addEventListener('input', async () => {
        const text = input.value;
        const hash = await sha256(text);
        output.textContent = hash;
    });
}

/**
 * Helper to calculate SHA-256 hash
 */
async function sha256(message) {
    const msgBuffer = new TextEncoder().encode(message);
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}
