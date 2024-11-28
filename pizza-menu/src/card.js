import React from 'react';
import './index.css';
import { flushSync } from 'react-dom';
const skillData = [
  { skill: 'git and github', level: 'intermediate', color: '#000000' },
  { skill: 'js', level: 'intermediate', color: '#ff0000' },
  { skill: 'react', level: 'intermediate', color: '#005eef' },
];
function CardApp() {
  return <CardList />;
}
function CardList() {
  return (
    <div className="grid-container">
      <Card />
      <Card />
      <Card />
    </div>
  );
}
function Card() {
  return (
    <div className="card">
      <Avatar />
      <Intro />
      <SkillList />
    </div>
  );
}
function Avatar() {
  return <img className="avatar" src="./pizzas/funghi.jpg" alt="desc" />;
}
function Intro() {
  return (
    <div className="intro-text">
      <h1>Marko Udovcic</h1>
      <p>Lorem ipsum dolor sit amet.</p>
    </div>
  );
}
function SkillList() {
  return (
    <div className="skills-container">
      {skillData.map(skillObject => (
        <Skill skillObject={skillObject} key={skillObject.skill} />
      ))}
    </div>
  );
}
function Skill({ skillObject }) {
  return (
    <div className="skill">
      <h1 style={{ color: skillObject.color }}>{skillObject.skill}</h1>
      <p>{skillObject.level === 'intermediate' && 'int'}</p>
    </div>
  );
}
export default CardApp;
