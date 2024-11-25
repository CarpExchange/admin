import authApi from "..";

export async function fetchExchangeRate() {
  try {
    const response = await authApi.get(
      '/markets/exchange-rate?buy_pair=usdtngn&sell_pair=ngnusdt'
    );
    return response.data.data;
  } catch (error: any) {
    throw error.message;
  }
}

export async function fetchAMarket(currency_pair: string) {
  try {
    const response = await authApi.get(
      `/markets/ticker?currency_pair=${currency_pair}`
    );
    return response.data.data.data;
  } catch (error: any) {
    console.log(error.response);
    throw error.message;
  }
}