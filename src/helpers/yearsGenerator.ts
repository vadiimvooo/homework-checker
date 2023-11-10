import moment from "moment/moment";

export function yearsGenerator() {
    const currentYear = moment().year();
    const years: number[] = []

    for (let i = 0; i <= currentYear; i++) {
        years.push(i)
    }

    return years;
}