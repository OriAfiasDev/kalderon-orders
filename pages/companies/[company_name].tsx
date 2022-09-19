import { useRouter } from 'next/router';
import { useMemo } from 'react';
import { supabase } from '../../utils/supabaseClient';

type ICompany = {
  company_id: string;
  company_name: string;
  preferred_days: number[];
};

const Company:React.FC<{company_name: string, prefers: string[]}> = (props) => {
  console.log(props)

  return (
    <div>
      <h1>Company {props.company_name}</h1>
      <p>Preferred days: {props.prefers.map(day => day + ',')}</p>
    </div>
  );
};

export async function getServerSideProps(context: any) {
    const prefers = await supabase.from('companies').select('*').match({company_name: context.params.company_name}).then(res => res.data?.length ? res.data[0].preferred_days : [])

    return {
      props: {company_name: context.params.company_name, prefers},
    }
  }

export default Company;