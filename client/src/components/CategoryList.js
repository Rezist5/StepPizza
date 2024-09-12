import React from 'react';
import { Link } from 'react-router-dom';

const CategoryList = ({ categories }) => {
    return (
        <div>
            <h2>Product Categories</h2>
            <ul>
                {categories.map((category) => (
                    <li key={category.id}>
                        <Link to={`/category/${category.id}`}>
                            {category.name}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CategoryList;
