import { useSelector } from 'react-redux';
import React from 'react';

import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, StyledEngineProvider } from '@mui/material';

// routing
import Routes from 'routes';

// defaultTheme
import themes from 'themes';

// project imports
import Locales from 'ui-component/Locales';
import NavigationScroll from 'layout/NavigationScroll';
// import RTLLayout from 'ui-component/RTLLayout';
import Snackbar from 'ui-component/extended/Snackbar';
// import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// ==============================|| APP ||============================== //

const App = () => {
  const customization = useSelector((state) => state.customization);
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={themes(customization)}>
        <CssBaseline />
        {/* RTL layout */}
        {/* <RTLLayout> */}
        <ToastContainer autoClose={8000} />
        <Locales>
          <NavigationScroll>
            <>
              <Routes />
              <Snackbar />
            </>
          </NavigationScroll>
        </Locales>
        {/* </RTLLayout> */}
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default App;
