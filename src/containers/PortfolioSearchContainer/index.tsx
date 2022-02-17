import { useState, useEffect } from 'react';
import { useNavigate, createSearchParams } from 'react-router-dom';
import View from './view';
import { usePortfolioSearchQuery } from 'hooks/portfolio';

const PATHS = {
  portfolio: {
    to: (params?: URLSearchParams) => `/portfolio${params ? `?${params}` : ''}`,
  },
};

function PortfolioSearchContainer() {
  const navigate = useNavigate();
  const [errorCode, setErrorCode] = useState<string>();

  const { isLoading, error, fetch } = usePortfolioSearchQuery({
    onSuccess: (_, keyword) => {
      const searchParams = createSearchParams({ q: keyword });
      navigate(PATHS.portfolio.to(searchParams));
    },
  });

  const handleSubmit = (searchToken: string) => {
    fetch(searchToken);
  };

  useEffect(() => {
    if (error && error.messageList.length > 0) {
      setErrorCode(error.messageList[0].code);
    }
  }, [error]);

  return (
    <View
      loading={isLoading}
      errorCode={errorCode}
      onSubmit={handleSubmit}
      onErrorReset={() => setErrorCode(undefined)}
    />
  );
}

export default PortfolioSearchContainer;
