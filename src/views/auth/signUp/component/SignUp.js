
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import "@fontsource/source-sans-pro";
import "@fontsource/public-sans";
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import { ethers, utils } from 'ethers';
import {
    Box,
    Button,
    Checkbox,
    FormControl,
    FormControlLabel,
    FormHelperText,
    Grid,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    Stack
} from '@mui/material';
import * as Yup from 'yup';
import { Formik } from 'formik';
import AnimateButton from 'ui-component/extended/AnimateButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { signup, setLoader } from '../../../../redux/auth/actions';
import { useNavigate } from 'react-router-dom';
import { setWallet } from 'redux/auth/actions';
import { SNACKBAR_OPEN } from 'store/actions';
import TextField from '@material-ui/core/TextField';

const SignUpForm = ({ loginProp, ...others }) => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [checked, setChecked] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const [showconfirmPassword, setShowconfirmPassword] = useState(false);
    const [walletAddress, setWalletAddress] = useState('');
    const [address, setAddress] = useState('');

    const handleConnect = async () => {
        const response = await window?.ethereum?.request({ method: 'eth_requestAccounts' });
        if (response) {
            if (!window.ethereum) {
                dispatch({
                    type: SNACKBAR_OPEN,
                    open: true,
                    message: 'No crypto wallet found. Please install it.',
                    variant: 'alert',
                    alertSeverity: 'info'
                });
                console.log('No crypto wallet found. Please install it.');
                // toast.error('No crypto wallet found. Please install it.');
            }

            // else if (window?.ethereum?.networkVersion !== '5') {
            //   console.log('window?.ethereum?.networkVersion !== 5', window?.ethereum?.networkVersion);
            //     dispatch({
            //         type: SNACKBAR_OPEN,
            //         open: true,
            //         message: 'Please change your Chain ID to Goerli',
            //         variant: 'alert',
            //         alertSeverity: 'info'
            //     });
            //     console.log('Please change your Chain ID to Goerli');
            //     setWalletAddress()
            // }
            else {
                const address = utils?.getAddress(response[0]);
                setWalletAddress(address);
                dispatch({
                    type: SNACKBAR_OPEN,
                    open: true,
                    message: 'Success',
                    variant: 'alert',
                    alertSeverity: 'success'
                });
            }
        } else {
            console.log('No crypto wallet found. Please install it.');
            // toast.error('No crypto wallet found. Please install it.');
        }
    };

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    const handleMouseDownconfirmPassword = (event) => {
        event.preventDefault();
    };
    const handleClickShowconfirmPassword = () => {
        setShowconfirmPassword(!showconfirmPassword);
    };

    useEffect(() => {
        dispatch(setWallet(walletAddress));
        handleConnect();
    }, [walletAddress]);

    if (window.ethereum) {
        window.ethereum.on('accountsChanged', function (accounts) {
            // Time to reload your interface with accounts[0]!
            // setReload(true)
            handleConnect();
        });
    }
    return (
        <>
            <Formik
                enableReinitialize
                initialValues={{
                    firstName: '',
                    lastName: '',
                    email: '',
                    password: '',
                    confirmPassword: '',
                    walletAddress: '',
                    address: ''
                }}
                validationSchema={Yup.object().shape({
                    firstName: Yup.string().required('First Name is required!').max(42, 'First Name can not exceed 42 characters'),
                    // .matches(/^[-a-zA-Z0-9-()]+(\s+[-a-zA-Z0-9-()]+)*$/, 'Invalid Name'),
                    lastName: Yup.string().required('Last Name is required!').max(42, 'Last Name can not exceed 42 characters'),
                    // .matches(/^[-a-zA-Z0-9-()]+(\s+[-a-zA-Z0-9-()]+)*$/, 'Invalid Name'),
                    email: Yup.string().email('Enter valid email').max(255).required('Email is required!'),
                    password: Yup.string()
                        .max(255)
                        .required('Password is required!')
                        .matches(
                            /^(?=(?:.*[A-Z].*){1})(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
                            'Must Contain 8 Characters,  One Uppercase, One Lowercase, One Number and one special case Character'
                        ),
                    confirmPassword: Yup.string().max(255).required('Confirm Password is required!'),
                    confirmPassword: Yup.string().oneOf([Yup.ref('password')], 'Both password need to be the same'),
                    address: Yup.string().max(255).required('Delivery address is required!')
                })}
                onSubmit={async (values) => {
                    if (walletAddress == '') {
                        dispatch({
                            type: SNACKBAR_OPEN,
                            open: true,
                            message: 'Please connect to your wallet',
                            variant: 'alert',
                            alertSeverity: 'info'
                        });
                    }
                    await dispatch(setLoader(true));
                    dispatch(
                        signup({
                            firstName: values.firstName,
                            lastName: values.lastName,
                            email: values.email,
                            password: values.password,
                            walletAddress: walletAddress,
                            address: values.address,
                            navigate: navigate
                        })
                    );
                }}
            >
                {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
                    <form noValidate onSubmit={handleSubmit} {...others}>
                        <InputLabel sx={{  color: theme.palette.mode === 'dark' ? 'white' : '#404040'}} className="authFont" htmlFor="outlined-adornment-email-login">
                            First Name{' '}
                        </InputLabel>
                        <FormControl
                            sx={{ ...theme.typography.customInput }}
                            className="auth-formcontrol"
                            fullWidth
                            error={Boolean(touched.firstName && errors.firstName)}
                        >
                            <TextField
                                placeholder="First Name"
                                className="textForm"
                                // onChange={(event)=>handelAccount("password",event)}
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                type="name"
                                value={values.firstName}
                                name="firstName"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                inputProps={{}}
                            />
                            {touched.firstName && errors.firstName && (
                                <FormHelperText error id="standard-weight-helper-text-name-login">
                                    {errors.firstName}
                                </FormHelperText>
                            )}
                        </FormControl>

                        <InputLabel  sx={{  color: theme.palette.mode === 'dark' ? 'white' : '#404040'}} className="authFont" htmlFor="outlined-adornment-email-login">
                            Last Name{' '}
                        </InputLabel>
                        <FormControl
                            sx={{ ...theme.typography.customInput }}
                            className="auth-formcontrol"
                            fullWidth
                            error={Boolean(touched.lastName && errors.lastName)}
                        >
                            <TextField
                                placeholder="Last Name"
                                className="textForm"
                                // onChange={(event)=>handelAccount("password",event)}
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                type="lastName"
                                value={values.lastName}
                                name="lastName"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                inputProps={{}}
                            />
                            {touched.lastName && errors.lastName && (
                                <FormHelperText error id="standard-weight-helper-text-name-login">
                                    {errors.lastName}
                                </FormHelperText>
                            )}
                        </FormControl>

                        <InputLabel sx={{  color: theme.palette.mode === 'dark' ? 'white' : '#404040'}} className="authFont" htmlFor="outlined-adornment-email-login">
                            Email
                        </InputLabel>
                        <FormControl
                            sx={{ ...theme.typography.customInput }}
                            className="auth-formcontrol"
                            fullWidth
                            error={Boolean(touched.email && errors.email)}
                        >
                            <TextField
                                placeholder="Email"
                                className="textForm"
                                // onChange={(event)=>handelAccount("password",event)}
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                type="email"
                                value={values.email}
                                name="email"
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
                        <FormControl className="auth-formcontrol" fullWidth error={Boolean(touched.password && errors.password)}>
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

                        <InputLabel sx={{  color: theme.palette.mode === 'dark' ? 'white' : '#404040'}} className="authFont" htmlFor="outlined-adornment-password-login">
                            Confirm Password
                        </InputLabel>
                        <FormControl
                            className="auth-formcontrol"
                            fullWidth
                            error={Boolean(touched.confirmPassword && errors.confirmPassword)}
                        >
                            <TextField
                                placeholder="Confirm Password"
                                className="textForm"
                                // onChange={(event)=>handelAccount("password",event)}
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                value={values.confirmPassword}
                                name="confirmPassword"
                                type={showconfirmPassword ? 'text' : 'password'}
                                id="password"
                                autoComplete="current-password"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                inputProps={{}}
                            />

                            <IconButton
                                className="iconvisible"
                                onClick={handleClickShowconfirmPassword}
                                onMouseDown={handleMouseDownconfirmPassword}
                                aria-label="toggle password visibility"
                                edge="end"
                                size="large"
                            >
                                {showconfirmPassword ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                            {touched.confirmPassword && errors.confirmPassword && (
                                <FormHelperText error id="standard-weight-helper-text-password-login">
                                    {errors.confirmPassword}
                                </FormHelperText>
                            )}
                        </FormControl>
                        {/* <div>* Password should be 8 characters long containing 1 Uppercase, 1 Numeric and 1 special character</div> */}
                        <InputLabel sx={{  color: theme.palette.mode === 'dark' ? 'white' : '#404040'}} className="authFont" htmlFor="outlined-adornment-email-login">
                            Delivery Address
                        </InputLabel>
                        <FormControl
                            sx={{ ...theme.typography.customInput }}
                            className="auth-formcontrol"
                            fullWidth
                            error={Boolean(touched.address && errors.address)}
                        >
                            <TextField
                                placeholder="Delivery Address"
                                className="textForm"
                                // onChange={(event)=>handelAccount("password",event)}
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                type="address"
                                value={values.address}
                                name="address"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                // helperText="Some important text"
                                inputProps={{}}
                            />
                            {touched.address && errors.address && (
                                <FormHelperText error id="standard-weight-helper-text-name-login">
                                    {errors.address}
                                </FormHelperText>
                            )}
                        </FormControl>

                        <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={1}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={checked}
                                        onChange={(event) => setChecked(event.target.checked)}
                                        name="checked"
                                        color="primary"
                                    />
                                }
                                label="By checking you agree to our Terms and Conditions"
                            />
                        </Stack>
                        <Button
                            variant="contained"
                            onClick={() => {
                                handleConnect();
                            }}
                        >
                            {walletAddress ? walletAddress.slice(0, 5) + '...' + walletAddress.slice(38, 42) : 'Connect with wallet'}
                        </Button>
                        {errors.submit && (
                            <Box sx={{ mt: 3 }}>
                                <FormHelperText error>{errors.submit}</FormHelperText>
                            </Box>
                        )}

                        <Box sx={{ mt: 2 }}>
                            <AnimateButton>
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
                                    Sign up
                                </Button>
                            </AnimateButton>
                        </Box>
                    </form>
                )}
            </Formik>
        </>
    );
};

export default SignUpForm;
