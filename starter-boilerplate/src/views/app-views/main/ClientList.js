import React, { useState, useEffect } from 'react';
import { Table} from 'antd';
import { Link } from 'react-router-dom';
import { API_USER_URL } from "../../../configs/AppConfig";
import Loading from "../../../components/shared-components/Loading";

const ClientList = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(`${API_USER_URL}/users`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Ошибка загрузки данных');
        }
        return response.json();
      })
      .then(data => {
        setClients(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Произошла ошибка:', error.message);
        setLoading(false);
      });
  }, []);

  const columns = [
    { title: '№', dataIndex: 'id', key: 'id' },
    { title: 'Имя', dataIndex: 'name', key: 'name' },
    { title: 'Email', dataIndex: 'email', key: 'email' },
    { title: 'Телефон', dataIndex: 'phone', key: 'phone' },
    {
      title: 'Адрес',
      key: 'address',
      render: (text, record) => (
        <span>{record.address.street}, {record.address.suite}</span>
      ),
    },
    {
      title: 'Действия',
      key: 'action',
      render: (text, record) => {
        return (
          <Link to={`/app/main/clients/edit/${record.id}`}>
            <button className="edit-btn">Редактировать</button>
          </Link>
        );
      },
    }
  ];

  return (
    <div>
      <h2>Список клиентов</h2>
      {loading ? (
        <Loading cover="content"/>
      ) : (
        <Table columns={columns} dataSource={clients} rowKey="id" />
      )}
    </div>
  );
};

export default ClientList;
