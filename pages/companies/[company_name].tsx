import { convertNumToDay } from '../../utils/conversions';
import { supabase } from '../../utils/supabaseClient';
import { v4 as uuid } from 'uuid';

type ICompany = {
  company_id: string;
  company_name: string;
  preferred_days: number[];
  products: any[];
};

const Company: React.FC<ICompany> = props => {
  console.log(props);

  return (
    <div>
      <h1>Company {props.company_name}</h1>
      <p>Preferred days: {props.preferred_days.map(day => convertNumToDay(day) + ',')}</p>
      <p>Products: {props.products.map(product => product.product_name + ',')}</p>
    </div>
  );
};

export async function getServerSideProps(context: any) {
  const preferred_days = await supabase
    .from('companies')
    .select('*')
    .match({ company_name: context.params.company_name })
    .then(res => (res.data?.length ? res.data[0].preferred_days : []));

  const company = await supabase.from('companies').select('*').match({ company_name: context.params.company_name }).single();
  const products = await supabase.from('products').select('*').match({ company_id: company.data.company_id });

  return {
    props: { ...company.data, products: products.data },
  };
}

export default Company;
