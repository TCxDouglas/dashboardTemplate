import { useState } from 'react';
import { ModeGetInfo, getEveryCountry, getStateForCountry } from '@/services/GlobalServices';
import { CountryGeoName, StateGeoName } from '@/types/Geonames';

export const useCoutry = () => {
  const [listCountry, setListCountry] = useState<CountryGeoName[]>([]);
  const [listState, setListState] = useState<StateGeoName[]>([]);
  const [listCity, setListCity] = useState<StateGeoName[]>([]);
  const [loadingCountry, setLoadingCountry] = useState(false);
  const [loadingState, setLoadingState] = useState(false);
  const [loadingCity, setLoadingCity] = useState(false);

  const getCountrys = async () => {
    setLoadingCountry(true);
    const resCountrys = await getEveryCountry().finally(() => setLoadingCountry(false));
    if (resCountrys) setListCountry(resCountrys.data);
  };
  const getStateorCiies = async (geonameId: number, type: ModeGetInfo) => {
    if (type === 'cities') setLoadingCity(true);
    if (type === 'states') setLoadingState(true);
    const resState = await getStateForCountry(geonameId, type).finally(() => {
      if (type === 'cities') setLoadingCity(false);
      if (type === 'states') setLoadingState(false);
    });
    if (resState) {
      if (type === 'cities') setListCity(resState.data);
      if (type === 'states') setListState(resState.data);
    }
  };

  return {
    listCountry,
    listState,
    listCity,
    getCountrys,
    getStateorCiies,
    loadingCountry,
    loadingCity,
    loadingState,
  };
};
