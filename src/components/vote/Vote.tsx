"use client"
import React, { useState } from 'react'
import styles from './Vote.module.css'
import { domain, port, secure } from "@/lib/global/global"
import { useAuth } from '@/lib/authContext'

interface VoteButtonProps {
  upvotes: number
  downvotes: number
  userVoted: boolean
  questId: number
}

const VoteButton: React.FC<VoteButtonProps> = ({ upvotes, downvotes, userVoted, questId }) => {
  const { user } = useAuth();
  const [score, setScore] = useState<number>(upvotes - downvotes)
  const [voted, setVoted] = useState<boolean>(userVoted)

  const handleVote = async (type: "UpVote" | "DownVote") => {
    if (voted) return
    try {
      const response = await fetch(`http${secure ? "s" : ""}://${domain}:${port}/Vote/Vote`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${await user?.getIdToken()}` },
        body: JSON.stringify({ type, for: "Quest", id: questId })
      })
      if (response.ok) {
        setScore(type === "UpVote" ? score + 1 : score - 1)
        setVoted(true)
      }
    } catch (error) {
      console.error("Error voting:", error)
    }
  }

  return (
    <div className={styles.voteRow}>
      <div className={styles.score}>{score}</div>
      <div className={styles.voteBox}>
        <button onClick={() => handleVote("UpVote")} disabled={voted} className={styles.voteButton}>▲</button>
        <button onClick={() => handleVote("DownVote")} disabled={voted} className={styles.voteButton}>▼</button>
      </div>
    </div>
  )
}

export default VoteButton
