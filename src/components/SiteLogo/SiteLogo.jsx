import { useState } from 'react';
import PropTypes from 'prop-types';
import { useBranding } from '../../context/BrandingContext';

/**
 * Logo thương hiệu — ảnh và/hoặc tên website từ cấu hình SEO.
 */
export default function SiteLogo({
  className = '',
  imageClassName = 'h-11 md:h-12 w-auto max-w-[240px] object-contain',
  textClassName = 'font-headline-md text-headline-md font-bold tracking-tighter text-text-primary',
  showText,
}) {
  const { branding, loading } = useBranding();
  const [imgError, setImgError] = useState(false);

  const logoUrl = branding.logoUrl?.trim() ?? '';
  const hasLogo = Boolean(logoUrl) && !imgError;
  const shouldShowText = showText ?? !hasLogo;
  const alt = branding.logoAlt || branding.siteName;

  if (loading) {
    return <span className={textClassName}>{branding.siteName}</span>;
  }

  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`.trim()}>
      {hasLogo && (
        <img
          src={logoUrl}
          alt={alt}
          className={imageClassName}
          loading="eager"
          decoding="async"
          onError={() => setImgError(true)}
        />
      )}
      {shouldShowText && (
        <span className={textClassName}>{branding.siteName}</span>
      )}
    </span>
  );
}

SiteLogo.propTypes = {
  className: PropTypes.string,
  imageClassName: PropTypes.string,
  textClassName: PropTypes.string,
  showText: PropTypes.bool,
};
