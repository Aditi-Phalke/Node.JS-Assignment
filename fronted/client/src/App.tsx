import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import socketIOClient from 'socket.io-client';

const ENDPOINT = 'http://localhost:5000'; // Your server URL

const App: React.FC = () => {
  const [data, setData] = useState<number[]>([]);

  useEffect(() => {
    fetchData();
    const socket = socketIOClient(ENDPOINT);
    socket.on('dataUpdate', (newData: number[]) => {
      setData(newData);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get<number[]>('/api/data');
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const options = {
    // Add chart options here
  };

  const chartData = {
    labels: Array.from({ length: data.length }, (_, i) => i.toString()),
    datasets: [
      {
        label: 'Data',
        data,
        fill: false,
        borderColor: 'rgba(75,192,192,1)',
      },
    ],
  };

  return (
    <div>
      <h1>Live Data Chart</h1>
      <Line data={chartData} options={options} />
    </div>
  );
};

export default App;
