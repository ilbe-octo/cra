import { useState, useEffect } from 'react';
import { useNavigate, createSearchParams } from 'react-router-dom';
import { usePortfolioSearchQuery } from 'hooks/portfolio';
import { PATHS } from 'common/constants';
import View from './view';

function PortfolioSearchContainer() {
  const navigate = useNavigate();
  const [errorCode, setErrorCode] = useState<string>();

  const {
    isFetching,
    error: searchError,
    fetch,
  } = usePortfolioSearchQuery({
    onSuccess: (_, keyword) => {
      const searchParams = createSearchParams({ q: keyword });
      navigate(PATHS.portfolio.to(searchParams));
    },
  });

  const handleSubmit = (searchToken: string) => {
    fetch(searchToken);
  };

  useEffect(() => {
    if (searchError && searchError.messageList.length > 0) {
      setErrorCode(searchError.messageList[0].code);
    }
  }, [searchError]);

  return (
    <View
      loading={isFetching}
      errorCode={errorCode}
      onSubmit={handleSubmit}
      onErrorReset={() => setErrorCode(undefined)}
    />
  );
}

export default PortfolioSearchContainer;
