export interface WalletTransaction {
  id: number;
  type: string;
  status: string;
  event: string;
  amount: string;
  created_at: Date;
  expire_at: Date;
  wallet_id: number;
  order_number?: any;
  coupon?: any;
}
