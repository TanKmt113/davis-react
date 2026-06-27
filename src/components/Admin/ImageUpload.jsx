import { useCallback, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { uploadProjectImage, MAX_SIZE_MB } from '../../services/storageService';

/** @param {DataTransfer | null | undefined} clipboardData */
function getImageFromClipboard(clipboardData) {
  if (!clipboardData?.items) return null;

  for (const item of clipboardData.items) {
    if (item.type.startsWith('image/')) {
      return item.getAsFile();
    }
  }

  return null;
}

export default function ImageUpload({ value, onChange }) {
  const inputRef = useRef(null);
  const pasteZoneRef = useRef(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [isDragOver, setIsDragOver] = useState(false);

  const uploadFromFile = useCallback(async (file) => {
    if (!file || uploading) return;

    setUploading(true);
    setError('');

    try {
      const url = await uploadProjectImage(file);
      onChange(url);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload thất bại');
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = '';
    }
  }, [onChange, uploading]);

  const handleFile = (event) => {
    const file = event.target.files?.[0];
    if (file) uploadFromFile(file);
  };

  const handlePaste = (event) => {
    const file = getImageFromClipboard(event.clipboardData);
    if (!file) return;

    event.preventDefault();
    uploadFromFile(file);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setIsDragOver(false);

    const file = event.dataTransfer.files?.[0];
    if (file?.type.startsWith('image/')) uploadFromFile(file);
  };

  return (
    <div>
      <label className="block text-sm font-medium mb-1.5">Ảnh dự án</label>

      {value ? (
        <div className="relative mb-3 inline-block">
          <img src={value} alt="Preview" className="w-48 h-32 object-cover rounded-xl border border-white/10" />
          <button
            type="button"
            onClick={() => onChange('')}
            className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-red-500 text-white text-xs flex items-center justify-center"
          >
            ×
          </button>
        </div>
      ) : null}

      <div
        ref={pasteZoneRef}
        tabIndex={0}
        onPaste={handlePaste}
        onClick={() => pasteZoneRef.current?.focus()}
        onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
        onDragLeave={() => setIsDragOver(false)}
        onDrop={handleDrop}
        className={`rounded-xl border border-dashed p-4 transition-colors outline-none focus:border-primary/50 ${
          isDragOver
            ? 'border-primary/60 bg-primary/5'
            : 'border-white/20 hover:border-primary/40 bg-surface/20'
        }`}
      >
        <div className="flex flex-wrap items-center gap-3">
          <input
            ref={inputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif"
            onChange={handleFile}
            className="hidden"
          />
          <button
            type="button"
            disabled={uploading}
            onClick={(e) => {
              e.stopPropagation();
              inputRef.current?.click();
            }}
            className="px-4 py-2 rounded-xl border border-white/10 hover:border-primary/50 text-sm disabled:opacity-50"
          >
            {uploading ? 'Đang upload...' : value ? 'Đổi ảnh' : 'Chọn ảnh từ máy'}
          </button>
          <span className="text-xs text-text-secondary">
            JPG, PNG, WebP, GIF · tối đa {MAX_SIZE_MB}MB
          </span>
        </div>
        <p className="text-xs text-text-secondary mt-3">
          <span className="text-primary/80">Ctrl+V</span> để dán ảnh từ clipboard · kéo thả ảnh vào đây
        </p>
      </div>

      <input
        type="url"
        value={value ?? ''}
        onChange={(e) => onChange(e.target.value)}
        onPaste={handlePaste}
        placeholder="Hoặc dán URL ảnh..."
        className="w-full mt-3 px-4 py-2.5 rounded-xl bg-surface/50 border border-white/10 focus:border-primary/50 focus:outline-none text-sm"
      />

      {error && <p className="text-sm text-red-400 mt-2">{error}</p>}
    </div>
  );
}

ImageUpload.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};
