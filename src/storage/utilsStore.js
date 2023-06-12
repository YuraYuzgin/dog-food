export const isError = (data) => {
  return data.type.endsWith('rejected');
};

export const isLoading = (data) => {
  return data.type.endsWith('pending');
};
