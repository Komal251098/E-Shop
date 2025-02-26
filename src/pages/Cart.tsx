import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Card, Button, InputNumber, Empty } from 'antd';
import { Trash2 } from 'lucide-react';
import { RootState } from '../store';
import { removeFromCart, updateQuantity } from '../store/slices/cartSlice';

const Cart: React.FC = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (cartItems.length === 0) {
    return (
      <div className="text-center py-8">
        <Empty description="Your cart is empty" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
      <div className="space-y-4">
        {cartItems.map((item) => (
          <Card key={item.id}>
            <div className="flex items-center">
              <img
                src={item.image}
                alt={item.name}
                className="w-24 h-24 object-cover rounded"
              />
              <div className="flex-grow ml-4">
                <h3 className="text-lg font-semibold">{item.name}</h3>
                <p className="text-gray-600">${item.price}</p>
              </div>
              <div className="flex items-center space-x-4">
                <InputNumber
                  min={1}
                  value={item.quantity}
                  onChange={(value) => dispatch(updateQuantity({ id: item.id, quantity: value || 1 }))}
                />
                <Button
                  danger
                  icon={<Trash2 size={16} />}
                  onClick={() => dispatch(removeFromCart(item.id))}
                />
              </div>
            </div>
          </Card>
        ))}
      </div>
      <div className="mt-8 text-right">
        <p className="text-2xl font-bold">Total: ${total.toFixed(2)}</p>
        <Button type="primary" size="large" className="mt-4">
          Checkout
        </Button>
      </div>
    </div>
  );
};

export default Cart;