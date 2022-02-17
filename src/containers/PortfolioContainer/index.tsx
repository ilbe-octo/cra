import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { usePortfolioSearchQuery } from 'hooks/portfolio';
import View from './view';

function PortfolioContainer() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [errorCode, setErrorCode] = useState<string>();

  const searchKeyword = searchParams.get('q') || '';

  const { error, data, page, fetchPage } = usePortfolioSearchQuery({
    searchKeyword,
  });

  useEffect(() => {
    if (error && error.messageList.length > 0) {
      setErrorCode(error.messageList[0].code);
    }
  }, [error]);

  useEffect(() => {
    if (!searchKeyword) {
      navigate('/search-portfolio', { replace: true });
    }
  }, [searchKeyword]);

  return (
    <View
      page={page}
      errorCode={errorCode}
      pages={data?.pages || 0}
      portfolios={data?.portfolios}
      onPageChange={fetchPage}
      onErrorReset={() => setErrorCode(undefined)}
    />
  );
}

export default PortfolioContainer;
