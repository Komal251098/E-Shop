import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Card, Button, Empty } from 'antd';
import { ShoppingCart, Trash2 } from 'lucide-react';
import { RootState } from '../store';
import { removeFromWishlist } from '../store/slices/wishlistSlice';
import { addToCart } from '../store/slices/cartSlice';

const { Meta } = Card;

const Wishlist: React.FC = () => {
  const dispatch = useDispatch();
  const wishlistItems = useSelector((state: RootState) => state.wishlist.items);

  if (wishlistItems.length === 0) {
    return (
      <div className="text-center py-8">
        <Empty description="Your wishlist is empty" />
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Wishlist</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {wishlistItems.map((item) => (
          <Card
            key={item.id}
            cover={
              <img
                alt={item.name}
                src={item.image}
                className="h-48 object-cover"
              />
            }
            actions={[
              <Button
                icon={<ShoppingCart size={16} />}
                onClick={() => dispatch(addToCart(item))}
              >
                Add to Cart
              </Button>,
              <Button
                danger
                icon={<Trash2 size={16} />}
                onClick={() => dispatch(removeFromWishlist(item.id))}
              >
                Remove
              </Button>
            ]}
          >
            <Meta
              title={item.name}
              description={
                <div>
                  <p>{item.description}</p>
                  <p className="text-lg font-bold">${item.price}</p>
                </div>
              }
            />
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Wishlist;