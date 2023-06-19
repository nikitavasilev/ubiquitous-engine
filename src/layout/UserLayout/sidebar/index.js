import { Container, Grid, Box } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PieChartIcon from '@mui/icons-material/PieChart';
import StorefrontIcon from '@mui/icons-material/Storefront';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import DownloadIcon from '@mui/icons-material/Download';
import DiscountIcon from '@mui/icons-material/Discount';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import { Icons } from 'shared/Icons/Icons';
import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { useDispatch, useSelector } from 'react-redux';
import { MENU_TYPE } from 'store/actions';
import Tooltip from '@mui/material/Tooltip';

const SideBar = () => {
    const navigate = useNavigate();
    const [color] = useState('#2196f3');
    const [pathName, setPathName] = useState('');
    // console.log('***************************', Icons);
    const location = useLocation();
    useEffect(() => {
        setPathName(location.pathname);
    });

    const theme = useTheme();

    const dispatch = useDispatch();
    const customization = useSelector((state) => state.customization);

    const [navType, setNavType] = useState(customization.navType);

    useEffect(() => {
        dispatch({ type: MENU_TYPE, navType });
    }, [dispatch, navType]);
    return (
        <>
            <Grid
                className="sidebar"
                xs={12}
                sm={10}
                md={9}
                lg={9}
                xl={7.5}
                container
                alignItems="center"
                // spacing={2}
                sx={{
                    // pt: 1,
                    // pb: 3,
                    ml: 2,
                    mr: 2,
                    boxShadow: '0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)',
                    // maxWidth: { lg: '90% !important' },
                    display: 'block',
                    backgroundColor: `${theme.palette.mode === 'dark' ? '#181C1F' : '#ffffff'}`,
                    // background: theme.palette.mode === 'dark' ? '#181C1F' : '#fff',
                    borderRadius: '4px'
                }}
            >
                <Grid
                    item
                    sx={{
                        mt: 3,
                        paddingLeft: '0 ! important',
                        textAlign: 'center',
                        cursor: 'pointer'
                    }}
                    onClick={() => navigate('/home')}
                >
                    <Box
                        className="sideLine Gap"
                        sx={{
                            display: 'flex',
                            gap: { xl: '31px', md: '21px', lg: '29px', xl: '31px' }
                        }}
                    >
                        <Box
                            className="barHeight"
                            sx={{
                                height: { xl: '62px', md: '40px' },
                                width: { xl: '12px', md: '9px' },
                                padding: '3px',
                                background:
                                    pathName == '/home' ? 'linear-gradient(138.3deg, #2F53FF -0.85%, #2FC1FF 131.63%)' : 'transparent',
                                borderRadius: '0px 5px 5px 0px'
                            }}
                        ></Box>
                        <Tooltip className="fontsize" title="Home" placement="right" arrow>
                            <span
                                className={`${pathName == '/home' ? 'selected-icon' : ''}`}
                                style={{
                                    color: `${pathName == '/home' ? color : ''}`,
                                    alignSelf: 'center'
                                }}
                            >
                                {Icons.home}
                            </span>
                        </Tooltip>
                    </Box>
                </Grid>
                <Grid
                    item
                    sx={{
                        mt: 1,
                        paddingLeft: '0 ! important',
                        textAlign: 'center',
                        cursor: 'pointer'
                    }}
                    onClick={() => navigate('/chart')}
                >
                    <Box
                        className="sideLine Gap"
                        sx={{
                            display: 'flex',
                            gap: { xl: '31px', md: '21px', lg: '29px', xl: '31px' }
                        }}
                    >
                        <Box
                            className="barHeight"
                            sx={{
                                height: { xl: '62px', md: '40px' },
                                width: { xl: '12px', md: '9px' },
                                padding: '3px',
                                background:
                                    pathName == '/chart' ? 'linear-gradient(138.3deg, #2F53FF -0.85%, #2FC1FF 131.63%)' : 'transparent',
                                borderRadius: '0px 5px 5px 0px'
                            }}
                        ></Box>
                        <Tooltip className="fontsize" title="Coming Soon" placement="right" arrow>
                            <span
                                className={`${pathName == '/chart' ? 'selected-icon' : ''}`}
                                style={{
                                    color: `${pathName == '/chart' ? color : ''}`,
                                    alignSelf: 'center'
                                }}
                            >
                                {Icons.pieChart}
                            </span>
                        </Tooltip>
                    </Box>
                </Grid>

                <Grid
                    item
                    sx={{
                        mt: 1,
                        paddingLeft: '0 ! important',
                        textAlign: 'center',
                        cursor: 'pointer'
                    }}
                    onClick={() => {
                        navigate('/marketplace');
                    }}
                >
                    <Box
                        className="sideLine Gap"
                        sx={{
                            display: 'flex',
                            gap: { md: '21px', lg: '29px', xl: '31px' }
                        }}
                    >
                        <Box
                            className="barHeight"
                            sx={{
                                height: { xl: '62px', md: '40px' },
                                width: { xl: '12px', md: '9px' },
                                padding: '3px',
                                background: pathName.includes('marketplace')
                                    ? 'linear-gradient(138.3deg, #2F53FF -0.85%, #2FC1FF 131.63%)'
                                    : 'transparent',
                                borderRadius: '0px 5px 5px 0px'
                            }}
                        ></Box>
                        <Tooltip className="fontsize" title="Marketplace" placement="right" arrow>
                            <span
                                className={`${pathName == '/marketplace' ? 'selected-icon' : ''}`}
                                style={{
                                    color: `${pathName == '/marketplace' ? color : ''}`,
                                    alignSelf: 'center'
                                }}
                            >
                                {Icons.marketPlace}
                            </span>
                        </Tooltip>
                    </Box>
                </Grid>
                <Grid
                    item
                    sx={{ mt: 1, paddingLeft: '0 ! important', textAlign: 'center', cursor: 'pointer' }}
                    onClick={() => navigate('/bookmarks')}
                >
                    <Box className="sideLine Gap" sx={{ display: 'flex', gap: { xl: '31px', md: '21px', lg: '29px', xl: '31px' } }}>
                        <Box
                            className="barHeight"
                            sx={{
                                height: { xl: '62px', md: '40px' },
                                width: { xl: '12px', md: '9px' },
                                padding: '3px',
                                background:
                                    pathName == '/bookmarks' ? 'linear-gradient(138.3deg, #2F53FF -0.85%, #2FC1FF 131.63%)' : 'transparent',
                                borderRadius: '0px 5px 5px 0px'
                            }}
                        ></Box>
                        <Tooltip className="fontsize" title="Coming Soon" placement="right" arrow>
                            <span style={{ color: `${pathName == '/bookmarks' ? color : ''}`, alignSelf: 'center' }}>{Icons.bookMark}</span>
                        </Tooltip>
                    </Box>
                </Grid>
                <Grid
                    item
                    sx={{ mt: 1, paddingLeft: '0 ! important', textAlign: 'center', cursor: 'pointer' }}
                    onClick={() => navigate('/Nfts')}
                >
                    <Box className="sideLine Gap" sx={{ display: 'flex', gap: { xl: '31px', md: '21px', lg: '29px', xl: '31px' } }}>
                        <Box
                            className="barHeight"
                            sx={{
                                height: { xl: '62px', md: '40px' },
                                width: { xl: '12px', md: '9px' },
                                padding: '3px',
                                background:
                                    pathName == '/Nfts' ? 'linear-gradient(138.3deg, #2F53FF -0.85%, #2FC1FF 131.63%)' : 'transparent',
                                borderRadius: '0px 5px 5px 0px'
                            }}
                        ></Box>
                        <Tooltip className="fontsize" title="Coming Soon" placement="right" arrow>
                            <span style={{ color: `${pathName == '/Nfts' ? color : ''}`, alignSelf: 'center' }}>{Icons.nft}</span>
                        </Tooltip>
                    </Box>
                </Grid>
                <Grid
                    item
                    sx={{
                        mt: 1,
                        paddingLeft: '0 ! important',
                        textAlign: 'center',
                        cursor: 'pointer'
                    }}
                    onClick={() => navigate('/downloads')}
                >
                    <Box
                        className="sideLine Gap"
                        sx={{
                            display: 'flex',
                            gap: { xl: '31px', md: '21px', lg: '29px', xl: '31px' }
                        }}
                    >
                        <Box
                            className="barHeight"
                            sx={{
                                height: { xl: '62px', md: '40px' },
                                width: { xl: '12px', md: '9px' },
                                padding: '3px',
                                background:
                                    pathName == '/downloads' ? 'linear-gradient(138.3deg, #2F53FF -0.85%, #2FC1FF 131.63%)' : 'transparent',
                                borderRadius: '0px 5px 5px 0px'
                            }}
                        ></Box>
                        <Tooltip className="fontsize" title="Coming Soon" placement="right" arrow>
                            <span
                                className={`${pathName == '/downloads' ? 'selected-icon' : ''}`}
                                style={{
                                    color: `${pathName == '/downloads' ? color : ''}`,
                                    alignSelf: 'center'
                                }}
                            >
                                {Icons.download}
                            </span>
                        </Tooltip>
                    </Box>
                </Grid>
                <Grid
                    item
                    sx={{
                        mt: 1,
                        paddingLeft: '0 ! important',
                        textAlign: 'center',
                        cursor: 'pointer'
                    }}
                    onClick={() => navigate('/tags')}
                >
                    <Box
                        className="sideLine Gap"
                        sx={{
                            display: 'flex',
                            gap: { xl: '31px', md: '21px', lg: '29px', xl: '31px' }
                        }}
                    >
                        <Box
                            className="barHeight"
                            sx={{
                                height: { xl: '62px', md: '40px' },
                                width: { xl: '12px', md: '9px' },
                                padding: '3px',
                                background:
                                    pathName == '/tags' ? 'linear-gradient(138.3deg, #2F53FF -0.85%, #2FC1FF 131.63%)' : 'transparent',
                                borderRadius: '0px 5px 5px 0px'
                            }}
                        ></Box>
                        <Tooltip className="fontsize" title="Coming Soon" placement="right" arrow>
                            <span
                                className={`${pathName == '/tags' ? 'selected-icon' : ''}`}
                                style={{
                                    color: `${pathName == '/tags' ? color : ''}`,
                                    alignSelf: 'center'
                                }}
                            >
                                {Icons.label}
                            </span>
                        </Tooltip>
                    </Box>
                </Grid>
                <Grid
                    item
                    sx={{
                        mt: 1,
                        paddingLeft: '0 ! important',
                        textAlign: 'center',
                        cursor: 'pointer'
                    }}
                    onClick={() => navigate('/settings')}
                >
                    <Box
                        className="sideLine Gap"
                        sx={{
                            display: 'flex',
                            gap: { xl: '31px', md: '21px', lg: '29px', xl: '31px' }
                        }}
                    >
                        <Box
                            className="barHeight"
                            sx={{
                                height: { xl: '62px', md: '40px' },
                                width: { xl: '12px', md: '9px' },
                                padding: '3px',
                                background:
                                    pathName == '/settings' ? 'linear-gradient(138.3deg, #2F53FF -0.85%, #2FC1FF 131.63%)' : 'transparent',
                                borderRadius: '0px 5px 5px 0px'
                            }}
                        ></Box>
                        <Tooltip className="fontsize" title="Coming Soon" placement="right" arrow>
                            <span
                                className={`${pathName == '/settings' ? 'selected-icon' : ''}`}
                                style={{
                                    color: `${pathName == '/settings' ? color : ''}`,
                                    alignSelf: 'center'
                                }}
                            >
                                {Icons.settings}
                            </span>
                        </Tooltip>
                    </Box>
                </Grid>
                <Grid
                    item
                    sx={{
                        mt: 2,
                        paddingLeft: '0 ! important',
                        textAlign: 'center',
                        cursor: 'pointer'
                    }}
                    onClick={() => navigate('/tracknft')}
                >
                    <Box
                        className="sideLine Gap"
                        sx={{
                            display: 'flex',
                            gap: { xl: '31px', md: '21px', lg: '29px', xl: '31px' }
                        }}
                    >
                        <Box
                            className="barHeight"
                            sx={{
                                height: { xl: '62px', md: '40px' },
                                width: { xl: '12px', md: '9px' },
                                padding: '3px',
                                background:
                                    pathName == '/tracknft' ? 'linear-gradient(138.3deg, #2F53FF -0.85%, #2FC1FF 131.63%)' : 'transparent',
                                borderRadius: '0px 5px 5px 0px'
                            }}
                        ></Box>
                        <Tooltip className="fontsize" title="Track NFT" placement="right" arrow>
                            <span
                                className={`${pathName == '/tracknft' ? 'selected-icon' : ''}`}
                                sx={{
                                    color: `${pathName == '/tracknft' ? color : ''}`,
                                    alignSelf: 'center'
                                }}
                            >
                                {Icons.trackNft}
                            </span>
                        </Tooltip>
                    </Box>
                </Grid>
                <Grid
                    item
                    sx={{
                        paddingLeft: '0 ! important',
                        textAlign: 'center',
                        cursor: 'pointer'
                    }}
                    onClick={() => navigate('/ComingSoon')}
                >
                    <Box
                        className="sideLine Gap"
                        sx={{
                            display: 'flex',
                            gap: { xl: '31px', md: '21px', lg: '29px', xl: '31px' }
                        }}
                    >
                        <Box
                            className="barHeight"
                            sx={{
                                height: { xl: '62px', md: '40px' },
                                width: { xl: '12px', md: '9px' },
                                padding: '3px',
                                background: 'transparent',
                                borderRadius: '0px 5px 5px 0px'
                            }}
                        ></Box>
                        <Tooltip className="fontsize" title="Coming Soon" placement="right" arrow>
                            <span
                                className={`${pathName == '/ComingSoon' ? 'selected-icon' : ''}`}
                                style={{
                                    color: `${pathName == '/ComingSoon' ? color : ''}`,
                                    alignSelf: 'center'
                                }}
                            >
                                {Icons.logout}
                            </span>
                        </Tooltip>
                    </Box>
                </Grid>
                <Grid
                    item
                    sx={{
                        mt: 8,
                        mb: 2,
                        paddingLeft: '0 ! important',
                        textAlign: 'center'
                    }}
                >
                    {customization.navType == 'dark' ? (
                        <>
                            <Tooltip className="fontsize" title="light" placement="right" arrow>
                                <DarkModeIcon
                                    style={{
                                        color: `${color}`,
                                        cursor: 'pointer',
                                        fontSize: { xl: '40px' }
                                    }}
                                    onClick={() => setNavType('light')}
                                />
                            </Tooltip>
                        </>
                    ) : (
                        <>
                            {' '}
                            <Tooltip className="fontsize" title="Dark" placement="right" arrow>
                                <WbSunnyIcon style={{ color: `${color}`, cursor: 'pointer' }} onClick={() => setNavType('dark')} />
                            </Tooltip>{' '}
                        </>
                    )}
                </Grid>
            </Grid>
        </>
    );
};

export default SideBar;
