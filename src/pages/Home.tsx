import {
  Card,
  Button,
  Form,
  Col,
  Row,
  Typography,
  Tag,
  Space,
  Slider,
  Empty,
  Flex,
  notification,
  AutoComplete,
} from "antd";
import Meta from "antd/es/card/Meta";
import { useProducts } from "../hooks/useProducts";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { useAppContext } from "../components/AppProvider";
import { useEffect } from "react";
import { useCart } from "../hooks/useCart";
const { Text, Title, Paragraph } = Typography;

export function Home({}) {
  const { categories, products } = useAppContext();
  const {
    filters,
    setFilters,
    search,
    visibleBrands,
    visibleNames,
    filterBrands,
    filterNames,
  } = useProducts();
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const onSearch = () => {
    navigate(
      {
        search: `?keyword=${encodeURIComponent(filters.keyword)}&minPrice=${
          filters.price[0]
        }&maxPrice=${filters.price[1]}&brand=${encodeURIComponent(
          filters.brand
        )}&categories=${encodeURIComponent(filters.categories.join(","))}`,
      },
      { replace: true }
    );
    search();
  };

  useEffect(() => {
    search();
  }, []);

  const handleChange = (tag: string, checked: boolean) => {
    const nextSelectedTags = checked
      ? [...filters.categories, tag]
      : filters.categories.filter((t) => t !== tag);
    console.log("You are interested in: ", nextSelectedTags);
    setFilters({ ...filters, categories: nextSelectedTags });
  };

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

  return (
    <>
      <Card style={{ marginTop: 16 }}>
        <Form layout="horizontal">
          <Row>
            <Col span={24}>
              <Form.Item label="Categories">
                {categories.map((category) => (
                  <Tag.CheckableTag
                    key={category}
                    checked={filters.categories.includes(category)}
                    onChange={(checked) => handleChange(category, checked)}
                  >
                    {category}
                  </Tag.CheckableTag>
                ))}
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col sm={7} xs={24}>
              <Form.Item label="Keyword">
                <AutoComplete
                  options={visibleNames}
                  allowClear
                  placeholder="Filter by keyword"
                  value={filters.keyword}
                  onSearch={filterNames}
                  onChange={(value) =>
                    setFilters({ ...filters, keyword: value })
                  }
                />
              </Form.Item>
            </Col>
            <Col sm={7} xs={24}>
              <Form.Item label="Brand">
                <AutoComplete
                  options={visibleBrands}
                  allowClear
                  placeholder="Filter by brand"
                  value={filters.brand}
                  onSearch={filterBrands}
                  onChange={(value) => setFilters({ ...filters, brand: value })}
                />
              </Form.Item>
            </Col>
            <Col sm={7} xs={24}>
              <Form.Item label="Price Range">
                <Slider
                  tooltip={{ open: true }}
                  range
                  min={0}
                  max={2000}
                  value={filters.price}
                  onChange={(value) =>
                    setFilters({ ...filters, price: value as [number, number] })
                  }
                />
              </Form.Item>
            </Col>
            <Col sm={3} xs={24}>
              <Form.Item style={{ textAlign: "center" }}>
                <Button type="primary" onClick={onSearch}>
                  Search
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Card>

      {products.length == 0 && (
        <Empty
          style={{ marginTop: 80, marginBottom: 80 }}
          description="No Products Available"
        ></Empty>
      )}

      <Row gutter={16} style={{ marginTop: 20 }}>
        {products.map((product) => (
          <Col
            xs={24}
            sm={12}
            md={8}
            lg={6}
            key={product.id}
            style={{ marginBottom: 16 }}
          >
            <Link to={`/product/${product.id}`}>
              <Card
                hoverable
                cover={
                  <img alt="example" height={240} src={product.thumbnail} />
                }
                actions={[
                  <Space
                    key="addCart"
                    style={{ color: "red" }}
                    onClick={(e) => {
                      e.preventDefault();
                      addToCart(product);
                      openNotification();
                    }}
                  >
                    <ShoppingCartOutlined />
                    Add to Cart
                  </Space>,
                ]}
              >
                <Meta
                  title={product.title}
                  description={
                    <Paragraph ellipsis={{ rows: 3 }} style={{ height: 60 }}>
                      {product.description}
                    </Paragraph>
                  }
                />
                <Title level={4} style={{ textAlign: "center" }}>
                  {new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                  }).format(
                    product.price * (1 - product.discountPercentage / 100)
                  )}
                </Title>
                <Flex justify="space-between">
                  <Text delete>
                    {new Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: "USD",
                    }).format(product.price)}
                  </Text>

                  <Text>{product.discountPercentage}% off</Text>
                </Flex>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </>
  );
}
