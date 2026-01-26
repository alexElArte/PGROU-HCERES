// Cette component est pour definir Home
//import '../../App.css';
import './Home.css';
import React from 'react';
import welcomImage from '../../assets/welcomImg.png';
import {useSelector} from "react-redux";
//import { HomeContainer,leftside,rightside } from './HomeElements';
//style={{ backgroundColor: "#" + `${randomColor}` }}
//let randomColor = Math.floor(Math.random() * 16777215).toString(16);

import { useTranslation } from 'react-i18next';

function Home() {
    const { t } = useTranslation();
    const auth = useSelector((state) => state.auth);
    return (
        <div>
            <div className="container1">
                <div className="left-side">
                    <div className="pg">
                        <h1>{t("home.welcome")} { auth.username }!</h1>
                        {t("home.message")}
                    </div>
                </div>
                <div className="right-side">
                    <img className="labo" src={welcomImage} alt="Hello"/>
                </div>
            </div>
        </div>
    );
    
}

export default Home;