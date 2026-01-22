/**
 * Reentrancy Security Lab Module
 */

export async function init(container) {
    container.innerHTML = `
        <div class="theory-section">
            <h3><span class="icon">🚨</span> The Rookie's View: The Broken ATM</h3>
            <p>
                This is the most famous bug in crypto. It's the one that caused the "DAO Hack" and essentially split Ethereum in two.
            </p>
            <div style="display: flex; gap: 1rem; margin-bottom: 1rem; background: rgba(239, 68, 68, 0.05); padding: 15px; border-radius: 8px; font-size: 0.85rem; border: 1px solid rgba(239, 68, 68, 0.2);">
                <div style="font-size: 1.5rem;">🏦</div>
                <div>
                    Imagine an ATM that gives you cash <strong>first</strong>, and only deducts it from your balance <strong>after</strong> you say "Goodbye". If you just keep asking for money without saying "Goodbye", the machine never updates your balance! You can empty the whole bank with just $10.
                </div>
            </div>
            <div class="rookie-tip">
                <span class="rookie-tip-icon">💡</span>
                <div>
                    <strong>Pro Tip:</strong> To fix this, developers use the <strong>Checks-Effects-Interactions</strong> pattern. Always update the user's balance to zero <em>before</em> sending them the money. Even if they try to enter again, the code will see their balance is already zero!
                </div>
            </div>
        </div>

        <div class="interactive-card">
            <div class="card-title">
                The Reentrancy Security Lab
                <span class="tag">Exploit Demo</span>
            </div>
            
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.5rem;">
                <!-- Victim Contract -->
                <div style="background: rgba(16, 185, 129, 0.05); border: 1px solid var(--accent-green); border-radius: 1rem; padding: 1.5rem; text-align: center; display: flex; flex-direction: column; justify-content: space-between;">
                    <div>
                        <h4 style="color: var(--accent-green); font-size: 0.9rem;">VULNERABLE BANK</h4>
                        <div style="font-size: 2.2rem; font-weight: bold; margin: 1rem 0; color: var(--text-primary);" id="bank-bal">1,000 ETH</div>
                        <div style="font-family: var(--font-mono); font-size: 0.65rem; background: #020617; padding: 12px; border-radius: 8px; text-align: left; border: 1px solid rgba(255,255,255,0.05);">
                            function withdraw() {<br>
                            &nbsp;&nbsp;<span style="color:#3b82f6">// 1. Send money first</span><br>
                            &nbsp;&nbsp;msg.sender.call{v: bal}("");<br>
                            &nbsp;&nbsp;<span style="color:#ef4444">// 2. Update bal too late</span><br>
                            &nbsp;&nbsp;balance[msg.sender] = 0;<br>
                            }
                        </div>
                    </div>
                </div>

                <!-- Attacker Contract -->
                <div style="background: rgba(239, 68, 68, 0.05); border: 1px solid #ef4444; border-radius: 1rem; padding: 1.5rem; text-align: center;">
                    <h4 style="color: #ef4444">ATTACKER CONTRACT</h4>
                    <div style="font-size: 2rem; font-weight: bold; margin: 1rem 0;" id="attacker-bal">0 ETH</div>
                    <button id="hack-btn" class="btn" style="width: 100%; background: #ef4444">EXECUTE REENTRANCY</button>
                    <p style="font-size: 0.7rem; color: var(--text-secondary); margin-top: 1rem;">
                        The attacker's "fallback" function calls bank.withdraw() recursively.
                    </p>
                </div>
            </div>

            <div id="hack-log" class="result-area" style="margin-top: 2rem; height: 120px; overflow-y: auto;">
                <p>Click "Execute" to start the recursive loop.</p>
            </div>
        </div>

        <style>
            .log-red { color: #ef4444; font-family: var(--font-mono); font-size: 0.7rem; border-bottom: 1px solid #1e293b; padding: 4px; }
        </style>
    `;

    const hackBtn = document.getElementById('hack-btn');
    const bankBalEl = document.getElementById('bank-bal');
    const attackerBalEl = document.getElementById('attacker-bal');
    const log = document.getElementById('hack-log');

    let bankBal = 1000;
    let attackerBal = 0;

    hackBtn.addEventListener('click', async () => {
        hackBtn.disabled = true;
        hackBtn.textContent = "HACKING...";
        log.innerHTML = '';

        while (bankBal > 0) {
            bankBal -= 100;
            attackerBal += 100;

            const entry = document.createElement('div');
            entry.className = 'log-red';
            entry.textContent = `[Reentered] Withdrawing 100 ETH before balance reset!`;
            log.prepend(entry);

            bankBalEl.textContent = bankBal + " ETH";
            attackerBalEl.textContent = attackerBal + " ETH";

            await new Promise(r => setTimeout(r, 400));
        }

        const final = document.createElement('div');
        final.style.color = "var(--accent-green)";
        final.style.marginTop = "10px";
        final.innerHTML = "<strong>CRITICAL HACK COMPLETE!</strong> The Bank is empty. Total Stolen: 1,000 ETH.";
        log.prepend(final);

        hackBtn.textContent = "HACK SUCCESS";
    });
}
