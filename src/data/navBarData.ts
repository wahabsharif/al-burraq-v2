// navBarData.ts
interface NavItem {
  label: string;
  href?: string; // Optional property for links
}

const navBarData: NavItem[] = [
  { label: "Homepage" },
  { label: "Portfolio" },
  { label: "About" },
  { label: "Instant Call", href: "#" }, // Add href for links
];

export default navBarData;
