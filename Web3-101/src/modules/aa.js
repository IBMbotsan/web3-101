/**
 * Account Abstraction (AA) Module
 */

export async function init(container) {
    container.innerHTML = `
        <div class="theory-section">
            <h3><span class="icon">🔓</span> The Rookie's View: The Smart Lock</h3>
            <p>
                Normal wallets are like physical metal keys. If you lose the key, you lose the house. <strong>Account Abstraction</strong> changes that.
            </p>
            <div style="display: flex; gap: 1rem; margin-bottom: 1rem; background: rgba(59, 130, 246, 0.05); padding: 15px; border-radius: 8px; font-size: 0.85rem; border: 1px solid rgba(59, 130, 246, 0.2);">
                <div style="font-size: 1.5rem;">📱</div>
                <div>
                    Imagine your wallet is a <strong>Smart Lock</strong> with FaceID and a keypad. You can set rules: "Don't let me spend more than $50 a day," or "If I lose my phone, my 3 best friends can help me reset the password." This is <strong>Social Recovery</strong>. Best of all: you don't even need to carry ETH to pay for Gas; the app can pay it for you!
                </div>
            </div>
            <div class="rookie-tip">
                <span class="rookie-tip-icon">💡</span>
                <div>
                    <strong>Pro Tip:</strong> This is the key to mass adoption. With AA, using a blockchain feels just like using a normal app. No seed phrases, no gas management, just a smooth experience.
                </div>
            </div>
        </div>

        <div class="interactive-card">
            <div class="card-title">
                Smart Account Lab (ERC-4337)
                <span class="tag">Next-Gen UX</span>
            </div>
            
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.5rem;">
                
                <!-- Feature 1: Social Recovery -->
                <div style="background: rgba(59, 130, 246, 0.02); border: 1px solid var(--accent-blue); border-radius: 1rem; padding: 1.5rem; display: flex; flex-direction: column;">
                    <h4 style="color: var(--accent-blue); margin-bottom: 0.5rem; font-size: 0.8rem; letter-spacing: 1px;">SOCIAL RECOVERY</h4>
                    <p style="font-size: 0.8rem; margin-bottom: 1.5rem; color: var(--text-secondary)">Lost your key? Guardians verify your identity to reset it.</p>
                    
                    <div style="display: flex; gap: 8px; margin-bottom: 1.5rem;">
                        <div class="guardian active">🛡️ Alice</div>
                        <div class="guardian active">🛡️ Bob</div>
                        <div class="guardian" id="guardian-3">🛡️ Charlie</div>
                    </div>
                    
                    <button id="recover-btn" class="btn" style="width: 100%; justify-content: center; font-size: 0.75rem; background: var(--accent-blue); font-weight: bold;">CHARLIE APPROVES RESET</button>
                    <div id="recovery-msg" style="font-size: 0.7rem; margin-top: 1rem; color: var(--accent-green); background: rgba(16, 185, 129, 0.1); padding: 8px; border-radius: 4px; display: none;">✅ Threshold reached! Access restored.</div>
                </div>

                <!-- Feature 2: Paymasters -->
                <div style="background: rgba(168, 85, 247, 0.02); border: 1px solid var(--accent-purple); border-radius: 1rem; padding: 1.5rem; display: flex; flex-direction: column;">
                    <h4 style="color: var(--accent-purple); margin-bottom: 0.5rem; font-size: 0.8rem; letter-spacing: 1px;">GASLESS TRADES</h4>
                    <p style="font-size: 0.8rem; margin-bottom: 1.5rem; color: var(--text-secondary)">No ETH? No problem. The app or a Paymaster covers the cost.</p>
                    
                    <div style="background: #000; padding: 1rem; border-radius: 8px; font-family: var(--font-mono); font-size: 0.7rem; margin-bottom: 1.5rem; border: 1px solid rgba(255,255,255,0.05);">
                        <div style="color: var(--text-secondary)">ETH: <span style="color: #ef4444">0.00</span></div>
                        <div style="color: var(--text-secondary)">USDC: <span style="color: var(--accent-green)">50.00</span></div>
                    </div>
                    
                    <button id="gasless-btn" class="btn" style="width: 100%; justify-content: center; font-size: 0.75rem; background: var(--accent-purple); font-weight: bold;">SWAP (SPONSORED)</button>
                    <div id="gasless-msg" style="font-size: 0.7rem; margin-top: 1rem; color: var(--accent-green); background: rgba(16, 185, 129, 0.1); padding: 8px; border-radius: 4px; display: none;">🚀 Transfer successful! App paid your gas.</div>
                </div>
            </div>
        </div>

        <style>
            .guardian {
                flex: 1;
                padding: 4px;
                background: var(--sidebar-bg);
                border: 1px solid var(--border-color);
                border-radius: 4px;
                font-size: 0.7rem;
                text-align: center;
                opacity: 0.4;
            }
            .guardian.active {
                opacity: 1;
                border-color: var(--accent-green);
                color: var(--accent-green);
                background: rgba(16, 185, 129, 0.1);
            }
        </style>
    `;

    const recoverBtn = document.getElementById('recover-btn');
    const guardian3 = document.getElementById('guardian-3');
    const recoveryMsg = document.getElementById('recovery-msg');

    const gaslessBtn = document.getElementById('gasless-btn');
    const gaslessMsg = document.getElementById('gasless-msg');

    recoverBtn.addEventListener('click', () => {
        guardian3.classList.add('active');
        recoveryMsg.style.display = 'block';
        recoverBtn.disabled = true;
        recoverBtn.textContent = "Identity Verified";
    });

    gaslessBtn.addEventListener('click', async () => {
        gaslessBtn.disabled = true;
        gaslessBtn.textContent = "Bundling UserOp...";
        await new Promise(r => setTimeout(r, 1500));
        gaslessMsg.style.display = 'block';
        gaslessBtn.textContent = "Transaction Done";
    });
}
