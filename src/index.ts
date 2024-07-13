import { createPublicClient, createWalletClient, http } from "viem";
import * as utils from "./utils";
import { mainnet } from "viem/chains";
import { privateKeyToAccount } from "viem/accounts";

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

      return utils.reply("Please send a valid POST Request.");
    } catch (err) {
      const msg = (err as Error).message || "Error with query.";
      return utils.toError(msg, 500);
    }
  },
};

// Export for discoverability
export default worker;
