import type { Draft } from './model.ts';

/** Decode and re-encode locally, stripping metadata and excluding active formats. */
export async function prepareImage(file: File): Promise<NonNullable<Draft['image']>> {
  if (!['image/jpeg','image/png','image/webp'].includes(file.type)) throw new Error('请选择 JPG、PNG 或 WebP / Choose JPG, PNG or WebP');
  if (file.size > 8 * 1024 * 1024) throw new Error('原图最大 8 MB / Original image must be under 8 MB');
  const url = URL.createObjectURL(file), img = new Image();
  try {
    img.src = url; await img.decode();
    if (!img.naturalWidth || img.naturalWidth * img.naturalHeight > 60_000_000) throw new Error('图片尺寸过大 / Image dimensions are too large');
    const scale = Math.min(1, 1600 / Math.max(img.naturalWidth, img.naturalHeight));
    const canvas = document.createElement('canvas'); canvas.width = Math.max(1, Math.round(img.naturalWidth * scale)); canvas.height = Math.max(1, Math.round(img.naturalHeight * scale));
    const ctx = canvas.getContext('2d'); if (!ctx) throw new Error('图片处理不可用 / Image processing unavailable');
    ctx.fillStyle = '#ffffff'; ctx.fillRect(0,0,canvas.width,canvas.height); ctx.drawImage(img,0,0,canvas.width,canvas.height);
    let data = canvas.toDataURL('image/jpeg', .86);
    if (data.length > 1_400_000) data = canvas.toDataURL('image/jpeg', .65);
    if (data.length > 1_400_000) throw new Error('压缩后仍过大，请换一张较小的图片 / Please use a smaller image');
    return { data, name: file.name.slice(0,160), alt: '', fit:'cover', position:'center' };
  } finally { URL.revokeObjectURL(url); }
}
