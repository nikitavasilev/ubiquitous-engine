import { useLocation } from 'react-router-dom';
import { useTheme } from '@emotion/react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, Divider } from '@mui/material';
import Activity from './component/activity';
import Product from './component/productView';
import Header from 'layout/UserLayout/header';
import Sidebar from 'layout/UserLayout/sidebar';
import Footer from 'layout/UserLayout/footer';
import TrackAtribute from './component/trackAtribute';
import { getTrack } from 'redux/marketplace/actions';
import { useParams } from 'react-router-dom';
// import { getnftData } from 'redux/landingPage/actions';
import { useNavigate } from 'react-router-dom';
import Stack from '@mui/material/Stack';

import LinearProgress from '@mui/material/LinearProgress';

const TrackingTool = () => {
  const theme = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);

  const dispatch = useDispatch();
  const serialId = useParams().token;
  const tokenId = location.state?.tokenId;
  const address = location.state?.address;

  const marketplaceNfts = useSelector((state) => state.marketplaceReducer.trackNft);

  useEffect(() => {
    dispatch(
      getTrack({
        serialId: serialId,
        tokenId: `${tokenId}`,
        address: address,
        navigate: navigate,
      })
    );
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          return 0;
        }
        const diff = Math.random() * 10;
        return Math.min(oldProgress + diff, 100);
      });
    }, 500);

    // stop the timer once the data is fetched
    if (marketplaceNfts?.nft?.Brand?.image) {
      clearInterval(timer);
    }

    return () => {
      clearInterval(timer);
    };
  }, [marketplaceNfts]);

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
            theme.palette.mode === 'dark' ? 'linear-gradient(to top right, black,rgba(255,0,0,0), rgba(43 140 255 / 27%) )' : '',
        }}
      >
        <Grid
          item
          md={12}
          sm={12}
          xs={12}
          sx={{
            mt: 2,
            ml: 2,
            mr: 2,
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
          sx={{
            mt: 2,
            marginBottom: '28px',
            position: 'sticky',
            height: '100%',
            top: '0',
            display: { xs: 'none', sm: 'none', md: 'flex', lg: 'flex', xl: 'flex' },
          }}
        >
          <Sidebar />
        </Grid>
        <Grid
          container-fluid
          md={11}
          lg={11}
          sx={{
            ml: { md: -2 },
            mt: 0.4,
            display: { xs: 'block', sm: 'block', md: 'flex', lg: 'flex' },
            background: 'tranparent',
            color: theme.palette.mode === 'dark' ? 'white' : '#404040',
          }}
        >
          {marketplaceNfts?.nft?.Brand?.image ? (
            <Grid item md={12} xs={12} lg={12}>
              {/*  <Grid item xs={12} lg={12} md={12}>
                            <Grid container spacing={2} sx={{ mb: 2 }}>
                                <Grid item xs={12}>
                                    <Typography
                                        color={theme.palette.mode === 'dark' ? '#FFFFFF' : 'black'}
                                        className="productfigmastyl"
                                        variant="h2"
                                        mt={4}
                                        component="div"
                                        sx={{ textAlign: { xs: 'center', md: 'center', sm: 'center' }, textTransform: 'capitalize' }}
                                    >
                                        The product is authentic
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid> */}
              <Grid container-fluid>
                <Grid item md={12} xs={12}>
                  <Grid container>
                    <Grid item md={12} xs={12}>
                      <Product tracking={marketplaceNfts} />
                    </Grid>
                    <Grid item md={12} xs={12}>
                      <TrackAtribute tracking={marketplaceNfts} serialId={serialId} />
                    </Grid>
                    <Grid item md={12} xs={12}>
                      <Activity tracking={marketplaceNfts} />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          ) : (
            <Stack m={5} sx={{ width: '100%', color: 'grey.500' }} spacing={2}>
              {/*   <LinearProgress color="secondary" />
                        <LinearProgress color="success" /> */}
              <LinearProgress color="secondary" variant="determinate" value={progress} />
            </Stack>
          )}
        </Grid>
      </Grid>

      <Divider sx={{ borderBottomWidth: 1, border: '1px solid #ccc' }} />

      <Grid
        item
        md={10}
        sm={10}
        xs={12}
        sx={{
          pl: {},
          background: theme.palette.mode === 'dark' ? 'black' : '#f3f3f3',
          color: theme.palette.mode === 'dark' ? 'white' : '#404040',
        }}
      >
        <Footer />
      </Grid>
    </>
  );
};

export default TrackingTool;
