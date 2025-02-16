import { useState } from 'react';
import Button from '../../../Design/Button';
import Container from '../../../Design/Container';
import Input from '../../../Design/Input';
import * as yup from 'yup';
import { getValidationErrors } from '../../../../core/utils/validation';
import ApiError from '../../../../core/error/ApiError';
import AppError from '../../../../core/error/AppError';
import { login } from '../../../../core/modules/auth/api';
import { handleApiResult }  from '../../../../core/utils/api';
import ErrorAlert from '../../../Shared/ErrorAlert';
import PropTypes from 'prop-types';
import { useNavigate } from "react-router-dom";


let schema = yup.object().shape({
    username: yup.string().required(),
});

const LoginPage = ({ setUser }) => {

    const navigate = useNavigate();

    LoginPage.propTypes = {
        setUser: PropTypes.func.isRequired,
    };

    const [data, setData] = useState({
        username: '',
    });

    const [errors, setErrors] = useState({});
    const [error, setError] = useState();

    const handleChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value,
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        schema.validate(data,{abortEarly: false})
        .then(() => {
            login(data)
            .then((res) => handleApiResult(res))
            .then((data) => {
                setUser(data);
                navigate("/movies")
            })
            .catch((e) => {
                if (e instanceof ApiError) {
                    if (e.isUnauthorized()) {
                        setError(new AppError('Wrong combination'));
                    } else {
                        setError(e);
                    }
                } else {
                    setError(new AppError(e));
                }
            })
        
        })
        .catch((e) => {
            setErrors(getValidationErrors(e));
        })
    };

    return(
        <div className="middle">
            <Container>
                <div className="text-center">
                    <h1 className="title mb-5">MOVIE DB</h1>
                    <form onSubmit={handleSubmit} noValidate={true}>
                        <h2 className="h3 mb-3 font-weight-normal">Please sign in</h2>
                        <ErrorAlert error={error}></ErrorAlert>
                        <Input label="Username" type="text" name="username" value={data.username} onChange={handleChange} error={errors.username} />
                        <Button color="primary" type="submit">Log in</Button>
                    </form>
                </div>
            </Container>
        </div>
    )
}

export default LoginPage;