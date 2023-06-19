import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { gridSpacing } from 'store/constant';
import { useTheme } from '@mui/material/styles';

import { Button, Grid, MenuItem, Menu, Pagination, OutlinedInput, InputAdornment, Typography } from '@mui/material';
import { IconSearch } from '@tabler/icons';
import { getDeliveryDashboard } from 'redux/deliveryDashboard/actions';
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';
import DeliveryDashboard from './component/deliveryDashboard';
import MainCard from 'ui-component/cards/MainCard';
import HeadingCard from 'shared/Card/HeadingCard';

const Delivered = () => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const deliveryList = useSelector((state) => state.delivery.deliveryList);
    const user = useSelector((state) => state.auth.user);

    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [categoryData, setCategoryData] = useState({
        id: null,
        name: '',
        description: '',
        image: null
    });
    const [addUpdateOpen, setAddUpdateOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseMenu = () => {
        setAnchorEl(null);
    };

    useEffect(() => {
        dispatch(
            getDeliveryDashboard({
                brand: user.BrandId
                // search: search,
                // page: page,
                // limit: limit
            })
        );
    }, [search, page, limit]);

    return (
        <>
            <HeadingCard title=" Delivery Dashboard" />

            <MainCard
            className=" tableShadow"
              sx={{ borderRadius: '5px !important' , boxShadow:'none'}}
                content={false}
            >
                <DeliveryDashboard deliveryList={deliveryList} user={user} />

                <>
                 {  /*  <Grid item xs={12} sx={{ p: 3 }}>
                        <Grid container justifyContent="center" spacing={gridSpacing}>
                            <Grid item>
                                <Pagination
                                    color="primary"
                                    showFirstButton
                                    showLastButton
                                    page={page}
                                    count={1}
                                    onChange={(event, newPage) => {
                                        setPage(newPage);
                                    }}
                                />
                            </Grid>
                           
                        </Grid>
                    </Grid> */}
                </>
            </MainCard>
        </>
    );
};

export default Delivered;
