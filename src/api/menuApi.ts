import apiClient from '../lib/axios';
import type { Category, MenuItem, MenuItemImage } from '../types/menu.types';

export async function getCategories(): Promise<Category[]> {
  try {
    const data = await apiClient.get('/api/categories');
    return data as unknown as Category[];
  } catch (error) {
    throw new Error('Failed to fetch categories');
  }
}

export async function getMenuItems(): Promise<MenuItem[]> {
  try {
    const data = await apiClient.get('/api/menu-items');
    return data as unknown as MenuItem[];
  } catch (error) {
    throw new Error('Failed to fetch menu items');
  }
}

export async function getMenuItemImages(): Promise<MenuItemImage[]> {
  try {
    const data = await apiClient.get('/api/menu-item-images');
    return data as unknown as MenuItemImage[];
  } catch (error) {
    throw new Error('Failed to fetch menu item images');
  }
}
