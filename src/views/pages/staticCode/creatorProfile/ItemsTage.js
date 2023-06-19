import PropTypes from 'prop-types';
import { useState } from 'react';
import { Link } from 'react-router-dom';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Box, Divider, Grid, Tab, Tabs, Typography } from '@mui/material';

// assets
import Items from './Items';

// tab content
function TabPanel({ children, value, index, ...other }) {
    return (
        <Grid role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
            {value === index && (
                <Box
                    sx={{
                        p: 1,
                        pr: 2
                    }}
                >
                    <Typography>{children}</Typography>
                </Box>
            )}
        </Grid>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`
    };
}

export default function HorizontalTabs() {
    const theme = useTheme();
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <>
            <Tabs
                value={value}
                variant="scrollable"
                onChange={handleChange}
                sx={{
                    mb: 1,
                    ml: 1,
                    '& a': {
                        minHeight: '1rem',
                        minWidth: 10,
                        py: 1.5,
                        px: 0,
                        mr: 3.7,
                        color: theme.palette.grey[600],
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: '0.3%'
                    },
                    '& a.Mui-selected': {
                        color: theme.palette.primary.main
                    }
                }}
            >
                <Tab component={Link} to="#" label="Items" {...a11yProps(0)} />
               {/*  <Tab component={Link} to="#" label="Activity" {...a11yProps(1)} /> */}
            </Tabs>

            <TabPanel value={value} index={0}>
                <Items />
            </TabPanel>
           {/*  <TabPanel value={value} index={1}>
                Activity
            </TabPanel> */}
        </>
    );
}
