import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { SNACKBAR_OPEN } from 'store/actions';
import { useTheme } from '@mui/material/styles';
import { Typography, Grid } from '@mui/material';
import CryptoConvert from 'crypto-convert';
import { useSelector, useDispatch } from 'react-redux';
import { ethers, utils } from 'ethers';
import { Button } from '@mui/material';
// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
import { setWallet } from '../../../../redux/auth/actions';
import Erc20 from '../../../../contractAbi/Erc20.json';
import BLOCKCHAIN from '../../../../../src/constants';

const convert = new CryptoConvert(/*options?*/);

const Balance = () => {
    const theme = useTheme();

    const user = useSelector((state) => state.auth.user);
    // console.log('user.walletAddress', user?.walletAddress);
    const dispatch = useDispatch();
    const [walletAddress, setWalletAddress] = useState();
    // const [bvalue, setBvalue] = useState(0);
    const [balanceValue, setbalanceValue] = useState();
    const [maticValue, setMaticValue] = useState();

    const handleConnect = async () => {
        const response = await window?.ethereum?.request({ method: 'eth_requestAccounts' });
        const maticprovider = ethers.getDefaultProvider('https://polygon-mumbai.g.alchemy.com/v2/ZXH0joDgntCcC0smUwnYIZc8x2CdsaM8');
        const maticbalance = await maticprovider?.getBalance(response[0]);
        console.log(maticbalance);
        const maticvalue = ethers.utils?.formatEther(maticbalance);
        console.log(maticvalue, 'value');
        setMaticValue(maticvalue);

        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const address = signer.getAddress();
        let erc20Address = BLOCKCHAIN.ERC20;

        const token = new ethers.Contract(erc20Address, Erc20.abi, signer);

        let balance = await token.balanceOf(address);
        let value = utils.formatEther(balance);
        console.log(value, 'balance********** ');
        setbalanceValue(value);

        {
            /*  const maticvalue = ethers.utils?.formatEther(balance);
        console.log(maticvalue, 'value***yy');
        setMaticValue(maticvalue);
       // let val;
        // const arrow = async ()=>{

        await convert.ready(); //Wait for the initial cache to load

        const bvalue = convert.MATIC.USD(value);
        console.log(bvalue, 'val===');

        // }
        setbalanceValue(bvalue); */
        }
        // console.log(bvalue,'val===???????????????????')
        if (response) {
            if (!window.ethereum) {
                console.log('No crypto wallet found. Please install it.');
            } else if (utils?.getAddress(response[0]) !== user.walletAddress) {
                console.log('Please connect your registered Wallet Address');
                setWalletAddress();
            } else {
                const address = utils?.getAddress(response[0]);
                setWalletAddress(address);
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

    // console.log('balanceValue', balanceValue);

    return (
        <>
            <Grid item xs={12}>
                <Typography
                    className="usd"
                    variant="h1"
                    component="h2"
                    sx={{ color: theme.palette.mode === 'dark' ? '#fff' : '#000' }}
                    onClick={() => {
                        handleConnect();
                        // handleConnect().arrow();
                    }}
                >
                    {maticValue ? maticValue.slice(0, 5) : 0} MATIC
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography
                    className="balance"
                    variant="body2"
                    sx={{ textAlign: 'center', color: theme.palette.mode === 'dark' ? '#CDCDCD' : '#6d6e72' }}
                >
                    Total Balance
                </Typography>
            </Grid>

            <Grid item xs={12}>
                <Typography
                    className="usd"
                    variant="h1"
                    component="h2"
                    sx={{ textAlign: 'center', color: theme.palette.mode === 'dark' ? '#CDCDCD' : '#6d6e72' }}
                    onClick={() => {
                        handleConnect();
                        // handleConnect().arrow();
                    }}
                >
                    {balanceValue ? balanceValue.slice(0, 10) : 0} USDT {/*  {balanceValue ? balanceValue : 0} USDT */}
                </Typography>
            </Grid>
        </>
    );
};

export default Balance;
