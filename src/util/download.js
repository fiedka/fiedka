const dblobPre = "data:application/octet-stream;charset=utf-16le;base64,";
const jblobPre = "data:text/json;charset=utf-8,";

const b64enc = (u8a) => {
  const out = [];
  for (let i = 0; i < u8a.length; i++) {
    out.push(String.fromCharCode(u8a[i]));
  }
  return btoa(out.join(""));
};

const download = (fileName, data) => {
  const e = document.createElement("a");
  e.setAttribute("href", data);
  e.setAttribute("download", fileName);
  e.style.display = "none";
  document.body.appendChild(e);
  e.click();
  document.body.removeChild(e);
};

export const downloadU8a = (fileName, content) => {
  const data = b64enc(content);
  download(fileName, dblobPre + data);
};

export const downloadJson = (fileName, content) => {
  const data = encodeURIComponent(JSON.stringify(content, null, 2));
  download(fileName, jblobPre + data);
};
