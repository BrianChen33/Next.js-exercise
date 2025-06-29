'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import Box from '@mui/material/Box';
import PeopleAltRoundedIcon from '@mui/icons-material/PeopleAltRounded';
import LocationCityRoundedIcon from '@mui/icons-material/LocationCityRounded';
import DescriptionRoundedIcon from '@mui/icons-material/DescriptionRounded';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';

// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
const links = [
  { name: 'Home', href: '/dashboard', icon: HomeRoundedIcon },
  {
    name: 'Invoices',
    href: '/dashboard/invoices',
    icon: DescriptionRoundedIcon,
  },
  { name: 'Users', href: '/dashboard/users', icon: PeopleAltRoundedIcon },
  { name: 'Companies', href: '/dashboard/company', icon: LocationCityRoundedIcon },
];

export default function NavLinks() {
  const pathname = usePathname();
  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Box
            key={link.name} 
            sx={{
              margin: 1,
            }}
          >
            <Link
              href={link.href}
              className={clsx(
                'flex h-[48px] grow items-center justify-start gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 flex-none p-2 px-3',
                {
                  'bg-sky-100 text-blue-600': pathname === link.href,
                },
              )}
            >
              <LinkIcon className="w-6" />
              <p className="block">{link.name}</p>
            </Link>
          </Box>
        );
      })}
    </>
  );
}
