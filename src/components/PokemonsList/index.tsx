import { MainPageWrapper, RowWrapper, HeaderRowWrapper } from './styles';
import { Card, Col, Pagination, Input, message, Skeleton } from 'antd';
import type { PaginationProps } from 'antd';
import useRequest from '@ahooksjs/use-request';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const { Meta } = Card;
const { Search } = Input;

type PokeType = {
  name: string;
  url: string;
};

const PokemonsList = () => {
  const navigate = useNavigate();
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(10);

  const {
    run: runGetPokes,
    data,
    loading: getPokesLoading
  } = useRequest(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`);

  const {
    run: runSearchPokemon,
    loading: searchLoading,
    data: searchData
  } = useRequest((pokeName) => `https://pokeapi.co/api/v2/pokemon/${pokeName}`, {
    manual: true,
    onError: () => {
      message.error('Cannot find that pokemon');
    }
  });

  useEffect(() => {
    runGetPokes();
  }, [offset, limit]);

  useEffect(() => console.log(searchData, 4444), [searchData]);

  const onShowSizeChange: PaginationProps['onShowSizeChange'] = (
    current: number,
    pageSize: number
  ) => {
    setLimit(pageSize);
  };

  const handlePageChange = (pageNumber: number) => {
    setOffset((pageNumber - 1) * 10);
  };

  const onSearch = (value: string) => {
    runSearchPokemon(value);
  };

  const handleClick = (pokeName: string) => {
    navigate(`/poke-splash/${pokeName}`);
  };

  return (
    <MainPageWrapper>
      {data && (
        <HeaderRowWrapper justify="space-between">
          {!searchData?.species?.name && (
            <Col xs={24} sm={24} md={14} lg={14} xl={14} xxl={14}>
              <Pagination
                responsive={true}
                showSizeChanger
                onChange={handlePageChange}
                onShowSizeChange={onShowSizeChange}
                defaultCurrent={offset + 1}
                total={data.count}
              />
            </Col>
          )}
          <Col xs={24} sm={24} md={8} lg={8} xl={8} xxl={8}>
            <Search
              placeholder="input search text"
              allowClear
              enterButton="Search"
              size="large"
              loading={searchLoading}
              onSearch={onSearch}
            />
          </Col>
        </HeaderRowWrapper>
      )}
      <RowWrapper gutter={[16, 16]} justify="space-between">
        {searchData?.species?.name ? (
          <Col xs={24} sm={24} md={8} lg={12} xl={12} xxl={12}>
            <Card
              onClick={() => handleClick(searchData.species.name)}
              hoverable
              cover={
                <img
                  alt="example"
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${searchData.id}.png`}
                />
              }>
              <Meta title={searchData?.species?.name} />
            </Card>
          </Col>
        ) : getPokesLoading ? (
          Array.from({ length: 10 }, (_, index) => index).map((_, index) => (
            <Col key={index} xs={24} sm={24} md={8} lg={8} xl={8} xxl={8}>
              <Skeleton loading={true} avatar active />
            </Col>
          ))
        ) : (
          data?.results.map((pokeCard: PokeType, index: number) => (
            <Col key={pokeCard.name} xs={24} sm={24} md={8} lg={8} xl={8} xxl={8}>
              <Card
                onClick={() => handleClick(pokeCard.name)}
                hoverable
                cover={
                  <img
                    alt="example"
                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
                      offset + index + 1
                    }.png`}
                  />
                }>
                <Meta title={pokeCard.name} />
              </Card>
            </Col>
          ))
        )}
      </RowWrapper>
    </MainPageWrapper>
  );
};

export default PokemonsList;
