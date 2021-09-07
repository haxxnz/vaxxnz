export interface OpennningHours {
  schedule: { [date: string]: string };
  exceptions: { [date: string]: string };
  notesHtml: string[];
}

export interface WalkinLocation {
  lat: number;
  lng: number;
  name: string;
  branch: string;
  isOpenToday: boolean;
  openTodayHours: string;
  instructionLis: string[];
  address: string;
  faxNumber: string;
  telephone: string;
  opennningHours: OpennningHours;
}

export async function getWalkinData(): Promise<WalkinLocation[]> {
  try {
    const res = await fetch(
      "https://raw.githubusercontent.com/CovidEngine/vaxxnzlocations/main/healthpointLocations.json"
    );
    const data = await res.json();
    return data;
  } catch (e) {
    console.error(e); // Ilia, please don't break this, xoxoxo
    return [];
  }
}
