// Отрисовываем время в указанной зоне
export function getTime(today, zone) {

    // Текущее время
    let zone_local = today.getTimezoneOffset() / -60;

    let zone_delta = zone - zone_local;

    // Время в другой зоне
    let d1 = new Date();
    d1.setTime(today.getTime() + (zone_delta * 60 * 60 * 1000));

    let options = {
        //	weekday: 'long',

        year: 'numeric',
        month: 'numeric',
        day: 'numeric',

        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric'
    };

    let str1 = d1.toLocaleDateString("ru-RU", options);
    let pos = str1.indexOf(',');
    let result = str1.substring(pos + 1);

    return result;
}
