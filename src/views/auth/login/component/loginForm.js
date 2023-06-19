import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import TextField from '@material-ui/core/TextField';
import "@fontsource/source-sans-pro";
import "@fontsource/public-sans";
import {
    Box,
    Button,
    FormControl,
    FormHelperText,
    Grid,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    Stack,
    Typography
} from '@mui/material';
import * as Yup from 'yup';
import { Formik } from 'formik';
import '@fontsource/public-sans';
import AnimateButton from 'ui-component/extended/AnimateButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { login, loginSuccess } from '../../../../redux/auth/actions';
import { useNavigate } from 'react-router-dom';
import { setLoader } from '../../../../redux/auth/actions';
import { GoogleLogin } from '@react-oauth/google';
let jwt = require('jsonwebtoken');
import axios from 'axios';
import { gridSpacing } from 'store/constant';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReactFacebookLogin from 'react-facebook-login';
import './loginForm.css';
import { API_URL } from 'utils/axios';
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';

const LoginForm = ({ loginProp, ...others }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const theme = useTheme();

    const loader = useSelector((state) => state.auth.loader);

    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    useEffect(() => {
        dispatch(setLoader(false));
    }, []);

    const googleAuthHandle = (data) => {
        const decoded_data = jwt.decode(data.credential);
        axios
            .post(API_URL + 'auth/google/callback/success', {
                data: decoded_data
            })
            .then(function (response) {
                // console.log('response.data.data', response.data.data);
                dispatch(loginSuccess(response.data.data));

                if (!response.data.data.profileCompleted) {
                    navigate('/socialLogin', {
                        state: { socal: response.data.data }
                    });

                    console.log('if in ran');
                } else {
                    // console.log('else in ran');
                    navigate('/home', {
                        state: { socal: response.data.data }
                    });
                }
            })
            .catch(function (error) {
                toast.error(error.message);
            });
    };

    const responseFacebook = (data) => {
        let { email, first_name, last_name } = data;
        axios
            .post(API_URL + 'auth/facebook/callback/success', {
                data: { email, first_name, last_name }
            })
            .then(function (response) {
                dispatch(loginSuccess(response.data.data));

                if (!response.data.data.profileCompleted) {
                    navigate('/socialLogin', {
                        state: { socal: response.data.data }
                    });
                } else {
                    navigate('/home', {
                        state: { socal: response.data.data }
                    });
                }
            })
            .catch(function (error) {
                toast.error(error.message);
            });
    };
    const responseFacebookFailure = (error) => {
        // toast.error(error);
    };

    return (
        <>
            <Formik
                enableReinitialize
                initialValues={{
                    email: '',
                    password: ''
                }}
                validationSchema={Yup.object().shape({
                    email: Yup.string().email('Enter valid email').max(255).required('Email is required!'),
                    // .matches(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/, 'Invalid Email'),
                    // .matches(/^[a-zA-Z0-9]/, '* This email cannot contain white space and special character'),

                    password: Yup.string()
                        .max(255)
                        .required('Password is required!')
                        // .matches(
                        //     /^(?=(?:.*[A-Z].*){1})(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
                        //     'Must Contain 8 Characters,  One Uppercase, One Lowercase, One Number and one special case Character'
                        // )
                })}
                onSubmit={async (values) => {
                    await dispatch(setLoader(true));
                    dispatch(
                        login({
                            email: values.email,
                            password: values.password,
                            navigate: navigate
                        })
                    );
                }}
            >
                {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
                    <form noValidate onSubmit={handleSubmit} {...others}>
                        <InputLabel sx={{  color: theme.palette.mode === 'dark' ? 'white' : '#404040'}} className="authFont" htmlFor="outlined-adornment-email-login">
                            Email{' '}
                        </InputLabel>
                        <FormControl  sx={{ ...theme.typography.customInput }} className="auth-formcontrol" 
                        fullWidth error={Boolean(touched.email && errors.email)}>
                            <TextField
                           
                                placeholder="email"
                                className="textForm"
                                // onChange={(event)=>handelAccount("password",event)}
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                type="email"
                                value={values.email}
                                name="email"
                                autoComplete="current-email"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                inputProps={{}}
                            />
                            {touched.email && errors.email && (
                                <FormHelperText error id="standard-weight-helper-text-email-login">
                                    {errors.email}
                                </FormHelperText>
                            )}
                        </FormControl>

                        <InputLabel sx={{  color: theme.palette.mode === 'dark' ? 'white' : '#404040'}} className="authFont" htmlFor="outlined-adornment-password-login">
                            {' '}
                            Password
                        </InputLabel>
                        <FormControl  className="auth-formcontrol" fullWidth error={Boolean(touched.password 
                            && errors.password)}>
                            <TextField
                           
                                placeholder=" Password"
                                className="textForm"
                                // onChange={(event)=>handelAccount("password",event)}
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                type={showPassword ? 'text' : 'password'}
                                id="password"
                                autoComplete="current-password"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                inputProps={{}}
                            />
                            {touched.password && errors.password && (
                                <FormHelperText error id="standard-weight-helper-text-password-login">
                                    {errors.password}
                                </FormHelperText>
                            )}
                            <IconButton
                                className="iconvisible"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                aria-label="toggle password visibility"
                                edge="end"
                                size="large"
                            >
                                {showPassword ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                        </FormControl>

                        <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={1}>
                            <Typography
                                className="Forgot"
                                variant="subtitle1"
                                component={Link}
                                to={'/forgetPassword'}
                                sx={{
                                    textDecoration: 'none',

                                    color: theme.palette.mode === 'dark' ? '#fff' : '#000'
                                }}
                            >
                                Forgot Password?
                            </Typography>
                        </Stack>
                        {errors.submit && (
                            <Box sx={{ mt: 3 }}>
                                <FormHelperText error>{errors.submit}</FormHelperText>
                            </Box>
                        )}

                        <Box sx={{ mt: 2 }}>
                            <AnimateButton>
                                {loader ? (
                                    <Button
                                        className="signbuttonMarket"
                                        disableElevation
                                        disabled={isSubmitting}
                                        fullWidth
                                        size="large"
                                        type="submit"
                                        variant="contained"
                                        color="secondary"
                                    >
                                        Sign in
                                    </Button>
                                ) : (
                                    <Button
                                        className="signbuttonMarket"
                                        disableElevation
                                        disabled={isSubmitting}
                                        fullWidth
                                        size="large"
                                        type="submit"
                                        variant="contained"
                                        color="secondary"
                                    >
                                        Sign in
                                    </Button>
                                )}
                            </AnimateButton>
                        </Box>

                        <Grid item xs={12}>
                            <Grid mt={2} mb={-2} item container direction="column" alignItems="center" xs={12}>
                                <Typography className="fontfamily" variant="subtitle1" sx={{ textDecoration: 'none', fontSize: '16px' }}>
                                    or continue with
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid mt={1} container spacing={gridSpacing}>
                            <Grid item xs={12}>
                                <Grid container spacing={gridSpacing}>
                                    <Grid item lg={6} md={6} sm={6} xs={6}>
                                        <Box sx={{ float: { md: 'right', xs: 'right' } }}>
                                            <ReactFacebookLogin
                                                appId="851727442768362"
                                                // autoLoad={true}
                                                fields="first_name, last_name,email"
                                                callback={responseFacebook}
                                                onFailure={responseFacebookFailure}
                                                cssClass="my-facebook-button-class"
                                                icon="fa-facebook"
                                                textButton=""
                                            />
                                        </Box>
                                    </Grid>

                                    <Grid item lg={6} md={6} sm={6} xs={6}>
                                        <Box sx={{ float: { md: 'left' } }}>
                                            {' '}
                                            <GoogleLogin
                                                type="icon"
                                                onSuccess={(data) => {
                                                    // console.log('datafrom google login', data);
                                                    googleAuthHandle(data);
                                                }}
                                                onError={() => {
                                                    toast.error('Google Auth Failed');
                                                }}
                                            />
                                        </Box>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </form>
                )}
            </Formik>
        </>
    );
};

export default LoginForm;
