import React, { useState, useEffect } from 'react';
import { Form, Avatar, Button, Input, DatePicker, Row, Col, message, Upload, Spin } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useParams, useHistory } from 'react-router-dom';
import { ROW_GUTTER } from 'constants/ThemeConstant';
import Flex from 'components/shared-components/Flex';

const EditProfile = () => {
  const { id } = useParams(); // Получаем ID пользователя из URL
  const history = useHistory();
  const [user, setUser] = useState({
    name: '',
    email: '',
    username: '',
    phone: '',
    website: '',
    address: '',
    city: '',
    postcode: '',
    avatarUrl: '/img/avatars/thumb-6.jpg', // Заглушка
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Ошибка загрузки пользователя');
        }
        return response.json();
      })
      .then(data => {
        console.log('Полученные данные:', data); // Отладка
        setUser({
          name: data.name,
          email: data.email,
          username: data.username,
          phone: data.phone,
          website: data.website,
          address: data.address.street,
          city: data.address.city,
          postcode: data.address.zipcode,
          avatarUrl: '/img/avatars/thumb-6.jpg',
        });
        setLoading(false);
      })
      .catch(error => {
        console.error('Произошла ошибка:', error.message);
        setLoading(false);
      });
  }, [id]);

  const onFinish = (values) => {
    setLoading(true);
    message.loading({ content: 'Сохранение...', key: 'save' });
    setTimeout(() => {
      setLoading(false);
      message.success({ content: 'Сохранено!', key: 'save', duration: 2 });
      history.push('/app/main/clients/list');
    }, 1000);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const onUploadAvatar = (info) => {
    if (info.file.status === 'done') {
      message.success({ content: 'Аватар загружен!', duration: 1.5 });
    }
  };

  const onRemoveAvatar = () => {
    setUser({ ...user, avatarUrl: '' });
  };

  return (
    <>
      {loading && <Spin size="large" style={{ display: 'block', textAlign: 'center', marginTop: 50 }} />}
      {!loading && (
        <>
          <Flex alignItems="center" mobileFlex={false} className="text-center text-md-left">
            <Avatar size={90} src={user.avatarUrl} icon={<UserOutlined />} />
            <div className="ml-md-3 mt-md-0 mt-3">
              <Upload onChange={onUploadAvatar} showUploadList={false} action="https://www.mocky.io/v2/5cc8019d300000980a055e76">
                <Button type="primary">Изменить аватар</Button>
              </Upload>
              <Button className="ml-2" onClick={onRemoveAvatar}>Удалить</Button>
            </div>
          </Flex>
          <div className="mt-4">
            <Form
              name="basicInformation"
              layout="vertical"
              initialValues={user}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
            >
              <Row>
                <Col xs={24} sm={24} md={24} lg={16}>
                  <Row gutter={ROW_GUTTER}>
                    <Col xs={24} sm={24} md={12}>
                      <Form.Item
                        label="Имя"
                        name="name"
                        rules={[{ required: true, message: 'Введите имя!' }]}
                      >
                        <Input />
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={12}>
                      <Form.Item
                        label="Username"
                        name="username"
                        rules={[{ required: true, message: 'Введите username!' }]}
                      >
                        <Input />
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={12}>
                      <Form.Item
                        label="Email"
                        name="email"
                        rules={[{ required: true, type: 'email', message: 'Введите корректный email!' }]}
                      >
                        <Input />
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={12}>
                      <Form.Item
                        label="Телефон"
                        name="phone"
                      >
                        <Input />
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={12}>
                      <Form.Item
                        label="Веб-сайт"
                        name="website"
                      >
                        <Input />
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={24}>
                      <Form.Item
                        label="Адрес"
                        name="address"
                      >
                        <Input />
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={12}>
                      <Form.Item
                        label="Город"
                        name="city"
                      >
                        <Input />
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={12}>
                      <Form.Item
                        label="Почтовый индекс"
                        name="postcode"
                      >
                        <Input />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Button type="primary" htmlType="submit" loading={loading}>
                    Сохранить изменения
                  </Button>
                </Col>
              </Row>
            </Form>
          </div>
        </>
      )}
    </>
  );
};

export default EditProfile;
