const rootDiv = document.getElementById('root');

function placeholderImageSrc({ width = 10, height = 10 }) {
  const fontSize = Math.floor(Math.min(width, height) * 0.2);
  const str = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <rect fill="#ddd" width="${width}" height="${height}"/>
  <text fill="rgba(0,0,0,0.5)" font-family="sans-serif" font-size="${fontSize}" dy="${fontSize * 0.35}" font-weight="bold" x="50%" y="50%" text-anchor="middle">${width}×${height}</text>
  </svg>`;
  const cleaned = str.replace(/[\t\n\r]/gim, "").replace(/\s\s+/g, " ").replace(/'/gim, "\\i");
  const encoded = encodeURIComponent(cleaned).replace(/\(/g, "%28").replace(/\)/g, "%29");
  return `data:image/svg+xml;charset=UTF-8,${encoded}`;
}

  const pathNames = [
  "/calcite-accordion"
];

const fetchPage = page => {
  return fetch(page + ".txt")
          .then(res => {
            return res.text();
          })
          .then(text => {
            rootDiv.innerHTML = text;
            const images = rootDiv.querySelectorAll('img.placeholder-img');
            images.forEach(image => {
              if (image.hasAttribute("data-width") && image.hasAttribute("data-height")) {
                image.setAttribute('src', placeholderImageSrc({
                    width: Number(image.getAttribute("data-width")),
                    height: Number(image.getAttribute("data-height"))
                }));
              }
            });
          });
};

window.onload = () => {
  if (!pathNames.includes(window.location.pathname)) {
    // load default home page
    return fetchPage("home");
  } else {
    // load the component's demo page
    return fetchPage(window.location.pathname);
  }
};

const onNavClick = pathname => {
  window.history.pushState({}, pathname, window.location.origin + pathname);
  return fetchPage(pathname);
};

window.onpopstate = () => fetchPage(window.location.pathname);
