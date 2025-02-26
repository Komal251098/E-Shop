import React from "react";
import { Layout as AntLayout, Button } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";
import { logout } from "../store/slices/authSlice";
import { ShoppingCart, Heart, Home, LogIn, LogOut } from "lucide-react";

const { Header, Content } = AntLayout;

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <AntLayout className="min-h-screen">
      <Header className="flex items-center justify-between bg-white px-4">
        <div className="flex items-center space-x-8">
          <Link to="/" className="text-2xl font-bold">
            E-Shop
          </Link>
          <nav className="flex items-center space-x-6">
            <Link
              to="/"
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
            >
              <Home size={16} />
              <span>Home</span>
            </Link>
            {isAuthenticated && (
              <>
                <Link
                  to="/cart"
                  className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
                >
                  <ShoppingCart size={16} />
                  <span>Cart</span>
                </Link>
                <Link
                  to="/wishlist"
                  className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
                >
                  <Heart size={16} />
                  <span>Wishlist</span>
                </Link>
              </>
            )}
          </nav>
        </div>
        <div>
          {isAuthenticated ? (
            <Button
              type="primary"
              icon={<LogOut size={16} />}
              onClick={handleLogout}
              className="flex items-center"
            >
              Logout
            </Button>
          ) : (
            <Button
              type="primary"
              icon={<LogIn size={16} />}
              onClick={() => navigate("/login")}
              className="flex items-center"
            >
              Login
            </Button>
          )}
        </div>
      </Header>
      <Content className="p-8">{children}</Content>
    </AntLayout>
  );
};

export default Layout;
