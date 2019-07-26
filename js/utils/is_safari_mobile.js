/** Detect Safari on mobile */

const IsSafariMobile = () => {
  //var ua = window.navigator.userAgent;
  //var iOS = !!ua.match(/iPad/i) || !!ua.match(/iPhone/i);
  //var webkit = !!ua.match(/WebKit/i);
  //return (iOS && webkit && !ua.match(/CriOS/i));
  return /iP(ad|hone|od).+Version\/[\d\.]+.*Safari/i.test(navigator.userAgent);
}

export default IsSafariMobile;
