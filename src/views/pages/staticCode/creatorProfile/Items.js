import { useState, useEffect } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
// import SearchIcon from '@material-ui/icons/Search';
import {
    Container,
    Card,
    Grid,
    Typography,
    CardActionArea,
    CardContent,
    Divider,
    OutlinedInput,
    InputAdornment,
    TextField,
    MenuItem,
    IconButton
} from '@mui/material';
import React from 'react';
// project imports
// import { IconSearch } from '@tabler/icons';

import { gridSpacing } from 'store/constant';

import CardMedia from '@mui/material/CardMedia';
import MenuOpenIcon from 'assets/images/clearData.png';
// import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import { useDispatch, useSelector } from 'react-redux';
import { getAllNftUser } from 'redux/nftManagement/actions';
import { useNavigate } from 'react-router-dom';

// =============================|| LANDING - FEATURE PAGE ||============================= //

const Items = () => {
    const navigate = useNavigate();
    const user = useSelector((state) => state.auth.user);

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(
            getAllNftUser({
                walletAddress: user.walletAddress
            })
        );
    }, []);

    const theme = useTheme();
    const [value, setValue] = React.useState('Order By');

    const status = [
        {
            value: 'Order By',
            label: 'Order By'
        },
        {
            value: 'order 1',
            label: 'order 1'
        },
        {
            value: 'order 2',
            label: 'order 2'
        }
    ];

    const { nfts } = useSelector((state) => state.nftReducer.nftListUser);

    const itemData = [];
    {
        nfts?.length > 0 &&
            nfts.map((data) => {
                itemData.push({
                    img: data.asset,
                    heading: data.name,
                    price: data.price,
                    currencyType: data.currencyType
                });
            });
    }

    return (
        <Grid mt={2} container-fluid spacing={gridSpacing}>
          {/*   <Grid item xs={12} lg={12} md={12}>
                <Grid container sx={{ mb: 2 }}>
                    <Grid item md={1} xs={12}>
                        <img src={MenuOpenIcon} />
                    </Grid>
                    <Grid item md={7} xs={12} sx={{ marginLeft: { md: '-74px', xl: '-74px' }, marginTop: { md: '-11px' } }}>
                        <TextField
                            sx={{
                                backgroundColor: theme.palette.mode === 'dark' ? '#181C1F' : '#ccc',
                                color: theme.palette.mode === 'dark' ? '#fff' : '#000',
                                borderRadius: '4px',
                                padding: '20px 3px 0 0'
                            }}
                            fullWidth
                            variant="standard"
                            placeholder="Search by name or attribute"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment>
                                        <IconButton>
                                            <SearchIcon />
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }}
                        />
               
                    </Grid>
                    <Grid
                        item
                        md={3}
                        xs={12}
                        sx={{
                            backgroundColor: theme.palette.mode === 'dark' ? '#181C1F' : '#ccc',
                            color: theme.palette.mode === 'dark' ? '#fff' : '#000',
                            marginLeft: { md: '6px', xl: '6px' },
                            marginTop: { md: '-11px', xs: '10px', sm: '10px' }
                        }}
                    >
                        <TextField
                            variant="standard"
                            sx={{
                                backgroundColor: theme.palette.mode === 'dark' ? '#181C1F' : '#ccc',
                                border: '2px solid #181C1F !important',
                                borderRadius: '4px',
                                padding: '15px 3px 0 3px !important'
                            }}
                            // className="select"
                            fullWidth
                            size="small"
                            id="standard-select-currency"
                            select
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                        >
                            {status.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                </Grid>
            </Grid> */}

            <Grid mt={4} item xs={12}>
                <Grid container justifyContent="left" spacing={gridSpacing} sx={{ textAlign: 'center' }}>
                    {nfts?.length > 0 ? (
                        <>
                            {nfts?.map((data) => (
                                <Grid
                                    item
                                    md={2}
                                    sm={6}
                                    onClick={() => {
                                        navigate('/productDetails/' + data.id, {
                                            state: {
                                                nft: data
                                            }
                                        });
                                    }}
                                >
                                    <Card
                                        sx={{
                                            color: theme.palette.mode === 'dark' ? 'white' : '#404040',
                                            background: theme.palette.mode === 'dark' ? '#181C1F' : 'white',
                                            maxWidth: 365,
                                            width: '105%',

                                            borderRadius: '3px'
                                        }}
                                    >
                                        <CardActionArea>
                                            <CardMedia component="img" height="200"  sx={{objectFit:'scale-down'}}  image={data.asset} />
                                            <CardContent sx={{ padding: '6%' }}>
                                                <Grid container>
                                                    <Grid item xs={8} sx={{ textAlign: 'left' }}>
                                                        <span className="cardHeading encap" style={{ fontSize: '130%' }}>
                                                            {data.name}{' '}
                                                        </span>
                                                        <div className="overflow" style={{ marginTop: '5%', color: '#656565' }}>
                                                            {data.price} {data.currencyType}
                                                        </div>
                                                    </Grid>
                                                    <Grid item xs={4} sx={{ background: '' }}>
                                                        <span sx={{ fontWeight: '50 !important ', fontSize: '110%', float: 'right' }}>
                                                            {/* {item.creator} */}
                                                        </span>
                                                    </Grid>
                                                </Grid>

                                                {/* <Divider sx={{ mt: 2, mb: 2 }} /> */}
                                            </CardContent>
                                        </CardActionArea>
                                    </Card>
                                </Grid>
                            ))}
                        </>
                    ) : (
                        <Grid item xs={12}>
                            <Typography
                                variant="h3"
                                mt={1}
                                component="div"
                                sx={{ textAlign: { xs: 'center', md: 'left', sm: 'center', color: 'gray' }, textTransform: 'capitalize' }}
                            >
                                No bought nfts found..!
                            </Typography>
                        </Grid>
                    )}
                </Grid>
            </Grid>
        </Grid>
    );
};

export default Items;
