import { MoveRight } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

const Settings = () => {
  const linksData = [
    {
      id: 1,
      title: 'Update Exchange Rate',
      link: '/settings/exchange-rate',
    },
    {
      id: 2,
      title: 'Update Admin Bank Account',
      link: '/settings/admin-account',
    },
    {
      id: 3,
      title: 'Update Processing Fee',
      link: '/settings/processing-fee',
    },
    {
      id: 4,
      title: 'Update App Version',
      link: '/settings/app-version',
    },
    {
      id: 5,
      title: 'Update Minimum Deposit',
      link: '/settings/minimum-deposit',
    },
    {
      id: 6,
      title: 'Update Airtime Rate',
      link: '/settings/airtime-rate',
    },
  ];

  return (
    <>
      <div className="h-full px-4 md:px-8 py-6 md:py-[48px]">
        <div className="flex flex-col gap-[28px]">
          {/* Header */}
          <div className="flex flex-col gap-1 font-figtree text-secondary">
            <h2 className="font-semibold text-xl md:text-2xl">Settings</h2>
            <p className="text-sm md:text-base text-secondary">
              Manage settings of the platform
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-col gap-4">
            {linksData?.map((link, index) => (
              <div
                key={link.id}
                className="flex flex-row gap-1 md:gap-3 items-start md:items-center"
              >
                <span className="text-sm md:text-base">{index + 1}.</span>
                <Link
                  href={link.link}
                  className="text-base md:text-lg hover:underline"
                >
                  {link.title}
                </Link>
                <MoveRight />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Settings;
