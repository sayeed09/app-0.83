export const resizeImageForDevice=(img: string,width:number)=>{
  let newURL = img;
  const idxPng = img.indexOf('.png?');
  const idxJpg = img.indexOf('.jpg?');
  const deviceWidth = Number(width.toFixed(0));

  let idx = -1;

  if (idxPng !== -1) {
    idx = idxPng;
  }
  if (idxJpg !== -1) {
    idx = idxJpg;
  }

  if (idx > -1) {
    if (idx === idxPng)
      newURL = img.replace('.png', `_${deviceWidth}x.png`);
    if (idx === idxJpg)
      newURL = img.replace('.jpg', `_${deviceWidth}x.jpg`);
  }
  return newURL;
}