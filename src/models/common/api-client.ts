export type MethodType = 'GET' | 'POST' | 'PUT' | 'DELETE';

export interface RequestData<T> {
  data?: T | T[];
  token?: string;
  headers?: { [key: string]: string };
  method?: MethodType;
  transform?: boolean;
}

export interface ServerData<T> {
  count: number;
  items: T[];
}

export interface SuccessResponse {
  success: true;
}

export type ServerResponse<T> = T & T[] & ServerData<T> & SuccessResponse;

export type RequestFields = string[];
export type RequestFilters = string[];

export interface IFieldsAndFilters {
  fields?: RequestFields;
  filters?: RequestFilters;
}

export class FieldsAndFilters implements IFieldsAndFilters {
  fields?: RequestFields = [];

  filters?: RequestFilters = [];
}
