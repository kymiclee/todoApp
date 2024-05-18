// @ts-nocheck
import { useState, useEffect } from 'react';

const useGet = (queryParams = {}) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false)
    const [getError, setError] = useState(null)

    const fetchData = async (url) => {
        try {
            setLoading(true);
            const response = await fetch(`api/todo${url}`, { credentials: 'include' });
            if (!response.ok) {
                const errorResponse = await response.json();
                const errorMessage = errorResponse.error;
                throw new Error(`GET failed with status:  ${response.status} error message: ${errorMessage}`);
            }
            const result = await response.json();
            setData(result);
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    return { fetchData, data, loading, getError }
};
export default useGet