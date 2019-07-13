function debounce(targetFn, wait) {
  let timeout;

  return function() {
    const context = this;
    const args = [...arguments];
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      targetFn.apply(context, args);
    }, wait);
  };
}
export default debounce;
