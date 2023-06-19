import { Grid, Button, Tooltip } from '@mui/material';
import { useTheme } from '@mui/styles';
import '@fontsource/public-sans';
import LanguageIcon from '@mui/icons-material/Language';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import TelegramIcon from '@mui/icons-material/Telegram';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import StarSharpIcon from '@mui/icons-material/StarSharp';
import ChatBubbleOutlineSharpIcon from '@mui/icons-material/ChatBubbleOutlineSharp';
import ShareSharpIcon from '@mui/icons-material/ShareSharp';
import { IconBrandDiscord, IconBrandMedium } from '@tabler/icons';
import EmailIcon from '@mui/icons-material/Email';
import styles from './companypage.module.css';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BmwCard from 'views/pages/user/commonComponent/BmwCard';
import { bmwPage } from 'redux/landingPage/actions';

const CompanyPage = () => {
    const BrandId = useParams().id;
    const theme = useTheme();
    const dispatch = useDispatch();
    const bmwData = useSelector((state) => state.landingPageReducer.bmwData.brandData);
    const itemsNb = bmwData?.length ? bmwData[0]?.Nfts.length : 0;
    const brandSocials = bmwData?.length ? bmwData[0]?.BrandSocial : [];

    const darkModeColor = '#f3f3f3';
    const lightModeColor = '#404040';
    const blueColor = '#2F6BFF';

    useEffect(() => {
        console.log('run =======>');

        dispatch(bmwPage({ BrandId: BrandId }));
    }, [BrandId]);
    return (
        <Grid
            mt={1.5}
            md={12}
            sx={{
                ml: { lg: -2 },
                background: theme.palette.mode === 'dark' ? 'black' : '#f3f3f3',
                color: theme.palette.mode === 'dark' ? 'white' : '#404040',
                p: 1,
                borderRadius: '4px'
            }}
        >
            <Grid
                container-fluid
                sx={{ margin: '0', padding: '0', display: { xs: 'block', sm: 'block', md: 'flex' }, marginBottom: '40px' }}
            >
                {bmwData?.map((row) => (
                    <Grid item md={12} xs={12} sx={{ mt: 2 }}>
                        <Grid container>
                            <Grid item xs={12} md={3} sx={{ paddingRight: '1rem' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                                    <div style={{ paddingTop: '-25px', paddingRight: '1rem' }}>
                                        <img
                                            src={row?.image}
                                            style={{
                                                borderRadius: '100px',
                                                marginTop: '-5px',
                                                height: '92px',
                                                width: '92px',
                                                border: '3px solid #2196f3'
                                            }}
                                        />
                                    </div>

                                    <div>
                                        <h1 className="font-company-page" style={{ lineHeight: 'normal' }}>
                                            {row?.name}
                                        </h1>
                                        <Tooltip placement="bottom" sx={{ cursor: 'pointer' }} title={row?.location}>
                                            <h3 sx={{ color: ' #CDCDCD' }} className="location-style" style={{ lineHeight: 'normal' }}>
                                                {row?.location.slice(0, 16)}
                                            </h3>
                                        </Tooltip>
                                    </div>
                                </div>
                            </Grid>
                            <Grid item xs={10} md={4} sx={{ background: ' ', ml: 1, pl: 4, mt: 2 }}>
                                <Grid container sx={{ display: 'flex', justifyContent: 'space-evenly' }}>
                                    <Grid item xs={2} className={styles.statsCover}>
                                        <div className={styles.stats}>{itemsNb}</div>
                                        {itemsNb === 1 ? <div>Item</div> : <div>Items</div>}
                                    </Grid>
                                    {/*   <Grid item xs={3} className={styles.statsCover}>
                                    <div>
                                        <div className={styles.stats}>876k</div>
                                        <div>Followers</div>
                                    </div>
                                </Grid> */}
                                    <Grid item xs={2} className={styles.statsCover} title="Coming Soon">
                                        <div className={styles.stats}>32k</div>
                                        <div>Likes</div>
                                    </Grid>
                                    <Grid item xs={2} title="Coming Soon">
                                        <div className={styles.stats}>420</div>
                                        <div>Bidding</div>
                                    </Grid>
                                    <Grid item xs={2} title="Coming Soon">
                                        <div className={styles.stats}>870k</div>
                                        <div>Followers</div>
                                    </Grid>
                                </Grid>
                            </Grid>

                            <Grid item xs={12} md={3} sx={{ marginLeft: '15%', mt: 2 }}>
                                <Grid container style={{ display: 'flex', justifyContent: 'flex-end', marginRight: '7%', float: 'right' }}>
                                    {brandSocials?.instagram ? (
                                        <Grid item sx={{ marginLeft: '0.5rem' }}>
                                            <a
                                                href={brandSocials?.instagram}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                style={{ color: blueColor }}
                                            >
                                                <InstagramIcon />
                                            </a>
                                        </Grid>
                                    ) : null}
                                    {brandSocials?.twitter ? (
                                        <Grid item sx={{ marginLeft: '0.5rem' }}>
                                            <a
                                                href={brandSocials?.twitter}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                style={{ color: blueColor }}
                                            >
                                                <TwitterIcon />
                                            </a>
                                        </Grid>
                                    ) : null}
                                    {brandSocials?.facebook ? (
                                        <Grid item sx={{ marginLeft: '0.5rem' }}>
                                            <a
                                                href={brandSocials?.facebook}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                style={{ color: blueColor }}
                                            >
                                                <FacebookIcon />
                                            </a>
                                        </Grid>
                                    ) : null}
                                    {brandSocials?.linkedin ? (
                                        <Grid item sx={{ marginLeft: '0.5rem' }}>
                                            <a
                                                href={brandSocials?.linkedin}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                style={{ color: blueColor }}
                                            >
                                                <LinkedInIcon />
                                            </a>
                                        </Grid>
                                    ) : null}
                                    {brandSocials?.discord ? (
                                        <Grid item sx={{ marginLeft: '0.5rem' }}>
                                            <a
                                                href={brandSocials?.discord}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                style={{ color: blueColor }}
                                            >
                                                <IconBrandDiscord />
                                            </a>
                                        </Grid>
                                    ) : null}
                                    {brandSocials?.medium ? (
                                        <Grid item sx={{ marginLeft: '0.5rem' }}>
                                            <a
                                                href={brandSocials?.medium}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                style={{ color: blueColor }}
                                            >
                                                <IconBrandMedium />
                                            </a>
                                        </Grid>
                                    ) : null}
                                    {brandSocials?.telegram ? (
                                        <Grid item sx={{ marginLeft: '0.5rem' }}>
                                            <a
                                                href={brandSocials?.telegram}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                style={{ color: blueColor }}
                                            >
                                                <TelegramIcon />
                                            </a>
                                        </Grid>
                                    ) : null}
                                    {brandSocials?.email ? (
                                        <Grid item sx={{ marginLeft: '0.5rem' }}>
                                            <a
                                                href={brandSocials?.email}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                style={{ color: blueColor }}
                                            >
                                                <EmailIcon />
                                            </a>
                                        </Grid>
                                    ) : null}
                                    {brandSocials?.website ? (
                                        <Grid item sx={{ marginLeft: '0.5rem' }}>
                                            <a
                                                href={brandSocials?.website}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                style={{ color: blueColor }}
                                            >
                                                <LanguageIcon />
                                            </a>
                                        </Grid>
                                    ) : null}

                                    {brandSocials?.phoneNumber ? (
                                        <Grid item sx={{ marginLeft: '0.5rem' }}>
                                            <a
                                                href={brandSocials?.phoneNumber}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                style={{ color: blueColor }}
                                            >
                                                <LocalPhoneIcon />
                                            </a>
                                        </Grid>
                                    ) : null}
                                    <div style={{ borderLeft: '1px solid #7E7D7D', marginLeft: '0.5rem' }}></div>
                                    <Tooltip placement="top" title="Coming Soon">
                                        <Grid item sx={{ marginLeft: '0.5rem' }}>
                                            <StarSharpIcon style={{ color: blueColor }} />
                                        </Grid>
                                    </Tooltip>
                                    <Tooltip placement="top" title="Coming Soon">
                                        <Grid item sx={{ marginLeft: '0.5rem' }}>
                                            <ChatBubbleOutlineSharpIcon style={{ color: blueColor }} />
                                        </Grid>
                                    </Tooltip>
                                    <Tooltip placement="top" title="Coming Soon">
                                        <Grid item sx={{ marginLeft: '0.5rem' }}>
                                            <ShareSharpIcon style={{ color: blueColor }} />
                                        </Grid>
                                    </Tooltip>
                                </Grid>
                                <Grid item xs={8} md={12} style={{ justifyContent: '' }}>
                                    <Tooltip placement="top" title="Coming Soon">
                                        <Button variant="contained" sx={{ mt: 2, width: '50%', float: 'right', mr: 2 }}>
                                            Follow
                                        </Button>
                                    </Tooltip>
                                </Grid>
                            </Grid>

                            <Grid container-fluid sx={{ paddingRight: '7%', paddingLeft: '2%' }}>
                                <Tooltip placement="top">
                                    <p className="des-font">{row?.description}</p>
                                </Tooltip>
                            </Grid>
                        </Grid>
                        <Grid container sx={{ paddingLeft: '2%', width: '100%' }}>
                            <h1>Items</h1>

                            <Grid
                                container
                                sx={{
                                    justifyContent: {
                                        xs: 'center',
                                        sm: 'center',
                                        md: 'left',
                                        lg: 'left',
                                        xl: 'left'
                                    }
                                }}
                                spacing={2}
                            >
                                {row.Nfts?.map((item) => (
                                    <BmwCard item={item} />
                                ))}
                            </Grid>

                            <Grid item md={12} xs={12}></Grid>
                        </Grid>
                    </Grid>
                ))}
            </Grid>

            <Grid
                container-fluid
                sx={{
                    display: {
                        xs: 'block',
                        sm: 'block',
                        md: 'flex'
                    },
                    background: theme.palette.mode === 'dark' ? 'black' : '#f3f3f3'
                }}
            >
                <Grid item md={1} xs={12}></Grid>
            </Grid>
        </Grid>
    );
};

export default CompanyPage;
