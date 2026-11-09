import type { ImgHTMLAttributes } from 'react';
import type { StyleId } from '../data/styles';
import { publicUrl } from '../data/site';

interface StyleThumbnailProps extends ImgHTMLAttributes<HTMLImageElement> {
  styleId: StyleId;
  alt: string;
  sizes: string;
}

export function StyleThumbnail({ styleId, alt, sizes, width = 1280, height = 800, ...props }: StyleThumbnailProps) {
  return (
    <picture>
      <source
        type="image/webp"
        srcSet={`${publicUrl(`/thumbs/480/${styleId}.webp`)} 480w, ${publicUrl(`/thumbs/768/${styleId}.webp`)} 768w, ${publicUrl(`/thumbs/1280/${styleId}.webp`)} 1280w`}
        sizes={sizes}
      />
      <img {...props} src={publicUrl(`/thumbs/${styleId}.jpg`)} alt={alt} width={width} height={height} />
    </picture>
  );
}
