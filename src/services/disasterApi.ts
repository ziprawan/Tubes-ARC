import { DisasterData } from '@/types/disaster';

const API_BASE_URL = 'https://tubes-arc-api.ajos.my.id/api';

export async function fetchDisasterData(): Promise<DisasterData> {
  try {
    const response = await fetch(`${API_BASE_URL}/disasters`, {
      cache: 'no-store', // Always fetch fresh data
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching disaster data:', error);
    throw error;
  }
}

export async function getDisastersByLocation(location: string): Promise<any[]> {
  try {
    const data = await fetchDisasterData();
    const allDisasters = [
      ...data.data.earthquakes,
      ...data.data.local_disasters,
      ...data.data.volcanoes,
    ];
    
    // Filter disasters by location (case-insensitive partial match)
    return allDisasters.filter(disaster => 
      disaster.location_name.toLowerCase().includes(location.toLowerCase())
    );
  } catch (error) {
    console.error('Error filtering disasters by location:', error);
    throw error;
  }
}

export async function getRecentDisasters(limit: number = 10): Promise<any[]> {
  try {
    const data = await fetchDisasterData();
    const allDisasters = [
      ...data.data.earthquakes,
      ...data.data.local_disasters,
      ...data.data.volcanoes,
    ];
    
    // Sort by incident_time (most recent first) and take the specified limit
    return allDisasters
      .sort((a, b) => b.incident_time - a.incident_time)
      .slice(0, limit);
  } catch (error) {
    console.error('Error getting recent disasters:', error);
    throw error;
  }
}
