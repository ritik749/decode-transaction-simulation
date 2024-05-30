# decode-transaction-simulation #
### Overview ###

The **decode-transaction-simulation** package helps you decode transaction data from the Tenderly API and extract information about asset changes.

## Features ##
__Decode Tenderly Transaction Data__: Simplifies decoding transaction data retrieved from the Tenderly API.
__Identify Asset Changes__: Analyzes transactions to identify token transfers (inflow/outflow) and their details.
__Error Handling__: Provides informative error messages in case of decoding issues or API errors.


## Installation ##
Install the package using *npm*:
```` 
npm install decode-transaction-simulation

````

### Usage ###
__Step 1:__ Import the Class

Import the Decoder class in your JavaScript or TypeScript file:
``
import Decoder from 'decode-transaction-simulation';

``
__Step 2:__ Provide Tenderly Credentials

You need your Tenderly account details to use the API. Create a .env file in your project root and add the following environment variables:
``
TENDERLY_ACCOUNT_SLUG=your_account_slug
TENDERLY_PROJECT_SLUG=your_project_slug
TENDERLY_ACCESS_KEY=your_access_key

``

__Step 3:__ Instantiate the Decoder

Load the environment variables and create an instance of Decoder:

```
import dotenv from 'dotenv';
dotenv.config(); // Load environment variables

const provider = {
  TENDERLY_ACCOUNT_SLUG: process.env.TENDERLY_ACCOUNT_SLUG,
  TENDERLY_PROJECT_SLUG: process.env.TENDERLY_PROJECT_SLUG,
  TENDERLY_ACCESS_KEY: process.env.TENDERLY_ACCESS_KEY,
};

const decoder = new Decoder(provider);

```
__Step 4:__ Decode a Transaction
Create a transaction object and decode the transaction data:

````
const transaction = {
  network_id: 1, // Chain ID (e.g., 1 for Ethereum mainnet)
  from: '0x...', // Sender address
  to: '0x...', // Receiver address
  input: '0x...', // Input data
  gas: 21000, // Gas limit
  gas_price: 1000000000, // Gas price (in Wei)
  value: 0, // Transaction value (in Wei)
  simulation_type: 'quick', // Optional simulation type ('quick' or 'full')
};

decoder.decodeData(transaction)
  .then(data => {
    console.log(data); // Output decoded data
  })
  .catch(err => {
    console.error(err); // Handle errors
  });

````
Note: Replace the placeholder values in the transaction object with your actual transaction data.

### Decoded Data Format ###
The decodeData method resolves with an object containing information about the transaction:

``` 
{
  "type": "Smart contract Execution" // or details about token transfers
  "tokenIn": {
    "name": "Token Name",
    "symbol": "Token Symbol",
    "amount": "Token Amount"
  },
  "tokenOut": {
    "name": "Token Name",
    "symbol": "Token Symbol",
    "amount": "Token Amount"
  }
}
```
type: Indicates the type of transaction (e.g., "Smart contract Execution" or details about token transfers).
tokenIn (optional): If tokens are transferred into the address, details about the incoming token (name, symbol, amount, etc.) are provided.
tokenOut (optional): If tokens are transferred out of the address, details about the outgoing token (name, symbol, amount, etc.) are provided.
Contributing
We welcome contributions to this package! Please refer to the contributing guidelines (to be added in the future) for details on how to submit pull requests.

This layout should make the readme more readable and structured, guiding users step-by-step on how to use the package and what to expect as output.
