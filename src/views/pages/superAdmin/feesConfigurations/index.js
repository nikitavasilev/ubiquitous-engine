// material-ui
import { Grid, TextField, Button , CircularProgress } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import SubCard from 'ui-component/cards/SubCard';
import { gridSpacing } from 'store/constant';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NFTAbi from 'contractAbi/NFT.json';
import MarketplaceAbi from 'contractAbi/Marketplace.json';
import MarketplaceAddress from 'contractAbi/Marketplace-address.json';
import Erc20 from 'contractAbi/Erc20.json';
import { ethers, utils } from 'ethers';
import { useState } from 'react';
import { SNACKBAR_OPEN } from 'store/actions';

// ==============================|| TEXTFIELD PAGE ||============================== //

const Configuration = () => {
    const dispatch = useDispatch();

    const [loader, setLoader] = useState(false);
    const user = useSelector((state) => state.auth.user);

    const [loaderAddress, setLoaderAddress] = useState(false);
    const [marketFee, setMarketFee] = useState('');
    const [recieverAddress, setRecieverAddress] = useState('');
    const checkWallet = async () => {
       
    };
    const marketplaceFeeFunc = async (e) => {
        e.preventDefault();
        if(marketFee !=''){
            const response = await window?.ethereum?.request({ method: 'eth_requestAccounts' });
            let connectWallet = await ethereum._metamask.isUnlocked();
    
            if ((window.ethereum && connectWallet) == false) {
                dispatch({
                    type: SNACKBAR_OPEN,
                    open: true,
                    message: 'No crypto wallet found. Please connect one',
                    variant: 'alert',
                    alertSeverity: 'info'
                });
                console.log('No crypto wallet found. Please install it.');
                // toast.error('No crypto wallet found. Please install it.');
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
               
            } else {
                setLoader(true);
            }
            
        }else{
            console.log('redy');
            toast.error('Market fee is required!');
        }
      
     
        console.log('marketFee', marketFee);
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        const nft = new ethers.Contract(MarketplaceAddress.address, MarketplaceAbi.abi, signer);

        await (await nft.setFee(marketFee)).wait();
        setMarketFee('');
        toast.success('successfully Submit');
        setLoader(false);
        
    };

    const recieverAddressFunc = async (e) => {
        e.preventDefault();
       
        if(recieverAddress !=''){
            const response = await window?.ethereum?.request({ method: 'eth_requestAccounts' });
            let connectWallet = await ethereum._metamask.isUnlocked();
    
            if ((window.ethereum && connectWallet) == false) {
                dispatch({
                    type: SNACKBAR_OPEN,
                    open: true,
                    message: 'No crypto wallet found. Please connect one',
                    variant: 'alert',
                    alertSeverity: 'info'
                });
                console.log('No crypto wallet found. Please install it.');
                // toast.error('No crypto wallet found. Please install it.');
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
               
            } else {
                setLoaderAddress(true);
            }
           
        }else{
            console.log('redy');
            toast.error('Address is required!');
        }
        console.log('recieverAddress', recieverAddress);
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        const nft = new ethers.Contract(MarketplaceAddress.address, MarketplaceAbi.abi, signer);

        await (await nft.setAddress(recieverAddress)).wait();

        setRecieverAddress('');
        toast.success('successfully Submit');
        setLoaderAddress(false)
    };

    return (
        <>
            <MainCard title="Setting marketplace fees">
                <Grid container spacing={gridSpacing}>
                    <Grid item xs={12} md={6}>
                        <SubCard title="Enter Marketplace Fee">
                            <form  onSubmit={marketplaceFeeFunc}>
                                <Grid container spacing={3}>
                                    <Grid item xs={12}>
                                        <TextField
                                            value={marketFee}
                                            onChange={(e) => {
                                                // console.log('e.target.event', e.target.value);
                                                setMarketFee(e.target.value);
                                            }}
                                            fullWidth
                                            id="filled-basic"
                                            type="number"
                                            InputProps={{
                                                inputProps: { min: 0 }
                                            }}
                                            label="Marketplace Fee"
                                            variant="standard"
                                        />
                                    </Grid>
                                    {loader==false?  
                                         <Grid item xs={12}>
                                    <Button  type="submit" variant="contained">
                                        Submit
                                    </Button>
                                </Grid>
                            :
                            <Grid item xs={12}>
                            <Button>
                               <CircularProgress/>
                            </Button>
                        </Grid>
                        }
                                  
                                   
                                </Grid>
                            </form>
                        </SubCard>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <SubCard title="Receiver Address">
                            <form onSubmit={recieverAddressFunc}>
                                <Grid container spacing={3}>
                                    <Grid item xs={12}>
                                        <TextField
                                            value={recieverAddress}
                                            fullWidth
                                            id="filled"
                                            label="Receiver Address"
                                            variant="standard"
                                            onChange={(e) => {
                                                setRecieverAddress(e.target.value);
                                            }}
                                        />
                                    </Grid>
                                    {loaderAddress==false?  
                                        <Grid item xs={12}>
                                   <Button type="submit" variant="contained">
                                       Submit
                                   </Button>
                               </Grid>
                           :
                           <Grid item xs={12}>
                           <Button>
                              <CircularProgress/>
                           </Button>
                       </Grid>
                       }
                                </Grid>
                            </form>
                        </SubCard>
                    </Grid>
                </Grid>
            </MainCard>
        </>
    );
};

export default Configuration;
