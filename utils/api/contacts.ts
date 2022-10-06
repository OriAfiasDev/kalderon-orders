import { IContact } from '@types';
import { supabase } from '@utils/supabaseClient';
import { v4 as uuid } from 'uuid';

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
