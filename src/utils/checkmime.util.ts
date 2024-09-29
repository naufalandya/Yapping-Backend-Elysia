export async function detectMimeType(arrayBuffer : ArrayBuffer) {
    const bytes = new Uint8Array(arrayBuffer);

    if (bytes[0] === 0xFF && bytes[1] === 0xD8 && bytes[2] === 0xFF) {
      return 'image/jpeg'; // JPEG
    }
    if (bytes[0] === 0x89 && bytes[1] === 0x50 && bytes[2] === 0x4E && bytes[3] === 0x47) {
      return 'image/png'; // PNG
    }
    if (bytes[0] === 0x52 && bytes[1] === 0x49 && bytes[2] === 0x46 && bytes[3] === 0x46) {
      return 'image/webp'; // WEBP
    }
  
    if (bytes[0] === 0x00 && bytes[1] === 0x00 && bytes[2] === 0x00 && (bytes[4] === 0x66 || bytes[4] === 0x6D)) {
      return 'video/mp4'; // MP4
    }
    if (bytes[0] === 0x1A && bytes[1] === 0x45 && bytes[2] === 0xDF && bytes[3] === 0xA3) {
      return 'video/webm'; // WebM
    }
  
    return null; 
}
  