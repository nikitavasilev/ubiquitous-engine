import { useTheme } from '@mui/material/styles';
import { Card, Grid, CardActionArea, CardContent, Divider, Select, FormControl, MenuItem } from '@mui/material';
import CardMedia from '@mui/material/CardMedia';
import { useNavigate } from 'react-router-dom';
import attribute from 'views/pages/trackingTool/component/attribute';
import TetherIcon from 'assets/images/icons/tether_icon.svg';

const NewCard = ({ data, nfts }) => {
    const theme = useTheme();
    const navigate = useNavigate();
    console.log(data.id, 'nfts.id======>');
    return (
        <Grid
            item
            xs={12}
            mt={5}
            className="new-margin"
            sx={{
                color: theme.palette.mode === 'dark' ? 'white' : 'black',
                textDecoration: 'none',

                ml: {
                    xs: nfts && nfts?.length > 5 ? 4 : 0,
                    sm: nfts && nfts?.length > 5 ? 2 : 0,
                    md: nfts && nfts?.length > 5 ? 2 : 0,
                    lg: nfts && nfts?.length > 5 ? 2 : 1
                },
                mr: { xs: nfts && nfts?.length > 5 ? 1 : 0, md: nfts && nfts?.length > 5 ? 4 : 2, lg: nfts && nfts?.length > 5 ? 4 : 3.5 }
            }}
            md={nfts && nfts?.length > 5 ? 12 : 2}
            lg={nfts && nfts?.length > 5 ? 12 : 2}
            xl={nfts && nfts?.length > 5 ? 12 : 2}
            sm={nfts && nfts?.length > 5 ? 12 : 3}
        >
            <Card
                onClick={() => {
                    navigate('/productDetails/' + data.id, {
                        state: {
                            nft: data
                        }
                    });
                }}
                className="new-width"
                sx={{
                    color: theme.palette.mode === 'dark' ? 'white' : '#404040',
                    background: theme.palette.mode === 'dark' ? '#181C1F' : 'white',
                    // maxWidth: nfts && nfts?.length > 3? 0 : 365,
                    width: nfts && nfts?.length > 5 ? '100%' : { lg: '249px', xl: '100%' },

                    // boxShadow: '1px 2px 6px #d3d3d3',
                    borderRadius: '3px',
                    marginBottom: '10px',
                    maxWidth: { xl: '100%' }
                }}
            >
                <CardActionArea>
                    <CardMedia
                        onClick={() => {
                            navigate('/productDetails/' + data.id, {
                                state: {
                                    nft: data
                                }
                            });
                        }}
                        component="img"
                        height="200"
                        sx={{ objectFit: 'scale-down' }}
                        image={data.asset}
                    />
                    <CardContent style={{ padding: '6%' }}>
                        <Grid container>
                            <Grid item className="encap" xs={8} sx={{ textAlign: 'left' }}>
                                <span className="cardHeading" style={{ fontSize: '130%' }}>
                                    {' '}
                                    {data.name}{' '}
                                </span>
                                <div className="overflow" style={{ marginTop: '5%', color: '#656565' }}>
                                    {data.Brand.name}
                                </div>
                            </Grid>
                            {/*     <Grid item xs={4} sx={{ background: '' }}>
                                <span className='newCreator' style={{ fontSize: '110%', float: 'right', color: '#878787' }}>
                                    Brand
                                </span>
                            </Grid> */}
                        </Grid>
                        {/*    <Grid mt={1} container >
                            <Grid item className='encap' xs={8} sx={{ textAlign: 'left' }}>
                                <span  className='newCreator' style={{ fontSize: '110%',  color: '#878787' }}> Serial Id:  </span>
                              
                            </Grid>
                            <Grid mt={-2} item xs={4} sx={{ background: '' }}>
                            <FormControl
                            sx={{
                                background: theme.palette.mode === 'dark' ? '#181C1F' : '#d9d9d9',
                                color: theme.palette.mode === 'dark' ? '#ffff' : 'black',
                                padding: '10px 10px 10px 10px',
                                borderRadius: '4px'
                            }}
                            fullWidth
                        >
                            <Select
                                variant="standard"
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                // value={age}
                                // onChange={handleChange}
                                fullWidth
                                displayEmpty
                             
                            >
                            {data?.NFTTokens.map((data)=>( 
                                <MenuItem
                                    // component={redirect}
                                    // to={option.fieldValue}
                                    // key={option.fieldValue}
                                    // value={option.fieldValue}
                                    // onClick={useNavigate(option.fieldValue)}
                                    onClick={() => {
                                        // useNavigate(option.fieldValue)
                                        // window.open(option.serialId, '_blank');
                                    }}
                                >
                                {data?.serialId ? data?.serialId+',' : 'No serial Id'}
                                </MenuItem>
                                )  )
                            }
                            </Select>
                        </FormControl>

                          
                            </Grid>
                        </Grid> */}

                        <Divider sx={{ mt: 1, mb: 1 }} />
                        <Grid>
                            <Grid item md={12} xs={12} className="overflow" sx={{ marginTop: { xs: '10px', md: '0' } }}>
                                <span sx={{ float: 'left' }}>
                                    <img
                                        src={TetherIcon}
                                        alt="Tether icon"
                                        style={{ width: '26px', height: 'auto', verticalAlign: 'middle', marginRight: '5px' }}
                                    />
                                </span>
                                <span style={{ marginLeft: '2%' }}>
                                    <b>{data.currencyType + ' ' + data.price}</b>
                                </span>
                            </Grid>
                        </Grid>
                    </CardContent>
                </CardActionArea>
            </Card>
        </Grid>
    );
};

export default NewCard;
