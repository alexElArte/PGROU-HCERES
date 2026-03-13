import React from 'react';
import {FooterBody, FooterText, AboutImg} from './FooterElements'
import AboutLogo from '../../assets/about.svg';
import authToken from "../../utils/authToken";
import aboutblue from '../../assets/about_blue.png';
const Footer = () => {
    authToken(localStorage.jwtToken);
    return (
        <div>
            <FooterBody className={"fixed-bottom"} role="contentinfo">
                <div className="text5"></div>
                <div className="text2">
                    <FooterText> ©2025 - CR2TI - Ecole Centrale Nantes - France </FooterText>
                </div>
                <div className="footer1">
                    <AboutImg to="/About">
                        <img src={aboutblue} alt="about" width='40'/>
                    </AboutImg>
                </div>
            </FooterBody>
        </div>
    );
};

export default Footer;