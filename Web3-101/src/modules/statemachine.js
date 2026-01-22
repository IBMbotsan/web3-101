/**
 * The State Machine Module
 */

export async function init(container) {
    container.innerHTML = `
        <div class="theory-section">
            <h3><span class="icon">♟️</span> The Rookie's View: The World's Biggest Chess Game</h3>
            <p>
                Imagine a game of Chess where everyone in the world can see the board.
            </p>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1rem;">
                <div style="background: rgba(255,255,255,0.05); padding: 10px; border-radius: 8px; font-size: 0.85rem;">
                    <strong>The State:</strong> Where all the pieces are standing right now. If Alice has 100 coins and Bob has 50, that is the current "State."
                </div>
                <div style="background: rgba(255,255,255,0.05); padding: 10px; border-radius: 8px; font-size: 0.85rem;">
                    <strong>The Transaction:</strong> A move (Alice sends 20 to Bob). The computer checks if the move is legal, then updates the board.
                </div>
            </div>
            <div class="rookie-tip">
                <span class="rookie-tip-icon">💡</span>
                <div>
                    <strong>Pro Tip:</strong> A blockchain is just a "State Machine" that everyone runs on their own computer. Because everyone follows the SAME rules, everyone always agrees on the final score.
                </div>
            </div>
        </div>

        <div class="interactive-card">
            <div class="card-title">
                State Transition Simulator
                <span class="tag">System Logic</span>
            </div>
            
            <div style="display: flex; flex-direction: column; align-items: center; gap: 2rem;">
                
                <div style="display: flex; flex-wrap: wrap; gap: 1.5rem; width: 100%; align-items: stretch; justify-content: center;">
                    <!-- State A -->
                    <div class="state-node" id="state-a" style="min-width: 180px;">
                        <div class="state-header">STATE S (Before)</div>
                        <div class="state-content">
                            <div>Alice: 100</div>
                            <div>Bob: 50</div>
                        </div>
                    </div>

                    <!-- The Transition (Transaction) -->
                    <div style="display: flex; flex-direction: column; justify-content: center; align-items: center; gap: 10px; min-width: 100px;">
                        <div class="tx-payload" id="active-tx">
                            Alice → Bob (20)
                        </div>
                        <div style="font-size: 2rem; transform: rotate(0deg);" class="state-arrow">➡️</div>
                    </div>

                    <!-- State B -->
                    <div class="state-node pending" id="state-b" style="min-width: 180px;">
                        <div class="state-header">STATE S' (After)</div>
                        <div class="state-content" id="state-b-content">
                            <div>Alice: ???</div>
                            <div>Bob: ???</div>
                        </div>
                    </div>
                </div>

                <div style="width: 100%; max-width: 450px; background: rgba(0,0,0,0.2); padding: 1.5rem; border-radius: 1rem; border: 1px solid var(--border-color);">
                    <h5 style="margin-bottom: 1rem; text-align: center; color: var(--text-secondary);">The State Function</h5>
                    <div style="font-family: var(--font-mono); font-size: 1.1rem; text-align: center; color: var(--accent-blue); background: #020617; padding: 10px; border-radius: 8px; margin-bottom: 1.5rem;">
                        Apply(State, Tx) → New State
                    </div>
                    <button id="apply-tx" class="btn" style="width: 100%; background: var(--accent-blue); justify-content: center;">EXECUTE TRANSITION</button>
                    <button id="reset-state" class="btn" style="width: 100%; margin-top: 0.5rem; background: transparent; border: 1px solid var(--border-color); display: none; justify-content: center;">RESET SYSTEM</button>
                </div>
            </div>
        </div>

        <style>
            @media (max-width: 600px) {
                .state-arrow { transform: rotate(90deg) !important; }
            }
        </style>

        <style>
            .state-node {
                flex: 1;
                background: rgba(59, 130, 246, 0.05);
                border: 2px solid var(--accent-blue);
                border-radius: 12px;
                overflow: hidden;
                display: flex;
                flex-direction: column;
            }
            .state-node.pending {
                border-style: dashed;
                opacity: 0.5;
            }
            .state-header {
                background: var(--accent-blue);
                color: white;
                padding: 8px;
                font-size: 0.7rem;
                font-weight: bold;
                text-align: center;
            }
            .state-content {
                padding: 1.5rem;
                font-family: var(--font-mono);
                font-size: 0.9rem;
            }
            .tx-payload {
                padding: 10px 15px;
                background: rgba(168, 85, 247, 0.1);
                border: 1px solid var(--accent-purple);
                border-radius: 8px;
                font-family: var(--font-mono);
                font-size: 0.8rem;
                color: var(--accent-purple);
                animation: pulse 2s infinite;
            }
            @keyframes pulse {
                0% { transform: scale(1); }
                50% { transform: scale(1.05); }
                100% { transform: scale(1); }
            }
        </style>
    `;

    const applyBtn = document.getElementById('apply-tx');
    const resetBtn = document.getElementById('reset-state');
    const stateB = document.getElementById('state-b');
    const stateBContent = document.getElementById('state-b-content');
    const activeTx = document.getElementById('active-tx');

    applyBtn.addEventListener('click', async () => {
        applyBtn.disabled = true;
        applyBtn.textContent = "Computing State Transition...";

        await new Promise(r => setTimeout(r, 1200));

        stateB.classList.remove('pending');
        stateB.style.opacity = "1";
        stateBContent.innerHTML = `
            <div style="color: var(--accent-green)">Alice: 80</div>
            <div style="color: var(--accent-green)">Bob: 70</div>
        `;

        activeTx.style.animation = "none";
        activeTx.style.opacity = "0.5";

        applyBtn.textContent = "State Updated!";
        resetBtn.style.display = 'block';
    });

    resetBtn.addEventListener('click', () => {
        stateB.classList.add('pending');
        stateB.style.opacity = "0.5";
        stateBContent.innerHTML = `
            <div>Alice: ???</div>
            <div>Bob: ???</div>
        `;
        activeTx.style.animation = "pulse 2s infinite";
        activeTx.style.opacity = "1";
        applyBtn.disabled = false;
        applyBtn.textContent = "APPLY TRANSACTION";
        resetBtn.style.display = 'none';
    });
}
