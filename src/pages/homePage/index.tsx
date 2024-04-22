import { useEffect, useState } from "react";
import { MainLayout } from "../../components/mainLayout";
import { Table, Checkbox, Button, message } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/auth/authSlice";
import { User } from "@prisma/client";
import {
  useBlockUserMutation,
  useGetAllUsersQuery,
  useRemoveUserMutation,
  useUnblockUserMutation,
} from "../../app/services/users";
import { CheckboxChangeEvent } from "antd/es/checkbox";
import { format } from "date-fns";
// type User = {
//   id: string;
//   email: string;
//   password: string;
//   name: string;
//   isBlocked: boolean;
//   createdAt: Date;
// };

const HomePage = () => {
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const { data, isLoading } = useGetAllUsersQuery();
  const [removeUser] = useRemoveUserMutation();
  const [blockUser] = useBlockUserMutation();
  const [unblockUser] = useUnblockUserMutation();
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  const onSelectChange = (selectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(selectedRowKeys);
  };

  const onSelectAllChange = (e: CheckboxChangeEvent) => {
    if (data && e.target.checked) {
      const allUserIds = data.map((user) => user.id);
      setSelectedRowKeys(allUserIds);
    } else {
      setSelectedRowKeys([]);
    }
  };

  const handleRemoveUsers = async () => {
    try {
      if (selectedRowKeys.length > 0) {
        const idsString = selectedRowKeys.join(",");
        await removeUser(idsString).unwrap();
        window.location.reload();
        setSelectedRowKeys([]);
      } else {
        console.log("Выберите пользователей для удаления");
      }
    } catch (error) {
      console.log("Ошибка при удалении пользователей");
    }
  };

  const handleBlockUsers = async () => {
    try {
      if (selectedRowKeys.length > 0) {
        const idsString = selectedRowKeys.join(",");
        await blockUser(idsString).unwrap();
        window.location.reload();
        setSelectedRowKeys([]);
      } else {
        message.warning("Выберите пользователей для блокировки");
      }
    } catch (error) {
      console.log("Ошибка при блокировке пользователей", error);
      message.error("Ошибка при блокировке пользователей");
    }
  };

  const handleUnblockUsers = async () => {
    try {
      if (selectedRowKeys.length > 0) {
        const idsString = selectedRowKeys.join(",");
        await unblockUser(idsString).unwrap();
        window.location.reload();
        setSelectedRowKeys([]);
      } else {
        message.warning("Выберите пользователей для разблокировки");
      }
    } catch (error) {
      console.log("Ошибка при разблокировке пользователей", error);
      message.error("Ошибка при разблокировке пользователей");
    }
  };

  const columns: ColumnsType<User> = [
    {
      title: "Идентификатор",
      key: "id",
      render: (text, record, index) => index + 1,
    },
    {
      title: "ID",
      key: "id",
      dataIndex: 'id'  
    },
    {
      title: "Имя",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Дата регистрации/входа",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (createdAt: string) =>
        format(new Date(createdAt), "dd.MM.yyyy HH:mm:ss"),
    },
    {
      title: "Статус",
      dataIndex: "isBlocked",
      key: "isBlocked",
      render: (isBlocked: boolean) => (isBlocked ? "Blocked" : "Unblocked"),
    },
  ];

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
    fixed: true,
    columnTitle: <Checkbox onChange={onSelectAllChange} />,
  };

  return (
    <MainLayout>
      <div style={{ marginBottom: 16 }}>
        <Button
          type="primary"
          onClick={handleBlockUsers}
          disabled={
            selectedRowKeys.length === 0 ||
            isLoading ||
            user?.isBlocked === true
          }
        >
          {isLoading ? "Блокировка..." : "Заблокировать"}
        </Button>
        <Button
          type="primary"
          onClick={handleUnblockUsers}
          disabled={
            selectedRowKeys.length === 0 ||
            isLoading ||
            user?.isBlocked === true
          }
          style={{ marginLeft: 8 }}
        >
          {isLoading ? "Разблокировка..." : "Разблокировать"}
        </Button>
        <Button
          type="primary"
          onClick={handleRemoveUsers}
          disabled={selectedRowKeys.length === 0 || isLoading}
          style={{ margin: "7px" }}
        >
          {isLoading ? "Удаление..." : "Удалить"}
        </Button>
      </div>
      <Table
        loading={isLoading}
        rowKey={(record) => record.id}
        columns={columns}
        dataSource={data}
        pagination={false}
        rowSelection={{
          type: "checkbox",
          ...rowSelection,
        }}
      />
    </MainLayout>
  );
};

export default HomePage;
