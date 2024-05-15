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
                throw new Error(`Fetch failed with status ${response.status}`);
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