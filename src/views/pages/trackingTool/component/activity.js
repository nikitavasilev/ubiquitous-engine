import { useState, useEffect } from 'react';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { gridSpacing } from 'store/constant';
import { useTheme } from '@mui/material/styles';
import moment from 'moment';
import { Pagination } from '@mui/material';
import Avatar from 'ui-component/extended/Avatar';

import '@fontsource/public-sans';
import SubCard from 'ui-component/cards/SubCard';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import { Typography, Grid, Select, InputLabel, FormControl, MenuItem, Divider } from '@mui/material';
import { IconSearch } from '@tabler/icons';
import { IconButton, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip } from '@mui/material';
import OutlinedInput from '@mui/material/OutlinedInput';
import MainCard from 'ui-component/cards/MainCard';
import { ethers } from 'ethers';
const Activity = ({ tracking }) => {
    //    let index=1;
    //    let price = ethers.utils.formatEther(tracking?.activity[index].price)
    // console.log(  tracking?.activity[0] , 'price=====================>>>');

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

    // const names = ['Sales', 'Listings', 'Offers', 'Transfers'];

    function getStyles(name, personName) {
        return {
            fontWeight: personName.indexOf(name) === -1 ? theme.typography.fontWeightRegular : theme.typography.fontWeightMedium
        };
    }
    const theme = useTheme();
    const [personName, setPersonName] = React.useState('Filter');
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
    const cardsPerPage = 3;
    const [currentPage, setCurrentPage] = useState(1);
    const indexOfLastCard = currentPage * cardsPerPage;
    const indexOfFirstCard = indexOfLastCard - cardsPerPage;
    const currentCards = itemData.slice(indexOfFirstCard, indexOfLastCard);

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
                                sx={{ textAlign: { xs: 'center', md: 'center', sm: 'center' }, textTransform: 'capitalize' }}
                            >
                                Metadatas and ownership Activity
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
                                            {/*   <TableCell className="activityTable" sx={{ fontSize: '18px !important' }} align="center">
                                                Brand Name{' '}
                                            </TableCell> */}
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

                                    {tracking?.activity?.length < 0 ? (
                                        <TableBody>
                                            <TableCell className="activityTable" sx={{ fontSize: '18px !important' }} align="center">
                                                No activity found!
                                            </TableCell>
                                        </TableBody>
                                    ) : (
                                        tracking?.activity?.map((item) => (
                                            <TableBody>
                                                {personName == item.event ? (
                                                    <TableRow>
                                                        <TableCell className="activityTable" sx={{ fontSize: '15px' }} align="center">
                                                            {item.event}
                                                        </TableCell>
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

                                                        <TableCell className="activityTable" sx={{ fontSize: '15px' }} align="center">
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
                                                                window.open(`https://mumbai.polygonscan.com/address/${item?.to}`, '_blank');
                                                            }}
                                                        >
                                                            {item?.to ? item?.to?.slice(0, 5) + '...' + item?.to?.slice(38, 42) : ''}
                                                        </TableCell>
                                                        <TableCell className="activityTable" sx={{ fontSize: '15px' }} align="center">
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
                                                                        sx={{ fontSize: '15px' , cursor:'pointer' , }}
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

                                                            <TableCell className="activityTable" sx={{ fontSize: '15px' }} align="center">
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
                                                                {item?.to ? item?.to?.slice(0, 5) + '...' + item?.to?.slice(38, 42) : ''}
                                                            </TableCell>
                                                            <TableCell className="activityTable" sx={{ fontSize: '15px' }} align="center">
                                                                {Date(item?.blockTimestamp).slice(0, 15)}
                                                            </TableCell>
                                                        </TableRow>
                                                    )
                                                )}
                                            </TableBody>
                                        ))
                                    )}

                                    {/*   </>
                                    ))} */}
                                </Table>
                                {/*      <Pagination
                                count={Math.ceil(currentCards.length / cardsPerPage)}
                                onChange={(event, value) => setCurrentPage(value)}
                                page={currentPage}
                              /> */}
                            </TableContainer>
                        </MainCard>
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
};

export default Activity;
