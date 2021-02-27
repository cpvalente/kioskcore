// all in ms
// SLEEP_TIME         - stop querying timeout
// FETCH_INTERVAL     - fetch general data interval
// DMX_INTERVAL       - fetch dmx data interval (intensive ish)
// MESSAGES_INTERNAL - fetch messages interval
// LAST_SEEN         - flag device if inactive

export const SLEEP_TIME         = 50000;
export const FETCH_INTERVAL     = 1500;
export const DMX_INTERVAL       = 2000;
export const MESSAGES_INTERVAL  = 2000;
export const LAST_SEEN_BAD      = 5000;