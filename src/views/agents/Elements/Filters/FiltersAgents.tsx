/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useMemo, useState } from 'react';
import styles from './FiltersAgents.module.css';
import { SelectInput } from '@/components/inputs/selectInput/selectInput';
import { AddButton } from '@/components/buttons/AddButton/AddButton';
import { AgentsFilter } from '@/types/Agents';
import { useCrudServices } from '@/hooks/useCrudServices';
import { Company } from '@/types/company';

interface Props {
  onOpen: () => void;
  onFilters: (value: AgentsFilter) => void;
}

const STATUS_OPTION = [
  { label: 'Activo', value: true },
  { label: 'Inactivo', value: false },
];

export const FiltersAgents = ({ onOpen, onFilters }: Props) => {
  const { list } = useCrudServices<Company>({
    path: 'companies',
  });
  const [selectStatus, setSelectStatus] = useState<boolean | undefined>();
  const [selectCompany, setSelectCompany] = useState<number | undefined>();
  const options_company = useMemo(() => {
    return list.map((value) => ({ label: `${value.name} (${value.code})`, value: value.id }));
  }, [list]);

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
        options={options_company}
        onChange={(value) => setSelectCompany(value as number)}
      />
      <SelectInput
        placeholder="Estado"
        options={STATUS_OPTION}
        onChange={(value) => setSelectStatus(value as boolean)}
      />
      <AddButton label="Nuevo Agente" onClick={onOpen} />
    </div>
  );
};
