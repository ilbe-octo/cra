import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  usePortfolioQuery,
  usePortfolioManagersQuery,
  usePortfolioDeleteMutation,
} from 'hooks/portfolio';
import { PATHS } from 'common/constants';
import View from './view';

function PortfolioDetailsContainer() {
  const navigate = useNavigate();
  const { portfolioCode = '' } = useParams();
  const [errorCodes, setErrorCodes] = useState<string[]>([]);

  const {
    isLoading: isLoadingPortfolio,
    error: portfolioError,
    data: portfolio,
  } = usePortfolioQuery(portfolioCode);

  const {
    isLoading: isLoadingManagers,
    error: managersError,
    data: managers,
  } = usePortfolioManagersQuery(portfolioCode);

  const {
    isLoading: isDeleting,
    error: deletionError,
    deletePortfolio,
  } = usePortfolioDeleteMutation({
    onSuccess: () => {
      navigate(PATHS.portfolioSearch.to);
    },
  });

  const handleErrorReset = (index: number) => {
    setErrorCodes(codes => [
      ...codes.slice(0, index),
      ...codes.slice(index + 1),
    ]);
  };

  useEffect(() => {
    const errorCodes: string[] = [];
    if (portfolioError) {
      portfolioError.messageList.forEach(({ code }) => errorCodes.push(code));
    }
    if (managersError) {
      managersError.messageList.forEach(({ code }) => errorCodes.push(code));
    }
    if (deletionError) {
      deletionError.messageList.forEach(({ code }) => errorCodes.push(code));
    }
    setErrorCodes(errorCodes);
  }, [portfolioError, managersError, deletionError]);

  return (
    <View
      errorCodes={errorCodes}
      managers={managers}
      portfolio={portfolio}
      isDeleting={isDeleting}
      isLoadingManagers={isLoadingManagers}
      isLoadingPortfolio={isLoadingPortfolio}
      onErrorReset={handleErrorReset}
      onPortfolioDelete={deletePortfolio}
    />
  );
}

export default PortfolioDetailsContainer;
