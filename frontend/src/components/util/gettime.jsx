export function gettime() {
    const currentDate = new Date();

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1; 
    const day = currentDate.getDate();
    const hours = currentDate.getHours();
    const minutes = currentDate.getMinutes();
    const seconds = currentDate.getSeconds();
    const formattedDate = `${year}-${padNumber(month)}-${padNumber(day)}`;
    const formattedTime = `${padNumber(hours)}:${padNumber(minutes)}:${padNumber(seconds)}`;

    return { date: formattedDate, time: formattedTime };
}

function padNumber(num) {
    return num.toString().padStart(2, '0');
}