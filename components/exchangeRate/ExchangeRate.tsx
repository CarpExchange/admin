import React, { useContext } from 'react'
import { AuthContext } from '@/components/AuthProvider';
import { useExchangeRateData } from '@/hooks/queries/FetchExchangeRate';
import { useMarketData } from '@/hooks/queries/FetchMarketData';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/router';



const ExchangeRate = () => {


        const {
          state: { user_info },
        } = useContext(AuthContext);
        const id = user_info?.uid;
        const { exchangeRateData } = useExchangeRateData();
        const { marketData } = useMarketData('usdtngn');
        // const { toast } = useToast();
        // const router = useRouter();
      
        const usdtSellPrice = parseFloat(marketData?.ticker?.sell);
        const sellCharge = exchangeRateData?.sell_price?.current_sell_price;
        const depositRate = usdtSellPrice && sellCharge ? usdtSellPrice + sellCharge : null;
      
        const usdtBuyPrice = parseFloat(marketData?.ticker?.buy);
        const buyCharge = exchangeRateData?.buy_price?.current_buy_price;
        const withdrawalRate = usdtBuyPrice && buyCharge ? usdtBuyPrice - buyCharge : null;

      
  return (
    <div>
      <div className="space-y-4 text-[15px] font-medium text-gray-700 bg-gray-50 p-4 rounded-md border border-gray-200">
          <p>
            <span className="font-semibold text-gray-800">Deposit Rate:</span>{' '}
            1 USDT = ₦{depositRate ? depositRate.toLocaleString() : '...'}{' '}
            {/* <span className="text-sm font-normal">
              (Charge: ₦{sellCharge || '...'})
            </span> */}
          </p>
          <p>
            <span className="font-semibold text-gray-800">Withdrawal Rate:</span>{' '}
            1 USDT = ₦{withdrawalRate ? withdrawalRate.toLocaleString() : '...'}{' '}
            {/* <span className="text-sm font-normal">
              (Charge: ₦{buyCharge || '...'})
            </span> */}
          </p>
        </div>
    </div>
  )
}
export default ExchangeRate;
