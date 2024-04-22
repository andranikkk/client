import { MainLayout } from "../../components/mainLayout";
import { Link, useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";
// import { selectUser } from "../../features/auth/authSlice";
import { useRegisterMutation } from "../../app/services/auth";
import { Card, Form, Row, Space, Typography } from "antd";
import CustomInput from "../../components/custom-input";
import { Paths } from "../../app/paths";
import PasswordInput from "../../components/password-input/input";
import CustomButton from "../../components/custom-button";
// import { User } from "@prisma/client";
type User = {
  id: string;
  email: string;
  password: string;
  name: string;
  isBlocked: boolean;
  createdAt: Date;
};

type RegisterData = Omit<User, "id"> & { confirmPassword: string };

const Register = () => {
  const navigate = useNavigate();
  // const user = useSelector(selectUser);
  const [registerUser] = useRegisterMutation();

  const register = async (data: RegisterData) => {
    try {
      await registerUser(data).unwrap();

      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <MainLayout>
      <Row align="middle" justify="center">
        <Card title="Зарегистрируйтесь" style={{ width: "30rem" }}>
          <Form onFinish={register}>
            <CustomInput name="name" placeholder="Имя" />
            <CustomInput type="email" name="email" placeholder="Email" />
            <PasswordInput name="password" placeholder="Пароль" />
            <PasswordInput
              name="confirmPassword"
              placeholder="Подтвердите пароль"
            />
            <CustomButton htmlType="submit" type="primary">
              Зарегистрироваться
            </CustomButton>
          </Form>
          <Space direction="vertical" size="large">
            <Typography.Text>
              Уже есть аккаунт? <Link to={Paths.login}>Войдите</Link>
            </Typography.Text>
          </Space>
        </Card>
      </Row>
    </MainLayout>
  );
};

export default Register;
