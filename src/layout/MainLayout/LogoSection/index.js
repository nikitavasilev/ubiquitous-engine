import { Link } from 'react-router-dom';

// material-ui
import { ButtonBase } from '@mui/material';

// project imports
import config from 'config';
// import Logo from 'ui-component/Logo';
import galileo from 'assets/images/galileo.png';
import galileoWhite from 'assets/images/galileo-white.png';
import { useTheme } from '@mui/material/styles';

// ==============================|| MAIN LOGO ||============================== //

const LogoSection = () =>
{

    const theme = useTheme();
    return (
        <ButtonBase disableRipple component={Link} to={config.defaultPath}>
        {/* <p style={{fontSize:'20px', fontWeight:"bolder"}}>Galileo </p> */}
            {/* <Logo   sx={{ width:" 53px"}}  /> */}
    
            {theme.palette.mode === 'dark' ? (
                                <img src={galileoWhite} alt="Galileo White Logo" width="100" />
                            ) : (
                                <img src={galileo} alt="Galileo Dark Logo" width="100" />
                            )}
            {/* <img style={{width: '100px' }} src={galileo} alt="Galileo Logo" /> */}
            
        </ButtonBase>
    );

}


export default LogoSection;
