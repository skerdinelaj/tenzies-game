import React from 'react'

export default function Dice({value, selected, onClick}) {
    const styles = {
        background: selected ? "#59E391" : "white"
    }
  return (
    <div className="dice" style={styles} onClick={onClick}>
        <h1>{value}</h1>
    </div>
  )
}
