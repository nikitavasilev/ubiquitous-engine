
import '@fontsource/public-sans';
// material-ui
import { useTheme } from '@mui/material/styles';
import { Divider, Grid, Box, Stack, Typography, useMediaQuery } from '@mui/material';
import { Link } from 'react-router-dom';

import AuthWrapper1 from 'shared/component/AuthWrapper';
import AuthCardWrapper from 'shared/component/AuthCardWrapper';
import galileo from 'assets/images/galileo.png';
import galileoWhite from 'assets/images/galileo-white.png';
import { Helmet } from 'react-helmet';
const Starting = () => {
    const theme = useTheme();

    return (
        <AuthWrapper1>
            <Grid
                container
                justifyContent="space-between"
                alignItems="center"
                sx={{ minHeight: '100vh',background: theme.palette.mode === 'dark' ? '#000' : '#fff' }}
            >
                <Helmet>
                    <meta charSet="utf-8" />
                    <title> Galileo</title>
                </Helmet>
            
                <Grid item container justifyContent="center" md={12} lg={12}>
                    <AuthCardWrapper>
                        <Grid container direction="column" justifyContent="center" spacing={2}>
                            <Grid item xs={12} container alignItems="center" justifyContent="center">
                                <Box sx={{ display: { xs: 'block', sm: 'block', md: 'block', lg: 'block' } }}>
                                    <Typography variant="h6" noWrap component="div" sx={{ marginTop: '5px' }}>
                                        {theme.palette.mode === 'dark' ? (
                                            <img src={galileoWhite} alt="Galileo White Logo" width="100" />
                                        ) : (
                                            <img src={galileo} alt="Galileo Dark Logo" width="100" />
                                        )}
                                    </Typography>
                                </Box>
                            </Grid>
                            <Grid item xs={12} container alignItems="center" justifyContent="center">
                                <Box sx={{ mb: 2 , }}>
                                    <Typography  component={Link}
                                    to="/landingPage"   sx={{ textDecoration: 'none' }} className="signInMarket" variant="subtitle1">
                                       Click on  <Box component="span" 
                                       sx={{ color: theme.palette.primary.main }}>
                                       Marketplace
                                   </Box>
                                    </Typography>
                                </Box>
                            </Grid>
                        </Grid>
                  
                    </AuthCardWrapper>
                </Grid>
            </Grid>
        </AuthWrapper1>
    );
};

export default Starting;
