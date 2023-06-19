import * as React from 'react';
import { useState } from 'react';
import MainCard from 'ui-component/cards/MainCard';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Button, Divider, Grid, Box, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import MetaMaskSection from '../header/MetaMaskSection';
import Balance from '../header/balance';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { logout } from 'redux/auth/actions';
import LogoutIcon from '@mui/icons-material/Logout';
import DoneIcon from '@mui/icons-material/Done';
import MenuIcon from '@mui/icons-material/Menu';
import EmailIcon from '@mui/icons-material/Email';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import MetaMask from 'shared/metaMaskModal';

export default function MetaData() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [metamask, setMetamask] = useState(false);

    const user = useSelector((state) => state.auth.user);
    const customization = useSelector((state) => state.customization);

    const [navType, setNavType] = useState(customization.navType);
    const [state, setState] = React.useState({
        top: false,
        left: false,
        bottom: false,
        right: false
    });

    const toggleDrawer = (anchor, open) => (event) => {
        if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };
    const handleLogout = async () => {
        try {
            await dispatch(logout());
            navigate('/login');
        } catch (err) {
            console.error(err);
        }
    };

    const [anchorEl, setAnchorEl] = useState(null);

    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
    const theme = useTheme();
    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
    };

    const handleMobileMenuOpen = (event) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

    const menuId = 'primary-search-account-menu';

    const renderMenu = (
        <Menu
            sx={{ marginTop: '28px' }}
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right'
            }}
            id={menuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right'
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem
            onClick={() => {
                setMetamask(true);
            }}
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 212 189">
                    <g fill="none" fill-rule="evenodd">
                        <polygon
                            fill="#CDBDB2"
                            points="60.75 173.25 88.313 180.563 88.313 171 90.563 168.75 106.313 168.75 106.313 180 106.313 187.875 89.438 187.875 68.625 178.875"
                        />
                        <polygon
                            fill="#CDBDB2"
                            points="105.75 173.25 132.75 180.563 132.75 171 135 168.75 150.75 168.75 150.75 180 150.75 187.875 133.875 187.875 113.063 178.875"
                            transform="matrix(-1 0 0 1 256.5 0)"
                        />
                        <polygon
                            fill="#393939"
                            points="90.563 152.438 88.313 171 91.125 168.75 120.375 168.75 123.75 171 121.5 152.438 117 149.625 94.5 150.188"
                        />
                        <polygon fill="#F89C35" points="75.375 27 88.875 58.5 95.063 150.188 117 150.188 123.75 58.5 136.125 27" />
                        <polygon
                            fill="#F89D35"
                            points="16.313 96.188 .563 141.75 39.938 139.5 65.25 139.5 65.25 119.813 64.125 79.313 58.5 83.813"
                        />
                        <polygon fill="#D87C30" points="46.125 101.25 92.25 102.375 87.188 126 65.25 120.375" />
                        <polygon fill="#EA8D3A" points="46.125 101.813 65.25 119.813 65.25 137.813" />
                        <polygon fill="#F89D35" points="65.25 120.375 87.75 126 95.063 150.188 90 153 65.25 138.375" />
                        <polygon fill="#EB8F35" points="65.25 138.375 60.75 173.25 90.563 152.438" />
                        <polygon fill="#EA8E3A" points="92.25 102.375 95.063 150.188 86.625 125.719" />
                        <polygon fill="#D87C30" points="39.375 138.938 65.25 138.375 60.75 173.25" />
                        <polygon fill="#EB8F35" points="12.938 188.438 60.75 173.25 39.375 138.938 .563 141.75" />
                        <polygon fill="#E8821E" points="88.875 58.5 64.688 78.75 46.125 101.25 92.25 102.938" />
                        <polygon fill="#DFCEC3" points="60.75 173.25 90.563 152.438 88.313 170.438 88.313 180.563 68.063 176.625" />
                        <polygon
                            fill="#DFCEC3"
                            points="121.5 173.25 150.75 152.438 148.5 170.438 148.5 180.563 128.25 176.625"
                            transform="matrix(-1 0 0 1 272.25 0)"
                        />
                        <polygon
                            fill="#393939"
                            points="70.313 112.5 64.125 125.438 86.063 119.813"
                            transform="matrix(-1 0 0 1 150.188 0)"
                        />
                        <polygon fill="#E88F35" points="12.375 .563 88.875 58.5 75.938 27" />
                        <path
                            fill="#8E5A30"
                            d="M12.3750002,0.562500008 L2.25000003,31.5000005 L7.87500012,65.250001 L3.93750006,67.500001 L9.56250014,72.5625 L5.06250008,76.5000011 L11.25,82.1250012 L7.31250011,85.5000013 L16.3125002,96.7500014 L58.5000009,83.8125012 C79.1250012,67.3125004 89.2500013,58.8750003 88.8750013,58.5000009 C88.5000013,58.1250009 63.0000009,38.8125006 12.3750002,0.562500008 Z"
                        />
                        <g transform="matrix(-1 0 0 1 211.5 0)">
                            <polygon
                                fill="#F89D35"
                                points="16.313 96.188 .563 141.75 39.938 139.5 65.25 139.5 65.25 119.813 64.125 79.313 58.5 83.813"
                            />
                            <polygon fill="#D87C30" points="46.125 101.25 92.25 102.375 87.188 126 65.25 120.375" />
                            <polygon fill="#EA8D3A" points="46.125 101.813 65.25 119.813 65.25 137.813" />
                            <polygon fill="#F89D35" points="65.25 120.375 87.75 126 95.063 150.188 90 153 65.25 138.375" />
                            <polygon fill="#EB8F35" points="65.25 138.375 60.75 173.25 90 153" />
                            <polygon fill="#EA8E3A" points="92.25 102.375 95.063 150.188 86.625 125.719" />
                            <polygon fill="#D87C30" points="39.375 138.938 65.25 138.375 60.75 173.25" />
                            <polygon fill="#EB8F35" points="12.938 188.438 60.75 173.25 39.375 138.938 .563 141.75" />
                            <polygon fill="#E8821E" points="88.875 58.5 64.688 78.75 46.125 101.25 92.25 102.938" />
                            <polygon
                                fill="#393939"
                                points="70.313 112.5 64.125 125.438 86.063 119.813"
                                transform="matrix(-1 0 0 1 150.188 0)"
                            />
                            <polygon fill="#E88F35" points="12.375 .563 88.875 58.5 75.938 27" />
                            <path
                                fill="#8E5A30"
                                d="M12.3750002,0.562500008 L2.25000003,31.5000005 L7.87500012,65.250001 L3.93750006,67.500001 L9.56250014,72.5625 L5.06250008,76.5000011 L11.25,82.1250012 L7.31250011,85.5000013 L16.3125002,96.7500014 L58.5000009,83.8125012 C79.1250012,67.3125004 89.2500013,58.8750003 88.8750013,58.5000009 C88.5000013,58.1250009 63.0000009,38.8125006 12.3750002,0.562500008 Z"
                            />
                        </g>
                    </g>
                </svg>
                <Typography className="MenuItem-style" variant="h2"
                 sx={{ color: theme.palette.mode === 'dark' ? '#fff' : '#000' }}>
                    MetaMask
                </Typography>
                <DoneIcon sx={{ color: 'green' }} />
            </MenuItem>
            <Divider />
        {/*     <MenuItem onClick={handleLogout}>
                <LogoutIcon />{' '}
                <Typography className="MenuItem-style" variant="h2" sx={{ color: theme.palette.mode === 'dark' ? '#fff' : '#000' }}>
                    Logout
                </Typography>
            </MenuItem> */}
        </Menu>
    );

    const mobileMenuId = 'primary-search-account-menu-mobile';
    // const renderMobileMenu = (
    //     <Menu
    //         anchorEl={mobileMoreAnchorEl}
    //         anchorOrigin={{
    //             vertical: 'top',
    //             horizontal: 'right'
    //         }}
    //         id={mobileMenuId}
    //         keepMounted
    //         transformOrigin={{
    //             vertical: 'top',
    //             horizontal: 'right'
    //         }}
    //         open={isMobileMenuOpen}
    //         onClose={handleMobileMenuClose}
    //     >
    //         <MenuItem>
    //             <IconButton size="large" aria-label="show 4 new mails" color="inherit">
    //                 <Badge badgeContent={4} color="error">
    //                     <MailIcon />
    //                 </Badge>
    //             </IconButton>
    //             <p>Messages</p>
    //         </MenuItem>
    //         <MenuItem>
    //             <IconButton
    //                 size="large"
    //                 aria-label="show 17
    //             new notifications"
    //                 color="inherit"
    //             >
    //                 <Badge badgeContent={17} color="error">
    //                     <NotificationsIcon />
    //                 </Badge>
    //             </IconButton>
    //             <p>Notifications</p>
    //         </MenuItem>

    //         <MenuItem onClick={handleProfileMenuOpen}>
    //             <IconButton
    //                 size="large"
    //                 aria-label="account of current user"
    //                 aria-controls="primary-search-account-menu"
    //                 aria-haspopup="true"
    //                 color="inherit"
    //             ></IconButton>
    //             <p>Profile</p>
    //         </MenuItem>
    //     </Menu>
    // );

    const list = (anchor) => (
        <>
        <MetaMask open={metamask} setOpen={setMetamask} />

            <Box
                sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 400 }}
                role="presentation"
                // onClick={toggleDrawer(anchor, false)}
                // onKeyDown={toggleDrawer(anchor, false)}
            >
                <Divider />
                <Box sx={{ pt: 4, pl: 4, pr: 2 }}>
                    <Grid container spacing={2}>
                        <Grid mt={3} xs={8} sx={{ display: 'flex' }}>
                            <Avatar sx={{ width: 38, height: 38, marginTop: { md: '-7px' }, mr: 1 }}>w</Avatar>
                            <Typography className="My-wallet" variant="h2" sx={{ color: theme.palette.mode === 'dark' ? '#fff' : '#000' }}>
                                My wallet
                            </Typography>
                            <ExpandMoreIcon sx={{ color: 'gray' }} onClick={handleProfileMenuOpen} />
                        </Grid>
                        <Grid mt={2.3} xs={4}>
                            <MetaMaskSection />
                        </Grid>

                        <Grid mt={2} mb={1} xs={12}>
                            <Divider />
                        </Grid>
                        <Grid mt={1} xs={12}>
                            <MainCard
                                className="walletShadow"
                                // sx={{borderColor: theme.palette.mode === 'dark' ? '#2d2e2f' : '#90caf975'}}
                                title={
                                    <Grid container spacing={1}>
                                        <Grid item xs={11}>
                                            <Balance />
                                        </Grid>
                                        <Grid item xs={12} textAlign="center" sx={{ marginBottom: { md: '-24px' } }}>
                                            <Button href="https://mumbai.polygonscan.com/" className="wallet-button" variant="contained" size="large">
                                                Add Funds
                                            </Button>
                                        </Grid>
                                    </Grid>
                                }
                                content={false}
                            ></MainCard>
                        </Grid>
                        <Grid mt={1.7} xs={4}>
                            {/*    <Item >POPULAR</Item> */}
                        </Grid>
                    </Grid>
                </Box>
            </Box>
            <>
                {/*   {renderMobileMenu} */}
                {renderMenu}
            </>
        </>
    );

    return (
        <div>
            {['right'].map((anchor) => (
                <React.Fragment key={anchor}>
                    <AccountBalanceWalletIcon onClick={toggleDrawer(anchor, true)} sx={{ color: '#4dabf5' }} />

                    <SwipeableDrawer
                        anchor={anchor}
                        open={state[anchor]}
                        onClose={toggleDrawer(anchor, false)}
                        onOpen={toggleDrawer(anchor, true)}
                    >
                        {list(anchor)}
                    </SwipeableDrawer>
                </React.Fragment>
            ))}
        </div>
    );
}
