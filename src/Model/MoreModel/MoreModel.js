import DeviceInfo from 'react-native-device-info';

const GOOGLE_PLAY_LINK =
  'https://play.google.com/store/apps/developer?id=Alexander+Burdiss';
const APPLE_STORE_LINK =
  'https://apps.apple.com/us/developer/alexander-burdiss/id1496727055';
const AMAZON_STORE_LINK =
  'https://www.amazon.com/s?i=mobile-apps&rh=p_4%3AAlexander+Burdiss';

export const INSTRUMENT = [
  {
    id: 'A',
    type: 'switch',
    setting: 'horn',
    value: 'Horn',
  },
  {
    id: 'B',
    type: 'switch',
    setting: 'trumpet',
    value: 'Trumpet',
  },
  {
    id: 'C',
    type: 'switch',
    setting: 'trombone',
    value: 'Trombone',
  },
  {
    id: 'D',
    type: 'switch',
    setting: 'tuba',
    value: 'Tuba',
  },
];

export const FAVORITES = [
  {
    id: '9',
    type: 'button',
    value: 'Reset Favorites',
    icon: 'heart-dislike-outline',
  },
];

export const RANDOM = [
  {
    id: '10',
    type: 'segmentedFilter',
    setting: 'randomFavorites',
  },

  {
    id: '10A',
    type: 'switch',
    setting: 'randomHorn',
    value: 'Horn',
  },
  {
    id: '10B',
    type: 'switch',
    setting: 'randomTrumpet',
    value: 'Trumpet',
  },
  {
    id: '10C',
    type: 'switch',
    setting: 'randomTrombone',
    value: 'Trombone',
  },
  {
    id: '10D',
    type: 'switch',
    setting: 'randomTuba',
    value: 'Tuba',
  },
];

export const SETTINGS = [
  {
    id: '7.4',
    type: 'switch',
    setting: 'alwaysCollapse',
    value: 'Always Collapse Excerpts',
  },
  {
    id: '7.6',
    type: 'switch',
    setting: 'keepScreenOn',
    value: 'Keep Screen On',
  },
  {
    id: '7.5',
    type: 'button',
    value: 'Restore Defaults',
    icon: 'refresh',
  },
];

export const RESOURCES = [
  {
    id: '11',
    type: 'link',
    value: 'More Apps by Alexander Burdiss',
    link:
      DeviceInfo.getBrand() === 'Apple'
        ? APPLE_STORE_LINK
        : DeviceInfo.getBrand() === 'Amazon'
        ? AMAZON_STORE_LINK
        : GOOGLE_PLAY_LINK,
  },
  {
    id: '12',
    type: 'link',
    value: 'Visit Ars Nova Publishing',
    link: 'https://www.arsnovapublishing.com/',
  },
  {
    id: '13',
    type: 'link',
    value: 'Visit Band Room Online',
    link: 'https://www.bandroomonline.com/',
  },
];

export const ABOUT = [
  {
    id: '14',
    type: 'text',
    value: `© ${new Date().getFullYear()} ` + 'Alexander Burdiss',
  },
  {
    id: '15',
    type: 'navigate',
    value: 'Licenses',
    component: 'Licenses',
  },
  // {
  //   id: '16',
  //   type: 'navigate',
  //   value: 'Acknowledgements',
  //   component: 'Acknowledgements',
  // },
  {
    id: '17',
    type: 'link',
    value: 'Send Feedback',
    link: 'mailto:aburdiss@icloud.com?subject=Brass%20Excerpts%20Feedback',
  },
  {
    id: '9',
    type: 'link',
    value: 'Open Source. Feel free to contribute!',
    link: 'https://github.com/aburdiss/BrassExcerpts',
  },
];
