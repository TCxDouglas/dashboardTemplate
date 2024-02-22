/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Col, Form, Input, Row, message } from 'antd';
import { useEffect, useMemo, useState } from 'react';
import { TableAgentCompany } from '../../Table/TableAgentCompany';
import { FormAgentCompany } from '../FormAgentCompany/FormAgentCompany';
import styles from './FormAgents.module.css';
import { ActionForm } from '@/components/buttons/ActionForm/ActionForm';
import { ModalForm } from '@/components/modal/modalForm/ModalForm';
import { AgentCompany, AgentCompanyCache, AgentCompanyForm, AgentForm } from '@/types/Agents';
import { useFormController } from '@/hooks/useFormController';
import { useCrudServices } from '@/hooks/useCrudServices';
import { generateUID } from '@/utils/token';
import { ModalErrorsRelations } from '@/components/modal/modalErrorRelations/ModalErrorsRelations';

interface Props {
  show: boolean;
  onClose: () => void;
  initialForm: AgentForm;
  onSubmit: (value: AgentForm) => void;
  loading: boolean;
  idAgent?: number;
}

export const FormAgents = ({ show, onClose, initialForm, onSubmit, loading, idAgent }: Props) => {
  const {
    list: listAgentCompany,
    getList: getAgentsCompany,
    create,
    update,
    loadingAction,
    loadingGet,
    deleteItem,
  } = useCrudServices<AgentCompany>({
    path: 'agent-companies',
    initialParams: {
      'filters[agent][id]': `${idAgent}`,
      'populate': 'company',
    },
    initialGet: false,
  });
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm<AgentForm>();
  const [status, setStatus] = useState(initialForm.active);
  const [newsAgentCompany, setNewAgentCompany] = useState<Array<AgentCompanyCache>>([]);

  const {
    openModal,
    resetController,
    modalActive,
    formValue,
    activeEditMode,
    modeForm,
    selectRow,
    activeModeError,
    errorRelations,
    showError,
  } = useFormController<AgentCompanyForm, AgentCompanyCache | AgentCompany>({
    initial_form: {
      code: '',
      company: undefined,
      idCompany: undefined,
    },
  });

  const listPlanCompany = useMemo(() => {
    if (idAgent) return listAgentCompany;

    return newsAgentCompany;
  }, [listAgentCompany, newsAgentCompany]);

  const listIdCompany = useMemo(() => {
    const ids = listPlanCompany.map((value) => value.company?.id);
    if (selectRow?.company?.id)
      return ids.filter((idCompany) => idCompany === selectRow?.company?.id);

    return [];
  }, [listPlanCompany, selectRow]);

  const handleSubmit = (value: AgentForm) => {
    if (!idAgent && newsAgentCompany.length === 0) {
      messageApi.warning('Debe ingresar al menos un codigo de agente');

      return;
    }
    let payload: AgentForm = {
      ...value,
      active: status,
    };
    if (!idAgent) {
      payload = {
        ...payload,
        agentCompanies: newsAgentCompany.map((value) => ({
          code: value.code,
          company: value.company,
          idCompany: value.idCompany,
        })),
      };
    }

    onSubmit(payload);
  };

  const submitAgent = (value: AgentCompanyForm) => {
    if (idAgent) {
      if (modeForm === 'new') {
        createAgentCompany(value);

        return;
      }
      if (modeForm === 'edit') {
        updateAgentCompany(value);

        return;
      }
    }
    if (modeForm === 'new')
      setNewAgentCompany([...newsAgentCompany, { ...value, uid: generateUID() }]);
    if (modeForm === 'edit') {
      const row = selectRow as AgentCompanyCache;
      const filterPlan = newsAgentCompany.filter((value) => value.uid !== row.uid);

      setNewAgentCompany([...filterPlan, { ...value, uid: row.uid }]);
    }
    resetAgentCompany();
  };

  const createAgentCompany = async (value: AgentCompanyForm) => {
    const resCreate = await create({ data: { ...value, agent: idAgent } });
    if (resCreate) {
      messageApi.success('Codigo de Agente Creado con exito');

      resetAgentCompany();
    }
  };

  const updateAgentCompany = async (value: AgentCompanyForm) => {
    const row = selectRow as AgentCompany;

    const resUpdate = await update(row.id, { data: value });

    if (resUpdate) {
      messageApi.success('Codigo de Agente Actualizado');

      resetAgentCompany();
    }
  };

  const selectAgentCompany = (value: AgentCompanyCache | AgentCompany) => {
    activeEditMode(
      {
        code: value.code,
        company: value.company,
        idCompany: value.company?.id,
      },
      value,
    );
  };

  const selectDeleteAgentCompany = (value: AgentCompanyCache | AgentCompany) => {
    if (idAgent) {
      deleteAgenteCompany(value as AgentCompany);

      return;
    }
    const plan = value as AgentCompanyCache;
    const filterPlan = newsAgentCompany.filter((value) => value.uid !== plan.uid);
    setNewAgentCompany(filterPlan);
  };

  const deleteAgenteCompany = async (value: AgentCompany) => {
    const resDelete = await deleteItem(value.id);
    if (resDelete?.data) {
      messageApi.success('Codigo de Agente Eliminado');

      resetAgentCompany();

      return;
    }
    if (resDelete?.error) {
      activeModeError(resDelete.error);

      return;
    }

    messageApi.error('No se pudo Eliminar el Codigo de Agente');
  };
  const resetAgentCompany = () => {
    resetController();
  };

  const getInfoCompany = () => {
    if (!idAgent) return;
    getAgentsCompany();
  };

  useEffect(() => {
    if (!show) {
      form.resetFields();
      setNewAgentCompany([]);
    }
    form.setFieldsValue(initialForm);
    setStatus(initialForm.active);
    getInfoCompany();
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
            checked={status}
            onSwicth={(checked) => setStatus(checked)}
          />
        }
      >
        {contextHolder}
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

        <div className={styles.contentPlans}>
          <Button type="primary" size="large" className={styles.buttonPlan} onClick={openModal}>
            Agregar Compañia
          </Button>
          <TableAgentCompany
            list={listPlanCompany}
            loading={loadingGet}
            onDelete={selectDeleteAgentCompany}
            onEdit={selectAgentCompany}
          />
        </div>

        <FormAgentCompany
          show={modalActive}
          onClose={resetAgentCompany}
          initialForm={formValue}
          onSubmit={submitAgent}
          loading={loadingAction}
          modeForm={modeForm}
          idsCompanyNotAvalaible={listIdCompany}
        />
      </ModalForm>
      <ModalErrorsRelations
        information={errorRelations}
        onClose={resetAgentCompany}
        show={showError}
      />
    </>
  );
};
