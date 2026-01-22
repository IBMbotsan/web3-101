/**
 * MEV & Front-running Module
 */

export async function init(container) {
    container.innerHTML = `
        <div class="interactive-card">
            <div class="card-title">
                The Dark Forest (MEV)
                <span class="tag">Alpha</span>
            </div>
            
            <p style="color: var(--text-secondary); margin-bottom: 2rem;">
                MEV (Maximal Extractable Value) is the profit miners/validators extract by reordering, adding, or removing transactions in a block.
            </p>

            <div style="background: #020617; border: 1px solid var(--border-color); border-radius: 1rem; padding: 1.5rem;">
                <h4 style="color: var(--accent-orange); margin-bottom: 1.5rem; text-align: center;">PENDING TRANSACTIONS (MEMPOOL)</h4>
                
                <div id="mempool-viz" style="min-height: 200px; background: rgba(0,0,0,0.3); border-radius: 8px; padding: 1rem; display: flex; flex-direction: column; gap: 8px;">
                    <!-- Real txs and bot txs will appear here -->
                    <div style="text-align: center; color: var(--text-secondary); font-size: 0.8rem; margin-top: 2rem;">Mempool is empty. Use the form below to buy tokens.</div>
                </div>

                <div style="margin-top: 2rem; border-top: 1px solid var(--border-color); padding-top: 1.5rem;">
                    <div class="input-group">
                        <label>Buy 'MOON' Token (Slippage: 10%)</label>
                        <input type="text" id="buy-amount" value="10 ETH">
                    </div>
                    <button id="send-trade" class="btn" style="width: 100%;">SEND TRANSACTION</button>
                </div>
            </div>

            <div id="mev-explanation" class="result-area" style="margin-top: 1.5rem; border-left-color: #ef4444; min-height: 6rem;">
                <p>Submit a large trade and watch how bots react in the mempool.</p>
            </div>
        </div>

        <style>
            .tx-card {
                padding: 10px;
                border-radius: 4px;
                font-family: var(--font-mono);
                font-size: 0.7rem;
                display: flex;
                justify-content: space-between;
                animation: slideIn 0.3s ease-out;
            }
            .tx-user { border: 1px solid var(--accent-blue); background: rgba(59, 130, 246, 0.1); }
            .tx-bot { border: 1px solid #ef4444; background: rgba(239, 68, 68, 0.1); }
        </style>
    `;

    const mempool = document.getElementById('mempool-viz');
    const sendBtn = document.getElementById('send-trade');
    const feedback = document.getElementById('mev-explanation');

    sendBtn.addEventListener('click', async () => {
        sendBtn.disabled = true;
        mempool.innerHTML = '';

        // 1. User Tx
        const userTx = `<div class="tx-card tx-user"><span>👤 USER: Buy 10 ETH of MOON</span><span>Gas: 50 Gwei</span></div>`;
        mempool.innerHTML += userTx;
        feedback.innerHTML = "<strong>Broadcasted!</strong> Your transaction is in the public mempool...";

        await new Promise(r => setTimeout(r, 800));

        // 2. Bot Front-run
        const botFront = `<div class="tx-card tx-bot"><span>🤖 BOT-ABC: Buy 20 ETH of MOON</span><span>Gas: 51 Gwei</span></div>`;
        mempool.innerHTML = botFront + mempool.innerHTML;
        feedback.innerHTML = "⚠️ <strong>FRONT-RUN DETECTED!</strong> A bot saw your trade and paid higher gas to buy before you, driving the price up.";

        await new Promise(r => setTimeout(r, 800));

        // 3. Bot Back-run
        const botBack = `<div class="tx-card tx-bot"><span>🤖 BOT-ABC: Sell 20 ETH of MOON</span><span>Gas: 50 Gwei</span></div>`;
        mempool.innerHTML += botBack;
        feedback.innerHTML = "💀 <strong>SANDWICH ATTACK!</strong> The bot sold immediately after your trade, taking profit from the price impact you caused. You got a worse price.";

        sendBtn.textContent = "Try with Private RPC (Anti-MEV)?";
        setTimeout(() => {
            sendBtn.disabled = false;
        }, 1000);
    });
}
