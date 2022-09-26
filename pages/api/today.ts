import { ICompanySmall } from '@types';
import { supabase } from '@utils/supabaseClient';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse<{ todayOrders: ICompanySmall[] }>) {
  const today = new Date().getDay();
  const { data, status } = await supabase
    .from('companies')
    .select('company_name, company_id, preferred_days, company_name_english')
    .contains('preferred_days', [today]);

  res.status(status).json({ todayOrders: data as ICompanySmall[] });
}
