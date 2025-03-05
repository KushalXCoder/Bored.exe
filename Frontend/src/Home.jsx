import React, { useEffect, useState } from 'react';
import Background from "/background.jpg";
import { AnimatePresence, motion } from "motion/react";
import axios from "axios";
import LinkedIn from "/linkedin.png";
import GitHub from "/github.png";
import Cross from "/cross.png";
import Test from './Test';

const Home = () => {

  const arr = ["More fun than scrolling through inflation memes.",
    "If waiting for AI to take over your job is boring, click here.",
    "Better than doomscrolling through another tech layoff article.",
    "Even Twitter (X?) drama can't compete with this randomness.",
    "Breaking News: You’re still bored. Let’s fix that.",
    "Unlike your crypto investments, this won’t disappoint you.",
    "More unpredictable than Messi’s next club transfer.", 
    "Your attention span is shorter than a TikTok trend—so let’s make this fun."];

const boredOptions = [
{
category: "Games Roulette",
description: "Get redirected to a random online game – arcade, puzzle, or multiplayer, you never know!"
},
{
category: "Weird Wikipedia",
description: "Explore bizarre and unexpected Wikipedia articles that will blow your mind."
},
{
category: "Useless Websites",
description: "Visit a completely pointless yet oddly satisfying website."
},
{
category: "Old Internet Nostalgia",
description: "Take a trip back in time with old-school websites, Flash games, and forgotten internet gems."
},
{
category: "Fresh News",
description: "Get the latest news from around the world - from politics to entartainment, sports to technology, from TIMES OF INDIA."
},
{
category: "Test Knowledge",
description: "+10 for correct and -10 for wrong, let's check how far you can go across various domains !"
}
];

  const [isVisible, setIsVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState(boredOptions[0]);
  const [isLoading, setIsLoading] = useState(false);
  const [isWorking, setIsWorking] = useState(true);
  const [news, setNews] = useState([]);
  const [quiz, setQuiz] = useState(false);

  let num = Math.floor(Math.random() * arr.length);

  const handleClick = (e) => {
    e.preventDefault();
    setIsVisible(!isVisible);
  }

  const handleSelectChange = (e) => {
    e.preventDefault();
    const selectedIndex = parseInt(e.target.value, 10);
    setSelectedOption(boredOptions[selectedIndex]);
    setIsWorking(true);
  };

  const handleVisit = async () => {
      try {
        if(selectedOption.category === "Games Roulette" || selectedOption.category === "Useless Websites" || selectedOption.category === "Weird Wikipedia" || selectedOption.category === "Old Internet Nostalgia") {
          setIsWorking(true);
          setQuiz(false);
          const response = await axios.get(import.meta.env.VITE_BACKEND_URL + "/getData", {
            params: { option: selectedOption.category }
          });
          const num = Math.floor(Math.random() * response.data.length);
          window.open(`${response.data[num].url}`, '_blank');
        }
        else if(selectedOption.category === "Fresh News") {
          setIsWorking(true);
          setIsLoading(true);
          setQuiz(false);
          setNews(true);
          const response = await axios.get(import.meta.env.VITE_BACKEND_URL + "/getNews");
          setNews(response.data);
          setIsLoading(false);
          console.log(response.data);
        }
        else if(selectedOption.category === "Test Knowledge") {
          setQuiz(true);
        }
        else {
          setIsWorking(false);
          setQuiz(false);
        }
      } catch (error) {
        console.log("Error fetching data from backend", error);
      }
  }
  
  return (
    <div className="homepage-container h-full w-full flex flex-col relative overflow-x-hidden">
        <img src={Background} alt="Background" className='absolute h-full w-full z-[-1]'/>
        <div className="homapage-container-text h-full w-full z-10 flex flex-col justify-center items-center relative mb-10">
            <motion.h1 initial={{scale: 0, opacity: 0, y: -50}} animate={{scale: 1, opacity: 1, y : 0}} transition={{duration: 1.1, ease: "easeIn"}} className='text-8xl font-text font-bold text-blue-600 flex items-center gap-3'>
                Bored.exe
                <div className="line bg-black h-20 w-2 animate-pulse"></div>
            </motion.h1>
            <motion.h3 initial={{opacity: 0, scale: 0}} animate={{opacity: 1, scale: 1}} transition={{duration: 0.5, ease: "easeIn", delay: 0.6}} className='font-text text-2xl'>{arr[num]}</motion.h3>
            <motion.button className='font-text px-4 py-2 rounded bg-orange-400 mt-5 w-1/6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] text-white cursor-pointer hover:text-black' initial={{opacity: 0, scale: 0}} animate={{opacity: 1, scale: 1, transition:{duration: 1, ease: "easeIn"}}} whileHover={{scale: 0.9}} whileTap={{scale: 1.01}} onClick={(e) => handleClick(e)}>Get Started</motion.button>
            <AnimatePresence>
            {isVisible && (
                <motion.div initial={{scale: 0, opacity: 0}} animate={{scale: 1, opacity: 1}} exit={{scale: 0, opacity: 0}} transition={{duration: 0.7, ease: "easeOut"}} className="together flex flex-col absolute bottom-1/6 gap-3 w-2/4">
                  <div className='flex flex-row justify-center gap-5'>
                    <select 
                      className='border rounded-md px-4 py-2 font-text shadow-2xl shadow-amber-400 bg-[#b22222] text-white'
                      onChange={handleSelectChange}
                    >
                      {boredOptions.map((item, index) => (
                        <option key={index} value={index} className='bg-white text-black'>
                          {item.category}
                        </option>
                      ))}
                    </select>
                    <motion.button 
                      className='visit bg-blue-500 w-1/6 rounded-md font-text text-white cursor-pointer relative'
                      whileHover={{ scale: 0.9 }} 
                      whileTap={{ scale: 1.01 }}
                      onClick={handleVisit}
                    >
                      Visit
                    </motion.button>
                  </div>
                  <h3 className='details font-text text-lg text-gray-800 text-center'>
                    {selectedOption.description}
                  </h3>
                </motion.div>
            )}
            {!isWorking && (
              <motion.div initial={{opacity: 0, x: 300}} animate={{opacity: 1, x: 0}} exit={{opacity: 0, x: 300}} transition={{duration: 1, ease: "easeIn"}} className="message-box absolute top-5 right-5 h-20 w-90 bg-black rounded px-4 py-1.5 z-100">
                <h1 className='text-blue-500 font-text text-lg'>Bored.exe</h1>
                <p className='text-white font-text text-sm'>Still working on it, you can use Games Roulette and Useless Websites 😄.</p>
              </motion.div>
            )}
            {isLoading && (
                <div className="loader-container w-full flex justify-center mt-10 absolute bottom-2/6 z-100">
                    <span className="loader"></span>
                </div>
            )}
            {news.length > 0 && (
              <motion.div className='news-box h-4/5 w-120 bg-black flex z-100 overflow-x-scroll overflow-y-hidden absolute top-30 rounded-md'>
                {news.map((item,index) => (
                  <div key={index} className='min-w-full flex flex-col overflow-y relative border-4 border-orange-500'>
                    <img src={Cross} alt="Cross Image" className="cross absolute h-5 top-5 right-5 cursor-pointer" onClick={() => setNews(false)}/>
                    <img src={`${item.image}`} alt="News Image" className='h-60 w-full border-b-2 border-white'/>
                    <h1 className='text-blue-600 text-center font-text mt-3 px-2 font-bold'>{item.title}</h1>
                    <p className='text-white font-text text-center mt-3 px-4'>{item.content}</p>
                  </div>
                ))}
              </motion.div>
            )}
            {quiz && (
              <Test/>
            )}
            </AnimatePresence>
        </div>
        <motion.div initial={{opacity: 0, x: 300}} animate={{opacity: 1, x: 0, transition:{duration: 3, ease: "easeIn"}}} className="bottom-text font-text text-end p-3">
          Created by <span className='name text-orange-400 font-bold relative cursor-pointer'>Kushal Rathod</span>
        </motion.div>
        <motion.div initial={{opacity: 0, x: 300}} animate={{opacity: 1, x: 0, transition:{duration: 3, ease: "easeIn"}}} className="connect flex gap-3 absolute top-3 right-3 z-10">
          <a href="https://www.linkedin.com/in/kushal-rathod-90b800297" target='_blank'><img src={LinkedIn} alt="LinkedIn Logo" className='h-12 hover:shadow-2xl hover:shadow-orange-400 cursor-pointer'/></a>
          <a href="https://github.com/KushalXCoder" target='_blank'><img src={GitHub} alt="GitHub Logo" className='h-12 hover:shadow-2xl hover:shadow-orange-400'/></a>
        </motion.div>
    </div>
  )
}

export default Home