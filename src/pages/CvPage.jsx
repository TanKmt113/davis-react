import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
import CvDocument from '../components/Cv/CvDocument';
import { useCvSettings } from '../hooks/useCvSettings';
import { loadCvFont, printCv } from '../lib/printCv';
import '../components/Cv/Cv.scss';

export default function CvPage() {
  const { avatarUrl, loading } = useCvSettings();

  useEffect(() => {
    document.body.classList.add('cv-print-page');
    loadCvFont();
    return () => document.body.classList.remove('cv-print-page');
  }, []);

  return (
    <div className="cv-viewer">
      <div className="cv-viewer-bar no-print">
        <Link to="/" className="cv-viewer-btn" title="Về trang chủ">
          <Icon icon="material-symbols:arrow-back-rounded" />
        </Link>
        <span className="cv-viewer-title">CV — Đỗ Trọng Tấn</span>
        <div className="cv-viewer-actions">
          <button
            type="button"
            onClick={printCv}
            className="cv-viewer-btn"
            title="In / Lưu PDF"
          >
            <Icon icon="material-symbols:print-outline" />
          </button>
        </div>
      </div>

      <div className="cv-page">
        {loading ? (
          <div className="cv-loading">
            <div className="cv-loading-spinner" />
          </div>
        ) : (
          <CvDocument avatarUrl={avatarUrl} />
        )}
      </div>
    </div>
  );
}
