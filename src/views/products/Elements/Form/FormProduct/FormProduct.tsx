/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable react-hooks/exhaustive-deps */
import { Col, Form, Input, InputNumber, Row, Select } from 'antd';
import { useEffect, useMemo } from 'react';
import { ActionForm } from '@/components/buttons/ActionForm/ActionForm';
import { ModalForm } from '@/components/modal/modalForm/ModalForm';
import { ProductForm } from '@/types/Product';
import { useCrudServices } from '@/hooks/useCrudServices';
import { Category } from '@/types/Category';
import { DragImages } from '@/components/DragImages/DragImages';

interface Props {
  show: boolean;
  onClose: () => void;
  initialForm: ProductForm;
  onSubmit: (value: ProductForm) => void;
  loading: boolean;
  idAgent?: number;
}

export const FormProduct = ({ show, onClose, initialForm, onSubmit, loading, idAgent }: Props) => {
  const { list } = useCrudServices<Category>({
    path: 'categories'
  })
  const [form] = Form.useForm<ProductForm>();

  const options_category = useMemo(() => {
    return list.map(value => ({ label: value.name, value: value.id }))
  }, [list])

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
                label="Descripcion"
                name="description"
                rules={[{ required: true, message: 'Campo Requerido' }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Pais"
                name="country"
                rules={[{ required: true, message: 'Campo Requerido' }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Precio"
                name="price"
                rules={[{ required: true, message: 'Campo Requerido' }]}
              >
                <InputNumber style={{ width: '100%' }} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Categoria"
                name="category"
                rules={[{ required: true, message: 'Campo Requerido' }]}
              >
                <Select style={{ width: '100%' }} options={options_category} />
              </Form.Item>
            </Col>
            <Col span={24}>
              <DragImages listPhotos={[]} listPreview={[]} onChangePhotos={() => { }} onChangePreview={() => { }} />
            </Col>
          </Row>
        </Form>
      </ModalForm>
    </>
  );
};
