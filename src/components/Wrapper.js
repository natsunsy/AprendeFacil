import {Layout, Menu} from 'antd';
import * as React from "react";
import {Link} from "react-router-dom";
const { Header, Content, Footer } = Layout;

function Wrapper(props) {
  return (
    

    <Layout className="custom-layout">
      
      <Header>
        <Link to={"/"}>
          <h1 className="title">
            Aprende-Facil
          </h1>
        </Link>
      </Header>
      <div>
    <Menu theme="dark" mode="horizontal" defaultSelectedKeys={'1'}>
      <Menu.Item key="1">
        <Link to={"/"}>
        HOME
        </Link>
      </Menu.Item>
      <Menu.Item key="2">
        <Link to={"/IniciarSesion"}>
        Iniciar Sesión
        </Link>
      </Menu.Item>
      <Menu.Item key="3">
      <Link to={"/Registrarse"}>
        Registrarse
        </Link>
      </Menu.Item>
      <Menu.Item key="4">
        Recargar Dinero
      </Menu.Item>
      <Menu.Item key="5">
        Convertir Monedas
      </Menu.Item>
      <Menu.Item key="6">
        Ver Perfil
      </Menu.Item>
    </Menu></div>
      <Content style={{ padding: '0 50px', marginTop: '50px' }}>
        <div className="site-layout-content">
          {props.children}
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>Desarrollado por: Cesar, Rosa, Danilo, Gabriel.</Footer>
    </Layout>
  )
}

export default Wrapper