/**
 * ZK-Proofs Module: Privacy & Scalability
 */

export async function init(container) {
    container.innerHTML = `
        <div class="theory-section">
            <h3><span class="icon">㊙️</span> The Rookie's View: The Magic Cave</h3>
            <p>
                How do you prove you're 21 years old without showing your ID (which has your name and address)?
            </p>
            <div style="display: flex; gap: 1rem; margin-bottom: 1rem; background: rgba(168, 85, 247, 0.05); padding: 15px; border-radius: 8px; font-size: 0.85rem; border: 1px solid rgba(168, 85, 247, 0.2);">
                <div style="font-size: 1.5rem;">🕵️</div>
                <div>
                    Imagine a <strong>Circular Cave</strong> with a locked door in the middle. You want to prove you have the key. Your friend waits outside and shouts "Come out the left side!". If you have the key, you can do it every time. If you don't, you'd fail eventually. Your friend is 100% sure you have the key, but they <strong>never saw the key</strong> and don't know the code!
                </div>
            </div>
            <div class="rookie-tip">
                <span class="rookie-tip-icon">💡</span>
                <div>
                    <strong>Pro Tip:</strong> This is the future of privacy. In the future, you could prove you have enough money for a house, or that you passed a background check, without ever sharing your bank statements or private data.
                </div>
            </div>
        </div>

        <div class="interactive-card">
            <div class="card-title">
                Zero-Knowledge Lab
                <span class="tag">Privacy Math</span>
            </div>
            
            <div style="background: rgba(0,0,0,0.2); border: 1px solid var(--border-color); border-radius: 1rem; padding: 1.5rem; text-align: center;">
                <h4 style="color: var(--accent-purple); margin-bottom: 1rem; font-size: 0.8rem; letter-spacing: 1px;">THE PROVER'S CHALLENGE</h4>
                <p style="font-size: 0.85rem; color: var(--text-secondary); margin-bottom: 1.5rem;">
                    Pick a "brick" to hide your secret, then generate a mathematical proof for the Verifier.
                </p>

                <div id="zk-playground" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(25px, 1fr)); gap: 4px; max-width: 400px; margin: 0 auto; padding: 10px; background: rgba(168, 85, 247, 0.03); border-radius: 8px; border: 1px solid rgba(168, 85, 247, 0.1);">
                    <!-- 100 bricks -->
                    ${Array(100).fill(0).map((_, i) => `<div class="brick" data-id="${i}" style="height: 25px; background: #1e293b; border-radius: 4px; cursor: pointer; transition: all 0.2s;"></div>`).join('')}
                </div>

                <div style="margin-top: 2rem;">
                    <button id="zk-prove" class="btn" style="background: var(--accent-purple)">Generate Proof</button>
                    <button id="zk-verify" class="btn" style="margin-left: 1rem; display: none; background: var(--accent-green)">Verify Proof</button>
                </div>
            </div>

            <div id="zk-feedback" style="margin-top: 1.5rem; min-height: 4rem;" class="result-area">
                <p>Click a "brick" to hide your secret there.</p>
            </div>
        </div>

        <style>
            .brick.secret { background: var(--accent-orange) !important; box-shadow: 0 0 10px var(--accent-orange); }
            .brick:hover { filter: brightness(1.2); }
        </style>
    `;

    const bricks = document.querySelectorAll('.brick');
    const proveBtn = document.getElementById('zk-prove');
    const verifyBtn = document.getElementById('zk-verify');
    const feedback = document.getElementById('zk-feedback');

    let secretId = null;

    bricks.forEach(brick => {
        brick.addEventListener('click', () => {
            bricks.forEach(b => b.classList.remove('secret'));
            brick.classList.add('secret');
            secretId = brick.dataset.id;
            feedback.innerHTML = `<p>Secret hidden in brick #${secretId}. Now generate a <strong>ZK-SNARK</strong> proof.</p>`;
        });
    });

    proveBtn.addEventListener('click', async () => {
        if (secretId === null) return alert("Select a brick first!");

        proveBtn.disabled = true;
        proveBtn.textContent = "Computing Polynomials...";

        await new Promise(r => setTimeout(r, 1500));

        // Hide the secret for the "Verification" stage
        bricks.forEach(b => b.classList.remove('secret'));

        feedback.innerHTML = `<strong>Proof Generated:</strong> <span style="color:var(--accent-purple); font-family:var(--font-mono)">0x4fa2...e81c</span><br>The location is now hidden, but the proof mathematically binds to it.`;

        verifyBtn.style.display = 'inline-block';
        proveBtn.style.display = 'none';
        proveBtn.disabled = false;
    });

    verifyBtn.addEventListener('click', async () => {
        verifyBtn.disabled = true;
        verifyBtn.textContent = "Checking Math...";

        await new Promise(r => setTimeout(r, 1000));

        feedback.innerHTML = `<h4 style="color:var(--accent-green)">Proof Verified! ✅</h4>
                             <p style="font-size: 0.85rem; margin-top:0.5rem">Mathematical constraints satisfied. You definitely knew the secret location, but I still don't know where it is!</p>`;

        verifyBtn.textContent = "Success";
    });
}
