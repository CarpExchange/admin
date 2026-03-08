import { MoveRight } from "lucide-react";
import Link from "next/link";
import React from "react";

const Settings = () => {
  const linksData = [
    {
      id: 1,
      title: "Update Exchange Rate",
      link: "/settings/exchange-rate",
      description: "Manage crypto exchange rates",
    },
    {
      id: 2,
      title: "Update Admin Bank Account",
      link: "/settings/admin-account",
      description: "Change the platform payout bank account",
    },
    {
      id: 3,
      title: "Update Processing Fee",
      link: "/settings/processing-fee",
      description: "Modify transaction processing charges",
    },{
      id: 4,
      title: "Update Airtime Rate",
      link: "/settings/airtime-rate",
      description: "Manage airtime purchase rates",
    },
    
    {
      id: 5,
      title: "Update Minimum Deposit",
      link: "/settings/minimum-deposit",
      description: "Set the minimum deposit amount",
    },
    {
      id: 6,
      title: "Update App Version",
      link: "/settings/app-version",
      description: "Update the current mobile app version",
    },
  ];

  return (
    <div className="h-full px-4 md:px-8 py-6 md:py-10">
      <div className="max-w-5xl mx-auto flex flex-col gap-8">
        
        {/* Header */}
        <div className="flex flex-col gap-1">
          <h2 className="text-2xl md:text-3xl font-semibold text-secondary">
            Settings
          </h2>
          <p className="text-sm md:text-base text-gray-500">
            Manage platform configuration and system settings
          </p>
        </div>

        {/* Settings Cards */}
        <div className="flex flex-col gap-4">
          {linksData.map((link) => (
            <Link
              key={link.id}
              href={link.link}
              className="group flex items-center justify-between p-4 md:p-5 bg-white border border-gray-200 rounded-xl hover:border-primary hover:shadow-sm transition"
            >
              <div className="flex flex-col">
                <p className="font-medium text-base md:text-lg text-secondary">
                  {link.title}
                </p>
                <p className="text-sm text-gray-500">
                  {link.description}
                </p>
              </div>

              <MoveRight
                className="text-gray-400 group-hover:text-primary transition"
                size={20}
              />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Settings;