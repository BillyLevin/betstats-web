export function getTodaysDate() {
    const today = new Date();
    let day: number | string = today.getDate();
    let month: number | string = today.getMonth();
    const year = today.getFullYear();

    if (day < 10) day = '0' + day;
    if (month < 10) month = '0' + month;

    return `${day}/${month}/${year}`;
}

export function americaniseDate(date: string) {
    let sections = date.split('/');

    return [sections[1], sections[0], sections[2]].join('/');
}
