/**
 * Tokens Module: ERC-20 & ERC-721
 */

export async function init(container) {
    container.innerHTML = `
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem;">
            <!-- ERC-20 Section -->
            <div class="interactive-card">
                <div class="card-title">
                    ERC-20 (Fungible)
                    <span class="tag" style="background: var(--accent-purple)">USDC / ETH</span>
                </div>
                <p style="color: var(--text-secondary); font-size: 0.9rem; margin-bottom: 1.5rem;">
                    Identical and interchangeable. Like dollar bills, 1 token is the same as any other.
                </p>

                <div class="input-group">
                    <label>Your Balance</label>
                    <div id="erc20-balance" style="font-size: 2rem; font-weight: bold; color: var(--accent-purple)">1000.00 GOLD</div>
                </div>

                <div class="input-group">
                    <label>Transfer To</label>
                    <input type="text" id="erc20-to" placeholder="0x..." value="0x123...456">
                </div>
                <div class="input-group">
                    <label>Amount</label>
                    <input type="text" id="erc20-amount" value="50">
                </div>

                <button id="erc20-send" class="btn" style="width: 100%; background: var(--accent-purple)">Transfer Tokens</button>
            </div>

            <!-- ERC-721 Section -->
            <div class="interactive-card">
                <div class="card-title">
                    ERC-721 (NFTs)
                    <span class="tag" style="background: var(--accent-orange)">Unique</span>
                </div>
                <p style="color: var(--text-secondary); font-size: 0.9rem; margin-bottom: 1.5rem;">
                    Unique and non-interchangeable. Each token has a specific <strong>TokenID</strong> and Metadata.
                </p>

                <div id="nft-gallery" style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1rem;">
                    <div class="nft-item active" data-id="1">
                        <div style="height: 80px; background: linear-gradient(45deg, #3b82f6, #a855f7); border-radius: 0.5rem;"></div>
                        <div style="font-size: 0.7rem; margin-top: 0.5rem;">CyberPunk #231</div>
                    </div>
                    <div class="nft-item" data-id="2">
                        <div style="height: 80px; background: linear-gradient(45deg, #f59e0b, #ef4444); border-radius: 0.5rem;"></div>
                        <div style="font-size: 0.7rem; margin-top: 0.5rem;">Bored Ape #442</div>
                    </div>
                </div>

                <div style="font-size: 0.8rem; color: var(--text-secondary); margin-bottom: 1rem;" id="nft-info">
                    Token ID: <strong>231</strong><br>
                    Owner: <strong>YOU</strong>
                </div>

                <button id="erc721-send" class="btn" style="width: 100%; background: var(--accent-orange)">Transfer NFT</button>
            </div>
        </div>

        <style>
            .nft-item {
                border: 2px solid transparent;
                padding: 0.5rem;
                background: rgba(255,255,255,0.05);
                border-radius: 0.75rem;
                cursor: pointer;
                transition: var(--transition);
            }
            .nft-item.active {
                border-color: var(--accent-orange);
                background: rgba(245, 158, 11, 0.1);
            }
        </style>
    `;

    // ERC-20 Logic
    let balance = 1000.00;
    const balEl = document.getElementById('erc20-balance');
    const send20Btn = document.getElementById('erc20-send');

    send20Btn.addEventListener('click', () => {
        const amt = parseFloat(document.getElementById('erc20-amount').value) || 0;
        if (amt > balance) return alert("Insufficient balance!");

        balance -= amt;
        balEl.textContent = balance.toFixed(2) + " GOLD";
        send20Btn.textContent = "Sent!";
        setTimeout(() => send20Btn.textContent = "Transfer Tokens", 2000);
    });

    // ERC-721 Logic
    const nftItems = document.querySelectorAll('.nft-item');
    const nftInfo = document.getElementById('nft-info');
    const send721Btn = document.getElementById('erc721-send');

    nftItems.forEach(item => {
        item.addEventListener('click', () => {
            nftItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');
            const id = item.dataset.id === '1' ? '231' : '442';
            const name = item.dataset.id === '1' ? 'CyberPunk #231' : 'Bored Ape #442';
            nftInfo.innerHTML = `Token ID: <strong>${id}</strong><br>Name: <strong>${name}</strong><br>Owner: <strong>YOU</strong>`;
        });
    });

    send721Btn.addEventListener('click', () => {
        const active = document.querySelector('.nft-item.active');
        active.style.opacity = '0.3';
        active.style.pointerEvents = 'none';
        nftInfo.innerHTML = `Token ID: <strong>---</strong><br>Owner: <strong>0x123...456</strong>`;
        send721Btn.disabled = true;
        send721Btn.textContent = "NFT Transferred";
    });
}
