/**
 * HD Wallets & Mnemonics Module
 */

export async function init(container) {
    const wordlist = ["abandon", "ability", "able", "about", "above", "absent", "absorb", "abstract", "absurd", "abuse", "access", "accident"];

    container.innerHTML = `
        <div class="theory-section">
            <h3><span class="icon">🗝️</span> The Rookie's View: The Master Key</h3>
            <p>
                Imagine you own a giant hotel with 10,000 rooms. Instead of carrying 10,000 heavy metal keys, you have one <strong>Master Key</strong>.
            </p>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; margin-bottom: 1rem;">
                <div style="background: rgba(255,255,255,0.05); padding: 12px; border-radius: 8px; font-size: 0.85rem;">
                    <strong>The 12 Words:</strong> This is your <strong>Seed Phrase</strong>. It's a human-friendly way to write down your Master Key.
                </div>
                <div style="background: rgba(255,255,255,0.05); padding: 12px; border-radius: 8px; font-size: 0.85rem;">
                    <strong>HD Derivation:</strong> This is the math that creates 10,000 individual "room keys" (addresses) from that one Master Key.
                </div>
            </div>
            <div class="rookie-tip">
                <span class="rookie-tip-icon">💡</span>
                <div>
                    <strong>Pro Tip:</strong> Your wallet (like MetaMask or Ledger) doesn't "store" your coins. It stores the <strong>Master Key</strong>. The coins live on the blockchain; the key just gives you permission to move them!
                </div>
            </div>
        </div>

        <div class="interactive-card">
            <div class="card-title">
                The 12-Word Recovery Phrase
                <span class="tag">Backup</span>
            </div>
            
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(130px, 1fr)); gap: 0.75rem; margin-bottom: 2rem;">
                ${Array(12).fill(0).map((_, i) => `
                    <div style="background: #020617; border: 1px solid var(--border-color); padding: 0.75rem; border-radius: 0.5rem; font-family: var(--font-mono); font-size: 0.85rem; text-align: center;">
                        <span style="color: var(--text-secondary); font-size: 0.65rem; display: block; margin-bottom: 2px;">#${i + 1}</span>
                        <span class="mnemonic-word" id="word-${i}" style="color: var(--accent-purple); font-weight: bold;">${wordlist[i % wordlist.length]}</span>
                    </div>
                `).join('')}
            </div>

            <button id="gen-mnemonic" class="btn">Generate New Phrase</button>

            <div id="hd-derivation" style="margin-top: 3rem; display: none;">
                <div class="card-title">HD Derivation <span class="tag">BIP-44</span></div>
                <p style="color: var(--text-secondary); font-size: 0.9rem; margin-bottom: 1rem;">
                    From this one phrase, your wallet can derive thousands of accounts. Each has its own path (e.g., m/44'/60'/0'/0/index).
                </p>
                
                <table style="width: 100%; border-collapse: collapse; font-family: var(--font-mono); font-size: 0.75rem;">
                    <thead>
                        <tr style="border-bottom: 1px solid var(--border-color); text-align: left;">
                            <th style="padding: 0.5rem;">Index</th>
                            <th style="padding: 0.5rem;">Derivation Path</th>
                            <th style="padding: 0.5rem;">Public Address</th>
                        </tr>
                    </thead>
                    <tbody id="derivation-table">
                        <!-- Derived accounts here -->
                    </tbody>
                </table>
            </div>
        </div>
    `;

    const genBtn = document.getElementById('gen-mnemonic');
    const tableBody = document.getElementById('derivation-table');
    const derivationSection = document.getElementById('hd-derivation');

    const words = ["apple", "banana", "cherry", "dragon", "eagle", "forest", "ghost", "honey", "island", "jungle", "karma", "lemon", "magic", "night", "ocean", "pilot", "quartz", "river", "silver", "tiger", "urban", "vocal", "winter", "young"];

    async function generate() {
        // Randomize words
        const currentWords = [];
        for (let i = 0; i < 12; i++) {
            const word = words[Math.floor(Math.random() * words.length)];
            currentWords.push(word);
            document.getElementById(`word-${i}`).textContent = word;
        }

        const seed = await sha256(currentWords.join(' '));

        tableBody.innerHTML = '';
        for (let i = 0; i < 5; i++) {
            const addr = '0x' + (await sha256(seed + i)).substring(0, 40);
            tableBody.innerHTML += `
                <tr style="border-bottom: 1px solid rgba(255,255,255,0.05)">
                    <td style="padding: 0.5rem;">#${i}</td>
                    <td style="padding: 0.5rem; color: var(--accent-purple)">m/44'/60'/0'/0/${i}</td>
                    <td style="padding: 0.5rem; color: var(--accent-green)">${addr}</td>
                </tr>
            `;
        }

        derivationSection.style.display = 'block';
    }

    genBtn.addEventListener('click', generate);
}

async function sha256(message) {
    const msgBuffer = new TextEncoder().encode(message);
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}
