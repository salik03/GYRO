export interface Address {
  label: string;
  countryCode: string;
  countryName: string;
  stateCode: string;
  state: string;
  county: string;
  city: string;
  district: string;
  street: string;
  postalCode: string;
  subdistrict: string;
}

export interface Position {
  lat: number;
  lng: number;
}

export interface Access {
  lat: number;
  lng: number;
}

export interface Category {
  id: string;
  name: string;
  primary: boolean;
}

export interface FoodType {
  id: string;
  name: string;
  primary: boolean;
}

export interface FieldScore {
  placeName: number;
}

export interface Scoring {
  queryScore: number;
  fieldScore: FieldScore;
}

export interface Item {
  title: string;
  id: string;
  resultType: string;
  address: Address;
  position: Position;
  access: Access[];
  distance: number;
  categories: Category[];
  foodTypes: FoodType[];
  scoring: Scoring;
}

export interface Location {
  items: Item[];
}
