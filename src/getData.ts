import { format } from 'date-fns'
import { getDistanceKm } from "./distanceUtils"
import { Location, AvailabilityDates, DateLocationsPair, LocationSlotsPair } from "./types"

export async function getLocations() {
    const res = await fetch("https://raw.githubusercontent.com/CovidEngine/vaxxnzlocations/main/uniqLocations.json")
    const data: Location[] = await res.json()
    return data
}

export async function getAvailabilityDates(extId: string) {
    const res = await fetch(`https://raw.githubusercontent.com/CovidEngine/vaxxnzlocations/main/availability/${extId}.json`)
    const data: AvailabilityDates = await res.json()
    // console.log('data',data)
    return data
}

export async function getMyCalendar(lat: number, lng: number, radiusKm: number) {
    const locations = await getLocations()
    const filtredLocations = locations.filter(location => {
        const distance = getDistanceKm(lat, lng, location.location.lat, location.location.lng)
        return distance < radiusKm
    })
    const availabilityDatesAndLocations = await Promise.all(filtredLocations.map(async (location) => {
        let availabilityDates: AvailabilityDates | undefined = undefined
        try {
            availabilityDates = await getAvailabilityDates(location.extId)
        }
        catch (e) {
            console.error('getMyCalendar e', e)
        }
        console.log('availabilityDates',availabilityDates)

        return {
            location,
            availabilityDates
        }
    }))

    const today = new Date()
    const dateLocationsPairs: DateLocationsPair[] = []
    for (let i = 0; i < 90; i++) { // 90 days in the future
        const date = (new Date()).setDate(today.getDate() + i)
        const dateStr = format(date, 'yyyy-MM-dd')
        console.log('dateStr',dateStr)
        const locationSlotsPairs: LocationSlotsPair[] = []
        for (let j = 0; j < availabilityDatesAndLocations.length; j++) {
            const availabilityDatesAndLocation = availabilityDatesAndLocations[j];
            const { location, availabilityDates } = availabilityDatesAndLocation
            const slots = availabilityDates ? availabilityDates[dateStr] : []
            locationSlotsPairs.push({ location, slots })
        }
        dateLocationsPairs.push({
            dateStr,
            locationSlotsPairs,
        })
    }
    return dateLocationsPairs
}
