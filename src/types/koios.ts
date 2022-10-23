export type Delegator = {
  stake_address: string;
  amount: number;
  active_epoch_no: number;
};

export type Tip = {
  hash: string;
  epoch_no: number;
  abs_slot: number;
  epoch_slot: number;
  block_no: number;
  block_time: number;
};

export type EpochInfo = {
  epoch_no: number;
  out_sum: string;
  fees: string;
  tx_count: number;
  blk_count: number;
  start_time: number;
  end_time: number;
  first_block_time: number;
  last_block_time: number;
  active_stake: string | null;
  total_rewards: string | null;
  avg_blk_reward: string | null;
};

export type Relay = {
  dns?: string;
  srv?: string;
  ipv4?: string;
  ipv6?: string;
  port?: number;
};

export type MetaJson = {
  name?: string;
  ticker?: string;
  homepage?: string;
  description?: string;
};

export type PoolInfo = {
  pool_id_bech32?: string;
  pool_id_hex?: string;
  active_epoch_no?: number;
  vrf_key_hash?: string;
  margin?: number;
  fixed_cost?: number;
  pledge?: string;
  reward_addr?: string;
  owners?: [string];
  relays?: [Relay];
  meta_url?: string;
  meta_hash?: string;
  meta_json?: MetaJson;
  pool_status?: string;
  retiring_epoch?: any; //TODO: no schema -_-
  op_cert: string;
  op_cert_counter: number;
  active_stake: string;
  block_count: number;
  live_pledge: string;
  live_stake: string;
  live_delegators: number;
  live_saturation: number;
};
