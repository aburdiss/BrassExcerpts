/**
 * @function getCountryFlagEmoji
 * @description Returns the Flag of the country as an emoji.
 * Created 9/18/21
 * @param {string} country The name of the country to get the flag of
 * @returns {string} An emoji representing the flag of that country
 *
 * @copyright 2023 Alexander Burdiss
 * @author Alexander Burdiss
 * @since 7/9/23
 * @version 1.2.0
 */
export function getCountryFlagEmoji(country: string) {
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
    case 'Croatia':
      return '🇭🇷';
    case 'Czech Republic':
      return '🇨🇿';
    case 'Denmark':
      return '🇩🇰';
    case 'Egypt':
      return '🇪🇬';
    case 'Estonia':
      return '🇪🇪';
    case 'Finland':
      return '🇫🇮';
    case 'France':
      return '🇫🇷';
    case 'Germany':
      return '🇩🇪';
    case 'Israel':
      return '🇮🇱';
    case 'Italy':
      return '🇮🇹';
    case 'Japan':
      return '🇯🇵';
    case 'Latvia':
      return '🇱🇻';
    case 'Lithuania':
      return '🇱🇹';
    case 'Luxembourg':
      return '🇱🇺';
    case 'Mexico':
      return '🇲🇽';
    case 'Netherlands':
      return '🇳🇱';
    case 'New Zealand':
      return '🇳🇿';
    case 'Norway':
      return '🇳🇴';
    case 'Poland':
      return '🇵🇱';
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
    case 'South Africa':
      return '🇿🇦';
    case 'Sweden':
      return '🇸🇪';
    case 'Switzerland':
      return '🇨🇭';
    case 'Taiwan':
      return '🇹🇼';
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
