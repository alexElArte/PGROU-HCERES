import styled from 'styled-components';
import {Link} from 'react-router-dom';

export const FooterBody = styled.footer`
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    align-items: center;
    width: 100%;
    height: 56px;
    min-height: 56px;
    max-height: 56px;
    flex-shrink: 0;
    padding: 0 12px;
    background-color: aliceblue;
    color: black;
    text-align: center;
    font-size: 19px;
    font-weight: 500;

    .footer-left {
        justify-self: start;
    }

    .footer-center {
        justify-self: center;
    }

    .footer-right {
        justify-self: end;
        display: inline-flex;
        align-items: center;
    }

    @media screen and (max-width: 820px){
        font-size: 15px;
    }
`

export const FooterText = styled.p`
    margin: 0;
    line-height: 1.2;
    white-space: nowrap;
`

export const AboutImg = styled(Link)`
    color: white;
    margin-right: 5px;
    display: inline-flex;
    align-items: center;

    grid-column: 2;

    img {
        margin: 0;
        display: block;
    }

    @media screen and (max-width: 960px) {
        text-align: center;
        width: ;
        display: table;
        
    }
`
