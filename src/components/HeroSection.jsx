import React from 'react';
import TaskForm from './TaskForm';
import '../styles/HeroSection.css';

const HeroSection = ({ onAddTask }) => {
  return (
    <section className="hero-section">
      <h1>
        Make a <span className="highlight">better</span> plan<br />
        for your life
      </h1>
      <div className="hero-row">
        <p className="subtitle">
          Whoever you are, Whatever you are looking for, we<br />
          have the perfect place for you
        </p>
        <TaskForm onAddTask={onAddTask} />
      </div>
    </section>
  );
};

export default HeroSection;
