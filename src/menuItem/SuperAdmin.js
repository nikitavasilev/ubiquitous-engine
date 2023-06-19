// third-party
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { FormattedMessage } from 'react-intl';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PaymentsIcon from '@mui/icons-material/Payments';
// assets
import {
    IconDashboard,
    IconCheckbox,
    IconDeviceAnalytics,
    IconCash,
    IconUserCheck,
    IconBell,
    IconReceipt2,
    IconClipboardList,
    IconLayout2,
    IconBuildingStore,
    IconCurrencyEthereum
} from '@tabler/icons';
// constant
const icons = {
    IconDashboard,
    IconDeviceAnalytics,
    IconUserCheck,
    IconReceipt2,
    IconClipboardList,
    IconBell,
    IconCheckbox,
    IconCash,
    IconLayout2,
    IconBuildingStore,
    IconCurrencyEthereum,
    DashboardIcon,
    AccountCircleIcon,
    PaymentsIcon
};

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const superAdminMenu = {
    id: 'Super Admin',
    // title: <FormattedMessage id="dashboard" />,
    type: 'group',
    children: [
        {
            id: 'dashboard',
            title: <FormattedMessage id="admin.dashboard" />,
            type: 'item',
            url: '/dashboard',
            icon: icons.DashboardIcon,

            breadcrumbs: false
        },

        {
            id: 'admin',
            title: <FormattedMessage id="admin.adminManagement" />,
            type: 'item',
            url: '/subAdminManagement',
            icon: icons.AccountCircleIcon,
            breadcrumbs: false
        },
        {
            id: 'categories',
            title: <FormattedMessage id="categories" />,
            type: 'item',
            icon: icons.IconCheckbox,
            url: '/categories',
            breadcrumbs: false
        },

        {
            id: 'brand',
            title: <FormattedMessage id="admin.BrandManagement" />,
            type: 'item',
            icon: icons.IconBuildingStore,
            url: '/brands',
            breadcrumbs: false
        },
        {
            id: 'configurations',
            title: 'Configurations',
            type: 'item',
            icon: icons.PaymentsIcon,
            url: 'fees',
            breadcrumbs: false
        },
        {
            id: 'sbtToken',
            title: 'SbtToken',
            type: 'item',
            icon: icons.IconBuildingStore,
            url: '/sbtToken',
            breadcrumbs: false
        },
    ]
};

export default superAdminMenu;
