import { useState, useEffect } from 'react';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { gridSpacing } from 'store/constant';
import { useTheme } from '@mui/material/styles';
import '@fontsource/public-sans';
import SubCard from 'ui-component/cards/SubCard';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import LinearProgress from '@mui/material/LinearProgress';
import { Typography, Grid, Select, InputLabel, FormControl, MenuItem, Divider } from '@mui/material';
import { IconSearch } from '@tabler/icons';
import { IconButton, Stack, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip } from '@mui/material';
import OutlinedInput from '@mui/material/OutlinedInput';
import { useNavigate } from 'react-router-dom';
import { getTrack } from 'redux/marketplace/actions';
import FactoryAbi from 'contractAbi/Factory.json';
import { ethers, utils } from 'ethers';
import FactoryAddress from 'contractAbi/Factory-address.json';
import MainCard from 'ui-component/cards/MainCard';
import CircularProgress from '@mui/material/CircularProgress';
const Activity = ({ nftList }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [seconds, setSeconds] = useState(5);
    useEffect(() => {
        let interval = null;

        if (seconds > 0) {
            interval = setInterval(() => {
                setSeconds((seconds) => seconds - 1);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [seconds]);
    console.log(nftList?.nft?.NFTTokens?.[0]?.serialId, 'nftList*********');
    var serialId = nftList?.nft?.NFTTokens?.[0]?.serialId;
    console.log(seconds, 'seconds');
    useEffect(() => {
        if (seconds == 0) {
            const fetchData = async () => {
                try {
                    if (serialId) {
                        const provider = new ethers.providers.Web3Provider(window.ethereum);
                        const signer = provider.getSigner();
                        const factoryAddr = new ethers.Contract(FactoryAddress.address, FactoryAbi.abi, signer);
                        console.log('factoryAddr', factoryAddr);
                        let res = await factoryAddr.serials(serialId);
                        console.log(res, 'res******');
                        let address = res[0].toLowerCase();
                        let tokenId = parseInt(res[1]._hex);
                        console.log(address, 'address');

                        tokenId = tokenId.toString();
                        console.log('tokenId', tokenId);
                        dispatch(
                            getTrack({
                                serialId: serialId,
                                tokenId: `${tokenId}`,
                                address: address,
                                navigate: navigate
                            })
                        );
                    } else {
                        console.log('no serial id');
                    }
                } catch (error) {
                    console.error('Error fetching data:', error);
                }
            };

            fetchData();
        }
    }, [seconds]);

    const marketplaceNfts = useSelector((state) => state.marketplaceReducer.trackNft);
    console.log(' marketplaceNfts>>>>', marketplaceNfts?.activity);
    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                width: 250
            }
        }
    };

    function getStyles(name, personName) {
        return {
            fontWeight: personName.indexOf(name) === -1 ? theme.typography.fontWeightRegular : theme.typography.fontWeightMedium
        };
    }
    const theme = useTheme();
    const [personName, setPersonName] = useState('Filter');
    const names = [
        {
            label: 'Filter',
            value: 'Filter'
        },
        {
            label: 'List',
            value: 'List'
        },
        {
            label: 'Mint',
            value: 'Mint'
        },
        {
            label: 'Mint Bulk',
            value: 'Mint Bulk'
        },
        {
            label: 'Transfer',
            value: 'Transfer'
        },
        {
            label: 'Transfer Muliple',
            value: 'Transfer Muliple'
        }
    ];
    const handleChange = (event) => {
        setPersonName(event.target.value);
        // console.log(personName , 'personName==========');
    };
    const itemData = [
        {
            title: 'List',
            price: '0.006 ETH',
            from: 'Vlad556 ',
            to: 'Vlad556 ',
            days: '9 Days ago '
        },
        {
            title: 'List',
            price: '0.006 ETH',
            from: 'Alex 67 ',
            to: 'Alex 67 ',
            days: '6 Days ago '
        },
        {
            title: 'List',
            price: '0.006 ETH',
            from: 'cynthia321 ',
            to: 'cynthia321 ',
            days: '60 Days ago '
        },
        {
            title: 'List',
            price: '0.006 ETH',
            from: 'Vlad556 ',
            to: 'Vlad556 ',
            days: '79 Days ago '
        }
    ];
    const [search, setSearch] = useState('');

    return (
        <>
            <Grid container-fluid spacing={gridSpacing} sx={{ margin: '15px' }}>
                <Grid item xs={12} lg={12} md={12}>
                    <Grid container spacing={2} sx={{ mb: 2 }}>
                        <Grid item xs={12}>
                            <Typography
                                color={theme.palette.mode === 'dark' ? '#FFFFFF' : 'black'}
                                className="productfigmastyl"
                                variant="h2"
                                mt={4}
                                component="div"
                                sx={{ textAlign: { xs: 'center', md: 'left', sm: 'center' }, textTransform: 'capitalize' }}
                            >
                                Activity
                                <AutorenewIcon />
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>

                <Grid item xs={12}>
                    <Grid item md={12} sm={12}>
                        <MainCard
                            className="tableShadow"
                            sx={{ background: theme.palette.mode === 'dark' ? '#181C1F' : '#fff' }}
                            title={
                                <Grid container spacing={gridSpacing}>
                                    <Grid item xs={12}>
                                        <div>
                                            <FormControl
                                                sx={{
                                                    background: theme.palette.mode === 'dark' ? '#181C1F' : '#d9d9d9',
                                                    color: theme.palette.mode === 'dark' ? '#ffff' : 'black',
                                                    padding: '10px 10px 10px 10px',
                                                    border: '2px solid #CDCDCD',
                                                    borderRadius: '4px'
                                                }}
                                                fullWidth
                                            >
                                                <Select
                                                    variant="standard"
                                                    fullWidth
                                                    displayEmpty
                                                    value={personName}
                                                    onChange={handleChange}
                                                    // input={<OutlinedInput />}

                                                    inputProps={{ 'aria-label': 'Without label' }}
                                                >
                                                    {/* <MenuItem disabled value="">
                                  <em>aiman</em>
                                </MenuItem> */}
                                                    {names.map((name) => (
                                                        <MenuItem
                                                            key={name.label}
                                                            value={name?.value}
                                                            style={getStyles(name, personName, theme)}
                                                        >
                                                            {name.value}
                                                        </MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>
                                        </div>
                                        {/*    <FormControl  sx={{ background:theme.palette.mode === 'dark' ? '#181C1F'
                                        : '#d9d9d9',color:theme.palette.mode === 'dark' ? '#ffff'
                                        : 'black', border: '2px solid #CDCDCD' , borderRadius:'4px'}} fullWidth>
                                            <InputLabel className='activityTable'  sx={{color:'#CDCDCD'}} id="age-select">Filter</InputLabel>
                                            <Select
                                            variant='standard'
                                                fullWidth
                                                labelId="age-select"
                                                id="age"
                                                name="age"
                                                // defaultValue={formik.values.age}
                                                // onChange={formik.handleChange}
                                                label="Age"
                                            >
                                                <MenuItem value="">
                                                    <em className='activityTable' >Filter</em>
                                                </MenuItem>
                                                <MenuItem value={10}>Ten</MenuItem>
                                                <MenuItem value={20}>Twenty</MenuItem>
                                                <MenuItem value={30}>Thirty</MenuItem>
                                            </Select>
                                        </FormControl> */}
                                    </Grid>
                                </Grid>
                            }
                            content={false}
                        >
                            <Divider />
                            <TableContainer>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell className="activityTable" sx={{ fontSize: '18px !important' }} align="center">
                                                Event{' '}
                                            </TableCell>

                                            <TableCell className="activityTable" sx={{ fontSize: '18px !important' }} align="center">
                                                Price{' '}
                                            </TableCell>
                                            <TableCell className="activityTable" sx={{ fontSize: '18px !important' }} align="center">
                                                From
                                            </TableCell>

                                            <TableCell className="activityTable" sx={{ fontSize: '18px !important' }} align="center">
                                                To{' '}
                                            </TableCell>
                                            <TableCell className="activityTable" sx={{ fontSize: '18px !important' }} align="center">
                                                Date
                                            </TableCell>
                                        </TableRow>
                                    </TableHead>
                                    {seconds != 0 ? (
                                        <TableBody>
                                            <TableCell className="activityTable" sx={{ fontSize: '18px !important' }} align="center">
                                                <Box sx={{ width: '100%', color: 'grey.500' }}>
                                                    <LinearProgress />
                                                </Box>
                                            </TableCell>
                                            <TableCell className="activityTable" sx={{ fontSize: '18px !important' }} align="center">
                                                <Box sx={{ width: '100%', color: 'grey.500' }}>
                                                    <LinearProgress />
                                                </Box>
                                            </TableCell>
                                            <TableCell className="activityTable" sx={{ fontSize: '18px !important' }} align="center">
                                                <Box sx={{ width: '100%', color: 'grey.500' }}>
                                                    <LinearProgress />
                                                </Box>
                                            </TableCell>
                                            <TableCell className="activityTable" sx={{ fontSize: '18px !important' }} align="center">
                                                <Box sx={{ width: '100%', color: 'grey.500' }}>
                                                    <LinearProgress />
                                                </Box>
                                            </TableCell>
                                            <TableCell className="activityTable" sx={{ fontSize: '18px !important' }} align="center">
                                                <Box sx={{ width: '100%', color: 'grey.500' }}>
                                                    <LinearProgress />
                                                </Box>
                                            </TableCell>
                                        </TableBody>
                                    ) : (
                                        <>
                                            {marketplaceNfts && marketplaceNfts?.activity?.length < 0 ? (
                                                <TableBody>
                                                    <TableCell
                                                        className="activityTable"
                                                        sx={{ fontSize: '18px !important' }}
                                                        align="center"
                                                    >
                                                        No activity found!
                                                    </TableCell>
                                                </TableBody>
                                            ) : (
                                                marketplaceNfts?.activity?.map((item) => (
                                                    <TableBody>
                                                        {personName == item.event ? (
                                                            <TableRow>
                                                                <TableCell
                                                                    className="activityTable"
                                                                    sx={{ fontSize: '15px' }}
                                                                    align="center"
                                                                >
                                                                    {item.event}
                                                                </TableCell>

                                                                <TableCell
                                                                    className="activityTable"
                                                                    sx={{ fontSize: '15px' }}
                                                                    align="center"
                                                                >
                                                                    {item?.event == 'List' || 'Bought' || 'Resell' ? item?.price : ' '}
                                                                </TableCell>

                                                                <TableCell
                                                                    className="activityTable"
                                                                    sx={{ fontSize: '15px', color: '#2194FF', cursor: 'pointer' }}
                                                                    align="center"
                                                                    onClick={() => {
                                                                        window.open(
                                                                            `https://mumbai.polygonscan.com/address/${
                                                                                item?.from ? item?.from : item?.minter
                                                                            }`,
                                                                            '_blank'
                                                                        );
                                                                    }}
                                                                >
                                                                    {item?.from
                                                                        ? item?.from?.slice(0, 5) + '...' + item?.from?.slice(38, 42)
                                                                        : item?.minter
                                                                        ? item?.minter?.slice(0, 5) + '...' + item?.minter?.slice(38, 42)
                                                                        : ''}
                                                                </TableCell>

                                                                <TableCell
                                                                    className="activityTable"
                                                                    sx={{ fontSize: '15px', color: '#2194FF', cursor: 'pointer' }}
                                                                    align="center"
                                                                    onClick={() => {
                                                                        window.open(
                                                                            `https://mumbai.polygonscan.com/address/${item?.to}`,
                                                                            '_blank'
                                                                        );
                                                                    }}
                                                                >
                                                                    {item?.to
                                                                        ? item?.to?.slice(0, 5) + '...' + item?.to?.slice(38, 42)
                                                                        : ''}
                                                                </TableCell>
                                                                <TableCell
                                                                    className="activityTable"
                                                                    sx={{ fontSize: '15px' }}
                                                                    align="center"
                                                                >
                                                                    {Date(item?.blockTimestamp).slice(0, 15)}
                                                                </TableCell>
                                                            </TableRow>
                                                        ) : (
                                                            personName == 'Filter' && (
                                                                <TableRow>
                                                                    {item.event == 'Transfer' ? (
                                                                        <Tooltip placement="top" title="Internal Transfer">
                                                                            <TableCell
                                                                                className="activityTable"
                                                                                sx={{ fontSize: '15px', cursor: 'pointer' }}
                                                                                align="center"
                                                                            >
                                                                                {item.event}
                                                                            </TableCell>
                                                                        </Tooltip>
                                                                    ) : (
                                                                        <TableCell
                                                                            className="activityTable"
                                                                            sx={{ fontSize: '15px' }}
                                                                            align="center"
                                                                        >
                                                                            {item.event}
                                                                        </TableCell>
                                                                    )}
                                                                    {/*          {item?.brandImage ? (
               <TableCell
                   className="activityTable"
                   sx={{ fontSize: '15px', display: 'flex' }}
                   align="center"
               >
                   <Grid item lg={2}></Grid>
                   <Grid item lg={2}>
                       <Avatar alt="" src={item?.brandImage} />
                   </Grid>
                   <Grid item lg={6} sx={{ alignSelf: 'center' }}>
                       {item?.brandImage ? item?.brandName : ''}
                   </Grid>
               </TableCell>
           ) : (
               <TableCell
                   className="activityTable"
                   sx={{ fontSize: '15px', display: 'flex' }}
                   align="center"
               >
                   <Grid item lg={2}></Grid>
                   <Grid item lg={2}>
                       <Avatar sx={{ bgcolor: 'transparent', color: 'transparent' }}>b</Avatar>
                   </Grid>
                   <Grid item lg={6} sx={{ alignSelf: 'center' }}>
                       {item?.brandImage ? item?.brandName : ''}
                   </Grid>
               </TableCell>
           )} */}

                                                                    <TableCell
                                                                        className="activityTable"
                                                                        sx={{ fontSize: '15px' }}
                                                                        align="center"
                                                                    >
                                                                        {item?.event == 'List' || 'Bought' || 'Resell' ? item?.price : ' '}
                                                                    </TableCell>

                                                                    <TableCell
                                                                        className="activityTable"
                                                                        sx={{ fontSize: '15px', color: '#2194FF', cursor: 'pointer' }}
                                                                        align="center"
                                                                        onClick={() => {
                                                                            window.open(
                                                                                `https://mumbai.polygonscan.com/address/${
                                                                                    item?.from ? item?.from : item?.minter
                                                                                }`,
                                                                                '_blank'
                                                                            );
                                                                        }}
                                                                    >
                                                                        {item?.from
                                                                            ? item?.from?.slice(0, 5) + '...' + item?.from?.slice(38, 42)
                                                                            : item?.minter
                                                                            ? item?.minter?.slice(0, 5) +
                                                                              '...' +
                                                                              item?.minter?.slice(38, 42)
                                                                            : ''}
                                                                    </TableCell>

                                                                    <TableCell
                                                                        className="activityTable"
                                                                        sx={{ fontSize: '15px', color: '#2194FF', cursor: 'pointer' }}
                                                                        align="center"
                                                                        onClick={() => {
                                                                            window.open(
                                                                                `https://mumbai.polygonscan.com/address/${item?.to}`,
                                                                                '_blank'
                                                                            );
                                                                        }}
                                                                    >
                                                                        {item?.to
                                                                            ? item?.to?.slice(0, 5) + '...' + item?.to?.slice(38, 42)
                                                                            : ''}
                                                                    </TableCell>
                                                                    <TableCell
                                                                        className="activityTable"
                                                                        sx={{ fontSize: '15px' }}
                                                                        align="center"
                                                                    >
                                                                        {Date(item?.blockTimestamp).slice(0, 15)}
                                                                    </TableCell>
                                                                </TableRow>
                                                            )
                                                        )}
                                                    </TableBody>
                                                ))
                                            )}
                                        </>
                                    )}
                                </Table>
                            </TableContainer>
                        </MainCard>
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
};

export default Activity;
