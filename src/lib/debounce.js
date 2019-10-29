export default function(func, wait, immediate) {
  let timeout;
  return function() {
    let context = this;
    let args = arguments;
    let callnow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(function() {
      timeout = null;
      if (!immediate) {
        func.apply(context, args);
      }
    }, wait);
    if (callnow) func.apply(context, args);
  };
}
