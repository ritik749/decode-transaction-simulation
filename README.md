decode-transaction-simulation - NPM Package Readme
This is the readme for the decode-transaction-simulation npm package. This package helps you decode transaction data from the Tenderly API and extract information about asset changes.

Features
Decode Tenderly Transaction Data: Simplifies decoding transaction data retrieved from the Tenderly API.
Identify Asset Changes: Analyzes transactions to identify token transfers (inflow/outflow) and their details.
Error Handling: Provides informative error messages in case of decoding issues or API errors.
Installation
Install the package using npm:

Bash
npm install decode-transaction-simulation
Use code with caution.
content_copy
Usage
Import the Class:
JavaScript
import Decoder from 'decode-transaction-simulation';
Use code with caution.
content_copy
Provide Tenderly Credentials:
You'll need your Tenderly account details to use the API. Create a .env file in your project root and add the following environment variables:

TENDERLY_ACCOUNT_SLUG=your_account_slug
TENDERLY_PROJECT_SLUG=your_project_slug
TENDERLY_ACCESS_KEY=your_access_key
Instantiate the Decoder:
JavaScript
dotenv.config(); // Load environment variables

const provider = {
  TENDERLY_ACCOUNT_SLUG: process.env.TENDERLY_ACCOUNT_SLUG,
  TENDERLY_PROJECT_SLUG: process.env.TENDERLY_PROJECT_SLUG,
  TENDERLY_ACCESS_KEY: process.env.TENDERLY_ACCESS_KEY,
};

const decoder = new Decoder(provider);
Use code with caution.
content_copy
Decode a Transaction:
JavaScript
const transaction = {
  network_id: 1, // Chain ID (e.g., 1 for Ethereum mainnet)
  from: '0x...', // Sender address
  to: '0x...', // Receiver address
  input: '0x...',// input data
  gas: 21000, // Gas limit
  gas_price: 1000000000, // Gas price (in Wei)
  value: 0, // Transaction value (in Wei)
  simulation_type: 'quick', // Optional simulation type ('quick' or 'full')
};

decoder.decodeData(transaction)
  .then(data => {
    console.log(data);
    // data will contain information about token transfers (if any)
    // or indicate smart contract execution without token involvement.
  })
  .catch(err => {
    console.error(err);
    // Handle errors during decoding or API calls
  });
Use code with caution.
content_copy
Note: Replace the placeholder values in the transaction object with your actual transaction data.

Decoded Data Format
The decodeData method resolves with an object containing information about the transaction:

type: Indicates the type of transaction (e.g., "Smart contract Execution" or details about token transfers).
tokenIn (optional): If tokens are transferred into the address, details about the incoming token (name, symbol, amount, etc.) are provided.
tokenOut (optional): If tokens are transferred out of the address, details about the outgoing token (name, symbol, amount, etc.) are provided.
Contributing
We welcome contributions to this package! Please refer to the contributing guidelines (to be added in the future) for details on how to submit pull requests.
