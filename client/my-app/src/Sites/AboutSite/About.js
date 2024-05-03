
import * as React from "react";
import "./About.css";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {ReturnHeader} from "../../App";
import {ReturnFooter} from "../../App";

function About(){
  return(
      <div className='App'>
          <ReturnHeader/>
          <div className='App-body'>
              <div className="about-main">
                  <div className="hello-textbox">
                      <p>About Us
                      </p>
                      <p>
                          AIWebQuiz: Your Gateway to Smart Learning


                          Welcome to AIWebQuiz, a cutting-edge platform designed to transform the way you study. Here,
                          we convert your PDF materials into interactive quizzes tailored to your learning needs.

                          How It Works

                          Simply upload your educational PDFs, and let our sophisticated AI, powered by ChatGPT, dissect
                          the material to craft quizzes that challenge and engage you. It’s a straightforward process
                          aimed at reinforcing learning and making study sessions as efficient as possible.

                          Our Vision

                          We believe in the power of AI to revolutionize educational experiences by creating
                          personalized learning pathways. Our mission is to help students maximize their potential
                          through tools that adapt to their unique learning styles.

                          Join Us

                          Start your journey towards smarter learning today. Whether you're preparing for a major exam
                          or just brushing up on a topic, our platform is designed to assist you.

                          And remember, steer clear of The Foul Tempting Ghouls of procrastination and misinformation.
                          Explore our website to learn more about how our tools can enhance your academic
                          performance.
                      </p>
                          <p>
                              If you have any questions, please contact us on our "contact" page, where out
                              intern jesper will be receiving and answering any of your questions. Happy studying!</p>
                  </div>
                  <ReturnBilderBoxes/>
              </div>
          </div>
          <ReturnFooter/>
      </div>
  )
}

function ReturnBilderBoxes() {
    return (
        <div className="about-rightside">
                <div className="picture-box-container">
                    <div className="picture-box">
                        <img src="../Henrik.jpg" alt="Hänki" className="quiz-image-hanki"/>
                        <p className="quiz-text">Hänki</p>
                    </div>
                </div>
                <div className="picture-box-container">
                    <div className="picture-box">
                        <img src="../Johan.jpg" alt="john" className="quiz-image-john"/>
                        <p className="quiz-text">John</p>
                    </div>
                </div>

                <div className="picture-box-container">
                    <div className="picture-box">
                        <img src="../Jesper.jpg" alt="jeppe" className="quiz-image"/>
                        <p className="quiz-text">Jeppe</p>
                    </div>
                </div>
                <div className="picture-box-container">
                    <div className="picture-box">
                        <img src="../Nils.jpg" alt="nils" className="quiz-image"/>
                        <p className="quiz-text">Nilsfri</p>
                    </div>
                </div>
                <div className="picture-box-container">
                    <div className="picture-box">
                        <img src="../Mattias.png" alt="mattias" className="quiz-image"/>
                        <p className="quiz-text">Matfri</p>
                    </div>
                </div>
        </div>
    )
}


 export default About;