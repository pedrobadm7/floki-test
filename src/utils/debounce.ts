/* eslint-disable @typescript-eslint/no-explicit-any */
function debounce(func: (...args: any[]) => void, delay: number) {
  let timer: any;
  return (...args: any[]) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func(...args);
    }, delay);
  };
}

export default debounce;
