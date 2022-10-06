import { ICategory } from '@types';
import { supabase } from '@utils/supabaseClient';
import { v4 as uuid } from 'uuid';

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
