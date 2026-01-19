import React from "react";
import {useNavigate} from "react-router-dom";

const PageNotExist = () => {
    const navigate = useNavigate();

    return (
        <div className="d-flex align-items-center justify-content-center vh-100">
            <div className="text-center">
                <h1 className="display-1 fw-bold">404</h1>
                <p className="fs-3"><span className="text-danger">Opps!</span> Page non trouvée..</p>
                <p className="lead">
                    La page que vous recherchez n'existe pas.
                </p>
                <button className="btn btn-outline-primary"
                        onClick={() => navigate(-1)}> Go Back
                </button>
            </div>
        </div>
    );
};

export default PageNotExist;