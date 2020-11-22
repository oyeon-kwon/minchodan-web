import React, { Component } from 'react';
import './Loading.css';
import handsup from '../handsup.png';

class Loading extends Component {
    constructor(props) {
        super(props);

      }

    render() {
        return (
            <div className="body">
                <div className="leftBox">
                    <div className="title">민초단 선서</div>
                    <div className="content">1. 신제품 알리기 (혼자 간직하기 없기)</div>
                    <div className="content">2. 솔직한 리뷰 달기 (광고 청정 구역)</div>
                    <div className="content">3. 나만의 레시피 공개하기 (똥손 구제 하자)</div>
                    <div className="content">4. 민초단을 위한 민트초코 함께 만들기 (민초 멸종 막기) </div>
                    <div className="content">5. 민초단임을 숨기지 않기 (나답게 살자) </div>
                    <div className="content">6. 민초단끼리 존중하기 (사랑하며 살자) </div>
                    <div className="content">7. 민초단으로 세상 구하기 (우리 멋지게 살자)</div>
                </div>
                <div className="rightBox">
                    <img src={handsup} onClick={this.props.start}/>
                </div>
                
            </div>
        );
    }
}

export default Loading;