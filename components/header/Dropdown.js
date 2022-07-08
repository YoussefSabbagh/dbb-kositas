import { useContext } from 'react';
import { Menu } from '@headlessui/react';
import DropdownLink from './DropdownLink';
import { signOut, useSession } from 'next-auth/react';
import Cookies from 'js-cookie';

import { Store } from '../../utils/context/Store';

const Dropdown = () => {
  const { data: session } = useSession();
  const { dispatch } = useContext(Store);

  const logoutClickHandler = () => {
    Cookies.remove('cart');
    dispatch({ type: 'CART_RESET' });
    signOut({ callbackUrl: '/' });
  };

  return (
    <Menu as="div" className="relative inline-block">
      <Menu.Button className="text-blue-600">{session.user.name}</Menu.Button>
      <Menu.Items className="absolute right-0 w-56 origin-top-right rounded bg-gray-100  shadow-lg ">
        <Menu.Item>
          <DropdownLink className="dropdown-link" href="/profile">
            Profile
          </DropdownLink>
        </Menu.Item>
        <Menu.Item>
          <DropdownLink className="dropdown-link" href="/order-history">
            Order History
          </DropdownLink>
        </Menu.Item>
        {session.user.isAdmin && (
          <Menu.Item>
            <DropdownLink className="dropdown-link" href="/admin/dashboard">
              Admin Dashboard
            </DropdownLink>
          </Menu.Item>
        )}
        <Menu.Item>
          <a className="dropdown-link" href="#" onClick={logoutClickHandler}>
            Logout
          </a>
        </Menu.Item>
      </Menu.Items>
    </Menu>
  );
};

export default Dropdown;
