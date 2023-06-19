import { lazy } from 'react';
import MinimalLayout from 'layout/MinimalLayout';
import NavMotion from 'layout/NavMotion';
import Loadable from 'ui-component/Loadable';
// login routing
const AuthLogin = Loadable(lazy(() => import('views/auth/login')));
const VerifyEmail = Loadable(lazy(() => import('views/auth/verifyEmail')));
const VerifyEmailBefore = Loadable(lazy(() => import('views/auth/emailVerifyBefore')));
const AuthForgot = Loadable(lazy(() => import('views/auth/forgetPassword')));
const AuthRsetPassword = Loadable(lazy(() => import('views/auth/resetPassword')));
const SignUpMarketPlace = Loadable(lazy(() => import('views/auth/signUp')));
const SocialLogin = Loadable(lazy(() => import('views/auth/socialLogin')));
const ChangePassword = Loadable(lazy(() => import('shared/changePassword/component/ChangePassword')));
// const Starting = Loadable(lazy(() => import('views/pages/local/startingPage')));
const Starting = Loadable(lazy(() => import('views/pages/user/landingPage')));
// const TrackNft = Loadable(lazy(() => import('views/pages/TrackNFT/TrackNFT')));
// const Tracking = Loadable(lazy(()=> import('views/pages/trackingTool')));
// ==============================|| AUTH ROUTING ||============================== //

const LoginRoutes = {
    path: '/',
    element: (
        <NavMotion>
            <MinimalLayout />
        </NavMotion>
    ),
    children: [
        {
            path: '/login',
            element: <AuthLogin />
        },
        {
            path: '/emailVerify',
            element: <VerifyEmailBefore />
        },
        {
            path: '/Verify',
            element: <VerifyEmail />
        },
        {
            path: '/Verify',
            element: <VerifyEmailBefore />
        },
        {
            path: '/',
            element: <Starting />
        },
        {
            path: '/forgetPassword',
            element: <AuthForgot />
        },
        {
            path: '/resetPassword',
            element: <AuthRsetPassword />
        },

        {
            path: '/signUp',
            element: <SignUpMarketPlace />
        },
        {
            path: '/ChangePassword',
            element: <ChangePassword />
        },
        {
            path: '/socialLogin',
            element: <SocialLogin />
        },
        // {
        //     path: '/tracknft',
        //     element: <TrackNft/>
        // },
        // {
        //     path: '/tracking',
        //     element: <Tracking />
        // }
    ]
};

export default LoginRoutes;
