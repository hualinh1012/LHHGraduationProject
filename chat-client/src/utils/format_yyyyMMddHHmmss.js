export default function format_yyyyMMddHHmmss(time) {
    if (time === null || time === undefined){
        return null
    }
    let year = time.slice(0, 4);
    let month = time.slice(4, 6);
    let day = time.slice(6, 8);
    let hour = parseInt(time.slice(8, 10)) + 7;
    let minute = time.slice(10, 12);
    if (hour >= 24) {
        hour = hour - 24;
        day = parseInt(day) + 1;
    }
    return hour + ":" + minute + " " + day + "-" + month + "-" + year;
}