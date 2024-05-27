"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = __importDefault(require("axios"));
var dotenv = __importStar(require("dotenv"));
dotenv.config();
function decodeData(trnx) {
    return __awaiter(this, void 0, void 0, function () {
        var resp, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    console.log('=-=s-d=s-d=s-d=----', "https://api.tenderly.co/api/v1/account/".concat(process.env.TENDERLY_ACCOUNT_SLUG, "/project/").concat(process.env.TENDERLY_PROJECT_SLUG, "/simulate"));
                    return [4 /*yield*/, axios_1.default.post("https://api.tenderly.co/api/v1/account/".concat(process.env.TENDERLY_ACCOUNT_SLUG, "/project/").concat(process.env.TENDERLY_PROJECT_SLUG, "/simulate"), 
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
                        trnx, {
                            headers: {
                                'X-Access-Key': process.env.TENDERLY_ACCESS_KEY,
                            },
                        })];
                case 1:
                    resp = _a.sent();
                    console.log(JSON.stringify(resp.data));
                    return [2 /*return*/, resp.data];
                case 2:
                    err_1 = _a.sent();
                    console.log('=-=-err---', err_1);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.default = decodeData;
var obj = {
    // Simulation Configuration
    //   save: false, // if true simulation is saved and shows up in the dashboard
    //   save_if_fails: false, // if true, reverting simulations show up in the dashboard
    //   simulation_type: 'full', // full, abi or quick (full is default)
    network_id: 56,
    // Standard EVM Transaction object
    // block_number: 'latest',
    from: '0x42bec8d271b0df5a9497cb670a9a0d0deb65ddda',
    to: '0x1b6F2d3844C6ae7D56ceb3C3643b9060ba28FEb0',
    input: '0x703085c70000000000000000000000002170ed0880ac9a755fd29b2688956bd959f933f8000000000000000000000000000000000000000000000000000000000000000100000000000000000000000055d398326f99059ff775485246999027b31979550000000000000000000000000000000000000000000000001e4bd8322c18f8f800000000000000000000000000000000000000000000000000000000291f3ceb0000000000000000000000000000000000000000000000000000005c6e7bd34000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000005cf61bac800000000000000000000000000000000000000000000000000000000000000493',
    gas: 8000000,
    gas_price: 0,
    value: 0,
    simulation_type: 'quick',
};
decodeData(obj);
//# sourceMappingURL=index.js.map