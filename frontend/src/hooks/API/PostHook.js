// @ts-nocheck
import { useState, useEffect } from 'react';

const usePost = (queryParams = {}) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const postFetch = async (url, formData) => {
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
                throw new Error(`Fetch failed with status ${response.status}`);
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