import React from 'react';

import Title from '../title/title';
import camara2019 from '../../assets/images/camara2019.png';
import cfb from '../../assets/images/custom-fb-extension.png';
import loa from '../../assets/images/lei-ou-nao.png';
import poa from '../../assets/images/preso-ou-nao.png';
import snake from '../../assets/images/snake.png';
import svgFilter from '../../assets/images/svg-filter-effects.png';

import styles from './projects.module.scss';

const Card = ({ image, title, subtitle, url }) => {
  return (
    <figure>
      <a href={url || '#'} target="_blank" rel="noopener noreferrer">
        <img src={image} alt={subtitle} />
        <figcaption>
          <h3>{title}<i className="fas fa-external-link-alt" /></h3>
          <p>{ subtitle }</p>
        </figcaption>
      </a>
    </figure>
  );
}

export default function Projects() {
  return (
    <div className={styles.projects}>
      <div className={styles.wrapper}>
        <Title title="Projects" lineColor="#E7E7E7" />

        <div className={styles.listProjects}>
          <div className={styles.left}>
            <div className={styles.item}>
              <Card 
                image="https://raw.githubusercontent.com/yuricd/scholiast/master/assets/scholiast-preview.png"
                title="Bot"
                subtitle="Scholiast - A comment bot for Instagram"
                url="https://github.com/yuricd/scholiast"
              />
            </div>

            <div className={styles.item}>
              <Card 
                image={snake} 
                title="Web App"
                subtitle="Snake Vai a Brasília"
                url="https://snake.yuridelgado.dev"
              />
            </div>

            <div className={styles.item}>
              <Card 
                image={loa} 
                title="Web App"
                subtitle="Lei ou Não"
                url="https://leiounao.herokuapp.com"
              />
            </div>
          
            <div className={styles.item}>
              <Card 
                image={svgFilter} 
                title="NPM Package"
                subtitle="SVG Filter Effect"
                url="https://github.com/yuricd/svg-filter-effects"
              />
            </div>
          </div>

          <div className={styles.right}>
            <div className={styles.item}>
              <Card 
                image={camara2019} 
                title="Web App"
                subtitle="Câmara 2019"
                url="https://camara2019.yuridelgado.dev"
              />
            </div>

            <div className={styles.item}>
              <Card 
                image={poa} 
                title="Web App"
                subtitle="Preso ou Não?"
                url="https://presoounao.herokuapp.com"
              />
            </div>

            <div className={styles.item}>
              <Card 
                image={cfb} 
                title="Chrome Extension"
                subtitle="Custom Facebook"
                url="https://github.com/yuricd/customize-social-network"
              />
            </div>
          </div>

        </div>
      </div>
    </div>
  )
};
