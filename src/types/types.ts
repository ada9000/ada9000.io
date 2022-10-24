import type { Asset } from "./koios";

export type DelegatorInfo = {
  stake_address: string;
  lace: number;
  handles?: [string];
  assetsLoading: boolean;
  assets?: Asset[];
};
