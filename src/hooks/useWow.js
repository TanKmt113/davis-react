import { useEffect } from 'react';
import { loadWowScript } from '../lib/loadWow';

/** @type {InstanceType<typeof window.WOW> | null} */
let wowInstance = null;

/** Đồng bộ lại WOW sau khi React render DOM mới (filter dự án, v.v.). */
export function syncWow() {
  wowInstance?.sync();
}

/** Khởi tạo WOW.js một lần cho toàn app. */
export function useWow() {
  useEffect(() => {
    let cancelled = false;

    loadWowScript()
      .then((WOW) => {
        if (cancelled) return;

        if (!wowInstance) {
          wowInstance = new WOW({
            boxClass: 'wow',
            animateClass: 'animated',
            offset: 80,
            mobile: true,
            live: false,
          });
          wowInstance.init();
        } else {
          syncWow();
        }
      })
      .catch(() => {
        // WOW là enhancement — không chặn render nếu script lỗi
      });

    return () => {
      cancelled = true;
    };
  }, []);
}
