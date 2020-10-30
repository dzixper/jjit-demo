export interface Offer {
  logo: string; // Base64
  company: string;
  website: string;
  companySize: number;
  companyType: string;
  industry: string;
  position: string;
  experience: string;
  contract: string;
  salary: [number, number]; // [min, max]
  currency: string;
  tags: Array<string>;
  description: string;
  city: string;
  street: string;
  lonLat: [number, number]; // [lon, lat]
  applyDestination: string;
  mainTech: string;
  timePosted: Date;
}
