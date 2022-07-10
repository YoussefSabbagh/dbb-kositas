import { useContext } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';
import axios from 'axios';

import { FaArrowAltCircleLeft } from 'react-icons/fa';
import Layout from '../../components/Layout';
// import data from '../../utils/data';
import { Store } from '../../utils/context/Store';
import Product from '../../models/products';
import db from '../../utils/db';

const ProductDetail = ({ product }) => {
  const { state, dispatch } = useContext(Store);
  const router = useRouter();

  if (!product) {
    return (
      <Layout title="Produt Not Found">
        <h1 className="text-red-400 text-center text-2xl">Produt Not Found</h1>
      </Layout>
    );
  }

  const addToCartHandler = async () => {
    const existItem = state.cart.cartItems.find((x) => x.slug === product.slug);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${product._id}`);

    if (data.countInStock < quantity) {
      return alert('Sorry. Product is out of stock');
    }

    dispatch({ type: 'CART_ADD_ITEM', payload: { ...product, quantity } });
    router.push('/cart');
  };

  return (
    <Layout title={product.name}>
      <div className="py-2">
        <Link href="/">
          <p className="flex items-center">
            <FaArrowAltCircleLeft className="mr-2 text-blue-500 text-2xl" />{' '}
            <span> back to products </span>
          </p>
        </Link>
      </div>
      <div className="grid md:grid-cols-4 md:gap-3">
        <div className="md:col-span-2">
          <Image
            src={product.image}
            alt={product.name}
            width={640}
            height={640}
            layout="responsive"
          />
        </div>

        <div>
          <ul>
            <li>
              <h1 className="text-lg text-blue-500">{product.name}</h1>
            </li>
            <li>Category: {product.category}</li>
            <li>Brand: {product.brand}</li>
            <li>
              {product.rating} of {product.nunReviews} reviews
            </li>
            <li>Description: {product.description}</li>
          </ul>
        </div>

        <div>
          <div className="card p-5">
            <div className="mb-2 flex justify-between">
              <p>Price</p>
              <p>${product.price}</p>
            </div>
            <div className="mb-2 flex justify-between">
              <p>Status</p>
              <p>{product.countInStock > 0 ? 'In Stock' : 'Unavailable'}</p>
            </div>
            <button
              className="primary-button w-full"
              onClick={addToCartHandler}
            >
              add to cart
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export async function getServerSideProps(context) {
  const { params } = context;
  const { slug } = params;

  await db.connect();
  const product = await Product.findOne({ slug }).lean();
  await db.disconnect();
  return {
    props: {
      product: product ? db.convertDocToObj(product) : null,
    },
  };
}

export default ProductDetail;
