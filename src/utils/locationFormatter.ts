/**
 * Utility function to format location names from ALL CAPS to proper case
 * Examples:
 * "JAYAPURA-PAPUA" -> "Jayapura, Papua"
 * "JAKARTA-DKI JAKARTA" -> "Jakarta, DKI Jakarta"
 * "BANDUNG-JAWA BARAT" -> "Bandung, Jawa Barat"
 */
export function formatLocationName(locationName: string): string {
  if (!locationName) return '';
  
  // Handle format like "CITY-PROVINCE" or "CITY-STATE"
  if (locationName.includes('-')) {
    const parts = locationName.split('-');
    const formattedParts = parts.map(part => toProperCase(part.trim()));
    return formattedParts.join(', ');
  }
  
  // Handle single location names
  return toProperCase(locationName);
}

/**
 * Convert string to proper case (first letter of each word capitalized)
 */
function toProperCase(str: string): string {
  return str
    .toLowerCase()
    .split(' ')
    .map(word => {
      // Handle special cases for Indonesian geographic terms
      const specialCases: { [key: string]: string } = {
        'dki': 'DKI',
        'ntt': 'NTT',
        'ntb': 'NTB',
        'diy': 'DIY',
        'dki jakarta': 'DKI Jakarta',
        'papua barat': 'Papua Barat',
        'jawa barat': 'Jawa Barat',
        'jawa tengah': 'Jawa Tengah',
        'jawa timur': 'Jawa Timur',
        'kalimantan barat': 'Kalimantan Barat',
        'kalimantan tengah': 'Kalimantan Tengah',
        'kalimantan timur': 'Kalimantan Timur',
        'kalimantan selatan': 'Kalimantan Selatan',
        'kalimantan utara': 'Kalimantan Utara',
        'sulawesi utara': 'Sulawesi Utara',
        'sulawesi tengah': 'Sulawesi Tengah',
        'sulawesi selatan': 'Sulawesi Selatan',
        'sulawesi tenggara': 'Sulawesi Tenggara',
        'sulawesi barat': 'Sulawesi Barat',
        'sumatra utara': 'Sumatra Utara',
        'sumatra barat': 'Sumatra Barat',
        'sumatra selatan': 'Sumatra Selatan',
        'kepulauan riau': 'Kepulauan Riau',
        'kepulauan bangka belitung': 'Kepulauan Bangka Belitung'
      };
      
      const lowerWord = word.toLowerCase();
      if (specialCases[lowerWord]) {
        return specialCases[lowerWord];
      }
      
      // Standard title case
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
    .join(' ');
}
