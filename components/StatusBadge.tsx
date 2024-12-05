import useHexToRGBA from '@/hooks/useHexToRGBA';
import React from 'react';

type Props = {
  statusType: 'verified' | 'unverified' | 'processing' | 'accepted' | 'rejected' ;
  radius?: string;
  width?: number;
};

const statusConfig = {
  verified: { color: '#07A559', status: 'Verified' },
  accepted: { color: '#07A559', status: 'Accepted' },
  'in-progress': { color: '#1A6EFF', status: 'In progress' },
  pending: { color: '#4C5259B2', status: 'Pending' },
  processing: { color: '#4C5259B2', status: 'Processing' },
  upcoming: { color: '#E58C33', status: 'Upcoming' },
  unverified: { color: '#EB5757', status: 'Unverified' },
  rejected: { color: '#EB5757', status: 'Rejected' },
};

const StatusBadge = ({ statusType, radius = 'md', width = 120 }: Props) => {
  const { color, status } =
    statusConfig[statusType] || statusConfig['verified'];

  return (
    <div
      className={`w-fit mx-auto flex items-center justify-center space-x-2 px-3 py-1 rounded-${radius}`}
      style={{ backgroundColor: useHexToRGBA(color, 0.1) }}
    >
      <div className="size-2 rounded-full" style={{ backgroundColor: color }} />
      <p className="font-medium" style={{ color: color }}>
        {status}
      </p>
    </div>
  );
};

export default StatusBadge;
 