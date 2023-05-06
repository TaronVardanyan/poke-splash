import { DetailsPageWrapper, RowWrapper, PokemonImg, DetailsCol } from './styles';
import { Col, message, Spin, Typography } from 'antd';
import useRequest from '@ahooksjs/use-request';
import { useParams } from 'react-router-dom';

const { Text } = Typography;

const PokemonDetails = () => {
  const { name } = useParams();

  const { loading: searchLoading, data: searchData } = useRequest(
    `https://pokeapi.co/api/v2/pokemon/${name}`,
    {
      onError: () => {
        message.error('Cannot find that pokemon');
      }
    }
  );

  return (
    <DetailsPageWrapper>
      {searchLoading ? (
        <Spin size="large" />
      ) : (
        <RowWrapper>
          <Col xs={24} sm={24} md={8} lg={8} xl={8} xxl={8}>
            <PokemonImg
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${searchData.id}.png`}
              alt={name}
            />
          </Col>
          <DetailsCol xs={24} sm={24} md={16} lg={16} xl={16} xxl={16}>
            <Text>
              height: <strong>{searchData.height}</strong>
            </Text>
            <Text>
              weight: <strong>{searchData.weight}</strong>
            </Text>
            <Text>
              abilities:{' '}
              <strong>
                {searchData.abilities.map((ab: any, index: number) => (
                  <span key={index}>{ab.ability.name}, </span>
                ))}
              </strong>
            </Text>
          </DetailsCol>
        </RowWrapper>
      )}
    </DetailsPageWrapper>
  );
};

export default PokemonDetails;
