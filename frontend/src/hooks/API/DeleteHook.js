// @ts-nocheck
import { useState, useEffect } from 'react';

const useDelete = (queryParams = {}) => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

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
                throw new Error(`DELETE failed with status:  ${response.status} error message: ${errorMessage}`);
            }
        } catch (error) {
            setError(error)
        } finally {
            setLoading(false)
        }

    }

    return { deleteFetch, loading, error }
};

export default useDelete;