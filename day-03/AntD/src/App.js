import './App.css';
import {Col, Input, Menu, Row} from 'antd'
import {SearchOutlined} from '@ant-design/icons'

const App = () => {
  return (
    <div className={'center'}>
      <Row>
        <Col>
          <h1>
            <a id="logo">
              <img src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg" alt=""/>
              Ant Design
            </a>
          </h1>
        </Col>
        <Col>
          <Input className={'pt18px'} prefix={<SearchOutlined/>} placeholder="搜索" bordered={false}/>
        </Col>
        <Col>
          <Menu mode={'horizontal'}>
            <Menu.Item>设计</Menu.Item>
            <Menu.Item>文档</Menu.Item>
            <Menu.Item>组件</Menu.Item>
            <Menu.Item>资源</Menu.Item>
            <Menu.Item>国内镜像</Menu.Item>
          </Menu>
        </Col>
      </Row>
      <div className={'biglogo'}><img width="500" height="87" alt="Ant Design"
                src="https://gw.alipayobjects.com/zos/antfincdn/6UYtAUYPXE/AntDesign.svg" className="home-banner-normal"/></div>

    </div>)
}

export default App;
