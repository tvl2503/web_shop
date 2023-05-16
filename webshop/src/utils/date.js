export const getDate = (date) => {
    let a = new Date(date);

    return `${a.getDay() + 1}/${a.getMonth() + 1}/${a.getFullYear()}`
}