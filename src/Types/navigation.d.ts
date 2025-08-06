type ComposersStackScreens = [
  'Composers',
  'Composer Detail',
  'Composer Excerpt Detail',
];
type ExcerptsStackScreens = [
  'Excerpts',
  'Excerpt Detail',
  'Random Excerpts',
  'Top Excerpts',
];
type JobsStackScreens = [
  'Jobs',
  'Job Detail',
  'Jobs Excerpt Detail',
  'Past Auditions',
  'Create Custom Audition',
  'Custom Audition',
];
type MoreStackScreens = ['More', 'Licenses', 'Acknowledgements'];
export type ScreenNames = [
  ...ComposersStackScreens,
  ...ExcerptsStackScreens,
  ...JobsStackScreens,
  ...MoreStackScreens,
];
export type RootStackParamList = Record<ScreenNames[number], undefined>;
export type StackNavigation = NavigationProp<RootStackParamList>;
