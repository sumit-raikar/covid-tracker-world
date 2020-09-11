const compareValues = (key, order = 'asc') => {
    return (a, b) => {
        if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
            // property doesn't exist on either object
            return 0;
        }
        const tempA = isNaN(Number(a[key])) ? a[key].toUpperCase() : Number(a[key]);
        const tempB = isNaN(Number(b[key])) ? b[key].toUpperCase() : Number(b[key]);
        let comparision = 0;
        if (tempA > tempB) {
            comparision = 1;
        } else if (tempA < tempB) {
            comparision = -1;
        }
        return (
            (order === 'desc') ? (comparision * -1) : comparision
        )
    }
}

export default compareValues;