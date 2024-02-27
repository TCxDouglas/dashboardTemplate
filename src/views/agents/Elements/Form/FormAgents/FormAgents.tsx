/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable react-hooks/exhaustive-deps */
import { Col, Form, Input, Row } from 'antd';
import { useEffect } from 'react';
import { ActionForm } from '@/components/buttons/ActionForm/ActionForm';
import { ModalForm } from '@/components/modal/modalForm/ModalForm';
import { ProductForm } from '@/types/Product';

interface Props {
  show: boolean;
  onClose: () => void;
  initialForm: ProductForm;
  onSubmit: (value: ProductForm) => void;
  loading: boolean;
  idAgent?: number;
}

export const FormAgents = ({ show, onClose, initialForm, onSubmit, loading, idAgent }: Props) => {
  const [form] = Form.useForm<ProductForm>();


  const handleSubmit = (value: ProductForm) => {
    onSubmit(value);
  };

  useEffect(() => {
    if (!show) {
      form.resetFields();
    }
    form.setFieldsValue(initialForm);
  }, [show, form, initialForm]);

  return (
    <>
      <ModalForm
        show={show}
        onClose={onClose}
        title={idAgent ? 'Editando Agente' : 'Agregando Nuevo Agente'}
        loading={loading}
        footer={
          <ActionForm
            labelSwicth="Estado del Agente"
            onCancel={onClose}
            onSubmit={() => form.submit()}
            hiddenCheck
          />
        }
      >
        <Form
          name="Agents"
          autoComplete="off"
          layout="vertical"
          form={form}
          onFinish={handleSubmit}
        >
          <Row gutter={[8, 0]}>
            <Col span={12}>
              <Form.Item
                label="Nombre del Agente"
                name="name"
                rules={[{ required: true, message: 'Campo Requerido' }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Correo del Agente"
                name="email"
                rules={[
                  { required: true, message: 'Campo Requerido' },
                  { type: 'email', message: 'Ingrese un email valido' },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </ModalForm>
    </>
  );
};
