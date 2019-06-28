/** Create DOM Element */

function CreateElement(params) {
  const res = document.createElement(params.type || 'div');

  Object.keys(params).forEach(key => {
    const type = typeof(params[key]);
    if (type === 'object') {
      // append child nodes recursively
      if (key === 'childNodes') {
        params[key].forEach(child => {
          const childNode = CreateElement(child);
          res.appendChild(childNode);
        });
      }

      // style
      else if (key === 'style') {
        Object.keys(params[key]).forEach(attr => {
          res.style[attr] = params[key][attr];
        });
      }

      // bind events
      else if (key === 'eventListeners' || key === 'addEventListener') {
        Object.keys(params[key]).forEach(evt => {
          res.addEventListener(evt, params[key][evt]);
        });
      }

      // set nested values
      else {
        Object.keys(params[key]).forEach(subkey => {
          res[key][subkey] = params[key][subkey];
        });
      }
    } else if (type === 'number' || type === 'string') {
      // set classes
      if (key === 'classList') {
        params[key].split(' ').forEach(c => {
          res.classList.add(c);
        });
      }

      // set value
      else {
        res[key] = params[key];
      }
    }
  });

  return res;
}

export default CreateElement;
