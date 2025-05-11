import { useState } from "react";
import s from "./HomeGreetings.module.css";
import { useSelector } from "react-redux";
import { selectIsLoggedIn, selectUser } from "../../redux/auth/selectors";
import { slideInFromLeft } from "../../motion/motion";
import { motion } from "framer-motion";

const quotes = [
  "Always believe in yourself!",
  "Success comes to those who don't give up.",
  "Every day is a new chance to change your life.",
  "It's not how many times you fall, but how many times you get up that matters.",
  "Dream, act, achieve.",
  "All our dreams can come true, if we have the courage to pursue them.",
  "Don't sit down and wait for the opportunities to come. Get up and make them.",
  "It takes courage to grow up and become who you really are.",
  "Your self-worth is determined by you. You don't have to depend on someone telling you who you are.",
  "Keep your face always toward the sunshine, and shadows will fall behind you.",
];

const HomeGreetings = () => {
  const [quote, setQuote] = useState("");
  const user = useSelector(selectUser);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const hour = new Date().getHours();
  const getGreeting = () => {
    if (hour < 12) {
      return isLoggedIn
        ? `Good Morning, ${user.name}!`
        : `Good Morning, friend!`;
    } else if (hour < 18) {
      return isLoggedIn ? `Good Day, ${user.name}!` : `Good Day, friend!`;
    } else {
      return isLoggedIn
        ? `Good Evening, ${user.name}!`
        : `Good Evening, friend!`;
    }
  };

  const getRandomQuote = () => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    setQuote(quotes[randomIndex]);
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={slideInFromLeft()}
      className={s.homePage}
    >
      <h1>{getGreeting()} Welcome to the Contact Book app!</h1>
      <p>
        This app helps you store and manage your contacts easily and convenient.
      </p>
      <button className={s.quoteButton} onClick={getRandomQuote}>
        Get an inspirational quote
      </button>
      {quote && <p className={s.quote}>{quote}</p>}
    </motion.div>
  );
};

export default HomeGreetings;
