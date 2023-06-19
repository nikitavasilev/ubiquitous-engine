import { forwardRef, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { ethers, utils } from 'ethers';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// material-ui
import {
    AppBar,
    DialogActions,
    Dialog,
    Button,
    InputLabel,
    InputAdornment,
    IconButton,
    Input,
    DialogContent,
    DialogTitle,
    TextField,
    Divider,
    Grid,
    List,
    Slide,
    Toolbar,
    Typography
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { updateProperty } from 'redux/brand/actions';
// assets
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';
import { create } from 'ipfs-http-client';
import { API_URL } from 'utils/axios';
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';

// slide animation
const Transition = forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);

// ===============================|| UI DIALOG - FULL SCREEN ||=============================== //

export default function SelectDocument({ open, setOpen, Proof }) {
    // console.log('metadata, value, nft, id, editable, proofRequired',metadata, value, nft, id, editable, proofRequired);
    const [loader, setLoader] = useState(false);
    const theme = useTheme();
    // console.log(Proof, 'Proof==================================');

    const navigate = useNavigate();

    const dispatch = useDispatch();
    // console.log(metadata, 'metadata', value, 'value');

    const handleClose = () => {
        setOpen(false);
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    return (
        <div>
            <Dialog
                open={open}
                onClose={handleClose}
                TransitionComponent={Transition}
                sx={{ width: '80%', margin: '0 auto', maxHeight: '500px' }}
            >
                <Grid container sx={{ pr: 2.5, pl: 2.5 }}>
                    <Grid item xs={12} md={12} lg={12} sx={{ p: 2.5 }}>
                        <Grid container>
                            {Proof &&
                                Proof.map((item) => (
                                    <Grid item xs={12} md={10} lg={10}>
                                        <InputLabel
                                            sx={{ cursor: 'pointer' }}
                                            onClick={() => {
                                                window.open(item?.fieldValue, '_blank');
                                            }}
                                            htmlFor="outlined-adornment-password-login"
                                            className="textfieldStyle"
                                        >
                                            {item.fieldName}
                                        </InputLabel>
                                    </Grid>
                                ))}
                            {/*   <Grid item xs={12} md={2} lg={2}>
                        
                                <CloseIcon  onClick={handleClose}/>
                           
                         
                            </Grid> */}
                        </Grid>
                    </Grid>
                </Grid>
            </Dialog>
        </div>
    );
}
