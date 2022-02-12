export interface CoffeeStoreDataType {
  id: string;
  name: string;
  imgUrl: string;
  address: string;
  neighborhood: string;
  votes: number;
  category: string;
}
export interface CoffeeStoreResponseDataType {
  fsq_id: string;
  name: string;
  imgUrl: string;
  location: {
    address: string;
    neighborhood: string[];
  };
}
