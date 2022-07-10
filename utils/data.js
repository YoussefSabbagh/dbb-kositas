import bcrypt from 'bcryptjs';

const data = {
  users: [
    {
      name: 'Youssef',
      email: 'yo@correo.com',
      password: bcrypt.hashSync('123456'),
      isAdmin: true,
    },
    {
      name: 'John',
      email: 'admin@example.com',
      password: bcrypt.hashSync('123456'),
      isAdmin: true,
    },
    {
      name: 'Jane',
      email: 'user@example.com',
      password: bcrypt.hashSync('123456'),
      isAdmin: false,
    },
  ],
  products: [
    {
      name: 'producto 1',
      providerCode: 'P001',
      dBBKositasCode: 'P001',
      slug: 'product-1',
      category: 'toys',
      image: '/images/p1.jpg',
      brand: 'Mattel',
      price: 9.99,
      rating: 4,
      nunReviews: 10,
      countInStock: 10,
      description:
        'Product 1 large description about all caracteristic of de product',
    },
    {
      name: 'producto 2',
      providerCode: 'P002',
      dBBKositasCode: 'P002',
      slug: 'product-2',
      category: 'toys',
      image: '/images/p2.jpg',
      brand: 'Hasbro',
      price: 9.99,
      rating: 4.5,
      nunReviews: 20,
      countInStock: 2,
      description:
        'Product 2 large description about all caracteristic of de product',
    },
    {
      name: 'producto 3',
      providerCode: 'P003',
      dBBKositasCode: 'P003',
      slug: 'product-3',
      category: 'toys',
      image: '/images/p1.jpg',
      brand: 'Lego',
      price: 9.99,
      rating: 3.5,
      nunReviews: 12,
      countInStock: 5,
      description:
        'Product 3 large description about all caracteristic of de product',
    },
    {
      name: 'producto 4',
      providerCode: 'P004',
      dBBKositasCode: 'P004',
      slug: 'product-4',
      category: 'toys',
      image: '/images/p2.jpg',
      brand: 'Intek',
      price: 9.99,
      rating: 2.5,
      nunReviews: 2,
      countInStock: 0,
      description:
        'Product 4 large description about all caracteristic of de product',
    },
  ],
};

export default data;
