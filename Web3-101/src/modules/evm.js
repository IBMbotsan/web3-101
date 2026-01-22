/**
 * Deep EVM Module: Stack, Memory, and Storage
 */

export async function init(container) {
    container.innerHTML = `
        <div class="interactive-card">
            <div class="card-title">
                Deep Dive: The EVM State
                <span class="tag">Machine Detail</span>
            </div>
            
            <div style="display: grid; grid-template-columns: 250px 1fr 250px; gap: 1.5rem;">
                
                <!-- 1. STACK (LIFO) -->
                <div class="evm-panel">
                    <div class="panel-header">STACK (32b words)</div>
                    <div id="evm-stack" class="evm-list">
                        <div class="empty-msg">[Empty]</div>
                    </div>
                </div>

                <!-- 2. CONTROL PANEL -->
                <div>
                   <div style="background: rgba(15, 23, 42, 0.5); padding: 1rem; border-radius: 0.5rem; border: 1px solid var(--border-color); margin-bottom: 1.5rem;">
                        <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
                            <span style="font-size: 0.7rem; color: var(--text-secondary)">GAS USED</span>
                            <span id="gas-val" style="color: var(--accent-orange); font-weight: bold; font-family: var(--font-mono)">0</span>
                        </div>
                        <div id="gas-bar" style="height: 4px; background: #1e293b; border-radius: 2px; overflow: hidden;">
                            <div id="gas-progress" style="width: 0%; height: 100%; background: var(--accent-orange); transition: width 0.3s ease;"></div>
                        </div>
                   </div>

                   <div class="op-grid">
                        <button class="btn op-btn" data-op="PUSH1" data-gas="3">PUSH1</button>
                        <button class="btn op-btn" data-op="POP" data-gas="2">POP</button>
                        <button class="btn op-btn" data-op="ADD" data-gas="3">ADD</button>
                        <button class="btn op-btn" data-op="MUL" data-gas="5">MUL</button>
                        <button class="btn op-btn" data-op="MSTORE" data-gas="3">MSTORE</button>
                        <button class="btn op-btn" data-op="MLOAD" data-gas="3">MLOAD</button>
                        <button class="btn op-btn" data-op="SSTORE" data-gas="20000" style="color: var(--accent-orange)">SSTORE</button>
                        <button class="btn op-btn" data-op="SLOAD" data-gas="2100">SLOAD</button>
                   </div>

                   <div id="instruction-log" class="result-area" style="margin-top: 1.5rem; height: 100px; overflow-y: auto; display: block; font-size: 0.75rem;">
                        <span class="result-label">Instruction Log</span>
                        <div id="log-entries">Ready...</div>
                   </div>
                </div>

                <!-- 3. STORAGE & MEMORY -->
                <div style="display: flex; flex-direction: column; gap: 1rem;">
                    <div class="evm-panel" style="height: 180px;">
                        <div class="panel-header" style="color: var(--accent-blue)">MEMORY (Volatile)</div>
                        <div id="evm-memory" class="evm-list" style="font-size: 0.65rem;">
                            <div class="empty-msg">0x00...0x00...</div>
                        </div>
                    </div>
                    <div class="evm-panel" style="flex: 1;">
                        <div class="panel-header" style="color: var(--accent-orange)">STORAGE (Persistent)</div>
                        <div id="evm-storage" class="evm-list" style="font-size: 0.65rem;">
                            <div class="empty-msg">[Empty]</div>
                        </div>
                    </div>
                </div>

            </div>
        </div>

        <style>
            .evm-panel {
                background: rgba(2, 6, 23, 0.5);
                border: 1px solid var(--border-color);
                border-radius: 0.75rem;
                display: flex;
                flex-direction: column;
                overflow: hidden;
                box-shadow: inset 0 2px 10px rgba(0,0,0,0.5);
            }
            .panel-header {
                padding: 0.5rem;
                background: rgba(255,255,255,0.05);
                font-size: 0.65rem;
                font-weight: bold;
                text-align: center;
                border-bottom: 1px solid var(--border-color);
            }
            .evm-list {
                padding: 0.75rem;
                flex: 1;
                overflow-y: auto;
                display: flex;
                flex-direction: column-reverse;
                gap: 0.4rem;
            }
            .empty-msg {
                color: var(--text-secondary);
                text-align: center;
                font-size: 0.7rem;
                margin-top: 1rem;
            }
            .stack-item, .mem-item, .store-item {
                background: var(--sidebar-bg);
                border: 1px solid var(--border-color);
                padding: 0.4rem;
                border-radius: 0.25rem;
                font-family: var(--font-mono);
                position: relative;
                animation: slideIn 0.2s ease-out;
            }
            .stack-item::before {
                content: attr(data-idx);
                position: absolute;
                left: 4px;
                top: 2px;
                font-size: 0.5rem;
                color: var(--text-secondary);
            }
            .op-grid {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 0.75rem;
            }
            .op-btn {
                font-size: 0.75rem;
                padding: 0.6rem;
                background: var(--sidebar-bg);
                border: 1px solid var(--border-color);
            }
            .op-btn:hover { border-color: var(--accent-blue); }
        </style>
    `;

    const stackEl = document.getElementById('evm-stack');
    const memEl = document.getElementById('evm-memory');
    const storeEl = document.getElementById('evm-storage');
    const gasEl = document.getElementById('gas-val');
    const gasProgress = document.getElementById('gas-progress');
    const logEl = document.getElementById('log-entries');

    let state = {
        stack: [],
        memory: {},
        storage: {},
        gas: 0
    };

    function updateView() {
        // Render Stack
        stackEl.innerHTML = state.stack.length === 0 ? '<div class="empty-msg">[Empty]</div>' :
            state.stack.map((v, i) => `<div class="stack-item" data-idx="${i}">${v}</div>`).join('');

        // Render Memory (first 4 slots)
        let memHtml = '';
        for (let i = 0; i < 4; i++) {
            const val = state.memory[i * 32] || '0x00...00';
            memHtml = `<div class="mem-item"><span style="color:var(--accent-blue)">[${i * 32}]</span> ${val.substring(0, 15)}...</div>` + memHtml;
        }
        memEl.innerHTML = memHtml;

        // Render Storage
        const storeKeys = Object.keys(state.storage);
        storeEl.innerHTML = storeKeys.length === 0 ? '<div class="empty-msg">[Empty]</div>' :
            storeKeys.map(k => `<div class="store-item"><span style="color:var(--accent-orange)">[${k}]</span> ${state.storage[k]}</div>`).join('');

        gasEl.textContent = state.gas.toLocaleString();
        const gasPct = Math.min((state.gas / 50000) * 100, 100);
        gasProgress.style.width = gasPct + '%';
    }

    function addLog(msg) {
        logEl.innerHTML = `<div><span style="color:var(--text-secondary)">[${new Date().toLocaleTimeString()}]</span> ${msg}</div>` + logEl.innerHTML;
    }

    document.querySelectorAll('.op-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const op = btn.dataset.op;
            const gas = parseInt(btn.dataset.gas);
            state.gas += gas;

            try {
                switch (op) {
                    case 'PUSH1':
                        const val = '0x' + Math.floor(Math.random() * 256).toString(16).toUpperCase().padStart(2, '0');
                        state.stack.push(val);
                        addLog(`PUSHED ${val} onto the stack.`);
                        break;
                    case 'POP':
                        if (state.stack.length === 0) throw "Stack Underflow";
                        addLog(`POPPED ${state.stack.pop()} from stack.`);
                        break;
                    case 'ADD':
                        if (state.stack.length < 2) throw "Stack Underflow";
                        const a = parseInt(state.stack.pop(), 16);
                        const b = parseInt(state.stack.pop(), 16);
                        const res = '0x' + (a + b).toString(16).toUpperCase();
                        state.stack.push(res);
                        addLog(`ADDED top two items. Result: ${res}`);
                        break;
                    case 'MUL':
                        if (state.stack.length < 2) throw "Stack Underflow";
                        const m1 = parseInt(state.stack.pop(), 16);
                        const m2 = parseInt(state.stack.pop(), 16);
                        const mRes = '0x' + (m1 * m2).toString(16).toUpperCase();
                        state.stack.push(mRes);
                        addLog(`MULTIPLIED top two items. Result: ${mRes}`);
                        break;
                    case 'MSTORE':
                        if (state.stack.length < 2) throw "Stack Underflow";
                        const offset = parseInt(state.stack.pop(), 16) % 128; // Simple sim
                        const mVal = state.stack.pop();
                        state.memory[offset] = mVal;
                        addLog(`STORED ${mVal} in Memory at offset ${offset}.`);
                        break;
                    case 'MLOAD':
                        if (state.stack.length < 1) throw "Stack Underflow";
                        const lOffset = parseInt(state.stack.pop(), 16) % 128;
                        state.stack.push(state.memory[lOffset] || '0x00');
                        addLog(`LOADED from Memory at ${lOffset}.`);
                        break;
                    case 'SSTORE':
                        if (state.stack.length < 2) throw "Stack Underflow";
                        const key = state.stack.pop();
                        const sVal = state.stack.pop();
                        state.storage[key] = sVal;
                        addLog(`PERSISTED ${sVal} in Storage key ${key}. (EXPENSIVE!)`);
                        break;
                    case 'SLOAD':
                        if (state.stack.length < 1) throw "Stack Underflow";
                        const sKey = state.stack.pop();
                        state.stack.push(state.storage[sKey] || '0x00');
                        addLog(`LOADED from persistent Storage key ${sKey}.`);
                        break;
                }
            } catch (e) {
                addLog(`<span style="color:var(--accent-orange)">Error: ${e}</span>`);
            }
            updateView();
        });
    });
}
