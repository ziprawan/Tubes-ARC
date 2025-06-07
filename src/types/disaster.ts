export interface BaseDisaster {
  coordinates: [number, number];
  location_name: string;
  incident_time: number;
}

export interface Earthquake extends BaseDisaster {
  type: "earthquake";
}

export interface LocalDisaster extends BaseDisaster {
  type: "flood" | "tornadoes";
}

export interface Volcano extends BaseDisaster {
  type: "volcano";
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

export type DisasterType = "earthquake" | "flood" | "tornadoes" | "volcano" | "all";

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
