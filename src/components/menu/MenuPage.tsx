import { useState } from 'react';
import { useMenuItems } from '../../hooks/useMenu';

function MenuPage() {
  const [showMenu, setShowMenu] = useState(false);
  const { data, isLoading, isError, error, refetch } = useMenuItems();

  const handleViewMenu = () => {
    setShowMenu(true);
    refetch();
  };

  const handleHideMenu = () => {
    setShowMenu(false);
  };

  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(price);
  };

  return (
    <div style={{ padding: '20px' }}>
      {!showMenu && (
        <button onClick={handleViewMenu}>View Menu</button>
      )}

      {isLoading && <p>Loading menu...</p>}

      {isError && (
        <div>
          <p>Unable to load menu. Please try again.</p>
          <p>{error?.message}</p>
          <button onClick={() => refetch()}>Retry</button>
        </div>
      )}

      {showMenu && !isLoading && !isError && data && (
        <div>
          <h2>Menu</h2>
          <button onClick={handleHideMenu}>Hide Menu</button>
          <ul>
            {data.map((item) => (
              <li key={item.id}>
                <h3>{item.name}</h3>
                <p>{formatPrice(item.price)}</p>
                {item.description && <p>{item.description}</p>}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default MenuPage;
