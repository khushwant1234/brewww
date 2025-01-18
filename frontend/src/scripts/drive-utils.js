export const getFileId = (url) => {
  const patterns = [/\/file\/d\/([^/]+)/, /id=([^&]+)/, /\/d\/([^/]+)/];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match && match[1]) {
      return match[1];
    }
  }
  return null;
};

export const getDownloadLink = (fileId) => {
  return `https://drive.usercontent.google.com/download?id=${fileId}&export=download`;
};

export const getDriveLinks = () => {
  const allAnchors = document.querySelectorAll('a');
  
  const driveLinks = Array.from(allAnchors).filter(anchor => {
    const onClickAttr = anchor.getAttribute('onClick');
    const hasValidOnClick = onClickAttr && onClickAttr.startsWith('this.href');
    
    if (hasValidOnClick) {
      console.log({
        href: anchor.href,
        onClick: onClickAttr,
        text: anchor.textContent
      });
    }
    
    return hasValidOnClick && anchor.href;
  });

  return driveLinks.map(anchor => anchor.href);
};
