import { ApiError, Page, PaginationParams, Portfolio } from 'common/types';

export interface PortfolioSearchPayload extends PaginationParams {
  searchKeyword: string;
}

const stopFor = async (time: number) => {
  await new Promise<void>(res => {
    setTimeout(() => res(), time);
  });
};

const PORTFOLIOS_DATA: Portfolio[] = Array(50)
  .fill(undefined)
  .map((_, i) => ({
    code: `CR1-35${i}`,
    division: {
      code: 'casa-med-v',
      title: 'CASA MED V',
    },
    parentCode: Math.random() > 0.5 ? 'CR1-350-Parent' : undefined,
    type: 'chargé de relation',
    creationDate: new Date(),
    manager: {
      username: 'benrkia',
      fullName: Math.random() > 0.5 ? 'ilyasse benrkia' : undefined,
    },
  }));

const searchPortfolios = async ({
  pageSize = 6,
  pageNumber = 1,
}: PortfolioSearchPayload): Promise<Page<Portfolio[], 'portfolios'>> => {
  await stopFor(1500);

  const error: ApiError = { messageList: [{ code: 'technical.error' }] };

  if (Math.random() > 0.5) {
    throw error;
  }

  const offset = (pageNumber - 1) * pageSize;

  return {
    portfolios: PORTFOLIOS_DATA.slice(offset, offset + pageSize),
    pageNumber: pageNumber,
    pages: Math.ceil(PORTFOLIOS_DATA.length / pageSize),
  };
};

const portfolioService = { searchPortfolios };

export default portfolioService;
