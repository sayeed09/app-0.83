export class GAAddToCart {
  currency!: string;
  items!: GAItem[];
  value!: number;
}

export class GAItem {
  item_id!: string;
  item_name!: string | undefined;
  quantity!: number;
  price!: number;
}

export class Checkout extends GAAddToCart {
  coupon!: string;
}

export class PaymentInfo extends Checkout {
  payment_type!: string;
}

export class Purchase extends Checkout {
  transaction_id!: string;
  shipping!: number;
}
