import { useState } from 'react';
import { useMenuItems, useCategories } from '../../hooks/useMenu';
import type { MenuItemWithDetails, Category } from '../../types/menu.types';

function MenuPage() {
  const [showMenu, setShowMenu] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

  const {
    data: menuItems,
    isLoading: itemsLoading,
    isError: itemsError,
    error: itemsErrorObj,
    refetch: refetchItems,
  } = useMenuItems();

  const {
    data: categories,
    isLoading: catsLoading,
    isError: catsError,
    refetch: refetchCategories,
  } = useCategories();

  const handleViewMenu = () => {
    setShowMenu(true);
    refetchItems();
    refetchCategories();
  };

  const handleHideMenu = () => {
    setShowMenu(false);
    setSelectedCategory(null);
  };

  /** Filter items by selected category */
  const filteredItems: MenuItemWithDetails[] =
    selectedCategory === null || !menuItems
      ? menuItems ?? []
      : menuItems.filter((item) =>
        item.categories?.some((cat) => cat.categoryId === selectedCategory),
      );

  /** Only show available items */
  const availableItems = filteredItems.filter((item) => item.available);

  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(price);
  };

  const isLoading = itemsLoading || catsLoading;
  const isError = itemsError || catsError;

  return (
    <div style={{ padding: '20px' }}>
      {!showMenu && (
        <button onClick={handleViewMenu}>View Menu</button>
      )}

      {isLoading && <p>Loading menu...</p>}

      {isError && (
        <div>
          <p>Unable to load menu. Please try again.</p>
          <p>{itemsErrorObj?.message ?? 'An unknown error occurred.'}</p>
          <button onClick={() => { refetchItems(); refetchCategories(); }}>Retry</button>
        </div>
      )}

      {showMenu && !isLoading && !isError && categories && (
        <div>
          <h2>Menu</h2>
          <button onClick={handleHideMenu}>Hide Menu</button>

          {/* Category filter */}
          <div style={{ margin: '16px 0', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <button
              style={{
                padding: '6px 14px',
                fontWeight: selectedCategory === null ? 'bold' : 'normal',
                background: selectedCategory === null ? '#007bff' : '#eee',
                color: selectedCategory === null ? '#fff' : '#333',
                border: 'none',
                borderRadius: '20px',
                cursor: 'pointer',
              }}
              onClick={() => setSelectedCategory(null)}
            >
              All
            </button>
            {categories
              .filter((cat) => cat.status === 1)
              .map((cat) => (
                <button
                  key={cat.categoryId}
                  style={{
                    padding: '6px 14px',
                    fontWeight: selectedCategory === cat.categoryId ? 'bold' : 'normal',
                    background: selectedCategory === cat.categoryId ? '#007bff' : '#eee',
                    color: selectedCategory === cat.categoryId ? '#fff' : '#333',
                    border: 'none',
                    borderRadius: '20px',
                    cursor: 'pointer',
                  }}
                  onClick={() =>
                    setSelectedCategory(
                      selectedCategory === cat.categoryId ? null : cat.categoryId,
                    )
                  }
                >
                  {cat.name}
                </button>
              ))}
          </div>

          {/* Menu items */}
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {availableItems.map((item) => (
              <li
                key={item.menuItemId}
                style={{
                  border: '1px solid #ddd',
                  borderRadius: '8px',
                  padding: '16px',
                  marginBottom: '12px',
                  display: 'flex',
                  gap: '16px',
                  alignItems: 'flex-start',
                }}
              >
                {/* Images */}
                {item.images && item.images.length > 0 && (
                  <div style={{ flexShrink: 0 }}>
                    <img
                      src={item.images[0]?.urlImg ?? ''}
                      alt={item.name}
                      style={{
                        width: '120px',
                        height: '120px',
                        objectFit: 'cover',
                        borderRadius: '8px',
                      }}
                    />
                  </div>
                )}

                <div style={{ flex: 1 }}>
                  <h3 style={{ margin: '0 0 4px' }}>{item.name}</h3>
                  <p style={{ fontWeight: 'bold', color: '#e67e22', margin: '4px 0' }}>
                    {formatPrice(item.price)}
                  </p>
                  {item.description && (
                    <p style={{ color: '#666', margin: '4px 0' }}>{item.description}</p>
                  )}

                  {/* Categories badge */}
                  {item.categories && item.categories.length > 0 && (
                    <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginTop: '8px' }}>
                      {item.categories
                        .filter((cat) => cat.status === 1)
                        .map((cat) => (
                          <span
                            key={cat.categoryId}
                            style={{
                              background: '#e9ecef',
                              padding: '2px 10px',
                              borderRadius: '12px',
                              fontSize: '12px',
                              color: '#495057',
                            }}
                          >
                            {cat.name}
                          </span>
                        ))}
                    </div>
                  )}
                </div>
              </li>
            ))}
          </ul>

          {availableItems.length === 0 && <p>No menu items found.</p>}
        </div>
      )}
    </div>
  );
}

export default MenuPage;
