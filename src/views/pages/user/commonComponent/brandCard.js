import { useTheme } from '@mui/material/styles';
import { Card, Grid, CardActionArea, CardContent, Divider } from '@mui/material';
import CardMedia from '@mui/material/CardMedia';
import { useNavigate } from 'react-router-dom';

const BrandCard = ({ data, brands }) => {
    const theme = useTheme();
    const navigate = useNavigate();

    return (
        <Grid className='feature'
            sx={{
                color: theme.palette.mode === 'dark' ? 'white' : 'black',
                textDecoration: 'none',
             
                ml: {
                    xs: brands && brands?.length > 5 ? 4 : 0,
                    sm: brands && brands?.length > 5 ? 2 : 0,
                    md: brands && brands?.length > 5 ? 2 : 0,
                    lg: brands && brands?.length > 5 ? 2 : 0
                },
                mr: { xs: brands && brands?.length > 5 ? 1 : 0,
                     md: brands && brands?.length > 5 ? 4 : 2,
                     lg: brands && brands?.length > 5 ? 4 : 4.8
                     }
            }}
            item
            xl={brands && brands?.length > 5 ? 12 : 2}
            lg={brands && brands?.length > 5 ? 12 : 2}
            md={brands && brands?.length > 5 ? 12 : 2}
            sm={brands && brands?.length > 5 ? 12 : 3}
            xs={12}
            justifyContent="center"
            onClick={() => {
                navigate('/brand/' + data.id, {
                    state: {
                        nft: data
                    }
                });
            }}
        >
            <Card
            className='feature-width'
                sx={{
                    color: theme.palette.mode === 'dark' ? 'white' : '#404040',
                    background: theme.palette.mode === 'dark' ? '#181C1F' : 'white',
                    width: brands && brands?.length > 5 ? '100%' : { lg: '249px' , xl:'100%'},
                    // boxShadow: '1px 2px 6px #d3d3d3',
                    borderRadius: '3px',
                    marginBottom: '10px',
                    maxWidth:{xl:'100%'},
                }}
            >
                <CardActionArea>
                    <CardMedia component="img" height="200" sx={{objectFit:'scale-down'}} image={data.image} />
                    <CardContent style={{ padding: '6%' }}>
                        <Grid container>
                            <Grid item xs={8}  className='encap' sx={{ textAlign: 'left' }}>
                                <span className='cardHeading' style={{ fontSize: '130%' }}> {data?.name}</span>
                                 <Grid className="overflow Creationstyling" 
                                style={{ marginTop: '5%',
                                color: theme.palette.mode === 'dark' ? ' #a99d9d ' : '#404040', }}>
                                     {data?.nftCount > 1? data?.nftCount +' '+ 'Items':  data?.nftCount +' '+ 'Item'} 
                                </Grid> 
                            </Grid>
                        </Grid>
                    </CardContent>
                </CardActionArea>
            </Card>
        </Grid>
    );
};

export default BrandCard;
