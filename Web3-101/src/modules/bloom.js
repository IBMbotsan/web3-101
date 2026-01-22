/**
 * Bloom Filters Module: Light Clients
 */

export async function init(container) {
    container.innerHTML = `
        <div class="theory-section">
            <h3><span class="icon">🔍</span> The Rookie's View: The "Maybe" Filter</h3>
            <p>
                Imagine a lost and found box with 10,000 items. Instead of rummaging through everything, you check a list on the door.
            </p>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1rem;">
                <div style="background: rgba(168, 85, 247, 0.05); padding: 12px; border-radius: 8px; font-size: 0.85rem; border: 1px solid rgba(168, 85, 247, 0.2);">
                    <strong>"No":</strong> If your item isn't on the list, it's 100% NOT in the box. You save time and leave.
                </div>
                <div style="background: rgba(168, 85, 247, 0.05); padding: 12px; border-radius: 8px; font-size: 0.85rem; border: 1px solid rgba(168, 85, 247, 0.2);">
                    <strong>"Maybe":</strong> If the list says "Hat," it <em>might</em> be yours, or it might be someone else's. You go inside to verify.
                </div>
            </div>
            <div class="rookie-tip">
                <span class="rookie-tip-icon">💡</span>
                <div>
                    <strong>Pro Tip:</strong> Bloom filters allow your mobile wallet to stay small. It only asks the "Full Nodes" for block data when there's a "Maybe," ignoring the 99% of data that is "Definitely Not" yours.
                </div>
            </div>
        </div>

        <div class="interactive-card">
            <div class="card-title">
                Bloom Filter Simulator
                <span class="tag">Efficiency</span>
            </div>
            
            <div style="background: rgba(168, 85, 247, 0.05); border: 1px solid var(--accent-purple); border-radius: 1rem; padding: 1.5rem;">
                <h4 style="color: var(--accent-purple); text-align: center; margin-bottom: 1.5rem; font-size: 0.9rem;">Current Filter (16-Bit Array)</h4>
                
                <div id="bloom-bits" style="display: flex; flex-wrap: wrap; gap: 6px; justify-content: center; margin-bottom: 2rem; max-width: 400px; margin-left: auto; margin-right: auto;">
                    <!-- 16 bits -->
                    ${Array(16).fill(0).map((_, i) => `<div class="bloom-bit" id="bit-${i}">0</div>`).join('')}
                </div>

                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem;">
                    <div>
                        <label style="font-size: 0.7rem; color: var(--text-secondary);">Register Address</label>
                        <input type="text" id="bloom-add-val" placeholder="0x123..." style="width: 100%; margin-top: 4px; margin-bottom: 0.5rem;">
                        <button id="bloom-add-btn" class="btn" style="width: 100%; height: 38px; background: var(--accent-purple); font-size: 0.75rem; justify-content: center;">ADD TO FILTER</button>
                    </div>
                    <div>
                        <label style="font-size: 0.7rem; color: var(--text-secondary);">Search Filter</label>
                        <input type="text" id="bloom-check-val" placeholder="Check address..." style="width: 100%; margin-top: 4px; margin-bottom: 0.5rem;">
                        <button id="bloom-check-btn" class="btn" style="width: 100%; height: 38px; background: transparent; border: 1px solid var(--accent-purple); font-size: 0.75rem; justify-content: center;">CHECK MEMBERSHIP</button>
                    </div>
                </div>
            </div>

            <div id="bloom-feedback" class="result-area" style="margin-top: 1.5rem; min-height: 4rem; border-left-color: var(--accent-purple);">
                <p>Try adding an address and then checking the membership.</p>
            </div>
        </div>

        <style>
            .bloom-bit {
                width: 30px;
                height: 40px;
                background: #1e293b;
                border: 1px solid var(--border-color);
                border-radius: 4px;
                display: flex;
                align-items: center;
                justify-content: center;
                font-family: var(--font-mono);
                font-size: 1.2rem;
                color: var(--text-secondary);
                transition: all 0.3s;
            }
            .bloom-bit.on {
                background: var(--accent-purple);
                color: white;
                border-color: #d8b4fe;
                box-shadow: 0 0 10px var(--accent-purple);
            }
        </style>
    `;

    const addVal = document.getElementById('bloom-add-val');
    const addBtn = document.getElementById('bloom-add-btn');
    const checkVal = document.getElementById('bloom-check-val');
    const checkBtn = document.getElementById('bloom-check-btn');
    const feedback = document.getElementById('bloom-feedback');

    // Simple hash function for demo
    function getHashes(str) {
        let h1 = 0;
        let h2 = 0;
        for (let i = 0; i < str.length; i++) {
            h1 = (h1 + str.charCodeAt(i)) % 16;
            h2 = (h2 + str.charCodeAt(i) * 3) % 16;
        }
        return [h1, h2];
    }

    addBtn.addEventListener('click', () => {
        const val = addVal.value.trim();
        if (!val) return;

        const [idx1, idx2] = getHashes(val);
        document.getElementById(`bit-${idx1}`).classList.add('on');
        document.getElementById(`bit-${idx1}`).textContent = '1';
        document.getElementById(`bit-${idx2}`).classList.add('on');
        document.getElementById(`bit-${idx2}`).textContent = '1';

        feedback.innerHTML = `<strong>Added!</strong> The address was hashed to indices <strong>${idx1}</strong> and <strong>${idx2}</strong>. Those bits are now set to 1.`;
        addVal.value = '';
    });

    checkBtn.addEventListener('click', () => {
        const val = checkVal.value.trim();
        if (!val) return;

        const [idx1, idx2] = getHashes(val);
        const bit1 = document.getElementById(`bit-${idx1}`).classList.contains('on');
        const bit2 = document.getElementById(`bit-${idx2}`).classList.contains('on');

        if (bit1 && bit2) {
            feedback.innerHTML = `<h4 style="color:var(--accent-purple)">MAYBE! 📦</h4>
                                 <p style="font-size:0.8rem">Both bits (${idx1}, ${idx2}) are set. This address <em>might</em> be in the set. You should ask a full node for the exact blocks.</p>`;
        } else {
            feedback.innerHTML = `<h4 style="color:#ef4444">DEFINITELY NOT! ❌</h4>
                                 <p style="font-size:0.8rem">At least one bit is 0. This address is 100% not in the set. You can safely ignore this block.</p>`;
        }
    });
}
