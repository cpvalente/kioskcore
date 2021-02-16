  export function checkResponse(response) {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error('Something went wrong');
    }
  }