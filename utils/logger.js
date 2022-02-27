// define info function for logging informational messages
const info = (...params) => {
    if (process.env.NODE_ENV !== 'test') {
        console.log(...params);
    }
}

// define error function for logging error type messages
const error = (...params) => {
    if (process.env.NODE_ENV !== 'test') {
        console.error(...params);  
    }
}

// export logger functions
module.exports = {
    info,
    error
};