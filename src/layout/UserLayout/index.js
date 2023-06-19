import { Outlet } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import { Grid, Divider } from '@mui/material';
import Footer from './footer';
import Header from './header';
import SideBar from './sidebar';
const UserLayout = () => {
    const theme = useTheme();
    return (
        <>
            <Grid
                container
                sx={{
                    background:
                        theme.palette.mode === 'dark'
                            ? 'radial-gradient(to top right, 50% 50% at 50% 50%, #2B8CFF 0%, rgba(43, 140, 255, 0.27))'
                            : '#f3f3f3',

                    // backgroundImage: "linear-gradient(to top right, black,rgba(255,0,0,0), rgba(43 140 255 / 27%) )",
                    // background: "radial-gradient(to top right, 50% 50% at 50% 50%, #2B8CFF 0%, rgba(43, 140, 255, 0.27))",

                    backgroundImage:
                        theme.palette.mode === 'dark' ? 'linear-gradient(to top right, black,rgba(255,0,0,0), rgba(43 140 255 / 27%) )' : ''
                }}
            >
                <Grid
                    item
                    md={12}
                    sm={12}
                    xs={12}
                    sx={{ mt:2,
                        ml:2,
                        mr:2,
                        background: theme.palette.mode === 'dark' ? 'black' : '#f3f3f3',
                        color: theme.palette.mode === 'dark' ? 'white' : '#404040',
                        borderRadius: '4px',
                      
                    }}
                >
                    <Header />
                </Grid>

                <Grid
                    item
                    md={1}
                    xs={12}
                    sx={{  mt:2,  marginBottom:'28px',
                        position: 'sticky',
                        height: '100%',
                        top: '0',
                        display: { xs: 'none', sm: 'none', md: 'flex', lg: 'flex', xl: 'flex' }
                    }}
                >
                    <SideBar />
                </Grid>
                <Grid mt={0.5} item md={11} xs={12} sm={12} 
                className="outlet-Margin">
                    <Outlet />
                </Grid>
            </Grid>

            <Divider sx={{ borderBottomWidth: 1, border: '1px solid #ccc' }} />

            <Grid
                item
                md={10}
                sm={10}
                xs={12}
                sx={{
                    pl: { },
                    background: theme.palette.mode === 'dark' ? 'black' : '#f3f3f3',
                    color: theme.palette.mode === 'dark' ? 'white' : '#404040'
                }}
            >
                <Footer />
            </Grid>
        </>
    );
};

export default UserLayout;
