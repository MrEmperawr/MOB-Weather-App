import React from 'react';
import { LineChart, Line, XAxis, YAxis, LabelList, Label, ResponsiveContainer} from 'recharts';

export default function Chart({chartData}) {

  return (
    <div>
      <ResponsiveContainer width="100%" height={200}>

        <LineChart data={chartData} margin={{ top: 10, right: 10, left: 10, bottom: 10 }} >
        
          <Line type="monotone" dataKey="high" stroke="#ffffff" fill="#fc3503" strokeWidth={2}>
            <LabelList dataKey="high" position="top" fill="#ffffff" fontSize="13"/>
          </Line>

          <Line type="monotone" dataKey="low" stroke="#ffffff" strokeWidth={2} fill="#039dfc">
            <LabelList dataKey="low" position="bottom" fill="#ffffff" fontSize="13"/>
          </Line>
          
          <XAxis dataKey="name"  padding={{ left: 20, right: 20}} stroke="#ffffff">
            <Label value="Weekly Forecast" position="top" fill="#ffffff" fontSize="5vw"/>
          </XAxis>
          <YAxis padding={{ top: 10 }} hide />
        </LineChart>

      </ResponsiveContainer>
    </div>
  );
}