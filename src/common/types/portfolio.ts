export interface Portfolio {
  code: string;
  division: {
    code: string;
    title: string;
  };
  parentCode?: string;
  type: string;
  creationDate: Date;
  manager: {
    username: string;
    fullName?: string;
  };
}
