export function getTodaysDate() {
    let today = new Date();
    let day: number | string = today.getDate();
    let month: number | string = today.getMonth();
    let year = today.getFullYear();

    if (day < 10) day = '0' + day;
    if (month < 10) month = '0' + month;

    return `${day}/${month}/${year}`;
}
