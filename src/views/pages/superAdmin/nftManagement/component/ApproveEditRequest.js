import { forwardRef, useState } from 'react';
import AnimateButton from 'ui-component/extended/AnimateButton';

// material-ui
import { AppBar, DialogActions, Button, Dialog, CardMedia, Divider, Grid, Slide, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import HeadingCard from 'shared/Card/HeadingCard';

// assets
import CloseIcon from '@mui/icons-material/Close';
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { approveEditNft } from 'redux/nftManagement/actions';
import MainCard from 'ui-component/cards/MainCard';
import { ethers, utils } from 'ethers';
import { create } from 'ipfs-http-client';
import { Buffer } from 'buffer';
import MarketplaceAbi from '../../../../../contractAbi/Marketplace.json';
import MarketplaceAddress from '../../../../../contractAbi/Marketplace-address.json';
import BLOCKCHAIN from '../../../../../constants';
import { SNACKBAR_OPEN } from 'store/actions';
import { Oval } from 'react-loader-spinner';

import NFTAbi from '../../../../../contractAbi/NFT.json';
const projectId = '2GGvNmnqRYjnz7iJU9Kn6Nnw97C';
const projectSecret = 'a09de1e8b20292cd87460290de554003';
const auth = 'Basic ' + Buffer.from(projectId + ':' + projectSecret).toString('base64');
// slide animation
const Transition = forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);

// ===============================|| UI DIALOG - FULL SCREEN ||=============================== //

export default function ApproveEditNftDialog({ open, setOpen, page, limit, search, type, nftData, loader, setLoader }) {
  const theme = useTheme();
  const dispatch = useDispatch();
  const walletAddress = useSelector((state) => state.auth.walletAddress);
  const user = useSelector((state) => state.auth.user);
  // console.log(nftData?.NFTMetaFiles, 'nftData in DETAIL********');
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const client = create({
    host: 'ipfs.infura.io',
    port: 5001,
    protocol: 'https',
    headers: {
      authorization: auth
    }
  });
  const checkWallet = async () => {
    const response = await window?.ethereum?.request({
      method: 'eth_requestAccounts'
    });
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
    else if (utils?.getAddress(response[0]) !== user?.walletAddress) {
      dispatch({
        type: SNACKBAR_OPEN,
        open: true,
        message: 'Please connect your registered Wallet Address',
        variant: 'alert',
        alertSeverity: 'info'
      });
      console.log('Please connect your registered Wallet Address');
    } else {
      return true;
    }
  };
  const directMintThenList = async (tokenUriArray) => {
    console.log('tokenUriArray in directMintThenList', tokenUriArray);
    let nftTokens = nftData.NFTTokens[0].tokenId;
    let contractAddress = nftData.Category.BrandCategories[0].contractAddress;
    console.log('nftTokens in directMintThenList', nftTokens);
    console.log('contractAddress in directMintThenList', contractAddress);

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const address = await signer.getAddress();
    const nft = new ethers.Contract(contractAddress, NFTAbi.abi, signer);
    console.log('nft', nft);

    await nft.updateUriAdmin(nftTokens, tokenUriArray);
    //.catch((error) => {
    //   console.log(error);
    //   toast.error(error.reason);
    //   setOpen(false);
    //   setLoader(false);
    // });
    dispatch(
      approveEditNft({
        id: nftData.id,
        categoryId: nftData.CategoryId,
        brandId: nftData.BrandId,
        ipfsUrl: tokenUriArray,
        type: type,
        page: page,
        limit: limit,
        search: search,
        handleClose: handleClose
      })
    );
  };
  const handleDirectMint = async () => {
    console.log('nftData', nftData);
    setLoader(true);
    let image = nftData.ipfsUrl;
    let price = nftData.price;
    let name = nftData.name;
    let description = nftData.description;
    let projectName = 'Galelio';
    let mintedDate = new Date().valueOf();
    let categoryName = nftData.Category.name;
    let brandName = nftData.Brand.name;
    let metaData = nftData.NFTMetaData;
    let poa = nftData.NFTMetaFiles;
    let external_url = nftData.NFTMetaFiles[0].fieldValue;

    console.log('nftData.NFTMetaData', nftData.NFTMetaData);
    console.log('nftData.NFTMetaData.length', nftData.NFTMetaData.length);

    let attributes = [];
    for (let i = 0; i < nftData.NFTMetaData.length; i++) {
      attributes.push({
        trait_type: nftData.NFTMetaData[i]?.trait_type,
        value: nftData.NFTMetaData[i]?.value,
        countryCode: nftData.NFTMetaData[i]?.countryCode,
        display_type: nftData.NFTMetaData[i]?.display_type,
        primaryLocation: nftData.NFTMetaData[i]?.primaryLocation,
        editRequested: nftData.NFTMetaData[i]?.editRequested,
        editId: nftData.NFTMetaData[i]?.editId,
        NftId: nftData.NFTMetaData[i]?.NftId,
        isEditable: nftData.NFTMetaData[i]?.isEditable,
        proofRequired: nftData.NFTMetaData[i]?.proofRequired
      });
    }

    // setLoader(true);
    if (!image || !price || !name || !description) return;

    let tokenUriArray;

    try {
      console.log('nftData.NFTTokens', nftData.NFTTokens);

      console.log('client from mint', client);

      for (let i = 0; i < nftData.NFTTokens.length; i++) {
        const result = await client.add(
          JSON.stringify({
            projectName,
            brandName,
            categoryName,
            image,
            name,
            description,
            price,
            mintedDate,
            attributes,
            poa,
            external_url,
            coutner: i
          })
        );

        tokenUriArray = `https://galileoprotocol.infura-ipfs.io/ipfs/${result.path}`;
      }

      // console.log('ipfsArray99', ipfsArray);

      directMintThenList(tokenUriArray);
    } catch (error) {
      console.log(error);
      toast.error(error?.reason);

      setLoader(false);
      setOpen(false);
    }

    console.log('tokenUriArray******', tokenUriArray);
  };

  return (
    <div>
      <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
        {/*    <IconButton float="left" color="inherit" onClick={handleClose} aria-label="close" size="large">
                    <CloseIcon />
                </IconButton> */}
        <DialogActions sx={{ pr: 2.5, pt: 2.5 }}>
          <Button className="buttonSize" size="large" sx={{ color: theme.palette.error.dark }} onClick={handleClose} color="secondary">
            <CloseIcon />
          </Button>
        </DialogActions>

        <MainCard
          className="tableShadow"
          sx={{ margin: '20px', overflow: 'initial' }}
          title={
            <Grid container>
              <Grid item md={8} xs={12}>
                <Typography
                  variant="h1"
                  component="h3"
                  className="approveHeading"
                  sx={{ color: theme.palette.mode === 'dark' ? '#fff' : '#000' }}
                >
                  NFT MetaData
                </Typography>
              </Grid>
            </Grid>
          }
          content={false}
        >
          <Grid container sx={{ pr: 0, pl: 0, pt: 2.5 }}>
            {/*   <caption className="approveHeading">NFT MetaData </caption> */}

            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="caption table">
                <TableHead>
                  <TableRow>
                    <TableCell align="center">Display Type</TableCell>

                    <TableCell align="center">Trait Type</TableCell>
                    <TableCell align="center">Value</TableCell>
                    <TableCell align="center">Country Code</TableCell>
                    <TableCell align="center">Primary Location</TableCell>
                    <TableCell align="center">isEditable</TableCell>
                    <TableCell align="center">Proof Required</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {nftData?.NFTMetaData?.map((row) => (
                    <TableRow key={row.name}>
                      <TableCell align="center">{row?.display_type}</TableCell>
                      <TableCell align="center">{row?.trait_type}</TableCell>
                      <TableCell align="center">{row?.display_type == 'date' ? row?.value : row?.value.slice(0, 14)}</TableCell>
                      <TableCell align="center">{row?.countryCode ? row?.countryCode : 'null'}</TableCell>
                      <TableCell align="center">{row?.primaryLocation == true ? 'true' : 'false'}</TableCell>
                      <TableCell align="center">{row?.isEditable == true ? 'true' : 'false'}</TableCell>
                      <TableCell align="center">{row?.proofRequired == true ? 'true' : 'false'}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </MainCard>

        <MainCard
          className="tableShadow"
          sx={{ margin: '20px', overflow: 'initial' }}
          title={
            <Grid container>
              <Grid item md={8} xs={12}>
                <Typography
                  variant="h1"
                  component="h3"
                  className="approveHeading"
                  sx={{ color: theme.palette.mode === 'dark' ? '#fff' : '#000' }}
                >
                  Authenticity Files
                </Typography>
              </Grid>
            </Grid>
          }
          content={false}
        >
          <Grid container sx={{ pr: 0, pl: 0, pt: 2.5 }}>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="caption table">
                <TableHead>
                  <TableRow>
                    <TableCell align="center">Field Name </TableCell>

                    <TableCell align="center">Field Value</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {nftData?.NFTMetaFiles?.map((row) => (
                    <TableRow key={row.name}>
                      <TableCell align="center" sx={{ fontSize: '15px', textTransform: 'capitalize' }}>
                        {row?.fieldName}
                      </TableCell>
                      <TableCell
                        align="center"
                        sx={{ fontSize: '15px', color: '#2194FF', cursor: 'pointer' }}
                        onClick={() => {
                          window.open(`https://mumbai.polygonscan.com/address/${row?.fieldValue}`, '_blank');
                        }}
                      >
                        {row?.fieldValue}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </MainCard>
        <DialogActions sx={{ pr: 2.5, pt: 2.5 }}>
          <Button
            type="submit"
            variant="contained"
            sx={{ my: 1, ml: 1, padding: { md: '6px 50px', lg: '6px 50px' } }}
            onClick={() => {
              if (!loader) {
                if (nftData.mintType == 'directMint') {
                  checkWallet();
                  handleDirectMint();
                }
              }
            }}
            className="buttons"
            size="large"
            // disableElevation
          >
            Approve
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
