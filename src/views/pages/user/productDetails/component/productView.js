// material-ui
import { useTheme } from '@mui/material/styles';

import { CardMedia, Grid, Typography, Button, Alert, InputLabel, Select, FormControl, Box, MenuItem } from '@mui/material';

import React, { useEffect } from 'react';
import Avatar from 'ui-component/extended/Avatar';

import { gridSpacing } from 'store/constant';
import { ethers, utils } from 'ethers';
import NFTAbi from '../../../../../contractAbi/NFT.json';
import MarketplaceAbi from '../../../../../contractAbi/Marketplace.json';
import MarketplaceAddress from '../../../../../contractAbi/Marketplace-address.json';
import Erc20 from '../../../../../contractAbi/Erc20.json';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector, useDispatch } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import { useState } from 'react';
import { buyNft, resellNft, redeemNft, getNftBuyer, addDeliveryNft, changeTokenId } from 'redux/nftManagement/actions';
// import ResellDialog from "./resellDialog"
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import BLOCKCHAIN from '../../../../../constants';
import CircularProgress from '@mui/material/CircularProgress';
import { SNACKBAR_OPEN } from 'store/actions';
import { setLoader } from 'redux/auth/actions';
import serialId from '../../commonComponent/serialId';
import FactoryAbi from 'contractAbi/Factory.json';
import { getTrack } from 'redux/marketplace/actions';
import FactoryAddress from 'contractAbi/Factory-address.json';
import TruncatedText from 'utils/TruncatedText';
import { ProofsDropdown } from './ProofsDropdown';

// =============================|| LANDING - FEATURE PAGE ||============================= //

const PropertiesView = ({ nftList }) => {
  const dispatch = useDispatch();
  const [resell, setResell] = useState(false);
  const [bought, setBought] = useState(false);
  const [redeem, setRedeem] = useState(false);
  const [loader, setLoader] = useState(false);
  const [redeemLoader, setRedeemLoader] = useState(false);
  const [resellLoader, setResellLoader] = useState(false);
  const [lazyTokenId, setLazyTokenId] = useState('');
  const [expandDescription, setExpandDescription] = useState(false);

  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  const [age, setAge] = useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };
  const theme = useTheme();

  const [open, setOpen] = React.useState(false);
  let rprice = 0;
  const ResellDialog = () => {
    const handleClickOpen = () => {
      setOpen(true);
    };

    const handleClose = () => {
      setOpen(false);
    };

    return (
      <Grid sx={{ width: '100%' }}>
        <Button
          sx={{ float: { md: 'right' } }}
          className="buy"
          variant="contained"
          size="large"
          onClick={() => {
            if (nftList?.nft?.mintType == 'directMint') {
              setOpen(true);
            } else if (nftList?.nft?.mintType == 'lazyMint') {
              handleResellNft();
            }
          }}
        >
          Resell
        </Button>
        <Dialog
          open={open}
          // onClose={handleClose}
        >
          <DialogTitle>Resale</DialogTitle>
          <DialogContent>
            <DialogContentText>Please enter the selling price for NFT in USDT</DialogContentText>
            <TextField
              autoFocus
              type="number"
              margin="dense"
              label="Price "
              fullWidth
              variant="standard"
              // value={rprice}
              onChange={(e) => {
                rprice = e.target?.value;
              }}
              InputProps={{ inputProps: { min: 0 } }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={() => {
                handleResellNft();
              }}
            >
              Resell
            </Button>
          </DialogActions>
        </Dialog>
        <Grid></Grid>
      </Grid>
    );
  };

  const buyNftResolve = () => {
    setBought(true);
    setLoader(false);
  };

  const redeemNftResolve = () => {
    setRedeem(true);
    setRedeemLoader(false);
  };

  const resellNftResolve = () => {
    setResell(true);
    setResellLoader(false);
    setOpen(false);
  };
  const [token, setToken] = useState();
  const [addres, setAddres] = useState();

  const searchSerial = async (serialId) => {
    // if (serialId == '') {
    //     setSuccess(false);
    //     toast.error('Please enter valid serial Id');
    //
    // }

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const factoryAddr = new ethers.Contract(FactoryAddress.address, FactoryAbi.abi, signer);
    console.log('factoryAddr', factoryAddr);

    // let res = await (
    //     await factoryAddr.serials("GALGNS1")
    // )?.wait();
    let res = await factoryAddr.serials(serialId);
    // setRest(res);
    console.log('res', res);
    // if (rest == '') {
    //     toast.error('Could not get the token!');
    //     }
    let address = res[0].toLowerCase();
    address = address;
    setAddres(address);
    let tokenId = parseInt(res[1]._hex);

    tokenId = tokenId.toString();
    tokenId = tokenId;
    // if (tokenId == '0' && serialId != '') {
    //     toast.error('Incorrect serial Id!');
    //
    // } else {
    //     setSuccess(true);
    //
    // }
    setToken(tokenId);
    // let address = `"0x4600b6a0f068ae1283ed68792ff3f0a085b3f0ef"`;
    // let tokenId = `"1"`;
    // const dispatch = useDispatch();

    // if (token != undefined && token != '0') {

    navigate('/tracking/' + serialId, {
      state: {
        tokenId: tokenId,
        address: address,
      },
    });
    // }
    // setSuccess(true);
  };
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
    } else {
      return true;
    }
  };

  const handleBuyNft = async () => {
    if (user == null) {
      navigate('/login');
    } else if (await checkWallet()) {
      if (nftList?.nft?.mintType == 'directMint') {
        console.log('im in handlebuy');
        try {
          setLoader(true);

          let erc20Address = BLOCKCHAIN.ERC20;
          let tokenId = parseInt(nftList?.nft?.NFTTokens[0].tokenId);
          let contractAddress = nftList?.nft?.contractAddress;
          let price = ethers.utils.parseEther(nftList?.nft?.price.toString());
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const signer = provider.getSigner();
          const address = signer.getAddress();

          const marketplace = new ethers.Contract(MarketplaceAddress.address, MarketplaceAbi.abi, signer);
          console.log('price', price);
          console.log('marketplace', MarketplaceAddress.address);

          const token = new ethers.Contract(erc20Address, Erc20.abi, signer);
          // await (await token.approve(MarketplaceAddress.address, price)).wait();

          let balance = await token.balanceOf(address);
          if (balance < price.toString()) {
            toast.error('Insufficient Balance');
          }
          let approvalAmount = await token.allowance(address, MarketplaceAddress.address);

          let approvePrice = ethers.utils.parseEther('1000000');
          if (approvalAmount.toString() < price.toString()) {
            await (await token.approve(MarketplaceAddress.address, approvePrice)).wait();
          }

          // -------------
          // let approvalAmount = await token.allowance(address, MarketplaceAddress.address);

          // let approvePrice = ethers.utils.parseEther('10000');
          // if (approvalAmount.toString() < nft.price.toString()) {
          //     await (await token.approve(MarketplaceAddress.address, approvePrice)).wait();
          // }
          // ---------------
          console.log('tokenId, contractAddress, price from product view', tokenId, contractAddress, price);
          await (await marketplace.purchaseItem(tokenId, contractAddress, price))
            .wait()
            .then((data) => {
              dispatch(
                buyNft({
                  nftId: nftList?.nft?.id,
                  nftToken: nftList?.nft?.NFTTokens[0].id,
                  buyerAddress: data.from,
                  contractAddress: contractAddress,
                  buyNftResolve: buyNftResolve,
                })
              );
            })
            .catch((error) => {
              console.log('error', error);
              setLoader(false);
              toast.error(error.reason);
            });
        } catch (error) {
          console.log('error', error);
          setLoader(false);
          toast.error(error.reason);
        }
      } else if (nftList?.nft?.mintType == 'lazyMint') {
        console.log('HY LAZY HERE ');
        try {
          setLoader(true);
          let signers = nftList?.nft?.signerAddress;
          let erc20Address = BLOCKCHAIN.ERC20;
          // let signature = nftList?.nft?.NFTTokens[0].signature;
          let contractAddress = nftList?.nft?.contractAddress;
          // let contractAddress = "0x2750aE21C32f8De4C3CaE1230efAd2Fb497263b8"
          // const SIGNING_DOMAIN = 'Galileo-Protocol';
          // const SIGNATURE_VERSION = '1';

          // const domain = {
          //     name: SIGNING_DOMAIN,
          //     version: SIGNATURE_VERSION,
          //     verifyingContract: contractAddress,
          //     chainId: 5
          // };
          // const types = {
          //     GalileoVoucher: [
          //         { name: 'uri', type: 'string' },
          //         { name: 'price', type: 'uint256' },
          //         { name: 'token', type: 'address' }
          //     ]}
          // let contractAddress = "0x6e9550E5fee2bE7BdB208214e9cE2B47131a5Ca0";
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const signer = provider.getSigner();
          const address = signer.getAddress();

          console.log('im in 255');

          const nfts = new ethers.Contract(contractAddress, NFTAbi.abi, signer);
          console.log('nfts', nfts);
          let nftPrice = nftList?.nft?.price.toString();

          let prices = ethers.utils.parseEther(nftPrice);

          let voucher = {
            uri: nftList?.nft?.tokenUri,
            price: prices.toString(),
            token: erc20Address,
            signature: nftList?.nft?.NFTTokens[0].signature,
          };
          console.log(voucher, 'voucher');
          let validatorAddress = '0x6f3b51bd5b67f3e5bca2fb32796215a796b79651';
          const token = new ethers.Contract(erc20Address, Erc20.abi, signer);
          // const signature = await signer._signTypedData(domain, types, voucher);
          // const verifyAddr = ethers.utils.verifyTypedData(domain, types, voucher, signature);
          //console.log(verifyAddr);

          // let approvalAmount = await token.allowance(address, contractAddress);

          // let approvePrice = ethers.utils.parseEther('10000');
          // if (approvalAmount.toString() < nft.price.toString()) {
          //     await (await token.approve(contractAddress, approvePrice)).wait();
          // }
          // await (await token.approve(contractAddress, '100000000000000000000000000000000000000')).wait();
          console.log(voucher, 'voucher');
          console.log(nftList?.nft?.minterAddress);
          console.log(erc20Address);

          console.log(nftList?.nft?.requesterAddress);

          let balance = await token.balanceOf(address);
          if (balance < voucher.price) {
            toast.error('Insufficient Balance');
          }
          let approvalAmount = await token.allowance(address, contractAddress);

          let approvePrice = ethers.utils.parseEther('1000000');
          if (approvalAmount.toString() < voucher.price) {
            await (await token.approve(contractAddress, approvePrice)).wait();
          }

          try {
            let mintedNFT = await (await nfts.buyNft(voucher, nftList?.nft?.minterAddress, nftList?.nft?.requesterAddress)).wait();
            const id = parseInt(mintedNFT.events[0].args[2]);
            console.log('mintedNFT', mintedNFT);
            console.log('id', id);

            let serialId = await nfts.serialid(id);

            console.log('serialId', serialId);

            setLazyTokenId(id.toString());
            dispatch(
              changeTokenId({
                id: nftList?.nft?.NFTTokens[0].id,
                tokenId: id.toString(),
              })
            );
            console.log('im before lazy dispatch');
            dispatch(
              buyNft({
                nftId: nftList?.nft?.id,
                nftToken: nftList?.nft?.NFTTokens[0].id,
                buyerAddress: mintedNFT.from,
                contractAddress: contractAddress,
                serialId: serialId,
                buyNftResolve: buyNftResolve,
              })
            );
          } catch (error) {
            console.log('error', error);
            toast.error(error.reason);
          }
        } catch (error) {
          setLoader(false);
          toast.error(error.reason);
          console.log('error', error);
        }
      }
    }
  };

  const handleResellNft = async () => {
    if (user == null) {
      navigate('/login');
    } else if (await checkWallet()) {
      if (nftList?.nft?.mintType == 'directMint') {
        try {
          setResellLoader(true);
          let erc20Address = BLOCKCHAIN.ERC20;
          let tokenId = parseInt(nftList?.nft?.NFTTokens[0].tokenId);
          let contractAddress = nftList?.nft?.contractAddress;

          let rrprice = ethers.utils.parseEther(rprice.toString());

          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const signer = provider.getSigner();

          const nfts = new ethers.Contract(contractAddress, NFTAbi.abi, signer);
          const marketplace = new ethers.Contract(MarketplaceAddress.address, MarketplaceAbi.abi, signer);

          await (await nfts.approve(MarketplaceAddress.address, tokenId)).wait();
          await (await marketplace.resellItem(tokenId, contractAddress, rrprice))
            .wait()
            .then((data) => {
              dispatch(
                resellNft({
                  rprice: rprice,
                  nftId: nftList?.nft?.id,
                  nftToken: nftList?.nft?.NFTTokens[0].id,
                  buyerAddress: data.from,
                  contractAddress: contractAddress,
                  resellNftResolve: resellNftResolve,
                })
              );
              toast.success('NFT is Resold');
            })
            .catch((error) => {
              console.log('error', error);
              toast.error(error.reason);
            });
        } catch (error) {
          setResellLoader(false);
          toast.error(error.reason);
          setOpen(false);
          console.log('error', error);
        }
      } else if (nftList?.nft?.mintType == 'lazyMint') {
        try {
          setResellLoader(true);
          console.log('hy');
          let erc20Address = BLOCKCHAIN.ERC20;
          // let tokenId = parseInt(nftList?.nft?.NFTTokens[0].tokenId);
          let tokenId;
          if (lazyTokenId == '') {
            tokenId = parseInt(nftList?.nft?.NFTTokens[0].tokenId);
          } else {
            tokenId = parseInt(lazyTokenId);
          }
          console.log('tokenId from resell', tokenId);
          let contractAddress = nftList?.nft?.contractAddress;
          let nftPrice = nftList?.nft?.price.toString();
          let rrprice = ethers.utils.parseEther(nftPrice);
          rrprice = rrprice.toString();
          let buyer = buyerNft?.buyer?.buyerAddress;

          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const signer = provider.getSigner();
          console.log('signer', signer);
          const nfts = new ethers.Contract(contractAddress, NFTAbi.abi, signer);
          const marketplace = new ethers.Contract(MarketplaceAddress.address, MarketplaceAbi.abi, signer);
          console.log('MARKETPLACE', marketplace);
          console.log('erc20Address, tokenId, contractAddress, rrprice,buyer', erc20Address, tokenId, contractAddress, rrprice, buyer);
          //await (await nfts.approve(MarketplaceAddress.address, tokenId)).wait();
          // console.log("tokenid",tokenId)
          await (await marketplace.makeItem(erc20Address, tokenId, contractAddress, rrprice, buyer))
            .wait()
            .then((data) => {
              dispatch(
                resellNft({
                  nftId: nftList?.nft?.id,
                  nftToken: nftList?.nft?.NFTTokens[0].id,
                  buyerAddress: data.from,
                  contractAddress: contractAddress,
                  resellNftResolve: resellNftResolve,
                })
              );

              toast.success('NFT is Resold');
            })
            .catch((error) => {
              toast.error(error.reason);
              console.log(error);
            });
          setOpen(false);
        } catch (error) {
          setResellLoader(false);
          toast.error(error.reason);
          console.log(error);
        }
      }
    }
  };

  const handleRedeemNft = async () => {
    if (user == null) {
      navigate('/login');
    } else if (await checkWallet()) {
      if (nftList?.nft?.mintType == 'directMint') {
        try {
          setRedeemLoader(true);
          let erc20Address = BLOCKCHAIN.ERC20;
          let tokenId = parseInt(nftList?.nft?.NFTTokens[0].tokenId);

          let contractAddress = nftList?.nft?.contractAddress;
          console.log('im beneath ca');
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const signer = provider.getSigner();
          console.log('signer', signer);

          const marketplace = new ethers.Contract(MarketplaceAddress.address, MarketplaceAbi.abi, signer);
          console.log('marketplace', marketplace);

          console.log('directmint redeem tokenId', tokenId);

          await (await marketplace.redeemNft(tokenId, contractAddress))
            .wait()
            .then((data) => {
              dispatch(
                redeemNft({
                  nftId: nftList?.nft?.id,
                  nftToken: nftList?.nft?.NFTTokens[0].id,
                  buyerAddress: data.from,
                  contractAddress: contractAddress,
                })
              );
              dispatch(
                addDeliveryNft({
                  status: 'Pending',
                  TokenId: nftList?.nft?.NFTTokens[0].id,
                  WalletAddress: data.from,
                  NftId: nftList?.nft?.id,
                  UserId: user.id,
                  redeemNftResolve: redeemNftResolve,
                })
              );

              toast.success('NFT Redeem successfully');
            })
            .catch((error) => {
              toast.error(error.reason);
              console.log(error);
            });
        } catch (error) {
          setRedeemLoader(false);
          toast.error(error.reason);
          console.log(error);
        }
      } else if (nftList?.nft?.mintType == 'lazyMint') {
        console.log('im in lm');
        try {
          setRedeemLoader(true);
          let erc20Address = BLOCKCHAIN.ERC20;
          let tokenId;
          if (lazyTokenId == '') {
            tokenId = parseInt(nftList?.nft?.NFTTokens[0].tokenId);
          } else {
            tokenId = parseInt(lazyTokenId);
          }

          console.log('tokenId', tokenId);
          console.log('lazyTokenId', lazyTokenId);
          let contractAddress = nftList?.nft?.contractAddress;
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const signer = provider.getSigner();
          // console.log("tokenid",nft.NFTTokens[0].tokenId)
          // console.log("tokenid",typeof nft.NFTTokens[0].tokenId)
          const marketplace = new ethers.Contract(MarketplaceAddress.address, MarketplaceAbi.abi, signer);
          let nftPrice = nftList?.nft?.price.toString();
          let rrprice = ethers.utils.parseEther(nftPrice);
          console.log('rrprice.toString()', rrprice.toString());
          let fprice = rrprice.toString();
          console.log('erc20Address, tokenId, contractAddress, fprice', erc20Address, tokenId, contractAddress, fprice);
          await (await marketplace.redeem(erc20Address, tokenId, contractAddress, fprice))
            .wait()

            .then((data) => {
              dispatch(
                redeemNft({
                  nftId: nftList?.nft?.id,
                  nftToken: nftList?.nft?.NFTTokens[0].id,
                  buyerAddress: data.from,
                  contractAddress: contractAddress,
                })
              );
              dispatch(
                addDeliveryNft({
                  status: 'Pending',
                  TokenId: nftList?.nft?.NFTTokens[0].id,
                  WalletAddress: data.from,
                  NftId: nftList?.nft?.id,
                  UserId: user.id,
                  redeemNftResolve: redeemNftResolve,
                })
              );

              toast.success('NFT Redeem successfully');
            })
            .catch((error) => {
              toast.error(error.reason);
              console.log('error', error);
            });
        } catch (error) {
          setRedeemLoader(false);
          toast.error(error.reason);
          console.log('error', error);
        }
      }
    }
  };

  const buyerNft = useSelector((state) => state.nftReducer.nftBuyer);
  console.log('buyer nft', buyerNft.status);

  // console.log('buyerNft', buyerNft?.buyer?.buyerAddress);
  useEffect(() => {
    console.log('useEffect Ran');
    if (user) {
      dispatch(
        getNftBuyer({
          walletAddress: user?.walletAddress,
          NFTTokenId: nftList?.nft?.NFTTokens[0]?.id ? nftList?.nft?.NFTTokens[0]?.id : 0,
          NftId: nftList?.nft?.id ? nftList?.nft?.id : 0,
        })
      );
    }
  }, [useSelector, dispatch, resell, bought, redeem, nftList]);

  useEffect(() => {}, []);

  return (
    <Grid container-fluid spacing={gridSpacing} sx={{ margin: '15px' }}>
      <Grid item xs={12}>
        <Grid container justifyContent="center" spacing={gridSpacing} sx={{ textAlign: 'center' }}>
          <Grid item md={6} sm={12} component={RouterLink} to="/companyPage">
            <CardMedia
              component="img"
              image={nftList?.nft?.asset}
              sx={{ minheight: 'auto', maxHeight: '570px', background: 'transparent', overflow: 'hidden', cursor: 'Pointer' }}
            />
          </Grid>

          <Grid item md={6} sm={12}>
            <Grid item xs={12}>
              <Grid container>
                <Grid item md={12} sm={12}>
                  <Grid container spacing={2}>
                    <Grid mt={4} ml={2} item xs={12}>
                      <Grid container spacing={2} alignItems="center">
                        <Grid item>
                          <Avatar alt="User 1" src={nftList?.nft?.Brand?.image} sx={{ width: 56, height: 56, objectFit: 'fill' }} />
                        </Grid>
                        <Grid
                          item
                          xs
                          zeroMinWidth
                          onClick={() => {
                            navigate('/brand/' + nftList?.nft?.Brand?.id);
                          }}
                          sx={{ textDecoration: 'none' }}
                        >
                          <Typography align="left" fontWeight={600} variant="h2" className="brand">
                            {nftList?.nft?.Brand?.name}
                          </Typography>
                          <Typography align="left" variant="h3" className="creator">
                            {nftList?.nft?.Category?.name}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>

                    <Grid item mt={2} xs={12}>
                      <Typography className="Lux" color={theme.palette.mode === 'dark' ? 'white' : 'black'} variant="h3">
                        {nftList?.nft?.name ? nftList?.nft?.name : 'Luxury Stainless Watch'}{' '}
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      {/* <Typography className="productdescription" variant="body2">
                        {nftList?.nft?.description}
                      </Typography> */}
                      {nftList?.nft?.description?.length && <TruncatedText text={nftList?.nft?.description} limit={600} />}
                    </Grid>

                    <Grid item xs={12}>
                      <Typography className="productdescription" variant="body2">
                        Total NFTs: {nftList?.nft?.NFTTokens.length}
                      </Typography>
                    </Grid>
                    {nftList?.nft?.NFTTokens.length == 1 && (
                      <Grid item xs={12}>
                        {nftList?.nft?.NFTTokens.map((option) => (
                          <Typography
                            onClick={() => {
                              searchSerial(option?.serialId);
                            }}
                            className="productdescription"
                            variant="body2"
                            sx={{ cursor: 'pointer', color: '#2196f3 !important' }}
                          >
                            {option?.serialId ? option?.serialId : 'No Serial Id'}
                          </Typography>
                        ))}
                      </Grid>
                    )}
                    {nftList?.nft?.NFTTokens.length > 1 && (
                      <Grid item xs={12}>
                        <Box sx={{ borderRadius: '4px', width: '95%', margin: '0 auto', textAlign: 'left' }}>
                          <Box sx={{ minWidth: 120 }}>
                            <FormControl fullWidth>
                              <InputLabel id="demo-simple-select-label">Serial Id :</InputLabel>
                              <Select
                                variant="standard"
                                // labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={age}
                                // label="Age"
                                onChange={handleChange}
                                fullWidth
                                displayEmpty
                                inputProps={{ 'aria-label': 'Without label' }}
                              >
                                {nftList?.nft?.NFTTokens.map((option) => (
                                  <MenuItem
                                    onClick={() => {
                                      searchSerial(option?.serialId);
                                    }}
                                  >
                                    {option?.serialId ? option?.serialId : 'No Serial Id'}
                                  </MenuItem>
                                ))}
                              </Select>
                            </FormControl>
                          </Box>
                        </Box>
                      </Grid>
                    )}
                    <Grid item xs={12}>
                      <Box sx={{ borderRadius: '4px', width: '95%', margin: '0 auto', textAlign: 'left' }}>
                        {nftList?.nft?.NFTMetaFiles?.length && <ProofsDropdown proofs={nftList?.nft?.NFTMetaFiles} />}
                        {/* <FormControl
                          sx={{
                            color: theme.palette.mode === 'dark' ? '#ffff' : 'black',

                            borderRadius: '4px',
                          }}
                          fullWidth
                        >
                          <InputLabel id="demo-simple-select-label">PROOF OF AUTHENTICITY</InputLabel>
                          <Select
                            variant="standard"
                            // labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={age}
                            onChange={handleChange}
                            fullWidth
                            inputProps={{ 'aria-label': 'Without label' }}
                            // displayEmpty
                          >
                            {nftList?.nft?.NFTMetaFiles.map((option) => (
                              <MenuItem
                                onClick={() => {
                                  // useNavigate(option?.fieldValue)
                                  window.open(option?.fieldValue, '_blank');
                                }}
                              >
                                {option?.fieldName}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl> */}
                      </Box>
                    </Grid>

                    {/*  <Grid item mt={2} mb={2} className="timer" xs={12}>
                                            <Grid
                                                sx={{ background: theme.palette.mode === 'dark' ? '#181C1F' : '#d9d9d9' }}
                                                className="auction"
                                                container
                                            >
                                                <Grid item md={6} xs={12} sm={12}>
                                                    <Typography color={theme.palette.mode === 'dark' ? 'white' : 'black'} variant="body">
                                                        Auction Time{' '}
                                                    </Typography>
                                                </Grid>
                                                <Grid item md={6} xs={12} sm={12}>
                                                    <Typography color={theme.palette.mode === 'dark' ? 'white' : 'black'} variant="body">
                                                        {' '}
                                                        2h : 40m : 03s
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                        </Grid> */}
                    <Grid mt={2} item xs={12}>
                      <Grid container>
                        <Grid mt={-2} item md={3} xs={12} sm={12}>
                          <Grid item xs={12}>
                            <Typography
                              color={theme.palette.mode === 'dark' ? 'white' : '#404040'}
                              sx={{ paddingLeft: { md: '22px' }, textAlign: { md: 'left' } }}
                              className="price"
                              variant="body2"
                            >
                              Price
                            </Typography>
                          </Grid>
                          <Grid item xs={12}>
                            <Typography
                              color={theme.palette.mode === 'dark' ? 'white' : '#262626'}
                              sx={{ paddingLeft: { md: '22px' }, textAlign: { md: 'left' } }}
                              className="ETH "
                              variant="h3"
                            >
                              {nftList?.nft?.price} {nftList?.nft?.currencyType}
                            </Typography>
                          </Grid>
                        </Grid>
                        {/*      {buyerNft?.founded && (
                                            <>
                                                <Grid item xs={12} md={12} mt={1}>
                                                    {(nftList?.nft?.transactionHash !== '' || nftList?.nft?.transactionHash) && (
                                                        <>
                                                            <Accordion sx={{ margin: '10px', border: '2px solid', borderRadius: '4px' }}>
                                                                <AccordionSummary
                                                                    expandIcon={<ExpandMoreIcon />}
                                                                    aria-controls="panel1a-content"
                                                                    id="panel1a-header"
                                                                >
                                                                    <Typography>Transaction hash</Typography>
                                                                </AccordionSummary>
                                                                <AccordionDetails>
                                                                    <a target="_blank" href={nftList?.nft?.transactionHash}>
                                                                        {nftList?.nft?.transactionHash}
                                                                    </a>
                                                                </AccordionDetails>
                                                            </Accordion>
                                                        </>
                                                    )}
                                                </Grid>
                                                <Grid item xs={12} md={12}>
                                                    <Accordion sx={{ margin: '10px', border: '2px solid', borderRadius: '4px' }}>
                                                        <AccordionSummary
                                                            expandIcon={<ExpandMoreIcon />}
                                                            aria-controls="panel2a-content"
                                                            id="panel2a-header"
                                                        >
                                                            <Typography>Contract address</Typography>
                                                        </AccordionSummary>
                                                        <AccordionDetails>
                                                            <Typography>
                                                            {nftList?.nft?.Category?.BrandCategories[0].contractAddress}</Typography>
                                                        </AccordionDetails>
                                                    </Accordion>
                                                </Grid>
                                            </>
                                        )} */}

                        <>
                          {(bought == true || nftList?.nft?.isSold == true) && JSON.stringify(buyerNft) === '{}' ? (
                            <>
                              <Grid item md={8} xs={12} sm={12} textAlign="center">
                                <Alert severity="error">
                                  <b>This item is sold already!</b>
                                </Alert>
                              </Grid>
                            </>
                          ) : (
                            <>
                              {buyerNft?.founded ? (
                                <>
                                  <>
                                    <Grid item md={12} sx={{ mt: 1, display: 'flex' }}>
                                      <Grid item md={6} xs={12} sm={12}>
                                        {buyerNft?.status == 'Redeem' || redeem ? (
                                          <>
                                            <Alert severity="success">
                                              <b>This item is Redeemed</b>
                                            </Alert>
                                          </>
                                        ) : (
                                          <>
                                            {buyerNft?.status !== 'Resell' && redeem !== true && (
                                              <>
                                                <Button
                                                  sx={{ float: { md: 'right' } }}
                                                  className="buy"
                                                  variant="contained"
                                                  size="large"
                                                  onClick={() => {
                                                    handleRedeemNft();
                                                  }}
                                                >
                                                  {redeemLoader ? <CircularProgress sx={{ color: 'white' }} /> : <span> Redeem</span>}
                                                </Button>
                                              </>
                                            )}
                                          </>
                                        )}
                                      </Grid>
                                      {buyerNft?.status == 'Resell' || resell == true ? (
                                        <>
                                          <Grid item md={12} xs={12} sm={12} textAlign="center" sx={{}}>
                                            <Alert severity="info" sx={{ float: 'left' }}>
                                              <b>This item is resold by you!</b>
                                            </Alert>
                                          </Grid>
                                        </>
                                      ) : (
                                        <>
                                          {buyerNft?.status !== 'Redeem' && redeem == false && (
                                            <>{resellLoader ? <CircularProgress sx={{ color: 'blue', ml: 3 }} /> : <ResellDialog />}</>
                                          )}
                                        </>
                                      )}
                                    </Grid>
                                  </>
                                </>
                              ) : (
                                <>
                                  {user?.role != 'Super Admin' && user?.role != 'Admin' && user?.role != 'Brand Admin' && (
                                    <>
                                      {bought !== true && (
                                        <Grid
                                          item
                                          md={9}
                                          xs={12}
                                          sm={12}
                                          sx={{ marginTop: { md: '-10px', lg: '-10px' } }}
                                          textAlign="center"
                                        >
                                          <Button
                                            sx={{ float: { md: 'right' } }}
                                            className="buy"
                                            variant="contained"
                                            size="large"
                                            onClick={() => {
                                              handleBuyNft();
                                            }}
                                          >
                                            {loader ? <CircularProgress className="circul" /> : <span>Buy Now</span>}
                                          </Button>
                                        </Grid>
                                      )}
                                    </>
                                  )}
                                </>
                              )}
                            </>
                          )}
                        </>
                      </Grid>
                      {/* 
                                            <Button onClick={()=>{
                                                setBought(true)
                                            }}>Set Bought True</Button>
                                            <Button onClick={()=>{
                                                setBought(false)
                                            }}>Set Bought False</Button> */}
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item md={1} sm={12}></Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default PropertiesView;
