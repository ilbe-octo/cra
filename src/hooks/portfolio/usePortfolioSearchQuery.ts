import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import portfolioService from 'services/portfolio';
import { ApiError, Page, Portfolio } from 'common/types';
import { portfolioSearchKey } from './keys';

type PortfoliosPage = Page<Portfolio[], 'portfolios'>;

interface UsePortfolioSearchQuery {
  initialSearchKeyword?: string;
  onSuccess?(data: PortfoliosPage, keyword: string): void;
}

const PAGE_SIZE = 9;
const DEFAULT_PAGE = 1;

const usePortfolioSearchQuery = ({
  initialSearchKeyword,
  onSuccess: handleSuccess,
}: UsePortfolioSearchQuery = {}) => {
  const [page, setPage] = useState(DEFAULT_PAGE);
  const [keyword, setKeyword] = useState(initialSearchKeyword || '');

  const queryKey = !keyword
    ? undefined
    : portfolioSearchKey({
        pageNumber: page,
        pageSize: PAGE_SIZE,
        keyword,
      });

  const queryFn = () =>
    portfolioService.searchPortfolios({
      pageSize: PAGE_SIZE,
      pageNumber: page,
      searchKeyword: keyword,
    });

  const onSuccess = (data: PortfoliosPage) => {
    handleSuccess && handleSuccess(data, keyword);
  };

  const { isFetching, isLoading, error, data, refetch } = useQuery<
    PortfoliosPage,
    ApiError
  >({
    queryKey,
    enabled: !!keyword,
    keepPreviousData: true,
    queryFn,
    onSuccess,
  });

  const fetch = (searchKeyword: string) => setKeyword(searchKeyword);

  const fetchPage = (p: number) => setPage(p);

  useEffect(() => {
    if (keyword) {
      refetch();
    }
  }, [keyword]);

  return {
    page,
    data,
    error,
    isFetching,
    isLoading,
    fetch,
    fetchPage,
  };
};

export default usePortfolioSearchQuery;
