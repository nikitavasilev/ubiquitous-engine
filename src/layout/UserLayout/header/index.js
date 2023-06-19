import * as React from 'react';
import { useState } from 'react';
import { styled, alpha, useTheme } from '@mui/material/styles';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import userHeader from 'assets/images/userHeader.png';
import personuser from 'assets/images/person_user.png';
import galileo from 'assets/images/galileo.png';
import galileoWhite from 'assets/images/galileo-white.png';
import styles from './header.module.css';
import MetaData from '../metaDataValue/metadata';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Drawer from '../drawer/drawer';
import { logout } from 'redux/auth/actions';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from '@mui/material';
import MetaMaskSection from './MetaMaskSection';
import { Helmet } from 'react-helmet';
import MetaMask from 'shared/metaMaskwithBalance';
import { useEffect } from 'react';
const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  background: theme.palette.mode === 'dark' ? theme.palette.dark.main : 'white',

  color: 'white',
  '& .MuiInputBase-input': {
    background: theme.palette.mode === 'dark' ? 'black' : '#f3f3f3',
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    width: '100ch',
    [theme.breakpoints.up('md')]: {
      width: '68ch',
      maxWidth: 'auto',
    },

    [theme.breakpoints.up('lg')]: {
      width: '70ch',
      maxWidth: 'auto',
    },

    [theme.breakpoints.up('xl')]: {
      width: '75ch',
      maxWidth: 'auto',
    },
  },
}));

export default function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = async () => {
    try {
      await dispatch(logout());
      navigate('/login');
    } catch (err) {
      console.error(err);
    }
  };

  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.auth.user);
  // console.log('token', token);
  // console.log('user', user);

  // const token = useSelector((state) => state.auth.token);
  // if(!token){
  //     user =undefined
  // }else{
  //     user = useSelector((state) => state.auth.user);

  // }
  // console.log(user?.role, 'user in sidebar');
  // console.log(token, 'token in sidebar');

  const [anchorEl, setAnchorEl] = useState(null);

  const [metamask, setMetamask] = useState(false);

  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);

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
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem component={RouterLink} className="userName">
        {user?.firstName} {user?.lastName}
      </MenuItem>
      <MenuItem component={RouterLink} to="/creatorProfile" onClick={handleMenuClose}>
        My Profile
      </MenuItem>
      <MenuItem component={RouterLink} to="/editProfile" onClick={handleMenuClose}>
        Edit Profile
      </MenuItem>
      {user?.role == 'User' && user != null && (
        <MenuItem component={RouterLink} to="/deliveryDashboard" onClick={handleMenuClose}>
          Delivery Dashboard
        </MenuItem>
      )}
      {/* <MenuItem
                onClick={() => {
                    setMetamask(true);
                }}
            >
                Wallet Connect
            </MenuItem> */}
      <MenuItem onClick={handleLogout}>Logout</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="error">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 17 
                new notifications"
          color="inherit"
        >
          <Badge badgeContent={17} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>

      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        ></IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  const theme = useTheme();

  return (
    <>
      <MetaMask open={metamask} setOpen={setMetamask} />
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" sx={{ backgroundColor: `${theme.palette.mode === 'dark' ? '#181C1F' : 'white'}`, borderRadius: '4px' }}>
          <Toolbar>
            <Helmet>
              <meta charSet="utf-8" />
              <title>Galileo Marketplace</title>
              <link rel="canonical" href="http://mysite.com/example" />
            </Helmet>
            <Box
              sx={{
                height: '3em',
                // paddingTop: '1em',
                width: '100%',
                marginLeft: '1%',
                display: 'flex',
                // [theme.breakpoints.down('md')]: {
                //     width: 'auto'
                // }
              }}
            >
              <Grid container-fluid sx={{ display: 'flex', marginTop: '3px' }}>
                <Grid item sx={{ display: { lg: 'none', md: 'none' } }}>
                  <Drawer />
                </Grid>
                <Grid item md={4}>
                  {theme.palette.mode === 'dark' ? (
                    <img
                      src={galileoWhite}
                      onClick={() => {
                        navigate('/home');
                      }}
                      alt="Galileo White Logo"
                      width="100"
                      style={{ cursor: 'pointer' }}
                    />
                  ) : (
                    <img
                      src={galileo}
                      onClick={() => {
                        navigate('/home');
                      }}
                      alt="Galileo Dark Logo"
                      width="100"
                      style={{ cursor: 'pointer' }}
                    />
                  )}
                </Grid>
                <Grid item md={5}>
                  <Search
                    sx={{
                      width: '10rem !important',
                      display: { xs: 'none', sm: 'none', md: 'none', lg: 'flex', xl: 'flex' },
                    }}
                  >
                    <SearchIconWrapper>
                      <SearchIcon sx={{ color: '#d3d3d3', zIndex: '1' }} />
                    </SearchIconWrapper>
                    <StyledInputBase
                      sx={{
                        color: `${theme.palette.mode === 'dark' ? '#fff' : '#000'}`,
                        border: `${theme.palette.mode === 'dark' ? ' 3px solid black' : ' 3px solid white'}`,
                        borderRadius: '4px !important',
                      }}
                      placeholder="Search"
                      inputProps={{ 'aria-label': 'search' }}
                    />
                  </Search>
                </Grid>
                <Grid item md={3}></Grid>
              </Grid>

              <Box sx={{ flexGrow: 1 }} />
              <Box sx={{ flexGrow: 1 }} />

              {(user?.role == 'Sub Admin' || 'Brand Admin' || 'Super Admin') && user?.role != 'User' && (token !== null || undefined) && (
                <Box sx={{ marginTop: '3px' }}>
                  <Button
                    sx={{ marginRight: '10px', display: { xs: 'none', lg: 'block' } }}
                    variant="outlined"
                    onClick={() => {
                      navigate('/dashboard');
                    }}
                  >
                    Dashboard
                  </Button>
                </Box>
              )}

              <Box sx={{ display: { xs: 'none', sm: 'flex', md: 'flex' }, mr: 3, marginTop: '3px' }}>
                {/*   <div sx={{ marginRight: '1%' }}>
                                    {(user?.role == 'Sub Admin' || 'Brand Admin' || 'Super Admin' || 'User') &&
                                        (token != null || undefined) && <MetaMaskSection />}
                                </div> */}
                <IconButton size="large" aria-label="" color="inherit" title="Coming Soon">
                  <Badge>
                    <NotificationsIcon sx={{ color: '#4dabf5' }} />
                  </Badge>
                </IconButton>

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

                {/*     ) : (
                                    <IconButton size="large" aria-label="" color="inherit" sx={{}}>
                                        <AccountBalanceWalletIcon
                                            onClick={() => {
                                                setMetamask(true);
                                            }}
                                            sx={{ color: '#4dabf5' }}
                                        />
                                    </IconButton>
                                )} */}

                <IconButton size="large" aria-label="" color="inherit" title="Coming Soon">
                  <ShoppingCartIcon sx={{ color: '#4dabf5' }} />
                </IconButton>
              </Box>
              {(token == null || undefined) && (
                <Button
                  size="large"
                  variant="outlined"
                  onClick={() => {
                    navigate('/login');
                  }}
                >
                  Login
                </Button>
              )}
              {token && (user?.role == 'Sub Admin' || 'Brand Admin' || 'Super Admin' || 'User') && (
                <>
                  {theme.palette.mode === 'dark' ? (
                    <img
                      src={user?.UserProfile?.profileImg || userHeader}
                      alt=""
                      height="35"
                      width="35"
                      style={{
                        display: 'inlineBlock',
                        marginTop: '3px',
                        borderRadius: '50%',
                        border: '2px solid white',
                        objectFit: 'cover',
                      }}
                    />
                  ) : (
                    <img
                      src={user?.UserProfile?.profileImg || personuser}
                      alt=""
                      height="35"
                      width="35"
                      style={{
                        display: 'inlineBlock',
                        marginTop: '3px',
                        borderRadius: '50%',
                        border: '2px solid black',
                        objectFit: 'cover',
                      }}
                    />
                  )}

                  <IconButton
                    size="large"
                    edge="end"
                    aria-label="account of current user"
                    aria-controls={menuId}
                    aria-haspopup="true"
                    onClick={handleProfileMenuOpen}
                    color="inherit"
                  >
                    <KeyboardArrowDownIcon sx={{ color: '#4dabf5' }} />
                  </IconButton>
                </>
              )}
            </Box>
          </Toolbar>
        </AppBar>
        {(user?.role == 'Sub Admin' || 'Brand Admin' || 'Super Admin' || 'User') && (token != null || undefined) && (
          <>
            {renderMobileMenu}
            {renderMenu}
          </>
        )}
      </Box>
    </>
  );
}
