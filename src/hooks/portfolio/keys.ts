const MANAGERS = 'managers';
const PORTFOLIOS = 'portfolios';
const PORTFOLIOS_SEARCH = 'portfolios/search';

interface PortfolioSearchParams {
  keyword: string;
  pageSize: number;
  pageNumber: number;
}

export const portfolioSearchKey = (params?: PortfolioSearchParams) => {
  const searchKey: unknown[] = [PORTFOLIOS_SEARCH];
  if (!params) return searchKey;

  return searchKey.concat(params);
};

export const portfolioDetailsKey = (code: string) => {
  return [PORTFOLIOS, code];
};

export const portfolioManagersKey = (code: string) => {
  return [PORTFOLIOS, code, MANAGERS];
};
