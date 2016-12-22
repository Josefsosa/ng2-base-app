/**
 * @module PDL
 */
 /** */

 /**
  * PDL event constants.
  */
export const PDL_EVENT_CONSTANT: any = {
  'DEFAULT_KEY': 'DEFAULT'
};

/**
 * PDL event constant mapping.
 */
export const PDL_EVENT_CONSTANT_MAP: any = {
  'DEFAULT': {
    'EVENT_ACTION': '',
    'EVENT_TYPE': '',
    'EVENT_CATEGORY': '',
    'EVENT_ANALYTICS': []
  },
  'API_ERROR': {
    'EVENT_ACTION': 'error',
    'EVENT_TYPE': 'system',
    'EVENT_CATEGORY': 'error',
    'EVENT_ANALYTICS': ['eventInfo', 'category', 'attributes']
  }
};

/**
 * PDL site map structure.
 */
export const SITE_MAP: any = {
  'PAGE': {
    'login': {
      'stateName': 'login',
      'pageTitle': 'Reff App Login',
      'siteSection': 'account',
      'siteSubSection': 'login',
      'pageName': 'login'
    },
    'customer.landing': {
      'stateName': 'customer.landing',
      'pageTitle': 'Customer Dashboard',
      'siteSection': 'Customer',
      'siteSubSection': 'Dashboard',
      'pageName': 'Customer Dashboard'
    },
    'accessory.list': {
      'stateName': 'accessory.list',
      'pageTitle': 'Accessory List Page',
      'siteSection': 'Shop',
      'siteSubSection': 'Accessories',
      'pageName': 'Accessory List Page'
    },
    'cart': {
      'stateName': 'cart',
      'pageTitle': 'Shopping Cart Page',
      'siteSection': 'Shop',
      'siteSubSection': 'ShoppingCart',
      'pageName': 'Shopping Cart Page'
    }
  }
};

/**
 * PDL tracking constant mapping.
 */
export const PDL_CONSTANT: any = {
  'HEADER': 'Header',
  'FOOTER': 'Footer',
  'HEADER_ATTRIBUTE': 'pdl_track_headerNavigation',
  'FOOTER_ATTRIBUTE': 'pdl_track_footerNavigation'
};

/**
 * PDL callback mapping.
 */
export const PDL_CALLBACK_EVENT: any = {
  'PREPAID': 'megaMenu',
  'CUSTOMERS': 'megaMenu',
  'BUSINESS': 'megaMenu',
  'ABOUT': 'megaMenu',
  'ESPANOL': 'headerClicks',
  'FOOTER-SUB-MENU': 'footerSubMenu'
};
