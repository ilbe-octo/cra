import {
  Page,
  ApiError,
  Portfolio,
  PortfolioManager,
  PaginationParams,
} from 'common/types';

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
    manager:
      Math.random() > 0.5
        ? {
            username: 'benrkia',
            fullName: 'ilyasse benrkia',
          }
        : undefined,
  }));

export const PORTFOLIOS_MANAGERS_DATA = PORTFOLIOS_DATA.map(p => p.code).reduce<
  Record<string, PortfolioManager[]>
>((users, code) => {
  const size = 25;
  const primaryIndex = Math.floor(Math.random() * size);
  users[code] = Array(size)
    .fill(undefined)
    .map((_, i) => ({
      primary: i === primaryIndex,
      username: `${code}-username-${i}`,
      fullName: `firstName lastName ${i === primaryIndex ? '(primary)' : ''}`,
    }));
  return users;
}, {});

export interface PortfolioSearchPayload extends PaginationParams {
  searchKeyword: string;
}

const searchPortfolios = async ({
  pageSize = 6,
  pageNumber = 1,
}: PortfolioSearchPayload): Promise<Page<Portfolio[], 'portfolios'>> => {
  await stopFor(1500);

  const offset = (pageNumber - 1) * pageSize;

  return {
    portfolios: PORTFOLIOS_DATA.slice(offset, offset + pageSize),
    pageNumber: pageNumber,
    pages: Math.ceil(PORTFOLIOS_DATA.length / pageSize),
  };
};

const deletePortfolio = async (portfolioCode: string): Promise<void> => {
  await stopFor(1500);

  const index = PORTFOLIOS_DATA.findIndex(({ code }) => code === portfolioCode);

  const error: ApiError = {
    messageList: [
      {
        code: 'technical.error',
      },
    ],
  };

  if (index === -1) {
    throw error;
  }

  PORTFOLIOS_DATA.splice(index, 1);
  delete PORTFOLIOS_MANAGERS_DATA[portfolioCode];
};

const getPortfolio = async (portfolioCode: string): Promise<Portfolio> => {
  await stopFor(1500);

  const index = PORTFOLIOS_DATA.findIndex(({ code }) => code === portfolioCode);

  const error: ApiError = {
    messageList: [
      {
        code: 'technical.error',
      },
    ],
  };

  if (index === -1) {
    throw error;
  }

  return PORTFOLIOS_DATA[index];
};

const getPortfolioManagers = async (
  portfolioCode: string
): Promise<PortfolioManager[]> => {
  await stopFor(2000);

  const managers = PORTFOLIOS_MANAGERS_DATA[portfolioCode];

  const error: ApiError = {
    messageList: [
      {
        code: 'portfolio.notFound',
      },
    ],
  };

  if (!managers) {
    throw error;
  }

  return managers;
};

const portfolioService = {
  getPortfolio,
  deletePortfolio,
  searchPortfolios,
  getPortfolioManagers,
};

export default portfolioService;
