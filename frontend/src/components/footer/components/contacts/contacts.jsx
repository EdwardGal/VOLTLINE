import { CONTACTS_DATA } from '../contacts.constants';
import styles from './contacts.module.scss';

export const Contacts = () => {
  return (
    <div className={styles.contacts}>
      <h3 className={styles.contacts__title}>Contacts</h3>

      <ul className={styles.contacts__list}>
        {CONTACTS_DATA.map((contact) => (
          <li className={styles.contacts__item} key={contact.value}>
            {contact.to ? (
              <a className={styles.contacts__link} href={contact.to}>
                {contact.value}
              </a>
            ) : (
              <span className={styles.contacts__text}>{contact.value}</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};
