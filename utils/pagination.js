/**
 * Calculate skip, limit based on the given page number & page size(optional)
 * @param {Number} page 
 * @param {Number} pageSize 
 * @returns
 */
module.exports = ({ page, pageSize = 8 }) => {
    pageSize = parseInt(pageSize, 10);
    return {
        skip: ((page >= 1 ? page : 1) - 1) * pageSize,
        limit: pageSize
    }
}
