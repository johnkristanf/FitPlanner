

export const SortWeekDays = (weekdays: any[]) => {

    const compareWeekDays = (a: any, b: any) => {
        const weekDaysOrder = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

        return weekDaysOrder.indexOf(a.weekday) - weekDaysOrder.indexOf(b.weekday)
    }

    weekdays.sort(compareWeekDays);

    return weekdays;
}