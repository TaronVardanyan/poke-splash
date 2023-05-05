import styled from 'styled-components';
import wallpaperSrc from '../../assets/images/main-wallpaper.jpg';
import { Row } from 'antd';

export const MainPageWrapper = styled.div`
  width: 100%;
  height: auto;
  background-image: url(${wallpaperSrc});
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5rem 0;
`;

export const RowWrapper = styled(Row)`
  margin: 0 64px !important;
`;
