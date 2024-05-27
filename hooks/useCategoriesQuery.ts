import { useQuery } from '@tanstack/react-query';
import { fetchCategory } from '../services/fetch';

const useCategoryQuery = () => {
    return useQuery({
        queryFn: fetchCategory,
        queryKey: ['category'],
        staleTime: 1000 * 5,
    });
};

export { useCategoryQuery };