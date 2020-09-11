const randomId = (min, max) => {
    return Math.random() * (max - min) + min;
}

export default randomId;