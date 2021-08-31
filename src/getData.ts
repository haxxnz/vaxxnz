import { Location, AvailabilityDates } from "./types"

export async function getLocations() {
    const res = await fetch("https://raw.githubusercontent.com/CovidEngine/vaxxnzlocations/main/uniqLocations.json")
    const data: Location[] = await res.json()
    return data
}

export async function getLocationSlots(extId: string) {
    const res = await fetch(`https://github.com/CovidEngine/vaxxnzlocations/blob/main/mockAvailability/${extId}.json`)
    const data: AvailabilityDates = await res.json()
    return data
}