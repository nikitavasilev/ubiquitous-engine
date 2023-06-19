import { Grid, Typography } from '@mui/material';
import { gridSpacing } from 'store/constant';
import NewCard from '../../commonComponent/newCard';
// import Carousel from 'react-multi-carousel';
// import 'react-multi-carousel/lib/styles.css';
import { useTheme } from '@mui/material/styles';

import React from 'react';
import Slider from 'react-slick';
const NewAndTrendingNfts = ({ nfts }) => {
    const theme = useTheme();

    var settings = {
        dots: false,
        infinite: true,
        speed: 1000,
        autoplay: false,
        arrows: true,
        slidesToShow: 5,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: false
                }
            },
            {
                breakpoint: 900,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 2,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 450,
                settings: {
                    fade: true,
                    infinite: true,
                    speed: 500,
                    slidesToShow: 3,
                    slidesToScroll: 2,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 425,
                settings: {
                    fade: true,
                    infinite: true,
                    speed: 500,
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };
    return (
        <Grid container-fluid spacing={gridSpacing} sx={{ background: '', 
        margin: '15px' }}>
            <Grid item xs={12} lg={12} md={12}>
                <Grid container spacing={2} sx={{ mb: 2 }}>
                    <Grid item xs={12}>
                        <Typography
                        color={theme.palette.mode === 'dark' ? '#FFFFFF' : 'black'}
                        className='fontfigma'
                            variant="h2"
                            mt={4}
                            component="div"
                            sx={{ textAlign: { xs: 'center', md: 'left', sm: 'center' },
                             marginLeft: {md:'18px'}, 
                             textTransform: 'capitalize' }}
                        >
                            New & Trending
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Grid container justifyContent="center" spacing={4}  sx={{ textAlign: 'center' }}>
                    {nfts && nfts?.length > 5 ? (
                        <>
                            <Slider  className="slider" {...settings}>
                                {nfts.map((item) => (
                                    <NewCard data={item} nfts={nfts} />
                                ))}
                            </Slider>
                        </>
                    ) : nfts && nfts?.length > 0 ? (
                        <Grid  container  spacing={2} 
                        sx={{ justifyContent: { xs: 'center', sm: 'center', md: 'left', lg: 'left', xl: 'left' } ,
                        marginLeft: {xs:'12px',sm:'12px' , md:'8px'}, }}>
                            {nfts?.map((item) => (
                                <NewCard data={item} nfts={nfts} />
                            ))}
                        </Grid>
                    ) : (
                        <Grid mt={4}  mb={-6} container  sx={{ justifyContent: { xs: 'center', sm: 'center', md: 'left', lg: 'left', xl: 'left' } }}
                         spacing={4} >
                        <h3 className='noDataNew fontfamily'> No trending product available.</h3>
                    </Grid>
                    )}
                </Grid>
            </Grid>
        </Grid>
    );
};

export default NewAndTrendingNfts;
