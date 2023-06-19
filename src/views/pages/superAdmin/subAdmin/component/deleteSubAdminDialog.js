import { forwardRef } from 'react';
import { useDispatch } from 'react-redux';
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
    CircularProgress
} from '@mui/material';
import { deleteSubAdmin } from 'redux/subAdmin/actions';
import NFTAbi from 'contractAbi/NFT.json';
import { ethers } from 'ethers';
import { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Transition = forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);
export default function DeleteSubAdminDialog({ open, setOpen, page, limit, search, subAdminData, setSubAdminData }) {
    console.log('subAdminData from delete', subAdminData);
    const blockChainRole = '0xd2e4c2619ea6e0faebc405d89445161c041e30fe03373ea0473da142d57d4514';

    const theme = useTheme();
    const dispatch = useDispatch();

    const [loader, setLoader] = useState(false);

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
            walletAddress: ''
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
                <DialogTitle id="alert-dialog-slide-title1" className="statusHeading">
                    Delete Subadmin
                </DialogTitle>

                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description1">
                        <Typography variant="body2" component="span" className="statustypo">
                            Are you sure you want to delete this Subadmin?
                        </Typography>
                    </DialogContentText>
                </DialogContent>

                <DialogActions sx={{ pr: 2.5 }}>
                    {loader ? (
                        <CircularProgress disableShrink size={'4rem'} />
                    ) : (
                        <>
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
                                onClick={async () => {
                                    setLoader(true);
                                    const provider = new ethers.providers.Web3Provider(window.ethereum);
                                    const signer = provider.getSigner();
                                    const nfts = new ethers.Contract(subAdminData.contractAddress, NFTAbi.abi, signer);
                                    await (
                                        await nfts.revokeRole(blockChainRole, subAdminData.walletAddress).catch((error) => {
                                            toast.error(`${error.reason}`);
                                        })
                                    )?.wait().then((data)=>{

                                        dispatch(
                                            deleteSubAdmin({
                                                id: subAdminData.id,
                                                page: page,
                                                limit: limit,
                                                search: search,
                                                handleClose: handleClose
                                            })
                                        );
                                    }).catch((error)=>{
                                        toast.error(`${error.reason}`);
                                    })
                                   
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
