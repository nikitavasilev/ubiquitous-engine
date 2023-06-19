import React, { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import AdminGuard from './RouteGuard/AdminGuard';
// const Starting = Loadable(lazy(() => import('views/pages/local/startingPage')));

const SubAdminDashboard = Loadable(lazy(() => import('views/pages/subAdmin/dashboard')));

const Starting = Loadable(lazy(() => import('views/pages/subAdmin/dashboard')));
const ChangePassword = Loadable(lazy(() => import('shared/changePassword/component/ChangePassword')));
const Brand = Loadable(lazy(() => import('views/pages/superAdmin/brands')));
const BrandAdmin = Loadable(lazy(() => import('views/pages/superAdmin/brands/brandAdmin')));
const BrandCategory = Loadable(lazy(() => import('views/pages/subAdmin/brands/brandCategory')));
const Category = Loadable(lazy(() => import('views/pages/superAdmin/categories')));
const NftManagement = Loadable(lazy(() => import('views/pages/superAdmin/nftManagement')));
const BrandsByAdmin = Loadable(lazy(() => import('views/pages/subAdmin/brands')));

// ==============================|| MAIN ROUTING ||============================== //

const SubAdminRoutes = {
    id: 'Admin',
    path: '/',
    element: (
        <AdminGuard>
            <MainLayout />
        </AdminGuard>
    ),
    type: 'group',
    children: [
        {
            path: '/',
            element: <Starting />
        },
        {
            path: '/dashboard',
            element: <SubAdminDashboard />
        },
        {
            path: '/ChangePassword',
            element: <ChangePassword />
        },

        {
            path: '/brands',
            element: <Brand />
        },
        {
            path: '/brandsByAdmin',
            element: <BrandsByAdmin />
        },
        {
            path: '/brands/admin',
            element: <BrandAdmin />
        },
        {
            path: '/brandsByAdmin/category',
            element: <BrandCategory />
        },
        {
            path: '/categories',
            element: <Category />
        },

        {
            path: '/nftManagement',
            element: <NftManagement />
        }
    ]
};

export default SubAdminRoutes;
