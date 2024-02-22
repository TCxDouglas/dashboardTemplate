import { useState } from 'react';
import { ErrorRelations } from '@/types/Api';
import { ActionCrud } from 'src/Global';

interface Props<T> {
  initial_form: T;
  resetCustom?: () => void;
}

export const useFormController = <T, U>({ initial_form, resetCustom }: Props<T>) => {
  const [modalActive, setModalActive] = useState(false);
  const [formValue, setFormValue] = useState(initial_form);
  const [modeForm, setModeForm] = useState<ActionCrud>('new');
  const [selectRow, setSelectRow] = useState<U | null>(null);
  const [confirmationActive, setConfirmationActive] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorRelations, setErrorRelations] = useState<ErrorRelations>();

  const openModal = () => {
    setModalActive(true);
  };

  const resetController = () => {
    setModalActive(false);
    setFormValue(initial_form);
    setSelectRow(null);
    setModeForm('new');
    setConfirmationActive(false);
    setShowError(false);
    setErrorRelations(undefined);

    resetCustom && resetCustom();
  };

  const activeEditMode = (value: T, registerSelect: U) => {
    setFormValue(value);
    setModeForm('edit');
    setSelectRow(registerSelect);
    setModalActive(true);
  };

  const activeDeleteMode = (registerSelect: U) => {
    setSelectRow(registerSelect);
    setConfirmationActive(true);
  };

  const activeModeSelect = (registerSelect: U) => {
    setSelectRow(registerSelect);
  };

  const activeModeError = (error: ErrorRelations) => {
    setErrorRelations(error);
    setShowError(true);
  };

  return {
    openModal,
    resetController,
    modalActive,
    formValue,
    modeForm,
    selectRow,
    activeEditMode,
    activeDeleteMode,
    confirmationActive,
    activeModeSelect,
    showError,
    errorRelations,
    activeModeError,
  };
};
