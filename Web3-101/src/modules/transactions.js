/**
 * Transactions Module: Inside a Transaction
 */

export async function init(container) {
    container.innerHTML = `
        <div class="theory-section">
            <h3><span class="icon">💸</span> The Rookie's View: The Digital Check</h3>
            <p>
                Sending crypto is like writing a physical <strong>Check</strong>.
            </p>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; margin-bottom: 1rem;">
                <div style="background: rgba(255,255,255,0.05); padding: 12px; border-radius: 8px; font-size: 0.85rem;">
                    <strong>The Details:</strong> Who are you paying? (To), How much? (Value), and your "Check Number" (Nonce) to prevent double-spending.
                </div>
                <div style="background: rgba(16, 185, 129, 0.05); padding: 12px; border-radius: 8px; font-size: 0.85rem; border: 1px solid rgba(16, 185, 129, 0.2);">
                    <strong>The Gas:</strong> Think of this as the <strong>Postage Stamp</strong>. You pay a small fee to the network "mailmen" (miners) to deliver your transaction.
                </div>
            </div>
            <div class="rookie-tip">
                <span class="rookie-tip-icon">💡</span>
                <div>
                    <strong>Pro Tip:</strong> Unlike a bank check, you MUST specify a <strong>Nonce</strong> (starting at 0). If you send a tx with Nonce 5 before Nonce 4, it will get stuck in the "Mempool" waiting for the previous ones to finish!
                </div>
            </div>
        </div>

        <div class="interactive-card">
            <div class="card-title">
                Transaction Construction Lab
                <span class="tag">EVM Payload</span>
            </div>
            
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 2rem;">
                <div style="display: flex; flex-direction: column; gap: 1rem;">
                    <div class="input-group" style="margin-bottom: 0;">
                        <label>Nonce (Account Sequence)</label>
                        <input type="number" id="tx-nonce" value="0" style="color: var(--accent-orange); font-weight: bold;">
                    </div>
                    <div class="input-group" style="margin-bottom: 0;">
                        <label>Gas Limit (Work Units)</label>
                        <input type="number" id="tx-gas-limit" value="21000">
                    </div>
                    <div class="input-group" style="margin-bottom: 0;">
                        <label>Max Gas Price (Gwei)</label>
                        <input type="number" id="tx-gas-price" value="50">
                    </div>
                </div>
                <div style="display: flex; flex-direction: column; gap: 1rem;">
                    <div class="input-group" style="margin-bottom: 0;">
                        <label>Recipient (To Address)</label>
                        <input type="text" id="tx-to" value="0x71C765...8976F" style="font-size: 0.75rem;">
                    </div>
                    <div class="input-group" style="margin-bottom: 0;">
                        <label>Amount (ETH)</label>
                        <input type="number" id="tx-value" value="0.5" step="0.1" style="color: var(--accent-green); font-weight: bold;">
                    </div>
                    <div class="input-group" style="margin-bottom: 0;">
                        <label>Call Data (Hex Payload)</label>
                        <textarea id="tx-data" rows="2" style="font-size: 0.8rem; font-family: var(--font-mono);">0x</textarea>
                    </div>
                </div>
            </div>

            <div class="result-area" style="margin-top: 1rem; flex-direction: column; align-items: flex-start;">
                <span class="result-label">Raw Signed Transaction (Recursive Length Prefix)</span>
                <div id="raw-tx" style="font-size: 0.7rem; word-break: break-all; color: var(--accent-purple);"></div>
            </div>

            <div style="margin-top: 2rem; display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--border-color); padding-top: 1.5rem;">
                <div>
                    <div style="font-size: 0.8rem; color: var(--text-secondary)">Total Gas Fee:</div>
                    <div id="total-fee" style="font-size: 1.2rem; font-weight: bold; color: var(--accent-orange)">0.00105 ETH</div>
                </div>
                <button id="send-tx" class="btn">Process Transaction</button>
            </div>
        </div>

        <div id="tx-feedback" style="margin-top: 1.5rem; display: none;" class="interactive-card">
            <!-- Feedback logic here -->
        </div>
    `;

    const inputs = ['tx-nonce', 'tx-gas-limit', 'tx-gas-price', 'tx-to', 'tx-value', 'tx-data'];
    const rawEl = document.getElementById('raw-tx');
    const feeEl = document.getElementById('total-fee');
    const sendBtn = document.getElementById('send-tx');
    const feedback = document.getElementById('tx-feedback');

    async function updateTx() {
        const gasLimit = parseFloat(document.getElementById('tx-gas-limit').value) || 0;
        const gasPrice = parseFloat(document.getElementById('tx-gas-price').value) || 0;
        const totalFee = (gasLimit * gasPrice) / 1000000000;
        feeEl.textContent = totalFee.toFixed(8) + " ETH";

        // Mock raw RLP encoding
        const raw = await sha256(inputs.map(id => document.getElementById(id).value).join(':'));
        rawEl.textContent = "0x" + raw + raw.substring(0, 40);
    }

    inputs.forEach(id => document.getElementById(id).addEventListener('input', updateTx));

    sendBtn.addEventListener('click', async () => {
        sendBtn.disabled = true;
        sendBtn.textContent = "Broadcasting...";

        await new Promise(r => setTimeout(r, 2000));

        feedback.style.display = 'block';
        feedback.innerHTML = `
            <h4 style="color: var(--accent-green)">Transaction Successful!</h4>
            <p style="font-size: 0.9rem; margin-top: 0.5rem; color: var(--text-secondary)">
                The transaction has been included in the mempool. Miners will verify the <strong>Nonce</strong> matches your account history and that you have enough balance to cover the <strong>Value + Gas Fee</strong>.
            </p>
        `;
        sendBtn.textContent = "Send Another";
        sendBtn.disabled = false;
    });

    updateTx();
}

async function sha256(message) {
    const msgBuffer = new TextEncoder().encode(message);
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}
