// Cette component est pour definir les styles liees a Navbar

import styled from 'styled-components';
import {Link} from 'react-router-dom';
import {Container} from '../../AppElements'


// style pour le nav bar
export const Nav = styled.nav`
    background: aliceblue;
    height: 80px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.2rem;
    position: sticky;
    top: 0;
    z-index: 999;
`

// style pour le container
// prends on parametre Container qu'on va definir dans le globaleStyle.js
export const NavbarContainer = styled(Container)`
display: flex;
justify-content: space-between;
height: 80 px;

// utiliser les styles de Container qu'on a definti dans AppElements.js
${Container}
`

// style du logo dans le Navbar, il prend en parametre le lien du logo
export const NavLogo = styled(Link)`
color: #fff;
justify-self: flex-start;
cursor: pointer;
text-decoration: none;
font-size: 2rem;
display: flex;
align-items: center;
`

// style des trois trais qui seront afficher pour les ecrans petites
export const MobileIcon = styled.div`
// on veut qu'il apparait que pour les petites ecrans
display: none;

@media screen and (max-width: 960px) {
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(-100%, 60%);
    font-size: 1.8rem;
    cursor: pointer;
    color: black;
}
`

// styles du menu de la barre de navigation avec styled.ul
export const NavMenu = styled.ul`
display: flex;
align-items: center;
list-style: none;
text-align: center;


@media screen and (max-width: 960px) {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 90vh;
    position: absolute;
    top: 80px;
    // pour avoir une transition de la gauche du menu lorsq'on clique sur les trois trais
    left: ${({click}) => (click ? 0 : '-100%')};
    opacity: 1;
    transition: all 0.5s ease;
    background-color: aliceblue;
}
`

// styles de NavItem avec styled.li
export const NavItem = styled.li``
// styles de NavLinks 
export const NavLinks = styled(Link)`
    color: black;
    display: flex;
    align-items: center;
    text-decoration: none;
    padding: 0.5rem 1rem;
    height: 100%;

  &:hover {
    color: black;
    transition: all 0.5s ease;
  }

  @media screen and (max-width: 960px) {
    text-align: center;
    padding: 2rem;
    width: 100%;
    display: table;

    &:hover {
      color: black;
      transition: all 0.5s ease;
    }
  }
`
// styles de NavItemBtn
export const NavItemBtn = styled.li`
    @media screen and (max-width: 960px) {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 120px;
    }
`
// styles de NavBtnLink
export const NavBtnLink = styled(Link)`
display: flex;
justify-content: center;
align-items: center;
text-decoration: none;
padding: 8px 16px;
height: 100%;
width: 100%;
border: none;
outline: none;
`