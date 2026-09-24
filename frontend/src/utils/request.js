export const request = async (url, method = 'GET', body) => {
  try {
    const isFormData = body instanceof FormData;

    const response = await fetch('/api' + url, {
      method,
      headers: isFormData
        ? undefined
        : {
            'Content-Type': 'application/json',
          },
      body: body ? (isFormData ? body : JSON.stringify(body)) : undefined,
    });

    const result = await response.json();

    if (!response.ok) {
      return {
        error: result.error || 'Server error',
        status: response.status,
      };
    }

    return result;
  } catch {
    return {
      error: 'Unable to connect to the server',
    };
  }
};
