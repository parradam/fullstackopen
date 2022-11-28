import { useState } from "react";

import Button from "./Button";
import Stats from "./Stats";

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <h1>give feedback</h1>
      <div>
        <Button text="good" handleClick={() => setGood(good + 1)} />
        <Button text="neutral" handleClick={() => setNeutral(neutral + 1)} />
        <Button text="bad" handleClick={() => setBad(bad + 1)} />
      </div>

      <h2>statistics</h2>
      <Stats rating="good" count={good} />
      <Stats rating="neutral" count={neutral} />
      <Stats rating="bad" count={bad} />
      <Stats rating="all" count={good + neutral + bad} />
      <Stats rating="average" count={(good - bad)/(good + neutral + bad)} />
      <Stats rating="positive" count={100 * (good)/(good + neutral + bad) + " %"} />
    </div>
  );
}

export default App;