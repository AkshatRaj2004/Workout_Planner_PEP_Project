export function getApiError(error, fallback = 'Something went wrong. Please try again.') {
  const details = error.response?.data?.errors;

  if (Array.isArray(details) && details.length > 0) {
    return details[0].msg || fallback;
  }

  return error.response?.data?.message || fallback;
}
