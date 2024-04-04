import { createContext, useMemo, useState } from 'react';

export const TodoAppStateContext = createContext({
    currentList: null,
});
export function AppState({ children }) {
    const [currentList, setCurrentList] = useState(null);

    const value = useMemo(
        () => ({
            currentList,
            setCurrentList,
        }),
        [currentList]
    );

    return (
        <AppStateContext.Provider value={value}>
            {children}
        </AppStateContext.Provider>
    );
}


