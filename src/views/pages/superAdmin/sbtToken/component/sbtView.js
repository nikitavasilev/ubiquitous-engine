import { forwardRef, useState } from 'react';
// material-ui
import { AppBar, DialogActions, Button, Dialog, CardMedia, Divider, Grid, IconButton, ListItemText, ListItemButton, List, Slide, Toolbar, Typography, Tooltip } from '@mui/material';
import { useTheme } from '@mui/material/styles';
// assets
import CloseIcon from '@mui/icons-material/Close';
// slide animation
const Transition = forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);
import { Switch } from '@mui/material';
import { ethers, utils } from 'ethers';
import SBTAddress from "contractAbi/SBT-address.json";
import SBTAbi from "contractAbi/SBT.json";
// ===============================|| UI DIALOG - FULL SCREEN ||=============================== //

export default function DetailsDialog({ open, setOpen, sbtTable, details }) {
    const theme = useTheme();
    // console.log(details.SoulBoundMetas, 'details====================?')
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const [checked, setChecked] = useState(true);
    const [check, setCheck] = useState(true);
    const status = [
        {
            name: 'Name:',
            // value: nftData?.name
        },
        {
            name: 'Status:',
            // value: nftData?.status
        },
        {
            name: 'Description:',
            // value: nftData?.description
        },
    ];
    // const walletadded = (event, index) => {
    //     // setWallettoggle(true);
    //     setChecked(event.target.checked);
    //     {event.target.checked==false&&(console.log("workinggggg"))}
    //     console.log("-----------------------",event.target.checked);
    // };
    // console.log("43", checked)
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const sbt = new ethers.Contract(SBTAddress.address, SBTAbi.abi, signer);
    async function myFunction() {
        return
        // changeStatus(
        //     address to,
        //     uint256 _tokenId,
        //     bool _status
        // )
    };
    return (
        <div>
            <Dialog fullScreen open={open}
                onClose={handleClose}
                TransitionComponent={Transition}>
                {/*    <IconButton float="left" color="inherit" onClick={handleClose} aria-label="close" size="large">
                    <CloseIcon />
                </IconButton> */}
                <DialogActions sx={{ pr: 2.5, pt: 2.5, cursor: "pointer" }}>
                    <Button className='buttonSize' size='large' sx={{ color: theme.palette.error.dark }} onClick={handleClose} color="secondary">
                        <CloseIcon />
                    </Button>
                </DialogActions>
                {details.SoulBoundMetas &&
                    details.SoulBoundMetas.map((nft, index) => {
                        return (
                            <Grid container sx={{ pr: 2.5, pl: 2.5, pt: 2.5 }}>
                                <Grid item xs={12} md={8} lg={8} sx={{ pr: 2.5 }}>
                                    <List>
                                        <ListItemButton>
                                            <ListItemText
                                                primary={<Typography variant="subtitle1" className='font-in-detail'>Field Name</Typography>}
                                                secondary={<Typography variant="caption" className='font-in-detail' sx={{ textTransform: 'capitalize' }}>{nft.fieldName}</Typography>}
                                            />
                                            <ListItemButton>
                                                <ListItemText
                                                    primary={<Typography variant="subtitle1" className='font-in-detail'>Field Value</Typography>}
                                                    secondary={<Typography variant="caption" className='font-in-detail'>{nft.fieldValue ? nft.fieldValue : "null"}</Typography>}
                                                />
                                                {nft?.fieldValue == 'true' ?
                                                    <ListItemButton>
                                                        <ListItemText
                                                            primary={<Typography variant="subtitle1" className='font-in-detail'>Toggle</Typography>}
                                                            secondary={<Typography variant="caption" className='font-in-detail' sx={{ textTransform: 'capitalize' }}>
                                                                <Tooltip
                                                                    className="fontsize"
                                                                    title="SBT"
                                                                    placement="top"
                                                                    arrow
                                                                >
                                                                    <Switch
                                                                        // value={nft?.fieldValue == true ? checked : false}
                                                                        checked={nft?.fieldValue == 'true' && checked}
                                                                        onChange={(e) => {
                                                                            setChecked(e.target.checked);
                                                                            if (e.target.checked == false) {
                                                                                alert("workingggg")
                                                                                // myFunction();
                                                                            }
                                                                            // else{
                                                                            //     alert("not workinggggggg");
                                                                            // }
                                                                        }}
                                                                    />
                                                                </Tooltip>
                                                            </Typography>
                                                            }
                                                        />
                                                    </ListItemButton> :
                                                    <></>
                                                }


                                            </ListItemButton>
                                        </ListItemButton>
                                        <Divider />
                                    </List>
                                </Grid>
                                <Grid item xs={12} md={4} lg={4}>
                                    <CardMedia

                                        component="img"
                                        // image={nftData?.asset}
                                        sx={{
                                            minheight: 'auto', maxHeight: '570px',
                                            overflow: 'hidden', cursor: 'Pointer'
                                        }}
                                    />
                                </Grid></Grid>
                        );
                    })}
            </Dialog>
        </div>
    );
}
