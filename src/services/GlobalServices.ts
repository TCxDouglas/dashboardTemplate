import axios from 'axios';
import { API_PROAFI } from '@/constants/constants';
import { CountryGeoName, ResponseCountry, StateGeoName } from '@/types/Geonames';

export type ModeGetInfo = 'states' | 'cities';

export const getEveryCountry = async () => {
  try {
    const resGeo = await axios.get<ResponseCountry<CountryGeoName>>(
      `${API_PROAFI}/geonames/countries`,
    );

    if (resGeo.status === 200) return resGeo.data;

    return false;
  } catch (error) {
    return false;
  }
};
export const getStateForCountry = async (geonameId: number, type: ModeGetInfo) => {
  try {
    let PATH = `${API_PROAFI}/geonames`;
    if (type === 'cities') PATH += `/states/${geonameId}/cities`;
    if (type === 'states') PATH += `/countries/${geonameId}/states`;
    const resGeo = await axios.get<ResponseCountry<StateGeoName>>(PATH);

    if (resGeo.status === 200) return resGeo.data;

    return false;
  } catch (error) {
    return false;
  }
};
