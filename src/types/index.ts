export interface IhotelData {
  id: string;
  imageUrl: string;
  distance: string;
  location: string;
  pricePerNight: string;
  rating: number;
  reviews: number;
  availableDates: {
    end: string;
    start: string;
  };
}
