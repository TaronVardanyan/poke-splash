import { MainPageWrapper, RowWrapper, HeaderRowWrapper } from './styles';
import { Card, Col, Pagination, Input, message, Skeleton, Button } from 'antd';
import type { PaginationProps } from 'antd';
import useRequest from '@ahooksjs/use-request';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { InitialState } from '../../redux/reducer';

const { Meta } = Card;
const { Search } = Input;

type PokeType = {
  name: string;
  url: string;
};

interface Props {
  state: InitialState;
  dispatch: any;
}

const PokemonsList = ({ state, dispatch }: Props) => {
  const { offset, limit, searchedName } = state;
  const [isListVisible, setListVisibilityState] = useState(true);
  const navigate = useNavigate();

  console.log(state, 3333);

  const {
    run: runGetPokes,
    data,
    loading: getPokesLoading
  } = useRequest(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`, {
    manual: true,
    onSuccess: () => {
      searchedName && dispatch({ type: 'SET_SEARCH_VALUE', payload: '' });
    },
    onError: () => {
      message.error('Cannot load pokemons');
    }
  });

  const {
    run: runSearchPokemon,
    loading: searchLoading,
    data: searchData
  } = useRequest((pokeName) => `https://pokeapi.co/api/v2/pokemon/${pokeName}`, {
    manual: true,
    onError: () => {
      message.error('Cannot find that pokemon');
      dispatch({ type: 'SET_SEARCH_VALUE', payload: '' });
    },
    onSuccess: () => {
      setListVisibilityState(false);
    }
  });

  useEffect(() => {
    if (searchedName) {
      runSearchPokemon(searchedName);
    } else {
      runGetPokes();
    }
  }, [offset, limit]);

  const onShowSizeChange: PaginationProps['onShowSizeChange'] = (
    current: number,
    pageSize: number
  ) => {
    dispatch({ type: 'SET_PAGE_LIMIT', payload: pageSize });
  };

  const handlePageChange = (pageNumber: number) => {
    const page = (pageNumber - 1) * 10;
    dispatch({ type: 'SET_PAGE_OFFSET', payload: page });
  };

  const onSearch = (value: string) => {
    runSearchPokemon(value);
    dispatch({ type: 'SET_SEARCH_VALUE', payload: value });
  };

  const handleClick = (pokeName: string) => {
    navigate(`/poke-splash/${pokeName}`);
  };

  const handleCallList = () => {
    setListVisibilityState(true);
    searchedName && dispatch({ type: 'SET_SEARCH_VALUE', payload: '' });
  };

  return (
    <MainPageWrapper>
      {(data || searchData) && (
        <HeaderRowWrapper justify="space-between">
          {(isListVisible || (!searchData?.species?.name && data)) && (
            <Col xs={24} sm={24} md={14} lg={14} xl={14} xxl={14}>
              <Pagination
                responsive={true}
                showSizeChanger
                onChange={handlePageChange}
                onShowSizeChange={onShowSizeChange}
                defaultCurrent={offset / 10 + 1}
                total={data?.count}
              />
            </Col>
          )}
          <Col xs={24} sm={24} md={8} lg={8} xl={8} xxl={8}>
            <Search
              placeholder="input search text"
              allowClear={false}
              enterButton="Search"
              size="large"
              loading={searchLoading}
              onSearch={onSearch}
              defaultValue={searchedName ?? ''}
            />
          </Col>
          {searchedName && (
            <Col xs={24} sm={24} md={8} lg={8} xl={8} xxl={8}>
              <Button onClick={handleCallList}>Back to List</Button>
            </Col>
          )}
        </HeaderRowWrapper>
      )}
      <RowWrapper gutter={[16, 16]} justify="space-between">
        {!isListVisible && searchData?.species?.name ? (
          <Col xs={24} sm={24} md={8} lg={12} xl={12} xxl={12}>
            <Card
              onClick={() => handleClick(searchData.species.name)}
              hoverable
              cover={
                <img
                  alt={searchData.species.name}
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
                    alt={pokeCard.name}
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

function mapStateToProps(state: InitialState) {
  return {
    state
  };
}

export default connect(mapStateToProps)(PokemonsList);
