import type { Asset } from "./koios";

export type DelegatorInfo = {
  stake_address: string;
  lace: number;
  handles?: [string];
  hosky?: number;
  assetsLoading: boolean;
  assets?: Asset[];
};
