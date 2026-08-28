const CV_FONT_ID = 'cv-noto-font';
const CV_FONT_HREF = 'https://fonts.googleapis.com/css2?family=Noto+Sans:wght@400;600;700&display=swap&subset=vietnamese';

/** Nạp font Noto Sans — Chrome embed vào PDF khi Save as PDF */
export function loadCvFont() {
  if (document.getElementById(CV_FONT_ID)) {
    return Promise.resolve();
  }

  return new Promise((resolve) => {
    const link = document.createElement('link');
    link.id = CV_FONT_ID;
    link.rel = 'stylesheet';
    link.href = CV_FONT_HREF;
    link.onload = () => resolve();
    link.onerror = () => resolve();
    document.head.appendChild(link);
  });
}

/** Mở hộp thoại in — đợi font xong để PDF không vỡ chữ */
export async function printCv() {
  await loadCvFont();

  try {
    await document.fonts.load('400 10pt "Noto Sans"');
    await document.fonts.load('600 10pt "Noto Sans"');
    await document.fonts.load('700 10pt "Noto Sans"');
    await document.fonts.ready;
  } catch {
    // Tiếp tục in nếu Font Loading API không hỗ trợ
  }

  const previousTitle = document.title;
  document.title = 'CV - Do Trong Tan';
  window.print();
  document.title = previousTitle;
}
