export const abi = [
  {
    type: "constructor",
    inputs: [{ name: "_mailbox", type: "address", internalType: "address" }],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "claim",
    inputs: [
      {
        name: "order",
        type: "tuple",
        internalType: "struct CrossChainOrder",
        components: [
          {
            name: "settlementContract",
            type: "address",
            internalType: "address",
          },
          { name: "swapper", type: "address", internalType: "address" },
          { name: "nonce", type: "uint256", internalType: "uint256" },
          { name: "originChainId", type: "uint32", internalType: "uint32" },
          { name: "initiateDeadline", type: "uint32", internalType: "uint32" },
          { name: "fillDeadline", type: "uint32", internalType: "uint32" },
          { name: "orderData", type: "bytes", internalType: "bytes" },
        ],
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "fill",
    inputs: [
      {
        name: "order",
        type: "tuple",
        internalType: "struct CrossChainOrder",
        components: [
          {
            name: "settlementContract",
            type: "address",
            internalType: "address",
          },
          { name: "swapper", type: "address", internalType: "address" },
          { name: "nonce", type: "uint256", internalType: "uint256" },
          { name: "originChainId", type: "uint32", internalType: "uint32" },
          { name: "initiateDeadline", type: "uint32", internalType: "uint32" },
          { name: "fillDeadline", type: "uint32", internalType: "uint32" },
          { name: "orderData", type: "bytes", internalType: "bytes" },
        ],
      },
      { name: "fillerData", type: "bytes", internalType: "bytes" },
    ],
    outputs: [
      {
        name: "",
        type: "tuple",
        internalType: "struct ResolvedCrossChainOrder",
        components: [
          {
            name: "swapperInputs",
            type: "tuple[]",
            internalType: "struct Input[]",
            components: [
              { name: "token", type: "address", internalType: "address" },
              { name: "amount", type: "uint256", internalType: "uint256" },
            ],
          },
          {
            name: "swapperOutputs",
            type: "tuple[]",
            internalType: "struct Output[]",
            components: [
              { name: "token", type: "address", internalType: "address" },
              { name: "amount", type: "uint256", internalType: "uint256" },
              { name: "recipient", type: "address", internalType: "address" },
              { name: "chainId", type: "uint32", internalType: "uint32" },
            ],
          },
          {
            name: "fillerOutputs",
            type: "tuple[]",
            internalType: "struct Output[]",
            components: [
              { name: "token", type: "address", internalType: "address" },
              { name: "amount", type: "uint256", internalType: "uint256" },
              { name: "recipient", type: "address", internalType: "address" },
              { name: "chainId", type: "uint32", internalType: "uint32" },
            ],
          },
        ],
      },
    ],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "filledOrders",
    inputs: [{ name: "", type: "bytes32", internalType: "bytes32" }],
    outputs: [{ name: "", type: "bool", internalType: "bool" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "handle",
    inputs: [
      { name: "_origin", type: "uint32", internalType: "uint32" },
      { name: "_sender", type: "bytes32", internalType: "bytes32" },
      { name: "_data", type: "bytes", internalType: "bytes" },
    ],
    outputs: [],
    stateMutability: "payable",
  },
  {
    type: "function",
    name: "initiate",
    inputs: [
      {
        name: "order",
        type: "tuple",
        internalType: "struct CrossChainOrder",
        components: [
          {
            name: "settlementContract",
            type: "address",
            internalType: "address",
          },
          { name: "swapper", type: "address", internalType: "address" },
          { name: "nonce", type: "uint256", internalType: "uint256" },
          { name: "originChainId", type: "uint32", internalType: "uint32" },
          { name: "initiateDeadline", type: "uint32", internalType: "uint32" },
          { name: "fillDeadline", type: "uint32", internalType: "uint32" },
          { name: "orderData", type: "bytes", internalType: "bytes" },
        ],
      },
      { name: "signature", type: "bytes", internalType: "bytes" },
      { name: "fillerData", type: "bytes", internalType: "bytes" },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "mailbox",
    inputs: [],
    outputs: [{ name: "", type: "address", internalType: "contract IMailbox" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "resolve",
    inputs: [
      {
        name: "order",
        type: "tuple",
        internalType: "struct CrossChainOrder",
        components: [
          {
            name: "settlementContract",
            type: "address",
            internalType: "address",
          },
          { name: "swapper", type: "address", internalType: "address" },
          { name: "nonce", type: "uint256", internalType: "uint256" },
          { name: "originChainId", type: "uint32", internalType: "uint32" },
          { name: "initiateDeadline", type: "uint32", internalType: "uint32" },
          { name: "fillDeadline", type: "uint32", internalType: "uint32" },
          { name: "orderData", type: "bytes", internalType: "bytes" },
        ],
      },
      { name: "fillerData", type: "bytes", internalType: "bytes" },
    ],
    outputs: [
      {
        name: "",
        type: "tuple",
        internalType: "struct ResolvedCrossChainOrder",
        components: [
          {
            name: "swapperInputs",
            type: "tuple[]",
            internalType: "struct Input[]",
            components: [
              { name: "token", type: "address", internalType: "address" },
              { name: "amount", type: "uint256", internalType: "uint256" },
            ],
          },
          {
            name: "swapperOutputs",
            type: "tuple[]",
            internalType: "struct Output[]",
            components: [
              { name: "token", type: "address", internalType: "address" },
              { name: "amount", type: "uint256", internalType: "uint256" },
              { name: "recipient", type: "address", internalType: "address" },
              { name: "chainId", type: "uint32", internalType: "uint32" },
            ],
          },
          {
            name: "fillerOutputs",
            type: "tuple[]",
            internalType: "struct Output[]",
            components: [
              { name: "token", type: "address", internalType: "address" },
              { name: "amount", type: "uint256", internalType: "uint256" },
              { name: "recipient", type: "address", internalType: "address" },
              { name: "chainId", type: "uint32", internalType: "uint32" },
            ],
          },
        ],
      },
    ],
    stateMutability: "view",
  },
  {
    type: "error",
    name: "FailedIntent",
    inputs: [{ name: "reason", type: "bytes", internalType: "bytes" }],
  },
];
