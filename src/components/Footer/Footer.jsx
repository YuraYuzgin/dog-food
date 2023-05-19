import React, {memo} from 'react';
import { Logo } from '../Logo/logo';
import './index.sass';
import iconTelegram from './img/icon_telegram.svg';
import iconWhatsapp from './img/icon_whatsapp.svg';
import iconViber from './img/icon_viber.svg';
import iconInstagram from './img/icon_instagram.svg';
import iconVk from './img/icon_vk.svg';

export const Footer = memo(() => {
  return (
    <footer className="footer">
      <div className="footer__logo__wrapper">
        <div className="footer__logo">
          <Logo />
        </div>
        <p className="footer__copyright">© «Интернет-магазин DogFood.ru»</p>
      </div>
      <ul className="footer__list">
        <li><p>Каталог</p></li>
        <li><p>Акции</p></li>
        <li><p>Новости</p></li>
        <li><p>Отзывы</p></li>
      </ul>
      <ul className="footer__list">
        <li><p>Оплата и доставка</p></li>
        <li><p>Часто спрашивают</p></li>
        <li><p>Обратная связь</p></li>
        <li><p>Контакты</p></li>
      </ul>
      <div className="footer__contacts">
        <h4>Мы на связи</h4>
        <div className="footer__contacts__tel_email_wrapper">
          <a className="footer__contacts_tel" href="tel:7999000000">
            8 (999) 00-00-00
          </a>
          <a className="footer__contacts_email" href="mailto:dogfood.ru@gmail.com" target="_blank">
            dogfood.ru@gmail.com
          </a>
        </div>

        <ul className="footer__social">
          <li>
            <p>
              <img src={iconTelegram} alt="telegram" />
            </p>
          </li>
          <li>
            <p>
              <img src={iconWhatsapp} alt="whatsapp" />
            </p>
          </li>
          <li>
            <p>
              <img src={iconViber} alt="viber" />
            </p>
          </li>
          <li>
            <p>
              <img src={iconInstagram} alt="instagram" />
            </p>
          </li>
          <li className="footer__social__vk">
            <p>
              <img src={iconVk} alt="vk" />
            </p>
          </li>
        </ul>
      </div>
    </footer>
  );
});
