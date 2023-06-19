import PropTypes from 'prop-types';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Box } from '@mui/material';

// assets
import AuthPattern from 'assets/images/auth-pattern.png';
import AuthPatternDark from 'assets/images/auth-pattern.png';

// ===========================|| BACKGROUND GRID PATTERN 1 ||=========================== //

const BackgroundPattern1 = ({ children }) => {
    const theme = useTheme();
    return (
        <Box
            component="span"
            sx={{
                display: 'flex',
                minHeight: '97%',
                bgcolor: theme.palette.mode === 'dark' ? '#fff': '#fff',
                backgroundImage: theme.palette.mode === 'dark' ? `url(${AuthPatternDark})` : `url(${AuthPattern})`,
               
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                overflow: 'hidden',
               margin:'10px',
              
                opacity: theme.palette.mode === 'dark' ? 0.85 : 0.9
            }}
        >
            {children}
        </Box>
    );
};

BackgroundPattern1.propTypes = {
    children: PropTypes.node
};

export default BackgroundPattern1;
