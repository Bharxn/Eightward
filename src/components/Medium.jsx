import { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import { LevelsBar } from  "./"
import { flask_web } from "../js/flaskweb";
import Loading from "./../assets/Bean.svg";

function Medium() {
  const [originalPoem, setOriginalPoem] = useState(null);
  const [poem, setPoem] = useState(null);
  const [poem2, setPoem2] = useState(null);
  const [isGreen ,setIsGreen] = useState(null);
  const [score, setScore] = useState(null);
  const [numStage, setNumStage] = useState(1);
  const [buttonAppear, setButtonAppear] = useState(false);
  const [isFetch, setIsFetch] = useState(true);
  
  useEffect(() => {
    if(isFetch) {
      setIsFetch(false);
      console.log('fetch !!'); 
      fetch1();
    }
  }, [isFetch])

  const fetch1 = async () => {
    const respone = await fetch(`${flask_web}/klon`, {
      headers : {"ngrok-skip-browser-warning": 1}
    });
    const prob = [Math.floor(Math.random() * 2), Math.floor(Math.random() * 2), Math.floor(Math.random() * 2), Math.floor(Math.random() * 2), Math.floor(Math.random() * 2)];
    const data = await respone.json();
    setOriginalPoem(data);
    var is_green_temp = [[0, 0, 0, 0, 0, 0, 0, 0],
                         [1, 1, 1, 1, 1, 1, 1, 1], 
                         [1, 1, 1, 1, 1, 1, 1, 1],
                         [1, 1, 1, 1, 1, 1, 1, 1],
                         [1, 1, 1, 1, 1, 1, 1, 1]];
    var score_temp = [[0, 0, 0, 0, 0, 0, 0, 0],
                      [0, 0, 0, 0, 0, 0, 0, 0], 
                      [0, 0, 0, 0, 0, 0, 0, 0],
                      [0, 0, 0, 0, 0, 0, 0, 0],
                      [0, 0, 0, 0, 0, 0, 0, 0]];
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
    setScore(score_temp);
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

  const fetch3 = async (sentence, target) => {
    const respone = await fetch(`${flask_web}/score/${sentence}/${target}`, {
      headers : {"ngrok-skip-browser-warning": 1}
    });
    const data = await respone.json();
    console.log('-->', sentence, target, data[0]);
    return data[0];
  }

  const handle = (i, j) => (event) => {
    var new_poem = poem2.map((row) => row.slice());
    var is_green_temp = isGreen.map((row) => row.slice());
    var score_temp = score.map((row) => row.slice());
    new_poem[i][j] = event.target.value;
    setPoem2(new_poem);

    var string17 = originalPoem[1][0] + originalPoem[1][1] + originalPoem[1][2] + originalPoem[1][3] + originalPoem[1][4] + originalPoem[1][5] +
                   originalPoem[1][6];
    var string22 = string17 + originalPoem[1][7] + originalPoem[2][0] + originalPoem[2][1];
    var string27 = string22 + originalPoem[2][3] + originalPoem[2][4] + originalPoem[2][5] + originalPoem[2][6];
    var string37 = string27 + originalPoem[3][0] + originalPoem[3][1] + originalPoem[3][2] + originalPoem[3][3] + 
                   originalPoem[3][4] + originalPoem[3][5] + originalPoem[3][6];
    var string42 = string37 + originalPoem[4][0] + originalPoem[4][1]

    if((i === 1 && j === 7) || (i === 2 && j === 2)) {
      fetch2(new_poem[1][7], new_poem[2][2]).then(data => {
        if(data[0]) {
          is_green_temp[1][7] = 1;
          is_green_temp[2][2] = 1;
          fetch3(string17, new_poem[1][7]).then(data2 => {
            score_temp[1][7] = data2;
            fetch3(string22, new_poem[2][2]).then(data3 => {
              score_temp[2][2] = data3;
              setScore(score_temp);
            });
          });
        }else {
          is_green_temp[1][7] = 0;
          is_green_temp[2][2] = 0;
          score_temp[1][7] = 0;
          score_temp[2][2] = 0;
          setScore(score_temp);
        }
        setIsGreen(is_green_temp);
      });
    }
    if((i === 2 && j === 7) || (i === 3 && j === 7)) {
      fetch2(new_poem[2][7], new_poem[3][7]).then(data => {
        if(data[0]) {
          is_green_temp[2][7] = 1;
          is_green_temp[3][7] = 1;
          fetch3(string27, new_poem[2][7]).then(data2 => {
            score_temp[2][7] = data2;
            fetch3(string37, new_poem[3][7]).then(data3 => {
              score_temp[3][7] = data3;
              setScore(score_temp);
            });
          });
        }
        else {
          is_green_temp[2][7] = 0;
          is_green_temp[3][7] = 0;
          score_temp[2][7] = 0;
          score_temp[3][7] = 0;
          setScore(score_temp);
        }
        setIsGreen(is_green_temp);
      });
    }
    if((i === 3 && j === 7) || (i === 4 && j === 2)) {
      fetch2(new_poem[3][7], new_poem[4][2]).then(data => {
        if(data[0]) {
          is_green_temp[3][7] = 1;
          is_green_temp[4][2] = 1;
          fetch3(string37, new_poem[3][7]).then(data2 => {
            score_temp[3][7] = data2;
            fetch3(string42, new_poem[4][2]).then(data3 => {
              score_temp[4][2] = data3;
              setScore(score_temp);
            });
          });
        }
        else {
          is_green_temp[3][7] = 0;
          is_green_temp[4][2] = 0;
          score_temp[3][7] = 0;
          score_temp[4][2] = 0;
          setScore(score_temp);
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
            var check = true;
            for(var i=1; i<5; i++) {
              for(var j=0; j<8; j++) {
                if(poem[i][j] === 'x') {
                  console.log('bruh', i, j);
                  if(score[i][j] < 3) {
                    check = false;
                  }
                }
              }
            } 
            if(check) {
              setButtonAppear(true);
              console.log('count : ', count);
              console.log(buttonAppear);
            }else {
              setButtonAppear(false);
            }
          }else {
            setButtonAppear(false);
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
    <>
      <LevelsBar/>
      {numStage > 5 ? (
        <div> done !! </div>
      ) : (
        <>
          <div className="num-stage">stage : {numStage} / 5</div>
          {poem !== null ? (
            <>
              <div className="start-word">topic word : {poem[0]}</div>
              <div className="poem">
                <div className="top">
                  <div className="top-left">
                    {poem[1].map((word, index) => (
                      (word !== 'x') ? (
                        <div key={index} className="word">{word}</div>
                      ) : (
                        <div key={index} className="word">
                          ({score[1][index]})
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
                          ({score[2][index]}) 
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
                          ({score[3][index]}) 
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
                          ({score[4][index]}) 
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

          {buttonAppear && (
            <div className="cover">
              <div className="next-stage-button" onClick={handleClick}> next stage !! </div>
            </div>
          )}
        </>
      )}
    </>
  );
}
export default Medium;