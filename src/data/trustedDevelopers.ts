// src/data/trustedDevelopers.ts

import Developer1 from "@/assets/images/trusted-developers/azizi-developments.jpg";
import Developer2 from "@/assets/images/trusted-developers/binghatti-developers.jpg";
import Developer3 from "@/assets/images/trusted-developers/damac-properties.jpg";
import Developer4 from "@/assets/images/trusted-developers/danube-properties.jpg";
import Developer5 from "@/assets/images/trusted-developers/deyaar-properties.jpg";
import Developer6 from "@/assets/images/trusted-developers/dubai-properties.jpg";
import Developer7 from "@/assets/images/trusted-developers/ellington-properties.jpg";
import Developer8 from "@/assets/images/trusted-developers/emaar-properties.jpg";
import Developer9 from "@/assets/images/trusted-developers/majid-ul-futtaim.jpg";
import Developer10 from "@/assets/images/trusted-developers/meraas-roperties.jpg";
import Developer11 from "@/assets/images/trusted-developers/nakheel-properties.jpg";
import Developer12 from "@/assets/images/trusted-developers/nshama-property.jpg";
import Developer13 from "@/assets/images/trusted-developers/omniyat-properties.jpg";
import Developer14 from "@/assets/images/trusted-developers/select-group.jpg";
import Developer15 from "@/assets/images/trusted-developers/sobha-properties.jpg";

import { StaticImageData } from "next/image";

export interface TrustedDeveloperData {
  id: number;
  name: string;
  logo: StaticImageData;
}

const trustedDevelopers: TrustedDeveloperData[] = [
  { id: 1, name: "Azizi Developments", logo: Developer1 },
  { id: 2, name: "Binghatti Developers", logo: Developer2 },
  { id: 3, name: "DAMAC Properties", logo: Developer3 },
  { id: 4, name: "Danube Properties", logo: Developer4 },
  { id: 5, name: "Deyaar Properties", logo: Developer5 },
  { id: 6, name: "Dubai Properties", logo: Developer6 },
  { id: 7, name: "Ellington Properties", logo: Developer7 },
  { id: 8, name: "Emaar Properties", logo: Developer8 },
  { id: 9, name: "Majid Al Futtaim", logo: Developer9 },
  { id: 10, name: "Meraas Properties", logo: Developer10 },
  { id: 11, name: "Nakheel Properties", logo: Developer11 },
  { id: 12, name: "Nshama Property", logo: Developer12 },
  { id: 13, name: "Omniyat Properties", logo: Developer13 },
  { id: 14, name: "Select Group", logo: Developer14 },
  { id: 15, name: "Sobha Properties", logo: Developer15 },

  // Add more developers as needed
];

export default trustedDevelopers;
