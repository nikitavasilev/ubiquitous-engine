import { forwardRef, useState } from 'react';

// material-ui
import { AppBar,DialogActions, Button, Dialog, CardMedia,Divider,Grid, IconButton, ListItemText, ListItemButton, List, Slide, Toolbar, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

// assets
import CloseIcon from '@mui/icons-material/Close';

// slide animation
const Transition = forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);

// ===============================|| UI DIALOG - FULL SCREEN ||=============================== //

export default function DetailsDialog({ open, setOpen, nftData }) {
    const theme = useTheme();
// console.log(
//     nftData.NFTTokens
//     , 'nftData in DETAIL********'
// )
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const status = [
        {
            name: 'Name:',
            value: nftData?.name
        },
        {
            name: 'Status:',
            value: nftData?.status
        },
        {
            name: 'Description:',
            value: nftData?.description
        },
        {
            name: 'Price:',
            value: nftData?.price
        },
        {
            name: 'Mint Type:',
            value: nftData?.mintType
        },
        {
            name: 'Brand:',
            value: nftData?.Brand.name
        },
        {
            name: 'Token URL:',
            value: 'Null'
        }
    ];
    return (
        <div>
           
            <Dialog fullScreen open={open} 
            onClose={handleClose} 
            TransitionComponent={Transition}>
             {/*    <IconButton float="left" color="inherit" onClick={handleClose} aria-label="close" size="large">
                    <CloseIcon />
                </IconButton> */}
                <DialogActions sx={{ pr: 2.5, pt: 2.5 }}>
                <Button  className='buttonSize' size='large' sx={{ color: theme.palette.error.dark }} onClick={handleClose} color="secondary">
                <CloseIcon />
                </Button>
            </DialogActions>
            <Grid container   sx={{ pr: 2.5,  pl: 2.5, pt: 2.5 }}>
            <Grid item xs={12} md={8} lg={8}  sx={{ pr: 2.5 }}>
                <List>
                    <ListItemButton>
                        <ListItemText
                            primary={<Typography variant="subtitle1" className='font-in-detail'>Name</Typography>}
                            secondary={<Typography variant="caption" className='font-in-detail' sx={{textTransform:'capitalize'}}>{nftData?.name}</Typography>}
                        />
                    </ListItemButton>
                    <Divider />
                    <ListItemButton>
                        <ListItemText
                            primary={<Typography variant="subtitle1" className='font-in-detail'>Status</Typography>}
                            secondary={<Typography variant="caption" className='font-in-detail'>{nftData?.status}</Typography>}
                        />
                    </ListItemButton>
                    <Divider />
                    <ListItemButton>
                        <ListItemText
                            primary={<Typography variant="subtitle1" className='font-in-detail'>Description</Typography>}
                            secondary={<Typography variant="caption" className='font-in-detail' sx={{textTransform:'capitalize'}}>{nftData?.description}</Typography>}
                        />
                    </ListItemButton>
                    <Divider />
                    <ListItemButton>
                        <ListItemText
                            primary={<Typography variant="subtitle1" className='font-in-detail' >Price</Typography>}
                            secondary={<Typography variant="caption" className='font-in-detail'  sx={{textTransform:'capitalize'}}>{nftData?.price}</Typography>}
                        />
                    </ListItemButton>
                    <Divider />
                    <ListItemButton>
                        <ListItemText
                            primary={<Typography variant="subtitle1" className='font-in-detail' >Mint Type</Typography>}
                            secondary={<Typography variant="caption" className='font-in-detail'  sx={{textTransform:'capitalize'}}>{ nftData?.mintType}</Typography>}
                        />
                    </ListItemButton>
                    <Divider />
                    <ListItemButton>
                        <ListItemText
                            primary={<Typography variant="subtitle1" className='font-in-detail' >Brand Name</Typography>}
                            secondary={<Typography variant="caption" className='font-in-detail'  sx={{textTransform:'capitalize'}}>{nftData?.Brand.name}</Typography>}
                        />
                    </ListItemButton>
                    <Divider />
                  {nftData.NFTTokens.map((item)=>(
                    <>
                    <ListItemButton>
                    <ListItemText
                        primary={<Typography variant="subtitle1" className='font-in-detail' >Serial Id</Typography>}
                        secondary={<Typography variant="caption" className='font-in-detail'  sx={{textTransform:'capitalize'}}>{item?.serialId? item?.serialId : 'No Serial Id' }</Typography>}
                    />
                    
                </ListItemButton>
                <Divider />
                </>
                  ))}
               
                </List>
                </Grid>
                <Grid item  xs={12} md={4} lg={4}>
                <CardMedia
                            
                component="img"
                image={nftData?.asset}
                
                sx={{ minheight: 'auto', maxHeight:'570px',
                 overflow: 'hidden', cursor: 'Pointer' }}
            />
               </Grid></Grid>
            </Dialog>
        </div>
    );
}
