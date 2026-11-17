// What proven wallets are buying on BNB Smart Chain (chain ID 56) right now, from DexTrading.
//
// 1. Reads the network settings from ../bnbconfig.json.
// 2. Checks that the RPC really is BNB Smart Chain (eth_chainId must be 56).
// 3. Asks DexTrading's public MCP server (no key, read-only) for smart_money_buying_now on "bsc".
// 4. Reads each top buyer's BNB balance on BNB Smart Chain and prints BscScan and DexTrading links.
//
// Node 18 or newer, no dependencies:
//   node examples/bnb-chain-smart-money.mjs [limit]

import { readFile } from "node:fs/promises";

const config = JSON.parse(await readFile(new URL("../bnbconfig.json", import.meta.url), "utf8"));
const bsc = config.networks.bsc;
const limit = Math.min(Math.max(Number(process.argv[2]) || 5, 1), 15);

async function rpc(method, params = []) {
  const res = await fetch(bsc.rpcUrl, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ jsonrpc: "2.0", id: 1, method, params }),
  });
  const body = await res.json();
  if (body.error) throw new Error(`BNB Smart Chain RPC: ${body.error.message}`);
  return body.result;
}

async function callTool(name, args) {
  const res = await fetch(config.dextrading.mcpUrl, {
    method: "POST",
    headers: { "content-type": "application/json", accept: "application/json, text/event-stream" },
    body: JSON.stringify({ jsonrpc: "2.0", id: 1, method: "tools/call", params: { name, arguments: args } }),
  });
  if (!res.ok) throw new Error(`DexTrading MCP: HTTP ${res.status}`);
  const body = await res.json();
  if (body.error) throw new Error(`DexTrading MCP: ${body.error.message}`);
  const text = body.result?.content?.find((c) => c.type === "text")?.text ?? "";
  try {
    return JSON.parse(text);
  } catch {
    throw new Error(`DexTrading MCP: ${text.slice(0, 200)}`);
  }
}

const chainId = parseInt(await rpc("eth_chainId"), 16);
if (chainId !== bsc.chainId) throw new Error(`Expected BNB Smart Chain (${bsc.chainId}), the RPC answered chain ${chainId}`);

const answer = await callTool("smart_money_buying_now", { chain: bsc.dextradingChain, period: "24h", limit });
console.log(`${answer.chain}: ${answer.coins.length} coins bought by proven wallets (${answer.period}, as of ${answer.asOf})\n`);

for (const coin of answer.coins) {
  console.log(`${coin.coin}  ${coin.address}`);
  console.log(`  ${coin.signal}`);
  console.log(`  proven wallets ${coin.provenWallets}, bought $${coin.boughtUsd}, sold $${coin.soldUsd}, still holding ${coin.stillHoldingPct}%`);
  console.log(`  token: ${coin.tokenPage}   explorer: ${bsc.explorerUrl}/token/${coin.address}`);
  for (const buyer of coin.topBuyers ?? []) {
    const bnb = Number(BigInt(await rpc("eth_getBalance", [buyer.wallet, "latest"]))) / 10 ** bsc.nativeCurrency.decimals;
    const page = bsc.pages.walletPage.replace("{walletAddress}", buyer.wallet);
    console.log(`  - ${buyer.wallet}  bought $${buyer.boughtUsd}, 30d profit $${buyer.profit30dUsd}, ${bnb.toFixed(3)} BNB  ${page}`);
  }
  console.log("");
}

if (answer.disclosure) console.log(answer.disclosure);
