/**
 * Oracles Module
 */

export async function init(container) {
    container.innerHTML = `
        <div class="interactive-card">
            <div class="card-title">
                The Oracle Problem
                <span class="tag">External Data</span>
            </div>
            
            <p style="color: var(--text-secondary); margin-bottom: 2rem;">
                Blockchains are <strong>Deterministic</strong>. To ensure all nodes agree on the state, smart contracts cannot call external APIs (like Google or Weather.com) directly.
            </p>

            <div style="display: flex; flex-direction: column; align-items: center; gap: 2rem;">
                <!-- Real World -->
                <div style="width: 100%; padding: 1rem; background: rgba(59, 130, 246, 0.1); border: 1px solid var(--accent-blue); border-radius: 1rem; text-align: center;">
                    <span style="font-size: 0.7rem; text-transform: uppercase; color: var(--accent-blue)">Real World Data</span>
                    <div style="font-size: 1.5rem; margin-top: 0.5rem;" id="real-price">ETH: $2,451.20</div>
                    <small style="color: var(--text-secondary)">Changing every second...</small>
                </div>

                <!-- Oracle Network -->
                <div style="display: flex; gap: 1rem; align-items: center;">
                    <div style="width: 60px; height: 60px; background: var(--sidebar-bg); border: 1px solid var(--border-color); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 1.5rem;" class="oracle-node">🤖</div>
                    <div style="width: 60px; height: 60px; background: var(--sidebar-bg); border: 1px solid var(--border-color); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 1.5rem;" class="oracle-node">🤖</div>
                    <div style="width: 60px; height: 60px; background: var(--sidebar-bg); border: 1px solid var(--border-color); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 1.5rem;" class="oracle-node">🤖</div>
                </div>
                <div style="font-size: 0.8rem; color: var(--text-secondary)">Decentralized Oracle Network (DON)</div>

                <!-- Blockchain -->
                <div style="width: 100%; padding: 1rem; background: rgba(168, 85, 247, 0.1); border: 1px solid var(--accent-purple); border-radius: 1rem; text-align: center;">
                    <span style="font-size: 0.7rem; text-transform: uppercase; color: var(--accent-purple)">On-Chain State</span>
                    <div style="font-size: 1.5rem; margin-top: 0.5rem;" id="chain-price">ETH: [WAITING]</div>
                    <button id="update-price" class="btn" style="margin-top: 1rem; font-size: 0.7rem; padding: 0.4rem 1rem;">Update On-Chain Price</button>
                </div>
            </div>
        </div>
    `;

    const realPriceEl = document.getElementById('real-price');
    const chainPriceEl = document.getElementById('chain-price');
    const updateBtn = document.getElementById('update-price');
    const oracleNodes = document.querySelectorAll('.oracle-node');

    let currentPrice = 2451.20;

    // Simulate real world price fluctuatons
    setInterval(() => {
        currentPrice += (Math.random() - 0.5) * 10;
        realPriceEl.textContent = `ETH: $${currentPrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    }, 2000);

    updateBtn.addEventListener('click', async () => {
        updateBtn.disabled = true;
        updateBtn.textContent = "Nodes Consensus...";

        // Pulse nodes to show activity
        for (const node of oracleNodes) {
            node.style.borderColor = 'var(--accent-blue)';
            node.style.boxShadow = '0 0 10px var(--accent-blue)';
            await new Promise(r => setTimeout(r, 400));
        }

        chainPriceEl.textContent = `ETH: $${currentPrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
        chainPriceEl.style.color = 'var(--accent-green)';

        oracleNodes.forEach(n => {
            n.style.borderColor = 'var(--border-color)';
            n.style.boxShadow = 'none';
        });

        updateBtn.textContent = "Price Updated!";
        setTimeout(() => {
            updateBtn.disabled = false;
            updateBtn.textContent = "Update On-Chain Price";
        }, 2000);
    });
}
