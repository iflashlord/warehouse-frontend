import { baseEndpointUrl } from './index';

export const getArticlesUrl = `${baseEndpointUrl}/articles`;
export const getArticleUrl = (articleId: string) =>
  `${baseEndpointUrl}/articles/${articleId}`;
