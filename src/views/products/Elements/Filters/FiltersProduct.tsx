/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import styles from './FiltersProduct.module.css';
import { SelectInput } from '@/components/inputs/selectInput/selectInput';
import { AddButton } from '@/components/buttons/AddButton/AddButton';
import { AgentsFilter } from '@/types/Agents';

interface Props {
  onOpen: () => void;
  onFilters: (value: AgentsFilter) => void;
}

const STATUS_OPTION = [
  { label: 'Activo', value: true },
  { label: 'Inactivo', value: false },
];

export const FiltersProduct = ({ onOpen, onFilters }: Props) => {

  const [selectStatus, setSelectStatus] = useState<boolean | undefined>();
  const [selectCompany, setSelectCompany] = useState<number | undefined>();


  useEffect(() => {
    let param: AgentsFilter = {};
    if (selectStatus !== undefined) {
      param = {
        status: selectStatus,
      };
    }
    if (selectCompany) {
      param = {
        ...param,
        company: selectCompany,
      };
    }

    onFilters(param);
  }, [selectStatus, selectCompany]);

  return (
    <div className={styles.containerFilters}>
      <SelectInput
        placeholder="Compañia"
        options={[]}
        onChange={(value) => setSelectCompany(value as number)}
      />
      <SelectInput
        placeholder="Estado"
        options={STATUS_OPTION}
        onChange={(value) => setSelectStatus(value as boolean)}
      />
      <AddButton label="Nuevo Producto" onClick={onOpen} />
    </div>
  );
};
