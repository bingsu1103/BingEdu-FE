import { useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  QuestionCircleOutlined,
  UserOutlined,
  BookOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu } from "antd";
import UserDashBoard from "./userDashBoard";
import { ConfigProvider, theme } from "antd";
const { Header, Sider, Content } = Layout;

const AdminDashBoardPage = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedKey, setSelectedKey] = useState("1");
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const renderContent = () => {
    switch (selectedKey) {
      case "1":
        return <UserDashBoard />;
      // case "2":
      //   return <LessonDashBoard />;
      // case "3":
      //   return <QBankingDashBoard />;
      default:
        return <div>Select a menu item</div>;
    }
  };
  return (
    <>
      <ConfigProvider
        theme={{
          algorithm: theme.darkAlgorithm,
        }}
      >
        <Layout style={{ minHeight: "100vh" }} className="w-full">
          <Sider
            trigger={null}
            breakpoint="md"
            collapsible
            collapsed={collapsed}
            onBreakpoint={(broken) => setCollapsed(broken)}
          >
            <div className="demo-logo-vertical" />
            <Menu
              theme="dark"
              mode="inline"
              defaultSelectedKeys={[selectedKey]}
              onClick={(e) => setSelectedKey(e.key)}
              items={[
                {
                  key: "1",
                  icon: <UserOutlined />,
                  label: "User",
                },
                {
                  key: "2",
                  icon: <BookOutlined />,
                  label: "Lesson",
                },
                {
                  key: "3",
                  icon: <QuestionCircleOutlined />,
                  label: "Q Banking",
                },
              ]}
            />
          </Sider>
          <Layout>
            <Header
              style={{
                padding: 0,
                background: colorBgContainer,
                backgroundColor: "#141414",
              }}
            >
              <Button
                type="text"
                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                onClick={() => setCollapsed(!collapsed)}
                style={{
                  fontSize: "16px",
                  width: 64,
                  height: 64,
                }}
              />
            </Header>
            <Content
              style={{
                margin: "24px 16px",
                padding: 24,
                minHeight: 280,
                background: colorBgContainer,
                borderRadius: borderRadiusLG,
                backgroundColor: "#141414",
              }}
            >
              {renderContent()}
            </Content>
          </Layout>
        </Layout>
      </ConfigProvider>
    </>
  );
};
export default AdminDashBoardPage;
