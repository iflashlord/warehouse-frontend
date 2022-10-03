import { Article } from './article.types';

export type Product = {
  id: string;
  name: string;
  articles: Article[];
};
