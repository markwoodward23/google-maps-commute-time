import React from 'react'

import {
  CartesianGrid,
  ResponsiveContainer,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

const SimpleLineChart = () => {
  const [data, setData] = React.useState();

  React.useEffect(() => {
    const fetcher = async () => {
      // add yours here, e.g. https://google-maps-commute-time-rtdb.firebaseio.com/logs.json?print=pretty
      // /logs defines the path to the node.
      const databaseUrl = '';
      const res = await fetch(databaseUrl).then(data => data.json());
      const mapped = Object.entries(res).map(([key, val]) => ({
        date: key,
        time: parseInt(val.match(/\d+/)[0], 10) // parse "20 min" to number
      }))
      setData(mapped);
    }
    fetcher();
  }, [])

  // you'll need to scale the "domain" ie the scale
  // and the "ticks" - we generate a simple array to
  // indiciate we want lines at [20, 21, 22... etc] 

  return (
    <div style={{ marginTop: '48px' }}>
      <ResponsiveContainer width="100 %" height={600}>
        <LineChart data={data}>
          <Line type="monotone" dataKey="time" stroke="#8884d8" />
          <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
          <XAxis dataKey="date" tick={false} />
          <YAxis dataKey="time" domain={[20, 37]} type="number" ticks={Array.from({ length: 17 }, (_, i) => i + 21)} />
          <Tooltip />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export default SimpleLineChart