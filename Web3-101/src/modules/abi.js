/**
 * ABIs & Encoding Module
 */

export async function init(container) {
    container.innerHTML = `
        <div class="theory-section">
            <h3><span class="icon">📖</span> The Rookie's View: The Menu Numbers</h3>
            <p>
                The Ethereum computer (EVM) only speaks <strong>Hexadecimal</strong> (numbers and letters like 0x1a...). It doesn't know what "transfer" means.
            </p>
            <div style="display: flex; gap: 1rem; margin-bottom: 1rem; background: rgba(59, 130, 246, 0.05); padding: 15px; border-radius: 8px; font-size: 0.85rem; border: 1px solid rgba(59, 130, 246, 0.2);">
                <div style="font-size: 1.5rem;">📜</div>
                <div>
                    An <strong>ABI</strong> is like a <strong>Menu</strong>. At a restaurant, the menu says: "Number 1 is Pizza." When you shout "1!", the chef knows exactly what to cook. The ABI tells your wallet that "0xa9059cbb" means "Transfer."
                </div>
            </div>
            <div class="rookie-tip">
                <span class="rookie-tip-icon">💡</span>
                <div>
                    <strong>Pro Tip:</strong> When you use MetaMask, it reads the contract's ABI to show you "Confirming Transfer" instead of just showing you a scary pile of random 0x numbers.
                </div>
            </div>
        </div>

        <div class="interactive-card">
            <div class="card-title">
                The ABI Translator (Encoder)
                <span class="tag">Language Layer</span>
            </div>
            
            <div style="background: rgba(59, 130, 246, 0.02); border: 1px solid var(--accent-blue); border-radius: 1rem; padding: 1.5rem; margin-bottom: 1.5rem;">
                <h4 style="color: var(--accent-blue); margin-bottom: 1rem; font-size: 0.9rem;">1. Select Human Function</h4>
                
                <div style="display: flex; flex-direction: column; gap: 1.2rem; margin-bottom: 1.5rem;">
                    <div class="input-group" style="margin-bottom: 0;">
                        <label>Contract Method</label>
                        <select id="func-select" style="width: 100%; padding: 0.75rem;">
                            <option value="transfer">transfer(address to, uint256 amount)</option>
                            <option value="vote">vote(uint256 proposalId)</option>
                            <option value="mint">mint(address to)</option>
                        </select>
                    </div>

                    <div id="args-container" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem;">
                        <!-- Dynamic args -->
                        <div class="input-group" style="margin-bottom: 0;">
                            <label>To Address</label>
                            <input type="text" id="arg-1" value="0x71C765...8976F" style="font-size: 0.75rem;">
                        </div>
                        <div class="input-group" style="margin-bottom: 0;">
                            <label>Amount (Tokens)</label>
                            <input type="number" id="arg-2" value="1000">
                        </div>
                    </div>
                </div>

                <div style="background: #020617; border-radius: 8px; padding: 1.5rem; font-family: var(--font-mono); border: 1px solid var(--border-color);">
                    <div style="font-size: 0.7rem; color: var(--text-secondary); margin-bottom: 0.5rem;">RAW CALL DATA (HEXIFIED)</div>
                    <div id="hex-output" style="word-break: break-all; font-size: 0.8rem; color: var(--accent-blue);">
                        0xa9059cbb...
                    </div>
                </div>
            </div>

            <div class="interactive-card" style="margin-top: 2rem; background: #020617;">
                <h4>How it breaks down:</h4>
                <div id="abi-breakdown" style="font-size: 0.8rem; margin-top: 1rem;">
                    <div style="padding: 10px; background: rgba(168, 85, 247, 0.1); border-radius: 4px; margin-bottom: 8px;">
                        <strong style="color:var(--accent-purple)">4-Byte Selector:</strong> <span id="selector-hex">0xa9059cbb</span><br>
                        <span style="font-size: 0.7rem; color: var(--text-secondary)">Derived from keccak256("transfer(address,uint256)")</span>
                    </div>
                    <div style="padding: 10px; background: rgba(59, 130, 246, 0.1); border-radius: 4px;">
                        <strong style="color:var(--accent-blue)">Encoded Parameters:</strong> <span id="params-hex">0000000000000000000...</span>
                    </div>
                </div>
            </div>
        </div>
    `;

    const funcSelect = document.getElementById('func-select');
    const hexOutput = document.getElementById('hex-output');
    const selectorHex = document.getElementById('selector-hex');
    const paramsHex = document.getElementById('params-hex');

    const selectors = {
        'transfer': 'a9059cbb',
        'vote': '0121b93f',
        'mint': '40c10f19'
    };

    function updateEncoding() {
        const func = funcSelect.value;
        const selector = selectors[func];

        // Mocking the parameter padding
        let params = "00000000000000000000000071c7656ec7ab88b098defb751b7401b5f6d8976f";
        if (func === 'vote') params = "0000000000000000000000000000000000000000000000000000000000000066";

        hexOutput.textContent = "0x" + selector + params.slice(0, 32) + "...";
        selectorHex.textContent = "0x" + selector;
        paramsHex.textContent = params.slice(0, 32) + "...";
    }

    funcSelect.addEventListener('change', updateEncoding);
    updateEncoding();
}
