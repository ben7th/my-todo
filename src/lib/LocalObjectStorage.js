const localObjectStorage = {
  set (key, obj) {
    localStorage.setItem(key, JSON.stringify(obj))
  },

  get (key) {
    return JSON.parse(localStorage.getItem(key))
  },

  remove (key) {
    localStorage.removeItem(key)
  }
}

export default localObjectStorage