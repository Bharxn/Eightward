import { db, auth } from "./../../firebase/firebase";
import { useEffect, useState } from "react";
import { ref, set, onValue, update } from "firebase/database";
import Game1 from "./Game1";
import { flask_web } from "../js/flaskweb";

function Online() {
  const [isSignIn, setIsSignIn] = useState(true);
  const [isFindMatch, setIsFindMatch] = useState(false);
  const [isFindOpponent, setIsFindOpponent] = useState(false);
  const [topicWord, setIsTopicWord] = useState('null');
  const user = auth.currentUser;

  useEffect(() => {
    const fetch_rand_word = async () => {
      const respone = await fetch(`${flask_web}/rand_word`, {
        headers : {"ngrok-skip-browser-warning": 1}
      });
      const data = await respone.json();
      console.log(data);
      return data[0];
    }
    
    if(user) {
      console.log(user);
      fetch_rand_word().then(data => {
        set(ref(db, 'info/' + user.uid), {
          online_play: false,
          opponent: "null",
          topic_word: data
        });
      }); 
    }else {
      setIsSignIn(false);
      console.log('sign in first !!');
    }
  }, [])

  onValue(ref(db, 'info/'), (snapshot) => {
    if(snapshot.val()[user.uid].online_play) {
      const data = snapshot.val();
      console.log(data);
      if(data) {
        Object.entries(data).forEach(([key, value]) => {
          console.log('**', key, value.online_play);
          if(key !== user.uid && value.online_play) {
          setIsFindOpponent(true);
          set(ref(db, 'info/' + key), {
            online_play: false,
            opponent: user.uid,
            topic_word: snapshot.val()[user.uid].topic_word
          });
          set(ref(db, 'info/' + user.uid), {
            online_play: false,
            opponent: key,
            topic_word: snapshot.val()[user.uid].topic_word
          });
            // return;
          }
        });
      }
    }
  });

  const handleClick = () => {
    if(isFindMatch) {
      setIsFindMatch(false);
      const updates = {};
      updates[`info/${user.uid}/online_play`] = false;
      update(ref(db), updates);
    }else {
      setIsFindMatch(true);
      const updates = {};
      updates[`info/${user.uid}/online_play`] = true;
      update(ref(db), updates);
    }
  }

  return(
    <>
      {isSignIn ? (
        <div className="cover">
          {isFindMatch ? (
            isFindOpponent ? (
              <div className="cover">
                {/* <div> Battle </div> */}
                <Game1 topic_word={'ไก่'} prob={[1, 0, 1, 0, 1]}/>
              </div>
            ) : (
              <div className="grid">
                <h2 className="section-title">WHAT IS ONLINE MODE</h2>
                <p className="section-description">
                  ONLINE MODE <span style={{color: '#DDE6ED'}}> เป็นเกมที่ใช้เพิ่มประสิทธิภาพการแต่งกลอนของคุณโดยการแข่งแต่งกลอน </span>
                  <br />
                  <span style={{color: '#DDE6ED'}}> อย่างสั้นร่วมกับผู้เล่นคนอื่นแบบ </span> <span style={{color: '#FF2F2F'}}>1 vs 1</span> <span style={{color: '#DDE6ED'}}> โดยจะมีให้สุ่มเล่นกันทั้งหมด 2 โหมด </span>
                  <br />
                  <span style={{fontWeight: '700', color: '#DDE6ED'}}> 1.Fastest mode </span>
                  <br />
                  <span style={{fontWeight: '700', color: '#DDE6ED'}}> 2.Best word </span>
                </p>
                <div className="find-match-button" onClick={handleClick}> FINDING MATCH ... </div>
              </div>
            )
          ) : (
            <div className="grid">
              <h2 className="section-title">WHAT IS ONLINE MODE</h2>
              <p className="section-description">
                ONLINE MODE <span style={{color: '#DDE6ED'}}> เป็นเกมที่ใช้เพิ่มประสิทธิภาพการแต่งกลอนของคุณโดยการแข่งแต่งกลอน </span>
                <br />
                <span style={{color: '#DDE6ED'}}> อย่างสั้นร่วมกับผู้เล่นคนอื่นแบบ </span> <span style={{color: '#FF2F2F'}}>1 vs 1</span> <span style={{color: '#DDE6ED'}}> โดยจะมีให้สุ่มเล่นกันทั้งหมด 2 โหมด </span>
                <br />
                <span style={{fontWeight: '700', color: '#DDE6ED'}}> 1.Fastest mode </span>
                <br />
                <span style={{fontWeight: '700', color: '#DDE6ED'}}> 2.Best word </span>
              </p>
              <div className="find-match-button" onClick={handleClick}> ENTER MATCHMAKING </div>
            </div>
          )}
        </div>
      ) : (
        <h1> Sign in first !! </h1>
      )}
    </>
  );
}
export default Online;