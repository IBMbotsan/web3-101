/**
 * Flash Loans Module: Uncollateralized Leverage
 */

export async function init(container) {
    container.innerHTML = `
        <div class="theory-section">
            <h3><span class="icon">⚡</span> The Rookie's View: The Magic Loan</h3>
            <p>
                In the real world, you can't borrow $1,000,000 unless you're already rich. In Web3, you can borrow it with $0.
            </p>
            <div style="display: flex; gap: 1rem; margin-bottom: 1rem; background: rgba(168, 85, 247, 0.05); padding: 15px; border-radius: 8px; font-size: 0.85rem; border: 1px solid rgba(168, 85, 247, 0.2);">
                <div style="font-size: 1.5rem;">🪄</div>
                <div>
                    A <strong>Flash Loan</strong> is a "Magic Loan." You borrow the money, use it (e.g., for Arbitrage), and pay it back all in 1 second (one transaction). If you fail to pay it back, the blockchain <strong>Rewinds Time</strong> as if the loan never happened. The lender never loses money, so they don't care if you're poor!
                </div>
            </div>
            <div class="rookie-tip">
                <span class="rookie-tip-icon">💡</span>
                <div>
                    <strong>Pro Tip:</strong> This is only possible because of <strong>Atomicity</strong>. A blockchain transaction is "all or nothing." Either every step happens, or none of them do. This is the 100% risk-free way to move millions of dollars.
                </div>
            </div>
        </div>

        <div class="interactive-card">
            <div class="card-title">
                The Atomic Arbitrage Lab
                <span class="tag">Capital Efficiency</span>
            </div>
            
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 1.5rem; margin-bottom: 2rem;">
                <!-- DEX 1 -->
                <div style="background: rgba(59, 130, 246, 0.02); border: 1px solid var(--accent-blue); border-radius: 1rem; padding: 1.5rem; text-align: center;">
                    <h4 style="color: var(--accent-blue); margin-bottom: 0.5rem; font-size: 0.8rem; letter-spacing: 1px;">DEX A (BUY HERE)</h4>
                    <div style="font-size: 0.7rem; color: var(--text-secondary); margin-bottom: 4px;">ETH PRICE</div>
                    <div style="font-size: 1.8rem; font-weight: bold; color: var(--text-primary);">$2,000</div>
                </div>

                <!-- DEX 2 -->
                <div style="background: rgba(168, 85, 247, 0.02); border: 1px solid var(--accent-purple); border-radius: 1rem; padding: 1.5rem; text-align: center;">
                    <h4 style="color: var(--accent-purple); margin-bottom: 0.5rem; font-size: 0.8rem; letter-spacing: 1px;">DEX B (SELL HERE)</h4>
                    <div style="font-size: 0.7rem; color: var(--text-secondary); margin-bottom: 4px;">ETH PRICE</div>
                    <div style="font-size: 1.8rem; font-weight: bold; color: var(--text-primary);">$2,050</div>
                </div>
            </div>

            <div style="margin-top: 2rem; background: #020617; border: 1px solid var(--border-color); border-radius: 1rem; padding: 1.5rem;">
                <h4 style="margin-bottom: 1.5rem;">Execution Steps (Atomic)</h4>
                <div id="flash-steps" style="display: flex; flex-direction: column; gap: 10px; font-size: 0.8rem; color: var(--text-secondary);">
                    <div class="flash-step" id="step-1">1. Borrow 1,000 ETH from Lender</div>
                    <div class="flash-step" id="step-2">2. Buy 1,000 ETH on DEX A (cost $2,000,000)</div>
                    <div class="flash-step" id="step-3">3. Sell 1,000 ETH on DEX B (receive $2,050,000)</div>
                    <div class="flash-step" id="step-4">4. Repay 1,000 ETH + 0.09% Fee</div>
                </div>
                
                <div style="margin-top: 2rem; display: flex; justify-content: space-between; align-items: center;">
                    <div>
                        <div style="font-size: 0.7rem; color: var(--text-secondary)">MOCK PROFIT</div>
                        <div id="flash-profit" style="font-size: 1.5rem; font-weight: bold; color: var(--accent-green)">$0</div>
                    </div>
                    <button id="run-flash" class="btn" style="background: linear-gradient(to right, var(--accent-blue), var(--accent-purple)); padding: 1rem 2rem;">
                        ⚡ EXECUTE FLASH LOAN
                    </button>
                </div>
            </div>
        </div>

        <style>
            .flash-step { padding: 8px; border-radius: 4px; border-left: 2px solid transparent; transition: var(--transition); }
            .flash-step.active { border-left-color: var(--accent-blue); background: rgba(59, 130, 246, 0.1); color: var(--text-primary); }
        </style>
    `;

    const runBtn = document.getElementById('run-flash');
    const steps = document.querySelectorAll('.flash-step');
    const profitEl = document.getElementById('flash-profit');

    runBtn.addEventListener('click', async () => {
        runBtn.disabled = true;
        profitEl.textContent = "$0";
        profitEl.style.color = "var(--text-primary)";

        for (let i = 0; i < steps.length; i++) {
            steps[i].classList.add('active');
            await new Promise(r => setTimeout(r, 1000));
            if (i < steps.length - 1) steps[i].classList.remove('active');
        }

        const profit = 50000 - (2000000 * 0.0009);
        profitEl.textContent = "$" + profit.toLocaleString();
        profitEl.style.color = "var(--accent-green)";

        runBtn.textContent = "Transaction Successful!";
        setTimeout(() => {
            runBtn.disabled = false;
            runBtn.textContent = "⚡ EXECUTE FLASH LOAN";
            steps.forEach(s => s.classList.remove('active'));
        }, 3000);
    });
}
