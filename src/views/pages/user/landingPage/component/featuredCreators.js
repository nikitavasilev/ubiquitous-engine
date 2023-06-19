import { useTheme } from '@mui/material/styles';
import { Grid, Typography } from '@mui/material';
import { gridSpacing } from 'store/constant';
import CardMedia from '@mui/material/CardMedia';
import { Link as RouterLink } from 'react-router-dom';
// import Carousel from 'react-multi-carousel';
// import 'react-multi-carousel/lib/styles.css';
import React from 'react';
import Slider from 'react-slick';
import '@fontsource/public-sans';
import BrandCard from '../../commonComponent/brandCard';
const FeaturedCreators = ({ brands }) => {
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
        <Grid container-fluid spacing={gridSpacing} sx={{ margin: '15px' }}>
            <Grid item xs={12} lg={12} md={12}>
                <Grid container spacing={2} sx={{ mb: 4 }}>
                    <Grid item xs={12}>
                        <Typography
                            color={theme.palette.mode === 'dark' ? '#FFFFFF' : 'black'}
                            className="fontfigma"
                            variant="h2"
                            mt={8}
                            component="div"
                            sx={{
                                textAlign: { xs: 'center', md: 'left', sm: 'center' },
                                marginLeft: { md: '16px' },
                                textTransform: 'capitalize'
                            }}
                        >
                            Featured Creators
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>

            {brands && brands?.length > 5 ? (
                <>
                    <Grid item xs={12}>
                        <Grid mt={2} container justifyContent="center" spacing={4} sx={{ textAlign: 'center' }}>
                            <Slider className="sliderBrand" {...settings}>
                                {brands.map((item) => (
                                    <BrandCard data={item} brands={brands} />
                                ))}
                            </Slider>
                        </Grid>
                    </Grid>
                </>
            ) : brands && brands?.length > 0 ? (
                <Grid container
                sx={{ justifyContent: { xs: 'center', sm: 'center', md: 'left', lg: 'left', xl: 'left' } }} spacing={2}
                 >
                    {brands?.map((item) => (
                        <BrandCard data={item} brands={brands} />
                    ))}
                </Grid>
            ) : (
                <Grid
                    mt={4}
                   
                    container

                    sx={{ justifyContent: { xs: 'center', sm: 'center', md: 'left', lg: 'left', xl: 'left' } }}
                    spacing={4}
                >
                    <h3 className="noData fontfamily"> No featured product found.</h3>
                </Grid>
            )}
        </Grid>
    );
};

export default FeaturedCreators;
