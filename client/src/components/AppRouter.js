import React, { useContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import { authRoutes, publicRoutes } from "../routes";
import { MAIN_ROUTE } from "../utils/consts";
import MainPage from '../pages/MainPage';
import { Context } from "../index"; 
import { observer } from "mobx-react-lite";

const AppRouter = observer(() => {
    const { user } = useContext(Context); 

    return (
        <Routes>
            {user.isAuth && authRoutes.map(({ path, Component }) => (
                <Route key={path} path={path} element={<Component />} />
            ))}

            {publicRoutes.map(({ path, Component }) => (
                <Route key={path} path={path} element={<Component />} />
            ))}

            <Route path={MAIN_ROUTE} element={<MainPage />} />

            <Route path="*" element={<MainPage />} />
        </Routes>
    );
});

export default AppRouter;
