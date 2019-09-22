/** Get site mode from query string */

const GetMode = () => {
  let mode = false;
  const q = location.search;
  if (q && q != '') {
    if (q.indexOf('single') !== -1) {
      mode = 'single';
    }
    console.log('Site mode:', mode);
  }
  return mode;
};

export default GetMode;
