import { useState, useEffect } from 'react';

function getStorageValue(key: string, defaultValue: any) {
    // getting stored value
    if (typeof window !== 'undefined') {
        var saved = localStorage.getItem(key);
        var initial = defaultValue;
        if (saved !== null) {
            // saved = JSON.stringify(saved);
            initial = JSON.parse(saved);
        }
        return initial;
    }
}

export const useLocalStorage = (key: string, defaultValue: any) => {
    const [value, setValue] = useState(() => {
        return getStorageValue(key, defaultValue);
    });

    return [value, setValue];
};
