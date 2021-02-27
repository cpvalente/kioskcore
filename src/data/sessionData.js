
export function iterateSaveToSession(data) {
  data.forEach(d => {
    // save to session storage
    sessionStorage.setItem(`deviceID-${d.id}`, JSON.stringify(d));
  }
  )
}


