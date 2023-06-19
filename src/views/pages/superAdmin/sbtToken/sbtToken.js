import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { gridSpacing } from 'store/constant';
import { useTheme } from '@mui/material/styles';
import { Pagination, Menu, MenuItem, TextField, Box } from '@mui/material';
import {
    Divider,
    Typography,
    IconButton,
    Grid,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    Button,
    TableRow,
    Tooltip,
    Stack,
    CircularProgress
} from '@mui/material';
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';
import MainCard from 'ui-component/cards/MainCard';
import Token from './component/addSbtToken';
import { getsbtToken } from '../../../../redux/nftManagement/actions';
import Nftcard from './component/NftCard';
import { Switch } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Avatar from 'ui-component/extended/Avatar';
import DetailsDialog from './component/sbtView'
const typeArray = [
    {
        value: 'all',
        label: "All NFT'S"
    },
    {
        value: 'directMint',
        label: 'Minted NFTS'
    },
    {
        value: 'lazyMint',
        label: "Lazy Minted NFT'S"
    },
    {
        value: 'waiting',
        label: 'Waiting For approval'
    },
    {
        value: 'draft',
        label: 'Draft NFTS'
    },
    {
        value: 'rejected',
        label: 'Rejected NFTS'
    }
];

const sbtToken = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user);
    const [type, setType] = useState('all');
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(12);
    const [open, setOpen] = useState();
    const [addNftOpen, setAddNftOpen] = useState(false);
    const [loader, setLoader] = useState(true);
    const [anchorEl, setAnchorEl] = useState(null);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
        setLoader(false);
    };
    const handleType = (event) => {
        setType(event.target.value);
        setLimit(12);
        setSearch('');
        setPage(1);
    };
    const [checked, setChecked] = useState();
    const [details, setDetails] = useState('');
    const nftList = useSelector((state) => state.nftReducer.sbtList);
    const sbtTable = useSelector((state) => state.nftReducer.sbtList?.soul);
    console.log(sbtTable, 'sbtTable');
    const sbt = useSelector((state) => state.nftReducer.sbtList?.soul?.rows?.SoulBoundMetas
    );

    useEffect(() => {
        dispatch(
            getsbtToken({
                // categoryId: location.state.data.CategoryId,
                // search: search,
                page: page,
                limit: limit,
                // type: type,
                // brandId: user.BrandId,
                handleClose: handleClose
            })
        );
    }, [page, limit]);
    const [DetailsNftOpen, setDetailsNftOpen] = useState(false);


    return (
        <>
            <DetailsDialog
                open={DetailsNftOpen}
                setOpen={setDetailsNftOpen}
                details={details}
            // sbtTable={sbtTable}
            />
            <Token
                open={addNftOpen}
                setOpen={setAddNftOpen}
                data={location?.state?.data}
                search={search}
                page={page}
                limit={limit}
                nftType={type}
                nftList={nftList}
            />
            <MainCard
                className="Adminheading"

                // title={
                //     <Grid container sx={{ display: 'flex' }}>
                //         <Grid item md={8} xs={12}>
                //             <Typography
                //                 variant="h1"
                //                 component="h2"
                //                 className="headingcard"
                //                 sx={{
                //                     fontWeight: 600, color: theme.palette.mode === 'dark' ? '#fff' : '#000',
                //                     marginLeft: { lg: '-20px', md: '-20px' },
                //                 }}
                //             >
                //                Sbt Token
                //             </Typography>
                //         </Grid>
                //         {/* <Grid item md={4} xs={12}>
                //             <Button
                //                 className="buttonSize"
                //                 sx={{ float: { xs: 'left', md: 'right' }, marginTop: { xs: "10px", md: "0px" } }}
                //                 variant="contained"
                //                 size="large"
                //                 onClick={() => {
                //                     navigate('/categories');
                //                 }}
                //             >
                //                 Back
                //             </Button>
                //         </Grid> */}
                //     </Grid>
                // }
                content={false}
            ></MainCard>
            <MainCard
                className="yellow tableShadow"
                title={
                    <Grid container spacing={4}>
                        <Grid item xs={12} lg={8}>
                            <Typography className="mainheading" variant="h1" component="h2"
                                sx={{ marginLeft: { lg: '48px', md: '48px' }, marginTop: { md: "6px" } }}>
                                Sbt Token
                            </Typography>
                        </Grid>
                        {/* <Grid item xs={6} lg={2}>
                            <TextField
                                className="selectField selectstyle"
                                id="outlined-select-budget"
                                select
                                fullWidth
                                value={type}
                                onChange={handleType}
                                variant="standard"
                            >
                                {typeArray.map((option, index) => (
                                    <MenuItem key={index} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid> */}
                        <Grid item xs={6} lg={2} textAlign="end">
                            <Button
                                className="buttonSize"
                                sx={{ marginLeft: { lg: '-16px', md: '-16px' } }}
                                variant="contained"
                                size="large"
                                onClick={() => {
                                    setAddNftOpen(true);
                                }}
                            >
                                Add Token
                            </Button>
                        </Grid>
                    </Grid>
                }
                content={false}
            >
                <Grid container>
                    {/* {(nftList && nftList.nfts && nftList.nfts.rows && nftList.nfts.rows != undefined) ? (
                        <> */}
                    {/* { nftList.nfts.rows.length > 0?(
                        <> */}
                    {' '}
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell align="left" className="Tableheading" sx={{ borderBottom: 'none' }}></TableCell>
                                <TableCell align="left" className="Tableheading" sx={{ borderBottom: 'none' }}>
                                    Token Name
                                </TableCell>
                                <TableCell align="left" className="Tableheading" sx={{ borderBottom: 'none' }}>
                                    Symbol
                                </TableCell>
                                <TableCell align="left" className="Tableheading" sx={{ borderBottom: 'none' }}>
                                    Address
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody sx={{ padding: '10px' }}>
                            {sbtTable?.rows &&
                                sbtTable?.rows.map((nft, index) => {
                                    return (
                                        <>
                                            <TableRow>
                                                <TableCell
                                                    align="left"
                                                    className="tableName"
                                                    sx={{ textTransform: 'capitalize' }}
                                                ></TableCell>
                                                <TableCell align="left" className="tableName"
                                                    sx={{
                                                        display: 'flex',
                                                        borderBottom: 'none',
                                                        textTransform: 'capitalize',
                                                        borderBottom: 'none',
                                                        cursor: "pointer"

                                                    }}>
                                                    <Grid item lg={2}>
                                                        <Avatar alt="Brand Image" src={nft.image} sx={{}} onClick={() => {
                                                            // navigate('/sbtToken/view');
                                                            setDetailsNftOpen(true);
                                                            setDetails(nft);

                                                        }} />
                                                    </Grid>
                                                    {nft.tokenName}
                                                </TableCell>
                                                <TableCell align="left" className="tableName" sx={{ textTransform: 'capitalize' }}>
                                                    {nft.brandSymbol}
                                                </TableCell>
                                                <TableCell align="left" className="tableName">
                                                    {nft.address.slice(0, 5) + '...' + nft.address.slice(38, 42)}
                                                </TableCell >
                                            </TableRow>
                                        </>
                                    );
                                })}
                        </TableBody>
                    </Table>
                    <Grid item xs={12} sx={{ p: 3 }}>
                        <Grid container justifyContent="center" spacing={gridSpacing}>
                            <Grid item>
                                <Pagination
                                    page={page}
                                    color="primary"
                                    showFirstButton
                                    showLastButton
                                    count={nftList && nftList.pages}
                                    onChange={(event, newPage) => {
                                        setPage(newPage);
                                    }}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                    {/* </>
                       )
                       :
                       (
                        <Grid item>
                        <Typography className="statustypo" style={{  padding: '20px 20px 20px 70px', fontWeight: '500' }}>
                         No Data Available</Typography>
                    </Grid>
                       )}
                        </>
                    ) : (
                        <>
                        <Grid container justifyContent="center" sx={{ width: '80%', m: '15px auto '}}>
                                <Grid item>
                            <CircularProgress disableShrink size={'4rem'} />
                        </Grid>
                                </Grid>
                        </>
                  
                    )} */}
                </Grid>
            </MainCard>
        </>
    );
};

export default sbtToken;
