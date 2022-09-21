// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { ICompany } from '@types';
import { supabase } from '@utils/supabaseClient';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse<ICompany>) {
  const { company_name } = req.query;

  const data = await supabase
    .from('companies')
    .select(
      `*,products: products!company_id(product_id,product_name,product_price,order_quantity,current_quantity,category: category_id(*)),contacts: contacts!company_id(contact_id, contact_name, contact_phone)`
    )
    .match({ company_name })
    .single();

    console.log({data})

  res.status(200).json(data.data);
}
