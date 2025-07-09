import { fetchCardData } from '@/app/lib/data';
import { lusitana } from '@/app/ui/fonts';
import StoreRoundedIcon from '@mui/icons-material/StoreRounded';
import MonetizationOnRoundedIcon from '@mui/icons-material/MonetizationOnRounded';
import PublicRoundedIcon from '@mui/icons-material/PublicRounded';
import BadgeRoundedIcon from '@mui/icons-material/BadgeRounded';

const iconMap = {
  company_num: StoreRoundedIcon,
  total_revenue: MonetizationOnRoundedIcon,
  covered_countries: PublicRoundedIcon,
  employee_num: BadgeRoundedIcon,
};

export default async function CardWrapper() {
  const {
    company_num,
    total_revenue,
    covered_countries,
    employee_num,
  } = await fetchCardData();
  return (
    <>
      <Card title="Company Number" value={company_num} type="company_num" />
      <Card title="Total Revenue" value={total_revenue} type="total_revenue" />
      <Card title="Covered Countries" value={covered_countries} type="covered_countries" />
      <Card title="Empolyee Number" value={employee_num} type="employee_num"/>
    </>
  );
}

export function Card({
  title,
  value,
  type,
}: {
  title: string;
  value: number | string;
  type: 'company_num' | 'total_revenue' | 'covered_countries' | 'employee_num';
}) {
  const Icon = iconMap[type];

  return (
    <div className="rounded-xl bg-gray-50 p-2 shadow-sm">
      <div className="flex p-4">
        {Icon ? <Icon className="h-5 w-5 text-gray-700" /> : null}
        <h3 className="ml-2 text-sm font-medium">{title}</h3>
      </div>
      <p
        className={`${lusitana.className}
          truncate rounded-xl bg-white px-4 py-8 text-center text-2xl`}
      >
        {value}
      </p>
    </div>
  );
}
