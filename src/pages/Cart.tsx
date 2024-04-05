import {
  Button,
  Card,
  InputNumber,
  Row,
  Col,
  Image,
  Space,
  Typography,
  Empty,
} from "antd";
import { useCart } from "../hooks/useCart";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAppContext } from "../components/AppProvider";
const { Title, Text } = Typography;

const Cart = () => {
  const navigate = useNavigate();
  const { cartItems, removeFromCart, updateQuantity } = useCart();
  const { loggedIn } = useAppContext();
  const totalPrice = cartItems.reduce((total, item) => {
    return (
      total + item.price * (1 - item.discountPercentage / 100.0) * item.quantity
    );
  }, 0);

  useEffect(() => {
    if (!loggedIn) {
      navigate("/");
    }
  }, []);
  return (
    <Card title="Your Cart" style={{ marginTop: 24, padding: "16px" }}>
      {cartItems.length == 0 && (
        <Empty
          description="Your cart is empty. Let's go shopping!"
          style={{ marginTop: 40, marginBottom: 40 }}
        >
          <Button type="primary" onClick={() => navigate("/")}>
            Go to Home
          </Button>
        </Empty>
      )}
      {cartItems.map((item) => (
        <Card
          key={item.id}
          bordered={false}
          size="small"
          hoverable
          style={{ marginBottom: 16 }}
        >
          <Row gutter={16} align="middle">
            <Col sm={3}>
              <Image src={item.thumbnail} />
            </Col>
            <Col sm={8} xs={24}>
              <Title level={4}>{item.title}</Title>
            </Col>
            <Col sm={4}>
              <Text>{`Price: $${item.price}`}</Text>
              <br />
              <Text type="secondary">{`Discount: ${item.discountPercentage}%`}</Text>
            </Col>
            <Col sm={4}>
              <Text>{`Sub Total Price: $${(
                item.price *
                (1 - item.discountPercentage / 100.0) *
                item.quantity
              ).toFixed(2)}`}</Text>
            </Col>
            <Col sm={4}>
              <Space style={{ marginTop: 12, marginBottom: 12 }}>
                <InputNumber
                  min={1}
                  value={item.quantity}
                  onChange={(value) => updateQuantity(item.id, value)}
                />
                <Button onClick={() => removeFromCart(item.id)} type="primary">
                  Remove
                </Button>
              </Space>
            </Col>
          </Row>
        </Card>
      ))}

      <Title
        style={{ textAlign: "right" }}
        level={4}
      >{`Total Price: $${totalPrice.toFixed(2)}`}</Title>
    </Card>
  );
};

export default Cart;
