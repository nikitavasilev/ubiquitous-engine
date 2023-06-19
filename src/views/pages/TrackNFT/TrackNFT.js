import { Box, Grid, Stack } from '@mui/material';
import { useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import '@fontsource/public-sans';
import React, { useState } from 'react';
import { Button } from '@mui/material';
import { Typography, CircularProgress } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import CircularStatic from 'views/auth/verifyEmail/circularbar';
import { SNACKBAR_OPEN } from 'store/actions';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TextField from '@material-ui/core/TextField';
import galileoLogo from '../../../assets/images/galileo-white.png';
import { padding } from '@mui/system';
import music from '../../../assets/vedio.mp4';
import { useNavigate } from 'react-router-dom';
import FactoryAbi from 'contractAbi/Factory.json';
import { getTrack } from 'redux/marketplace/actions';
import FactoryAddress from 'contractAbi/Factory-address.json';
import { ethers, utils } from 'ethers';
import { setWallet } from 'redux/auth/actions';
const TrackNFT = () => {
  const [serialNo, setSerialNo] = useState('');
  const [rest, setRest] = useState('');
  const [success, setSuccess] = useState(false);
  const [token, setToken] = useState();
  const [addres, setAddres] = useState();
  const [seconds, setSeconds] = useState();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    let interval = null;

    if (seconds > 0) {
      interval = setInterval(() => {
        setSeconds((seconds) => seconds - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [seconds]);

  const navigate = useNavigate();
  const [walletAddress, setWalletAddress] = useState();
  {
    /*  const handleConnect = async () => {
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

          
            else if (utils?.getAddress(response[0]) !== user?.walletAddress) {
                dispatch({
                    type: SNACKBAR_OPEN,
                    open: true,
                    message: 'Please connect your registered Wallet Address',
                    variant: 'alert',
                    alertSeverity: 'info'
                });
                console.log('Please connect your registered Wallet Address');
                setWalletAddress();
            } else {
                const address = utils?.getAddress(response[0]);
                setWalletAddress(address);
                dispatch({
                    type: SNACKBAR_OPEN,
                    open: true,
                    message: 'wallet connected',
                    variant: 'alert',
                    alertSeverity: 'success'
                });
            }
        } else {
            console.log('No crypto wallet found. Please install it.');
            // toast.error('No crypto wallet found. Please install it.');
        }
    }; */
  }

  {
    /*  useEffect(() => {
        dispatch(setWallet(walletAddress));
        handleConnect();
    }, [walletAddress]);

    if (window.ethereum) {
        window.ethereum.on('accountsChanged', function (accounts) {
           
            handleConnect();
        });
    } */
  }
  const searchSerial = async () => {
    console.log('serialNo', serialNo);
    setSuccess(true);
    if (serialNo == '') {
      setSuccess(false);
      toast.error('Please enter valid serial Id');
      console.log('Invalid serial Id!');
    }

    //  const provider = new ethers.providers.Web3Provider(window.ethereum);
    //  const signer = provider.getSigner();
    //const signer="0x6f3B51bd5B67F3e5bca2fb32796215A796B79651";
    const provider = new ethers.providers.JsonRpcProvider('https://polygon-mumbai.g.alchemy.com/v2/ZXH0joDgntCcC0smUwnYIZc8x2CdsaM8');
    const factoryAddr = new ethers.Contract(FactoryAddress.address, FactoryAbi.abi, provider);
    console.log('factoryAddr', factoryAddr);

    // let res = await (
    //     await factoryAddr.serials("GALGNS1")
    // )?.wait();
    let res = await factoryAddr.serials(serialNo);
    setRest(res);
    console.log('res', rest);
    // if (rest == '') {
    //     toast.error('Could not get the token!');
    //     }

    let address = res[0].toLowerCase();
    address = address;
    setAddres(address);
    let tokenId = parseInt(res[1]._hex);

    console.log('res?._tokenId?', res);
    tokenId = tokenId.toString();

    tokenId = tokenId;
    if (tokenId == '0' && serialNo != '') {
      toast.error('Incorrect serial Id!');
      console.log('Incorrect serial Id!');
    } else {
      // setSuccess(true);
      // console.log(seconds);
    }
    setToken(tokenId);
    // let address = `"0x4600b6a0f068ae1283ed68792ff3f0a085b3f0ef"`;
    // let tokenId = `"1"`;
    // const dispatch = useDispatch();
    console.log('address', address);
    console.log('tokenId', tokenId);
  };

  if (seconds == 0) {
    if (token != undefined && token != '0') {
      navigate('/tracking/' + serialNo, {
        state: {
          tokenId: token,
          address: addres
        }
      });
    } else {
    }
  }

  return (
    <Stack position={'relative'} sx={{ height: '100vh', overflow: 'hidden' }}>
      {/* <Stack className="mainTracking main"></Stack> */}

      <video src={music} loop autoPlay="true" />
      <Grid item md={12} xs={12} position={'absolute'} sx={{ width: '100%' }}>
        <Grid container-fluid>
          <Grid sx={{ textAlign: 'center', marginTop: '30px' }}>
            <img className="mainLogo" src={galileoLogo} alt="logo" />
          </Grid>
          <Grid
            sx={{
              marginTop: { xs: '100px', md: '200px' },
              marginLeft: { xs: '20px', md: '0px' },
              marginRight: { xs: '20px', md: 'none' }
            }}
          >
            <Typography
              variant="h1"
              sx={{
                fontFamily: 'Public Sans !important',
                fontStyle: 'normal !important',
                fontWeight: '700',
                textAlign: 'center',
                fontSize: { xs: '12px', sm: '30px', md: '30px', lg: '30px' },
                lineHeight: { xs: '1', sm: '1', md: '33px', lg: '33px' },

                color: 'white'
              }}
            >
              Track your NFT history{' '}
            </Typography>
            <Box className="trackBox">
              <input
                className="trackInput"
                placeholder="Serial Id"
                onChange={(e) => {
                  setSerialNo(e.target.value);
                }}
              />
              {success == true && token != '0' ? (
                <Button
                  sx={{ alignSelf: 'center !important' }}
                  className="createTrack"
                  size="small"
                  variant="outlined"
                  onClick={() => {
                    setSeconds(3);
                    searchSerial();
                  }}
                >
                  <CircularProgress sx={{ width: '30px !important', height: '30px  !important', color: '#ffff' }} />
                </Button>
              ) : (
                <Button
                  sx={{ alignSelf: 'center !important' }}
                  className="createTrack"
                  size="small"
                  variant="contained"
                  color="secondary"
                  onClick={() => {
                    setSeconds(6);
                    // handleConnect();
                    searchSerial();
                  }}
                >
                  Track
                </Button>
              )}
            </Box>
            <Grid container justifyContent="center">
              <Typography
                variant="h4"
                mt={-1}
                mb={1}
                sx={{
                  fontFamily: 'Public Sans !important',
                  fontStyle: 'normal !important',
                  fontWeight: '600',
                  textAlign: 'center',
                  fontSize: { xs: '12px', sm: '15px', md: '15px', lg: '15px' },
                  // lineHeight: { xs: '1', sm: '1', md: '33px', lg: '33px' },

                  color: '#2fc1ff'
                }}
              >
                {success == true && token != '0' ? 'Please wait for tracking...' : ''}
              </Typography>
            </Grid>
            <Box>
              <Typography
                variant="h4"
                sx={{
                  fontFamily: 'Public Sans !important',
                  fontStyle: 'normal !important',
                  fontWeight: '400',
                  textAlign: 'center',
                  fontSize: { xs: '12px', sm: '15px', md: '15px', lg: '15px' },
                  // lineHeight: { xs: '1', sm: '1', md: '33px', lg: '33px' },

                  color: 'white'
                }}
              >
                By initiating authentication, you declare that you accept our{' '}
                <a href="" style={{ color: '#ffff' }}>
                  Legal Notice
                </a>{' '}
                and{' '}
                <a href="" style={{ color: '#ffff' }}>
                  Privacy Policy.
                </a>
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </Stack>
  );
};

export default TrackNFT;
