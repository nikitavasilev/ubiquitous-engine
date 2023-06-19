import { forwardRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from '@mui/material/styles';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Slide,
  DialogContentText,
  Typography,
  CircularProgress,
} from '@mui/material';
import { requestNftForMinting } from 'redux/nftManagement/actions';
import Erc20 from '../../../../../contractAbi/Erc20.json';
import { ethers, utils } from 'ethers';
import BLOCKCHAIN from '../../../../../constants';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { SNACKBAR_OPEN } from 'store/actions';

const Transition = forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);
export default function RequestForMintDialog({ open, setOpen, page, limit, search, type, nftData, categoryId }) {
  const theme = useTheme();
  const [loader, setLoader] = useState(false);
  const dispatch = useDispatch();
  const handleClose = () => {
    setOpen(false);
    setLoader(false);
  };
  const user = useSelector((state) => state.auth.user);
  // console.log('nftData', nftData.Category.BrandCategories[0].contractAddress);

  const checkWallet = async () => {
    const response = await window?.ethereum?.request({ method: 'eth_requestAccounts' });
    let connectWallet = await ethereum._metamask.isUnlocked();

    if ((window.ethereum && connectWallet) == false) {
      dispatch({
        type: SNACKBAR_OPEN,
        open: true,
        message: 'No crypto wallet found. Please connect one',
        variant: 'alert',
        alertSeverity: 'info',
      });
      console.log('No crypto wallet found. Please install it.');
      // toast.error('No crypto wallet found. Please install it.');
      setOpen(false);
      setLoader(false);
    }

    // else if (window?.ethereum?.networkVersion !== '5') {
    //     dispatch({
    //         type: SNACKBAR_OPEN,
    //         open: true,
    //         message: 'Please change your Chain ID to Goerli',
    //         variant: 'alert',
    //         alertSeverity: 'info'
    //     });
    //     console.log('Please change your Chain ID to Goerli');
    //     setOpen(false);
    //     setLoader(false);
    // }
    else if (utils?.getAddress(response[0]) !== user.walletAddress) {
      dispatch({
        type: SNACKBAR_OPEN,
        open: true,
        message: 'Please connect your registered Wallet Address',
        variant: 'alert',
        alertSeverity: 'info',
      });
      console.log('Please connect your registered Wallet Address');
      setOpen(false);
      setLoader(false);
    } else {
      return true;
    }
  };

  const handleMintRequest = async () => {
    if (await checkWallet()) {
      try {
        setLoader(true);
        let erc20Address = BLOCKCHAIN.ERC20;
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();

        const token = new ethers.Contract(erc20Address, Erc20.abi, signer);

        // let data = await (await token.approve(nftData.Category.BrandCategories[0].contractAddress,"100000000000000000000000000000000000000")).wait();
        // let balance= await token.balanceOf(user.walletAddress);
        // if(balance> )
        let price = ethers.utils.parseEther('10000000000000000000000');
        let approvalAmount = await token.allowance(user.walletAddress, nftData.Category.BrandCategories[0].contractAddress);
        console.log('hy');
        //    console.log(balance.toString())
        let approvePrice = ethers.utils.parseEther('10000000000000000000');
        if (approvalAmount.toString() < price.toString()) {
          await (await token.approve(nftData.Category.BrandCategories[0].contractAddress, approvePrice)).wait();
        }
        0;

        await dispatch(
          requestNftForMinting({
            id: nftData.id,
            categoryId: categoryId,
            page: page,
            limit: limit,
            search: search,
            type: type,
            brandId: user.BrandId,
            handleClose: handleClose,
          })
        );
        setLoader(false);
        // toast.success("Please wait for confirmation Notification !");
      } catch (error) {
        console.log('error', error);
        toast.error(error.reason);
        setOpen(false);
        setLoader(false);
      }
    }
  };
  return (
    <>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        // onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title1"
        aria-describedby="alert-dialog-slide-description1"
      >
        <DialogTitle id="alert-dialog-slide-title1">Request Sub Admin for mint</DialogTitle>

        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description1">
            <Typography variant="body2" component="span">
              Are you sure you want to request Sub Admin to mint this NFT?
            </Typography>
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ pr: 2.5 }}>
          {loader ? (
            <CircularProgress />
          ) : (
            <>
              <Button
                sx={{ color: theme.palette.error.dark, borderColor: theme.palette.error.dark }}
                onClick={handleClose}
                color="secondary"
              >
                No
              </Button>
              <Button
                variant="contained"
                size="large"
                onClick={() => {
                  handleMintRequest();
                }}
              >
                Yes
              </Button>
            </>
          )}
        </DialogActions>
      </Dialog>
    </>
  );
}
