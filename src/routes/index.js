import { useRoutes } from 'react-router-dom';
import { useSelector } from 'react-redux';
// routes
import SuperAdminRoutes from './SuperAdminRoutes';
import SubAdminRoutes from './SubAdminRoutes';
import BrandAdminRoutes from './BrandAdminRoutes';
import UserRoutes from './UserRoutes';
import LoginRoutes from './LoginRoutes';
import TrackingRoutes from './TrackingRoute';

export default function ThemeRoutes() {
    const userData = useSelector((state) => state.auth);

    if (userData.user && userData.user.role == 'Super Admin') {
        return useRoutes([SuperAdminRoutes, UserRoutes, TrackingRoutes]);
    } else if (userData.user && userData.user.role == 'Sub Admin') {
        return useRoutes([SubAdminRoutes, UserRoutes, TrackingRoutes]);
    } else if (userData.user && userData.user.role == 'Brand Admin') {
        return useRoutes([BrandAdminRoutes, UserRoutes, TrackingRoutes]);
    } else if (userData.user && userData.user.role == 'User') {
        return useRoutes([UserRoutes, LoginRoutes, TrackingRoutes]);
    } else {
        return useRoutes([UserRoutes, LoginRoutes, TrackingRoutes]);
    }
}
