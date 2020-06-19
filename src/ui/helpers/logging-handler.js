// https://developer.mozilla.org/en-US/docs/Web/API/console#Outputting_text_to_the_console

// import { object } from "firebase-functions/lib/providers/storage";

export const snapLog = (msg, obj) => {
  let css = 'background: #222; color: #bada55; padding: 5px; margin-right: 5px;';
  if(Array.isArray(obj)) obj = { obj };
  obj 
    ? console.log(`%c${msg} %o`, css, obj)
    : console.log(`%c${msg}: ${obj}`, css)
};

export const logError = (source, e) => {
  let css = 'background: #222; color: #fff; padding: 5px; margin-right: 5px;';
  let output;
  if(Array.isArray(source)) source = { source };
  // if(source === typeof(object)) {
  //   output = `%cError: ${e.message} at %o`;
  //   console.log(output, source, css);
  // } else {
  //   output = `%cError: ${e.message} at ${source}`;
  //   console.log(output, css);
  // }
};

export const logAPIError = (call, e) => {
  let source = `Firebase ${call} error`;
  logError(source, e);
};