/**
 * Smart Contracts Module: Code as Law
 */

export async function init(container) {
    container.innerHTML = `
        <div class="interactive-card">
            <div class="card-title">
                Smart Contract Compiler
                <span class="tag">EVM</span>
            </div>
            
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem;">
                <div>
                    <label style="font-size: 0.8rem; color: var(--text-secondary); margin-bottom: 0.5rem; display: block;">Solidity (Human Readable)</label>
                    <textarea id="contract-code" rows="12" style="font-size: 0.85rem; line-height: 1.4;">
contract SimpleBank {
    mapping(address => uint) balances;

    function deposit() public payable {
        balances[msg.sender] += msg.value;
    }

    function withdraw(uint amount) public {
        require(balances[msg.sender] >= amount);
        balances[msg.sender] -= amount;
        payable(msg.sender).transfer(amount);
    }
}
                    </textarea>
                </div>
                <div>
                   <label style="font-size: 0.8rem; color: var(--text-secondary); margin-bottom: 0.5rem; display: block;">EVM Bytecode (Machine Readable)</label>
                   <div class="result-area" style="height: 250px; overflow-y: auto; font-size: 0.75rem; align-items: flex-start; flex-direction: column;">
                        <span class="result-label">Opcodes</span>
                        <div id="bytecode-display" style="color: var(--accent-purple)"></div>
                   </div>
                </div>
            </div>

            <div style="margin-top: 1.5rem; padding: 1rem; background: rgba(59, 130, 246, 0.1); border-radius: 0.5rem; border: 1px solid var(--accent-blue)">
                <h4 style="color: var(--accent-blue)">What happens when you deploy?</h4>
                <p style="font-size: 0.9rem; margin-top: 0.5rem; color: var(--text-secondary)">
                    When you "deploy" this contract, the <strong>Bytecode</strong> is stored on the blockchain at a specific <strong>Address</strong>. From then on, it is immutable and will execute exactly as written.
                </p>
            </div>
        </div>
    `;

    const codeInput = document.getElementById('contract-code');
    const bytecodeDisplay = document.getElementById('bytecode-display');

    const opcodes = [
        "PUSH1 0x80", "PUSH1 0x40", "MSTORE", "CALLVALUE", "DUP1", "ISZERO", "PUSH2", "JUMPI", "PUSH1", "REVERT",
        "JUMPDEST", "POP", "PUSH1", "SSTORE", "PUSH1", "MLOAD", "PUSH1", "SLOAD", "ADD", "DUP2"
    ];

    function updateBytecode() {
        // Mock compilation: more code -> more bytecode
        const lines = codeInput.value.split('\n').filter(l => l.trim().length > 0);
        let displayHtml = '';

        lines.forEach((line, i) => {
            const op = opcodes[i % opcodes.length];
            const hex = (Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0').toUpperCase();
            displayHtml += `<div style="margin-bottom: 0.2rem">
                <span style="color:var(--text-secondary)">[${i.toString().padStart(2, '0')}]</span> 
                <strong style="color:var(--accent-purple)">${op}</strong> 
                <span style="opacity: 0.5">0x${hex}</span>
            </div>`;
        });

        bytecodeDisplay.innerHTML = displayHtml;
    }

    codeInput.addEventListener('input', updateBytecode);
    updateBytecode();
}
