import { ICompany, ICompanySmall } from '@types';
import { supabase } from '@utils/supabaseClient';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse<ICompany[]>) {
  switch (req.method) {
    case 'GET':
      const { data, status: getStatus } = await supabase.from('companies').select(`*`);
      return res.status(getStatus).json(data as ICompany[]);
    case 'POST':
      const companyInfo = req.body as ICompanySmall;
      if (!companyInfo.company_name || !companyInfo.preferred_days.length) {
        return res.status(400).json([]);
      }
      const { status: postStatus } = await supabase.from('companies').insert(companyInfo);
      return res.status(postStatus).json([]);
    default:
      return res.status(405).json([]);
  }
}
