import { useContext, useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';

import Link from 'next/link';

import { Store } from '../../utils/context/Store';
import Dropdown from './Dropdown';

const Header = () => {
  const { status, data: session } = useSession();
  const { state } = useContext(Store);
  const { cart } = state;

  const [cartItemsCount, setCartItemsCount] = useState(0);

  useEffect(() => {
    setCartItemsCount(cart.cartItems.reduce((a, c) => a + c.quantity, 0));
  }, [cart.cartItems]);

  return (
    <header>
      <nav className="flex h-12 bg-gray-200 shadow-md px-4 justify-between items-center">
        <Link href="/">
          <a className="text-lg text-blue-800 font-bold">dBB-Kositas</a>
        </Link>
        <div className="flex justify-between items-center">
          <Link href="/cart">
            <a className="p-2">
              Cart
              {cartItemsCount > 0 && (
                <span className="ml-1 rounded-full bg-red-600 px-2 py-1 text-xs font-bold text-white">
                  {cartItemsCount}
                </span>
              )}
            </a>
          </Link>
          {status === 'loading' ? (
            'loading'
          ) : session?.user ? (
            <Dropdown />
          ) : (
            <Link href="/login">
              <a className="p-2">Login</a>
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
