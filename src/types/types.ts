export type DelegatorInfo = {
  stake_address: string;
  lace: number;
  assetsLoading: boolean;
  assets?: [
    {
      name: string;
      policy: string;
      balance: string;
      metadata?: any;
    }
  ];
};
