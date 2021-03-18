function log(str){
    document.write(`<p>${str}</p>`);
}
log('compatible test');

log('React is '+window.React);
log('ReactDOM is '+window.ReactDOM);
log('localStorage is '+localStorage);
log('promise is '+typeof  Promise);
log('fetch is '+typeof  fetch);
log('requestAnimationFrame is '+typeof  requestAnimationFrame);
log('String.prototype.startsWith is '+typeof  String.prototype.startsWith);
log("WebAssembly "+typeof  WebAssembly);

