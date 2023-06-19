import { Link as RouterLink } from 'react-router-dom';
import { useTheme, styled } from '@mui/material/styles';
import { Box, Button, Container, Grid, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import '@fontsource/public-sans';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { gridSpacing } from 'store/constant';
import widget1 from 'assets/images/watch.png';
import { useSelector } from 'react-redux';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
const responsive = {
    superLargeDesktop: {
        // the naming can be any, depends on you.
        breakpoint: { max: 4000, min: 3000 },
        items: 1
    },
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 1
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 1
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1
    }
};
const HeaderAnimationImage = styled('img')({
    maxWidth: '100%',
    filter: 'drop-shadow(0px 0px 50px rgb(33 150 243 / 30%))'
});

const Header = () => {
    const user = useSelector((state) => state.auth.user);
    const token = useSelector((state) => state.auth.token);
    const theme = useTheme();

    return (
        <Carousel
            responsive={responsive}
            // swipeable={true}
            // draggable={false}
            arrows={false}
            showDots={true}
            // ssr={true} // means to render carousel on server-side.
            infinite={true}
            autoPlay={true}
            autoPlaySpeed={4000}
            keyBoardControl={true}
            // customTransition="all .5"
            transitionDuration={500}
            containerClass="carousel-container"
            removeArrowOnDeviceType={['tablet', 'mobile']}
            // deviceType={this.props.deviceType}
            dotListClass="custom-dot-list-style"
            itemClass="carousel-item-padding-40-px"
        >
            <Grid item md={12} xs={12} className="mainBackground" sx={{ border: '2px solid transparent' }}>
                <Grid container-fluid>
                    <Container>
                        <Grid
                            container
                            alignItems="center"
                            justifyContent="space-between"
                            spacing={gridSpacing}
                            sx={{ mt: { xs: 10, sm: 6, md: 11 }, mb: { xs: 2.5, md: 10 } }}
                        >
                            <Grid item xs={12} md={8}>
                                <Grid item xs={12}>
                                    <motion.div
                                        initial={{ opacity: 0, translateY: 550 }}
                                        animate={{ opacity: 1, translateY: 0 }}
                                        transition={{
                                            type: 'spring',
                                            stiffness: 150,
                                            damping: 30
                                        }}
                                    >
                                        <Typography
                                            variant="h1"
                                            sx={{
                                                fontFamily: 'Public Sans !important',
                                                fontStyle: 'normal !important',
                                                fontWeight: '600',

                                                fontSize: { xs: '2.25rem', sm: '3rem', md: '75px', lg: '75px' },
                                                lineHeight: { xs: '1.2', sm: '1', md: '84px', lg: '86px' },

                                                color: theme.palette.mode === 'dark' ? '#ffffff' : '#ffffff'
                                            }}
                                        >
                                        Exploring The Digital Frontier
                                        </Typography>
                                    </motion.div>
                                </Grid>
                                <Grid item xs={12}>
                                    <motion.div
                                        initial={{ opacity: 0, translateY: 550 }}
                                        animate={{ opacity: 1, translateY: 0 }}
                                        transition={{
                                            type: 'spring',
                                            stiffness: 150,
                                            damping: 30,
                                            delay: 0.2
                                        }}
                                    >
                                        <Typography
                                            variant="h3"
                                            component="div"
                                            color="inherit"
                                            sx={{
                                                color: theme.palette.mode === 'dark' ? '#ffffff' : '#ffffff',
                                                fontFamily: 'Public Sans  !important',
                                                fontStyle: 'normal',

                                                textTransform: 'capitalize  !important',
                                                fontSize: { xs: '1rem', md: '27px', lg: '27px' },
                                                fontWeight: 400,
                                                mt: { xs: 2, sm: 4, md: 5 },
                                                lineHeight: { xs: 1.4, sm: 1, md: 1.4, lg: '36px' }
                                            }}
                                        >
                                        Pioneering a new age of innovation.
                                        </Typography>
                                    </motion.div>
                                </Grid>
                                <Grid item xs={12} sx={{ my: 3.25 }}>
                                    <motion.div
                                        initial={{ opacity: 0, translateY: 550 }}
                                        animate={{ opacity: 1, translateY: 0 }}
                                        transition={{
                                            type: 'spring',
                                            stiffness: 150,
                                            damping: 30,
                                            delay: 0.4
                                        }}
                                    >
                                        
                                            <>
                                                <Grid
                                                    container
                                                    sx={{
                                                        justifyContent: 'flex-start'
                                                    }}
                                                >
                                                    <Grid item>
                                                        <AnimateButton>
                                                            <Button
                                                                className="create"
                                                                component={RouterLink}
                                                                to="/"
                                                                size="large"
                                                                variant="contained"
                                                                sx={{ color: '#ffffff', mt: { xs: 1, sm: 1.5, md: 2.5 } }}
                                                            >
                                                                Create Yours
                                                            </Button>
                                                        </AnimateButton>
                                                    </Grid>
                                                    <Grid item>
                                                        <AnimateButton>
                                                            <Button
                                                                className="trackRout"
                                                                component={RouterLink}
                                                                to="/tracknft"
                                                                size="large"
                                                                variant="contained"
                                                                sx={{
                                                                    color: '#ffffff',
                                                                    mt: { xs: 1, sm: 1.5, md: 2.5 },
                                                                    ml: { xs: 0, sm: 1.5, md: 2.5 }
                                                                }}
                                                            >
                                                                Track your asset
                                                            </Button>
                                                        </AnimateButton>
                                                    </Grid>
                                                </Grid>
                                            </>
                                        
                                    </motion.div>
                                </Grid>
                            </Grid>

                            <Grid item xs={12} md={4} sx={{ display: { xs: 'none', md: 'none' } }}>
                                <Box
                                    sx={{
                                        width: '290px',
                                        animation: '10s slideY linear infinite'
                                    }}
                                >
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{
                                            type: 'spring',
                                            stiffness: 150,
                                            damping: 30,
                                            delay: 0.2
                                        }}
                                    >
                                        <HeaderAnimationImage src={widget1} alt="watch" />
                                    </motion.div>
                                </Box>
                            </Grid>
                        </Grid>
                    </Container>
                </Grid>
            </Grid>
            <Grid item md={12} xs={12} className="mainBanner2" sx={{ border: '2px solid transparent' }}>
                <Grid container-fluid>
                    <Container>
                        <Grid
                            container
                            alignItems="center"
                            justifyContent="space-between"
                            spacing={gridSpacing}
                            sx={{ mt: { xs: 10, sm: 6, md: 11 }, mb: { xs: 2.5, md: 10 } }}
                        >
                            <Grid item xs={12} md={8}>
                                <Grid item xs={12}>
                                    <motion.div
                                        initial={{ opacity: 0, translateY: 550 }}
                                        animate={{ opacity: 1, translateY: 0 }}
                                        transition={{
                                            type: 'spring',
                                            stiffness: 150,
                                            damping: 30
                                        }}
                                    >
                                        <Typography
                                            variant="h1"
                                            sx={{
                                                fontFamily: 'Public Sans !important',
                                                fontStyle: 'normal !important',
                                                fontWeight: '600',

                                                fontSize: { xs: '2.25rem', sm: '3rem', md: '75px', lg: '75px' },
                                                lineHeight: { xs: '1.2', sm: '1', md: '84px', lg: '86px' },

                                                color: theme.palette.mode === 'dark' ? '#ffffff' : '#ffffff'
                                            }}
                                        >
                                            Exploring The Digital Frontier
                                        </Typography>
                                    </motion.div>
                                </Grid>
                                <Grid item xs={12}>
                                    <motion.div
                                        initial={{ opacity: 0, translateY: 550 }}
                                        animate={{ opacity: 1, translateY: 0 }}
                                        transition={{
                                            type: 'spring',
                                            stiffness: 150,
                                            damping: 30,
                                            delay: 0.2
                                        }}
                                    >
                                        <Typography
                                            variant="h3"
                                            component="div"
                                            color="inherit"
                                            sx={{
                                                color: theme.palette.mode === 'dark' ? '#ffffff' : '#ffffff',
                                                fontFamily: 'Public Sans  !important',
                                                fontStyle: 'normal',

                                                textTransform: 'capitalize  !important',
                                                fontSize: { xs: '1rem', md: '27px', lg: '27px' },
                                                fontWeight: 400,
                                                mt: { xs: 2, sm: 4, md: 5 },
                                                lineHeight: { xs: 1.4, sm: 1, md: 1.4, lg: '36px' }
                                            }}
                                        >
                                            Pioneering a new age of innovation.
                                        </Typography>
                                    </motion.div>
                                </Grid>
                                <Grid item xs={12} sx={{ my: 3.25 }}>
                                    <motion.div
                                        initial={{ opacity: 0, translateY: 550 }}
                                        animate={{ opacity: 1, translateY: 0 }}
                                        transition={{
                                            type: 'spring',
                                            stiffness: 150,
                                            damping: 30,
                                            delay: 0.4
                                        }}
                                    >
                                       
                                            <>
                                                <Grid
                                                    container
                                                    sx={{
                                                        justifyContent: 'flex-start'
                                                    }}
                                                >
                                                    <Grid item>
                                                        <AnimateButton>
                                                            <Button
                                                                className="create"
                                                                component={RouterLink}
                                                                to="/"
                                                                size="large"
                                                                variant="contained"
                                                                sx={{ color: '#ffffff', mt: { xs: 1, sm: 1.5, md: 2.5 } }}
                                                            >
                                                                Create Yours
                                                            </Button>
                                                        </AnimateButton>
                                                    </Grid>
                                                    <Grid item>
                                                        <AnimateButton>
                                                            <Button
                                                                className="trackRout"
                                                                component={RouterLink}
                                                                to="/tracknft"
                                                                size="large"
                                                                variant="contained"
                                                                sx={{
                                                                    color: '#ffffff',
                                                                    mt: { xs: 1, sm: 1.5, md: 2.5 },
                                                                    ml: { xs: 0, sm: 1.5, md: 2.5 }
                                                                }}
                                                            >
                                                                Track your asset
                                                            </Button>
                                                        </AnimateButton>
                                                    </Grid>
                                                </Grid>
                                            </>
                                     
                                    </motion.div>
                                </Grid>
                            </Grid>

                            <Grid item xs={12} md={4} sx={{ display: { xs: 'none', md: 'none' } }}>
                                <Box
                                    sx={{
                                        width: '290px',
                                        animation: '10s slideY linear infinite'
                                    }}
                                >
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{
                                            type: 'spring',
                                            stiffness: 150,
                                            damping: 30,
                                            delay: 0.2
                                        }}
                                    >
                                        <HeaderAnimationImage src={widget1} alt="watch" />
                                    </motion.div>
                                </Box>
                            </Grid>
                        </Grid>
                    </Container>
                </Grid>
            </Grid>
            <Grid item md={12} xs={12} className="mainBanner3" sx={{ border: '2px solid transparent' }}>
            <Grid container-fluid>
                <Container>
                    <Grid
                        container
                        alignItems="center"
                        justifyContent="space-between"
                        spacing={gridSpacing}
                        sx={{ mt: { xs: 10, sm: 6, md: 11 }, mb: { xs: 2.5, md: 10 } }}
                    >
                        <Grid item xs={12} md={7}>
                            <Grid item xs={12}>
                                <motion.div
                                    initial={{ opacity: 0, translateY: 550 }}
                                    animate={{ opacity: 1, translateY: 0 }}
                                    transition={{
                                        type: 'spring',
                                        stiffness: 150,
                                        damping: 30
                                    }}
                                >
                                    <Typography
                                        variant="h1"
                                        sx={{
                                            fontFamily: 'Public Sans !important',
                                            fontStyle: 'normal !important',
                                            fontWeight: '600',

                                            fontSize: { xs: '2.25rem', sm: '3rem', md: '67px', lg: '67px' },
                                            lineHeight: { xs: '1.2', sm: '1', md: '84px', lg: '86px' },

                                            color: theme.palette.mode === 'dark' ? '#ffffff' : '#ffffff'
                                        }}
                                    >
                                    Exploring The Digital Frontier
                                    </Typography>
                                </motion.div>
                            </Grid>
                            <Grid item xs={12}>
                                <motion.div
                                    initial={{ opacity: 0, translateY: 550 }}
                                    animate={{ opacity: 1, translateY: 0 }}
                                    transition={{
                                        type: 'spring',
                                        stiffness: 150,
                                        damping: 30,
                                        delay: 0.2
                                    }}
                                >
                                    <Typography
                                        variant="h3"
                                        component="div"
                                        color="inherit"
                                        sx={{
                                            color: theme.palette.mode === 'dark' ? '#ffffff' : '#ffffff',
                                            fontFamily: 'Public Sans  !important',
                                            fontStyle: 'normal',

                                            textTransform: 'capitalize  !important',
                                            fontSize: { xs: '1rem', md: '27px', lg: '27px' },
                                            fontWeight: 400,
                                            mt: { xs: 2, sm: 4, md: 5 },
                                            lineHeight: { xs: 1.4, sm: 1, md: 1.4, lg: '36px' }
                                        }}
                                    >
                                    Pioneering a new age of innovation.
                                    </Typography>
                                </motion.div>
                            </Grid>
                            <Grid item xs={12} sx={{ my: 3.25 }}>
                                <motion.div
                                    initial={{ opacity: 0, translateY: 550 }}
                                    animate={{ opacity: 1, translateY: 0 }}
                                    transition={{
                                        type: 'spring',
                                        stiffness: 150,
                                        damping: 30,
                                        delay: 0.4
                                    }}
                                >
                                    
                                        <>
                                            <Grid
                                                container
                                                sx={{
                                                    justifyContent: 'flex-start'
                                                }}
                                            >
                                                <Grid item>
                                                    <AnimateButton>
                                                        <Button
                                                            className="create"
                                                            component={RouterLink}
                                                            to="/"
                                                            size="large"
                                                            variant="contained"
                                                            sx={{ color: '#ffffff', mt: { xs: 1, sm: 1.5, md: 2.5 } }}
                                                        >
                                                            Create Yours
                                                        </Button>
                                                    </AnimateButton>
                                                </Grid>
                                                <Grid item>
                                                    <AnimateButton>
                                                        <Button
                                                            className="trackRout"
                                                            component={RouterLink}
                                                            to="/tracknft"
                                                            size="large"
                                                            variant="contained"
                                                            sx={{
                                                                color: '#ffffff',
                                                                mt: { xs: 1, sm: 1.5, md: 2.5 },
                                                                ml: { xs: 0, sm: 1.5, md: 2.5 }
                                                            }}
                                                        >
                                                            Track your asset
                                                        </Button>
                                                    </AnimateButton>
                                                </Grid>
                                            </Grid>
                                        </>
                                
                                </motion.div>
                            </Grid>
                        </Grid>

                        <Grid item xs={12} md={5} sx={{ display: { xs: 'none', md: 'none' } }}>
                            <Box
                                sx={{
                                    width: '290px',
                                    animation: '10s slideY linear infinite'
                                }}
                            >
                                <motion.div
                                    initial={{ opacity: 0, scale: 0 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{
                                        type: 'spring',
                                        stiffness: 150,
                                        damping: 30,
                                        delay: 0.2
                                    }}
                                >
                                    <HeaderAnimationImage src={widget1} alt="watch" />
                                </motion.div>
                            </Box>
                        </Grid>
                    </Grid>
                </Container>
            </Grid>
        </Grid>
        <Grid item md={12} xs={12} className="mainBanner4" sx={{ border: '2px solid transparent' }}>
        <Grid container-fluid>
            <Container>
                <Grid
                    container
                    alignItems="center"
                    justifyContent="space-between"
                    spacing={gridSpacing}
                    sx={{ mt: { xs: 10, sm: 6, md: 11 }, mb: { xs: 2.5, md: 10 } }}
                >
                    <Grid item xs={12} md={7}>
                        <Grid item xs={12}>
                            <motion.div
                                initial={{ opacity: 0, translateY: 550 }}
                                animate={{ opacity: 1, translateY: 0 }}
                                transition={{
                                    type: 'spring',
                                    stiffness: 150,
                                    damping: 30
                                }}
                            >
                                <Typography
                                    variant="h1"
                                    sx={{
                                        fontFamily: 'Public Sans !important',
                                        fontStyle: 'normal !important',
                                        fontWeight: '600',

                                        fontSize: { xs: '2.25rem', sm: '3rem', md: '67px', lg: '67px' },
                                        lineHeight: { xs: '1.2', sm: '1', md: '84px', lg: '86px' },

                                        color: theme.palette.mode === 'dark' ? '#ffffff' : '#ffffff'
                                    }}
                                >
                                Exploring The Digital Frontier
                                </Typography>
                            </motion.div>
                        </Grid>
                        <Grid item xs={12}>
                            <motion.div
                                initial={{ opacity: 0, translateY: 550 }}
                                animate={{ opacity: 1, translateY: 0 }}
                                transition={{
                                    type: 'spring',
                                    stiffness: 150,
                                    damping: 30,
                                    delay: 0.2
                                }}
                            >
                                <Typography
                                    variant="h3"
                                    component="div"
                                    color="inherit"
                                    sx={{
                                        color: theme.palette.mode === 'dark' ? '#ffffff' : '#ffffff',
                                        fontFamily: 'Public Sans  !important',
                                        fontStyle: 'normal',

                                        textTransform: 'capitalize  !important',
                                        fontSize: { xs: '1rem', md: '27px', lg: '27px' },
                                        fontWeight: 400,
                                        mt: { xs: 2, sm: 4, md: 5 },
                                        lineHeight: { xs: 1.4, sm: 1, md: 1.4, lg: '36px' }
                                    }}
                                >
                                Pioneering a new age of innovation.
                                </Typography>
                            </motion.div>
                        </Grid>
                        <Grid item xs={12} sx={{ my: 3.25 }}>
                            <motion.div
                                initial={{ opacity: 0, translateY: 550 }}
                                animate={{ opacity: 1, translateY: 0 }}
                                transition={{
                                    type: 'spring',
                                    stiffness: 150,
                                    damping: 30,
                                    delay: 0.4
                                }}
                            >
                            
                                    <>
                                        <Grid
                                            container
                                            sx={{
                                                justifyContent: 'flex-start'
                                            }}
                                        >
                                            <Grid item>
                                                <AnimateButton>
                                                    <Button
                                                        className="create"
                                                        component={RouterLink}
                                                        to="/"
                                                        size="large"
                                                        variant="contained"
                                                        sx={{ color: '#ffffff', mt: { xs: 1, sm: 1.5, md: 2.5 } }}
                                                    >
                                                        Create Yours
                                                    </Button>
                                                </AnimateButton>
                                            </Grid>
                                            <Grid item>
                                                <AnimateButton>
                                                    <Button
                                                        className="trackRout"
                                                        component={RouterLink}
                                                        to="/tracknft"
                                                        size="large"
                                                        variant="contained"
                                                        sx={{
                                                            color: '#ffffff',
                                                            mt: { xs: 1, sm: 1.5, md: 2.5 },
                                                            ml: { xs: 0, sm: 1.5, md: 2.5 }
                                                        }}
                                                    >
                                                        Track your asset
                                                    </Button>
                                                </AnimateButton>
                                            </Grid>
                                        </Grid>
                                    </>
                              
                            </motion.div>
                        </Grid>
                    </Grid>

                    <Grid item xs={12} md={5} sx={{ display: { xs: 'none', md: 'none' } }}>
                        <Box
                            sx={{
                                width: '290px',
                                animation: '10s slideY linear infinite'
                            }}
                        >
                            <motion.div
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{
                                    type: 'spring',
                                    stiffness: 150,
                                    damping: 30,
                                    delay: 0.2
                                }}
                            >
                                <HeaderAnimationImage src={widget1} alt="watch" />
                            </motion.div>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </Grid>
    </Grid>
        </Carousel>
    );
};

export default Header;
