export const nekotAbi = [
    // Read functions
    {
        name: "name",
        type: "function",
        stateMutability: "view",
        inputs: [],
        outputs: [{ type: "string" }],
    },
    {
        name: "symbol",
        type: "function",
        stateMutability: "view",
        inputs: [],
        outputs: [{ type: "string" }],
    },
    {
        name: "decimals",
        type: "function",
        stateMutability: "view",
        inputs: [],
        outputs: [{ type: "uint8" }],
    },
    {
        name: "totalSupply",
        type: "function",
        stateMutability: "view",
        inputs: [],
        outputs: [{ type: "uint256" }],
    },
    {
        name: "balanceOf",
        type: "function",
        stateMutability: "view",
        inputs: [{ name: "account", type: "address" }],
        outputs: [{ type: "uint256" }],
    },
    {
        name: "allowance",
        type: "function",
        stateMutability: "view",
        inputs: [
            { name: "owner", type: "address" },
            { name: "spender", type: "address" },
        ],
        outputs: [{ type: "uint256" }],
    },
    {
        name: "owner",
        type: "function",
        stateMutability: "view",
        inputs: [],
        outputs: [{ type: "address" }],
    },
    {
        name: "paused",
        type: "function",
        stateMutability: "view",
        inputs: [],
        outputs: [{ type: "bool" }],
    },
    // Write functions
    {
        name: "transfer",
        type: "function",
        stateMutability: "nonpayable",
        inputs: [
            { name: "to", type: "address" },
            { name: "amount", type: "uint256" },
        ],
        outputs: [{ type: "bool" }],
    },
    {
        name: "approve",
        type: "function",
        stateMutability: "nonpayable",
        inputs: [
            { name: "spender", type: "address" },
            { name: "amount", type: "uint256" },
        ],
        outputs: [{ type: "bool" }],
    },
    {
        name: "transferFrom",
        type: "function",
        stateMutability: "nonpayable",
        inputs: [
            { name: "from", type: "address" },
            { name: "to", type: "address" },
            { name: "amount", type: "uint256" },
        ],
        outputs: [{ type: "bool" }],
    },
    {
        name: "increaseAllowance",
        type: "function",
        stateMutability: "nonpayable",
        inputs: [
            { name: "spender", type: "address" },
            { name: "addedValue", type: "uint256" },
        ],
        outputs: [{ type: "bool" }],
    },
    {
        name: "decreaseAllowance",
        type: "function",
        stateMutability: "nonpayable",
        inputs: [
            { name: "spender", type: "address" },
            { name: "subtractedValue", type: "uint256" },
        ],
        outputs: [{ type: "bool" }],
    },
    {
        name: "mint",
        type: "function",
        stateMutability: "nonpayable",
        inputs: [
            { name: "to", type: "address" },
            { name: "amount", type: "uint256" },
        ],
        outputs: [{ type: "bool" }],
    },
    {
        name: "burn",
        type: "function",
        stateMutability: "nonpayable",
        inputs: [{ name: "amount", type: "uint256" }],
        outputs: [{ type: "bool" }],
    },
    {
        name: "pause",
        type: "function",
        stateMutability: "nonpayable",
        inputs: [],
        outputs: [],
    },
    {
        name: "unpause",
        type: "function",
        stateMutability: "nonpayable",
        inputs: [],
        outputs: [],
    },
    {
        name: "transferOwnership",
        type: "function",
        stateMutability: "nonpayable",
        inputs: [{ name: "newOwner", type: "address" }],
        outputs: [],
    },
    {
        name: "recoverERC20",
        type: "function",
        stateMutability: "nonpayable",
        inputs: [
            { name: "tokenAddress", type: "address" },
            { name: "tokenAmount", type: "uint256" },
        ],
        outputs: [],
    },
] as const;

export const CONTRACT_ADDRESS =
    "0x300BDFABa3bEE8382A3f22642606EB6bCAD81E36" as const;
