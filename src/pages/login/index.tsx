import { MainLayout } from "../../components/mainLayout";
import { Link, useNavigate } from "react-router-dom";
import { Card, Form, Row, Space, Typography } from "antd";
import { useLoginMutation, UserData } from "../../app/services/auth";
import { Paths } from "../../app/paths";

import CustomInput from "../../components/custom-input";
import PasswordInput from "../../components/password-input/input";
import CustomButton from "../../components/custom-button";

const Login = () => {
  const [loginUser] = useLoginMutation();
  const navigate = useNavigate();

  const login = async (data: UserData) => {
    try {
      await loginUser(data).unwrap();
      
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <MainLayout>
      <Row align="middle" justify="center">
        <Card title="Войдите" style={{ width: "30rem" }}>
          <Form onFinish={login}>
            <CustomInput type="email" name="email" placeholder="Email" />
            <PasswordInput name="password" placeholder="Пароль" />
            <CustomButton htmlType="submit" type="primary">
              Войти
            </CustomButton>
          </Form>
          <Space direction="vertical" size="large">
            <Typography.Text>
              Нет аккаунта? <Link to={Paths.register}>Зарегистрироваться</Link>
            </Typography.Text>
          </Space>
        </Card>
      </Row>
    </MainLayout>
  );
};

export default Login;
