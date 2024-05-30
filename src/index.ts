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
          reject({ isError: true, error_message: rsp?.transaction?.error_message, tokenIn: null, tokenOut: null });
        } else if (rsp?.transaction?.transaction_info?.asset_changes == null) {
          resolve({ type: 'Smart contract Execution', tokenIn: null, tokenOut: null });
        } else {
          let asset = rsp?.transaction?.transaction_info?.asset_changes;
          let assestArray: any = { tokenIn: null, tokenOut: null };
          if (asset?.length > 0) {
            asset.map((as: any) => {
              if (as?.type == 'Transfer') {
                if (as?.from?.toUpperCase() == trnx?.from?.toUpperCase()) {
                  assestArray = {
                    ...assestArray,
                    tokenIn: {
                      name: as?.token_info?.name,
                      decimal: as?.token_info?.decimals,
                      symbol: as?.token_info?.symbol,
                      amount: as?.amount,
                      image: as?.token_info?.logo,
                      dollarValue: parseFloat(as?.dollar_value).toFixed(6),
                      token_address: as?.token_info?.contract_address,
                      type: as?.token_info?.type,
                      standard: as?.token_info?.standard,
                    },
                  };
                } else if (as?.to?.toUpperCase() == trnx?.from?.toUpperCase()) {
                  assestArray = {
                    ...assestArray,
                    tokenOut: {
                      name: as?.token_info?.name,
                      decimal: as?.token_info?.decimals,
                      symbol: as?.token_info?.symbol,
                      amount: as?.amount,
                      image: as?.token_info?.logo,
                      dollarValue: parseFloat(as?.dollar_value).toFixed(6),
                      token_address: as?.token_info?.contract_address,
                      type: as?.token_info?.type,
                      standard: as?.token_info?.standard,
                    },
                  };
                }
              }
            });

            if (assestArray.tokenIn && assestArray.tokenOut) {
              resolve({ type: 'Trade', ...assestArray });
            } else {
              resolve({ type: 'Transaction', ...assestArray });
            }
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
