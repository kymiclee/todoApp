import { useContext } from "react";
import { ErrorDialogContext } from "../../context/ErrorDialogContext";


export const UseErrorDialog = () => {
    const context = useContext(ErrorDialogContext);
    if (context === undefined) {
        throw new Error('useErrorDialog must be used within an ErrorDialogProvider');
    }
    return context;
};