import { forwardRef, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import styled from '@mui/system/styled';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// material-ui
import {
    AppBar,
    DialogActions,
    Dialog,
    Button,
    InputLabel,
    InputAdornment,
    IconButton,
    Input,
    DialogContent,
    DialogTitle,
    TextField,
    Divider,
    Grid,
    Box,
    List,
    Slide,
    Toolbar,
    Typography
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MainCard from 'ui-component/cards/MainCard';

import Balance from 'layout/UserLayout/header/balance';
import Avatar from '@mui/material/Avatar';
import { useTheme } from '@mui/material/styles';
import MetaMaskSection from 'layout/MainLayout/Header/MetaMaskSection';
import { updateProperty } from 'redux/brand/actions';
// assets
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';
import metaMask from 'assets/images/metamask.svg';
import { ethers, utils } from 'ethers';
import { setWallet } from 'redux/auth/actions';
// slide animation
const Transition = forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);

// ===============================|| UI DIALOG - FULL SCREEN ||=============================== //

export default function MetaMask({ open, setOpen }) {
    const [loader, setLoader] = useState(false);
    const theme = useTheme();
    const Item = styled('div')(({ theme }) => ({
        // backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        // border: '1px solid',
        // borderColor: theme.palette.mode === 'dark' ? '#444d58' : '#ced7e0',
        padding: theme.spacing(1),
        cursor:'pointer',
        // borderRadius: '4px',
        fontFamily:'Public Sans',
        fontStyle:'normal',
        textAlign: 'right'
    }));
    const [file, setFile] = useState('');

    // console.log('nftid==========??', nftid);
    const user = useSelector((state) => state.auth.user);
    const navigate = useNavigate();
   const dispatch = useDispatch();
    const [walletAddress, setWalletAddress] = useState();
    const handleConnect = async () => {
        if (!window.ethereum) {
            toast.error('No crypto wallet found. Please install it.');
        }

        const response = await window.ethereum.request({ method: 'eth_requestAccounts' });
        if (response) {
            const address = utils?.getAddress(response[0]);
            setWalletAddress(address);
        } else {
            toast.error('No crypto wallet found. Please install it.');
        }
    };

    useEffect(() => {
        dispatch(setWallet(walletAddress));
    }, [walletAddress]);
    const handleClose = () => {
        setOpen(false);
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    return (
        <div>
            <Dialog
                open={open}
                // onClose={handleClose}
                TransitionComponent={Transition}
                sx={{ width: '80%', margin: '0 auto', maxHeight: '700px' }}
            >
                {/*    <IconButton float="left" color="inherit" onClick={handleClose} aria-label="close" size="large">
                    <CloseIcon />
                </IconButton> */}

                <Grid xs={12}>
                    <DialogActions sx={{ float: 'right' }}>
                        <Button
                            className="buttonSize"
                            size="large"
                            sx={{ color: theme.palette.error.dark }}
                            onClick={handleClose}
                            color="secondary"
                        >
                            <CloseIcon />
                        </Button>
                    </DialogActions>
                </Grid>
                <Box sx={{ pt: 4, pl: 4, pr: 2 }}>
                <Grid container spacing={2}>
                    <Grid  xs={9.5} sx={{ display: 'flex' }}>
                        <Avatar sx={{ width: 38, height: 38, marginTop: { md: '-7px' }, mr: 1 }}>w</Avatar>
                        <Typography className="My-wallet" variant="h2"
                         sx={{ color: theme.palette.mode === 'dark' ? '#fff' : '#000' }}>
                            My wallet
                        </Typography>
                       
                    </Grid>
                    <Grid mt={-1} xs={2.5} >
                        <MetaMaskSection />
                    </Grid>

                    <Grid mt={2} mb={1} xs={12}>
                        <Divider />
                    </Grid>
                    <Grid mt={1} xs={12}>
                        <MainCard
                            className="walletShadow"
                            // sx={{borderColor: theme.palette.mode === 'dark' ? '#2d2e2f' : '#90caf975'}}
                            title={
                                <Grid container spacing={1}>
                                    <Grid item xs={12}>
                                        <Balance />
                                    </Grid>
                                    <Grid item xs={12} textAlign="center" sx={{ }}>
                                        <Button href="https://mumbai.polygonscan.com/" className="wallet-button"
                                         variant="contained" size="large">
                                            Add Funds
                                        </Button>
                                    </Grid>
                                </Grid>
                            }
                            content={false}
                        ></MainCard>
                    </Grid>
                    <Grid mt={1.7} xs={4}>
                        {/*    <Item >POPULAR</Item> */}
                    </Grid>
                </Grid>
            </Box>
                <Box sx={{ p: 5 }}>
                    <Grid container spacing={2}>
                       
                        <Grid  xs={12} sx={{ color: theme.palette.mode === 'dark' ? '#CDCDCD' : '#6d6e72' }}>
                            <Typography className="wallet-select" variant="h3">
                                If you don't have a wallet yet, you can select a provider and create one now
                            </Typography>
                        </Grid>

                        <Grid mt={2} mb={1} xs={12}>
                        <Divider/>
                        </Grid>
                        <Grid mt={1} xs={8}>
                            
                            <Button  sx={{ color: theme.palette.mode === 'dark' ? '#fff' : '#000' }}
                            onClick={() => {
                                handleConnect();
                            }}
                            className='connect-button' variant="text" startIcon={<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 212 189">
                            <g fill="none" fill-rule="evenodd">
                                <polygon
                                    fill="#CDBDB2"
                                    points="60.75 173.25 88.313 180.563 88.313 171 90.563 168.75 106.313 168.75 106.313 180 106.313 187.875 89.438 187.875 68.625 178.875"
                                />
                                <polygon
                                    fill="#CDBDB2"
                                    points="105.75 173.25 132.75 180.563 132.75 171 135 168.75 150.75 168.75 150.75 180 150.75 187.875 133.875 187.875 113.063 178.875"
                                    transform="matrix(-1 0 0 1 256.5 0)"
                                />
                                <polygon
                                    fill="#393939"
                                    points="90.563 152.438 88.313 171 91.125 168.75 120.375 168.75 123.75 171 121.5 152.438 117 149.625 94.5 150.188"
                                />
                                <polygon
                                    fill="#F89C35"
                                    points="75.375 27 88.875 58.5 95.063 150.188 117 150.188 123.75 58.5 136.125 27"
                                />
                                <polygon
                                    fill="#F89D35"
                                    points="16.313 96.188 .563 141.75 39.938 139.5 65.25 139.5 65.25 119.813 64.125 79.313 58.5 83.813"
                                />
                                <polygon fill="#D87C30" points="46.125 101.25 92.25 102.375 87.188 126 65.25 120.375" />
                                <polygon fill="#EA8D3A" points="46.125 101.813 65.25 119.813 65.25 137.813" />
                                <polygon fill="#F89D35" points="65.25 120.375 87.75 126 95.063 150.188 90 153 65.25 138.375" />
                                <polygon fill="#EB8F35" points="65.25 138.375 60.75 173.25 90.563 152.438" />
                                <polygon fill="#EA8E3A" points="92.25 102.375 95.063 150.188 86.625 125.719" />
                                <polygon fill="#D87C30" points="39.375 138.938 65.25 138.375 60.75 173.25" />
                                <polygon fill="#EB8F35" points="12.938 188.438 60.75 173.25 39.375 138.938 .563 141.75" />
                                <polygon fill="#E8821E" points="88.875 58.5 64.688 78.75 46.125 101.25 92.25 102.938" />
                                <polygon
                                    fill="#DFCEC3"
                                    points="60.75 173.25 90.563 152.438 88.313 170.438 88.313 180.563 68.063 176.625"
                                />
                                <polygon
                                    fill="#DFCEC3"
                                    points="121.5 173.25 150.75 152.438 148.5 170.438 148.5 180.563 128.25 176.625"
                                    transform="matrix(-1 0 0 1 272.25 0)"
                                />
                                <polygon
                                    fill="#393939"
                                    points="70.313 112.5 64.125 125.438 86.063 119.813"
                                    transform="matrix(-1 0 0 1 150.188 0)"
                                />
                                <polygon fill="#E88F35" points="12.375 .563 88.875 58.5 75.938 27" />
                                <path
                                    fill="#8E5A30"
                                    d="M12.3750002,0.562500008 L2.25000003,31.5000005 L7.87500012,65.250001 L3.93750006,67.500001 L9.56250014,72.5625 L5.06250008,76.5000011 L11.25,82.1250012 L7.31250011,85.5000013 L16.3125002,96.7500014 L58.5000009,83.8125012 C79.1250012,67.3125004 89.2500013,58.8750003 88.8750013,58.5000009 C88.5000013,58.1250009 63.0000009,38.8125006 12.3750002,0.562500008 Z"
                                />
                                <g transform="matrix(-1 0 0 1 211.5 0)">
                                    <polygon
                                        fill="#F89D35"
                                        points="16.313 96.188 .563 141.75 39.938 139.5 65.25 139.5 65.25 119.813 64.125 79.313 58.5 83.813"
                                    />
                                    <polygon fill="#D87C30" points="46.125 101.25 92.25 102.375 87.188 126 65.25 120.375" />
                                    <polygon fill="#EA8D3A" points="46.125 101.813 65.25 119.813 65.25 137.813" />
                                    <polygon fill="#F89D35" points="65.25 120.375 87.75 126 95.063 150.188 90 153 65.25 138.375" />
                                    <polygon fill="#EB8F35" points="65.25 138.375 60.75 173.25 90 153" />
                                    <polygon fill="#EA8E3A" points="92.25 102.375 95.063 150.188 86.625 125.719" />
                                    <polygon fill="#D87C30" points="39.375 138.938 65.25 138.375 60.75 173.25" />
                                    <polygon fill="#EB8F35" points="12.938 188.438 60.75 173.25 39.375 138.938 .563 141.75" />
                                    <polygon fill="#E8821E" points="88.875 58.5 64.688 78.75 46.125 101.25 92.25 102.938" />
                                    <polygon
                                        fill="#393939"
                                        points="70.313 112.5 64.125 125.438 86.063 119.813"
                                        transform="matrix(-1 0 0 1 150.188 0)"
                                    />
                                    <polygon fill="#E88F35" points="12.375 .563 88.875 58.5 75.938 27" />
                                    <path
                                        fill="#8E5A30"
                                        d="M12.3750002,0.562500008 L2.25000003,31.5000005 L7.87500012,65.250001 L3.93750006,67.500001 L9.56250014,72.5625 L5.06250008,76.5000011 L11.25,82.1250012 L7.31250011,85.5000013 L16.3125002,96.7500014 L58.5000009,83.8125012 C79.1250012,67.3125004 89.2500013,58.8750003 88.8750013,58.5000009 C88.5000013,58.1250009 63.0000009,38.8125006 12.3750002,0.562500008 Z"
                                    />
                                </g>
                            </g>
                        </svg>}>
                                MetaMask
                            </Button>
                        </Grid>
                        <Grid mt={1.7} xs={4}>
                            <Item >POPULAR</Item>
                        </Grid>
                    </Grid>
                </Box>
            </Dialog>
        </div>
    );
}
