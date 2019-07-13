import React,{ useState, useEffect, useReducer, useContext } from 'react';

export default function Hooks() {
  const [fruit, setFruit] = useState('欧尼');
  return (
    <div>
      <p>
        {
          fruit === '' ? 'world': fruit
        }
      </p>
    </div>
  )
}
