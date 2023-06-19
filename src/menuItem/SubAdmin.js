// third-party
import { FormattedMessage } from 'react-intl';

// assets
import { IconDashboard, IconDeviceAnalytics, IconCheckbox, IconUser, IconUserCheck, IconReceipt2, IconClipboardList } from '@tabler/icons';
import React from 'react';

// constant
const icons = {
  IconCheckbox,
  IconDashboard,
  IconDeviceAnalytics,
  IconUserCheck,
  IconUser,
  IconReceipt2,
  IconClipboardList,
};

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const subAdminMenu = {
  id: 'Sub Admin',
  type: 'group',
  children: [
    {
      id: 'dashboard',
      title: <FormattedMessage id="admin.dashboard" />,
      type: 'item',
      url: '/dashboard',
      icon: icons.IconDashboard,
      breadcrumbs: false,
    },

    // {
    //     id: 'categories',
    //     title: <FormattedMessage id="categories" />,
    //     type: 'item',
    //     icon: icons.IconCheckbox,
    //     url: '/categories',
    //     breadcrumbs: false
    // },

    {
      id: 'brand',
      title: <FormattedMessage id="admin.BrandManagement" />,
      type: 'item',
      icon: icons.IconCheckbox,
      url: '/brandsByAdmin',
      breadcrumbs: false,
    },
  ],
};

export default subAdminMenu;
