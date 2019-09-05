import React from 'react';
import { XAxis, YAxis, AreaChart , Tooltip, Area, Label, ResponsiveContainer} from 'recharts';

export default function Chart({chartData}) {
console.log("WHEEEEEEEEEEEEEEEEEEEEE",chartData);
  return (
    <div>
      <ResponsiveContainer width="100%" height={200}>

        <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 10, bottom: 10 }} >
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <XAxis dataKey="timeStamp" padding={{ left: 20, right: 20}} stroke="#ffffff00">
            <Label value={`${chartData[0].label}`} position="insideBottom" fill="#ffffff" fontSize="5vw"/>
          </XAxis>
          <YAxis padding={{ bottom: 10 }} hide/>
          <Tooltip cursor={{ stroke: 'red', strokeWidth: 2 }} 
            wrapperStyle={{ backgroundColor: "red" }}
            labelStyle={{ color: "green" }}
            itemStyle={{ color: "black" , size: "50"}}
            labelFormatter={ value => `${value}`}
            formatter={(value, name) => `${value}`}
          />
          <Area type="monotone" dataKey="value" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />
        </AreaChart>

     </ResponsiveContainer>
    </div>
  );
}