export const ccoABI = [
  {
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
];
