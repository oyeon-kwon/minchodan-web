/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { withRouter } from 'react-router-dom';
import { InstagramOutlined, ShopOutlined , UserOutlined } from '@ant-design/icons';
import './RightMenu.css';

function RightMenu(props) {

    return (
    <div>
        <a href="https://www.instagram.com/minchodan_official/" className="icons"><InstagramOutlined style={{ fontSize: '2.3rem', color: '#92C9B2' }}/></a>
        <a href="http://www.minchodan.com/" className="icons"><ShopOutlined style={{ fontSize: '2.3rem', color: '#92C9B2' }} /></a>
        <a href="/login" className="icons"><UserOutlined style={{ fontSize: '2.3rem', color: '#92C9B2' }} /></a>
    </div>
    )

}

export default withRouter(RightMenu);

