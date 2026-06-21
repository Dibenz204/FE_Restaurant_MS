export interface Category {
  id: number;
  name: string;
  description?: string;
}

export interface MenuItemImage {
  id: number;
  menuItemId: number;
  imageUrl: string;
  isPrimary: boolean;
}

export interface MenuItem {
  id: number;
  name: string;
  description?: string;
  price: number;
  categoryId: number;
  images?: MenuItemImage[];
}
