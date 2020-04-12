import React from 'react';
import Title from '../Title/Title';
import styles from './Projects.module.scss';
import svgFilter from '../../assets/svg-filter-effects.png';
import poa from '../../assets/preso-ou-nao.png';
import loa from '../../assets/lei-ou-nao.png';
import cfb from '../../assets/custom-fb-extension.png';
import camara2019 from '../../assets/camara2019.png';
import snake from '../../assets/snake.png';

interface CardProps {
  image: string,
  title: string,
  subtitle: string,
  url?: string,
}

const Card = ({ image, title, subtitle, url }: CardProps) => {
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

const Projects: React.FC = () => {
  return (
    <div className={styles.projects}>
      <Title>Projects</Title>

      <div className={styles.listProjects}>
        <div className={styles.left}>
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
  )
};

export default Projects;