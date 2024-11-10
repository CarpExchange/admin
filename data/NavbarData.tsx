import { ArrowRightLeft, History, House, Settings, UsersRound } from "lucide-react";

export interface NavbarData {
  activeIcon?: string | JSX.Element;
  inactiveIcon: string | JSX.Element;
  route: string;
  linkName: string;
  exactRoute: string;
}

export const navbarData: NavbarData[] = [
  {
    activeIcon: <House color="#039" size={24} />,
    inactiveIcon: <House color="#000" size={24} />,
    linkName: 'Home',
    route: '/',
    exactRoute: '/'
  },
  {
    activeIcon: <UsersRound color="#039" size={24} />,
    inactiveIcon: <UsersRound color="#000" size={24} />,
    linkName: 'Customers',
    route: '/customers',
    exactRoute: 'customers'
  },
  {
    activeIcon: <ArrowRightLeft color="#039" size={24} />,
    inactiveIcon: <ArrowRightLeft color="#000" size={24} />,
    linkName: 'Fiat Deposits',
    route: '/fiat-deposits',
    exactRoute: 'fiat-deposits'
  },
  {
    activeIcon: <ArrowRightLeft color="#039" size={24} />,
    inactiveIcon: <ArrowRightLeft color="#000" size={24} />,
    linkName: 'Fiat Withdrawals',
    route: '/fiat-withdrawals',
    exactRoute: 'fiat-withdrawals'
  },
  {
    activeIcon: <History color="#039" size={24} />,
    inactiveIcon: <History color="#000" size={24} />,
    linkName: 'History',
    route: '/history',
    exactRoute: 'history'
  },
];

export const navbarDataTwo: NavbarData[] = [
  {
    activeIcon: <Settings color="#039" size={24} />,
    inactiveIcon: <Settings color="#000" size={24} />,
    linkName: 'Settings',
    route: '/settings',
    exactRoute: 'settings'
  },
]