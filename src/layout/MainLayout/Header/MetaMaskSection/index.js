import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { SNACKBAR_OPEN } from 'store/actions';

import { useSelector, useDispatch } from 'react-redux';
import { ethers, utils } from 'ethers';
import { Button } from '@mui/material';
// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
import { setWallet } from '../../../../redux/auth/actions';
const MetaMaskSection = () => {
    const user = useSelector((state) => state.auth.user);

    const dispatch = useDispatch();
    const [walletAddress, setWalletAddress] = useState();
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

            else if (window?.ethereum?.networkVersion !== '80001') {
              console.log('window?.ethereum?.networkVersion !== 80001', window?.ethereum?.networkVersion);
                dispatch({
                    type: SNACKBAR_OPEN,
                    open: true,
                    message: 'Please change your Chain ID to Mumbai',
                    variant: 'alert',
                    alertSeverity: 'info'
                });
                console.log('Please change your Chain ID to Mumbai');
                setWalletAddress()
            }
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
                // dispatch({
                //     type: SNACKBAR_OPEN,
                //     open: true,
                //     message: 'Success',
                //     variant: 'alert',
                //     alertSeverity: 'success'
                // });
            }
        } else {
            console.log('No crypto wallet found. Please install it.');
            // toast.error('No crypto wallet found. Please install it.');
        }
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
            <Button
                variant="outlined"
                onClick={() => {
                    handleConnect();
                }}
            >
                {walletAddress ? walletAddress.slice(0, 5) + '...' + walletAddress.slice(38, 42) : 'Connect'}
            </Button>
        </>
    );
};

export default MetaMaskSection;
