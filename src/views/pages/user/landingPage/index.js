import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Grid } from '@mui/material';
import Header from './component/header';
import NewAndTrendingNfts from './component/newAndTrending';
import Categories from './component/categories';
import FeaturedCreators from './component/featuredCreators';
import { getAllLandingPageData } from 'redux/landingPage/actions';
const LandingPage = () => {
    const dispatch = useDispatch();
    const landingPageData = useSelector((state) => state.landingPageReducer.landingPageData);
    useEffect(() => {
        dispatch(getAllLandingPageData());
    }, []);

    return (
        <Grid item md={12} xs={12} lg={12} xl={12}>
            <Grid container-fluid>
                <Grid  item md={12} xs={12}>
                    <Header />
                </Grid>
                <Grid item md={12} xs={12}>
                    <Categories categories={landingPageData.categories} />
                </Grid>

                <Grid item md={12} xs={12}>
                    <NewAndTrendingNfts nfts={landingPageData.newNfts} />
                </Grid>

                <Grid mb={4} item md={12} xs={12}>
                    <FeaturedCreators brands={landingPageData.brands} />
                </Grid>
            </Grid>
        </Grid>
    );
};

export default LandingPage;
