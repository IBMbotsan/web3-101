/**
 * Events & Logs Module
 */

export async function init(container) {
    container.innerHTML = `
        <div class="theory-section">
            <h3><span class="icon">📢</span> The Rookie's View: The Speakerphone</h3>
            <p>
                Smart contracts don't have a screen or a console. How do they tell the world that something happened?
            </p>
            <div style="display: flex; gap: 1rem; margin-bottom: 1rem; background: rgba(59, 130, 246, 0.05); padding: 15px; border-radius: 8px; font-size: 0.85rem; border: 1px solid rgba(59, 130, 246, 0.2);">
                <div style="font-size: 1.5rem;">📣</div>
                <div>
                    An <strong>Event</strong> is like a <strong>Megaphone</strong> shout. Instead of writing data into a permanent ledger (which is very expensive), the contract "shouts" the info to the network. Your phone or web browser "listens" for these shouts to update your balance display.
                </div>
            </div>
            <div class="rookie-tip">
                <span class="rookie-tip-icon">💡</span>
                <div>
                    <strong>Pro Tip:</strong> Storing data in a contract variable is like <strong>buying a house</strong>. Emitting an event is like <strong>sending a postcard</strong>. Both tell people where you are, but the postcard is 100x cheaper!
                </div>
            </div>
        </div>

        <div class="interactive-card">
            <div class="card-title">
                Broadcast & Log Visualizer
                <span class="tag">Topic Indexing</span>
            </div>
            
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.5rem;">
                <!-- Contract Side -->
                <div style="background: rgba(168, 85, 247, 0.05); border: 1px solid var(--accent-purple); border-radius: 1rem; padding: 1.5rem; display: flex; flex-direction: column; justify-content: space-between;">
                    <div>
                        <h4 style="color: var(--accent-purple); margin-bottom: 1rem; font-size: 0.9rem;">Smart Contract Execution</h4>
                        <div style="font-family: var(--font-mono); font-size: 0.75rem; background: #020617; padding: 1rem; border-radius: 8px; margin-bottom: 1rem; border: 1px solid rgba(255,255,255,0.05);">
                            <span style="color: #94a3b8">// emit keyword broadcasts data</span><br>
                            emit <span style="color:#fbbf24">Transfer</span>(to, val);
                        </div>
                    </div>
                    <button id="emit-btn" class="btn" style="width: 100%; background: var(--accent-purple); justify-content: center; height: 45px; font-weight: bold;">
                        SEND 50 GOLD TOKENS
                    </button>
                </div>
                
                <!-- Log Observer -->
                <div style="background: #020617; border: 1px solid var(--border-color); border-radius: 1rem; padding: 1.5rem; display: flex; flex-direction: column;">
                    <h4 style="font-size: 0.8rem; margin-bottom: 1rem; text-align: center; color: var(--text-secondary);">BLOCKCHAIN LOGS (THE ARCHIVE)</h4>
                    <div id="event-log" style="height: 200px; overflow-y: auto; font-family: var(--font-mono); font-size: 0.7rem; color: var(--accent-green); scroll-behavior: smooth; -webkit-overflow-scrolling: touch;">
                        <div style="color: var(--text-secondary); opacity: 0.5;">Waiting for broadcast...</div>
                    </div>
                </div>
            </div>
        </div>

        <style>
            .log-entry {
                padding: 6px;
                border-bottom: 1px solid #1e293b;
                animation: slideIn 0.3s ease-out;
            }
            .log-topic { color: #fbbf24; font-weight: bold; }
        </style>
    `;

    const emitBtn = document.getElementById('emit-btn');
    const logContainer = document.getElementById('event-log');

    emitBtn.addEventListener('click', () => {
        const time = new Date().toLocaleTimeString();
        const entry = document.createElement('div');
        entry.className = 'log-entry';
        entry.innerHTML = `
            [${time}] <span class="log-topic">Transfer</span> Detected!<br>
            From: 0x71...8976f<br>
            To: 0xAb...1234<br>
            Value: 50.0 GOLD
        `;

        if (logContainer.children.length === 1 && logContainer.innerText.includes("Listening")) {
            logContainer.innerHTML = '';
        }

        logContainer.prepend(entry);

        emitBtn.disabled = true;
        emitBtn.textContent = "Event Emitted!";
        setTimeout(() => {
            emitBtn.disabled = false;
            emitBtn.textContent = "Transfer 50 GOLD Tokens";
        }, 1000);
    });
}
