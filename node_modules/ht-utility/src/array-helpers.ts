/**
 * Works similar to underscore indexBy, converts array to object
 * @param array : this is convereted to object
 * @param key(default = 'id') : indexBy prop name
 */
export const indexBy = (array: any[], key: string = 'id') => {
    return array.reduce((acc, item) => {
        return { ...acc, [item[key]]: item }
    }, {})
}