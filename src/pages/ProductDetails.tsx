import { useEffect, useState } from "react";
import {
  Card,
  Typography,
  Rate,
  Tag,
  Col,
  Row,
  Space,
  Button,
  notification,
} from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { Product } from "../types";
import { useCart } from "../hooks/useCart";
import { ShoppingCartOutlined } from "@ant-design/icons";

const { Title, Paragraph } = Typography;

export const ProductDetails = () => {
  const [product, setProduct] = useState<Product | null>(null);
  const { id } = useParams();
  const { addToCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProductDetails = async () => {
      fetch(`https://dummyjson.com/products/${id}`)
        .then((res) => res.json())
        .then((product) => {
          setProduct(product);
        });
    };

    fetchProductDetails();
  }, [id]);

  const openNotification = () => {
    notification.open({
      duration: 3,
      message: "Product Added",
      placement: "bottomRight",
      description: "The product has been added to your cart.",
      btn: (
        <Button type="primary" onClick={() => navigate("/cart")}>
          Go to Cart
        </Button>
      ),
    });
  };

  return product ? (
    <Space direction="vertical" style={{ width: "100%" }} size="large">
      <Card style={{ width: "100%", marginTop: 24 }}>
        <Row gutter={24}>
          <Col xs={24} sm={12}>
            <img
              src={product.thumbnail}
              alt="Product thumbnail"
              style={{ width: "100%" }}
            />``
          </Col>
          <Col xs={24} sm={12}>
            <Space direction="vertical" style={{ width: "100%" }}>
              <Title level={2}>{product.title}</Title>
              <Rate disabled defaultValue={product.rating} />
              <Paragraph>{product.description}</Paragraph>
              <Paragraph>
                Price:
                <Typography.Text delete>
                  {new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                  }).format(product.price)}
                </Typography.Text>
                <Paragraph>Discount: {product.discountPercentage}%</Paragraph>
                <Typography.Title>
                  {new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                  }).format(
                    product.price * (1 - product.discountPercentage / 100)
                  )}
                </Typography.Title>
              </Paragraph>
              {/* <Paragraph>Stock: {product.stock}</Paragraph> */}
              <div>
                <Tag color="blue">{product.brand}</Tag>
                <Tag color="green">{product.category}</Tag>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: 16,
                }}
              >
                <Button
                  type="primary"
                  size="large"
                  onClick={() => {
                    addToCart(product);
                    openNotification();
                  }}
                  icon={<ShoppingCartOutlined />}
                >
                  Add to Cart
                </Button>
              </div>
            </Space>
          </Col>
        </Row>
      </Card>

      {/* Display other images */}
      {product.images.map((image, index) => (
        <img key={index} src={image} alt="product" style={{ width: "100%" }} />
      ))}
    </Space>
  ) : (
    <p>Loading...</p>
  );
};

export default ProductDetails;
