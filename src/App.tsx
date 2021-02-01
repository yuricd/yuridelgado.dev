import React from 'react';
import Home from './components/Home/Home';
import Projects from './components/Projects/Projects';
import About from './components/About/About';
import Contact from './components/Contact/Contact';
import Header from './components/Header/Header';
import Menu from './components/Menu/Menu';
import './styles/default.scss';
import { BrowserRouter } from 'react-router-dom';

const App: React.FC = () => {

  return (
    <div className="globalWrapper">
      <Header />
      
      <div className="container">
        <aside>
          <BrowserRouter>
            <Menu />
          </BrowserRouter>
        </aside>

        <div className="content">
          <section className="page" id="home">
            <Home />
          </section>

          <section className="page" id="projects">
            <Projects />
          </section>

          <section className="page" id="about">
            <About />
          </section>

          <section className="page" id="contact">
            <Contact />
          </section>
        </div>
      </div>
    </div>
  );
}

export default App;
