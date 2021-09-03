
export interface Location {
    lat: () => number;
    lng: () => number;
}

export interface Viewport {
    south: number;
    west: number;
    north: number;
    east: number;
}

export interface Geometry {
    location: Location;
    viewport: Viewport;
}

export interface Place {
    geometry: Geometry;
    name: string;
    html_attributions: never[];
}
