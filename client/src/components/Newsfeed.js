import React, { Component, useState } from 'react';
import './Newsfeed.css';
import { Col, Card, Row } from 'antd';
import Meta from 'antd/lib/card/Meta';

function Newsfeed (){

    const [Products, setProducts] = useState([])

    const renderCards = () => {

        console.log('!!')

        return <Col lg={6} md={8} xs={24}>
                <Card
                    hoverable
                    style={{ width: 240 }}
                    cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
                >
                <Meta 
                    title={"민초조아"}
                    description={`민초조아요`}
                />
            </Card>
        </Col>

    }

    return (
        <div>
            나는 뉴스피드
            <Row>
                {renderCards}
            </Row>
        </div>
    );

}

export default Newsfeed;