export interface Address {
  id: number;
  country: string;
  countryCode: string;
  countryId: number;
  state: string;
  stateCode: string;
  stateId: number;
  city: string;
  cityCode: string;
  cityId: number;
  address: string;
  createdAt: string;
  updatedAt: string;
}

export interface AddressCache {
  uid: string;
  country: string;
  countryId: number;
  state: string;
  stateId: number;
  city: string;
  cityId: number;
  address: string;
}

export interface AddressForm {
  countryId?: number;
  stateId?: number;
  cityId?: number;
  address: string;
}
