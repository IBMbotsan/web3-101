/**
 * Keys & Signatures Module: Elliptic Curve Cryptography
 */

export async function init(container) {
    let keyPair = null;

    container.innerHTML = `
        <div class="theory-section">
            <h3><span class="icon">🖍️</span> The Rookie's View: The Wax Seal</h3>
            <p>
                How do people know a transaction really came from you? In the old days, Kings used a <strong>Wax Seal</strong>.
            </p>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; margin-bottom: 1rem;">
                <div style="background: rgba(168, 85, 247, 0.05); padding: 12px; border-radius: 8px; font-size: 0.85rem; border: 1px solid rgba(168, 85, 247, 0.2);">
                    <strong>The Private Key (The Ring):</strong> The secret ring used to press the wax. Only you have it. If you lose it, anyone can pretend to be you.
                </div>
                <div style="background: rgba(16, 185, 129, 0.05); padding: 12px; border-radius: 8px; font-size: 0.85rem; border: 1px solid rgba(16, 185, 129, 0.2);">
                    <strong>The Public Key (The Photo):</strong> A picture of the seal that you give to everyone. They use it to check if a seal on a letter is real.
                </div>
            </div>
            <div class="rookie-tip">
                <span class="rookie-tip-icon">💡</span>
                <div>
                    <strong>Pro Tip:</strong> Your "Wallet Address" is just a shortened version of your Public Key. It's safe to share. Your "Seed Phrase" or "Private Key" is the Ring. **NEVER** show it to anyone!
                </div>
            </div>
        </div>

        <div class="interactive-card">
            <div class="card-title">
                1. Generate Your Identity
                <span class="tag">Identity</span>
            </div>
            <p style="margin-bottom: 1.5rem; color: var(--text-secondary)">
                First, let's create your unique digital identity. This creates a pair of mathematically linked keys.
            </p>
            <button id="gen-keys" class="btn">Generate Keypair</button>
            
            <div id="keys-display" style="display: none; margin-top: 1.5rem;">
                <div class="input-group">
                    <label>Public Key (Your Identity)</label>
                    <div class="result-area" style="border-left-color: var(--accent-green)">
                        <span class="result-label">Public (ECDSA P-256)</span>
                        <div id="pub-key" style="font-size: 0.8rem;"></div>
                    </div>
                </div>
                <div class="input-group">
                    <label>Private Key (KEEP SECRET!)</label>
                    <div class="result-area" style="border-left-color: var(--accent-purple)">
                        <span class="result-label">Private</span>
                        <div id="priv-key" style="font-size: 0.8rem;">[HIDDEN FOR SECURITY]</div>
                    </div>
                </div>
            </div>
        </div>

        <div id="signing-section" style="display: none;">
            <div class="interactive-card">
                <div class="card-title">
                    2. Sign a Message
                    <span class="tag">Integrity</span>
                </div>
                <p style="margin-bottom: 1.5rem; color: var(--text-secondary)">
                    Use your private key to "sign" a message. This proves the message came from you without revealing your private key.
                </p>
                <div class="input-group">
                    <label>Message to Sign</label>
                    <input type="text" id="msg-to-sign" value="I am sending 1 BTC to Bob">
                </div>
                <button id="sign-btn" class="btn" style="background: var(--accent-purple)">Sign Message</button>

                <div id="sig-display" style="display: none; margin-top: 1.5rem;">
                    <div class="result-area">
                        <span class="result-label">Digital Signature</span>
                        <div id="signature-hex" style="font-size: 0.8rem;"></div>
                    </div>
                </div>
            </div>

            <div class="interactive-card">
                <div class="card-title">
                    3. Verify Signature
                    <span class="tag">Verification</span>
                </div>
                <p style="margin-bottom: 1.5rem; color: var(--text-secondary)">
                    Anyone with your <strong>Public Key</strong> can verify that the signature is valid for this message.
                </p>
                <button id="verify-btn" class="btn" style="background: var(--accent-green)">Verify Authenticity</button>
                <div id="verify-result" style="margin-top: 1rem; font-weight: bold; text-align: center;"></div>
            </div>
        </div>
    `;

    const genBtn = document.getElementById('gen-keys');
    const keysDisplay = document.getElementById('keys-display');
    const pubKeyEl = document.getElementById('pub-key');
    const privKeyEl = document.getElementById('priv-key');
    const signingSection = document.getElementById('signing-section');

    const signBtn = document.getElementById('sign-btn');
    const sigDisplay = document.getElementById('sig-display');
    const sigHexEl = document.getElementById('signature-hex');
    const msgInput = document.getElementById('msg-to-sign');

    const verifyBtn = document.getElementById('verify-btn');
    const verifyResult = document.getElementById('verify-result');

    let currentSignature = null;
    let currentMsg = "";

    genBtn.addEventListener('click', async () => {
        genBtn.disabled = true;
        genBtn.textContent = "Generating...";

        keyPair = await crypto.subtle.generateKey(
            { name: "ECDSA", namedCurve: "P-256" },
            true,
            ["sign", "verify"]
        );

        const pubExport = await crypto.subtle.exportKey("spki", keyPair.publicKey);
        const pubHex = bufferToHex(pubExport);
        pubKeyEl.textContent = pubHex.substring(0, 64) + "...";

        keysDisplay.style.display = 'block';
        signingSection.style.display = 'block';
        genBtn.textContent = "Regenerate Keys";
        genBtn.disabled = false;
    });

    signBtn.addEventListener('click', async () => {
        currentMsg = msgInput.value;
        const msgBuffer = new TextEncoder().encode(currentMsg);

        const signature = await crypto.subtle.sign(
            { name: "ECDSA", hash: { name: "SHA-256" } },
            keyPair.privateKey,
            msgBuffer
        );

        currentSignature = signature;
        sigHexEl.textContent = bufferToHex(signature);
        sigDisplay.style.display = 'block';
    });

    verifyBtn.addEventListener('click', async () => {
        if (!currentSignature) return;

        const msgBuffer = new TextEncoder().encode(msgInput.value);
        const isValid = await crypto.subtle.verify(
            { name: "ECDSA", hash: { name: "SHA-256" } },
            keyPair.publicKey,
            currentSignature,
            msgBuffer
        );

        if (isValid) {
            verifyResult.textContent = "✅ Signature Valid: Proof of Ownership Confirmed";
            verifyResult.style.color = "var(--accent-green)";
        } else {
            verifyResult.textContent = "❌ Signature Invalid: Message or Key Tampered!";
            verifyResult.style.color = "var(--accent-orange)";
        }
    });
}

function bufferToHex(buffer) {
    return Array.from(new Uint8Array(buffer))
        .map(b => b.toString(16).padStart(2, '0'))
        .join('');
}
