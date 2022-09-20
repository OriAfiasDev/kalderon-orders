export interface IProduct {
  category: ICategory;
  current_quantity: number;
  order_quantity: number;
  product_id: string;
  product_name: string;
  product_price: number;
}

export interface ICategory {
  category_id: string;
  category_name: string;
}

interface IContact {
  contact_id: string;
  contact_name: string;
  contact_phone: string;
}

export interface ICompany {
  company_id: string;
  company_name: string;
  preferred_days: number[];
  products: IProduct[];
  contacts: IContact[];
}
