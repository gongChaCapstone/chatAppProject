import React, { useRef, useState, useEffect, useReducer} from "react";
import {useSelector, useDispatch} from 'react-redux'
import * as tf from "@tensorflow/tfjs";
import * as handpose from "@tensorflow-models/handpose";
import Webcam from "react-webcam";
import * as fp from "fingerpose";
import {fetchPhrases} from '../store/phrases'
//import allGestures from './whereever'


const SingleLearning = () => {
  const dispatch = useDispatch();
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);


  const [currentLetter, setLetter] = useState(null);
  const [emoji, setEmoji] = useState(null);
  const [images, setImages] = useState(null)
  const allLetters = useSelector(state => state.phrases)
  const currentGestures = allGestures.filter(gesture => {
    const lettersOnly = allLetters.map(letter => letter.letterwords);

    if (lettersOnly.includes(gesture.toString())) {
      return true;
    } else {
      return false
    }
  })


  const gestureAccuracyMany = 10;
  const gestureAccuracyOne = 9.5;

  //like componentDidMount
  useEffect(() => {
    dispatch(fetchPhrases(1)) //need to make tier dynamic
    setLetter(allLetters[0].letterwords)
    setImages(allLetters.reduce((accu,letter) => {
      accu[letter.letterwords] = letter.url
      return accu
    },{}))
  }, [])

  const runHandpose = async () => {
    const net = await handpose.load();

    //Loop and detect hands
    let timerId = setInterval(async () => {
      let result = await detect(net);

      if (result === currentLetter) {
        clearInterval(timerId);

        const letterIndex = allLetters.indexOf(currentLetter) + 1;

        if (letterIndex < allLetters.length) {
          setTimeout(() => {
            setLetter(allLetters[letterIndex]);
          }, 3000); // timer for between gestures
        } //else statement to update database upon completion
      }
    }, 100);
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
        const GE = new fp.GestureEstimator([
          //--------ADD NEW HERE--------
          fp.Gestures.VictoryGesture,
          fp.Gestures.ThumbsUpGesture,
          letterAGesture,
          letterBGesture,
          letterCGesture,
        ]);

        //second argument is the confidence level
        const gesture = await GE.estimate(hand[0].landmarks, 8);

        if (gesture.gestures !== undefined && gesture.gestures.length > 0) {
          const confidence = gesture.gestures.map(
            prediction => prediction.score
          );

          const maxConfidence = confidence.indexOf(
            Math.max.apply(null, confidence)
          );

          console.log(gesture);

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
  console.log(emoji);


}

export default SingleLearning
