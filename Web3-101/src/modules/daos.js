/**
 * DAOs & Governance Module
 */

export async function init(container) {
    container.innerHTML = `
        <div class="interactive-card">
            <div class="card-title">
                The DAO Governance Model
                <span class="tag">Decentralized Voting</span>
            </div>
            
            <p style="color: var(--text-secondary); margin-bottom: 2rem;">
                A DAO is a community-led entity with no central authority. Decisions are made via <strong>On-chain Proposals</strong> and <strong>Token Voting</strong>.
            </p>

            <div style="background: rgba(16, 185, 129, 0.05); border: 1px solid var(--accent-green); border-radius: 1rem; padding: 1.5rem; margin-bottom: 2rem;">
                <h4 style="color: var(--accent-green); margin-bottom: 1rem;">Active Proposal: [VIP-102] Distribute Treasury</h4>
                <p style="font-size: 0.9rem; margin-bottom: 1.5rem;">Should the DAO distribute 1,000 ETH to early contributors?</p>
                
                <div style="margin-bottom: 2rem;">
                    <div style="display: flex; justify-content: space-between; font-size: 0.75rem; margin-bottom: 0.5rem;">
                        <span>For: <strong id="votes-for">5.2M</strong></span>
                        <span>Against: <strong id="votes-against">1.1M</strong></span>
                    </div>
                    <div style="height: 12px; background: #1e293b; border-radius: 6px; overflow: hidden; display: flex;">
                        <div id="bar-for" style="width: 82%; background: var(--accent-green)"></div>
                        <div id="bar-against" style="width: 18%; background: #ef4444"></div>
                    </div>
                </div>

                <div style="display: flex; gap: 1rem;">
                    <button class="btn vote-btn" data-vote="for" style="flex: 1; background: var(--accent-green)">Vote FOR</button>
                    <button class="btn vote-btn" data-vote="against" style="flex: 1; background: #ef4444">Vote AGAINST</button>
                </div>
            </div>

            <div class="interactive-card" style="background: #020617;">
                <h4 style="margin-bottom: 1rem;">Your Governance Power</h4>
                <div style="display: flex; align-items: center; justify-content: space-between;">
                    <div style="font-size: 2rem; font-weight: bold; color: var(--accent-blue)" id="voting-power">10,000 GOV</div>
                    <button id="get-more" class="btn" style="padding: 0.5rem 1rem; font-size: 0.75rem; background: transparent; border: 1px solid var(--accent-blue)">Acquire more Tokens</button>
                </div>
            </div>
        </div>
    `;

    const votesForEl = document.getElementById('votes-for');
    const votesAgainstEl = document.getElementById('votes-against');
    const barFor = document.getElementById('bar-for');
    const barAgainst = document.getElementById('bar-against');
    const voteBtns = document.querySelectorAll('.vote-btn');
    const votingPowerEl = document.getElementById('voting-power');
    const getMoreBtn = document.getElementById('get-more');

    let totalFor = 5200000;
    let totalAgainst = 1100000;
    let myPower = 10000;

    function updateBars() {
        const total = totalFor + totalAgainst;
        const forPercent = (totalFor / total) * 100;
        const againstPercent = (totalAgainst / total) * 100;
        barFor.style.width = forPercent + '%';
        barAgainst.style.width = againstPercent + '%';
        votesForEl.textContent = (totalFor / 1000000).toFixed(2) + 'M';
        votesAgainstEl.textContent = (totalAgainst / 1000000).toFixed(2) + 'M';
    }

    voteBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const type = btn.dataset.vote;
            if (type === 'for') totalFor += myPower;
            else totalAgainst += myPower;

            btn.disabled = true;
            btn.textContent = "Voted!";
            updateBars();
        });
    });

    getMoreBtn.addEventListener('click', () => {
        myPower += 500000;
        votingPowerEl.textContent = myPower.toLocaleString() + ' GOV';
        getMoreBtn.textContent = "+500k Added";
        setTimeout(() => getMoreBtn.textContent = "Acquire more Tokens", 1000);
    });
}
