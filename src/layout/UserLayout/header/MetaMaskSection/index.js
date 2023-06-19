import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { SNACKBAR_OPEN } from 'store/actions';
import { useTheme } from '@mui/material/styles';

import { useSelector, useDispatch } from 'react-redux';
import { ethers, utils } from 'ethers';
import { Button } from '@mui/material';
// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
import { setWallet } from '../../../../redux/auth/actions';
const MetaMaskSection = () => {
    const theme = useTheme();

    const user = useSelector((state) => state.auth.user);
    console.log('user.walletAddress', user?.walletAddress);
    const dispatch = useDispatch();
    const [walletAddress, setWalletAddress] = useState();
    const [balanceValue, setbalanceValue] = useState();
   

    const handleConnect = async () => {
      
         
        const response = await window?.ethereum?.request({ method: 'eth_requestAccounts' });
        console.log('response',response);
        const provider = ethers.getDefaultProvider("https://polygon-mumbai.g.alchemy.com/v2/Wk2k1fN6Gv2KG4f7474ABGxpmhQrZKFM");
        const balance= await  provider?.getBalance(response[0]);
        console.log(balance)
        const value= ethers.utils.formatEther(balance);
        console.log(value, 'value')
        setbalanceValue(value)
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

            // else if (window?.ethereum?.networkVersion !== '5' || true) {
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
            else if (utils?.getAddress(response[0]) !== user.walletAddress) {
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
                    message: 'Wallet Connected',
                    variant: 'alert',
                    alertSeverity: 'success'
                });
            }
        } else {
            console.log('No crypto wallet found. Please install it.');
            // toast.error('No crypto wallet found. Please install it.');
        }
    };  

    useEffect(() => {
        // setbalanceValue(value)
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
            <Button 
                sx={{
                    //  marginRight: '-10px',
                 display: { xs: 'none', lg: 'block' } , float:{md:'right'} ,
                 color: theme.palette.mode === 'dark' ? '#CDCDCD' : '#9e9e9e' }}
                variant="text"
                onClick={() => {
                    handleConnect();
                }}
            >
                {walletAddress ? walletAddress.slice(0, 5) + '...' + walletAddress.slice(38, 42) : 'Connect to MetaMask'}
            </Button>
        </>
    );
};

export default MetaMaskSection;
