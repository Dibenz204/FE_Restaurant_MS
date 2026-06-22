export interface Category {
  categoryId: number;
  name: string;
  note?: string;
  status: number;
}

export interface MenuItemImage {
  menuItemImageId: number;
  menuItemId: number;
  urlImg: string;
  note?: string;
  status: number;
}

export interface MenuItem {
  menuItemId: number;
  name: string;
  price: number;
  description?: string;
  available: boolean;
  status: number;
}

export interface MenuItemCategory {
  id: number;
  categoryId: number;
  menuItemId: number;
  status: number;
}

/** Aggregated view — menu item with its categories and images */
export interface MenuItemWithDetails extends MenuItem {
  categories?: Category[];
  images?: MenuItemImage[];
}
