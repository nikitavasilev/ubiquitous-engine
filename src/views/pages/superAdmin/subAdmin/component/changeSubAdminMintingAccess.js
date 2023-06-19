import { forwardRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from '@mui/material/styles';
import {
    MenuItem,
    TextField,
    InputLabel,
    Grid,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Slide,
    DialogContentText,
    Typography,
    CircularProgress
} from '@mui/material';
import { changeSubAdminMintingAccess } from 'redux/subAdmin/actions';
// import NFTAbi from '../../../../../contractAbi'
import NFTAbi from 'contractAbi/NFT.json';
import { ethers } from 'ethers';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { assignBrandCategory } from 'redux/subAdmin/actions';

const Transition = forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);
export default function ChangeSubAdminMintingAccessDialog({ open, setOpen, page, limit, search, subAdminData, setSubAdminData }) {
    console.log('subAdminData', subAdminData);
    const [contractAddress, setContractAddress] = useState('');
    const [brandCategoryId, setBrandCategoryId] = useState(0);
    const [loader, setLoader] = useState(false);

    const theme = useTheme();
    const dispatch = useDispatch();
    const blockChainRole = '0xd2e4c2619ea6e0faebc405d89445161c041e30fe03373ea0473da142d57d4514';
    const { brandCategories } = useSelector((state) => state.brandCategoryReducer.brandCategoriesAdminList);
    const handleClose = () => {
        setLoader(false);
        setOpen(false);
        setSubAdminData({
            id: null,
            firstName: '',
            lastName: '',
            adminEmail: '',
            adminPassword: '',
            walletAddress: '',
            role: '',
            isActive: '',
            walletAddress: '',
            hasMintingAccess: '',
            contractAddress: ''
        });
    };

    const handleMintRole = async () => {
        setLoader(true)
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const nfts = new ethers.Contract(subAdminData.contractAddress, NFTAbi.abi, signer);
        if (subAdminData.hasMintingAccess == true) {
            await (
                await nfts.revokeRole(blockChainRole, subAdminData.walletAddress).catch((error) => {
                    setLoader(false);
                    setOpen(false);
                    toast.error(`${error.reason}`);
                })
            )
                ?.wait()
                .then((data) => {
                    dispatch(
                        changeSubAdminMintingAccess({
                            id: subAdminData.id,
                            page: page,
                            limit: limit,
                            search: search,
                            handleClose: handleClose
                        })
                    );
                });
        } else {
            await (
                await nfts.grantRole(blockChainRole, subAdminData.walletAddress).catch((error) => {
                    toast.error(`${error.reason}`);
                    setLoader(false);
                    setOpen(false);
                })
            )
                ?.wait()
                .then((data) => {
                    dispatch(
                        changeSubAdminMintingAccess({
                            id: subAdminData.id,
                            page: page,
                            limit: limit,
                            search: search,
                            handleClose: handleClose
                        })
                    );
                });
        }
    };

    const handleBrandCategoryChange = (e) => {
        setContractAddress(e.target.value.contractAddress);
        setBrandCategoryId(e.target.value.id);
    };

    const handleAssignBrandCategory = async () => {
        setLoader(true);
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();

        const nfts = new ethers.Contract(contractAddress, NFTAbi.abi, signer);
        // const admin="0x6f3B51bd5B67F3e5bca2fb32796215A796B79651";

        let mintedNFT = await (
            await nfts.grantRole(blockChainRole, subAdminData.walletAddress).catch((error) => {
                toast.error(`${error.reason}`);
                setLoader(false);
                setOpen(false);
            })
        )
            ?.wait()
            .then((data) => {
                dispatch(
                    assignBrandCategory({
                        id: subAdminData.id,
                        brandCategory: brandCategoryId,
                        page: page,
                        limit: limit,
                        search: search,
                        handleClose: handleClose
                    })
                );
            });
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
                <DialogTitle className="statusHeading" id="alert-dialog-slide-title1">
                    Change Admin Status{' '}
                </DialogTitle>
                {subAdminData.contractAddress == undefined || null ? (
                    <>
                        <DialogContent>
                            <Grid container>Please assign a Brand Category:</Grid>

                            <Grid item xs={6} md={12} lg={12} pt={2}>
                                <InputLabel className="textfieldStyle" htmlFor="">
                                    Select Category
                                </InputLabel>
                                <TextField
                                    variant="standard"
                                    className="responsiveSelectfield textfieldStyle field"
                                    id="outlined-select-budget"
                                    select
                                    fullWidth
                                    // label="Select Category"
                                    // value={category}
                                    onChange={handleBrandCategoryChange}
                                >
                                    {brandCategories?.map((data, index) => (
                                        <MenuItem key={index} value={data}>
                                            {data.Category.name} ({data.Brand.name})
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
                        </DialogContent>
                        {loader ? (
                            <>
                                <DialogActions sx={{ pr: 2.5 }}>
                                    <CircularProgress disableShrink size={'4rem'} />
                                </DialogActions>
                            </>
                        ) : (
                            <>
                                <DialogActions sx={{ pr: 2.5 }}>
                                    <Button
                                        sx={{ color: theme.palette.error.dark, borderColor: theme.palette.error.dark }}
                                        onClick={handleClose}
                                        color="secondary"
                                        className="buttonSize"
                                        size="large"
                                    >
                                        No
                                    </Button>
                                    <Button
                                        variant="contained"
                                        className="buttonSize"
                                        size="large"
                                        onClick={() => {
                                            handleAssignBrandCategory();
                                        }}
                                    >
                                        Yes
                                    </Button>
                                </DialogActions>
                            </>
                        )}
                    </>
                ) : (
                    <>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-slide-description1">
                                <Typography variant="body2" component="span" className="statustypo">
                                    {subAdminData.hasMintingAccess == false
                                        ? 'Are you sure you want to give minting access to this Admin?'
                                        : 'Are you sure you want to remove minting access of this Admin?'}
                                </Typography>
                            </DialogContentText>
                        </DialogContent>
                        {loader
                        ?
                        <>
                           <DialogActions sx={{ pr: 2.5 }}>
                                    <CircularProgress disableShrink size={'4rem'} />
                                </DialogActions>
                        </>

                        :
                        <>
                        <DialogActions sx={{ pr: 2.5 }}>
                            <Button
                                sx={{ color: theme.palette.error.dark, borderColor: theme.palette.error.dark }}
                                onClick={handleClose}
                                color="secondary"
                                className="buttonSize"
                                size="large"
                            >
                                No
                            </Button>
                            <Button
                                variant="contained"
                                className="buttonSize"
                                size="large"
                                onClick={() => {
                                    handleMintRole();
                                }}
                            >
                                Yes
                            </Button>
                        </DialogActions>
                        
                        </>
                        
                        }
                    </>
                )}
            </Dialog>
        </>
    );
}
