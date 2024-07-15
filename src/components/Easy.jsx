import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { LevelsBar } from  "./"

function Easy() {
  // useEffect(() => {
  //   fetchFunction();
  // }, [])

  // const fetchFunction = async () => {
  //   const respone = await fetch("https://ff6d-35-237-117-108.ngrok-free.app", {
  //     headers : {"ngrok-skip-browser-warning": 1}
  //   });
  //   const data = await respone.json();
  //   console.log(data);
  // }

  const sentence = [
    ['ไก่', 'จิก', 'x', 'จิก'],
    ['เด็ก', 'ตาย', 'เด็ก', 'ตาย'],
    ['บ๋าว', 'บ๋าว', 'บ๋าว', 'บ๋าว'],
    ['เอ๋อ', 'เอ๋อ', 'x', 'เอ๋อ',]
  ];

  return(
    <>
      <LevelsBar/>
      <div className="poem">
        <div className="top">
          <div className="top-left">
            {sentence[0].map((word) => (
              (word !== 'x') ? (
                <div className="word">{word}</div>
              ) : (
                <div className="word"> 
                  <input className="input-word"></input>
                  <div className="line"/>
                </div>
              )
            ))}
          </div>
          <div className="top-right">
            {sentence[1].map((word) => (
              (word !== 'x') ? (
                <div className="word">{word}</div>
              ) : (
                <div className="word"> 
                  <input className="input-word"></input>
                  <div className="line"/>
                </div>
              )
            ))}
          </div>
        </div>
        <div className="down">
          <div className="down-left">
            {sentence[2].map((word) => (
              (word !== 'x') ? (
                <div className="word">{word}</div>
              ) : (
                <div className="word"> 
                  <input className="input-word"></input>
                  <div className="line"/>
                </div>
              )
            ))}
          </div>
          <div className="down-right">
            {sentence[3].map((word) => (
              (word !== 'x') ? (
                <div className="word">{word}</div>
              ) : (
                <div className="word"> 
                  <input className="input-word"></input>
                  <div className="line"/>
                </div>
              )
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
export default Easy;