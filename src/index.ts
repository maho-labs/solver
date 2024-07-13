import { createPublicClient, createWalletClient, encodeFunctionData, http, prepareEncodeFunctionData, type PrivateKeyAccount } from "viem";
import * as utils from "./utils";
import { mainnet } from "viem/chains";
import { privateKeyToAccount } from "viem/accounts";
import { abi as settlementAbi } from "./contracts/SettlementABI";
import { abi as erc20Abi } from "./contracts/ERC20ABI";

// The Worker's environment bindings. See `wrangler.toml` file.
interface Bindings {
  // MongoDB Atlas Application ID
  ATLAS_APPID: string;
}


const wallet = createWalletClient({
  chain: mainnet,
  transport: http(
    "https://winter-hardworking-tab.quiknode.pro/d72fe6609d16bc276d60dabcee7299905b484eaa/"
  ),
});

const publicClient = createPublicClient({
  chain: mainnet,
  transport: http(
    "https://winter-hardworking-tab.quiknode.pro/d72fe6609d16bc276d60dabcee7299905b484eaa/"
  ),
});

// Define type alias; available via `realm-web`

// Define the Worker logic
const worker: ExportedHandler<Bindings> = {
  async fetch(req: any, env: any) {
    const url = new URL(req.url);

    const method = req.method;
    const path = url.pathname.replace(/[/]$/, "");
    const account = privateKeyToAccount(env.SOLVER_KEY);


    try {
      if (method === "POST") {
        const contentType = req.headers.get("content-type");
        if (contentType.includes("application/json")) {
          const body: any = await req.json();

          console.log(body?.signature);

          if (
            body?.signature &&
            body.signature.startsWith("0x") &&
            body?.chainId
          ) {
            // start solving
            const contractAddress = body.originSettlementContract;

            const transactionCount = await publicClient.getTransactionCount({
              address: contractAddress,
            })

            const crossChainOrder = {
              settlementContract: contractAddress,
              swapper: body.swapper,
              nonce: transactionCount + 1,
              originChainId: body.chainId,
              initiateDeadline: body.initiateDeadline,
              fillDeadline: body.fillDeadline,
              orderData: body.orderData,
            };

            const resolve: any = await publicClient.readContract({
              address: contractAddress,
              abi: settlementAbi,
              functionName: "resolve",
              args: [
                crossChainOrder,
                body.fillerData,
              ]
            });

            const resolvedCrossChainOrder = {
              swapperInputs: resolve.swapperInputs,
              swapperOutputs: resolve.swapperOutputs,
              fillerOutputs: resolve.fillerOutputs,
            }

            const { request } = await publicClient.simulateContract({
              address: contractAddress,
              abi: settlementAbi,
              functionName: "initiate",
              args: [
                {
                  ...crossChainOrder,
                  nonce: transactionCount + 2,
                },
                body.signature,
                body.fillerData,
              ],
              account,
            })

            const initiateTxHash = await wallet.writeContract(request)

            const tx = await publicClient.waitForTransactionReceipt(
              { hash: initiateTxHash }
            );

            if (tx.status == 'success') {
              fillOrder(
                resolvedCrossChainOrder.swapperOutputs,
                body.destinationSettlementContract,
                crossChainOrder,
                account
              );
            }
          }

          return utils.reply("Solving...");
        }
        return utils.reply(
          "Please send a valid request with a signature & chainId."
        );
      }
      return utils.reply(
        "Please send a valid request with a body of type application/json."
      );
    }
    catch (err) {
      // return utils.reply("Please send a valid POST Request.");
      const msg = (err as Error).message || "Error with query.";
      return utils.toError(msg, 500);
    }
  }
}

const fillOrder = async (
  swapperOutputs: {
    token: `0x${string}`,
    amount: number, recipient:
    `0x${string}`,
    chainId: number
  }[],
  destinationContractAddress: `0x${string}`,
  crossChainOrder: any,
  account: PrivateKeyAccount
) => {
  const solutionSegments: { to: `0x${string}`, data: string, value: number }[] = [];

  const transfer = prepareEncodeFunctionData({
    abi: erc20Abi,
    functionName: "transfer",
  })

  swapperOutputs.forEach((output) => {
    const data = encodeFunctionData({
      ...transfer,
      args: [
        output.recipient,
        output.amount,
      ]
    })

    solutionSegments.push({
      to: output.token,
      data,
      value: output.amount,
    })
  })

  const { request } = await publicClient.simulateContract({
    address: destinationContractAddress,
    abi: settlementAbi,
    functionName: "fill",
    args: [
      crossChainOrder,
      solutionSegments,
    ],
    account,
  })

  const initiateTxHash = await wallet.writeContract(request);

  const tx = await publicClient.waitForTransactionReceipt(
    { hash: initiateTxHash }
  );

  if (tx.status == 'success') {
    return utils.reply("Order filled successfully.");
  }
}

const claimOrder = async (originSettlementContract: `0x${string}`, crossChainOrder: any, account: PrivateKeyAccount) => {
  const { request } = await publicClient.simulateContract({
    address: originSettlementContract,
    abi: settlementAbi,
    functionName: "claim",
    args: [
      crossChainOrder,
    ],
    account,
  })

  const initiateTxHash = await wallet.writeContract(request);

  const tx = await publicClient.waitForTransactionReceipt(
    { hash: initiateTxHash }
  );

  if (tx.status == 'success') {
    return utils.reply("Order claimed successfully.");
  }
}

// Export for discoverability
export default worker;
