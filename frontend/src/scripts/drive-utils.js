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
  try {
    // Safety check for document
    if (!document || !document.querySelector) {
      console.warn('Document not ready');
      return [];
    }

    // Find all anchors that match lecture slide links
    const anchors = document.querySelectorAll('a');
    console.log('Found anchors:', anchors?.length);

    const linkObjects = [];

    anchors.forEach(anchor => {
      console.log('anchor', anchor);
      const href = anchor.getAttribute('href');
      console.log('href', href);
      const originalPath = href?.split('?')[0]; // Get path without query params
      
      // Extract content id from onClick or href
      const contentId = href?.match(/content-rid-(\d+)/)?.[1] || 
                       anchor.getAttribute('onClick')?.match(/content_id=_(\d+)_/)?.[1];

      if (originalPath) {
        linkObjects.push({
          href: originalPath,
          text: anchor.textContent.trim(),
          contentId,
          fullHref: href
        });
      }
    });

    console.log('Processed links:', linkObjects);
    return linkObjects;

  } catch (error) {
    console.error('Error in getDriveLinks:', error);
    return [];
  }
};
