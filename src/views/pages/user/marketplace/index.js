import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import { Grid } from '@mui/material';
import { useTheme } from '@mui/styles';
import Tabs from './component/tabs';
import NFTS from './component/nfts';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { getAllMarketplaceCategories, getAllMarketplaceNftsByCategory } from 'redux/marketplace/actions';
const Marketplace = () => {
    const theme = useTheme();
    const navigate = useNavigate();

    const dispatch = useDispatch();
    const location = useLocation();
    const marketplaceCategories = useSelector((state) => state.marketplaceReducer.marketplaceCategories);
    const marketplaceNfts = useSelector((state) => state.marketplaceReducer.marketplaceNfts);
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [categoryId, setCategoryId] = useState(0);

    useEffect(() => {
        dispatch(getAllMarketplaceCategories());
    }, []);

    useEffect(() => {
        if (location.state) {
            setCategoryId(location.state.category.id);
        }
    }, []);
    useEffect(() => {
        dispatch(
            getAllMarketplaceNftsByCategory({
                search: search,
                page: page,
                limit: limit,
                categoryId: categoryId
            })
        );
    }, [search, page, limit, categoryId]);
    return (
        <Grid
            item
            md={12}
            lg={11}
            xs={12}
            style={{
                background: 'tranparent',
                color: theme.palette.mode === 'dark' ? 'white' : '#404040'
            }}
        >
            <Grid container sx={{ display: { xs: 'block', sm: 'block', md: 'flex' }, marginBottom: '40px' }}>
                <Grid item md={12} xs={12} sx={{ mt: 2, paddingLeft: 1, paddingRight: 2 }}>
                    <Grid container>
                        <h1 style={{ paddingLeft: '0.5%' }}>
                            <ArrowBackIosIcon
                                onClick={() => {
                                    navigate('/home');
                                }}
                                sx={{ color: '#2F53FF' }}
                            />
                        </h1>
                    </Grid>
                    <Grid container>
                        <h1 className="MarketplaceHead" style={{ paddingLeft: '0.5%' }}>
                            Marketplace
                        </h1>

                        <Grid item md={12} xs={12}>
                            <Tabs marketplaceCategories={marketplaceCategories} categoryId={categoryId} setCategoryId={setCategoryId} />
                        </Grid>
                        <Grid item md={12} xs={12}>
                            <NFTS marketplaceNfts={marketplaceNfts} />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default Marketplace;
