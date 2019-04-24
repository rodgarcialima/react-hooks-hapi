import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";

const data = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100
  }
];

export const Dashboard = () => {
  const renderChart = () => {
    return (
      <ResponsiveContainer>
        <AreaChart
          data={data}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="uv"
            stackId="1"
            stroke="#8884d8"
            fill="#8884d8"
          />
          <Area
            type="monotone"
            dataKey="pv"
            stackId="1"
            stroke="#82ca9d"
            fill="#82ca9d"
          />
          <Area
            type="monotone"
            dataKey="amt"
            stackId="1"
            stroke="#ffc658"
            fill="#ffc658"
          />
        </AreaChart>
      </ResponsiveContainer>
    );
  };

  const renderCell = (color, textColor, label, value) => {
    return (
      <div className={`${color} ${textColor} p-4 m-2 rounded flex-1`}>
        <div className="flex flex-col">
          <div className="text-sm">{label}</div>
          <div className="mt-2 text-2xl self-start">{value}</div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col flex-grow bg-theme-main">
      <div className="flex bg-theme-dash-panel mt-2 ml-2 mr-2 justify-between">
        {renderCell(
          "bg-grey-darkest",
          "text-white",
          "SQS Total Messages",
          19423723
        )}
        {renderCell("bg-red-darker", "text-white", "SQS Today Messages", 1313)}
        {renderCell("bg-orange-dark", "text-white", "Test", 2129456739)}
        {renderCell("bg-green-dark", "text-white", "Test2", 31847134)}
      </div>
      <div className="flex bg-theme-dash-panel m-2 justify-between">
        <div className="w-full h-64 p-4">{renderChart()}</div>
      </div>
    </div>
  );
};

export default Dashboard;
