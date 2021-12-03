import React, { useRef, useState, useEffect, useReducer } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as tf from "@tensorflow/tfjs";
import * as handpose from "@tensorflow-models/handpose";
import Webcam from "react-webcam";
import * as fp from "fingerpose";
import { fetchPhrases, unlockPhrases } from "../store/phrases";
import { addPoints } from "../store/points"
import { allGestures } from "../letterGestures";
import { useHistory } from "react-router-dom";

const SingleTest = props => {
  const dispatch = useDispatch();
  const history = useHistory();
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  const [currentLetter, setLetter] = useState("");
  const [emoji, setEmoji] = useState(null);
  // const [images, setImages] = useState({});
  // const [textImages, setTextImages] = useState({})
   const [ifTextBox, setTextBox] = useState(true);

  let textCheck = false;
  const [mixedImages, setMixedImages] = useState({});
  const [userTextInput, setTextInput] = useState('');
  let allLetters = useSelector(state => state.phrases);


  const lettersOnly = allLetters.map(letter => letter.letterwords);
  //Object is now 2d array: [[key1,value1], [key2,value2]]
  const currentGestures = Object.entries(allGestures)
    .filter(entry => {
      //key = key1 & value = value1  ..etc
      const [key, value] = entry;
      return lettersOnly.includes(key);
    })
    .map(entry => {
      const [key, value] = entry;
      return value;
    });

  const gestureAccuracyMany = 9.5;
  const gestureAccuracyOne = 9.2;

  //setTimeout ids to clear
  let timerBetweenLetterId;
  let timerBetweenCompletionId;

  //Like componentDidMount
  useEffect(() => {
    dispatch(fetchPhrases(props.match.params.tier));
  }, []);

  //Like componentWillUpdate
  useEffect(() => {

    if(currentLetter !== 'A' && mixedImages[currentLetter] && mixedImages[currentLetter].includes("letter")) {
      console.log('ive updated setTextBox to true');
      setTextBox(true);
      textCheck = true;
    } else {
      console.log('ive updated setTextBox to false');
      setTextBox(false);
      textCheck = false;
    }

    let intervalId;
    const runHandModel = async () => {
      intervalId = await runHandpose();
      return intervalId;
    };
    if(textCheck){
      runTextBox();
    } else {
      intervalId = runHandModel();
    }

    if(!mixedImages['A']){
    setMixedImages(
      allLetters.reduce((accu, letter) => {
        if(letter.letterwords === 'A'){
          accu[letter.letterwords] = letter.textUrl;
        }
        else if(Math.random() > 0.5){
          accu[letter.letterwords] = letter.url;
        }
        else {
          accu[letter.letterwords] = letter.textUrl
        }
        return accu;
      }, {})
      );
    }

    // Like componentWillUnmount
    return async () => {
      clearInterval(await intervalId);
      clearTimeout(timerBetweenLetterId)
      clearTimeout(timerBetweenCompletionId)
    };
  }, [currentLetter]);

  const handleUpdate = async (event) => {
    await setTextInput(event.target.value)
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    await setTextInput(event.target.value)
  }
  //componentWillUpdate to get allLetters
  useEffect(() => {
    allLetters[0] ? setLetter(allLetters[0].letterwords) : "";
  }, [allLetters]);

  useEffect(() => {
    runTextBox();
  }, [userTextInput]);

const runTextBox = async () => {
  console.log('run text box is running!');
  const net = await handpose.load(); //just to run camera
  await detect(net); //just to run camera
  console.log('userTextInput in runTextBox function', userTextInput, 'currentLetter', currentLetter, currentLetter === userTextInput);
  if(userTextInput){
  if(userTextInput.toUpperCase() === currentLetter && userTextInput){
        let letterIndex = lettersOnly.indexOf(currentLetter) + 1;
        if (letterIndex < lettersOnly.length) {
          timerBetweenLetterId = setTimeout(() => {
            setLetter(lettersOnly[letterIndex]);
          }, 3000); // timer for between gestures
        } else {
          dispatch(unlockPhrases(props.match.params.tier));
          dispatch(addPoints(20));
          timerBetweenCompletionId = setTimeout(() => {
            history.push({
              pathname: "/completionPage",
              state: { tier: Number(props.match.params.tier) },
            });
          }, 3000)
        }
      }
    }
  }

  const runHandpose = async () => {
    const net = await handpose.load();

    //Loop and detect hands
    let intervalId = setInterval(async () => {
      let result = await detect(net);
      //getresultfrom text box

      if (result === currentLetter){
        clearInterval(intervalId);
        let letterIndex = lettersOnly.indexOf(currentLetter) + 1;

        if (letterIndex < lettersOnly.length) {
          timerBetweenLetterId = setTimeout(() => {
            setLetter(lettersOnly[letterIndex]);
          }, 3000); // timer for between gestures
        } else {
          dispatch(unlockPhrases(props.match.params.tier));
          dispatch(addPoints(20));
          timerBetweenCompletionId = setTimeout(() => {
            history.push({
              pathname: "/completionPage",
              state: { tier: Number(props.match.params.tier) },
            });
          }, 3000)
        }
      }
    }, 100);

    return intervalId;
  };

  const detect = async net => {
    //Check data is available
    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) {
      //Get video properties
      const video = webcamRef.current.video;
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;

      //Set video height and width
      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;

      //Set canvas height and width
      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;

      // Make detections
      const hand = await net.estimateHands(video);

      // Gesture detections
      if (hand.length > 0) {
        const GE = new fp.GestureEstimator(currentGestures);

        //second argument is the confidence level
        const gesture = await GE.estimate(hand[0].landmarks, 8);
        if (gesture.gestures !== undefined && gesture.gestures.length > 0) {
          const confidence = gesture.gestures.map(
            prediction => prediction.score
          );
          const maxConfidence = confidence.indexOf(
            Math.max.apply(null, confidence)
          );
          const maxGesture = gesture.gestures[maxConfidence];
          if (
            (gesture.gestures.length === 1 &&
              maxGesture.score >= gestureAccuracyOne) ||
            maxGesture.score >= gestureAccuracyMany
          ) {
            setEmoji(maxGesture.name);
            return maxGesture.name;
          }
        }
      }
    }
  };



  let checkMark =
    (emoji === currentLetter && !(ifTextBox || textCheck)) ? (
      <img
        src="https://cdn2.iconfinder.com/data/icons/greenline/512/check-512.png"
        style={{
          position: "absolute",
          marginLeft: "auto",
          marginRight: "auto",
          left: 400,
          bottom: 50,
          right: 0,
          textAlign: "center",
          height: 100,
        }}
      />
    ) : (
      ""
    );

    let textBoxx =
    ifTextBox || textCheck ? (
      <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="userGuess">Guess letter</label>
        <input type="text"
        onChange={handleUpdate}
        name="userGuess"
        value={userTextInput}
        />
        {/* style={{
          position: "absolute",
          marginLeft: "auto",
          marginRight: "auto",
          left: 400,
          bottom: 50,
          right: 0,
          textAlign: "center",
          height: 100,
        }} */}
      </form>
      </div>
    ) : (
      ""
    );



  return (
    <div className="App">
      <header className="App-header">
        <Webcam
          ref={webcamRef}
          style={{
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            left: 0,
            right: 0,
            textAlign: "center",
            zindex: 9,
            width: 640,
            height: 480,
          }}
        />
        <canvas
          ref={canvasRef}
          style={{
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            left: 0,
            right: 0,
            textAlign: "center",
            zindex: 9,
            width: 640,
            height: 480,
          }}
        />

        <img src={mixedImages[currentLetter]}
          style={{
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            left: 100,
            bottom: 50,
            right: 0,
            textAlign: "center",
            height: 100,
          }}
        />

        {checkMark}
        {textBoxx}
      </header>
    </div>
  );
};

export default SingleTest;
