import { getDistanceKm } from "./distanceUtils"
import { Location, AvailabilityDates } from "./types"

export async function getLocations() {
    const res = await fetch("https://raw.githubusercontent.com/CovidEngine/vaxxnzlocations/main/uniqLocations.json")
    const data: Location[] = await res.json()
    return data
}

export async function getAvailabilityDates(extId: string) {
    const res = await fetch(`https://raw.githubusercontent.com/CovidEngine/vaxxnzlocations/main/mockAvailability/${extId}.json`)
    const data: AvailabilityDates = await res.json()
    return data
}

export async function getMyCalendar(lat: number, lng: number, radiusKm: number) {
    const locations = await getLocations()
    const filtredLocations = locations.filter(location => {
        const distance = getDistanceKm(lat, lng, location.location.lat, location.location.lng)
        return distance < radiusKm
    })
    const availabilityDatesAndLocations = await Promise.all(filtredLocations.map(async (location) => {
        const availabilityDates = await getAvailabilityDates(location.extId)
        return {
            location,
            availabilityDates
        }
    }))
    return availabilityDatesAndLocations
}
