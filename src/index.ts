import axios from 'axios';
import * as dotenv from 'dotenv';

dotenv.config();

interface transaction {
  network_id: number;
  from: string;
  to: string;
  input: string;
  gas: number;
  gas_price: number;
  value: number;
  simulation_type?: 'quick' | 'full';
}

export async function decodeData(trnx: transaction) {
  try {
    // console.log('=-=s-d=s-d=s-d=----', `https://api.tenderly.co/api/v1/account/${process.env.TENDERLY_ACCOUNT_SLUG}/project/${process.env.TENDERLY_PROJECT_SLUG}/simulate`);
    const resp = await axios.post(
      `https://api.tenderly.co/api/v1/account/${process.env.TENDERLY_ACCOUNT_SLUG}/project/${process.env.TENDERLY_PROJECT_SLUG}/simulate`,
      // the transaction
      //   {
      //     // Simulation Configuration
      //     //   save: false, // if true simulation is saved and shows up in the dashboard
      //     //   save_if_fails: false, // if true, reverting simulations show up in the dashboard
      //     //   simulation_type: 'full', // full, abi or quick (full is default)
      //     network_id: '56', // network to simulate on
      //     // Standard EVM Transaction object
      //     // block_number: 'latest',
      //     from: '0x42bec8d271b0df5a9497cb670a9a0d0deb65ddda',
      //     to: '0x1b6F2d3844C6ae7D56ceb3C3643b9060ba28FEb0',
      //     input:
      //       '0x703085c70000000000000000000000002170ed0880ac9a755fd29b2688956bd959f933f8000000000000000000000000000000000000000000000000000000000000000100000000000000000000000055d398326f99059ff775485246999027b31979550000000000000000000000000000000000000000000000001e4bd8322c18f8f800000000000000000000000000000000000000000000000000000000291f3ceb0000000000000000000000000000000000000000000000000000005c6e7bd34000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000005cf61bac800000000000000000000000000000000000000000000000000000000000000493',
      //     gas: 8000000,
      //     gas_price: 0,
      //     value: 0,
      //     simulation_type: 'quick',
      //   },
      trnx,
      {
        headers: {
          'X-Access-Key': process.env.TENDERLY_ACCESS_KEY,
        },
      }
    );

    console.log(JSON.stringify(resp.data));

    return resp.data;
  } catch (err) {
    console.log('=-=-err---', err);
  }

  //   console.timeEnd('Simulation');
}

let obj: transaction = {
  // Simulation Configuration
  //   save: false, // if true simulation is saved and shows up in the dashboard
  //   save_if_fails: false, // if true, reverting simulations show up in the dashboard
  //   simulation_type: 'full', // full, abi or quick (full is default)
  network_id: 56, // network to simulate on
  // Standard EVM Transaction object
  // block_number: 'latest',
  from: '0x42bec8d271b0df5a9497cb670a9a0d0deb65ddda',
  to: '0x1b6F2d3844C6ae7D56ceb3C3643b9060ba28FEb0',
  input:
    '0x703085c70000000000000000000000002170ed0880ac9a755fd29b2688956bd959f933f8000000000000000000000000000000000000000000000000000000000000000100000000000000000000000055d398326f99059ff775485246999027b31979550000000000000000000000000000000000000000000000001e4bd8322c18f8f800000000000000000000000000000000000000000000000000000000291f3ceb0000000000000000000000000000000000000000000000000000005c6e7bd34000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000005cf61bac800000000000000000000000000000000000000000000000000000000000000493',
  gas: 8000000,
  gas_price: 0,
  value: 0,
  simulation_type: 'quick',
};

decodeData(obj);
