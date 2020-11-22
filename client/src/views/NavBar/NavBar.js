import React, { useState } from 'react';
import { Drawer, Button } from 'antd';
import { MenuOutlined, ShopOutlined } from '@ant-design/icons';
import RightMenu from './Sections/RightMenu';
import './NavBar.css';

function NavBar() {
  const [visible, setVisible] = useState(false)

  const showDrawer = () => {
    setVisible(true)
  };

  const onClose = () => {
    setVisible(false)
  };

  return (
    <nav className="nav" style={{ position: 'fixed', zIndex: 5, width: '100%' }}>

            <div className="nav__left">
                <Button
                    className="nav__button"
                    type="text"
                    onClick={showDrawer}
                    
                    style={{ fontSize: "2rem", color: "#92C9B2" }}
                >
                    <MenuOutlined />
                </Button>
                <Drawer
                    placement="left"
                    className="menu_drawer"
                    width={400}
                    closable={false}
                    onClose={onClose}
                    visible={visible}
                >
                    <div className="menu__link"><a href="/">News feed</a></div>
                    <div className="menu__link"><a href="/review">Review</a></div>
                    <div className="menu__link"><a href="/board">Board</a></div>
                    <div className="menu__shoplink"><a href="http://www.minchodan.com/" className="a__shoplink"><ShopOutlined /> 민초 구매하러 가기</a></div>
                </Drawer>
            </div>
            <div className="nav__center">
                <a href="/" style={{ color: "#92C9B2" }}>Minchodan</a>
            </div>

            <div className="nav__right">
                <RightMenu mode="horizontal" />
            </div>

    </nav>
  )
}

export default NavBar