const configs = {
  search: {
    root: "http://www.mocky.io/",
    path: "v2/5ba8efb23100007200c2750c"
  }
};

export default function config(key) {
  if (configs[key]) {
    return configs[key].root + configs[key].path;
  }
}
