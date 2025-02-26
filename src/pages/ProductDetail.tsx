import React from 'react';
import { useParams } from 'react-router-dom';
import { Card, Button, message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { Heart, ShoppingCart } from 'lucide-react';
import { products } from '../data/products';
import { addToCart } from '../store/slices/cartSlice';
import { addToWishlist } from '../store/slices/wishlistSlice';
import { RootState } from '../store';

const ProductDetail: React.FC = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  const product = products.find(p => p.id === Number(id));

  if (!product) {
    return <div>Product not found</div>;
  }

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      message.error('Please login to add items to cart');
      return;
    }
    dispatch(addToCart(product));
    message.success('Added to cart');
  };

  const handleAddToWishlist = () => {
    if (!isAuthenticated) {
      message.error('Please login to add items to wishlist');
      return;
    }
    dispatch(addToWishlist(product));
    message.success('Added to wishlist');
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Card>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-96 object-cover rounded"
            />
          </div>
          <div>
            <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
            <p className="text-gray-600 mb-4">{product.description}</p>
            <p className="text-2xl font-bold mb-6">${product.price}</p>
            <div className="space-y-4">
              <Button
                type="primary"
                icon={<ShoppingCart size={16} />}
                onClick={handleAddToCart}
                block
              >
                Add to Cart
              </Button>
              <Button
                icon={<Heart size={16} />}
                onClick={handleAddToWishlist}
                block
              >
                Add to Wishlist
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ProductDetail;