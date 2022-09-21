// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { IProduct } from '@types';
import { supabase } from '@utils/supabaseClient';
import type { NextApiRequest, NextApiResponse } from 'next';
import Cors from 'cors';

const cors = Cors({ methods: ['POST'] });

function runMiddleware(req: NextApiRequest, res: NextApiResponse, fn: Function) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }

      return resolve(result);
    });
  });
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await runMiddleware(req, res, cors);

  if (req.method === 'POST') {
    const { products } = JSON.parse(req.body) as { products: IProduct[] };

    const { status, statusText } = await supabase.from('products').upsert(
      products.map(({ product_id, current_quantity }) => ({ product_id, current_quantity })),
      { onConflict: 'product_id' }
    );
    console.log({ status, statusText });

    res.status(status).json({ statusText });
  }
}
