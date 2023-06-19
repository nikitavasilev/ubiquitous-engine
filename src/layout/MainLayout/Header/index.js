import PropTypes from 'prop-types';
import { useState } from 'react';
// material-ui
import { useTheme } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';

import { Avatar, Box, ButtonBase, Button } from '@mui/material';
import MetaMaskSection from './MetaMaskSection';
import { useNavigate } from 'react-router-dom';
import MetaMask from 'shared/metaMaskwithBalance';

// project imports
import LogoSection from '../LogoSection';
import SearchSection from './SearchSection';
import LocalizationSection from './LocalizationSection';
import MobileSection from './MobileSection';
import ProfileSection from './ProfileSection';
import NotificationSection from './NotificationSection';
import { useSelector, useDispatch } from 'react-redux';
import { Helmet } from 'react-helmet';
// assets
import { IconMenu2 } from '@tabler/icons';

// ==============================|| MAIN NAVBAR / HEADER ||============================== //

const Header = ({ handleLeftDrawerToggle }) => {
    const theme = useTheme();
    const navigate = useNavigate();
    const [metamask, setMetamask] = useState(false);

    const user = useSelector((state) => state.auth.user);
    return (
        <>
            {/* logo & toggler button */}
            <MetaMask open={metamask} setOpen={setMetamask} />

            <Box
                sx={{
                    backgroundColor: `${theme.palette.mode === 'dark' ? '#181C1F' : 'white'}`,
                    height: '4em',
                    paddingTop: '1em',
                    width: 200,
                    marginLeft: '2%',
                    display: 'flex',
                    [theme.breakpoints.down('md')]: {
                        width: 'auto'
                    }
                }}
            >
                <Helmet>
                    <meta charSet="utf-8" />
                    <title> Galileo Dashboard</title>
                </Helmet>
                <Box component="span" sx={{ display: { xs: 'none', md: 'block' }, flexGrow: 1 }}>
                    {/* <img style={{width: '100px' }} src={logo} alt="Admin Panel" /> */}
                    {/* <p style={{  fontStyle: 'oblique', fontWeight: 800, color: 'cadetblue' }}>
                   Admin Panel
                    </p> */}

                    <LogoSection />
                </Box>
                <ButtonBase
                    sx={{
                        display: { md: 'block', lg: 'none', xs: 'block', sm: 'block' },
                        marginTop: { md: '0', lg: '0', xs: '-15px', sm: '-15px' },
                        borderRadius: '',
                        overflow: 'hidden'
                    }}
                >
                    <Avatar
                        variant="rounded"
                        sx={{
                            ...theme.typography.commonAvatar,
                            ...theme.typography.mediumAvatar,
                            transition: 'all .2s ease-in-out',
                            background: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.secondary.light,
                            color: '#2F5AFF',
                            '&:hover': {
                                background: '#2F5AFF',
                                color: '#FFF'
                            }
                        }}
                        onClick={handleLeftDrawerToggle}
                        color="inherit"
                    >
                        <IconMenu2 stroke={1.5} size="1.3rem" />
                    </Avatar>
                </ButtonBase>
            </Box>

            {/* header search */}
            {/* <SearchSection /> */}
            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ flexGrow: 1 }} />
            {(user?.role == 'Sub Admin' || 'Brand Admin' || 'Super Admin') && user?.role != 'User' && user != null && (
                <Box>
                    <Button
                        sx={{ marginRight: '10px', display: { xs: 'block', lg: 'block' } }}
                        variant="outlined"
                        onClick={() => {
                            navigate('/home');
                        }}
                    >
                        Marketplace
                    </Button>
                </Box>
            )}
            {user?.walletAddress && (
                <IconButton size="large" aria-label="" color="inherit" sx={{}}>
                    <AccountBalanceWalletIcon
                        onClick={() => {
                            setMetamask(true);
                        }}
                        sx={{ color: '#4dabf5' }}
                    />
                </IconButton>
            )}
            {/*    <Box sx={{ display: { xs:'none',sm: 'block', marginRight: '10px' } }}>
                <MetaMaskSection />
            </Box> */}
            {/* live customization & localization */}
            {/* <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                <LocalizationSection />
            </Box> */}

            {/* notification & profile */}
            {/* <NotificationSection /> */}
            <ProfileSection />

            {/* mobile header */}
            <Box sx={{ display: { xs: 'none', sm: 'none' } }}>
                <MobileSection />
            </Box>
        </>
    );
};

Header.propTypes = {
    handleLeftDrawerToggle: PropTypes.func
};

export default Header;
