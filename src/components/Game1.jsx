import { mirrorEasing } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { flask_web } from "../js/flaskweb";
import { db, auth } from "./../../firebase/firebase";
import Loading from "./../assets/Bean.svg";
import { ref, get, child } from "firebase/database";

function Game1({topic_word, prob}) {
  const [poem, setPoem] = useState(null);
  const [poem2, setPoem2] = useState(null);
  const [isGreen ,setIsGreen] = useState(null);
  const [numStage, setNumStage] = useState(1);
  const [buttonAppear, setButtonAppear] = useState(false);
  const [isFetch, setIsFetch] = useState(true);
  const user = auth.currentUser;
  const [minutes, setMinutes] = useState(1);
  const [seconds, setSeconds] = useState(30);
  const [opponent, setOpponent] = useState('null');
  
  useEffect(() => {
    if(poem) {
      const timer = setInterval(() => {
        if (seconds > 0) {
          setSeconds(seconds - 1);
        } else {
          if (minutes > 0) {
            setMinutes(minutes - 1);
            setSeconds(59);
          } else {
            clearInterval(timer);
          }
        }
      }, 1000);
      return () => clearInterval(timer);
    }

    if(isFetch) {
      setIsFetch(false);
      console.log('fetch !!'); 
      fetch_poem_topic();
      get(child(ref(db), `info/${user.uid}/opponent`)).then((snapshot) => {
        const data = snapshot.val();
        console.log(data);
        setOpponent(data);
      })
    }
  }, [isFetch, poem, minutes, seconds]);

  const fetch_poem_topic = async () => {
    const respone = await fetch(`${flask_web}/klon_with_topic/${topic_word}`, {
      headers : {"ngrok-skip-browser-warning": 1}
    });
    const data = await respone.json();
    var is_green_temp = [[0, 0, 0, 0, 0, 0, 0, 0],
                         [1, 1, 1, 1, 1, 1, 1, 1], 
                         [1, 1, 1, 1, 1, 1, 1, 1],
                         [1, 1, 1, 1, 1, 1, 1, 1],
                         [1, 1, 1, 1, 1, 1, 1, 1]]
    console.log(data);
    if(prob[0]) {
      data[1][7] = 'x';
      is_green_temp[1][7] = 0;
    }
    if(prob[1]) {
      data[2][2] = 'x';
      is_green_temp[2][2] = 0;
    }
    if(prob[2]) {
      data[2][7] = 'x';
      is_green_temp[2][7] = 0;
    }
    if(prob[3]) {
      data[3][7] = 'x';
      is_green_temp[3][7] = 0;
    }
    if(prob[4]) {
      data[4][2] = 'x';
      is_green_temp[4][2] = 0;
    }
    setIsGreen(is_green_temp);
    setPoem(data);
    setPoem2(data);
  }

  const fetch2 = async (word1, word2) => {
    const respone = await fetch(`${flask_web}/issumpus/${word1}/${word2}`, {
      headers : {"ngrok-skip-browser-warning": 1}
    });
    const data = await respone.json();
    console.log(data)
    return data;
  }

  const handle = (i, j) => (event) => {
    var new_poem = poem2.map((row) => row.slice());
    var is_green_temp = isGreen.map((row) => row.slice());
    new_poem[i][j] = event.target.value;
    setPoem2(new_poem);

    if((i === 1 && j === 7) || (i === 2 && j === 2)) {
      fetch2(new_poem[1][7], new_poem[2][2]).then(data => {
        if(data[0]) {
          is_green_temp[1][7] = 1;
          is_green_temp[2][2] = 1;
        }else {
          is_green_temp[1][7] = 0;
          is_green_temp[2][2] = 0;
        }
        setIsGreen(is_green_temp);
      });
    }
    if((i === 2 && j === 7) || (i === 3 && j === 7)) {
      fetch2(new_poem[2][7], new_poem[3][7]).then(data => {
        if(data[0]) {
          is_green_temp[2][7] = 1;
          is_green_temp[3][7] = 1;
        }
        else {
          is_green_temp[2][7] = 0;
          is_green_temp[3][7] = 0;
        }
        setIsGreen(is_green_temp);
      });
    }
    if((i === 3 && j === 7) || (i === 4 && j === 2)) {
      fetch2(new_poem[3][7], new_poem[4][2]).then(data => {
        if(data[0]) {
          is_green_temp[3][7] = 1;
          is_green_temp[4][2] = 1;
        }
        else {
          is_green_temp[3][7] = 0;
          is_green_temp[4][2] = 0;
        }
        setIsGreen(is_green_temp);
      });
    }

    fetch2(new_poem[1][7], new_poem[2][2]).then(data1 => {
      var count = 0;
      if(data1[0]) count += 1;
      fetch2(new_poem[2][7], new_poem[3][7]).then(data2 => {
        if(data2[0]) count += 1;
        fetch2(new_poem[3][7], new_poem[4][2]).then(data3 => {
          if(data3[0]) count += 1;
          console.log('count : ', count);
          if(count === 3) {
            setButtonAppear(true);
            console.log('count : ', count);
            console.log(buttonAppear);
          }
        });
      });
    });
  }

  const handleClick = () => {
    setNumStage(numStage+1);
    setButtonAppear(false);
    setPoem(null);
    setIsFetch(true);
  }

  return(
    <div className="grid">
      {numStage > 1 || (minutes === 0 && seconds === 0)? (
        <div> done !! </div>
      ) : (
        <>
          {poem !== null ? (
            <>
              <div className="start-word"> topic word : {poem[0]}</div>
              <div className="start-word">countdown time : {minutes} min {seconds} sec</div>
              <div className="start-word"> opponent :  {opponent} </div>
              <div className="start-word"> mode :  Fastest </div>
              <div className="poem">
                <div className="top">
                  <div className="top-left">
                    {poem[1].map((word, index) => (
                      (word !== 'x') ? (
                        <div key={index} className="word">{word}</div>
                      ) : (
                        <div key={index} className="word"> 
                          <input className="input-word" onChange={handle(1, index)}></input>
                          {(isGreen[1][index] === 1) ? (
                            <div className="line-green"/>
                          ) : (
                            <div className="line-red"/>
                          )}
                        </div>
                      )
                    ))}
                  </div>
                  <div className="top-right">
                    {poem[2].map((word, index) => (
                      (word !== 'x') ? (
                        <div key={index} className="word">{word}</div>
                      ) : (
                        <div key={index} className="word"> 
                          <input className="input-word" onChange={handle(2, index)}></input>
                          {(isGreen[2][index] === 1) ? (
                            <div className="line-green"/>
                          ) : (
                            <div className="line-red"/>
                          )}
                        </div>
                      )
                    ))}
                  </div>
                </div>
                <div className="down">
                  <div className="down-left">
                    {poem[3].map((word, index) => (
                      (word !== 'x') ? (
                        <div key={index} className="word">{word}</div>
                      ) : (
                        <div key={index} className="word"> 
                          <input className="input-word" onChange={handle(3, index)}></input>
                          {(isGreen[3][index] === 1) ? (
                            <div className="line-green"/>
                          ) : (
                            <div className="line-red"/>
                          )}
                        </div>
                      )
                    ))}
                  </div>
                  <div className="down-right">
                    {poem[4].map((word, index) => (
                      (word !== 'x') ? (
                        <div key={index} className="word">{word}</div>
                      ) : (
                        <div key={index} className="word"> 
                          <input className="input-word" onChange={handle(4, index)}></input>
                          {(isGreen[4][index] === 1) ? (
                            <div className="line-green"/>
                          ) : (
                            <div className="line-red"/>
                          )}
                        </div>
                      )
                    ))}
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="cover">
              <img src={Loading} className="loading"/>
            </div>
          )}

          {buttonAppear === true && (
            <div className="cover">
              <div className="next-stage-button" onClick={handleClick}> submit !! </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
export default Game1;