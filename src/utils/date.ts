export function getTodaysDate() {
    var today = new Date();
    var day: number | string = today.getDate();
    var month: number | string = today.getMonth();
    var year = today.getFullYear();

    if (day < 10) day = '0' + day;
    if (month < 10) month = '0' + month;

    return `${day}/${month}/${year}`;
}
