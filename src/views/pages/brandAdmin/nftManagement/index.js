import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { gridSpacing } from 'store/constant';
import { useTheme } from '@mui/material/styles';
import { Button, Grid, Typography, Pagination, Menu, MenuItem, TextField, Box } from '@mui/material';
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';
import MainCard from 'ui-component/cards/MainCard';
import AddNft from './component/addNft';
import { getAllNft } from '../../../../redux/nftManagement/actions';
import NftCard from './component/nftcard';
import CircularProgress from '@mui/material/CircularProgress';
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
    },
  
    {
        value: 'edit_requests',
        label: 'Edit Requests'
    },
];

const NftManagement = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();

    const user = useSelector((state) => state.auth.user);
    const [type, setType] = useState('all');
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(12);
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

    useEffect(() => {
        dispatch(
            getAllNft({
                categoryId: location?.state?.data?.CategoryId,
                search: search,
                page: page,
                limit: limit,
                type: type,
                brandId: user.BrandId,
                handleClose: handleClose
            })
        );
    }, [search, page, limit, type]);

    const nftList = useSelector((state) => state.nftReducer.nftList);
    
    return (
        <>
            <AddNft
                open={addNftOpen}
                setOpen={setAddNftOpen}
                data={location?.state?.data}
                search={search}
                page={page}
                limit={limit}
                nftType={type}
            />
            <MainCard
                className="Adminheading"
                
                title={
                <Grid container sx={{display:'flex'}}>
                    <Grid item md={8} xs={12}>
                        <Typography
                        variant="h1"
                        component="h2"
                        className="headingcard"
                        sx={{   fontWeight: 600, color:  theme.palette.mode === 'dark' ? '#fff' : '#000' ,
                         marginLeft: { lg: '-20px', md: '-20px' },  }}
                    >
                        Categories
                    </Typography>
                    </Grid>
                    <Grid item md={4} xs={12}>
                    <Button
                        className="buttonSize"
                        sx={{float:{xs:'left' , md:'right'}, marginTop:{xs:"10px",md:"0px"} }}
                        variant="contained"
                        size="large"
                        onClick={() => {
                            navigate('/categories');
                        }}
                    >
                        Back
                    </Button>
                        </Grid>
                        </Grid>
                   
                }
              
                content={false}
            ></MainCard>
            <MainCard
                className="yellow tableShadow"
                title={
                    <Grid container spacing={4}>
                        <Grid item xs={12} lg={8}>
                            <Typography className="mainheading" variant="h1" component="h2" 
                            sx={{ marginLeft: { lg: '48px', md: '48px' },marginTop:{md:"6px"} }}>
                                NFT Management  
                            </Typography>
                        </Grid>
                        <Grid item xs={6} lg={2}>
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
                                    <MenuItem  key={index} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                        <Grid item xs={6} lg={2} textAlign="start">
                            <Button
                                className="buttonSize"
                                sx={{ marginLeft: { lg: '-16px', md: '-16px' } }}
                                variant="contained"
                                size="large"
                                onClick={() => {
                                    setAddNftOpen(true);
                                }}
                            >
                                Add NFT
                            </Button>
                        </Grid>
                    </Grid>
                }
                content={false}
            >
                <Grid container>
                    {(nftList && nftList.nfts && nftList.nfts.rows && nftList.nfts.rows != undefined) ? (
                        <>
                       { nftList.nfts.rows.length > 0?(
                        <>
                            {' '}
                            <Grid container spacing={gridSpacing} mt={2}
                             sx={{ padding:"0px 16px" }}>
                                {nftList.nfts.rows &&
                                    nftList.nfts.rows.map((nft, index) => {
                                        return (
                                            <Grid key={index} item xs={12} sm={6} md={4} lg={3}>
                                                <NftCard
                                                    className="tableShadow"
                                                    nftData={nft}
                                                    categoryId={location.state.data.CategoryId}
                                                    search={search}
                                                    page={page}
                                                    limit={limit}
                                                    type={type}
                                                />
                                            </Grid>
                                        );
                                    })}
                            </Grid>
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
                            </>
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
                  
                    )}
                </Grid>
            </MainCard>
        </>
    );
};

export default NftManagement;
