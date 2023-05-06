import styled from 'styled-components';
import { Row, Col } from 'antd';

export const RowWrapper = styled(Row)`
  width: 100%;
  padding: 0 15px;
`;

export const DetailsPageWrapper = styled.div`
  height: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 50px 50px 0;
`;

export const PokemonImg = styled.img`
  width: 100%;
`;

export const DetailsCol = styled(Col)`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
`;
