import { useQuery } from '@tanstack/react-query';
import { getCategories, getMenuItems } from '../api/menuApi';

export function useCategories() {
  return useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
  });
}

export function useMenuItems() {
  return useQuery({
    queryKey: ['menu-items'],
    queryFn: getMenuItems,
    enabled: false,
  });
}
