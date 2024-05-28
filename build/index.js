var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import axios from 'axios';
import * as dotenv from 'dotenv';
// import { transaction } from './types/index.js';
dotenv.config();
export default class Decoder {
    constructor(provider) {
        this.TENDERLY_ACCESS_KEY = provider.TENDERLY_ACCESS_KEY;
        this.TENDERLY_ACCOUNT_SLUG = provider.TENDERLY_ACCOUNT_SLUG;
        this.TENDERLY_PROJECT_SLUG = provider.TENDERLY_PROJECT_SLUG;
    }
    decodeData(trnx) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                var _a, _b, _c, _d, _e, _f;
                try {
                    const resp = yield axios.post(`https://api.tenderly.co/api/v1/account/${this.TENDERLY_ACCOUNT_SLUG}/project/${this.TENDERLY_PROJECT_SLUG}/simulate`, trnx, {
                        headers: {
                            'X-Access-Key': this.TENDERLY_ACCESS_KEY,
                        },
                    });
                    let rsp = resp.data;
                    if (typeof ((_a = rsp === null || rsp === void 0 ? void 0 : rsp.transaction) === null || _a === void 0 ? void 0 : _a.error_message) == 'string') {
                        reject({ isError: true, error_message: (_b = rsp === null || rsp === void 0 ? void 0 : rsp.transaction) === null || _b === void 0 ? void 0 : _b.error_message, tokenIn: false, tokenOut: false });
                    }
                    else if (((_d = (_c = rsp === null || rsp === void 0 ? void 0 : rsp.transaction) === null || _c === void 0 ? void 0 : _c.transaction_info) === null || _d === void 0 ? void 0 : _d.asset_changes) == null) {
                        resolve({ type: 'Smart contract Execution', tokenIn: false, tokenOut: false });
                    }
                    else {
                        let asset = (_f = (_e = rsp === null || rsp === void 0 ? void 0 : rsp.transaction) === null || _e === void 0 ? void 0 : _e.transaction_info) === null || _f === void 0 ? void 0 : _f.asset_changes;
                        let assestArray = { tokenIn: false, tokenOut: false };
                        if ((asset === null || asset === void 0 ? void 0 : asset.length) > 0) {
                            asset.map((as) => {
                                var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t;
                                if ((as === null || as === void 0 ? void 0 : as.type) == 'Transfer') {
                                    if (((_a = as === null || as === void 0 ? void 0 : as.from) === null || _a === void 0 ? void 0 : _a.toUpperCase()) == ((_b = trnx === null || trnx === void 0 ? void 0 : trnx.from) === null || _b === void 0 ? void 0 : _b.toUpperCase())) {
                                        assestArray = Object.assign(Object.assign({}, assestArray), { tokenInName: (_c = as === null || as === void 0 ? void 0 : as.token_info) === null || _c === void 0 ? void 0 : _c.name, tokenInDecimal: (_d = as === null || as === void 0 ? void 0 : as.token_info) === null || _d === void 0 ? void 0 : _d.decimals, tokenInSymbol: (_e = as === null || as === void 0 ? void 0 : as.token_info) === null || _e === void 0 ? void 0 : _e.symbol, tokenInAmount: as === null || as === void 0 ? void 0 : as.amount, tokenInImage: (_f = as === null || as === void 0 ? void 0 : as.token_info) === null || _f === void 0 ? void 0 : _f.logo, tokenInDollarValueOfAmount: parseFloat(as === null || as === void 0 ? void 0 : as.dollar_value).toFixed(6), tokenInAddress: (_g = as === null || as === void 0 ? void 0 : as.token_info) === null || _g === void 0 ? void 0 : _g.contract_address, tokenInType: (_h = as === null || as === void 0 ? void 0 : as.token_info) === null || _h === void 0 ? void 0 : _h.type, tokenInStandard: (_j = as === null || as === void 0 ? void 0 : as.token_info) === null || _j === void 0 ? void 0 : _j.standard, tokenIn: true });
                                    }
                                    else if (((_k = as === null || as === void 0 ? void 0 : as.to) === null || _k === void 0 ? void 0 : _k.toUpperCase()) == ((_l = trnx === null || trnx === void 0 ? void 0 : trnx.from) === null || _l === void 0 ? void 0 : _l.toUpperCase())) {
                                        assestArray = Object.assign(Object.assign({}, assestArray), { tokenOutName: (_m = as === null || as === void 0 ? void 0 : as.token_info) === null || _m === void 0 ? void 0 : _m.name, tokenOutDecimal: (_o = as === null || as === void 0 ? void 0 : as.token_info) === null || _o === void 0 ? void 0 : _o.decimals, tokenOutSymbol: (_p = as === null || as === void 0 ? void 0 : as.token_info) === null || _p === void 0 ? void 0 : _p.symbol, tokenOutAmount: as === null || as === void 0 ? void 0 : as.amount, tokenOutImage: (_q = as === null || as === void 0 ? void 0 : as.token_info) === null || _q === void 0 ? void 0 : _q.logo, tokenOutDollarValueOfAmount: parseFloat(as === null || as === void 0 ? void 0 : as.dollar_value).toFixed(6), tokenOutAddress: (_r = as === null || as === void 0 ? void 0 : as.token_info) === null || _r === void 0 ? void 0 : _r.contract_address, tokenOutType: (_s = as === null || as === void 0 ? void 0 : as.token_info) === null || _s === void 0 ? void 0 : _s.type, tokenOutStandard: (_t = as === null || as === void 0 ? void 0 : as.token_info) === null || _t === void 0 ? void 0 : _t.standard, tokenOut: true });
                                    }
                                }
                            });
                            resolve(assestArray);
                        }
                        else {
                            reject({ isError: true });
                        }
                    }
                }
                catch (err) {
                    console.log('=-=-err---', err);
                    reject(err);
                }
            }));
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
