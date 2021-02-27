
export function iterateSaveToSession(data) {
  data.map(d => {
    // save to session storage
    sessionStorage.setItem(`deviceID-${d.id}`, JSON.stringify(d));
  }
  )
}


