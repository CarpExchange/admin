// hooks/useFetchBanners.ts

import { useQuery } from '@tanstack/react-query';
import { fetchBannersFn } from '@/api/banners';
import { useContext, useMemo } from 'react';
import { AuthContext } from '@/components/AuthProvider';

interface UseFetchBannersOptions {
    from: Date | string;
    to: Date | string;
    enabled?: boolean;
    
}

export function useFetchBanners({ from, to, enabled = true }: UseFetchBannersOptions) {
    const {
        state: { user_info },
    } = useContext(AuthContext);

    const id = user_info?.uid;

    const queryResult = useQuery({
        queryKey: ['banners', id, from, to],
        queryFn: () =>
            fetchBannersFn({
                id,
                from: typeof from === 'string' ? from : from.toISOString(),
                to: typeof to === 'string' ? to : to.toISOString(),
            }),
        enabled: !!id && enabled,
        // onSuccess: (data) => {
        //     console.log("Fetched banners data:", data);
        // },
    });

    // Memoize the banners data for efficient usage
    const banners = useMemo(() => {
        // You can transform or filter data here if needed
        return queryResult?.data ?? [];
    }, [queryResult?.data]);
    // console.log(banners?.data);

    return {
        ...queryResult,
        banners,
    };
}
