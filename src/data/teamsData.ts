// src/data/teamsData.ts

import Team1 from "@/assets/images/teams/c1f28202-85a7-40e3-8684-606bc80054ce-150x150-1.png";
import Team2 from "@/assets/images/teams/close-up-excited-person-portrait.jpg";
import Team3 from "@/assets/images/teams/front-view-man-working-as-real-estate-agent-1.jpg";
import Team4 from "@/assets/images/teams/front-view-man-working-as-real-estate-agent.jpg";
import Team5 from "@/assets/images/teams/medium-shot-man-city-lifestyle.jpg";
import Team6 from "@/assets/images/teams/medium-shot-man-working-as-real-estate-agent-1.jpg";

import { StaticImageData } from "next/image";

export interface TeamMember {
  name: string;
  role: string;
  description: string;
  imagePath: StaticImageData;
}

const teamsData: TeamMember[] = [
  {
    name: "Mr. Jhangir",
    role: "Head of Sales",
    description:
      "Jhangir drives the technical strategy of the flowbite platform and brand.",
    imagePath: Team1,
  },
  {
    name: "Mr. Jhangir",
    role: "Head of Sales",
    description:
      "Jhangir drives the technical strategy of the flowbite platform and brand.",
    imagePath: Team2,
  },
  {
    name: "Mr. Jhangir",
    role: "Head of Sales",
    description:
      "Jhangir drives the technical strategy of the flowbite platform and brand.",
    imagePath: Team3,
  },
  {
    name: "Mr. Jhangir",
    role: "Head of Sales",
    description:
      "Jhangir drives the technical strategy of the flowbite platform and brand.",
    imagePath: Team4,
  },
  {
    name: "Mr. Jhangir",
    role: "Head of Sales",
    description:
      "Jhangir drives the technical strategy of the flowbite platform and brand.",
    imagePath: Team5,
  },
  {
    name: "Mr. Jhangir",
    role: "Head of Sales",
    description:
      "Jhangir drives the technical strategy of the flowbite platform and brand.",
    imagePath: Team6,
  },
  // Add more team members as needed
];

export default teamsData;
