// material-ui
import { useTheme } from '@mui/material/styles';
import { Box, Button, FormControl, FormHelperText, InputLabel, IconButton, Typography, Grid } from '@mui/material';
import React, { useRef, useEffect, useState } from 'react';
import { Switch } from '@mui/material';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { emailVerification } from 'redux/auth/actions';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

// import { setLoader } from '../../../../redux/auth/actions';
import TextField from '@material-ui/core/TextField';

import '@fontsource/source-sans-pro';
import '@fontsource/public-sans';
import { ethers, utils } from 'ethers';
import { signup, setLoader, resendEmail } from 'redux/auth/actions';
import { setWallet } from 'redux/auth/actions';
import { SNACKBAR_OPEN } from 'store/actions';
import EmailVerifyDialog from './emailVerifyDialog';
// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project imports
import AnimateButton from 'ui-component/extended/AnimateButton';

// ========================|| FIREBASE - FORGOT PASSWORD ||======================== //

const VerifyEmail = ({ token, ...others }) => {
    const theme = useTheme();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [changeEmail, setChangeEmail] = useState(false);
    const [timer, setTimer] = useState(5);
    const [isResendDisabled, setIsResendDisabled] = useState(false);

    useEffect(() => {
        let intervalId;

        if (timer > 0) {
            intervalId = setInterval(() => {
                setTimer((prevTimer) => prevTimer - 1);
            }, 1000);
        } else {
            setIsResendDisabled(false);
            clearInterval(intervalId);
        }

        return () => {
            clearInterval(intervalId);
        };
    }, [timer]);

    const handleResendClick = () => {
        setIsResendDisabled(true);
        setTimer(5); // Set the desired timer value in seconds
        dispatch(
            resendEmail({
                id: user.id,
                navigate : navigate
            })
        );
    };
    // console.log(token, 'token=>');
    const loader = useSelector((state) => state.auth.loader);
    const user = useSelector((state) => state.auth.user);
    // console.log(user.id, 'user===========>>');
   

    return (
        <>
            <EmailVerifyDialog open={changeEmail} setOpen={setChangeEmail} />

            <Grid xs={12} sx={{ color: theme.palette.mode === 'dark' ? '#CDCDCD' : '#6d6e72' }}>
                <Typography className="wallet-select" variant="h3">
                    Please check your email account , the verification email has been sent to you.
                    <b>{user?.email}</b>{' '}
                </Typography>
            </Grid>

            <Grid mt={2} xs={12}>
                <Grid xs={12} md={1}></Grid>
                <Box sx={{ display: 'flex' }}>
                    <Grid xs={6} md={7.5}>
                        <Typography
                            className="email-verify"
                            sx={{ cursor: 'pointer' }}
                            variant="body"
                            onClick={() => {
                                setChangeEmail(true);
                            }}
                        >
                            change email address
                        </Typography>
                    </Grid>
                    <Grid xs={6} md={4.5} sx={{ display: 'flex' }}>
                        <Typography
                            onClick={() => {
                               
                          {timer == 0   &&  handleResendClick();}    
                            }}
                            // disabled={isResendDisabled}
                            sx={{ ml: { md: 1 }, cursor: 'pointer' }}
                            className="email-verify"
                            variant="body"
                        >
                            resend code
                        </Typography>
                        {timer > 0 ? (
                            <Typography className="email-verify" variant="body">
                                (`{timer}`)
                            </Typography>
                        ) : (
                            <Typography className="email-verify" sx={{ color: 'red !important' }} variant="body">
                                (`0`)
                            </Typography>
                        )}
                    </Grid>
                </Box>
            </Grid>
        </>
    );
};

export default VerifyEmail;
