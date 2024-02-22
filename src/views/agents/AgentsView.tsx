/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { message } from 'antd';
import { FormAgents } from './Elements/Form/FormAgents/FormAgents';
import { FiltersAgents } from './Elements/Filters/FiltersAgents';
import { TableAgents } from './Elements/Table/TableAgents';
import { PaginationTable } from '@/components/pagination/PaginationTable';
import { useFormController } from '@/hooks/useFormController';
import { useCrudServices } from '@/hooks/useCrudServices';
import { Sort } from '@/constants/constants';
import { useSearch } from '@/hooks/useSearch';
import { Agent, AgentForm, AgentsFilter } from '@/types/Agents';
import { ExistRegister } from '@/types/Api';
import { ModalErrorsRelations } from '@/components/modal/modalErrorRelations/ModalErrorsRelations';

interface ResponseVerify {
  type: 'email' | 'name';
  status: boolean;
}

export const AgentsView = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const { searchValue } = useSearch();
  const {
    list,
    create,
    loadingGet,
    loadingAction,
    update,
    deleteItem,
    changeFilters,
    handleSort,
    handleSearch,
    metaPage,
    changePage,
  } = useCrudServices<Agent>({
    path: 'agents',
    sortingDefault: {
      key: 'id',
      mode: 'desc',
    },
    fieldsSearch: ['name', 'email', '[agentCompanies][company][code]', '[agentCompanies][code]'],
    initialParams: {
      populate: 'agentCompanies.company',
    },
  });
  const { getOneItem, loadingGet: loadingExits } = useCrudServices<ExistRegister>({
    path: 'exists',
    initialGet: false,
  });
  const {
    openModal,
    resetController,
    modalActive,
    formValue,
    modeForm,
    activeEditMode,
    selectRow,
    activeModeError,
    errorRelations,
    showError,
  } = useFormController<AgentForm, Agent>({
    initial_form: {
      name: '',
      email: '',
      active: true,
      agentCompanies: [],
    },
  });

  const verifyAgent = async (name: string, email: string): Promise<false | ResponseVerify> => {
    const resName = await getOneItem('agents', {
      identifier: name,
    });
    if (resName && resName.exists) return { status: resName.exists, type: 'name' };

    const resEmail = await getOneItem('agents', {
      identifier: email,
    });
    if (resEmail && resEmail.exists) return { status: resEmail.exists, type: 'email' };

    return false;
  };

  const submitAgent = (value: AgentForm) => {
    if (modeForm === 'new') createAgent(value);
    if (modeForm === 'edit') updateAgent(value);
  };

  const createAgent = async (payload: AgentForm) => {
    const resVerify = await verifyAgent(payload.name, payload.email);

    if (resVerify && resVerify.status) {
      if (resVerify.type === 'email') {
        messageApi.warning('El Email del Agente ya ha sido registrado');

        return;
      }
      if (resVerify.type === 'name') {
        messageApi.warning('El Nombre del Agente ya ha sido registrado');

        return;
      }
    }
    const resCreate = await create({
      data: {
        ...payload,
        agentCompanies: payload.agentCompanies?.map((value) => ({
          ...value,
          company: value.company?.id,
        })),
      },
    });
    if (resCreate) {
      messageApi.success('Agente Creado');

      reset();
    }
  };
  const updateAgent = async (payload: AgentForm) => {
    if (!selectRow) return;
    const resUpdate = await update(selectRow.id, { data: payload });
    if (resUpdate) {
      messageApi.success('Agente Actualizado');

      reset();
    }
  };

  const selectEditAgent = (value: Agent) => {
    activeEditMode(
      {
        active: value.active,
        name: value.name,
        email: value.email,
      },
      value,
    );
  };

  const selectDeleteAgent = async (value: Agent) => {
    const resDelete = await deleteItem(value.id);
    if (resDelete?.data) {
      messageApi.success('Compañia Eliminada');

      reset();

      return;
    }
    if (resDelete?.error) {
      activeModeError(resDelete.error);

      return;
    }

    messageApi.error('No se pudo eliminar el agente, vuelve a intentar luego');
  };

  const handleFilter = (filter: AgentsFilter) => {
    let paramFilter = {};
    if (filter.status !== undefined) {
      paramFilter = {
        ['filters[active]']: filter.status,
      };
    }
    if (filter.company) {
      paramFilter = {
        ...paramFilter,
        ['filters[agentCompanies][company][id]']: filter.company,
      };
    }

    changeFilters(paramFilter);
  };

  const onSort = (sort: Sort) => {
    handleSort(sort);
  };

  const reset = () => {
    resetController();
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      handleSearch(searchValue);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchValue]);

  return (
    <div>
      {contextHolder}
      <FiltersAgents onOpen={openModal} onFilters={handleFilter} />

      <TableAgents
        list={list}
        loading={loadingGet}
        onEdit={selectEditAgent}
        onDelete={selectDeleteAgent}
        onSort={onSort}
      />

      <FormAgents
        onClose={reset}
        show={modalActive}
        initialForm={formValue}
        onSubmit={submitAgent}
        loading={loadingAction || loadingExits}
        idAgent={selectRow?.id}
      />

      <PaginationTable {...metaPage} onChangePage={(page) => changePage(page)} />
      <ModalErrorsRelations information={errorRelations} onClose={reset} show={showError} />
    </div>
  );
};
