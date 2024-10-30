import React from 'react';
import { Carousel } from 'antd';

const contentStyle: React.CSSProperties = {
    height: '160px',
    color: 'black',
    lineHeight: '160px',
    textAlign: 'center',
    background: 'white',
};

const CarouselTest: React.FC = () => (
    <Carousel autoplay autoplaySpeed={1000}>
        <div>
            <h3 style={contentStyle}>hhhhhhhhhhhhhhhhhhhh</h3>
            <h1>Hello</h1>
        </div>
        <div>
            <h3 style={contentStyle}>hhhhhhhhhhhhhhhhhhhh</h3>
            <h1>Hello</h1>
        </div>
        <div>
            <h3 style={contentStyle}>hhhhhhhhhhhhhhhhhhhh</h3>
            <h1>Hello</h1>
        </div>
        <div>
            <h3 style={contentStyle}>4</h3>
            <h1>Hello</h1>

        </div>
    </Carousel>
);

export default CarouselTest;