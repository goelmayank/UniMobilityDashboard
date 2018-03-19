import { propToString } from "./string-helpers";

/**
 * e.g. {current_time: abc, is_late: true} => [[Current time, abc]]
 * @param obj : object which is converted to string
 * @param separator : used to stringify the key of object
 * currently only included string/number/boolean values to depth 1
 */
export const objectToStringArray = (obj: object, separator?: string): [string, string][] => {
    const keys = Object.keys(obj);
    return keys.reduce((acc, key: string): [string, string][] => {
        const value = obj[key];
        const typeOfValue = typeof value
        return typeOfValue == 'string' || typeOfValue == 'number' || typeOfValue == 'boolean' ? 
            [...acc, [propToString(key), obj[key]]] : acc
    }, [])
};

/**
 * e.g. {current_time: abc, is_late: true} => [abc, true]
 * @param obj : object whole values as array is returned
 */
export const valuesOfObject = (obj): any[] => {
    const keys = Object.keys(obj);
    return keys.map(key => obj[key])
}