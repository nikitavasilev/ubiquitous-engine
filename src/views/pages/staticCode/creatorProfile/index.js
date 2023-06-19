// material-ui
import { styled } from '@mui/material/styles';
import { Box, Grid, Typography } from '@mui/material';

// project imports
import HorizontalTabs from './ItemsTage';

import SocialProfile from './SocialProfile';
import { useTheme } from '@emotion/react';
// =============================|| LANDING MAIN ||============================= //

const Profile = () => {
    const theme = useTheme();
    return (
        <>
            <Grid
            md={12} lg={12}
                sx={{
                    background: 'tranparent',
                    color: theme.palette.mode === 'dark' ? 'white' : '#404040',  mt: { lg: 1.5, xl: 1.5 },
                    ml:{lg: 0.5},
                   
                    // mb: { lg: 0, xl: 1.5 }
                }}
            >
                <Grid container-fluid sx={{ display: { xs: 'block', sm: 'block', md: 'flex' , lg:'flex' } }}>
                    <Grid item md={12} xs={12}>
                        <Grid container-fluid>
                            <Grid item md={12} xs={12}>
                                <SocialProfile />
                            </Grid>
                            <Grid item md={12} xs={12} sx={{ margin: '15px' }}>
                                <HorizontalTabs />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
};

export default Profile;
