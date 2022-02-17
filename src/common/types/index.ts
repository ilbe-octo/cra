export * from './portfolio';

type NonEmptyString<T extends string> = T extends '' ? never : T;

export type Page<T, PropertyName extends string = 'data'> = {
  pageNumber: number;
  pages: number;
} & Record<NonEmptyString<PropertyName>, T>;

export interface PaginationParams {
  pageSize?: number;
  pageNumber?: number;
}

interface ErrorMessage {
  readonly code: string;
  readonly fieldName?: string;
  readonly message?: string;
}

export interface ApiError {
  messageList: ErrorMessage[];
}
