import { useQuery } from 'react-query';
import portfolioService from 'services/portfolio';
import { ApiError, Portfolio } from 'common/types';
import { portfolioDetailsKey } from './keys';

const usePortfolioQuery = (portfolioCode: string) => {
  const { isLoading, error, data } = useQuery<Portfolio, ApiError>(
    portfolioDetailsKey(portfolioCode),
    () => {
      return portfolioService.getPortfolio(portfolioCode);
    }
  );

  return {
    isLoading,
    data,
    error,
  };
};

export default usePortfolioQuery;
