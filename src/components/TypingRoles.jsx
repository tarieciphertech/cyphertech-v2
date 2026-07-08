import { useEffect, useState } from "react";

const roles = ["Full-Stack Developer", "Linux Administrator", "Cybersecurity Enthusiast", "Tech Entrepreneur"];

export default function TypingRoles() {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");

  useEffect(() => {
    const word = roles[index];
    let i = 0;
    const timer = setInterval(() => {
      setText(word.slice(0, i + 1));
      i++;
      if (i === word.length) {
        clearInterval(timer);
        setTimeout(() => {
          setText("");
          setIndex((prev) => (prev + 1) % roles.length);
        }, 1200);
      }
    }, 75);

    return () => clearInterval(timer);
  }, [index]);

  return <p className="font-mono text-cyan-300 mt-4">&gt; {text}<span className="animate-pulse">_</span></p>;
}
