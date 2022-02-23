export interface Portfolio {
  code: string;
  division: {
    code: string;
    title: string;
  };
  parentCode?: string;
  type: string;
  creationDate: Date;
  manager?: Omit<PortfolioManager, 'primary'>;
}

export interface PortfolioManager {
  username: string;
  fullName: string;
  primary: boolean;
}
