import React from 'react'

import StatisticsLine from './StatisticsLine'

function Statistics({good, neutral, bad, all, average, positive}) {
  if(all === 0)
  {
    return (
        <div>No feedback given</div>
    )
  }
  return (
    <div>
      <StatisticsLine text="good" value={good} />
      <StatisticsLine text="neutral" value={neutral} />
      <StatisticsLine text="bad" value={bad} />
      <StatisticsLine text="all" value={all} />
      <StatisticsLine text="average" value={average} />
      <StatisticsLine text="positive" value={positive} />
    </div>
  )
}

export default Statistics