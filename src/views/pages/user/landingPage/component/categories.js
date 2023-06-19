import { useTheme } from '@mui/material/styles';
import { Grid, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { gridSpacing } from 'store/constant';
import { Card, CardActionArea } from '@mui/material';
import CardMedia from '@mui/material/CardMedia';
// import Carousel from 'react-multi-carousel';
// import 'react-multi-carousel/lib/styles.css';
import Slider from 'react-slick';
import { spacing } from '@mui/system';

const Categories = ({ categories }) => {
    var settings = {
        Arrows: false,
        dots: false,
        infinite: true,
        speed: 1000,
        autoplay: false,
        arrows: true,
        slidesToShow: 5,
        slidesToScroll: 1,
        responsive: [
            // {
            //     breakpoint: 1568,
            //     settings: {
            //         slidesToShow: 6,
            //         slidesToScroll: 3,
            //         infinite: true,
            //         dots: false
            //     }
            // },
            // {
            //     breakpoint: 1568,
            //     settings: {
            //         slidesToShow: 6,
            //         slidesToScroll: 3,
            //         infinite: true,
            //         dots: false
            //     }
            // },
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 5,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: false
                }
            },
            {
                breakpoint: 900,
                settings: {
                    // fade:true,
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
    // const responsive = {
    //     superLargeDesktop: {
    //         // the naming can be any, depends on you.
    //         breakpoint: { max: 4000, min: 3000 },
    //         items: 5
    //     },
    //     desktop: {
    //         breakpoint: { max: 3000, min: 1024 },
    //         items: 5
    //     },
    //     tablet: {
    //         breakpoint: { max: 1024, min: 464 },
    //         items: 2
    //     },
    //     mobile: {
    //         breakpoint: { max: 464, min: 0 },
    //         items: 1
    //     }
    // };

    const theme = useTheme();
    const navigate = useNavigate();
    return (
        <Grid container-fluid spacing={gridSpacing} sx={{ margin: '15px' }}>
            <Grid item xs={12} lg={12} md={12}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography
                            color={theme.palette.mode === 'dark' ? '#FFFFFF' : 'black'}
                            className="fontfigma"
                            variant="h2"
                            mt={4}
                            component="div"
                            sx={{
                                textAlign: { xs: 'center', md: 'left', sm: 'center' },
                                marginLeft: { md: '18px' },
                                textTransform: 'capitalize'
                            }}
                        >
                            Categories
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12} mt={7}>
                <Grid container justifyContent="left" spacing={4} sx={{ textAlign: 'center' }}>
                    {categories && categories?.length > 5 ? (
                        <>
                            <Slider className="catigaryslider" {...settings}>
                                {categories?.map((item) => (
                                    <>
                                        <Grid
                                            sx={{
                                                my: { xs: '10px', md: '0', sm: '10px' },
                                                ml: {
                                                    xs: 5,
                                                    sm: 3,
                                                    md: 2,
                                                    lg: 2
                                                    // xl: categories && categories?.length > 5 ? 4 : 0,
                                                },
                                                mr: {
                                                    xs: 1,
                                                    md: 4,
                                                    lg: 4
                                                    // xl: categories && categories?.length > 5 ? 2 : 0,
                                                }
                                            }}
                                            item
                                            xs={12}
                                            sm={12}
                                            md={12}
                                            lg={12}
                                            xl={12}
                                        >
                                            <Card
                                                sx={{
                                                    color: theme.palette.mode === 'dark' ? 'white' : '#404040',
                                                    background: theme.palette.mode === 'dark' ? '#181C1F' : 'white',
                                                    width: '100%',
                                                    maxWidth: '100%',
                                                    //  boxShadow: '1px 2px 6px #d3d3d3',
                                                    borderRadius: '3px',
                                                    marginBottom: '10px',
                                                    maxWidth: { xl: '100%' }
                                                }}
                                                onClick={() => {
                                                    navigate('/marketplace', {
                                                        state: {
                                                            category: item
                                                        }
                                                    });
                                                }}
                                            >
                                                <CardActionArea>
                                                    <Box
                                                        onClick={() => {
                                                            navigate('/marketplace', {
                                                                state: {
                                                                    category: item
                                                                }
                                                            });
                                                        }}
                                                        sx={{
                                                            position: 'relative',
                                                            background: theme.palette.mode === 'dark' ? theme.palette.dark.main : '#f3f3f3'
                                                            // boxShadow: '1px 2px 9px #d3d3d3'
                                                        }}
                                                    >
                                                        <CardMedia component="img" height="200" image={item.image} />
                                                        <Box
                                                            sx={{
                                                                height: '100%',
                                                                position: 'absolute',
                                                                top: 0,
                                                                left: 0,
                                                                width: '100%',
                                                                bgcolor: 'rgba(0, 0, 0, 0.54)',
                                                                color: 'white'
                                                            }}
                                                        >
                                                            <Typography className="categoreyName" variant="h4" color="#fff" sx={{ mt: 11 }}>
                                                                {item.name}
                                                            </Typography>
                                                        </Box>
                                                    </Box>
                                                </CardActionArea>
                                            </Card>
                                        </Grid>
                                    </>
                                ))}
                            </Slider>
                        </>
                    ) : categories && categories?.length > 0 ? (
                        <Grid
                            mt={-3}
                            container
                            spacing={2}
                            sx={{
                                textAlign: 'center',
                                marginLeft: { xs: '0px', md: '2px' },
                                width: { md: '100%' },
                                justifyContent: { md: 'left', lg: 'left', xs: 'center', sm: 'center' }
                            }}
                        >
                            {categories?.map((item) => (
                                <Grid
                                    className="cate-margin"
                                    spacing={2}
                                    sx={{ my: { xs: '0', md: '0', sm: '16px' }, mr: { md: 2, lg: 3.5 } }}
                                    item
                                    md={2}
                                    lg={2}
                                    xl={2}
                                    sm={3}
                                    xs={10}
                                >
                                    <Card
                                        className="cate-width"
                                        sx={{
                                            color: theme.palette.mode === 'dark' ? 'white' : '#404040',
                                            background: theme.palette.mode === 'dark' ? '#181C1F' : 'white',

                                            // boxShadow: '1px 2px 6px #d3d3d3',
                                            borderRadius: '3px',
                                            marginLeft: { xs: '0px', md: '8px', lg: '25px' },
                                            width: { sm: '220px', md: '100%', lg: '245px', xl: '100%' }
                                        }}
                                        onClick={() => {
                                            navigate('/marketplace', {
                                                state: {
                                                    category: item
                                                }
                                            });
                                        }}
                                    >
                                        <CardActionArea>
                                            <Box
                                                onClick={() => {
                                                    navigate('/marketplace', {
                                                        state: {
                                                            category: item
                                                        }
                                                    });
                                                }}
                                                sx={{
                                                    position: 'relative',
                                                    background: theme.palette.mode === 'dark' ? theme.palette.dark.main : '#f3f3f3'
                                                    // boxShadow: '1px 2px 9px #d3d3d3'
                                                }}
                                            >
                                                <CardMedia component="img" height="200" image={item.image} />
                                                <Box
                                                    sx={{
                                                        height: '100%',
                                                        position: 'absolute',
                                                        top: 0,
                                                        left: 0,
                                                        width: '100%',
                                                        bgcolor: 'rgba(0, 0, 0, 0.54)',
                                                        color: 'white'
                                                    }}
                                                >
                                                    <Typography className="categoreyName" variant="h4" color="#fff" sx={{ mt: 11 }}>
                                                        {item.name}
                                                    </Typography>
                                                </Box>
                                            </Box>
                                        </CardActionArea>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                    ) : (
                        <Grid
                            mt={0}
                            mb={-3}
                            container
                            spacing={2}
                            sx={{ justifyContent: { xs: 'center', sm: 'center', md: 'left', lg: 'left', xl: 'left' } }}
                        >
                            <h3
                                className="noDatacat fontfamily"
                                sx={{ justifyContent: { xs: 'center', sm: 'center', md: 'left', lg: 'left', xl: 'left' } }}
                            >
                                {' '}
                                No category found.
                            </h3>
                        </Grid>
                    )}
                </Grid>
            </Grid>
        </Grid>
    );
};

export default Categories;
