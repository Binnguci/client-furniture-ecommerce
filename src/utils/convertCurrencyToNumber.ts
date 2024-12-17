export function convertCurrencyStringToNumber(currencyString: string) {
    return Number(currencyString.replace(/\D/g, ""));
}