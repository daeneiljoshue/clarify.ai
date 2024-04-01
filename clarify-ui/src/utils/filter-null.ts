
import { Indexable } from 'reducers';

export function filterNull<Type>(obj: Type): Type {
    const filteredObject = { ...obj };
    if (filteredObject) {
        for (const key of Object.keys(filteredObject)) {
            if ((filteredObject as Indexable)[key] === null) { // Only remove null, not undefined
                delete (filteredObject as Indexable)[key];
            }
        }
    }
    return filteredObject;
}
