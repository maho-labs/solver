export const abi = [
  {
    "type": "function",
    "name": "initiate",
    "inputs": [
      {
        "name": "order",
        "type": "tuple",
        "internalType": "struct CrossChainOrder",
        "components": [
          {
            "name": "settlementContract",
            "type": "address",
            "internalType": "address"
          },
          {
            "name": "swapper",
            "type": "address",
            "internalType": "address"
          },
          {
            "name": "nonce",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "originChainId",
            "type": "uint32",
            "internalType": "uint32"
          },
          {
            "name": "initiateDeadline",
            "type": "uint32",
            "internalType": "uint32"
          },
          {
            "name": "fillDeadline",
            "type": "uint32",
            "internalType": "uint32"
          },
          {
            "name": "orderData",
            "type": "bytes",
            "internalType": "bytes"
          }
        ]
      },
      {
        "name": "signature",
        "type": "bytes",
        "internalType": "bytes"
      },
      {
        "name": "fillerData",
        "type": "bytes",
        "internalType": "bytes"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "resolve",
    "inputs": [
      {
        "name": "order",
        "type": "tuple",
        "internalType": "struct CrossChainOrder",
        "components": [
          {
            "name": "settlementContract",
            "type": "address",
            "internalType": "address"
          },
          {
            "name": "swapper",
            "type": "address",
            "internalType": "address"
          },
          {
            "name": "nonce",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "originChainId",
            "type": "uint32",
            "internalType": "uint32"
          },
          {
            "name": "initiateDeadline",
            "type": "uint32",
            "internalType": "uint32"
          },
          {
            "name": "fillDeadline",
            "type": "uint32",
            "internalType": "uint32"
          },
          {
            "name": "orderData",
            "type": "bytes",
            "internalType": "bytes"
          }
        ]
      },
      {
        "name": "fillerData",
        "type": "bytes",
        "internalType": "bytes"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "tuple",
        "internalType": "struct ResolvedCrossChainOrder",
        "components": [
          {
            "name": "swapperInputs",
            "type": "tuple[]",
            "internalType": "struct Input[]",
            "components": [
              {
                "name": "token",
                "type": "address",
                "internalType": "address"
              },
              {
                "name": "amount",
                "type": "uint256",
                "internalType": "uint256"
              }
            ]
          },
          {
            "name": "swapperOutputs",
            "type": "tuple[]",
            "internalType": "struct Output[]",
            "components": [
              {
                "name": "token",
                "type": "address",
                "internalType": "address"
              },
              {
                "name": "amount",
                "type": "uint256",
                "internalType": "uint256"
              },
              {
                "name": "recipient",
                "type": "address",
                "internalType": "address"
              },
              {
                "name": "chainId",
                "type": "uint32",
                "internalType": "uint32"
              }
            ]
          },
          {
            "name": "fillerOutputs",
            "type": "tuple[]",
            "internalType": "struct Output[]",
            "components": [
              {
                "name": "token",
                "type": "address",
                "internalType": "address"
              },
              {
                "name": "amount",
                "type": "uint256",
                "internalType": "uint256"
              },
              {
                "name": "recipient",
                "type": "address",
                "internalType": "address"
              },
              {
                "name": "chainId",
                "type": "uint32",
                "internalType": "uint32"
              }
            ]
          }
        ]
      }
    ],
    "stateMutability": "view"
  }
]