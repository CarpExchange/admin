import useFetchCustomersQuery from "@/hooks/queries/useFetchCustomers";
import { UserCheck2, UserCircle2, UserX2 } from "lucide-react";

const CustomersCount = () => {
  const { data, isLoading } = useFetchCustomersQuery();

  const customers = data?.allCustomers || [];
  const totalCustomers = customers.length;

  const verifiedCustomers = customers.filter(
    (customer: { bvn_is_verified: boolean; nin_is_verified: boolean }) =>
      customer.bvn_is_verified || customer.nin_is_verified
  ).length;

  const unverifiedCustomers = totalCustomers - verifiedCustomers;

  const StatCard = ({
    title,
    value,
    icon,
    accent,
  }: {
    title: string;
    value: number;
    icon: React.ReactNode;
    accent: string;
  }) => (
    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-200">
      <div className="flex justify-between items-start mb-4">
        <p className="text-xs uppercase tracking-wider text-gray-500">
          {title}
        </p>

        <div
          className={`h-10 w-10 flex items-center justify-center rounded-lg ${accent}`}
        >
          {icon}
        </div>
      </div>

      {isLoading ? (
        <div className="h-8 w-20 bg-gray-200 animate-pulse rounded-md" />
      ) : (
        <h2 className="text-3xl font-bold text-gray-900">
          {value.toLocaleString()}
        </h2>
      )}
    </div>
  );

  return (
    <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <StatCard
        title="Total Customers"
        value={totalCustomers}
        accent="bg-blue-50 text-blue-600"
        icon={<UserCircle2 size={20} />}
      />

      <StatCard
        title="Verified Customers"
        value={verifiedCustomers}
        accent="bg-green-50 text-green-600"
        icon={<UserCheck2 size={20} />}
      />

      <StatCard
        title="Unverified Customers"
        value={unverifiedCustomers}
        accent="bg-red-50 text-red-600"
        icon={<UserX2 size={20} />}
      />
    </section>
  );
};

export default CustomersCount;