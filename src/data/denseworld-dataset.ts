/**
 * Content added to the Dataset tab (2026-09-01), ported verbatim from the
 * project's own Gradio Space (huggingface.co/spaces/Pragya-AI/denseworld,
 * denseworld_app.py's build_dataset_html/build_city_chart_html/
 * build_agents_html) — the team's own existing copy, not written fresh here.
 * The Space's own per-city video rows aren't ported since the site's own
 * CityGrid already covers that with real footage.
 */

export const datasetOpening =
  "DENSEWORLD V1 comprises approximately 1,000 hours of urban footage collected across 22 Tier-1 and Tier-2 cities in India, spanning drive-through, walk-through, and aerial viewpoints. The dataset captures a broad spectrum of urban environments, including markets, commercial streets, residential neighborhoods, transit corridors, junctions, flyovers, heritage districts, beaches, ghats, and skylines, under diverse conditions of time of day, weather, crowd density, traffic composition, road geometry, lighting, and pedestrian–vehicle interactions. It further includes region-specific agents rarely represented in existing datasets, such as auto-rickshaws, cycle rickshaws, street vendors, hand-pulled carts, and free-roaming animals. All data are processed using privacy-preserving pipelines, including face and license-plate anonymization and the removal of sensitive content.";

export interface CityVideoRow {
  readonly city: string;
  readonly drive: number;
  readonly walk: number;
  readonly drone: number;
}

export interface CityVideoChart {
  readonly title: string;
  readonly subtitle: string;
  readonly rows: readonly CityVideoRow[];
}

export const videosPerCityHeading = "Videos per city";

export const cityVideoCharts: readonly CityVideoChart[] = [
  {
    title: "Tier 1 · Metros",
    subtitle: "6 metros · videos per city, by capture mode",
    rows: [
      { city: "Kolkata", drive: 3800, walk: 20500, drone: 700 },
      { city: "Mumbai", drive: 6400, walk: 4100, drone: 200 },
      { city: "Delhi", drive: 4100, walk: 6100, drone: 200 },
      { city: "Chennai", drive: 2000, walk: 5800, drone: 400 },
      { city: "Hyderabad", drive: 2200, walk: 5000, drone: 200 },
      { city: "Bangalore", drive: 3400, walk: 2400, drone: 700 },
    ],
  },
  {
    title: "Tier 2 · Cities",
    subtitle: "15 cities · videos per city, by capture mode",
    rows: [
      { city: "Ahmedabad", drive: 450, walk: 4900, drone: 520 },
      { city: "Varanasi", drive: 1090, walk: 2760, drone: 450 },
      { city: "Jaipur", drive: 670, walk: 2200, drone: 1300 },
      { city: "Kochi", drive: 1020, walk: 1220, drone: 1840 },
      { city: "Pune", drive: 700, walk: 1800, drone: 650 },
      { city: "Coimbatore", drive: 1700, walk: 550, drone: 680 },
      { city: "Lucknow", drive: 820, walk: 1410, drone: 550 },
      { city: "Thiruvananthapuram", drive: 720, walk: 660, drone: 1260 },
      { city: "Chandigarh", drive: 520, walk: 950, drone: 820 },
      { city: "Nagpur", drive: 370, walk: 970, drone: 530 },
      { city: "Indore", drive: 640, walk: 630, drone: 420 },
      { city: "Visakhapatnam", drive: 260, walk: 820, drone: 440 },
      { city: "Mysuru", drive: 480, walk: 420, drone: 450 },
      { city: "Surat", drive: 470, walk: 340, drone: 290 },
      { city: "Bhopal", drive: 250, walk: 360, drone: 350 },
    ],
  },
];

export interface AgentIcon {
  readonly src: string;
  readonly caption: string;
}

export const agentsHeading = "Moving agents that DENSEWORLD learns!";
export const crowdLabel = "…and whole crowds that move as a single agent";

const AGENT_BASE = "/denseworld_agents/";

export const agentIcons: readonly AgentIcon[] = [
  { src: `${AGENT_BASE}car_1.png`, caption: "Taxi" },
  { src: `${AGENT_BASE}car_5.png`, caption: "Hatchback" },
  { src: `${AGENT_BASE}car_6.png`, caption: "Bus" },
  { src: `${AGENT_BASE}auto_2.png`, caption: "Auto-rickshaw" },
  { src: `${AGENT_BASE}bike_1.png`, caption: "Scooter" },
  { src: `${AGENT_BASE}bike_2.png`, caption: "Scooter" },
  { src: `${AGENT_BASE}cyclist_1.png`, caption: "Cyclist" },
  { src: `${AGENT_BASE}riskshaw_1.png`, caption: "Cycle rickshaw" },
  { src: `${AGENT_BASE}thela_3.png`, caption: "Fruit vendor" },
  { src: `${AGENT_BASE}thela_7.png`, caption: "Food vendor" },
  { src: `${AGENT_BASE}thele_2.png`, caption: "Vegetable vendor" },
  { src: `${AGENT_BASE}cow.png`, caption: "Cow" },
  { src: `${AGENT_BASE}goat.png`, caption: "Goat" },
  { src: `${AGENT_BASE}camel.png`, caption: "Camel cart" },
  { src: `${AGENT_BASE}elephant.png`, caption: "Elephant" },
];

export const crowdIcons: readonly AgentIcon[] = [
  { src: `${AGENT_BASE}political_rally_1.png`, caption: "Political rally" },
  { src: `${AGENT_BASE}religious_procession_1.png`, caption: "Religious procession" },
  { src: `${AGENT_BASE}religious_procession_2.png`, caption: "Religious procession" },
  { src: `${AGENT_BASE}religious_procession_3.png`, caption: "Religious procession" },
  { src: `${AGENT_BASE}religious_procession_4.png`, caption: "Religious procession" },
];
