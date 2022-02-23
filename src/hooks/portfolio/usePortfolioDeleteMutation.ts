import { useMutation, useQueryClient } from 'react-query';
import portfolioService from 'services/portfolio';
import { ApiError } from 'common/types';
import {
  portfolioDetailsKey,
  portfolioSearchKey,
  portfolioManagersKey,
} from './keys';

const usePortfolioDeleteMutation = ({
  onSuccess,
}: { onSuccess?: () => void } = {}) => {
  const client = useQueryClient();

  const { isLoading, error, mutate } = useMutation<void, ApiError, string>(
    portfolioService.deletePortfolio,
    {
      onSuccess: (_, code) => {
        client.removeQueries(portfolioSearchKey());
        client.removeQueries(portfolioDetailsKey(code), { exact: true });
        client.removeQueries(portfolioManagersKey(code), { exact: true });
        onSuccess && onSuccess();
      },
    }
  );

  return { isLoading, error, deletePortfolio: mutate };
};

export default usePortfolioDeleteMutation;
