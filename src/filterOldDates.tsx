import { DateLocationsPair } from "./types";

const getTime = (string: string): number =>
    parseInt(string.substring(0, 5).replace(/:/g, ""), 10);

const filterOldDates = (
    dateLocationsPairs: DateLocationsPair[]
): DateLocationsPair[] => {
    const date = new Date();
    const [todayDate, todayTime] = new Date(
        date.getTime() - date.getTimezoneOffset() * 60000
    )
        .toISOString()
        .split("T");
    const parsedTodayTime = getTime(todayTime);
    const newLocationsPairs = dateLocationsPairs.map(
        ({ dateStr, locationSlotsPairs }) => {
            let newLocationSlotsPairs = locationSlotsPairs.filter(
                ({ slots }) => slots !== undefined
            );
            if (dateStr === todayDate) {
                newLocationSlotsPairs = newLocationSlotsPairs.map(
                    ({ location, slots }) => {
                        const newSlots = slots.filter(({ localStartTime }) => {
                            const parsedLocalStartTime =
                                getTime(localStartTime);
                            return parsedLocalStartTime > parsedTodayTime;
                        });
                        return { location, slots: newSlots };
                    }
                );
            }
            return { dateStr, locationSlotsPairs: newLocationSlotsPairs };
        }
    );
    return newLocationsPairs;
};

export default filterOldDates;
