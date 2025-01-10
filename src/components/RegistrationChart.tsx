import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface RegistrationChartProps {
    monthlyData: { day: string; count: number }[]; // Dữ liệu đăng ký theo ngày
}

const RegistrationChart: React.FC<RegistrationChartProps> = ({ monthlyData }) => {
    const data = {
        labels: monthlyData.map(item => item.day),
        datasets: [
            {
                label: 'Số lượng người dùng đăng ký',
                data: monthlyData.map(item => item.count),
                backgroundColor: '#FFA726',
                borderColor: '#FB8C00',
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: true,
                text: 'Tỷ lệ người dùng đăng ký trong tháng',
            },
        },
    };

    return (
        <div className="p-4 border rounded-lg shadow-md bg-white">
            <Bar data={data} options={options} />
        </div>
    );
};

export default RegistrationChart;
