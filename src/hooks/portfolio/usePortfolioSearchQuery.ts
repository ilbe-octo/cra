import { useState } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import portfolioService from 'services/portfolio';
import { ApiError, Page, Portfolio } from 'common/types';
import { portfolioCacheKey } from './utils';

type PortfoliosPage = Page<Portfolio[], 'portfolios'>;

interface UsePortfolioSearchQuery {
  searchKeyword?: string;
  onSuccess?(data: PortfoliosPage, keyword: string): void;
}

const PAGE_SIZE = 9;
const DEFAULT_PAGE = 1;

const usePortfolioSearchQuery = ({
  searchKeyword,
  onSuccess,
}: UsePortfolioSearchQuery = {}) => {
  const client = useQueryClient();
  const [page, setPage] = useState(DEFAULT_PAGE);
  const [keyword, setKeyword] = useState(searchKeyword || '');

  const _getCacheKey = () =>
    !keyword ? undefined : portfolioCacheKey([page, PAGE_SIZE, keyword]);

  const _searchPortfolios = () =>
    portfolioService.searchPortfolios({
      pageSize: PAGE_SIZE,
      pageNumber: page,
      searchKeyword: keyword,
    });

  const { isLoading, data, error } = useQuery<PortfoliosPage, ApiError>({
    enabled: !!keyword,
    keepPreviousData: true,
    queryKey: _getCacheKey(),
    queryFn: _searchPortfolios,
    onSuccess: onSuccess && (data => onSuccess(data, keyword)),
  });

  const fetch = (k: string) => {
    client.invalidateQueries(_getCacheKey());
    setKeyword(k);
  };

  const fetchPage = (p: number) => setPage(p);

  return { isLoading, data, error, page, fetch, fetchPage };
};

export default usePortfolioSearchQuery;
