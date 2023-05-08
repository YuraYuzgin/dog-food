import React from 'react';
import { Logo } from '../Logo/logo';
import './index.sass';
import iconTelegram from './img/icon_telegram.svg';
import iconWhatsapp from './img/icon_whatsapp.svg';
import iconViber from './img/icon_viber.svg';
import iconInstagram from './img/icon_instagram.svg';
import iconVk from './img/icon_vk.svg';

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__logo__wrapper">
        <div className="footer__logo">
          <Logo />
        </div>
        <p className="footer__copyright">© «Интернет-магазин DogFood.ru»</p>
      </div>
      <ul className="footer__list">
        <li><a href="#">Каталог</a></li>
        <li><a href="#">Акции</a></li>
        <li><a href="#">Новости</a></li>
        <li><a href="#">Отзывы</a></li>
      </ul>
      <ul className="footer__list">
        <li><a href="#">Оплата и доставка</a></li>
        <li><a href="#">Часто спрашивают</a></li>
        <li><a href="#">Обратная связь</a></li>
        <li><a href="#">Контакты</a></li>
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
            <a href="#" target="_blank">
              <img src={iconTelegram} alt="telegram" />
            </a>
          </li>
          <li>
            <a href="#" target="_blank">
              <img src={iconWhatsapp} alt="whatsapp" />
            </a>
          </li>
          <li>
            <a href="#" target="_blank">
              <img src={iconViber} alt="viber" />
            </a>
          </li>
          <li>
            <a href="#" target="_blank">
              <img src={iconInstagram} alt="instagram" />
            </a>
          </li>
          <li className="footer__social__vk">
            <a href="#" target="_blank">
              <img src={iconVk} alt="vk" />
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
};
