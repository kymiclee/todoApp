// @ts-nocheck
import { useState, useEffect } from 'react';

const usePut = (queryParams = {}) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false)
    const [putError, setError] = useState(null)

    const putFetch = async (url, formData) => {
        try {
            setLoading(true)
            const response = await fetch(`/api/todo${url}`, {
                method: 'PUT',
                body: JSON.stringify(formData),
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
            });
            if (!response.ok) {
                const errorResponse = await response.json();
                const errorMessage = errorResponse.error;
                throw new Error(`PUT failed with status:  ${response.status} error message: ${errorMessage}`);
            }
            const result = await response.json();
            setData(result)

        } catch (error) {
            setError(error)
        } finally {
            setLoading(false)
        }

    }

    return { putFetch, data, loading, putError }
};

export default usePut;