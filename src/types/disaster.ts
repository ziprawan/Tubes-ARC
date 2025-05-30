export interface Earthquake {
  type: 'earthquake';
  coordinates: [number, number];
  location_name: string;
  incident_time: number;
  source: string;
}

export interface LocalDisaster {
  type: 'flood' | 'tornadoes';
  coordinates: [number, number];
  location_name: string;
  incident_time: number;
  source: string;
}

export interface Volcano {
  type: 'volcano';
  coordinates: [number, number];
  location_name: string;
  incident_time: number;
  source: string;
}

export interface DisasterData {
  data: {
    earthquakes: Earthquake[];
    local_disasters: LocalDisaster[];
    volcanoes: Volcano[];
  };
  sources: {
    earthquakes: string;
    floods: string;
    tornadoes: string;
    tsunamis: string;
    volcanoes: string;
  };
}

export type DisasterType = 'earthquake' | 'flood' | 'tornadoes' | 'volcano' | 'all';

export type Disaster = Earthquake | LocalDisaster | Volcano;

export interface DisasterReport {
  id: string;
  title: string;
  disaster_category: DisasterType;
  location: string;
  description: string;
  documentation: string[];
  created_at: number;
  author: string;
}
