import { useState } from 'react';
import { Button, Form, Input, message } from 'antd';
import Image from 'next/image';
import { useRouter } from 'next/router';
import styles from './styles.module.css';
import { FormLogin } from '@/types/Auth';
import { useAuth } from '@/hooks/useAuth';

export const LoginView = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm<FormLogin>();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { login } = useAuth();
  const loginUser = async (value: FormLogin) => {
    try {
      setLoading(true);
      const resLogin = await login(value);

      if (resLogin) await router.push('/products');
    } catch (error) {
      setLoading(false);
      await messageApi.error('Usuario o Contraseña invalida');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.contentLogin}>
      {contextHolder}
      <div className={styles.contentForm}>
        <h1 className={styles.title}>Acceda a la plataforma</h1>
        <p className={styles.subTitle}>Coloque sus credenciales para poder acceder.</p>

        <div className={styles.containerForm}>
          <Form
            name="test"
            autoComplete="off"
            layout="vertical"
            form={form}
            onFinish={(value) => loginUser(value)}
          >
            <Form.Item<FormLogin>
              label="Email o Username"
              name="identifier"
              rules={[{ required: true, message: 'Por favor, ingrese su correo o usuario' }]}
              className={styles.label}
            >
              <Input placeholder="Digite su correo o username" size="large" />
            </Form.Item>

            <Form.Item<FormLogin>
              label="Contraseña"
              name="password"
              rules={[{ required: true, message: 'Por favor, ingrese una contraseña' }]}
              className={styles.label}
            >
              <Input.Password placeholder="Digite su contraseña" size="large" />
            </Form.Item>

            <Form.Item className={styles.buttonSubmit}>
              <Button type="primary" htmlType="submit" size="large" loading={loading}>
                Entrar
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
      <div className={styles.contentImage}>
        <Image src="/images/login.webp" alt="Image Login" width="800" height="700" />
      </div>
    </div>
  );
};
