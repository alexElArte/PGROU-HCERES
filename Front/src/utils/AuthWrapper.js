import {Outlet, useNavigate} from "react-router-dom";
import axios from "axios";
import authToken from "./authToken";

// https://stackoverflow.com/questions/70752036/how-to-redirect-user-to-a-diferent-path-if-token-is-expired
const AuthWrapper = () => {
    const navigate = useNavigate();
    function isAuthorised() {
        authToken(localStorage.jwtToken);
        let isAuthorisedCheck = true;
        axios.get('checkToken').then(response => {
            // page is authorised to visit
        }).catch(error => {
            // page is not authorised
            console.log(error);
            let errorMsg = '';
            isAuthorisedCheck = false;
            if (!error.response) {
                errorMsg = "Le serveur ne repond pas. Est-ce que spring boot est lancé (^_^)  ?";
            } else if (error.response.status === 401) {
                // Unauthorized action
                errorMsg = 'Session expirée, veuillez vous reconnecter';
                authToken('');
            } else if (error.response.status === 403) {
                errorMsg = 'la page demandée est interdite';
            } else {
                errorMsg = 'Error message : ' + error.response.status;
            }
            navigate("/", {
                replace:true,
                state: {
                    errorLogin: errorMsg,
                },
            });
        })
        return isAuthorisedCheck;
    }
    isAuthorised();
    return <Outlet />;
};

export default AuthWrapper;