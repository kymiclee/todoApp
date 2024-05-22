// @ts-nocheck
import { useState } from 'react';

const useDelete = () => {
    const [deleteLoading, setLoading] = useState(false)
    const [deleteError, setError] = useState(null)

    const deleteFetch = async (url) => {
        try {
            setLoading(true)
            const response = await fetch(`/api/todo${url}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (!response.ok) {
                const errorResponse = await response.json();
                const errorMessage = errorResponse.error;
                throw new Error(`DELETE status:  ${response.status} <br> Error Message: ${errorMessage}`);
            }
        } catch (error) {
            setError(error)
        } finally {
            setLoading(false)
        }

    }

    return { deleteFetch, deleteLoading, deleteError }
};

export default useDelete;