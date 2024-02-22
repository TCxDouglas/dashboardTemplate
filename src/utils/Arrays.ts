export const removeObjDuplicates = <T>(array: Array<T>, key: keyof T) => {
  const ids = new Set();

  return array.filter((obj) => {
    if (!ids.has(obj[key])) {
      ids.add(obj[key]);

      return true;
    }

    return false;
  });
};

interface Props<T> {
  array: T[];
  id: string;
  key: keyof T;
  valor: T[keyof T];
  identify: keyof T;
}

interface PropsObj<T> {
  array: T[];
  id: string;
  newObj: T;
  identify: keyof T;
}

export const updateValueArray = <T>({ array, id, key, valor, identify }: Props<T>) => {
  return array.map((obj) => {
    if (obj[identify] === id) {
      return {
        ...obj,
        [key]: valor,
      };
    }

    return obj;
  });
};
export const updateObjArray = <T>({ array, id, newObj, identify }: PropsObj<T>) => {
  return array.map((obj) => {
    if (obj[identify] === id) {
      return {
        ...obj,
        ...newObj,
      };
    }

    return obj;
  });
};
