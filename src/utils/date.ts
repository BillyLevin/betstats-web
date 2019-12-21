export function getTodaysDate() {
    const today = new Date();
    let day: number | string = today.getDate();
    let month: number | string = today.getMonth();
    const year = today.getFullYear();

    if (day < 10) day = '0' + day;
    if (month < 10) month = '0' + month;

    return `${day}/${month}/${year}`;
}
