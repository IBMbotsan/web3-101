/**
 * Identity Module: ENS & Soulbound Tokens
 */

export async function init(container) {
    container.innerHTML = `
        <div class="theory-section">
            <h3><span class="icon">🆔</span> The Rookie's View: The Digital Passport</h3>
            <p>
                In the old web, your identity is owned by big companies. In Web3, you own your name and your reputation.
            </p>
            <div style="display: flex; gap: 1rem; margin-bottom: 1rem; background: rgba(59, 130, 246, 0.05); padding: 15px; border-radius: 8px; font-size: 0.85rem; border: 1px solid rgba(59, 130, 246, 0.2);">
                <div style="font-size: 1.5rem;">🛂</div>
                <div>
                    <strong>ENS</strong> is like your <strong>Global Passport</strong>. Instead of a long confusing number, you get a simple name like <em>alice.eth</em>. <strong>Soulbound Tokens (SBTs)</strong> are like <strong>Stamps</strong> in that passport. If you graduate from a course, you get a "Web3-101 SBT". You can't sell it or give it away—it's tied to you forever to prove what you've achieved!
                </div>
            </div>
            <div class="rookie-tip">
                <span class="rookie-tip-icon">💡</span>
                <div>
                    <strong>Pro Tip:</strong> This is the foundation of <strong>On-chain Reputation</strong>. In the future, you won't need a LinkedIn or a credit score; your wallet's history of ENS names and SBTs will prove you are a trustworthy person.
                </div>
            </div>
        </div>

        <div class="interactive-card">
            <div class="card-title">
                Identity & Reputation Lab
                <span class="tag">ENS / SBTs</span>
            </div>
            
            <div style="background: rgba(59, 130, 246, 0.02); border: 1px solid var(--accent-blue); border-radius: 1rem; padding: 1.5rem; margin-bottom: 2rem;">
                <h4 style="color: var(--accent-blue); margin-bottom: 1rem; font-size: 0.8rem; letter-spacing: 1px;">REGISTER YOUR .ETH NAME</h4>
                <div style="display: flex; flex-direction: column; md-flex-direction: row; gap: 10px;">
                    <div style="flex: 1; position: relative;">
                        <input type="text" id="ens-input" placeholder="Enter your name" style="width: 100%; padding-right: 4rem; height: 45px;">
                        <span style="position: absolute; right: 1rem; top: 12px; color: var(--text-secondary); font-weight: bold;">.eth</span>
                    </div>
                    <button id="register-ens" class="btn" style="background: var(--accent-blue); font-weight: bold; justify-content: center; height: 45px;">CLAIM NAME</button>
                </div>
                
                <div id="ens-record" style="margin-top: 1.5rem; display: none; background: #000; padding: 1rem; border-radius: 8px; border: 1px dashed var(--accent-blue); animation: fadeIn 0.4s ease-out;">
                    <div style="font-size: 0.65rem; color: var(--text-secondary); margin-bottom: 4px; font-family: var(--font-mono);">LOOKUP RESULT:</div>
                    <div style="font-family: var(--font-mono); font-size: 0.75rem; word-break: break-all; color: var(--accent-blue);">0x71C7656EC7ab88b098defB751B7401B5f6d8976F</div>
                </div>
            </div>

            <div class="interactive-card" style="background: #020617; border-color: var(--accent-purple);">
                <h4 style="color: var(--accent-purple); margin-bottom: 1rem;">Your Soulbound Inventory</h4>
                <div style="display: flex; gap: 1rem;">
                    <div class="sbt-badge" title="Can't be transferred!">🎓 Web3-101 Graduate</div>
                    <div class="sbt-badge locked">🗳️ Governance Hero</div>
                    <div class="sbt-badge locked">⛏️ Early Miner</div>
                </div>
                <p style="font-size: 0.7rem; color: var(--text-secondary); margin-top: 1.5rem;">
                    Soulbound Tokens (SBTs) are non-transferable NFTs. They represent your credentials, affiliations, or achievements.
                </p>
            </div>
        </div>

        <style>
            .sbt-badge {
                padding: 10px;
                background: rgba(168, 85, 247, 0.1);
                border: 1px solid var(--accent-purple);
                border-radius: 6px;
                font-size: 0.7rem;
                flex: 1;
                text-align: center;
                cursor: pointer;
            }
            .sbt-badge.locked {
                opacity: 0.2;
                filter: grayscale(1);
            }
        </style>
    `;

    const ensInput = document.getElementById('ens-input');
    const registerBtn = document.getElementById('register-ens');
    const ensRecord = document.getElementById('ens-record');

    registerBtn.addEventListener('click', () => {
        const name = ensInput.value.trim();
        if (!name) return;

        registerBtn.disabled = true;
        registerBtn.textContent = "Updating Reg...";

        setTimeout(() => {
            ensRecord.style.display = 'block';
            registerBtn.textContent = "Registered!";
        }, 800);
    });
}
