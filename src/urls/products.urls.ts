import { baseEndpointUrl } from './index';

export const getProductsUrl = `${baseEndpointUrl}/products`;
export const getProductUrl = (productId: string) =>
  `${baseEndpointUrl}/products/${productId}`;
