import React, { lazy } from 'react';
// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import AdminGuard from './RouteGuard/AdminGuard';
// const Starting = Loadable(lazy(() => import('views/pages/local/startingPage')));

const BrandAdminDashboard = Loadable(lazy(() => import('views/pages/brandAdmin/dashboard')));
const Starting = Loadable(lazy(() => import('views/pages/brandAdmin/dashboard')));
const ChangePassword = Loadable(lazy(() => import('shared/changePassword/component/ChangePassword')));
const Category = Loadable(lazy(() => import('views/pages/brandAdmin/brandCategory')));
const DeliveryDashboard = Loadable(lazy(() => import('views/pages/brandAdmin/deliveryDashboard')));
const NftManagement = Loadable(lazy(() => import('views/pages/brandAdmin/nftManagement')));


const BrandAdminRoutes = {
    path: '/',
    element: (
        <AdminGuard>
            <MainLayout />
        </AdminGuard>
    ),
    children: [
        {
            path: '/',
            element: <Starting />
        },
        {
            path: '/dashboard',
            element: <BrandAdminDashboard />
        },
        {
            path: '/ChangePassword',
            element: <ChangePassword />
        },
        {
            path: '/categories',
            element: <Category />
        },
        {
            path: '/deliveryDashboard',
            element: <DeliveryDashboard />
        },
        {
            path: '/nftManagement',
            element: <NftManagement />
        }
    ]
};

export default BrandAdminRoutes;
