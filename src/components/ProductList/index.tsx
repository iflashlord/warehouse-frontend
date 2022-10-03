import axios from 'axios';
import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import {
  ARTICLES_TEXT,
  GENERAL_ERROR_TEXT,
  LOADING_TEXT,
  NO_RESULTS_TEXT,
  NOT_AVAILABLE_TEXT,
  NOT_ENOUGH_STOCK_TEXT,
  OKAY_TEXT,
  REFRESH_ARIA_TEXT,
  REFRESH_TEXT,
  SALE_REGISTERED_SUCCESSFULLY_TEXT,
  TOTAL_REQUIRED_TEXT,
} from '../../constant/texts';
import { useFetchProducts } from '../../hooks/useFetchProducts';
import { Article } from '../../model/article.types';
import { Product } from '../../model/products.types';
import { AddSaleData } from '../../model/sale.types';
import { addSaleUrl } from '../../urls/sale.url';

const Wrapper = styled.div``;
const Loading = styled.div`
  position: fixed;
  top: 4rem;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  color: #000;
  padding: 1rem;
  border-radius: 0.5rem;
  box-shadow: 0 0 0.5rem 0.5rem rgba(0, 0, 0, 0.2);
  z-index: 100;
  cursor: wait;
`;
const Error = styled.div`
  color: red;
`;

const CardWrapper = styled.div`
  transition: all 0.3s ease-out;
  &:hover,
  &:active {
    transform: translateY(-2px);
  }
`;
const Card = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin: 1rem 1rem -0.5rem 1rem;
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  width: 30rem;
  max-width: 90%;
  text-align: center;
  background-color: white;
  color: black;
  cursor: pointer;
`;
const Title = styled.h3`
  flex: 1;
`;
const ArticlesCount = styled.div`
  flex: 0.5;
`;
const TotalRequired = styled.div`
  flex: 1;
`;

const RefreshButton = styled.button`
  margin: 1rem;
  position: fixed;
  bottom: 1rem;
  left: 1rem;
`;

const SubCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  margin: 0 1rem 1rem;
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 0 0 5px 5px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  max-width: 90%;
  text-align: center;
  background-color: #cbcbcb;
  color: black;
  cursor: pointer;
`;

const ArticleList = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  list-style: none;
  width: 90%;
`;
const ArticleItem = styled.li`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 90%;

  &:nth-child(odd) {
    background-color: #dcdcdc;
  }
  padding: 0.5rem;
  text-align: left;
`;

const Name = styled.div`
  flex: 1;
`;
const Required = styled.div`
  flex: 1;
`;
const Stock = styled.div`
  flex: 1;
`;

const Okay = styled.i`
  font-weight: bold;
  color: green;
  flex: 1;
`;
const NotEnough = styled.i`
  font-weight: bold;
  color: red;
  flex: 1;
`;

const SaleButton = styled.button`
  align-self: flex-end;
`;

export default function ProductList() {
  const {
    data,
    loading: isLoading,
    error,
    refetch,
    articlesData,
  } = useFetchProducts();

  const [isPosting, setPosting] = useState(false);

  const handleRefresh = useCallback(() => {
    refetch();
  }, []);

  const hasProduct = data && data.length > 0;
  const countArticles = useCallback((articles: Article[]) => {
    return articles.reduce((acc: number, article) => {
      return acc + (article.amountRequired || 0);
    }, 0);
  }, []);

  const allowToRegisterSale = useCallback(
    (articles: Article[], articlesData: { [p: string]: Article }) => {
      return articles.every((article) => {
        return (
          (articlesData[article.id]?.amountInStock || 0) >=
          (article.amountRequired || 0)
        );
      });
    },
    []
  );

  const registerSale = (productId: string, amountSold: number) => {
    const addSale: AddSaleData = {
      productId,
      amountSold,
    };
    const data = JSON.stringify(addSale);

    const config = {
      method: 'post',
      url: addSaleUrl,
      headers: {
        'Content-Type': 'application/json',
      },
      data,
    };

    setPosting(true);
    axios(config)
      .then(function () {
        alert(SALE_REGISTERED_SUCCESSFULLY_TEXT);
      })
      .catch(function () {
        alert(GENERAL_ERROR_TEXT);
      })
      .finally(() => {
        handleRefresh();
        setPosting(false);
      });
  };

  return (
    <Wrapper aria-live="polite" aria-busy={isLoading}>
      <RefreshButton
        aria-label={REFRESH_ARIA_TEXT}
        onClick={handleRefresh}
        disabled={isLoading}
      >
        {REFRESH_TEXT}
      </RefreshButton>
      {(isLoading || isPosting) && <Loading>{LOADING_TEXT}</Loading>}
      {error && <Error>{GENERAL_ERROR_TEXT}</Error>}
      {!isLoading && !hasProduct && <Error>{NO_RESULTS_TEXT}</Error>}
      {!isLoading &&
        hasProduct &&
        data?.map((product: Product) => (
          <CardWrapper key={product.id}>
            <Card>
              <Title>{product.name}</Title>
              <ArticlesCount aria-label={ARTICLES_TEXT}>
                {ARTICLES_TEXT} : {product.articles.length}
              </ArticlesCount>
              <TotalRequired>
                {TOTAL_REQUIRED_TEXT} : {countArticles(product.articles)}
              </TotalRequired>
            </Card>
            <SubCard>
              <ArticleList>
                <ArticleItem>
                  <Name>Name</Name>
                  <Required>Req</Required>
                  <Stock>Stock</Stock>
                  <Name>Status</Name>
                </ArticleItem>
                {product?.articles.map((article) => (
                  <ArticleItem key={`${article.id}`}>
                    <Name>
                      {articlesData[article.id]?.name || NOT_AVAILABLE_TEXT}
                    </Name>
                    <Required>{article?.amountRequired}</Required>
                    <Stock>
                      {articlesData[article.id]?.amountInStock || 0}
                    </Stock>
                    {(article?.amountRequired || 0) >
                    (articlesData[article.id]?.amountInStock || 0) ? (
                      <NotEnough
                        aria-label={NOT_ENOUGH_STOCK_TEXT}
                        onClick={handleRefresh}
                      >
                        X
                      </NotEnough>
                    ) : (
                      <Okay aria-label={OKAY_TEXT}>{OKAY_TEXT}</Okay>
                    )}
                  </ArticleItem>
                ))}
              </ArticleList>

              {allowToRegisterSale(product.articles, articlesData) ? (
                <SaleButton
                  onClick={() => registerSale(product.id, 1)}
                  disabled={isLoading || isPosting}
                >
                  Register Sale
                </SaleButton>
              ) : (
                <SaleButton disabled>Out of Stock</SaleButton>
              )}
            </SubCard>
          </CardWrapper>
        ))}
    </Wrapper>
  );
}
