export const generateSearch = (fields: Array<string>, search: string) => {
  let filter = {};
  if (search.trim() === '') return {};

  fields.map((param, index) => {
    const paramSearch = {
      [`filters[$or],[${index}][${param}][$containsi]`]: search.trim(),
    };

    filter = {
      ...filter,
      ...paramSearch,
    };

    return param;
  });

  return filter;
};
