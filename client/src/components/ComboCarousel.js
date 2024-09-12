import React from 'react';
import { Carousel } from 'react-bootstrap';

const ComboCarousel = ({ combos }) => {
    return (
        <Carousel>
            {combos.map((combo) => (
                <Carousel.Item key={combo.id}>
                    <img
                        className="d-block w-100"
                        src={combo.imageUrl} 
                        alt={combo.name}
                    />
                    <Carousel.Caption>
                        <h3>{combo.name}</h3>
                        <p>{combo.description}</p>
                    </Carousel.Caption>
                </Carousel.Item>
            ))}
        </Carousel>
    );
};

export default ComboCarousel;
