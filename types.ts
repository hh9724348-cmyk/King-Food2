export interface Product {
  id: string;
  nameAr: string;
  nameEn: string;
  price: number; // in DZD
  image: string;
  description: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface OrderFormData {
  fullName: string;
  phone: string;
  address: string;
  notes: string;
}

export interface PlacedOrder {
  orderId: string;
  date: string;
  items: CartItem[];
  total: number;
  customer: OrderFormData;
}
