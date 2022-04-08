module.exports = (host, query = {}) => {
    let result = `${host}?`;
    Object.keys(query).forEach((key, i) => {
        (i === 0) ? result += `${key}=${query[key]}` : result += `&${key}=${query[key]}`;
    });
    return result;
}