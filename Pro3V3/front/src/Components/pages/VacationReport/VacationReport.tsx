import { useState } from 'react';
import './VacationReport.css';
import { BarChart } from '@mui/x-charts/BarChart';
import { axisClasses } from '@mui/x-charts/ChartsAxis';
import Box from '@mui/joy/Box';
import Container from '@mui/joy/Container';

const xLabels = [
  'Vacation 1',
  'Vacation 2',
  'Vacation 3',
  'Vacation 4',
  'Vacation 5',
  'Vacation 6',
  'Vacation 7',
  'Vacation 8',
  'Vacation 9',
  'Vacation 10',
];
const fData = [2, 5, 0, 0, 1, 3, 2, 0, 0, 0];
export function VacationReport(): JSX.Element {
  const [dataset, setDataSet] = useState([]);
  const chartSetting = {
    yAxis: [
      {
        label: 'users',
      },
    ],
    width: 500,
    height: 300,
    margin: { top: 30, right: 6, bottom: 30, left: 30 },
    sx: {
      [`.${axisClasses.left} .${axisClasses.label}`]: {
        transform: 'translate(10px, 20px)',
      },
    },
  };

  return (
    <div className='VacationReport'>
      <h2>Vacation Report</h2>
      <div>
      <Container maxWidth="sm">
         <Box component='section' sx={{ p: 5, border: '1px solid grey' }}>
          <BarChart
            dataset={dataset}
            xAxis={[{data: ['Vac1','Vac2','Vac3','Vac4','Vac5',
                  'Vac6','Vac7','Vac8','Vac9', 'Vac10',],scaleType: 'band',},]}
            series={[{ data: fData, label: 'followers', type: 'bar' }]}
            {...chartSetting}
          />
        </Box>
      </Container>
       
      </div>
    </div>
  );
}
