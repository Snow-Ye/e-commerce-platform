import { Avatar, Button, Flex, Space, Badge, Dropdown, MenuProps } from "antd";
import LoginDialog from "./LoginDialog";
import { useAppContext } from "./AppProvider";
import {
  UserOutlined,
  ShoppingCartOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { useAuth } from "../hooks/useAuth";
import { Link, useLocation, useNavigate } from "react-router-dom";

export const PageHeader = () => {
  const { setLoginVisible, loggedIn, user, cartItems } = useAppContext();
  const { logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const countInCart = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const onClick: MenuProps["onClick"] = ({ key }) => {
    logout();
    if (location.pathname == "/cart") {
      navigate("/");
    }
  };

  const items: MenuProps["items"] = [
    {
      label: "Logout",
      key: "logout",
      icon: <LogoutOutlined />,
    },
  ];

  return (
    <Flex justify="space-between" style={{ width: "100%" }}>
      <Link to="/" style={{ display: "flex", alignItems: "center" }}>
        <img src={"/vite.svg"} alt="logo" style={{ width: "40px" }} />
        <div
          className="online-shop"
          style={{ fontSize: 18, color: "black", marginLeft: 12 }}
        >
          Online Shop
        </div>
      </Link>

      <LoginDialog />

      {loggedIn ? (
        <div style={{ display: "flex", alignItems: "center" }}>
          <Link to="/cart" style={{ display: "flex" }}>
            <Badge count={countInCart}>
              <ShoppingCartOutlined style={{ fontSize: "32px" }} />
            </Badge>
          </Link>
          <Dropdown menu={{ items, onClick }}>
            <a
              onClick={(e) => e.preventDefault()}
              style={{ display: "block", marginLeft: 32 }}
            >
              <Space style={{ height: 28 }}>
                <Avatar icon={<UserOutlined />} src={user?.image}></Avatar>
                <label>{user?.username}</label>
              </Space>
            </a>
          </Dropdown>
        </div>
      ) : (
        <div style={{ display: "flex", alignItems: "center" }}>
          <Button type="primary" onClick={() => setLoginVisible(true)}>
            Login
          </Button>
        </div>
      )}
    </Flex>
  );
};
