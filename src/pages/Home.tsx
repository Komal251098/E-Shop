import React from 'react';
import { Card, Row, Col, Button, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Heart, ShoppingCart } from 'lucide-react';
import { products } from '../data/products';
import { addToCart } from '../store/slices/cartSlice';
import { addToWishlist } from '../store/slices/wishlistSlice';
import { RootState } from '../store';

const { Meta } = Card;

const Home: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  const handleAddToCart = (product: any) => {
    if (!isAuthenticated) {
      message.error('Please login to add items to cart');
      return;
    }
    dispatch(addToCart(product));
    message.success('Added to cart');
  };

  const handleAddToWishlist = (product: any) => {
    if (!isAuthenticated) {
      message.error('Please login to add items to wishlist');
      return;
    }
    dispatch(addToWishlist(product));
    message.success('Added to wishlist');
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Products</h1>
      <Row gutter={[16, 16]}>
        {products.map((product) => (
          <Col xs={24} sm={12} md={8} lg={6} key={product.id}>
            <Card
              hoverable
              cover={
                <img
                  alt={product.name}
                  src={product.image}
                  className="h-48 object-cover"
                  onClick={() => navigate(`/product/${product.id}`)}
                />
              }
              actions={[
                <Button 
                  icon={<Heart size={16} />}
                  onClick={() => handleAddToWishlist(product)}
                >
                  Wishlist
                </Button>,
                <Button 
                  icon={<ShoppingCart size={16} />}
                  onClick={() => handleAddToCart(product)}
                >
                  Cart
                </Button>
              ]}
            >
              <Meta
                title={product.name}
                description={
                  <div>
                    <p>{product.description}</p>
                    <p className="text-lg font-bold">${product.price}</p>
                  </div>
                }
              />
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Home;