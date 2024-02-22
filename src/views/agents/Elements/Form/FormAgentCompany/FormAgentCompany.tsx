import { Col, Form, Input, Row, Select } from 'antd';
import { useEffect, useMemo } from 'react';
import { ActionForm } from '@/components/buttons/ActionForm/ActionForm';
import { ModalForm } from '@/components/modal/modalForm/ModalForm';
import { ActionCrud } from '@/Global';
import { AgentCompanyForm } from '@/types/Agents';
import { useCrudServices } from '@/hooks/useCrudServices';
import { Company } from '@/types/company';

interface Props {
  show: boolean;
  onClose: () => void;
  initialForm: AgentCompanyForm;
  onSubmit: (value: AgentCompanyForm) => void;
  loading: boolean;
  modeForm: ActionCrud;
  idsCompanyNotAvalaible: (number | undefined)[];
}

export const FormAgentCompany = ({
  show,
  onClose,
  initialForm,
  onSubmit,
  loading,
  modeForm,
  idsCompanyNotAvalaible,
}: Props) => {
  const { list } = useCrudServices<Company>({
    path: 'companies',
    pagination: {
      page: 1,
      pageSize: 100,
    },
  });

  const options_company = useMemo(() => {
    return list
      .filter((value) => {
        if (idsCompanyNotAvalaible.includes(value.id)) return true;

        return value.active;
      })
      .map((value) => ({ label: value.name, value: value.id }));
  }, [list, idsCompanyNotAvalaible]);

  const [form] = Form.useForm();

  const handleSubmit = (value: AgentCompanyForm) => {
    const companyFind = list.find((company) => company.id === value.idCompany);
    onSubmit({
      ...value,
      company: companyFind,
    });
  };

  useEffect(() => {
    if (!show) form.resetFields();

    form.setFieldsValue(initialForm);
  }, [show, form, initialForm]);

  return (
    <>
      <ModalForm
        show={show}
        onClose={onClose}
        title={
          modeForm === 'new' ? 'Agregar un nuevo codigo de agente' : 'Editando Codigo de Agente'
        }
        loading={loading}
        footer={<ActionForm onCancel={onClose} onSubmit={() => form.submit()} hiddenCheck />}
        size="md"
      >
        <Form name="plan" autoComplete="off" layout="vertical" form={form} onFinish={handleSubmit}>
          <Row gutter={[8, 0]}>
            <Col span={24}>
              <Form.Item
                label="Codigo del Agente"
                name="code"
                rules={[{ required: true, message: 'Campo Requerido' }]}
              >
                <Input placeholder="Codigo" />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                label="Compañia"
                name="idCompany"
                rules={[{ required: true, message: 'Campo Requerido' }]}
              >
                <Select
                  options={options_company}
                  placeholder="seleccione una compañia"
                  showSearch
                  filterOption={(input, option) =>
                    (option?.label.toLowerCase() ?? '').includes(input.toLowerCase())
                  }
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </ModalForm>
    </>
  );
};
