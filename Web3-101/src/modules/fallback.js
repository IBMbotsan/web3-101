/**
 * Fallback & Receive Module
 */

export async function init(container) {
    container.innerHTML = `
        <div class="theory-section">
            <h3><span class="icon">📫</span> The Rookie's View: The Mail Slot</h3>
            <p>
                What happens if you send money to a house, but you don't say who it's for?
            </p>
            <div style="display: flex; gap: 1rem; margin-bottom: 1rem; background: rgba(245, 158, 11, 0.05); padding: 15px; border-radius: 8px; font-size: 0.85rem; border: 1px solid rgba(245, 158, 11, 0.2);">
                <div style="font-size: 1.5rem;">💌</div>
                <div>
                    A normal contract function is like a <strong>Front Door</strong>. You knock, say "Transfer!", and the door opens. But what if you just throw money at the house? The <strong>receive()</strong> function is like a <strong>Mail Slot</strong>. It catches any plain ETH dropped off without any specific instructions.
                </div>
            </div>
            <div class="rookie-tip">
                <span class="rookie-tip-icon">💡</span>
                <div>
                    <strong>Pro Tip:</strong> <strong>fallback()</strong> is the ultimate catch-all. If someone tries to call a function that doesn't exist (a "404" for contracts), the EVM triggers the fallback function to handle the error or redirect the call.
                </div>
            </div>
        </div>

        <div class="interactive-card">
            <div class="card-title">
                The Catch-All Visualization
                <span class="tag">EVM Routing</span>
            </div>
            
            <div style="background: rgba(0,0,0,0.2); border: 1px solid var(--border-color); border-radius: 1rem; padding: 1rem; margin-bottom: 1.5rem;">
                <div style="display: flex; flex-direction: column; md-flex-direction: row; gap: 2rem; align-items: stretch; justify-content: center;">
                    <!-- The User/Sender -->
                    <div style="flex: 1; text-align: center; background: rgba(255,255,255,0.02); padding: 1.5rem; border-radius: 12px; border: 1px solid rgba(255,255,255,0.05); display: flex; flex-direction: column; justify-content: center;">
                        <div style="font-size: 2.5rem; margin-bottom: 0.5rem;">👤</div>
                        <div style="font-size: 0.7rem; color: var(--text-secondary); margin-bottom: 1.5rem; letter-spacing: 1px;">SENDER (YOU)</div>
                        <div style="display: flex; flex-direction: column; gap: 10px;">
                            <button id="send-eth" class="btn" style="width: 100%; justify-content: center; background: var(--accent-green); font-weight: bold; font-size: 0.75rem;">SEND 1 ETH (NO DATA)</button>
                            <button id="send-data" class="btn" style="width: 100%; justify-content: center; background: var(--accent-blue); font-weight: bold; font-size: 0.75rem;">SEND TX (WRONG DATA)</button>
                        </div>
                    </div>

                    <!-- The Contract House -->
                    <div style="flex: 1; display: flex; flex-direction: column; gap: 1rem; justify-content: center;">
                        <div id="receive-box" class="func-box" style="width: 100%;">
                            <div class="func-label">receive() -> external payable</div>
                            <div class="func-body">💰 "I caught your plain ETH! Saving to balance..."</div>
                        </div>
                        <div id="fallback-box" class="func-box" style="width: 100%;">
                            <div class="func-label">fallback() -> external payable</div>
                            <div class="func-body">🕵️ "I don't know this function! Running emergency logic..."</div>
                        </div>
                    </div>
                </div>
            </div>

            <div id="fallback-feedback" class="result-area" style="margin-top: 2rem; min-height: 4rem;">
                <p>Send interaction to see how the contract responds to different inputs.</p>
            </div>
        </div>

        <style>
            .func-box {
                width: 220px;
                background: rgba(255, 255, 255, 0.05);
                border: 1px solid var(--border-color);
                border-radius: 8px;
                overflow: hidden;
                transition: all 0.3s;
            }
            .func-box.active {
                border-color: var(--accent-orange);
                box-shadow: 0 0 15px rgba(245, 158, 11, 0.2);
                transform: scale(1.05);
            }
            .func-label {
                background: rgba(0,0,0,0.3);
                padding: 6px 10px;
                font-family: var(--font-mono);
                font-size: 0.65rem;
                color: var(--text-secondary);
            }
            .func-body {
                padding: 10px;
                font-family: var(--font-mono);
                font-size: 0.7rem;
                color: var(--accent-orange);
                display: none;
            }
            .func-box.active .func-body { display: block; }
            
            #flow-dot.anim {
                display: block;
                animation: flowAcross 1s cubic-bezier(0.1, 0, 0.9, 1);
            }
            @keyframes flowAcross {
                0% { left: 0; opacity: 1; }
                80% { left: 100%; opacity: 1; }
                100% { left: 100%; opacity: 0; }
            }
        </style>
    `;

    const sendEth = document.getElementById('send-eth');
    const sendData = document.getElementById('send-data');
    const dot = document.getElementById('flow-dot');
    const receiveBox = document.getElementById('receive-box');
    const fallbackBox = document.getElementById('fallback-box');
    const feedback = document.getElementById('fallback-feedback');

    async function trigger(type) {
        sendEth.disabled = true;
        sendData.disabled = true;
        receiveBox.classList.remove('active');
        fallbackBox.classList.remove('active');

        dot.classList.remove('anim');
        void dot.offsetWidth; // trigger reflow
        dot.classList.add('anim');

        await new Promise(r => setTimeout(r, 1000));

        if (type === 'eth') {
            receiveBox.classList.add('active');
            feedback.innerHTML = `<h4 style="color:var(--accent-green)">ROUTED TO RECEIVE()</h4><p style="font-size:0.8rem">Since you sent ETH with NO data, the EVM triggered the specific <strong>receive()</strong> gate.</p>`;
        } else {
            fallbackBox.classList.add('active');
            feedback.innerHTML = `<h4 style="color:var(--accent-blue)">ROUTED TO FALLBACK()</h4><p style="font-size:0.8rem">Since you sent DATA that didn't match any function, the EVM triggered the <strong>fallback()</strong> catch-all.</p>`;
        }

        setTimeout(() => {
            sendEth.disabled = false;
            sendData.disabled = false;
        }, 1000);
    }

    sendEth.addEventListener('click', () => trigger('eth'));
    sendData.addEventListener('click', () => trigger('data'));
}
