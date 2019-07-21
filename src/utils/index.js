export const bytesToMB = size => size / (1024 * 1024);
export const MBTobytes = size => size * (1024 * 1024);

export const getExtension = name => name.split('.').pop();

export const makeId = length => {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

export const getPathFromUrl = url => {
  return url.split('?')[0];
};

export const DEG2RAD = Math.PI / 180;
export const RAD2DEG = 180 / Math.PI;
export const DOUBLE_PI = Math.PI * 2;
export const HALF_PI = Math.PI / 2;

export const degToRad = degrees => {
  return degrees * DEG2RAD;
};

export const radToDeg = radians => {
  return radians * RAD2DEG;
};

export const offset = el => {
  const rect = el.getBoundingClientRect();
  const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  return { top: rect.top + scrollTop, left: rect.left + scrollLeft };
};

export function* makeRangeIterator({ data = [], start = 0, end = data.length, step = 1 }) {
  let index = 0;

  for (let i = start; i < end; i += step) {
    yield { data: data.slice(i, i + step), index: index++ };
  }
}

// const loadImage = path =>
//   new Promise(resolve => {
//     const img = new Image();
//     img.crossOrigin = 'anonymous';
//     img.onload = () => resolve(img);
//     img.onerror = () => resolve(null);
//
//     img.src = path;
//   });

// const loadImages = (...paths) => Promise.all(paths.map(loadImage));
