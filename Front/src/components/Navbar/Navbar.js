// Cette component est pour definir la barre de navigation
import React, {useState} from 'react';
import {FaBars, FaCog, FaHome, FaTimes, FaUserGraduate , FaChartLine, FaUserFriends} from 'react-icons/fa';
import {
    Nav,
    NavbarContainer,
    NavLogo,
    MobileIcon,
    NavMenu,
    NavItem,
    NavLinks,
    NavItemBtn,
    NavBtnLink
}
    from './NavbarElements';
import {Button} from '../../AppElements';
import Logo from '../../assets/logo.png';
import {useDispatch} from "react-redux";
import {logoutUser} from "../../services";
import {BiLogOut, BiTask} from "react-icons/bi";
import LanguageSelector from './LanguageSelector';

import { useTranslation } from 'react-i18next';

const Navbar = () => {

    const { t, i18n } = useTranslation();
    
    const [click, setClick] = useState(false);
    const closeMobileMenu = () => setClick(false);

    const dispatch = useDispatch();
    const logout = () => {
        dispatch(logoutUser());
    };
    const handleClick = () => setClick(!click);

    return (
        // Nav, NavbarContainer, ... sont des styles qu'on a definti dans Navbar.elements.js
        <Nav>
            <NavbarContainer>
                {/* Logo + icone */}
                <NavLogo to="/Home" onClick={closeMobileMenu}>
                    <img src={Logo} width="60" alt={"HCERES Logo"}/>
                </NavLogo>
                {/* Les trois lignes qui apparaitre lorsqu'on reduit la page (pour les telephones par exemple) */}
                <MobileIcon onClick={handleClick}>
                    {/* si le menu est cliquer => la component FaTimes */}
                    {/* sinon => la component FaBars */}
                    {click ? <FaTimes/> : <FaBars/>}
                </MobileIcon>
                {/* Le menu que va contenir le Navbar */}
                <NavMenu onClick={handleClick} click={click} language={i18n.language}>

                    <NavItem>
                        <NavLinks to="/Home" language={i18n.language} className={(nav) => nav.isActive() ? "active" : ""}>
                            <FaHome /> {t("nav.home")}
                        </NavLinks>
                    </NavItem>
                    <NavItem>
                        <NavLinks to="/Configuration" language={i18n.language} className={(nav) => nav.isActive() ? "active" : ""}>
                            <FaCog /> {t("nav.import data")}
                        </NavLinks>
                    </NavItem>
                    <NavItem>
                        <NavLinks to="/Researcher" language={i18n.language}>
                            <FaUserGraduate /> {t("nav.members")}
                        </NavLinks>
                    </NavItem>
                        <NavLinks to="/Team" language={i18n.language}>
                            <FaUserFriends /> {t("nav.teams")}
                        </NavLinks>
                    <NavItem>
                        <NavLinks to="/Activity" language={i18n.language}>
                            <BiTask /> {t("nav.activity")}
                        </NavLinks>
                    </NavItem>
                    <NavItem>
                        <NavLinks to="/Statistiques" language={i18n.language}>
                            <FaChartLine /> {t("nav.stats")}
                        </NavLinks>
                    </NavItem>
                    {/* Sélecteur de langue */}
                    <NavItem>
                        <LanguageSelector />
                    </NavItem>
                    {/* ajouter bouton de deconnexion */}
                    <NavItemBtn>
                            <NavBtnLink to='/' onClick={logout}>
                                <Button primary><BiLogOut/> {t("nav.log out")} </Button>
                            </NavBtnLink>
                    </NavItemBtn>
                </NavMenu>
            </NavbarContainer>
        </Nav>
    );
};

export default Navbar;