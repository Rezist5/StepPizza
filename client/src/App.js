import React, { useContext, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRouter from './components/AppRouter';
import NavBar from './components/NavBar'; 
import { observer } from 'mobx-react-lite';
import { Context } from './index'; 
import { check } from './api/userAPI'; 
import './App.css'; 

const App = observer(() => {
    const { user } = useContext(Context);

    useEffect(() => {
        if (localStorage.getItem('token')) {
            check().then(data => {
                user.setUser(data);
                user.setIsAuth(true);
            }).catch(() => {
                localStorage.removeItem('token');
            });
        }
    }, [user]);

    return (
        <BrowserRouter>
            <NavBar />
            <AppRouter />
        </BrowserRouter>
    );
});

export default App;
