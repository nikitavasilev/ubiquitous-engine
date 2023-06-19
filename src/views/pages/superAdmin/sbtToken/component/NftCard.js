import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button, CardContent, CardMedia, Grid, Stack, Typography, CardActionArea, Card, Tooltip } from '@mui/material';
import MainCard from '../../nftManagement/component/mainCard';
// import DetailsDialog from './details';
import { useTheme } from '@mui/material/styles';
import img from "assets/images/bmw1.png"
import { useEffect } from 'react';
import { Switch } from '@mui/material';

const NftCard = ({ nftData, categoryId, search, page, limit, type, nftList }) => {
    const dispatch = useDispatch();
    const [loader, setLoader] = useState(false);
    const theme = useTheme();
    // console.log(nftList?.data, 'nftList================')

    const [openRequestMint, setOpenRequestMint] = useState(false);
    const [editNftOpen, setEditNftOpen] = useState(false);
    const [editable, seteditable] = useState(false);
    const [deleteNftOpen, setDeleteNftOpen] = useState(false);
    const [DetailsNftOpen, setDetailsNftOpen] = useState(false);
    const [image, setImage] = useState([]);
    const [nftInfo, setNftInfo] = useState({
        id: null,
        brandId: null,
        nftName: '',
        nftDescription: '',
        nftPrice: 0,
        mintType: 'directMint',
        currencyType: 'USDT',
        fieldDataArray: [],
        fileDataArray: [],
        images: []
    });

    // useEffect(() => {
    //     const length = nftData.asset.split('/').length;
    //     setImage([
    //         {
    //             image: { name: nftData.asset.split('/')[length - 1] },
    //             quantity: nftData.NFTTokens.length
    //         }
    //     ]);
    // }, [nftData]);
    return (
        <>
            {/* <DetailsDialog open={DetailsNftOpen} 
            setOpen={setDetailsNftOpen} 
            nftData={nftData} /> */}
            <MainCard
                content={false}
                className='tableShadow'
                boxShadow
                sx={{
                    position: 'relative',
                    '&:hover': {
                        transform: 'scale3d(1.02, 1.02, 1)',
                        transition: 'all .4s ease-in-out'
                    }
                }}
            >
                <Card
                    sx={{
                        maxWidth: 345,
                        color: theme.palette.mode === 'dark' ? 'white' : '#404040',
                        background: theme.palette.mode === 'dark' ? '#181C1F' : 'white',
                        // maxWidth: nfts && nfts?.length > 3? 0 : 365,
                        width: '100%',
                        maxHeight: '410px',
                        // boxShadow: '1px 2px 6px #d3d3d3',
                        borderRadius: '3px',
                        marginBottom: '10px',
                        maxWidth: { xl: '100%' },
                    }} >
                    <CardActionArea>
                        <CardMedia component="img" height="220" sx={{ objectFit: 'scale-down' }} image={img} />
                        {/* <img src={img} alt='' height="220" /> */}
                        <CardContent sx={{ p: 2 }}>
                            <Grid container spacing={2}>
                                <Grid item xs={9}>
                                    <Tooltip placement="left" title='aaa'>
                                        <Typography variant="subtitle1" className='fontstyling encap-nft'
                                            sx={{ textDecoration: 'none', textTransform: 'capitalize' }}>
                                            {/* arslan */}
                                            {nftList.tokenName}
                                        </Typography>
                                    </Tooltip>
                                </Grid>

                                <Grid item xs={12} mt={-1.5}>
                                    <Tooltip placement="left" title='asss'>
                                        <Typography
                                            className='fontstyling encap-nft'
                                            variant="body1"
                                            sx={{
                                                overflow: 'hidden',
                                                height: 16,
                                                textTransform: 'capitalize'
                                            }}
                                        >
                                            {/* k */}
                                            {nftList.address}
                                        </Typography>
                                    </Tooltip>
                                </Grid>

                                <Grid item xs={6}>
                                    <Grid item xs={12}>
                                        <Typography variant="h6" className='fontstyling'>
                                            {/* 15 */}
                                            {nftList.brandSymbol}

                                        </Typography>
                                    </Grid>
                                    {/* <Grid item xs={12}>
                                <Typography variant="h6" className='fontstyling'>{nftData.NFTTokens.length} Items</Typography>
                            </Grid> */}
                                </Grid>
                                <Grid item xs={6}>
                                    {/* <Button

                                        variant="contained"
                                        size="small"
                                        sx={{
                                            marginRight: '10px',
                                            float: 'right',
                                            ':hover': {
                                                boxShadow: 'none'
                                            },
                                            color: '#2F5AFF',
                                            background: '#B9DDFF',

                                        }}

                                        onClick={() => {
                                            setDetailsNftOpen(true);
                                        }}
                                    >
                                        Edit
                                    </Button> */}
                                    {/* {data?.isEditable == true && ( */}
                                    <Tooltip
                                        className="fontsize"
                                        title="Edit"
                                        placement="top"
                                        arrow
                                        sx={{
                                            marginRight: '10px',
                                            float: 'right',
                                            ':hover': {
                                                boxShadow: 'none'
                                            },
                                            color: '#2F5AFF',
                                            // background: '#B9DDFF',

                                        }}
                                    >
                                        <Switch
                                        // value={data.proofRequired}
                                        // checked={data.proofRequired}
                                        // onChange={(e) => handleproof(e, index)}
                                        // inputProps={{ 'aria-label': 'controlled' }}
                                        />
                                    </Tooltip>
                                    {/* )} */}
                                </Grid>

                            </Grid>
                        </CardContent>
                    </CardActionArea></Card>
            </MainCard>
        </>
    );
};

export default NftCard;
