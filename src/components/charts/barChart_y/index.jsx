// components/BarCard.jsx
import React from 'react';
import {
    Container,
    Card,
    Label,
    BarWrapper,
    Value,
    Bar,
} from './styles';

const BarChart_y = ({data , barHeight}) => {

    return (
        <Container>
            {data.slice(0, 14).map((item, index) => {
                // Altura proporcional baseada no minStock
                const percentage = item.stock / item.minStock;
                const maxBarHeight = 85;
                const barHeight = item.stock === 0 ? 8 : Math.min(percentage * maxBarHeight, maxBarHeight);

                return (
                    <Card key={index}>
                        <Label>{item.name}</Label>
                        <BarWrapper>
                            <Value>{item.stock}</Value>
                            <Bar>
                                <div 
                                    style={{
                                        height: `${barHeight}px`,
                                        backgroundColor: item.stock <= 0 ? 'red' : 'rgb(255, 157, 0)',
                                        borderRadius: '4px',
                                        transition: 'height 0.3s ease',
                                    }}
                                ></div>
                            </Bar>
                        </BarWrapper>
                    </Card>
                    );
                })}
    </Container>
    );
};

export default BarChart_y;
