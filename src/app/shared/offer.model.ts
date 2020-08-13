export interface Offer {
  position: string;
  company: string;
  location: string;
  remote: boolean;
  salary?: [number, number, string];
  tags: Array<string> | string;
  timePosted: Date;
}
