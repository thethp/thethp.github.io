//change the background image depending on whether or not it supports webp
async function supportsWebp() {
    if (!self.createImageBitmap) return false;

    const webpData = 'data:image/webp;base64,UklGRh4AAABXRUJQVlA4TBEAAAAvAAAAAAfQ//73v/+BiOh/AAA=';
    const blob = await fetch(webpData).then(r => r.blob());
    return createImageBitmap(blob).then(() => true, () => false);
 }

(async () => {
    if(await supportsWebp()) {
      document.getElementById('NatureImage').style.backgroundImage = "url('https://cdn.glitch.com/2b0030a2-798f-40fa-9c19-6a318508eb4f%2FFeral-Land.webp?v=1568148011339')";
      document.getElementById('NatureImageMask').style.backgroundImage = "url('https://cdn.glitch.com/2b0030a2-798f-40fa-9c19-6a318508eb4f%2FFeral-Land-Top.webp?v=1568496232378')";
    } else {
      document.getElementById('NatureImage').style.backgroundImage = "url('https://cdn.glitch.com/2b0030a2-798f-40fa-9c19-6a318508eb4f%2FFeral-Land.png?v=1568148014875')";
      document.getElementById('NatureImageMask').style.backgroundImage = "url('https://cdn.glitch.com/2b0030a2-798f-40fa-9c19-6a318508eb4f%2FFeral-Land-Top.png?v=1568496237084')";
    }
})();