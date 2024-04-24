export function getErrorMessage(response: any) {
  const errorResponse = JSON.parse(response.error.text);
  return errorResponse.message;
}
