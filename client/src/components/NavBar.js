import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MAIN_ROUTE, CART_ROUTE, LOGIN_ROUTE } from '../utils/consts';
import { Context } from '../index';

const NavBar = () => {
    const { user } = useContext(Context);
    const navigate = useNavigate();

    const logOut = () => {
        user.setUser({});
        user.setIsAuth(false);
        localStorage.removeItem('token');
        navigate(MAIN_ROUTE);
    };

    return (
        <nav>
            <Link to={MAIN_ROUTE}>Main</Link>
            <Link to={CART_ROUTE}>Cart</Link>
            {user.isAuth ? (
                <>
                    <button onClick={logOut}>Logout</button>
                </>
            ) : (
                <>
                    <Link to={LOGIN_ROUTE}>Login</Link>
                </>
            )}
        </nav>
    );
};

export default NavBar;
