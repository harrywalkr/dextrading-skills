# DexTrading: copy trading and smart-money skills for AI agents

Official DexTrading repository for AI agents and developers. DexTrading (https://dextrading.com) is an on-chain
analytics and copy trading platform for DEX traders, live on **BNB Smart Chain (BSC, chain ID 56)**, Solana, Base and
Robinhood Chain, with wallet rankings and smart-money data also on Ethereum, Arbitrum and Optimism.

This repository holds:

- [`skills/dextrading-copy-trading/SKILL.md`](skills/dextrading-copy-trading/SKILL.md): an Agent Skill that lets Claude,
  ChatGPT, Cursor and other agents answer "who should I copy?", "is this wallet worth copying?" and "what is smart money
  buying?" with DexTrading's data;
- [`mcp.json`](mcp.json): the client config for DexTrading's free, read-only remote MCP server;
- [`bnbconfig.json`](bnbconfig.json): BNB Smart Chain network settings (chain ID 56, RPC, explorer) and DexTrading's BNB
  Chain pages;
- [`examples/bnb-chain-smart-money.mjs`](examples/bnb-chain-smart-money.mjs): a runnable example that checks the RPC is
  BNB Smart Chain, asks DexTrading what proven wallets are buying on BSC, and reads each top buyer's BNB balance.

## Quick start

### MCP server (no key, no sign-in)

```
https://dextrading.com/api/mcp
```

Claude Code:

```bash
claude mcp add --transport http dextrading https://dextrading.com/api/mcp
```

Cursor, VS Code and other clients: copy [`mcp.json`](mcp.json). Set-up for each client: https://dextrading.com/mcp

### Agent Skill

```bash
npx skills add harrywalkr/dextrading-skills
```

or copy `skills/dextrading-copy-trading/` into your agent's skills folder.

### BNB Chain example

Node 18 or newer, no dependencies:

```bash
node examples/bnb-chain-smart-money.mjs 5
```

## MCP tools

| Tool | What it answers | Chains |
|---|---|---|
| `find_traders_to_copy` | The best traders to copy now, each with a report card and a copy link | solana, bsc, base, robinhood |
| `trader_report_card` | One wallet's rankings, profit, win rate, hold time, red flags and verdict | solana, eth, bsc, base, arbitrum, optimism, robinhood |
| `compare_traders` | 2 to 5 wallets side by side and the coins they bought in common | same as above |
| `build_copy_squad` | A group of traders copied as one, buying only when several agree | solana, bsc, base, robinhood |
| `smart_money_buying_now` | The coins proven wallets are buying now, with dollars in and out and top buyers | solana, eth, bsc, base, arbitrum, optimism, robinhood |

All tools are read-only. Copy links open DexTrading's copy form filled in; nothing trades until the user confirms there
and funds a copy wallet.

## Technology stack

- **Blockchains**: BNB Smart Chain (chain ID 56), Solana, Base, Robinhood Chain, Ethereum, Arbitrum, Optimism
- **Agent interface**: Model Context Protocol (Streamable HTTP, JSON-RPC 2.0), Agent Skills (`SKILL.md`)
- **Web app**: Next.js, wagmi / viem for EVM wallets (BNB Smart Chain included)

## Supported networks

| Network | Chain ID | DexTrading features |
|---|---|---|
| **BNB Smart Chain Mainnet** | 56 | Copy trading, copy squads, trader rankings, smart-money buys, token and wallet pages |
| Solana | n/a | Copy trading, strategies, rankings, smart-money buys, swaps, prediction markets |
| Base | 8453 | Copy trading, rankings, smart-money buys |
| Robinhood Chain | n/a | Copy trading, rankings, smart-money buys |
| Ethereum | 1 | Rankings, smart-money buys, token and wallet pages |
| Arbitrum One | 42161 | Rankings, smart-money buys |
| Optimism | 10 | Rankings, smart-money buys |

## Contract addresses

DexTrading has no cryptocurrency token. On BNB Smart Chain it has no contract of its own: copied trades are swaps made by
each account's own copy wallet. Its one contract is the DexTrading Pro pass NFT on Base:
`0x26438dd6e307610033a0e5c744de20b74be5b25e`.

## Features

- **Copy trading on BNB Chain**: a copy wallet buys and sells when a chosen trader's wallet does, or when 2 or more
  wallets of a chosen group agree; 2% fee per copied trade, no subscription. https://dextrading.com/copy-trade
- **Smart-money tracking**: wallets ranked by profit that holds up after unsold coins, win rate and hold time, with
  launchers, fake numbers and inactive wallets left out.
- **Token and wallet pages** for every BNB Chain token and wallet DexTrading tracks:
  `https://dextrading.com/tokens/bsc/<token>` and `https://dextrading.com/wallet/<wallet>/bsc`.
- **Narratives on BNB Chain**: which market themes are moving and who is buying them. https://dextrading.com/narratives/bsc
- **Telegram**: copy trading as a Telegram mini app from [@Dextradingwalletbot](https://t.me/Dextradingwalletbot).
- 22 languages.

## Links

- Website: https://dextrading.com
- MCP set-up: https://dextrading.com/mcp
- X: https://x.com/dextradingapp
- Telegram: https://t.me/dextrading

Data are past results, not financial advice. Copied trades can lose money.

## License

MIT
