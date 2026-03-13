import React from 'react';
import {FooterBody, FooterText, AboutImg} from './FooterElements'
import authToken from "../../utils/authToken";
import aboutblue from '../../assets/about_blue.png';
const Footer = () => {
    authToken(localStorage.jwtToken);
    return (
        <FooterBody>
            <div className="footer-left"></div>
            <div className="footer-center">
                <FooterText> © 2026 - CR2TI - École Centrale Nantes - France </FooterText>
            </div>
            <div className="footer-right">
                <AboutImg to="/About">
                    <img src={aboutblue} alt="about" width='40'/>
                </AboutImg>
            </div>
        </FooterBody>
    );
};

export default Footer;