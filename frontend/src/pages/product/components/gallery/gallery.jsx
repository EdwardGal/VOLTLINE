import { useState } from 'react';
import styles from './gallery.module.scss';
import { Tag } from '../../../../components';

export const Gallery = ({ images, name, tags }) => {
  const [imageUrl, setImageUrl] = useState(images[0]);

  const onImageChange = ({ target }) => {
    setImageUrl(target.src);
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
          <img className={styles.gallery__image} src={imageUrl} alt={name} />
        </div>
      </div>

      <div className={styles.gallery__preview}>
        {images.map((image) => (
          <div key={image} className={styles.gallery__previewCover}>
            <img className={styles.gallery__image} src={image} alt={name} onClick={onImageChange} />
          </div>
        ))}
      </div>
    </div>
  );
};
