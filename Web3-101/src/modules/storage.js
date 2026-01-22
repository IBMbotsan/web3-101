/**
 * IPFS & Storage Module
 */

export async function init(container) {
    container.innerHTML = `
        <div class="interactive-card">
            <div class="card-title">
                Content Addressing (IPFS)
                <span class="tag">Decentralized Storage</span>
            </div>
            
            <p style="color: var(--text-secondary); margin-bottom: 2rem;">
                On the regular web, you find files by <strong>Location</strong> (URL). In Web3, you find files by <strong>Content</strong>. If the content changes, the address changes.
            </p>

            <div class="input-group">
                <label>Upload Data to "IPFS"</label>
                <textarea id="ipfs-input" rows="4" placeholder="Enter text or paste an image URL to 'store' it..."></textarea>
            </div>

            <button id="ipfs-upload" class="btn">Store on IPFS</button>

            <div id="ipfs-result" style="margin-top: 2rem; display: none;">
                <div class="result-area" style="flex-direction: column; align-items: flex-start; border-left-color: var(--accent-orange);">
                    <span class="result-label">CID (Content Identifier)</span>
                    <div id="cid-display" style="color: var(--accent-orange); font-weight: bold; font-family: var(--font-mono); margin-bottom: 0.5rem;">QmXoyp...</div>
                    <div style="font-size: 0.7rem; color: var(--text-secondary)">Address: ipfs://<span id="cid-full"></span></div>
                </div>

                <div style="margin-top: 1.5rem; padding: 1rem; background: rgba(245, 158, 11, 0.05); border: 1px dashed var(--accent-orange); border-radius: 0.5rem; font-size: 0.85rem;">
                    <strong>Immutable Link:</strong> This CID is derived directly from the data. If you change even one comma in your text and upload again, the CID will be completely different.
                </div>
            </div>
        </div>
    `;

    const input = document.getElementById('ipfs-input');
    const uploadBtn = document.getElementById('ipfs-upload');
    const resultDiv = document.getElementById('ipfs-result');
    const cidDisplay = document.getElementById('cid-display');
    const cidFull = document.getElementById('cid-full');

    uploadBtn.addEventListener('click', async () => {
        const text = input.value;
        if (!text) return;

        uploadBtn.disabled = true;
        uploadBtn.textContent = "Hashing & Distributing...";

        await new Promise(r => setTimeout(r, 1500));

        // Generate a mock CID (Base58 style hashing)
        const hash = await sha256(text);
        const cid = "Qm" + hash.substring(0, 32);

        cidDisplay.textContent = cid;
        cidFull.textContent = cid;
        resultDiv.style.display = 'block';

        uploadBtn.disabled = false;
        uploadBtn.textContent = "Stored!";
        setTimeout(() => uploadBtn.textContent = "Store on IPFS", 2000);
    });
}

async function sha256(message) {
    const msgBuffer = new TextEncoder().encode(message);
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}
