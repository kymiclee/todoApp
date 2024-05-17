// @ts-nocheck
import { useState, useEffect } from 'react';

const usePost = (queryParams = {}) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const postFetch = async (url, formData, type) => {
        try {
            setLoading(true)
            const response = await fetch(`/api/todo${url}`, {
                method: 'POST',
                body: JSON.stringify(formData),
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
            });
            if (!response.ok) {
                const errorResponse = await response.json();
                const errorMessage = errorResponse.error;
                throw new Error(`POST failed with status:  ${response.status} error message: ${errorMessage}`);
            }
            const result = await response.json();
            setData(result)

        } catch (error) {
            setError(error)
        } finally {
            setLoading(false)
        }

    }

    return { postFetch, data, loading, error }
};

export default usePost;