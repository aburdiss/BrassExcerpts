/**
 * @function getCountryFlagEmoji
 * @description Returns the Flag of the country as an emoji.
 * @param {string} country
 * @returns {string}
 * @author Alexander Burdiss
 * @since 9/18/21
 * @version 1.0.0
 */
export function getCountryFlagEmoji(country) {
  switch (country) {
    case 'Austria':
      return '🇦🇹';
    case 'Australia':
      return '🇦🇺';
    case 'Belgium':
      return '🇧🇪';
    case 'Brazil':
      return '🇧🇷';
    case 'Bulgaria':
      return '🇧🇬';
    case 'Canada':
      return '🇨🇦';
    case 'China':
      return '🇨🇳';
    case 'Czech Republic':
      return '🇨🇿';
    case 'Denmark':
      return '🇩🇰';
    case 'Estonia':
      return '🇪🇪';
    case 'Finland':
      return '🇫🇮';
    case 'France':
      return '🇫🇷';
    case 'Germany':
      return '🇩🇪';
    case 'Italy':
      return '🇮🇹';
    case 'Japan':
      return '🇯🇵';
    case 'Mexico':
      return '🇲🇽';
    case 'Netherlands':
      return '🇳🇱';
    case 'New Zealand':
      return '🇳🇿';
    case 'Norway':
      return '🇳🇴';
    case 'Portugal':
      return '🇵🇹';
    case 'Russia':
      return '🇷🇺';
    case 'Slovakia':
      return '🇸🇰';
    case 'Slovenia':
      return '🇸🇮';
    case 'Spain':
      return '🇪🇸';
    case 'Sweden':
      return '🇸🇪';
    case 'Switzerland':
      return '🇨🇭';
    case 'Turkey':
      return '🇹🇷';
    case 'United Kingdom':
      return '🇬🇧';
    case 'USA':
      return '🇺🇸';
    default:
      return '';
  }
}
