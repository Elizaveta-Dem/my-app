import { useQuery } from '@tanstack/react-query';
import { fetchProducts } from '../services/fetch';

const useProductQuery = () => {
    return useQuery({
        queryFn: fetchProducts,
        queryKey: ['product'],
        staleTime: 1000 * 5,
    });
};

export { useProductQuery };