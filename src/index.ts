import axios from 'axios';
import * as dotenv from 'dotenv';
import { reject } from 'lodash';
import { resolve } from 'path';
// import { transaction } from './types/index.js';

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
interface Provider {
  TENDERLY_ACCOUNT_SLUG: string;
  TENDERLY_PROJECT_SLUG: string;
  TENDERLY_ACCESS_KEY: string;
}
export default class Decoder {
  private TENDERLY_ACCOUNT_SLUG: string;
  private TENDERLY_PROJECT_SLUG: string;
  private TENDERLY_ACCESS_KEY: string;
  constructor(provider: Provider) {
    this.TENDERLY_ACCESS_KEY = provider.TENDERLY_ACCESS_KEY;
    this.TENDERLY_ACCOUNT_SLUG = provider.TENDERLY_ACCOUNT_SLUG;
    this.TENDERLY_PROJECT_SLUG = provider.TENDERLY_PROJECT_SLUG;
  }

  async decodeData(trnx: transaction) {
    return new Promise(async (resolve, reject) => {
      try {
        const resp = await axios.post(`https://api.tenderly.co/api/v1/account/${this.TENDERLY_ACCOUNT_SLUG}/project/${this.TENDERLY_PROJECT_SLUG}/simulate`, trnx, {
          headers: {
            'X-Access-Key': this.TENDERLY_ACCESS_KEY,
          },
        });

        let rsp = resp.data;

        if (typeof rsp?.transaction?.error_message == 'string') {
          reject({ isError: true, error_message: rsp?.transaction?.error_message, tokenIn: false, tokenOut: false });
        } else if (rsp?.transaction?.transaction_info?.asset_changes == null) {
          resolve({ type: 'Smart contract Execution', tokenIn: false, tokenOut: false });
        } else {
          let asset = rsp?.transaction?.transaction_info?.asset_changes;
          let assestArray: any = { tokenIn: false, tokenOut: false };
          if (asset?.length > 0) {
            asset.map((as: any) => {
              if (as?.type == 'Transfer') {
                if (as?.from?.toUpperCase() == trnx?.from?.toUpperCase()) {
                  assestArray = {
                    ...assestArray,
                    tokenInName: as?.token_info?.name,
                    tokenInDecimal: as?.token_info?.decimals,
                    tokenInSymbol: as?.token_info?.symbol,
                    tokenInAmount: as?.amount,
                    tokenInImage: as?.token_info?.logo,
                    tokenInDollarValueOfAmount: parseFloat(as?.dollar_value).toFixed(6),
                    tokenInAddress: as?.token_info?.contract_address,
                    tokenInType: as?.token_info?.type,
                    tokenInStandard: as?.token_info?.standard,
                    tokenIn: true,
                  };
                } else if (as?.to?.toUpperCase() == trnx?.from?.toUpperCase()) {
                  assestArray = {
                    ...assestArray,
                    tokenOutName: as?.token_info?.name,
                    tokenOutDecimal: as?.token_info?.decimals,
                    tokenOutSymbol: as?.token_info?.symbol,
                    tokenOutAmount: as?.amount,
                    tokenOutImage: as?.token_info?.logo,
                    tokenOutDollarValueOfAmount: parseFloat(as?.dollar_value).toFixed(6),
                    tokenOutAddress: as?.token_info?.contract_address,
                    tokenOutType: as?.token_info?.type,
                    tokenOutStandard: as?.token_info?.standard,
                    tokenOut: true,
                  };
                }
              }
            });

            resolve(assestArray);
          } else {
            reject({ isError: true });
          }
        }
      } catch (err) {
        console.log('=-=-err---', err);
        reject(err);
      }
    });
  }
}

//type

// {
//   "amount": "1.637308753101955063",
//   "dollar_value": "1.6366586980746840233",
//   "from": "0x42bec8d271b0df5a9497cb670a9a0d0deb65ddda",
//   "raw_amount": "1637308753101955063",
//   "to": "0x172fcd41e0913e95784454622d1c3724f546f849",
//   "token_info": {
//     "contract_address": "0x55d398326f99059ff775485246999027b3197955",
//     "decimals": 18,
//     "dollar_value": "0.9996029734611511",
//     "logo": "https://assets.coingecko.com/coins/images/35021/large/USDT.png?1707233575",
//     "name": "Binance Bridged USDT (BNB Smart Chain)",
//     "standard": "ERC20",
//     "symbol": "bsc-usd",
//     "type": "Fungible"
//   },
//   "type": "Transfer"
// },
