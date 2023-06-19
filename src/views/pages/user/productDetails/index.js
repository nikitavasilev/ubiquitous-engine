import { useLocation } from 'react-router-dom';
import { useTheme } from '@emotion/react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Grid } from '@mui/material';
import PropertiesView from './component/productView';
import SimilarProducts from './component/similarProducts';
import Activity from './component/activity';
import { useParams } from 'react-router-dom';
import { getnftData } from 'redux/landingPage/actions';

import Properties from './component/properties';
import { cloneDeep } from 'lodash';

const ProductDetails = () => {
  const theme = useTheme();
  const location = useLocation();
  const dispatch = useDispatch();
  const productId = useParams().id;

  useEffect(() => {
    dispatch(getnftData({ id: productId }));
  }, []);
  const nftList = useSelector((state) => state.landingPageReducer?.nft);

  console.log(nftList.nft, 'nftindex****************>');
  return (
    <>
      <Grid
        container-fluid
        md={12}
        lg={12}
        sx={{
          ml: { lg: -1 },
          display: { xs: 'block', sm: 'block', md: 'flex', lg: 'flex' },
          background: 'tranparent',
          color: theme.palette.mode === 'dark' ? 'white' : '#404040',
        }}
      >
        <Grid item md={12} xs={12} lg={11}>
          <Grid container-fluid>
            <Grid item md={12} xs={12}>
              <Grid container>
                <Grid item md={12} xs={12}>
                  <PropertiesView
                    nftList={nftList}
                    //  nft={location?.state?.nft}
                  />
                </Grid>
                <Grid item md={12} xs={12}>
                  <Properties nftList={cloneDeep(nftList)} />
                </Grid>
                <Grid item md={12} xs={12}>
                  <Activity nftList={nftList} />
                </Grid>

                <Grid item md={12} xs={12}>
                  <SimilarProducts nftList={nftList} />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default ProductDetails;
