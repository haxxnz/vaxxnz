import { SlotWithAvailability } from "./calendar/booking/BookingDataTypes";

const getTime = (string: string): number =>
  parseInt(string.substring(0, 5).replace(/:/g, ""), 10);

function getToday(date: Date): [string, string] {
  return new Date(date.getTime() - date.getTimezoneOffset() * 60000)
    .toISOString()
    .split("T") as [string, string];
}

export function getTodayDateStr() {
  const date = new Date();
  const [todayDate] = getToday(date);
  return todayDate;
}

export function filterSlots(slots?: SlotWithAvailability[]) {
  const date = new Date();
  const [, todayTime] = getToday(date);
  const parsedTodayTime = getTime(todayTime);
  return (slots ?? []).filter(({ localStartTime }) => {
    const parsedLocalStartTime = getTime(localStartTime);
    return parsedLocalStartTime > parsedTodayTime;
  });
}
