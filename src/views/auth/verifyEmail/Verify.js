// material-ui
import { useTheme } from '@mui/material/styles';
import { Box, Button, FormControl, FormHelperText, InputLabel, Grid, Typography } from '@mui/material';
import React, { useRef, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { emailVerification } from 'redux/auth/actions';
import { setLoader } from 'redux/auth/actions';
import TextField from '@material-ui/core/TextField';

import "@fontsource/source-sans-pro";
import "@fontsource/public-sans";
import CircularProgress from '@mui/material/CircularProgress';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';
import CircularStatic from './circularbar';
// project imports
import AnimateButton from 'ui-component/extended/AnimateButton';

// ========================|| FIREBASE - FORGOT PASSWORD ||======================== //

const VerifyEmail = ({ token, ...others }) => {
    const theme = useTheme();
    // const loader = useSelector((state) => state.auth.loader);
    // console.log(token, 'token');
    const navigate = useNavigate();
    const dispatch = useDispatch();
   

    useEffect(() => {
       
        dispatch(
            emailVerification({
                token: token,
                navigate: navigate
            })
        );
    }, [token]);
   
    return (
        <>
            <Formik>
                {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
                    <form noValidate onSubmit={handleSubmit} {...others}>
                        <Grid xs={12} sx={{ color: theme.palette.mode === 'dark' ? '#CDCDCD' : '#6d6e72' }}>
                            <Typography className="wallet-select" variant="h3">
                                Your Account is being verified successfully...{' '}
                            </Typography>
                            <Grid container justifyContent="center" sx={{ width: '50%', m: '15px auto ' }}>
                                <Grid item>
                                    <CircularStatic />
                                </Grid>
                            </Grid>
                        </Grid>

                     
                    </form>
                )}
            </Formik>
        </>
    );
};

export default VerifyEmail;
