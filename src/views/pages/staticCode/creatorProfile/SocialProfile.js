import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Box, Button, CardMedia, Grid, Tab, Tabs, Typography } from '@mui/material';

import Avatar from 'ui-component/extended/Avatar';

import MainCard from 'ui-component/cards/MainCard';

import { gridSpacing } from 'store/constant';

import User1 from 'assets/images/profile/img-user.png';
import Cover from 'assets/images/profile/img-profile-bg.png';
// assets
import StarBorderIcon from '@mui/icons-material/StarBorder';
import FeedbackIcon from '@mui/icons-material/Feedback';
import TwitterIcon from '@mui/icons-material/Twitter';
import PhoneIcon from '@mui/icons-material/Phone';
import InstagramIcon from '@mui/icons-material/Instagram';
import ShareIcon from '@mui/icons-material/Share';
import LanguageIcon from '@mui/icons-material/Language';
import RedditIcon from '@mui/icons-material/Reddit';
// ==============================|| SOCIAL PROFILE ||============================== //

const SocialProfile = () => {
  const user = useSelector((state) => state.auth.user);
  const globalState = useSelector((state) => state);
  const userNftsCount = useSelector((state) => state.nftReducer.nftListUser.nfts?.length);
  const theme = useTheme();
  const itemData = [
    {
      icon: <InstagramIcon />,
    },
    {
      icon: <InstagramIcon />,
    },
    {
      icon: <LanguageIcon />,
    },
    {
      icon: <RedditIcon />,
    },
    {
      icon: <TwitterIcon />,
    },
    {
      icon: <PhoneIcon />,
    },
    {
      icon: '|',
    },
    {
      icon: <StarBorderIcon />,
    },
    {
      icon: <FeedbackIcon />,
    },
    {
      icon: <ShareIcon />,
    },
  ];

  const date = new Date(user?.createdAt);
  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  const formattedDate = `${monthNames[date.getMonth()]} ${date.getFullYear()}`;

  console.log('user', user);

  const defaultDescription = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ullamcorper nisl erat, vel convallis elit fermentum pellentesque. Sed mollis velit facilisis facilisis viverra, ligula sapien`;

  return (
    <Grid
      container
      spacing={gridSpacing}
      sx={{
        color: theme.palette.mode === 'dark' ? 'white' : '#404040',
      }}
    >
      <Grid item xs={12} lg={11.86} xl={12}>
        <CardMedia component="img" image={user?.UserProfile?.bannerImg || Cover} sx={{ borderRadius: '1px', overflow: 'hidden', mb: 3 }} />
        <Grid container spacing={gridSpacing}>
          <Grid item xs={12} md={3}>
            <Avatar
              alt={`${user?.firstName} ${user?.lastName}`}
              src={user?.UserProfile?.profileImg || User1}
              sx={{
                margin: '-70px 0 0 auto',
                borderRadius: '16px',
                [theme.breakpoints.down('lg')]: {
                  margin: '-70px auto 0',
                },
                [theme.breakpoints.down('md')]: {
                  margin: '-60px auto 0',
                },
                width: { xs: 72, sm: 100, md: 140 },
                height: { xs: 72, sm: 100, md: 140 },

                float: { md: 'left', xl: 'left' },
                marginLeft: { md: '30px', xl: '30px' },
              }}
            />
          </Grid>
        </Grid>
        <Grid container mt={2}>
          <Grid item xs={12} md={6}>
            <Typography
              sx={{
                marginLeft: { md: '30px', xl: '30px' },
                textAlign: { xs: 'center', sm: 'center', md: 'left', xl: 'left' },
              }}
              className="text"
              variant="h5"
            >
              {user?.firstName} {user?.lastName}
            </Typography>
            <Typography
              sx={{
                marginLeft: { md: '30px', xl: '30px' },
                textAlign: { xs: 'center', sm: 'center', md: 'left', xl: 'left' },
              }}
              variant="subtitle2"
            >
              {user?.walletAddress}
            </Typography>
            <Typography
              sx={{
                marginLeft: { md: '30px', xl: '30px' },
                textAlign: { xs: 'center', sm: 'center', md: 'left', xl: 'left' },
              }}
              className="AdminRole"
              variant="subtitle2"
            >
              {user?.role}
            </Typography>
          </Grid>
          {/*   <Grid item xs={12} md={6}>
                        <Grid container sx={{ justifyContent: 'flex-end', [theme.breakpoints.down('md')]: { justifyContent: 'center' } }}>
                            {itemData.map((item) => (
                                <Grid item sx={{ margin: { xs: '3px', sm: '3px', md: '7px', xl: '7px' } }}>
                                    <Link
                                        to="https://blog.berrydashboard.io/"
                                        target="_blank"
                                        underline="hover"
                                        color="#2FC1FF !important "
                                    >
                                        {item?.icon}
                                    </Link>
                                </Grid>
                            ))}
                        </Grid>
                    </Grid> */}
        </Grid>
        <Grid mt={2} item xs={12} md={12} sx={{ display: 'flex', marginLeft: { md: '-9px' } }}>
          <ul className="list">
            <li className="item">
              Items <b> {userNftsCount}</b>
            </li>
            <li className="itemstyle">
              Created On <b> {formattedDate}</b>
            </li>
          </ul>
        </Grid>
        <Grid mt={2} item xs={12} md={12}>
          <Typography
            sx={{ marginLeft: { md: '30px', xl: '30px' }, textAlign: { xs: 'center', sm: 'center', md: 'left', xl: 'left' } }}
            className="text"
            variant="h5"
          >
            Description
          </Typography>
        </Grid>
        <Grid mt={1} item xs={12} md={10} sx={{ padding: '17px 20px 17px 27px' }}>
          <Typography
            className="para"
            variant="body"
            sx={{
              color: theme.palette.mode === 'dark' ? 'white' : '#404040',
            }}
          >
            {user?.UserProfile?.description || defaultDescription}
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default SocialProfile;
