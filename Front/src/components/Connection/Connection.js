import React, {useState} from "react";
import "./Connection.css";
import Logo from '../../assets/logo.png';
import {FaUserAlt, FaKey} from 'react-icons/fa';
import Button from "react-bootstrap/Button";
import {Alert} from "react-bootstrap";
import {useDispatch} from "react-redux";
import {authenticateUser} from "../../services";
import {useLocation, useNavigate} from "react-router-dom";
import authToken from "../../utils/authToken";
import {Oval} from "react-loading-icons";

import { useTranslation } from 'react-i18next';

const Login = (props) => {

    const { t } = useTranslation();
    
    // state are parameter passed by navigate functions
    const navState = useLocation().state;
    const [isLoading, setIsLoading] = useState(false);
    const [errorLogin, setErrorLogin] = useState(navState ? navState.errorLogin : "");
    const initialState = {
        login: "",
        password: "",
    };

    const [user, setUser] = useState(initialState);

    const credentialChange = (event) => {
        const {name, value} = event.target;
        setUser({...user, [name]: value});
    };

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const validateUser = (event) => {
        event.preventDefault();
        setIsLoading(true);
        authToken('');
        dispatch(authenticateUser(user.login, user.password))
            .then((response) => {
                navigate("/Home");
            })
            .catch((error) => {
                console.log(error)
                resetLoginForm();
                if (!error.response) {
                  setErrorLogin(t("login.serverNotResponding"));
                } else if (error.response.status === 403) {
                    setErrorLogin(t("login.invalidCredentials"));
                } else {
                    setErrorLogin(t("login.unknownError") + " " + error.response.status )
                }
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    const resetLoginForm = () => {
        setUser(initialState);
    };

    return (
        <div className="login fadeInDown">
            <form className="login_form" onSubmit={validateUser}>
                <div className="header_login">
                    <img src={Logo} alt="Logo" width="100" className={"fadeIn first"}/>
                    <h1 className={"fadeIn first"}> {t("login.title")} </h1>
                </div>

                <label className="username_label fadeIn second">
                    <i><FaUserAlt/></i>
                    <input type="username" placeholder={t("login.username")} name="login" value={user.login}
                           onChange={credentialChange}/>
                </label>
                <label className="password_label fadeIn third">
                    <i><FaKey/></i>
                    <input type="password" placeholder={t("login.password")} name="password" value={user.password}
                           onChange={credentialChange}/>
                </label>
                {errorLogin && <Alert className={"alert-danger"} dismissible={true} onClose={()=>setErrorLogin('')}>{errorLogin}</Alert>}
                <Button variant={"primary"} className={"btn-primary fadeIn fourth"} value={"connection"}
                        type={"submit"} disabled={isLoading}>
                    {isLoading ? <Oval className="mr-2" width={20} height={20}/> : null}
                    {isLoading ? t("login.loginInProgress") : t("login.loginButton")}
                </Button>
            </form>
        </div>
    );
}

export default Login;
