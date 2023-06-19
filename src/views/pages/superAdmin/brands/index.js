import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { gridSpacing } from 'store/constant';
import { useTheme } from '@mui/material/styles';
import BrandTable from './component/brandTable';
import {
    CircularProgress,
    Button,
    Typography,
    Grid,
    MenuItem,
    TextField,
    Menu,
    Pagination,
    OutlinedInput,
    InputAdornment,
    Divider
} from '@mui/material';
import { IconSearch } from '@tabler/icons';
import { getAllBrands, getAllBrandsByAdmin } from '../../../../redux/brand/actions';
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';
import AddUpdateBrandDialog from './component/addUpdateBrand';
import MainCard from 'ui-component/cards/MainCard';
import HeadingCard from 'shared/Card/HeadingCard';

const Brands = () => {
    const user = useSelector((state) => state.auth.user);
    console.log('user', user);
    const theme = useTheme();
    const dispatch = useDispatch();
    const brandsList = useSelector((state) => state.brand.brandsList);

    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [brandData, setBrandData] = useState({
        id: null,
        name: '',
        description: '',
        image: null,
        location: '',
        instagram: '',
        medium: '',
        telegram: '',
        website: '',
        facebook: '',
        twitter: '',
        linkedin: '',
        email: '',
        phoneNumber: '',
        discord: ''
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
            getAllBrands({
                search: search,
                page: page,
                limit: limit
            })
        );
    }, [search, page, limit]);

    return (
        <>
            <AddUpdateBrandDialog
                brandData={brandData}
                page={page}
                limit={limit}
                search={search}
                open={addUpdateOpen}
                setOpen={setAddUpdateOpen}
            />
            <HeadingCard title="Brand Management" />
            {/*    // <Grid container spacing={4} >
            //         <Grid item xs={6} lg={8} >
            //         <Typography className='mainheading' variant="h1" component="h2" sx={{marginLeft:{lg:'44px', md:'44px'}}}>
            //         Brand Management
            //       </Typography>
            //       </Grid></Grid> */}

            <MainCard
                className="tableShadow"
                title={
                    <Grid container spacing={4}>
                        <Grid item xs={12} lg={8}>
                            <Typography className="mainheading" variant="h1" component="h2" sx={{ marginLeft: { lg: '44px', md: '44px' } }}>
                                Brands
                            </Typography>
                        </Grid>
                        <Grid item xs={6} lg={2}>
                            <OutlinedInput
                                id="input-search-list-style1"
                                placeholder="Search"
                                startAdornment={
                                    <InputAdornment position="end">
                                        <IconSearch stroke={1.5} size="1rem" />
                                    </InputAdornment>
                                }
                                size="small"
                                onChange={(e) => {
                                    setSearch(e.target.value);
                                }}
                            />
                        </Grid>
                        <Grid item xs={6} lg={2} textAlign="start">
                            <Button
                                className="buttonSize"
                                sx={{ marginLeft: { lg: '-16px', md: '-16px' } }}
                                variant="contained"
                                size="large"
                                onClick={() => {
                                    setAddUpdateOpen(true);
                                    setBrandData({
                                        id: null,
                                        name: '',
                                        description: '',
                                        location: '',
                                        image: null,
                                        instagram: '',
                                        medium: '',
                                        telegram: '',
                                        website: '',
                                        facebook: '',
                                        twitter: '',
                                        linkedin: '',
                                        email: '',
                                        phoneNumber: '',
                                        discord: ''
                                    });
                                }}
                            >
                                Create
                            </Button>
                        </Grid>
                    </Grid>
                }
                content={false}
            >
                <BrandTable
                    brandsList={brandsList && brandsList}
                    page={page}
                    limit={limit}
                    search={search}
                    setAddUpdateOpen={setAddUpdateOpen}
                    setBrandData={setBrandData}
                />

                <Grid item xs={12} sx={{ p: 3 }}>
                    <Grid container justifyContent="center" spacing={gridSpacing}>
                        <Grid item>
                            <Pagination
                                textAlign="center"
                                color="primary"
                                showFirstButton
                                showLastButton
                                page={page}
                                count={brandsList && brandsList.pages}
                                onChange={(event, newPage) => {
                                    setPage(newPage);
                                }}
                            />
                        </Grid>
                    </Grid>
                </Grid>
            </MainCard>
        </>
    );
};

export default Brands;
