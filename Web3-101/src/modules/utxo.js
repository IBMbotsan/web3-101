/**
 * UTXO vs Account Model Module
 */

export async function init(container) {
    container.innerHTML = `
        <div class="theory-section">
            <h3><span class="icon">📖</span> The Rookie's View: Cash vs. Bank Accounts</h3>
            <p>
                Imagine you have two ways to pay for a $10 pizza:
            </p>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1rem;">
                <div style="background: rgba(255,255,255,0.05); padding: 10px; border-radius: 8px; font-size: 0.85rem;">
                    <strong>Method A (UTXO):</strong> You use a $20 bill. The pizza shop takes it and gives you a $10 bill back. You now have a <em>new</em> piece of cash.
                </div>
                <div style="background: rgba(255,255,255,0.05); padding: 10px; border-radius: 8px; font-size: 0.85rem;">
                    <strong>Method B (Account):</strong> You use a debit card. The bank just updates a number on their screen. No physical "bills" move.
                </div>
            </div>
            <div class="rookie-tip">
                <span class="rookie-tip-icon">💡</span>
                <div>
                    <strong>Pro Tip:</strong> Bitcoin uses UTXO because it's easier to verify "valid coins" without checking every account balance in the world. Ethereum uses Accounts because it's easier for complex Smart Contracts to read.
                </div>
            </div>
        </div>

        <div class="interactive-card">
            <div class="card-title">
                Live Simulator: The Models in Action
                <span class="tag">Interactive</span>
            </div>
            
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.5rem;">
                
                <!-- UTXO Model -->
                <div style="background: rgba(245, 158, 11, 0.05); border: 1px solid var(--accent-orange); border-radius: 1rem; padding: 1.5rem; display: flex; flex-direction: column;">
                    <h4 style="color: var(--accent-orange); text-align: center; margin-bottom: 1rem;">UTXO (Bitcoin Type)</h4>
                    <div id="utxo-inventory" style="min-height: 120px; display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 1rem; align-content: flex-start;">
                        <div class="utxo-box">0.5 BTC</div>
                        <div class="utxo-box">0.2 BTC</div>
                        <div class="utxo-box">1.3 BTC</div>
                    </div>
                    <div style="margin-top: auto;">
                        <button id="utxo-send" class="btn" style="width: 100%; font-size: 0.75rem; background: var(--accent-orange)">Send 1.0 BTC</button>
                        <p style="font-size: 0.7rem; color: var(--text-secondary); margin-top: 1rem;">
                            <strong>Logic:</strong> We must consume "coins". We'll use the 1.3 BTC coin and get 0.3 BTC back.
                        </p>
                    </div>
                </div>

                <!-- Account Model -->
                <div style="background: rgba(59, 130, 246, 0.05); border: 1px solid var(--accent-blue); border-radius: 1rem; padding: 1.5rem; display: flex; flex-direction: column;">
                    <h4 style="color: var(--accent-blue); text-align: center; margin-bottom: 1rem;">ACCOUNT (Ethereum Type)</h4>
                    <div style="text-align: center; margin-bottom: 1.5rem; flex: 1; display: flex; flex-direction: column; justify-content: center;">
                        <div style="font-size: 0.7rem; color: var(--text-secondary)">YOUR BALANCE</div>
                        <div id="account-balance" style="font-size: 2.5rem; font-weight: bold;">2.0 ETH</div>
                    </div>
                    <div style="margin-top: auto;">
                        <button id="account-send" class="btn" style="width: 100%; font-size: 0.75rem; background: var(--accent-blue)">Send 1.0 ETH</button>
                        <p style="font-size: 0.7rem; color: var(--text-secondary); margin-top: 1rem;">
                            <strong>Logic:</strong> Just subtraction. No "change" needed. Very simple for programming.
                        </p>
                    </div>
                </div>

            </div>

            <div id="model-feedback" class="result-area" style="margin-top: 2rem; min-height: 5rem;">
                <p>Click a button to see how the ledger updates!</p>
            </div>
        </div>

        <style>
            .utxo-box {
                padding: 8px 12px;
                background: rgba(245, 158, 11, 0.2);
                border: 1px solid var(--accent-orange);
                border-radius: 4px;
                font-family: var(--font-mono);
                font-size: 0.75rem;
                animation: popIn 0.3s ease-out;
            }
            .utxo-box.consumed {
                opacity: 0.3;
                text-decoration: line-through;
                transform: scale(0.9);
            }
            @keyframes popIn {
                0% { transform: scale(0.8); opacity: 0; }
                100% { transform: scale(1); opacity: 1; }
            }
        </style>
    `;

    const utxoContainer = document.getElementById('utxo-inventory');
    const utxoSendBtn = document.getElementById('utxo-send');
    const accountBalEl = document.getElementById('account-balance');
    const accountSendBtn = document.getElementById('account-send');
    const feedback = document.getElementById('model-feedback');

    let coins = [0.5, 0.2, 1.3];
    let balance = 2.0;

    utxoSendBtn.addEventListener('click', async () => {
        utxoSendBtn.disabled = true;
        feedback.innerHTML = "<strong>UTXO Logic:</strong> Scanning for a coin large enough... Found 1.3 BTC coin.";

        const target = utxoContainer.children[2];
        target.classList.add('consumed');

        await new Promise(r => setTimeout(r, 1000));

        feedback.innerHTML = "<strong>UTXO Logic:</strong> Consuming 1.3 BTC. Sending 1.0 BTC to recipient. Generating 0.3 BTC change coin for you.";

        const changeCoin = document.createElement('div');
        changeCoin.className = 'utxo-box';
        changeCoin.textContent = '0.3 BTC';
        utxoContainer.appendChild(changeCoin);

        setTimeout(() => {
            utxoSendBtn.textContent = "Transaction Done";
        }, 1000);
    });

    accountSendBtn.addEventListener('click', async () => {
        accountSendBtn.disabled = true;
        feedback.innerHTML = "<strong>Account Logic:</strong> Checking balance... (2.0 >= 1.0). Deducting 1.0 ETH.";

        await new Promise(r => setTimeout(r, 800));

        balance -= 1.0;
        accountBalEl.textContent = balance.toFixed(1) + " ETH";

        feedback.innerHTML = "<strong>Account Logic:</strong> Nonce incremented. Balance updated globally. State transition complete.";

        setTimeout(() => {
            accountSendBtn.textContent = "Transaction Done";
        }, 1000);
    });
}
