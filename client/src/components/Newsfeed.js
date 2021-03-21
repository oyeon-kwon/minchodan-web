import React, { useState } from 'react';
import './Newsfeed.css';
import { Col, Card, Row } from 'antd';
import Meta from 'antd/lib/card/Meta';
import FeedThumbnail from './FeedThumbnail';

function Newsfeed () {

    const [Products, setProducts] = useState([])

    const renderCards = (item) => {

        // return <Col lg={6} md={8} xs={24}>
        //         <Card
        //             hoverable
        //             style={{ width: 240 }}
        //             cover={<img src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
        //         />
        // </Col>

        // !

        // return <div className="card">
        //     <a href={`/product/${product._id}`}>
        //         <img className="feedpost_thumbnail" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"></img>
        //     </a>
        // </div>
    }

    const handleClick = (item) => {
    }

    return (
        <div className="page_body">
            <div className="page_title">News feed</div>
            {/* <Row> */}
                {/* {renderCards()} */}
                <FeedThumbnail />
            {/* </Row> */}
        </div>
    );

}

export default Newsfeed;