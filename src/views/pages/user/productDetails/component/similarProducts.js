// material-ui
import { useTheme } from '@mui/material/styles';
import { Container, Card, Grid, Typography, CardActionArea, CardContent, Divider } from '@mui/material';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { gridSpacing } from 'store/constant';
import CardMedia from '@mui/material/CardMedia';
import { getAllSimilarProducts } from 'redux/marketplace/actions';
const SimilarProducts = ({ nftList }) => {
    const theme = useTheme();
    const itemData = [
        {
            img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
            heading: 'Zennie',
            title: 'Luxury Cars',
            creator: 'Creator'
        },
        {
            img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
            heading: 'Zennie',
            title: 'Luxury Shoes',
            creator: 'Creator'
        },
        {
            img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
            heading: 'Zennie',
            title: 'Luxury Watches',
            creator: 'Creator'
        },
        {
            img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
            heading: 'Zennie',
            title: 'Real Estate',
            creator: 'Creator'
        },
        {
            img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
            heading: 'Zennie',
            title: 'Luxury Goods',
            creator: 'Creator'
        },
        {
            img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
            heading: 'Zennie',
            title: 'Luxury Watches',
            creator: 'Creator'
        },
        {
            img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
            heading: 'Zennie',
            title: 'Luxury Cars',
            creator: 'Creator'
        },
        {
            img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
            heading: 'Zennie',
            title: 'Luxury Shoes',
            creator: 'Creator'
        },
        {
            img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
            heading: 'Zennie',
            title: 'Luxury Watches',
            creator: 'Creator'
        },
        {
            img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
            heading: 'Zennie',
            title: 'Real Estate',
            creator: 'Creator'
        },
        {
            img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
            heading: 'Zennie',
            title: 'Luxury Goods',
            creator: 'Creator'
        },
        {
            img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
            heading: 'Zennie',
            title: 'Luxury Watches',
            creator: 'Creator'
        }
    ];
    const nftid = nftList?.nft?.id;
    const CategoryId = nftList?.nft?.CategoryId;
    // console.log('nftid==========??', nftid);

    const dispatch = useDispatch();
    const similarProductNfts = useSelector((state) => state.marketplaceReducer.similarProductNfts);
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(12);
    const [click, setClick] = useState(false);
    useEffect(() => {
        dispatch(
            getAllSimilarProducts({
                search: search,
                page: page,
                limit: limit,
                categoryId: CategoryId? CategoryId : 0,
                nftId:nftid? nftid : 0
            })
        );
        setClick(false);
    }, [click, search, page, limit]);

    return (
        <Grid container-fluid spacing={gridSpacing} sx={{ margin: '15px' }}>
            <Grid item xs={12} lg={12} md={12}>
                <Grid container spacing={2} sx={{ mb: 2 }}>
                    <Grid item xs={12}>
                        <Typography
                        color={theme.palette.mode === 'dark' ? '#FFFFFF' : 'black'}
                        className='productfigmastyl'
                            variant="h2"
                            mt={4}
                            component="div"
                            sx={{ textAlign: { xs: 'center', md: 'left', sm: 'center' },
                             textTransform: 'capitalize' }}
                        >
                            Similar Products
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
            {similarProductNfts?.nfts?.rows.lenght > 0 ? (
                <Grid item xs={12}>
                    <Grid container justifyContent="left" spacing={gridSpacing} sx={{ textAlign: 'center' }}>
                        {similarProductNfts?.nfts?.rows.map((data) => (
                            <Grid item md={2} sm={6}>
                                <Card
                                    sx={{
                                        color: theme.palette.mode === 'dark' ? 'white' : '#404040',
                                        background: theme.palette.mode === 'dark' ? '#181C1F' : 'white',
                                        maxWidth: 365,
                                        width: '105%',
                                       
                                        borderRadius: '4px !important'
                                    }}
                                >
                                    <CardActionArea>
                                        <CardMedia component="img" height="200" 
                                         sx={{objectFit:'scale-down'}} image={data.asset} />
                                        <CardContent sx={{ padding: '6%' }}>
                                            <Grid container>
                                                <Grid item xs={8} sx={{ textAlign: 'left' }}>
                                                    <span style={{ fontWeight: '550', fontSize: '130%' }}>
                                                    {data.Brand.name}</span>
                                                    <Grid className="overflow" sx={{ marginTop: '5%' }}>
                                                        {data.name}
                                                    </Grid>
                                                </Grid>
                                                <Grid item xs={4} sx={{ background: '' }}>
                                                    <span style={{ fontWeight: '50 !important ', fontSize: '110%', 
                                                    float: 'right' }}>
                                                    20 Creators
                                                    </span>
                                                </Grid>
                                            </Grid>

                                            <Divider sx={{ mt: 2, mb: 2 }} />
                                            <Grid container sx={{ background: '' }}>
                                                <Grid item md={6} xs={12} className="overflow" sx={{ pt: 1 }}>
                                                    <span
                                                        style={{
                                                            background: theme.palette.mode === 'dark' ? 'black' : '#d9d9d9',
                                                            padding: '3% 4%',
                                                            borderRadius: '10%',
                                                            color: 'white',
                                                            fontSize: '80%'
                                                        }}
                                                    >
                                                        02h
                                                    </span>{' '}
                                                    :{' '}
                                                    <span
                                                        style={{
                                                            background: theme.palette.mode === 'dark' ? 'black' : '#d9d9d9',
                                                            padding: '3% 4%',
                                                            borderRadius: '10%',
                                                            color: 'white',
                                                            fontSize: '80%'
                                                        }}
                                                    >
                                                        25m
                                                    </span>{' '}
                                                    :{' '}
                                                    <span
                                                        style={{
                                                            background: theme.palette.mode === 'dark' ? 'black' : '#d9d9d9',
                                                            padding: '3% 4%  ',
                                                            borderRadius: '10%',
                                                            color: 'white',
                                                            fontSize: '80%'
                                                        }}
                                                    >
                                                        04s
                                                    </span>
                                                </Grid>
                                                <Grid
                                                    item
                                                    md={6}
                                                    xs={12}
                                                    className="overflow"
                                                    sx={{ pl: 1, marginTop: { xs: '10px', md: '0' } }}
                                                >
                                                    Current Bid
                                                    <div style={{ marginTop: '5%', fontSize: '110%' }}>
                                                        {data.currencyType + ' ' + data.price}
                                                    </div>
                                                </Grid>
                                            </Grid>
                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
            ) : (
                <Grid item xs={12}>
                    <Typography
                    className='fontfamily'
                        variant="h3"
                        mt={1}
                        component="div"
                        sx={{ textAlign: { xs: 'center', md: 'left', sm: 'center', color: ' #9498AA' }, textTransform: 'capitalize' }}
                    >
                         Not any similar products found.
                    </Typography>
                </Grid>
            )}
        </Grid>
    );
};

export default SimilarProducts;
