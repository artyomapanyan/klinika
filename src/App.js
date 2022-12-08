import './App.css';
import React from 'react';
import {ConfigProvider} from 'antd';
import hy from "antd/locale/hy_AM";
import {useSelector} from "react-redux";
import "./dist/styles/Styles.sass"
import AppRoutes from "./Components/AppRoutes";
import axios from "axios";
import {notificate} from "./functions";


function App() {
    let redux = useSelector((state) => state);

    return (
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: '#ce4e99',
                    color: '#fcfcfc',
                },
            }}
            direction={!redux.globalState ? "ltr" : "rtl"}
            locale={hy}
        >
            <AppRoutes/>
        </ConfigProvider>
    );
}

export default App;
