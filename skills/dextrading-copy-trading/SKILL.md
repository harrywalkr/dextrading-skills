---
name: dextrading-copy-trading
description: Find on-chain traders worth copying, get a report card for any wallet, compare wallets, build a copy squad and see what proven wallets are buying now on Solana, BNB Chain, Base, Robinhood Chain, Ethereum, Arbitrum and Optimism, using DexTrading's free read-only MCP server. Use when the user asks who to copy trade, whether a wallet is worth copying, which wallets to group, or what smart money is buying on a chain.
---

# DexTrading copy trading

DexTrading (https://dextrading.com) ranks on-chain traders from its own analysis of the wallets it tracks. This skill
answers copy-trading questions with DexTrading's remote MCP server:

- URL: `https://dextrading.com/api/mcp` (Streamable HTTP, JSON-RPC 2.0)
- No sign-in and no key. Every tool is read-only.
- Set-up page for Claude, ChatGPT, Cursor and VS Code: https://dextrading.com/mcp

If the MCP server is not connected in this client, call it over HTTP:

```bash
curl -s https://dextrading.com/api/mcp \
  -H 'content-type: application/json' -H 'accept: application/json, text/event-stream' \
  -d '{"jsonrpc":"2.0","id":1,"method":"tools/call","params":{"name":"smart_money_buying_now","arguments":{"chain":"bsc"}}}'
```

The answer's `result.content[0].text` is JSON.

## Tools

| Tool | Use it for | Main arguments |
|---|---|---|
| `find_traders_to_copy` | "Who should I copy on BNB Chain?" | `chain` (solana, bsc, base, robinhood), `period` (24h, 7d, 30d), `style` (any, scalper, dayTrader, swing, holder), `limit` (1-10) |
| `trader_report_card` | "Is this wallet worth copying?" | `wallet` (Solana or 0x address), `chain` (optional) |
| `compare_traders` | "Which of these wallets is better?" | `wallets` (2-5 addresses of one chain), `chain` |
| `build_copy_squad` | "Copy a group that buys only when several agree" | `chain`, `size` (2-8), `style`, `agree`, `include` |
| `smart_money_buying_now` | "What is smart money buying?" | `chain` (solana, eth, bsc, base, arbitrum, optimism, robinhood), `period` (24h, 7d), `limit` (1-15) |

Chain names: `solana` = Solana, `bsc` = BNB Smart Chain (chain ID 56), `base` = Base, `robinhood` = Robinhood Chain,
`eth` = Ethereum, `arbitrum` = Arbitrum, `optimism` = Optimism. Copy trading runs on Solana, BNB Chain, Base and
Robinhood Chain; rankings and smart-money buys also cover Ethereum, Arbitrum and Optimism.

## How to answer

1. Pick the tool from the question. If the user names no chain, ask, or use the chain of the wallet they gave.
2. Give full wallet and token addresses, never shortened ones, and the date and time the answer is "as of".
3. Say what the verdict and red flags mean in plain words (launches its own coins, one lucky coin, unsold bags, too fast
   to copy). Do not hide a bad verdict.
4. Include the links the tool returns (wallet page, token page, copy form). Copy links open DexTrading's copy form filled
   in; nothing trades until the user confirms there and funds a copy wallet.
5. State the cost when you suggest copying: 2% per copied trade, no subscription.
6. These are past results. Say that past profit does not promise future profit and that copied trades can lose money.
   This is not financial advice.
