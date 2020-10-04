const convertNumberToINRFormat = (numericStringToConvert) => {
    if (numericStringToConvert === null) return null;
    let count = 0;
    let newCurrency = '';
    const tempNumericStringToConvert = numericStringToConvert.toString();
    for (let i = tempNumericStringToConvert.length - 1; i >= 0; i--) {
        count += 1;
        newCurrency += tempNumericStringToConvert[i];
        if (count === 3 && count !== tempNumericStringToConvert.length) {
            newCurrency += ',';
        }
        if (count > 4 && (count % 2 !== 0) && count !== tempNumericStringToConvert.length) {
            newCurrency += ',';
        }
    }
    return newCurrency.split("").reverse().join("");
}

export default convertNumberToINRFormat;