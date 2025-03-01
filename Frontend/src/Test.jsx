import React, { useEffect, useState } from 'react';
import { motion } from "motion/react";
import axios from "axios";

const Test = () => {
  const [data, setData] = useState([]);
  const [isStarted, setIsStarted] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [shuffledOptions, setShuffledOptions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  let [total, setTotal] = useState(0);

  const categories = [
    { name: "General Knowledge", id: 9 },
    { name: "Sports", id: 21 },
    { name: "History", id: 23 },
    { name: "Films", id: 11 },
    { name: "Japanese Anime & Manga", id: 31 },
    { name: "Animals", id: 27 }
  ];

  const [category, setCategory] = useState(categories[0].id);

  const handleClick = async () => {
    const response = await axios.get(`https://opentdb.com/api.php?amount=50&category=${category}`);
    console.log(response.data.results);
    setData(response.data.results);
    setTotal(0);
    setIsStarted(true);
    shuffleOptions(response.data.results[currentQuestion]); // Shuffle options when fetching data
  };

  const shuffleOptions = (questionData) => {
    if (!questionData) return;
    const options = [...questionData.incorrect_answers, questionData.correct_answer];
    options.sort(() => Math.random() - 0.5);
    setShuffledOptions(options);
  };

  useEffect(() => {
    if (data.length > 0) {
      shuffleOptions(data[currentQuestion]); // Shuffle only when question changes
    }
  }, [currentQuestion, data]);

  const decodeEntities = (str) => {
    const txt = document.createElement("textarea");
    txt.innerHTML = str;
    return txt.value;
  };  

  const handleSubmit = () => {
    if (selectedOption === "") {
      alert("Select an option");
      return;
    }
    console.log(selectedOption);
    if (currentQuestion < data.length - 1) {
      if(selectedOption === data[currentQuestion].correct_answer) {
        total = total + 10;
        setTotal(total);
      }
      else {
        total = total - 10;
        setTotal(total);
      }
      console.log(total);
      setCurrentQuestion(currentQuestion + 1);
      setSelectedOption(""); // Reset selected option
    } else {
      alert("Quiz completed!");
      setIsStarted(false);
    }
  };

  return (
    <div className="test-container h-3/4 w-full flex justify-center items-center z-100 absolute top-1/5">
      <div className="test-box h-3/4 w-2/4 bg-amber-100 rounded-md p-3 shadow-2xl">
        <div className="test-box-inner h-full w-full bg-white rounded-md flex flex-col justify-between px-4 py-2">
          <div className="top-section w-full flex justify-between items-center">
            <h1 className='font-text font-bold text-blue-500 text-xl'>BORED.EXE</h1>
            <h1 className='font-text font-bold text-blue-500 text-xl'>TEST KNOWLEDGE</h1>
          </div>
          {isStarted ? data.length > 0 ? (
            <div className="middle-section mb-5">
              <p className='px-12 text-center font-text'>{decodeEntities(data[currentQuestion].question)}</p>
              <div className="options flex justify-center w-full">
                <div className="grid grid-cols-2 gap-4 w-3/4 mt-5 px-3 *:border *:px-4 *:py-2 *:text-center *:rounded-md *:cursor-pointer *:font-text">
                  {shuffledOptions.map((option, index) => (
                    <motion.p key={index} style={{ backgroundColor: selectedOption === option ? "#22c55e" : "rgba(232, 227, 225, 0)", color: selectedOption === option ? "white" : "black" }} whileHover={{ scale: 0.9, backgroundColor: "rgba(232, 227, 225, 1)" }} whileTap={{ scale: 1.01 }} onClick={() => setSelectedOption(option)}>
                      {option}
                    </motion.p>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <p className="text-center font-text text-gray-500">Loading questions...</p>
          ) : (
            <div className='start-interface flex flex-col items-center'>
              <h1 className='font-text'>Ready to test your knowledge ?</h1>
              <select className='w-2/5 border rounded-md my-2 px-4 py-2 font-text shadow-2xl shadow-amber-400 bg-[#b22222] text-white' onChange={(e) => {setCategory(e.target.value)}}>
                {categories.map((item) => (
                  <option key={item.id} value={item.id} className='bg-white text-black'>{item.name}</option>
                ))}
              </select>
              <motion.button className='px-4 py-1 bg-amber-400 w-1/4 rounded-md font-text shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] mt-2 cursor-pointer' whileHover={{ scale: 0.9 }} whileTap={{ scale: 1.01 }} onClick={handleClick}>Start</motion.button>
            </div>
          )}
          <div className="bottom-section flex justify-between items-center mb-1">
            <div className="score flex flex-col font-text">
              <h1 className='text-center font-bold text-xl mb-[-5px]'>{total}</h1>
              <p>Total Score</p>
            </div>
            <div className="close">
              <motion.button className="close w-full ms-12 px-4 py-2 bg-red-400 rounded-md font-text cursor-pointer" whileHover={{ scale: 0.9}} whileTap={{ scale: 1.01 }} onClick={() => setIsStarted(false)}>Close</motion.button>
            </div>
            <div className="buttons flex gap-5 *:cursor-pointer">
              <motion.button className={`submit px-4 py-2 bg-green-400 rounded-md w-1/2 font-text hover:bg-green-500 ${isStarted ? `` : `opacity-50`}`} whileHover={{ scale: 0.9, backgroundColor: "rgb(64, 213, 41)" }} whileTap={{ scale: 1.01 }} onClick={handleSubmit}>Submit</motion.button>
              <motion.button className={`quit px-4 py-2 bg-red-400 rounded-md w-1/2 font-text ${isStarted ? `` : `opacity-50`}`} whileHover={{ scale: 0.9, backgroundColor: "rgb(222, 17, 17)" }} whileTap={{ scale: 1.01 }} onClick={() => setIsStarted(false)}>Quit</motion.button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Test;