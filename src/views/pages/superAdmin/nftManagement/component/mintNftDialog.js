import { forwardRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import { ethers, utils } from 'ethers';
import { Button, Grid, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, Slide, Typography } from '@mui/material';
// import { Oval } from 'react-loader-spinner';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { mintNft, lazyMintNft } from 'redux/nftManagement/actions';
import NFTAbi from '../../../../../contractAbi/NFT.json';
import { create } from 'ipfs-http-client';
import { Buffer } from 'buffer';
import MarketplaceAbi from '../../../../../contractAbi/Marketplace.json';
import MarketplaceAddress from '../../../../../contractAbi/Marketplace-address.json';
import BLOCKCHAIN from '../../../../../constants';
import { SNACKBAR_OPEN } from 'store/actions';
import { Oval } from 'react-loader-spinner';
const projectId = '2GGvNmnqRYjnz7iJU9Kn6Nnw97C';
const projectSecret = 'a09de1e8b20292cd87460290de554003';
const auth = 'Basic ' + Buffer.from(projectId + ':' + projectSecret).toString('base64');

const client = create({
  host: 'ipfs.infura.io',
  port: 5001,
  protocol: 'https',
  headers: {
    authorization: auth
  }
});

const Transition = forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);

export default function MintNftDialog({ open, setOpen, page, limit, search, loader, setLoader, nftData, type }) {
  // console.log('nftData', nftData);
  const theme = useTheme();
  const dispatch = useDispatch();
  let variable = '';
  const [serialId, setSerialId] = useState('');
  const walletAddress = useSelector((state) => state.auth.walletAddress);
  const user = useSelector((state) => state.auth.user);
  const handleClose = () => {
    setOpen(false);
    setLoader(false);
  };
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
      return true;
    }
  };

  const directMintThenList = async (tokenUriArray) => {
    console.log('tokenUriArray in directMintThenList', tokenUriArray);

    if (nftData.isDirectTransfer) {
      console.log('with wallet address isDirectTransfer');
      if (checkWallet) {
        let nftTokens = nftData.NFTTokens;
        let contractAddress = nftData.Category.BrandCategories[0].contractAddress;
        let nftId = nftData.id;
        let categoryId = nftData.CategoryId;
        let brandId = nftData.BrandId;
        let price = ethers.utils.parseEther(nftData.price.toString());
        let erc20Address = BLOCKCHAIN.ERC20;
        let tokenIdArray = [];
        let transactionHash;
        try {
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const signer = provider.getSigner();
          const address = await signer.getAddress();
          const nft = new ethers.Contract(contractAddress, NFTAbi.abi, signer);
          // const tokenUri = `https://galileoprotocol.infura-ipfs.io/ipfs/${result.path}`;
          // const uriArray = await nftTokens.map(() => {
          //     return tokenUri;
          // });

          if (tokenUriArray.length == 1) {
            let mintedNFT = await (
              await nft.mint(tokenUriArray[0], erc20Address, price, nftData.requesterAddress).catch((error) => {
                toast.error(error.reason);
                setLoader(false);
                setOpen(false);
              })
            ).wait();
            console.log('im here at 111');
            transactionHash = `https://goerli.etherscan.io/tx/${mintedNFT.transactionHash}`;
            const id = parseInt(mintedNFT.events[0].args[2]);
            console.log('id', id);
            let serialId = await nft.serialid(id);
            console.log('serialId', serialId);

            let myNftTokenIdArray = [];
            myNftTokenIdArray.push(id);

            await (
              await nft.transferNftBunch(nftData.transferAddress, myNftTokenIdArray).catch((error) => {
                console.log(error);
                toast.error(error.reason);
                setOpen(false);
                setLoader(false);
              })
            ).wait();

            tokenIdArray.push({
              contractAddress: nftData.contractAddress,
              transferAddress: nftData.transferAddress,
              isDirectTransfer: nftData.isDirectTransfer,
              nftId: nftData.id,
              id: nftTokens[0].id,
              tokenId: id,

              serialId: serialId
            });
            let nftDataArray = [];
            nftDataArray.push({
              nftId: nftId
              // tokenUri: tokenUri
            });

            tokenUriArray.map((data, i) => {
              tokenIdArray[i].tokenUri = data;
            });

            dispatch(
              mintNft({
                minterAddress: user.walletAddress,
                nftDataArray: nftDataArray,
                tokenIdArray: tokenIdArray,
                transactionHash: transactionHash,
                signerAddress: address,
                brandId: brandId,
                categoryId: categoryId,
                type: type,
                search: search,
                page: page,
                limit: limit,
                handleClose: handleClose
              })
            );
          } else if (tokenUriArray.length > 1) {
            let mintedNFT = await (
              await nft.bulkMint(tokenUriArray, erc20Address, price, nftData.requesterAddress).catch((error) => {
                toast.error(error.reason);
                setOpen(false);
                setLoader(false);
              })
            ).wait();

            transactionHash = `https://goerli.etherscan.io/tx/${mintedNFT.transactionHash}`;
            const id = parseInt(mintedNFT.events[0].args[2]);
            console.log('id', id);
            let counter = 0;
            let myNftTokenIdArray = [];
            for (let i = 0; i < tokenUriArray.length; i++) {
              myNftTokenIdArray.push(mintedNFT.events[counter].args[2].toString());
              counter = counter + 2;
            }

            await (
              await nft.transferNftBunch(nftData.transferAddress, myNftTokenIdArray).catch((error) => {
                console.log(error);
                toast.error(error.reason);
                setOpen(false);
                setLoader(false);
              })
            ).wait();

            let myNftSerialIdArray = [];
            for (let i = 0; i < myNftTokenIdArray.length; i++) {
              let serialId = await nft.serialid(myNftTokenIdArray[i]);
              myNftSerialIdArray.push(serialId);
            }
            console.log('serialIdArray', myNftSerialIdArray);

            nftTokens.map((data, index) => {
              tokenIdArray.push({
                contractAddress: nftData.contractAddress,
                transferAddress: nftData.transferAddress,
                isDirectTransfer: nftData.isDirectTransfer,
                nftId: nftData.id,
                id: data.id,
                serialId: myNftSerialIdArray[index],
                tokenId: myNftTokenIdArray[index]
              });
            });

            let nftDataArray = [];
            nftDataArray.push({
              nftId: nftId
              // tokenUri: tokenUri
            });

            tokenUriArray.map((data, i) => {
              tokenIdArray[i].tokenUri = data;
            });

            dispatch(
              mintNft({
                minterAddress: user.walletAddress,
                nftDataArray: nftDataArray,
                tokenIdArray: tokenIdArray,
                transactionHash: transactionHash,
                signerAddress: address,
                brandId: brandId,
                categoryId: categoryId,
                type: type,
                search: search,
                page: page,
                limit: limit,
                handleClose: handleClose
              })
            );
          }
        } catch (error) {
          setLoader(false);
          setOpen(false);
        }
      }
    } else {
      console.log('without walletaddress, not isDirectTransfer');

      if (checkWallet) {
        let nftTokens = nftData.NFTTokens;
        let contractAddress = nftData.Category.BrandCategories[0].contractAddress;
        let nftId = nftData.id;
        let categoryId = nftData.CategoryId;
        let brandId = nftData.BrandId;
        let price = ethers.utils.parseEther(nftData.price.toString());
        let erc20Address = BLOCKCHAIN.ERC20;
        let tokenIdArray = [];
        let transactionHash;
        try {
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const signer = provider.getSigner();
          const address = await signer.getAddress();
          const nft = new ethers.Contract(contractAddress, NFTAbi.abi, signer);
          // const tokenUri = `https://galileoprotocol.infura-ipfs.io/ipfs/${result.path}`;
          // const uriArray = await nftTokens.map(() => {
          //     return tokenUri;
          // });

          if (tokenUriArray.length == 1) {
            let mintedNFT = await (
              await nft.mint(tokenUriArray[0], erc20Address, price, nftData.requesterAddress).catch((error) => {
                toast.error(error.reason);
                setLoader(false);
                setOpen(false);
              })
            ).wait();

            console.log('im here at 264');

            console.log('mintedNFT', mintedNFT);
            transactionHash = `https://goerli.etherscan.io/tx/${mintedNFT.transactionHash}`;
            const id = parseInt(mintedNFT.events[0].args[2]);
            console.log('id', id);

            // setSerialId(nft.serialid(id));

            // console.log('serialId', serialId);
            let serialId = await nft.serialid(id);
            console.log('serialId', serialId);

            const marketplaceAddr = new ethers.Contract(MarketplaceAddress.address, MarketplaceAbi.abi, signer);
            await (
              await marketplaceAddr.makeItem(erc20Address, id, contractAddress, price, nftData.requesterAddress).catch((error) => {
                console.log(error);
                toast.error(error.reason);
                setOpen(false);
                setLoader(false);
                console.log('error', error);
              })
            ).wait();

            tokenIdArray.push({
              contractAddress: nftData.contractAddress,
              transferAddress: nftData.transferAddress,
              isDirectTransfer: nftData.isDirectTransfer,
              nftId: nftData.id,
              id: nftTokens[0].id,
              tokenId: id,
              serialId: serialId
            });
            console.log(tokenIdArray, 'tokenIdArray', serialId, 'serialId=========??????');
            let nftDataArray = [];

            nftDataArray.push({
              nftId: nftId
              // tokenUri: tokenUri
            });

            tokenUriArray.map((data, i) => {
              tokenIdArray[i].tokenUri = data;
            });

            dispatch(
              mintNft({
                minterAddress: user.walletAddress,
                nftDataArray: nftDataArray,
                tokenIdArray: tokenIdArray,
                transactionHash: transactionHash,
                signerAddress: address,
                brandId: brandId,
                categoryId: categoryId,
                type: type,
                search: search,
                page: page,
                limit: limit,
                handleClose: handleClose
              })
            );
          } else if (tokenUriArray.length > 1) {
            console.log('im in bulk');
            let mintedNFT = await (
              await nft.bulkMint(tokenUriArray, erc20Address, price, nftData.requesterAddress).catch((error) => {
                toast.error(error);
                console.log(error.reason);
                setOpen(false);
                setLoader(false);
              })
            ).wait();

            console.log('mintedNFT 999', mintedNFT);

            transactionHash = `https://goerli.etherscan.io/tx/${mintedNFT.transactionHash}`;
            const id = parseInt(mintedNFT.events[0].args[2]);
            console.log('id', id);
            let counter = 0;
            let myNftTokenIdArray = [];
            for (let i = 0; i < tokenUriArray.length; i++) {
              myNftTokenIdArray.push(mintedNFT.events[counter].args[2].toString());
              counter = counter + tSerialIdArr2;
            }

            const marketplaceAddr = new ethers.Contract(MarketplaceAddress.address, MarketplaceAbi.abi, signer);

            await (
              await marketplaceAddr
                .makeItemBulk(erc20Address, myNftTokenIdArray, contractAddress, price, nftData.requesterAddress)
                .catch((error) => {
                  console.log(error);
                  toast.error(error.reason);
                  console.log(error.reason, 'reason?');
                  setOpen(false);
                  setLoader(false);
                })
            ).wait();

            let myNftSerialIdArray = [];
            for (let i = 0; i < myNftTokenIdArray.length; i++) {
              let serialId = await nft.serialid(myNftTokenIdArray[i]);
              myNftSerialIdArray.push(serialId);
            }
            console.log('serialIdArray', myNftSerialIdArray);

            // myNftTokenIdArray.map(async (id) => {
            //     let serialId = await nft.serialid(id);

            //     serialIdArray.push(serialId);

            // });

            // ipfsArray.map((data,i)=>{
            //         console.log("ipfs",data)
            //         console.log("nftTokens[i]", nftTokens[i])

            //     nftTokens[i].ipfs = "data"
            // })

            // for(let i=0; i<ipfsArray.length; i++){
            // nftTokens[0].ipfs = "data"
            // }

            console.log('nftTokens 999', nftTokens);
            nftTokens.map((data, index) => {
              tokenIdArray.push({
                contractAddress: nftData.contractAddress,
                transferAddress: nftData.transferAddress,
                isDirectTransfer: nftData.isDirectTransfer,
                nftId: nftData.id,
                id: data.id,
                serialId: myNftSerialIdArray[index],
                tokenId: myNftTokenIdArray[index]
              });
            });

            tokenUriArray.map((data, i) => {
              tokenIdArray[i].tokenUri = data;
            });

            console.log('tokenIdArray', tokenIdArray);

            let nftDataArray = [];

            nftDataArray.push({
              nftId: nftId
              // tokenUri: tokenUri
            });

            dispatch(
              mintNft({
                minterAddress: user.walletAddress,
                nftDataArray: nftDataArray,
                tokenIdArray: tokenIdArray,
                transactionHash: transactionHash,
                signerAddress: address,
                brandId: brandId,
                categoryId: categoryId,
                type: type,
                search: search,
                page: page,
                limit: limit,
                handleClose: handleClose
              })
            );
          }
        } catch (error) {
          setLoader(false);
          setOpen(false);
        }
      }
    }
  };

  const handleDirectMint = async () => {
    console.log('im in direct');
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

    let tokenUriArray = [];

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

        tokenUriArray.push(`https://galileoprotocol.infura-ipfs.io/ipfs/${result.path}`);
      }

      // console.log('ipfsArray99', ipfsArray);

      directMintThenList(tokenUriArray);
    } catch (error) {
      console.log(error);
      toast.error(error.reason);

      setLoader(false);
      setOpen(false);
    }

    console.log('tokenUriArray99', tokenUriArray);
  };

  const handleLazyMint = async () => {
    console.log('lazy mint');
    setLoader(true);
    let brandId = nftData.BrandId;
    let categoryId = nftData.CategoryId;
    let nftId = nftData.id;
    let image = nftData.ipfsUrl;
    let prices = nftData.price.toString();
    let price = ethers.utils.parseEther(prices);
    price = price.toString();
    let name = nftData.name;
    let description = nftData.description;
    let projectName = 'Galelio';
    let mintedDate = new Date().valueOf();
    let categoryName = nftData.Category.name;
    let brandName = nftData.Brand.name;
    let metaData = nftData.NFTMetaData;
    let contractAddress = nftData.Category.BrandCategories[0].contractAddress;
    let poa = nftData.NFTMetaFiles;
    let external_url = nftData.NFTMetaFiles[0].fieldValue;
    console.log('price from mintnftdialog', price);
    console.log('price from mintnftdialog', typeof price);
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

    // let contractAddress = "0x2750aE21C32f8De4C3CaE1230efAd2Fb497263b8"
    // let contractAddress = "0x6e9550E5fee2bE7BdB208214e9cE2B47131a5Ca0"
    let nftTokens = nftData.NFTTokens;

    const result = await client.add(
      JSON.stringify({
        projectName,
        brandName,
        categoryName,
        image,
        name,
        description,
        price,
        attributes,
        poa,
        external_url,
        mintedDate,
        metaData
      })
    );
    const uri = `https://galileoprotocol.infura-ipfs.io/ipfs/${result.path}`;

    let token = BLOCKCHAIN.ERC20;
    // const SIGNING_DOMAIN = 'Voucher';
    // const SIGNATURE_VERSION = '4';
    // const chainId = 5;

    const SIGNING_DOMAIN = 'Galileo-Protocol';
    const SIGNATURE_VERSION = '1';

    const domain = {
      name: SIGNING_DOMAIN,
      version: SIGNATURE_VERSION,
      verifyingContract: contractAddress,
      chainId: 80001
    };

    const types = {
      GalileoVoucher: [
        { name: 'uri', type: 'string' },
        { name: 'price', type: 'uint256' },
        { name: 'token', type: 'address' }
      ]
    };
    //const prices = ethers.utils.parseEther(price.toString());
    const voucher = { uri, price, token };

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const signature = await signer._signTypedData(domain, types, voucher);
    const verifyAddr = ethers.utils.verifyTypedData(domain, types, voucher, signature);

    const signerAddr = '0x6f3B51bd5B67F3e5bca2fb32796215A796B79651';

    const nfts = new ethers.Contract(contractAddress, NFTAbi.abi, signer);
    let validatorAddress = '0x6f3b51bd5b67f3e5bca2fb32796215a796b79651';

    // await await nfts.lazyMint(
    //     validatorAddress,
    //     voucher,
    //     signature,
    //     MarketplaceAddress.address
    // );

    let nftDataArray = [
      {
        nftId: nftId,
        tokenUri: uri,
        tokenPrice: prices.toString(),
        signerAddress: signerAddr // save wallet address
      }
    ];

    let tokenIdArray = nftTokens.map((data) => {
      return {
        id: data.id,
        signature: signature,
        erc20Address: token
      };
    });

    dispatch(
      lazyMintNft({
        minterAddress: user.walletAddress,
        nftDataArray: nftDataArray,
        tokenIdArray: tokenIdArray,
        brandId: brandId,
        categoryId: categoryId,
        type: type,
        search: search,
        page: page,
        limit: limit,
        handleClose: handleClose
      })
    );
  };

  return (
    <>
      <Dialog
        className="responsiveDialog"
        open={open}
        TransitionComponent={Transition}
        keepMounted
        // onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title1"
        aria-describedby="alert-dialog-slide-description1"
      >
        <DialogTitle id="alert-dialog-slide-title1"> Mint NFT</DialogTitle>
        <DialogContent>
          <Typography variant="body2" component="span">
            Are you sure you want to mint this NFT?
          </Typography>
        </DialogContent>

        <DialogActions sx={{ pr: 2.5 }}>
          <>
            {loader ? (
              <DialogActions sx={{ display: 'block' }}>
                <Grid container justifyContent="center" sx={{ width: '30%', m: '0 auto ' }}>
                  <Grid item>
                    <CircularProgress disableShrink size={'4rem'} />
                  </Grid>
                </Grid>

                <Button
                  className="mintbuttons"
                  variant="Text"
                  sx={{
                    fontSize: '13px',
                    margin: '0px 0px 10px 0px',
                    color: '#2196f3'
                  }}
                  size="small"
                >
                  this NFT is being minted...
                </Button>
              </DialogActions>
            ) : (
              <>
                <Button
                  sx={{
                    color: theme.palette.error.dark,
                    borderColor: theme.palette.error.dark
                  }}
                  onClick={handleClose}
                  color="secondary"
                >
                  No
                </Button>
                <Button
                  variant="contained"
                  size="small"
                  onClick={() => {
                    if (!loader) {
                      if (nftData.mintType == 'directMint') {
                        checkWallet();
                        handleDirectMint();
                      } else if (nftData.mintType == 'lazyMint') {
                        handleLazyMint();
                      }
                    }
                  }}
                >
                  {' '}
                  Yes
                </Button>
              </>
            )}
          </>
        </DialogActions>
      </Dialog>
    </>
  );
}
