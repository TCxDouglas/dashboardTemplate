import { Collapse, CollapseProps, Tag } from 'antd';
import { useMemo } from 'react';
import { ModalForm } from '../modalForm/ModalForm';
import styles from './ModalErrorRelations.module.css';
import { ErrorRelations } from '@/types/Api';
import { LABEL_ERROR_RELATIONS } from '@/constants/constants';
import { ActionForm } from '@/components/buttons/ActionForm/ActionForm';

interface Props {
  show: boolean;
  onClose: () => void;
  information?: ErrorRelations;
}

export const ModalErrorsRelations = ({ show, onClose, information }: Props) => {
  const details: CollapseProps['items'] = useMemo(() => {
    if (!information) return [];

    const relations = information.details.relations;

    const relatiosnWithInfo = Object.keys(relations).filter(
      (keyInfo) => relations[keyInfo].length !== 0,
    );

    return relatiosnWithInfo.map((info) => {
      const infoError = relations[info];

      return {
        key: info,
        label: LABEL_ERROR_RELATIONS[info] || info,
        children: (
          <div>
            {infoError.map((value) => {
              return <Tag key={value.id}>ID: {value.id}</Tag>;
            })}
          </div>
        ),
      };
    });
  }, [information]);

  return (
    <ModalForm
      show={show}
      title="No se puede eliminar este registro"
      onClose={onClose}
      size="md"
      footer={
        <ActionForm hiddenCheck onCancel={onClose} onSubmit={onClose} labelSubmit="Aceptar" />
      }
    >
      <div>
        <p className={styles.title}>Este Registro posee una relacion con los siguientes datos</p>
        <Collapse accordion items={details} />
      </div>
    </ModalForm>
  );
};
