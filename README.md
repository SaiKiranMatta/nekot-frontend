# Nekot ERC-20 Token Frontend Interface

A modern, responsive web interface for interacting with ERC-20 tokens built with Next.js, wagmi, and shadcn/ui. This interface supports multiple wallet connections including MetaMask, Coinbase Wallet, WalletConnect, and Brave Wallet.

## Features

### Read Operations

-   View token information (name, symbol, decimals, total supply)
-   Check token balances for any address
-   View allowances between owners and spenders
-   Monitor token balances in real-time

### Write Operations

-   Transfer tokens to other addresses
-   Transfer tokens on behalf of other addresses (transferFrom)
-   Approve spenders with specific allowances
-   Increase/decrease allowances for spenders
-   Mint new tokens (restricted to owner)
-   Burn existing tokens
-   Recover accidentally sent ERC-20 tokens
-   Token controls (pause/unpause)

## Prerequisites

-   Node.js (v16.x or later)
-   npm or yarn
-   A Web3 wallet (MetaMask, Coinbase Wallet, WalletConnect, or Brave Wallet)

## Installation

```bash
# Clone the repository
git clone https://github.com/SaiKiranMatta/nekot-frontend.git

# Install dependencies
npm install
# or
yarn install

# Set up environment variables
```

## Environment Variables

Create a `.env.local` file with the following variables:

```plaintext
NEXT_PUBLIC_CONTRACT_ADDRESS=<your-token-contract-address>
NEXT_PUBLIC_WC_PROJECT_ID=<your-walletconnect-project-id>
```

## Getting Started

```bash
# Run the development server
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Component Usage

### Token Information Display

```typescript
<TokenInfo />  // Displays basic token information
<ViewBalance address={userAddress} />  // Shows balance for specific address
<AllowanceView />  // Displays allowances
<TokenBalanceViewer />  // General balance viewer
```

### Token Operations

```typescript
<TransferToken />  // Transfer tokens
<TransferFrom />  // Transfer tokens on behalf of others
<ApproveSpender />  // Approve spenders
<IncreaseAllowance />  // Increase allowance for spender
<DecreaseAllowance />  // Decrease allowance for spender
<MintToken />  // Mint new tokens (owner only)
<BurnToken />  // Burn tokens
<TokenControls />  // Pause/unpause token
<RecoverToken />  // Recover accidentally sent tokens
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Security

This interface interacts with smart contracts on the blockchain. Always verify transactions before signing and ensure you're connected to the correct network.

## Support

For support, please open an issue in the GitHub repository or contact the development team.
