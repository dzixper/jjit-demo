export interface Offer {
  logo: string;
  company: string;
  website: string;
  companySize: number;
  companyType: string;
  industry: string;
  position: string;
  experience: string;
  contract: string;
  salary: [number, number];
  currency: string;
  tags: [{stack: string, level: number}];
  description: string;
  city: string;
  street: string;
  lonLat: [number, number];
  applyDestination: string;
  mainTech: string;
  timePosted: Date;
}
