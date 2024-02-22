import styles from './StatusTag.module.css';

interface Props {
  label: string;
  colorTag?: string;
  colorText?: string;
}

export const COLOR_TAG = {
  success: '#05A660',
  error: '#ff0000',
};

export const StatusTag = ({ label, colorTag, colorText }: Props) => {
  return (
    <div className={styles.tag} style={{ background: colorTag }}>
      <p className={styles.title} style={{ color: colorText }}>
        {label}
      </p>
    </div>
  );
};
