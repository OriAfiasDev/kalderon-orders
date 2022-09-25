import { ICompany } from '@types';
import { supabase } from '@utils/supabaseClient';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse<ICompany[]>) {
  const { data, status } = await supabase.from('companies').select(`*`);

  res.status(status).json(data as ICompany[]);
}
