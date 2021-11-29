import React, { useRef, useState, useEffect, useReducer} from "react";
import {useSelector, useDispatch} from 'react-redux'
import * as tf from "@tensorflow/tfjs";
import * as handpose from "@tensorflow-models/handpose";
import Webcam from "react-webcam";
import * as fp from "fingerpose";
import {fetchPhrases} from '../store/phrases'


const SingleLearning = () => {
  const dispatch = useDispatch();
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);


  const [currentLetter, setLetter] = useState(null);
  const [emoji, setEmoji] = useState(null);
  const allLetters = useSelector(state => state.phrases)
  const [images, setImages] = useState(null)

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






}

export default SingleLearning
