/**
 * Web3-101 Main Application Entry Point
 * Handles routing and module loading
 */

const app = document.getElementById('app');
const navItems = document.querySelectorAll('.nav-item');

const routes = {
    'utxo': {
        title: 'UTXO vs Account Model',
        description: 'Bitcoin vs Ethereum: comparing how balance and ownership are tracked on-chain.',
        module: './src/modules/utxo.js'
    },
    'gossip': {
        title: 'P2P Gossip Protocol',
        description: 'How nodes communicate and propagate transactions across a global network.',
        module: './src/modules/gossip.js'
    },
    'difficulty': {
        title: 'Difficulty Adjustment',
        description: 'The math behind keeping block times consistent as hashrate changes.',
        module: './src/modules/difficulty.js'
    },
    'statemachine': {
        title: 'The State Machine',
        description: 'Blockchain as a deterministic state transition system.',
        module: './src/modules/statemachine.js'
    },
    'forks': {
        title: 'Soft & Hard Forks',
        description: 'What happens when a network upgrades or splits due to rule changes.',
        module: './src/modules/forks.js'
    },
    'bloom': {
        title: 'Bloom Filters (Light Clients)',
        description: 'Efficiently checking for data presence without full node requirements.',
        module: './src/modules/bloom.js'
    },
    'hashing': {
        title: 'Fundamental Hashing',
        description: 'Hashing is the foundation of blockchain. It takes any input and produces a unique, fixed-length fingerprint.',
        module: './src/modules/hashing.js'
    },
    'merkle': {
        title: 'Merkle Trees',
        description: 'Efficiently verify that data belongs to a set without having the entire set. The backbone of lightweight clients.',
        module: './src/modules/merkle.js'
    },
    'keys': {
        title: 'Keys & Signatures',
        description: 'Public-key cryptography allows you to prove ownership without revealing your secret identity.',
        module: './src/modules/keys.js'
    },
    'wallets': {
        title: 'HD Wallets & Mnemonics',
        description: 'How 12 words (BIP-39) generate an infinite number of deterministic accounts.',
        module: './src/modules/wallets.js'
    },
    'blocks': {
        title: 'Building Blocks',
        description: 'A block is a container for data, linked to the previous block by its hash.',
        module: './src/modules/blocks.js'
    },
    'blockchain': {
        title: 'The Immutable Chain',
        description: 'Chaining blocks together makes them tamper-proof. Changing one block breaks everything that follows.',
        module: './src/modules/blockchain.js'
    },
    'transactions': {
        title: 'Inside a Transaction',
        description: 'What actually happens when you send money? Gas, Nonces, and the state change.',
        module: './src/modules/transactions.js'
    },
    'pow': {
        title: 'Proof of Work',
        description: 'Mining ensures that adding a block requires physical effort, preventing spam and securing the network.',
        module: './src/modules/pow.js'
    },
    'pos': {
        title: 'Proof of Stake',
        description: 'A more energy-efficient way to secure the network using economic collateral instead of electricity.',
        module: './src/modules/pos.js'
    },
    'lsd': {
        title: 'Liquid Staking (LSD)',
        description: 'Staking your assets while keeping them liquid. How "stETH" and other derivates work.',
        module: './src/modules/lsd.js'
    },
    'testnets': {
        title: 'Testnets & Faucets',
        description: 'Developing in a safe sandbox. How to use Sepolia and claim test Ether.',
        module: './src/modules/testnets.js'
    },
    'abi': {
        title: 'ABIs & Encoding',
        description: 'The Application Binary Interface: how the web talks to the EVM.',
        module: './src/modules/abi.js'
    },
    'deployment': {
        title: 'Deployment Logic',
        description: 'How code becomes an address. Contract creation and the 0x0 address.',
        module: './src/modules/deployment.js'
    },
    'events': {
        title: 'Events & Logs',
        description: 'How contracts broadcast data without storing it in expensive state.',
        module: './src/modules/events.js'
    },
    'reentrancy': {
        title: 'Reentrancy Bug',
        description: 'Analyzing the most famous smart contract vulnerability through a live hack simulation.',
        module: './src/modules/reentrancy.js'
    },
    'gaslab': {
        title: 'Gas Optimization Lab',
        description: 'Comparing costs: storage vs memory and how to write efficient Solidity.',
        module: './src/modules/gaslab.js'
    },
    'proxies': {
        title: 'Proxies & Upgrades',
        description: 'Making the immutable mutable. How logic can be updated via proxy contracts.',
        module: './src/modules/proxies.js'
    },
    'legos': {
        title: 'Money Legos (Composability)',
        description: 'The power of Web3: building on top of existing contracts to create new systems.',
        module: './src/modules/legos.js'
    },
    'fallback': {
        title: 'Fallback & Receive',
        description: 'The catch-all functions of a smart contract. How the EVM handles unknown calls.',
        module: './src/modules/fallback.js'
    },
    'contracts': {
        title: 'Smart Contracts',
        description: 'Code that lives on the blockchain and executes automatically when conditions are met.',
        module: './src/modules/contracts.js'
    },
    'tokens': {
        title: 'Tokens (ERC-20 & 721)',
        description: 'How assets like USDC and NFTs are representated as code on-chain.',
        module: './src/modules/tokens.js'
    },
    'evm': {
        title: 'Deep EVM',
        description: 'A deep dive into the Ethereum Virtual Machine: Stack, Memory, and Gas costs.',
        module: './src/modules/evm.js'
    },
    'dapps': {
        title: 'How dApps Work',
        description: 'Connecting the chain to the web. The future of decentralized user experiences.',
        module: './src/modules/dapps.js'
    },
    'daos': {
        title: 'DAOs & Governance',
        description: 'Decentralized Autonomous Organizations: voting with tokens for collective decision making.',
        module: './src/modules/daos.js'
    },
    'defi': {
        title: 'AMMs & DeFi Math',
        description: 'Automated Market Makers: how Uniswap uses the liquidity pool math x * y = k.',
        module: './src/modules/defi.js'
    },
    'aa': {
        title: 'Account Abstraction',
        description: 'Smart Contract Wallets: the future of Web3 UX with social recovery and gasless trades.',
        module: './src/modules/aa.js'
    },
    'layer2': {
        title: 'Layer 2 & Rollups',
        description: 'Scaling the main chain by processing transactions off-chain and posting proofs.',
        module: './src/modules/layer2.js'
    },
    'zkp': {
        title: 'Zero-Knowledge Proofs',
        description: 'Proving you know a secret without revealing the secret itself. The holy grail of privacy.',
        module: './src/modules/zkp.js'
    },
    'bridges': {
        title: 'Cross-Chain Bridges',
        description: 'Moving assets between different blockchains. Lock, Mint, and Burn.',
        module: './src/modules/bridges.js'
    },
    'storage': {
        title: 'Decentralized Storage',
        description: 'Storing data off-chain using IPFS and content-addressable storage.',
        module: './src/modules/storage.js'
    },
    'oracles': {
        title: 'Oracles & External Data',
        description: 'How smart contracts access real-world data like price feeds and weather.',
        module: './src/modules/oracles.js'
    },
    'mev': {
        title: 'MEV & Front-running',
        description: 'The "dark forest" of blockchain. How bots extract value by reordering transactions.',
        module: './src/modules/mev.js'
    },
    'flashloans': {
        title: 'Flash Loans',
        description: 'Borrowing millions with zero collateral, provided you pay it back in the same transaction.',
        module: './src/modules/flashloans.js'
    },
    'stablecoins': {
        title: 'Stablecoins & Pegs',
        description: 'How digital assets stay pegged to the dollar through over-collateralization or algorithms.',
        module: './src/modules/stablecoins.js'
    },
    'identity': {
        title: 'On-chain Identity',
        description: 'ENS, Soulbound Tokens, and the future of decentralized reputation.',
        module: './src/modules/identity.js'
    },
    'restaking': {
        title: 'Restaking (EigenLayer)',
        description: 'Using your staked ETH to secure multiple networks simultaneously.',
        module: './src/modules/restaking.js'
    }
};

/**
 * Main Router
 */
async function router() {
    let hash = window.location.hash.substring(1) || 'hashing';

    // Default to hashing if route not found
    if (!routes[hash]) {
        hash = 'hashing';
        window.location.hash = '#hashing';
    }

    // Update Sidebar state
    navItems.forEach(item => {
        if (item.getAttribute('data-module') === hash) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });

    const route = routes[hash];

    // Show loading state
    app.innerHTML = `
        <section class="loading-screen">
            <div class="loader"></div>
            <p>Loading ${route.title}...</p>
        </section>
    `;

    try {
        // Load the module
        const module = await import(route.module);

        // Prepare container
        app.innerHTML = `
            <div class="content-container">
                <header class="content-header">
                    <h2>${route.title}</h2>
                    <p class="description">${route.description}</p>
                </header>
                <div id="module-container"></div>
            </div>
        `;

        // Initialize module
        const container = document.getElementById('module-container');
        if (module.init) {
            module.init(container);
        } else {
            container.innerHTML = `<p style="color:red">Error: Module init function not found.</p>`;
        }
    } catch (error) {
        console.error('Failed to load module:', error);
        app.innerHTML = `
            <div class="content-container">
                <h2 style="color:var(--accent-orange)">Module coming soon!</h2>
                <p class="description">We are currently building the <strong>${route.title}</strong> interactive experience. Stay tuned!</p>
                <div class="interactive-card">
                  <p>Error details: ${error.message}</p>
                </div>
            </div>
        `;
    }
}

// Event Listeners
window.addEventListener('hashchange', router);
window.addEventListener('load', router);
