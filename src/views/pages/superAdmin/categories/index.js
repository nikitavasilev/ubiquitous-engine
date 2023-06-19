import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { gridSpacing } from 'store/constant';
import { useTheme } from '@mui/material/styles';
import CategoryTable from './component/categoryTable';
import { Button, Grid, MenuItem, Menu, Pagination, OutlinedInput, InputAdornment, Typography } from '@mui/material';
import { IconSearch } from '@tabler/icons';
import { getAllCategories } from '../../../../redux/categories/actions';
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';
import AddUpdateCategory from './component/addUpdateCategory';
import MainCard from 'ui-component/cards/MainCard';
import HeadingCard from 'shared/Card/HeadingCard';

const Categories = () => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const categoryList = useSelector((state) => state.category.categoryList);
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
            getAllCategories({
                search: search,
                page: page,
                limit: limit
            })
        );
    }, [search, page, limit]);

    return (
        <>
            <AddUpdateCategory
                open={addUpdateOpen}
                setOpen={setAddUpdateOpen}
                categoryData={categoryData}
                page={page}
                limit={limit}
                search={search}
            />            <HeadingCard title=" Category Management" />


            
            <MainCard
            className='tableShadow'
                title={
                    <Grid container spacing={4} >
                    <Grid item xs={12} lg={8} >
                    <Typography className='mainheading' variant="h1" component="h2"
                     sx={{marginLeft:{lg:'48px', md:'48px'}}}>
                     Categories
                  </Typography>
                    </Grid>
                        <Grid item xs={6} lg={2} >
                       
                        <OutlinedInput
                        id="input-search-list-style1"
                        placeholder="Search"
                        startAdornment={
                            <InputAdornment position="start">
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
                            <Button className='buttonSize' sx={{marginLeft:{lg:'-16px', md:'-16px'}}}
                                variant="contained"
                                size="large"
                                onClick={() => {
                                    setAddUpdateOpen(true);
                                    setCategoryData({ id: null, name: '', description: '', image: null });
                                }}
                            >
                            Create
                            </Button>
                        </Grid>
                    </Grid>
                   
                }
                content={false}
            >
                <CategoryTable
                    categoryList={categoryList && categoryList}
                    page={page}
                    limit={limit}
                    search={search}
                    setAddUpdateOpen={setAddUpdateOpen}
                    setCategoryData={setCategoryData}
                />

                <Grid item xs={12} sx={{ p: 3 }}>
                <Grid container justifyContent="center" spacing={gridSpacing}>
                    <Grid item>
                    <Pagination
                    textAlign='center'
                        color="primary"
                        showFirstButton
                        showLastButton
                        page={page}
                        count={categoryList && categoryList.pages}
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

export default Categories;
