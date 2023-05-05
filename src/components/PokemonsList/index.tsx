import { MainPageWrapper, RowWrapper } from './styles';
import { Card, Col } from 'antd';

const { Meta } = Card;

const PokemonsList = () => {
  return (
    <MainPageWrapper>
      <RowWrapper gutter={[16, 16]} justify="space-between">
        <Col xs={24} sm={24} md={8} lg={8} xl={8} xxl={8}>
          <Card
            hoverable
            cover={
              <img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />
            }>
            <Meta title="Europe Street beat" description="www.instagram.com" />
          </Card>
        </Col>
        <Col xs={24} sm={24} md={8} lg={8} xl={8} xxl={8}>
          <Card
            hoverable
            cover={
              <img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />
            }>
            <Meta title="Europe Street beat" description="www.instagram.com" />
          </Card>
        </Col>
        <Col xs={24} sm={24} md={8} lg={8} xl={8} xxl={8}>
          <Card
            hoverable
            cover={
              <img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />
            }>
            <Meta title="Europe Street beat" description="www.instagram.com" />
          </Card>
        </Col>

        <Col xs={24} sm={24} md={8} lg={8} xl={8} xxl={8}>
          <Card
            hoverable
            cover={
              <img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />
            }>
            <Meta title="Europe Street beat" description="www.instagram.com" />
          </Card>
        </Col>
        <Col xs={24} sm={24} md={8} lg={8} xl={8} xxl={8}>
          <Card
            hoverable
            cover={
              <img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />
            }>
            <Meta title="Europe Street beat" description="www.instagram.com" />
          </Card>
        </Col>
        <Col xs={24} sm={24} md={8} lg={8} xl={8} xxl={8}>
          <Card
            hoverable
            cover={
              <img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />
            }>
            <Meta title="Europe Street beat" description="www.instagram.com" />
          </Card>
        </Col>
      </RowWrapper>
    </MainPageWrapper>
  );
};

export default PokemonsList;
