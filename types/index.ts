export interface IProduct {
  category: ICategory;
  current_quantity: number;
  order_quantity: number;
  product_id: string;
  product_name: string;
  product_price: number;
}

export interface IProductAPI {
  current_quantity: number;
  order_quantity: number;
  product_id: string;
  product_name: string;
  product_price: number;
  category_id: string;
  company_id: string;
}

export interface ICategory {
  category_id: string;
  category_name: string;
  company_id: string;
}

export interface IContact {
  contact_id: string;
  contact_name: string;
  contact_phone: string;
  company_id: string;
}

export interface ICompany {
  company_id: string;
  company_name: string;
  company_name_english: string;
  preferred_days: number[];
  products: IProduct[];
  contacts: IContact[];
  categories: ICategory[];
}

export type ICompanySmall = {
  company_id: string;
  company_name: string;
  company_name_english: string;
  preferred_days: number[];
};
