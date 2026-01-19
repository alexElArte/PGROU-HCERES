import styled, {createGlobalStyle} from 'styled-components';

// style de tout ce qui est dans la page web
export const GlobaleStyle = createGlobalStyle`
* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-family: 'Source Sans Pro', sans-serif;
}
`;

export const Container = styled.div`
z-index: 1;
width: 100%;
max-width: 1300px;
margin-right: auto;
margin-left: auto;
padding-right: 3px;
padding-left: 3px;

// pour avoir une page responsive
@media screen and (max-width: 991px) {
    padding-right: 30px;
    padding-left: 30px;
}
`

export const Button = styled.button`
    border-radius: 4px;
    background: ${({primary}) => (primary ? 'darkblue' : 'darkblue')};
    white-space: nowrap;
    padding: ${({big}) => (big ? '12px 64px' : '10px 20px')};
    color: #fff;
    font-size: ${({fontBig}) => (fontBig ? '20px' : '16px')};
    outline: none;
    border: none;
    cursor: pointer;

    &:hover {
        transition: all 0.3s ease-out;
        background: #fff;
        background: ${({primary}) => (primary ? '#A7A7A7' : '#A7A7A7')};
    }

    @media screen and (max-width: 960px) {
        width: 100%;
    }
`   