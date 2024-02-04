const localStorageAvailable = () => {
  const inWindow =
    typeof window !== "undefined" &&
    typeof window.localStorage === 'object' &&
    typeof window.localStorage.setItem === 'function';
  if (!inWindow) {
    return false;
  }
  // Safari private mode has localStorage in the window, but throws when `setItem` is called
  const key = 'safeLocalStorageTest';
  try {
    window.localStorage.setItem(key, 'succeeds');
    window.localStorage.removeItem(key);
    return true;
  } catch (e) {
    return false;
  }
};

const onStorageWhenAvailable = (nativeMethod: string, args: string[], callback: () => string) => {
  if (localStorageAvailable()) {
    return window.localStorage[nativeMethod](...args);
  } else {
    return callback();
  }
};

const safeLocalStorage = {
  get: (key: string, onLocalStorageNotAvailable: () => string) => {
    return onStorageWhenAvailable('getItem', [key], onLocalStorageNotAvailable);
  },
  set: (key: string, value: string, onLocalStorageNotAvailable: () => string) => {
    onStorageWhenAvailable('setItem', [key, value], onLocalStorageNotAvailable);
  },
  remove: (key: string, onLocalStorageNotAvailable: () => string) => {
    onStorageWhenAvailable('removeItem', [key], onLocalStorageNotAvailable);
  },
  removeAll: (onLocalStorageNotAvailable: () => string) => {
    onStorageWhenAvailable('clear', [], onLocalStorageNotAvailable);
  },
};

export default safeLocalStorage;