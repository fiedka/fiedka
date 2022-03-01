const dblobPre = "data:application/octet-stream;charset=utf-16le;base64,";

const b64enc = (u8a) => {
  const out = [];
  for (let i = 0; i < u8a.length; i++) {
    out.push(String.fromCharCode(u8a[i]));
  }
  return btoa(out.join(""));
};

export const download = (fileName, content) => {
  const e = document.createElement("a");
  e.setAttribute("href", dblobPre + b64enc(content));
  e.setAttribute("download", fileName);
  e.style.display = "none";
  document.body.appendChild(e);
  e.click();
  document.body.removeChild(e);
};
