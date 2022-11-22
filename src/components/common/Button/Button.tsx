import React from 'react'

import s from './Button.module.scss'

const Button = () => {
  return <div></div>
}

export default Button

/*

<button class="buttons" id="backButton">
  <span id="circle"></span>
  <svg id="buttonArrow" viewbox="0 0 300 300">
    <polyline class="st1" points="122.9,55.5 217,149.6 122.9,243.7"/>
  </svg> 
</button>
<button class="buttons" id="nextButton">
  <span id="circle"></span>
  <svg id="buttonArrow2" viewbox="0 0 300 300">
    <polyline class="st1" points="122.9,55.5 217,149.6 122.9,243.7"/>
  </svg> 
</button>

.buttons {
  background-color: #17307F;
  border: none;
  color: white;
  padding: 12px;
  display: inline-block;
  text-align: center;
  text-decoration: none;
  margin: 4px;
  border-radius: 100px;
  height: 200px;
  width: 200px;
  cursor: pointer; 
  position: relative;
  overflow: hidden;
}

#circle {
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 100px;
  background-color: white;
  opacity: 1;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  pointer-events: none;
  opacity: 0;
}

#backButton {
  margin-left: 50px;
  margin-top: 20px;
  box-shadow: 0px 25px 50px rgba(0, 0, 0, 0.15);
  transition: 0.3s ease;
}

#backButton svg {
    transform: rotate(180deg);
}

.buttons svg {
  z-index: 999;
}

#nextButton {
  margin-left: 40px;
  margin-top: 20px;
  box-shadow: 0px 25px 50px rgba(0, 0, 0, 0.15);
  transition: 0.3s ease;
  
}
#nextButton::hover {
  
}


var navBtns = document.querySelectorAll(".buttons");

navBtns.forEach((btn) => {
  btn.querySelector("svg").style.pointerEvents = "none";
  let circle = btn.querySelector("#circle");

  gsap.set(circle, {
    scale: 0.2,
    opacity: 0
  });

  let tl = gsap.timeline({ paused: true });
  tl.to(btn, {
    duration: 0.05,
    boxShadow: "0px 25px 50px #33a9ff",
    ease: "quad.out"
  }).to(circle, {
    scale: 2,
    opacity: 0.4,
    background: '#000000',
  });

  function setPosition(e) {
    var bounds = e.target.getBoundingClientRect();
    var x = e.clientX - bounds.left;
    var y = e.clientY - bounds.top;

    console.log(x, y);

    gsap.set(circle, {
      left: `${x}px`,
      top: `${y}px`
    });
  }
  // Apply our listeners
  btn.addEventListener("mouseenter", (e) => {
    setPosition(e);
    tl.play();
  });
  btn.addEventListener("mouseout", (e) => {
    setPosition(e);
    tl.reverse();
  });
});
*/
