import { ICompany, ICompanySmall } from '@types';
import { convertDayToNum, hebToEnglish } from '@utils/conversions';
import { supabase } from '@utils/supabaseClient';
import { v4 as uuid } from 'uuid';

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
