import axios, { CanceledError } from 'axios';
import { useCallback, useEffect, useRef, useState } from 'react';
import { x } from 'vitest/dist/global-fe52f84b';
import { Article } from '../model/article.types';
import { Product } from '../model/products.types';
import { getArticleUrl } from '../urls/articles.urls';
import { getProductsUrl } from '../urls/products.urls';

export const useFetchProducts = (
  options: RequestInit | undefined = {},
  retries = 3,
  retryDelay = 1000
) => {
  const [data, setData] = useState([]);
  const [articlesData, setArticlesData] = useState<{ [key: string]: Article }>(
    {}
  );
  const [error, setError] = useState(null);

  const retryCounter = useRef(0);
  const retryTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [reFetch, setReFetch] = useState(false);
  const reFetchCallback = useCallback(() => {
    setReFetch((prev) => !prev);
  }, []);

  const [loading, setLoading] = useState(false);
  const abortCondition = useRef(new AbortController());
  useEffect(() => {
    abortCondition.current = new AbortController();

    setLoading(true);
    axios
      .get(getProductsUrl, { signal: abortCondition.current?.signal })
      .then((res) => {
        const response = res.data;
        setData(response);
        setError(null);

        const fetchArticles = response?.map((product: Product) => {
          return axios
            .all(
              product?.articles.map((article: Article) => {
                return axios.get(getArticleUrl(article.id));
              })
            )
            .catch((err) => {
              throw new Error(err.statusText);
            })
            .finally(() => {
              setLoading(false);
            });
        });

        //TODO: change any s to proper types
        fetchArticles.forEach((result: any) => {
          return result
            .then((...res: any) => {
              return res.map((items: any) => {
                return items.map((item: any) => {
                  const data = item.data;
                  const articleId = data.id;
                  const amountInStock = data.amountInStock;
                  const dataSet = {
                    amountInStock,
                    name: data.name,
                  };
                  setArticlesData((prev) => ({
                    ...prev,
                    [articleId]: dataSet,
                  }));
                });
              });
            })
            .catch((err: any) => {
              throw new Error(err.statusText);
            });
        });
      })
      .catch((error) => {
        if (!(error instanceof CanceledError)) {
          if (retryCounter.current <= retries) {
            retryTimer.current = setTimeout(() => {
              reFetchCallback();
            }, retryDelay);
          } else {
            setError(error);
            setLoading(false);
            retryTimer.current && clearTimeout(retryTimer.current);
          }
          retryCounter.current++;
        }
      });

    return () => {
      abortCondition.current.abort();
    };
  }, [reFetch]);

  return {
    data,
    loading,
    error,
    refetch: reFetchCallback,
    articlesData,
  };
};
