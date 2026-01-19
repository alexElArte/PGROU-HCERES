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

const Navbar = () => {
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
                <NavMenu onClick={handleClick} click={click}>

                    <NavItem>
                        <NavLinks to="/Home" className={(nav) => nav.isActive() ? "active" : ""}>
                            <FaHome/> Home
                        </NavLinks>
                    </NavItem>
                    <NavItem>
                        <NavLinks to="/Configuration" className={(nav) => nav.isActive() ? "active" : ""}>
                            <FaCog className={"mr-2"}/> Import datas
                        </NavLinks>
                    </NavItem>
                    <NavItem>
                        <NavLinks to="/Researcher">
                            <FaUserGraduate/>  Members
                        </NavLinks>
                    </NavItem>
                        <NavLinks to="/Team">
                            <FaUserFriends/>  Teams
                        </NavLinks>
                    <NavItem>
                        <NavLinks to="/Activity">
                            <BiTask/>  Activity
                        </NavLinks>
                    </NavItem>
                    <NavItem>
                        <NavLinks to="/Statistiques">
                            <FaChartLine/>  Stats
                        </NavLinks>
                    </NavItem>
                    {/* ajouter bouton de deconnexion */}
                    <NavItemBtn>
                            <NavBtnLink to='/' onClick={logout}>
                                <Button primary><BiLogOut/> Log out </Button>
                            </NavBtnLink>
                    </NavItemBtn>
                </NavMenu>
            </NavbarContainer>
        </Nav>
    );
};

export default Navbar;