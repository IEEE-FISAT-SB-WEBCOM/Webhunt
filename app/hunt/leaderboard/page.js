'use client'
import { useEffect, useState } from 'react';
import Image from 'next/image';
import '/app/leader.css';
import toast, { Toaster } from "react-hot-toast";

import Link from 'next/link';
import { MdOutlineLeaderboard } from "react-icons/md";
import { IoIosLogOut } from "react-icons/io";
import { RiHomeLine } from "react-icons/ri";

export default function Page() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [active, setactive] = useState("leaderBoard");


  const fetchLeaderboard = async () => {
    try {
      const res = await fetch("/api/auth/Fetchleader", {
        cache: 'no-store',
        headers: {
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache',
          'Expires': '0',
        },
      });
      const data = await res.json();
      if (data.message === "Leaderboard fetched successfully") {
        setLeaderboard(data.leaderboard);
      } else {
        console.error("Failed to fetch leaderboard");
      }
    } catch (error) {
      console.error("Error fetching leaderboard:", error);
    }
  };


  
  const logOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("hints");
    localStorage.removeItem("level");
    localStorage.removeItem("score");

    toast.loading("Logging Out");

    setTimeout(() => {
      toast.success("Logged out");
      window.location.href = "/";
    }, 500);
  };


  

  useEffect(() => {
    fetchLeaderboard();
    const intervalId = setInterval(fetchLeaderboard, 30000);
    return () => clearInterval(intervalId);
  }, []);


  const renderTopThree = () => {
    if (leaderboard.length < 3) return null;
    const [first, second, third] = leaderboard;
    return (
      <div className="top-three">
        <div className="card first-place">
          <div className="medal">🥇</div>
          <div className="user-name">{first.name}</div>
          <div className="points">{first.score} points</div>
        </div>
        <div className="card second-place">
          <div className="medal">🥈</div>
          <div className="user-name">{second.name}</div>
          <div className="points">{second.score} points</div>
        </div>
        <div className="card third-place">
          <div className="medal">🥉</div>
          <div className="user-name">{third.name}</div>
          <div className="points">{third.score} points</div>
        </div>
      </div>
    );
  };

  return (
    <>
    <div className="container">
      <h1 className="title">Web Hunt Leaderboard</h1>
      {renderTopThree()}
      <div className="leaderboard-list">
        <ul>
          {leaderboard.slice(3).map((user, index) => (
            <li key={index} className="leaderboard-item">
              <span className="rank">{index + 4}</span>
              <span className="name">{user.name}</span>
              <span className="score">{user.score} points</span>
            </li>
          ))}
        </ul>
      </div>
      <footer className="footer">
        <div className="copyright">
          &copy; Copyright <strong>IEEE FISAT SB</strong>.
        </div>
        <div className="credits">
          Designed with 💚 by <a href="https://www.ieee.fisat.ac.in/webcom.html?value=index">IEEE FISAT SB WebCom</a>
        </div>
      </footer>
    </div>
    <nav className="fixed bottom-0 left-0 w-full bg-black border-t-2 border-gray-800 text-3xl font-light flex justify-evenly items-center h-16 text-white">
            <Link href="/hunt/game">
              <RiHomeLine
                className={`cursor-pointer ${
                  active === "home" ? "text-green-400" : "text-white"
                }`}
                onClick={() => setactive("home")}
              />
            </Link>
            <Link href="/hunt/leaderboard">
              <MdOutlineLeaderboard
                className={`cursor-pointer ${
                  active === "leaderBoard" ? "text-green-400" : "text-white"
                }`}
                onClick={() => setactive("leaderBoard")}
              />
            </Link>

            <Link href="/">
              <IoIosLogOut
                className={`cursor-pointer ${
                  active === "Account" ? "text-green-400" : "text-white"
                }`}
                onClick={() => logOut()}
              />
            </Link>
          </nav>
</>
  );
}