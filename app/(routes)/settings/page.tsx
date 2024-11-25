import { MoveRight } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

const Settings = () => {

  const linksData = [
    {
      id: 1,
      title: 'Update Exchange Rate',
      link: '/settings/exchange-rate'
    },
    {
      id: 2,
      title: 'Update Admin Bank Acount',
      link: '/settings/admin-account'
    },
  ]

  return (
    <>
      <div className="bg-gray-100 h-full py-[48px] px-[20px]">
        <div className="flex flex-col gap-[28px]">
          <div className="flex flex-col gap-1 font-figtree text-secondary">
            <h2 className="font-semibold text-2xl ">Settings</h2>
            <p className="text-secondary">Manage settings of the platform</p>
          </div>

          <div className="flex flex-col gap-4">
            {linksData?.map((link, index) => (
              <div key={link.id} className="flex gap-1 items-center">
                <span>{index + 1}.</span>
                <Link href={link.link} className='text-[20px]'>{link.title}</Link>
                <MoveRight color='#039' />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Settings;
