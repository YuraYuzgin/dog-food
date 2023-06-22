export const isError = (data) => {
  return data.type.endsWith('rejected');
};

export const isLoading = (data) => {
  return data.type.endsWith('pending');
};

export const sortReviews = (reviews) => {
  reviews.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
};
