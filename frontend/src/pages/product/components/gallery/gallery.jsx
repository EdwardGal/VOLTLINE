import { useState } from 'react';

import styles from './gallery.module.scss';
import { Tag } from '../../../../components';

export const Gallery = ({ images, name, tags }) => {
  const [imageUrl, setImageUrl] = useState(images[0]);

  const onImageChange = (image) => {
    setImageUrl(image);
  };

  return (
    <div className={styles.gallery}>
      {tags && (
        <div className={styles.gallery__tags}>
          {tags.map((tag) => (
            <Tag key={tag} name={tag} />
          ))}
        </div>
      )}

      <div className={styles.gallery__main}>
        <div className={styles.gallery__mainCover}>
          <img key={imageUrl} className={styles.gallery__image} src={imageUrl} alt={name} />
        </div>
      </div>

      <div className={styles.gallery__preview}>
        {images.map((image) => (
          <button
            key={image}
            type="button"
            className={`${styles.gallery__previewCover} ${
              image === imageUrl ? styles['gallery__previewCover--active'] : ''
            }`}
            onClick={() => onImageChange(image)}
          >
            <img className={styles.gallery__image} src={image} alt={name} />
          </button>
        ))}
      </div>
    </div>
  );
};
