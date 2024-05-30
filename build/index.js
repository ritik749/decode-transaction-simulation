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
                        reject({ isError: true, error_message: (_b = rsp === null || rsp === void 0 ? void 0 : rsp.transaction) === null || _b === void 0 ? void 0 : _b.error_message, tokenIn: null, tokenOut: null });
                    }
                    else if (((_d = (_c = rsp === null || rsp === void 0 ? void 0 : rsp.transaction) === null || _c === void 0 ? void 0 : _c.transaction_info) === null || _d === void 0 ? void 0 : _d.asset_changes) == null) {
                        resolve({ type: 'Smart contract Execution', tokenIn: null, tokenOut: null });
                    }
                    else {
                        let asset = (_f = (_e = rsp === null || rsp === void 0 ? void 0 : rsp.transaction) === null || _e === void 0 ? void 0 : _e.transaction_info) === null || _f === void 0 ? void 0 : _f.asset_changes;
                        let assestArray = { tokenIn: null, tokenOut: null };
                        if ((asset === null || asset === void 0 ? void 0 : asset.length) > 0) {
                            asset.map((as) => {
                                var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t;
                                if ((as === null || as === void 0 ? void 0 : as.type) == 'Transfer') {
                                    if (((_a = as === null || as === void 0 ? void 0 : as.from) === null || _a === void 0 ? void 0 : _a.toUpperCase()) == ((_b = trnx === null || trnx === void 0 ? void 0 : trnx.from) === null || _b === void 0 ? void 0 : _b.toUpperCase())) {
                                        assestArray = Object.assign(Object.assign({}, assestArray), { tokenIn: {
                                                name: (_c = as === null || as === void 0 ? void 0 : as.token_info) === null || _c === void 0 ? void 0 : _c.name,
                                                decimal: (_d = as === null || as === void 0 ? void 0 : as.token_info) === null || _d === void 0 ? void 0 : _d.decimals,
                                                symbol: (_e = as === null || as === void 0 ? void 0 : as.token_info) === null || _e === void 0 ? void 0 : _e.symbol,
                                                amount: as === null || as === void 0 ? void 0 : as.amount,
                                                image: (_f = as === null || as === void 0 ? void 0 : as.token_info) === null || _f === void 0 ? void 0 : _f.logo,
                                                dollarValue: parseFloat(as === null || as === void 0 ? void 0 : as.dollar_value).toFixed(6),
                                                token_address: (_g = as === null || as === void 0 ? void 0 : as.token_info) === null || _g === void 0 ? void 0 : _g.contract_address,
                                                type: (_h = as === null || as === void 0 ? void 0 : as.token_info) === null || _h === void 0 ? void 0 : _h.type,
                                                standard: (_j = as === null || as === void 0 ? void 0 : as.token_info) === null || _j === void 0 ? void 0 : _j.standard,
                                            } });
                                    }
                                    else if (((_k = as === null || as === void 0 ? void 0 : as.to) === null || _k === void 0 ? void 0 : _k.toUpperCase()) == ((_l = trnx === null || trnx === void 0 ? void 0 : trnx.from) === null || _l === void 0 ? void 0 : _l.toUpperCase())) {
                                        assestArray = Object.assign(Object.assign({}, assestArray), { tokenOut: {
                                                name: (_m = as === null || as === void 0 ? void 0 : as.token_info) === null || _m === void 0 ? void 0 : _m.name,
                                                decimal: (_o = as === null || as === void 0 ? void 0 : as.token_info) === null || _o === void 0 ? void 0 : _o.decimals,
                                                symbol: (_p = as === null || as === void 0 ? void 0 : as.token_info) === null || _p === void 0 ? void 0 : _p.symbol,
                                                amount: as === null || as === void 0 ? void 0 : as.amount,
                                                image: (_q = as === null || as === void 0 ? void 0 : as.token_info) === null || _q === void 0 ? void 0 : _q.logo,
                                                dollarValue: parseFloat(as === null || as === void 0 ? void 0 : as.dollar_value).toFixed(6),
                                                token_address: (_r = as === null || as === void 0 ? void 0 : as.token_info) === null || _r === void 0 ? void 0 : _r.contract_address,
                                                type: (_s = as === null || as === void 0 ? void 0 : as.token_info) === null || _s === void 0 ? void 0 : _s.type,
                                                standard: (_t = as === null || as === void 0 ? void 0 : as.token_info) === null || _t === void 0 ? void 0 : _t.standard,
                                            } });
                                    }
                                }
                            });
                            if (assestArray.tokenIn && assestArray.tokenOut) {
                                resolve(Object.assign({ type: 'Trade' }, assestArray));
                            }
                            else {
                                resolve(Object.assign({ type: 'Transaction' }, assestArray));
                            }
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
