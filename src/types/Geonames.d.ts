export interface CountryGeoName {
  geonameId: number;
  countryName: string;
}

export interface ResponseCountry<T> {
  data: T[];
}

export interface StateGeoName {
  geonameId: number;
  toponymName: string;
}
