/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { message } from 'antd';
import { FormProduct } from './Elements/Form/FormProduct/FormProduct';
import { FiltersProduct } from './Elements/Filters/FiltersProduct';
import { TableProduct } from './Elements/Table/TableProduct';
import { PaginationTable } from '@/components/pagination/PaginationTable';
import { useFormController } from '@/hooks/useFormController';
import { useCrudServices } from '@/hooks/useCrudServices';
import { Sort } from '@/constants/constants';
import { useSearch } from '@/hooks/useSearch';
import { AgentsFilter } from '@/types/Agents';
import { ModalErrorsRelations } from '@/components/modal/modalErrorRelations/ModalErrorsRelations';
import { Product, ProductForm } from '@/types/Product';

export const ProductsView = () => {
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
  } = useCrudServices<Product>({
    path: 'products',
    sortingDefault: {
      key: 'id',
      mode: 'desc',
    },
    initialParams: {
      populate: 'category,cover',
    },
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
  } = useFormController<ProductForm, Product>({
    initial_form: {
      name: '',
      country: '',
      description: '',
      price: 0,
    },
  });

  const submitProduct = (value: ProductForm) => {
    if (modeForm === 'new') createProduct(value);
    if (modeForm === 'edit') updateProduct(value);
  };

  const createProduct = async (payload: ProductForm) => {
    const resCreate = await create({
      data: {
        ...payload,
      },
    });
    if (resCreate) {
      messageApi.success('Producto Creado');

      reset();
    }
  };
  const updateProduct = async (payload: ProductForm) => {
    if (!selectRow) return;
    const resUpdate = await update(selectRow.id, { data: payload });
    if (resUpdate) {
      messageApi.success('Producto Actualizado');

      reset();
    }
  };

  const selectEditProduct = (value: Product) => {
    activeEditMode(
      {
        country: value.country,
        description: value.description,
        name: value.name,
        price: value.price,
        category: value?.id
      },
      value,
    );
  };

  const selectDeleteProduct = async (value: Product) => {
    const resDelete = await deleteItem(value.id);
    if (resDelete?.data) {
      messageApi.success('Producto Eliminado');

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
      <FiltersProduct onOpen={openModal} onFilters={handleFilter} />

      <TableProduct
        list={list}
        loading={loadingGet}
        onEdit={selectEditProduct}
        onDelete={selectDeleteProduct}
        onSort={onSort}
      />

      <FormProduct
        onClose={reset}
        show={modalActive}
        initialForm={formValue}
        onSubmit={submitProduct}
        loading={loadingAction}
        idAgent={selectRow?.id}
      />

      <PaginationTable {...metaPage} onChangePage={(page) => changePage(page)} />
      <ModalErrorsRelations information={errorRelations} onClose={reset} show={showError} />
    </div>
  );
};
