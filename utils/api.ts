import { ICategory, ICompany, ICompanySmall, IContact, IProduct, IProductAPI } from '@types';
import { convertDayToNum, hebToEnglish } from './conversions';
import { supabase } from './supabaseClient';
import { v4 as uuid } from 'uuid';

// Companies

export const getCompanies = async (): Promise<ICompanySmall[]> => {
  const { data } = await supabase.from('companies').select(`*`);
  return data as ICompanySmall[];
};

export const createCompany = async (company_name: string, preferred_days: string[]): Promise<boolean> => {
  if (!company_name || !preferred_days.length) return false;

  const companyInfo: ICompanySmall = {
    company_name,
    preferred_days: preferred_days.map(day => convertDayToNum(day)),
    company_name_english: hebToEnglish(company_name),
    company_id: uuid(),
  };

  try {
    const { status } = await supabase.from('companies').insert(companyInfo);
    return status < 300;
  } catch {
    return false;
  }
};

export const getCompanyByEnglishName = async (company_name_english: string): Promise<ICompany> => {
  const { data } = await supabase
    .from('companies')
    .select(
      `*,products: products!company_id(product_id,product_name,product_price,order_quantity,current_quantity,category: category_id(*)),contacts: contacts!company_id(contact_id, contact_name, contact_phone), categories: categories!company_id(category_id, category_name)`
    )
    .match({ company_name_english })
    .single();

  return data;
};

export const getCompaniesByDay = async (day: number): Promise<ICompanySmall[]> => {
  const { data } = await supabase
    .from('companies')
    .select('company_name, company_id, preferred_days, company_name_english')
    .contains('preferred_days', [day]);

  return data as ICompanySmall[];
};

// Categories

export const createCategory = async (category_name: string, company_id: string): Promise<boolean> => {
  if (!category_name || !company_id) return false;
  try {
    const category: ICategory = { category_name, category_id: uuid(), company_id };
    const { status } = await supabase.from('categories').insert(category);
    return status < 300;
  } catch {
    return false;
  }
};

// Contacts

export const createContact = async (contact_name: string, contact_phone: string, company_id: string): Promise<boolean> => {
  if (!contact_name || !contact_phone || !company_id) return false;
  try {
    const contact: IContact = { contact_name, contact_phone, contact_id: uuid(), company_id };
    const { status } = await supabase.from('contacts').insert(contact);
    return status < 300;
  } catch {
    return false;
  }
};

// Products

export const createProduct = async (
  product_name: string,
  product_price: number,
  category_id: string,
  company_id: string
): Promise<boolean> => {
  if (!product_name || !product_price || !category_id || !company_id) return false;
  try {
    const product: IProductAPI = {
      product_name,
      product_price,
      product_id: uuid(),
      category_id,
      company_id,
      current_quantity: 0,
      order_quantity: 0,
    };
    const { status } = await supabase.from('products').insert(product);
    return status < 300;
  } catch {
    return false;
  }
};

export const updateQuantities = async (products: IProduct[], type: 'order' | 'current' = 'current'): Promise<boolean> => {
  if (!products.length) return false;

  try {
    const productsToUpdate = products.map(({ product_id, current_quantity, order_quantity }) =>
      type === 'order' ? { product_id, order_quantity } : { product_id, current_quantity }
    );

    const { status, statusText } = await supabase.from('products').upsert(productsToUpdate, { onConflict: 'product_id' });
    return status < 300;
  } catch {
    return false;
  }
};
