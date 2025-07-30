declare module "axios" {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  export interface AxiosResponse<T> extends Promise<T> {}
}
