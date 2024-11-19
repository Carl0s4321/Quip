function error(msg, status = 500) {
    let err = new Error(msg);
    err.status = status;
    throw err;
}

module.exports = error;
