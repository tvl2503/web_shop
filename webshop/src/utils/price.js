export const calculateSaleprice = (price, percent) => {
    return price * (1 - (percent / 100))
}