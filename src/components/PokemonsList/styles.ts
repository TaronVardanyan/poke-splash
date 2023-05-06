import styled from 'styled-components';
import wallpaperSrc from '../../assets/images/main-wallpaper.jpg';
import { Row } from 'antd';

export const MainPageWrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  background-image: url(${wallpaperSrc});
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
  padding: 5rem 0;
`;

export const RowWrapper = styled(Row)`
  width: 100%;
  padding: 0 64px;
`;

export const HeaderRowWrapper = styled(Row)`
  width: 100%;
  margin-bottom: 20px !important;
  padding: 0 64px;
`;
