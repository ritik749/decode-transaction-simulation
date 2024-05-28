export interface transaction {
  network_id: number;
  from: string;
  to: string;
  input: string;
  gas: number;
  gas_price: number;
  value: number;
  simulation_type?: 'quick' | 'full';
}

export interface Provider {
  TENDERLY_ACCOUNT_SLUG: string;
  TENDERLY_PROJECT_SLUG: string;
  TENDERLY_ACCESS_KEY: string;
}

export default class Decoder {
  TENDERLY_ACCOUNT_SLUG: string;
  TENDERLY_PROJECT_SLUG: string;
  TENDERLY_ACCESS_KEY: string;
  constructor(provider: Provider) {}

  decodeData(trnx: transaction): Promise<any> {}
}
