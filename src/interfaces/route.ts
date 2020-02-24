type Method = 'GET'| 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export interface Route {
  path: string;
  controller: string;
  actions: { [K in Method]?: string; };
}
