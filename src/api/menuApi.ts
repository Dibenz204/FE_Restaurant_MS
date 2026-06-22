import apiClient from '../lib/axios';
import type { Category, MenuItemImage, MenuItemWithDetails } from '../types/menu.types';

export async function getCategories(): Promise<Category[]> {
  const response = await apiClient.get<Category[]>('/api/categories');
  // apiClient interceptor unwraps response.data, so response is already Category[]
  return response as unknown as Category[];
}
export async function getMenuItems(): Promise<MenuItemWithDetails[]> {
  const response = await apiClient.get<MenuItemWithDetails[]>('/api/menu-items');
  return response as unknown as MenuItemWithDetails[];
}
export async function getMenuItemImages(): Promise<MenuItemImage[]> {
  const response = await apiClient.get<MenuItemImage[]>('/api/menu-item-images');
  return response as unknown as MenuItemImage[];
}

