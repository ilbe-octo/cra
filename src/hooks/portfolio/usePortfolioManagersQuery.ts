import { useQuery } from 'react-query';
import portfolioService from 'services/portfolio';
import { ApiError, PortfolioManager } from 'common/types';
import { portfolioManagersKey } from './keys';

const usePortfolioManagersQuery = (portfolioCode: string) => {
  const { isLoading, error, data } = useQuery<PortfolioManager[], ApiError>(
    portfolioManagersKey(portfolioCode),
    () => {
      return portfolioService.getPortfolioManagers(portfolioCode);
    }
  );

  return {
    isLoading,
    error,
    data,
  };
};

export default usePortfolioManagersQuery;
