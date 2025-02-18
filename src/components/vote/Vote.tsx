"use client"
import React, { useState } from 'react'
import styles from './Vote.module.css'
import { domain, port, secure } from "@/lib/global/global"
import { useAuth } from '@/lib/authContext'

interface VoteButtonProps {
  votes: number
  userVoted: "UpVote" | "DownVote" | "none"
  questId: number
}

const VoteButton: React.FC<VoteButtonProps> = ({ votes, userVoted, questId }) => {
  const { user } = useAuth();
  const [score, setScore] = useState<number>(votes)
  const [voted, setVoted] = useState<"UpVote" | "DownVote" | "none">(userVoted)

  const handleVote = async (type: "UpVote" | "DownVote") => {
    if ((voted === "UpVote" && type === "UpVote") || (voted === "DownVote" && type === "DownVote")) return;

    try {
      const response = await fetch(`http${secure ? "s" : ""}://${domain}:${port}/Vote/Vote`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${await user?.getIdToken()}` },
        body: JSON.stringify({ type, for: "Quest", voteid: questId })
      })

      if (response.ok) {
        let newScore = score;

        if (voted === "DownVote" && type === "UpVote") {
          newScore += 2; // Switching from downvote to upvote adds 2
        } else if (voted === "UpVote" && type === "DownVote") {
          newScore -= 2; // Switching from upvote to downvote subtracts 2
        } else if (type === "UpVote") {
          newScore += 1; // Regular upvote adds 1
        } else if (type === "DownVote") {
          newScore -= 1; // Regular downvote subtracts 1
        }

        setScore(newScore);
        setVoted(type);
      }
    } catch (error) {
      console.error("Error voting:", error)
    }
  }

  return (
    <div className={styles.voteRow}>
      <div className={styles.score}>{score}</div>
      <div className={styles.voteBox}>
        <button onClick={() => handleVote("UpVote")} disabled={voted === "UpVote"} className={styles.voteButton}>▲</button>
        <button onClick={() => handleVote("DownVote")} disabled={voted === "DownVote"} className={styles.voteButton}>▼</button>
      </div>
    </div>
  )
}

export default VoteButton