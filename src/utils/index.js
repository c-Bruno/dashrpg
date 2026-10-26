const generateRandomNumber = max => {
    return Math.floor(Math.random() * (max - 1 + 1)) + 1;
}

export {
    generateRandomNumber
}