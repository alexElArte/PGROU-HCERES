// Cette component est pour definir About
//import '../../App.css';
import './About.css';
import React from 'react';
import welcomImage from '../../assets/welcomImg.png';
import Navbar from '../Navbar/Navbar';
import {Link} from "react-router-dom";
import {ImBackward} from "react-icons/im";
function About() {
    return (
        <div>
            <div className="container2">
                <div className="left-side1">
                    <img className="labo1" src={welcomImage} alt="Hello"/>
                </div>
                <div className="right-side1">
                    <div className="pg1">
                        <div className="title1">
                             About !
                        </div>
                        Cette application a été créée par des étudiants de Centrale Nantes dans le cadre de l’option Informatique pour les Systèmes d’Information, sous la direction de Jean-Yves Martin et de Sophie Limou.
                        Le suivi de l’application est désormais assuré par la DSI de Nantes Université.
                        <h1>
                            <br/>
                            <Link to={-1}>{<ImBackward color={"white"}/>}</Link>
                        </h1>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default About;