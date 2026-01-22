/**
 * Layer 2 & Rollups Module
 */

export async function init(container) {
    container.innerHTML = `
        <div class="theory-section">
            <h3><span class="icon">🚌</span> The Rookie's View: The Carpool Lane</h3>
            <p>
                Ethereum is like a busy highway with a $50 toll. If everyone drives their own car, it's expensive and slow.
            </p>
            <div style="display: flex; gap: 1rem; margin-bottom: 1rem; background: rgba(168, 85, 247, 0.05); padding: 15px; border-radius: 8px; font-size: 0.85rem; border: 1px solid rgba(168, 85, 247, 0.2);">
                <div style="font-size: 1.5rem;">🚍</div>
                <div>
                    A <strong>Rollup</strong> (Layer 2) is like a <strong>Private Bus</strong>. 100 people get on the bus, they split the $50 toll, and they arrive at the destination together. Each person only pays $0.50! The "Bus Driver" (Sequencer) just sends one single message to the highway saying "100 people finished their trip."
                </div>
            </div>
            <div class="rookie-tip">
                <span class="rookie-tip-icon">💡</span>
                <div>
                    <strong>Pro Tip:</strong> There are two main flavors. <strong>Optimistic Rollups</strong> (Arbitrum/Optimism) assume everyone is honest unless proven otherwise. <strong>ZK Rollups</strong> (zkSync/Base) use advanced math to prove everything is 100% correct instantly.
                </div>
            </div>
        </div>

        <div class="interactive-card">
            <div class="card-title">
                Scaling Simulator (L1 vs L2)
                <span class="tag">Throughput</span>
            </div>
            
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.5rem; position: relative;">
                
                <!-- Off-Chain Processing -->
                <div style="background: rgba(168, 85, 247, 0.02); border: 1px dashed var(--accent-purple); border-radius: 1rem; padding: 1.5rem; display: flex; flex-direction: column;">
                    <h4 style="color: var(--accent-purple); text-align: center; margin-bottom: 1rem; font-size: 0.8rem; letter-spacing: 1px;">L2 OPERATOR (THE BUS)</h4>
                    <div id="tx-pool" style="flex: 1; height: 180px; overflow-y: auto; padding: 10px; background: rgba(0,0,0,0.2); border-radius: 8px; margin-bottom: 1rem;">
                        <div style="color: var(--text-secondary); opacity: 0.5; font-size: 0.7rem;">Wait for passengers...</div>
                    </div>
                    <div style="display: flex; flex-direction: column; gap: 8px;">
                        <button id="add-tx-fast" class="btn" style="width: 100%; justify-content: center; font-size: 0.75rem; height: 40px;">+ ADD TRANSACTION</button>
                        <button id="roll-up" class="btn" style="width: 100%; justify-content: center; font-size: 0.75rem; background: var(--accent-orange); height: 40px; font-weight: bold;">📦 SEND BATCH TO L1</button>
                    </div>
                </div>

                <!-- On-Chain Security -->
                <div style="background: rgba(59, 130, 246, 0.05); border: 1px solid var(--accent-blue); border-radius: 1rem; padding: 1.5rem;">
                    <h4 style="color: var(--accent-blue); text-align: center; margin-bottom: 1rem;">LAYER 1 (Ethereum)</h4>
                    <div id="l1-blocks" style="display: flex; flex-direction: column-reverse; gap: 10px; height: 250px;">
                         <div style="background: var(--sidebar-bg); padding: 10px; border-radius: 4px; border-left: 4px solid var(--accent-blue); font-size: 0.7rem;">Block #18,231,102<br>State Root Verified</div>
                    </div>
                </div>

                <!-- Arrow Animation -->
                <div id="batch-anim" style="position: absolute; top: 50%; left: 45%; font-size: 2rem; display: none;">📦➡️</div>
            </div>

            <div style="margin-top: 2rem; display: flex; justify-content: space-around; text-align: center;">
                <div>
                    <div style="font-size: 0.7rem; color: var(--text-secondary)">L1 COST</div>
                    <div style="font-size: 1.5rem; font-weight: bold; color: #ef4444">$42.50</div>
                </div>
                <div>
                    <div style="font-size: 0.7rem; color: var(--text-secondary)">L2 COST</div>
                    <div style="font-size: 1.5rem; font-weight: bold; color: var(--accent-green)">$0.05</div>
                </div>
            </div>
        </div>
    `;

    const txPool = document.getElementById('tx-pool');
    const addBtn = document.getElementById('add-tx-fast');
    const rollBtn = document.getElementById('roll-up');
    const l1Blocks = document.getElementById('l1-blocks');
    const anim = document.getElementById('batch-anim');

    let txCounter = 0;

    addBtn.addEventListener('click', () => {
        txCounter++;
        const tx = document.createElement('div');
        tx.className = 'tx-item';
        tx.style.cssText = "background: var(--sidebar-bg); padding: 4px 8px; border-radius: 2px; font-family: var(--font-mono); font-size: 0.6rem; border-left: 2px solid var(--accent-purple); animation: slideIn 0.2s ease-out;";
        tx.innerHTML = `L2_TX_${txCounter}: Alice -> Bob (0.1 ETH)`;
        txPool.appendChild(tx);
        txPool.scrollTop = txPool.scrollHeight;
    });

    rollBtn.addEventListener('click', async () => {
        if (txPool.children.length === 0) return alert("Add some transactions first!");

        rollBtn.disabled = true;
        anim.style.display = 'block';

        await new Promise(r => setTimeout(r, 1000));

        anim.style.display = 'none';
        const count = txPool.children.length;
        txPool.innerHTML = '';

        const block = document.createElement('div');
        block.style.cssText = "background: rgba(245, 158, 11, 0.1); padding: 10px; border-radius: 4px; border-left: 4px solid var(--accent-orange); font-size: 0.7rem; animation: slideIn 0.3s ease-out;";
        block.innerHTML = `<strong>Rollup Batch #${Math.floor(Math.random() * 1000)}</strong><br>Compressed ${count} Transactions<br>Commit: 0x${Math.random().toString(16).slice(2, 10)}`;

        l1Blocks.prepend(block);
        rollBtn.disabled = false;
        txCounter = 0;
    });
}
