import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import {
  Box,
  Typography,
  useTheme,
  styled,
  Paper
} from '@mui/material';

const ChartContainer = styled(Box)(({ theme }) => ({
  height: '300px',
  width: '100%',
  [theme.breakpoints.down('sm')]: {
    height: '250px'
  }
}));

const StyledChartCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[2],
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'transform 0.3s, box-shadow 0.3s',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: theme.shadows[4]
  },
  backgroundColor: theme.palette.background.paper
}));

const ChartHeader = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: theme.spacing(1)
  }
}));

const CustomTooltip = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(1),
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[2],
  border: `1px solid ${theme.palette.divider}`,
  color: theme.palette.text.primary
}));

const PieChartCard = () => {
  const theme = useTheme();

  // Sample data for the pie chart
  const data = [
    { name: 'Desktop', value: 400, color: theme.palette.primary.main },
    { name: 'Mobile', value: 300, color: theme.palette.secondary.main },
    { name: 'Tablet', value: 200, color: theme.palette.error.main },
    { name: 'Others', value: 100, color: theme.palette.warning.main },
  ];

  const CustomTooltipContent = ({
    active,
    payload
  }: {
    active?: boolean;
    payload?: Array<{
      name?: string;
      value?: number;
      [key: string]: any;
    }>;
  }) => {
    if (active && payload && payload.length) {
      return (
        <CustomTooltip>
          <Typography variant="body2" fontWeight={600}>
            {payload[0].name}
          </Typography>
          <Typography variant="body2">
            {payload?.[0]?.value} ({payload?.[0]?.value !== undefined ? ((payload[0].value / 1000) * 100).toFixed(1) : '0.0'}%)
          </Typography>
        </CustomTooltip>
      );
    }
    return null;
  };

  return (
    <StyledChartCard>
      <ChartHeader>
        <Box>
          <Typography variant="h6" fontWeight={600}>
            Traffic Sources
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Last 30 days
          </Typography>
        </Box>
        <Typography variant="body2" color="primary">
          Total: 1,000 visits
        </Typography>
      </ChartHeader>

      <ChartContainer>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
              dataKey="value"
              labelLine={false}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltipContent />} />
            <Legend 
              layout="horizontal"
              verticalAlign="bottom"
              align="center"
              wrapperStyle={{
                paddingTop: theme.spacing(2)
              }}
              formatter={(value, entry, index) => (
                <Typography variant="body2" color="text.secondary">
                  {value}
                </Typography>
              )}
            />
          </PieChart>
        </ResponsiveContainer>
      </ChartContainer>
    </StyledChartCard>
  );
};

export default PieChartCard;