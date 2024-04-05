import { Layout } from "antd";
import { Route, Routes } from "react-router-dom";
import { ProductDetails } from "./pages/ProductDetails";
import { Home } from "./pages/Home";
import { PageHeader } from "./components/PageHeader";
import Cart from "./pages/Cart";
import "./App.css";
const { Header, Content, Footer } = Layout;

function App() {
  return (
    <Layout>
      <Header
        className="content"
        style={{
          position: "sticky",
          top: 0,
          zIndex: 1,
          width: "100%",
          display: "flex",
          alignItems: "center",
          background: "white",
        }}
      >
        <PageHeader />
      </Header>
      <Content className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/product/:id" element={<ProductDetails />} />
        </Routes>
      </Content>
      <Footer style={{ textAlign: "center" }}>
        Online Shop ©{new Date().getFullYear()}
      </Footer>
    </Layout>
  );
}

export default App;
