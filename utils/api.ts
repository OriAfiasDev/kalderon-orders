import { supabase } from './supabaseClient';

export const getCompanyByEnglishName = async (company_name_english: string) => {
  const { data } = await supabase
    .from('companies')
    .select(
      `*,products: products!company_id(product_id,product_name,product_price,order_quantity,current_quantity,category: category_id(*)),contacts: contacts!company_id(contact_id, contact_name, contact_phone), categories: categories!company_id(category_id, category_name)`
    )
    .match({ company_name_english })
    .single();

  return data;
};
