import { useContext } from "react";
import { TodoAppStateContext } from "../../context/TodoAppStateContext";


export function useAppState() {
    const context = useContext(TodoAppStateContext);

    if (context === undefined) {
        throw new Error('useAppState must be used within a AppStateProvider');
    }

    return context;
}