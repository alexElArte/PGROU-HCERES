import styled from 'styled-components';
import {Link} from 'react-router-dom';

export const FooterBody = styled.footer`
    display: flex;
    justify-content: space-between;
    left: 0;
    bottom: 0;
    width: 100%;
    background-color: aliceblue;
    color: black;
    text-align: center;
    font-size: 19px;
    font-weight: 500;

    @media screen and (max-width: 820px){
        font-size: 15px;
    }
`

export const FooterText = styled.p`
    grid-column: 1;
    margin: 16px 0px;
`

export const AboutImg = styled(Link)`
    color: white;
    margin-right: 5px;

    grid-column: 2;

    @media screen and (max-width: 960px) {
        text-align: center;
        width: ;
        display: table;
        
    }
`
