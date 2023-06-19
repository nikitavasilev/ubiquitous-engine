import ReactDOM from 'react-dom';
import React from 'react';

// third party
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
// import { ConnectedRouter } from 'connected-react-router';




// project imports
// import * as serviceWorker from 'serviceWorker';
import App from 'App';
import { store, persistor } from 'store';

// style + assets
import 'assets/scss/style.scss';
import config from 'config';
import { GoogleOAuthProvider } from '@react-oauth/google';

// ==============================|| REACT DOM RENDER  ||============================== //

ReactDOM.render(
    <GoogleOAuthProvider clientId="854386915479-1i90od38i6r963g6ai3mghf5g7k2crrs.apps.googleusercontent.com">

 
    <Provider store={store}>
        {/* <ConnectedRouter history={history}> */}
        <PersistGate loading={null} persistor={persistor}>
            <BrowserRouter basename={config.basename}>
                <App />
            </BrowserRouter>
        </PersistGate>
        {/* </ConnectedRouter> */}
    </Provider>
    </GoogleOAuthProvider>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
