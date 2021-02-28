export function iterateSaveToSession(data) {
  data.forEach(d => {
    try {
      // save to session storage
      sessionStorage.setItem(`deviceID-${d.id}`, JSON.stringify(d));
    } catch (error) {
      console.log(error)
    }
  })
}

export function getFromSession(deviceId) {
  // get data from session storage
  const serialisedData = sessionStorage.getItem(`deviceID-${deviceId}`);
  let data = null;

  if (serialisedData != null) {
    try {
      data = JSON.parse(serialisedData);
    } catch (error) {
      console.log(error);
    }
  }
  return data;
}

export function iterateSaveToStorage(data) {
  data.forEach(d => {
    try {
      // save to local storage
      localStorage.setItem(`deviceID-${d.id}`, JSON.stringify(d));
    } catch (error) {
      console.log(error)
    }
  })
}

export function getFromStorage(deviceId) {
    // get data from local storage
  const serialisedData = localStorage.getItem(`deviceID-${deviceId}`);
  let data = null;

  if (serialisedData != null) {
    try {
      data = JSON.parse(serialisedData);
    } catch (error) {
      console.log(error);
    }
  }
  return data;
}