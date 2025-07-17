import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import {
  Box,
  Typography,
  useTheme,
  styled,
  Paper,
  useMediaQuery
} from '@mui/material';

// Styled Components
const ChartContainer = styled(Box)(({ theme }) => ({
  height: '350px',
  width: '100%',
  [theme.breakpoints.down('sm')]: {
    height: '280px'
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
  marginBottom: theme.spacing(3),
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
  padding: theme.spacing(1.5),
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[3],
  border: `1px solid ${theme.palette.divider}`,
  color: theme.palette.text.primary
}));

// Sample Data
const generateData = () => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'];
  return months.map(month => ({
    name: month,
    revenue: Math.floor(Math.random() * 5000) + 1000,
    expenses: Math.floor(Math.random() * 3000) + 500,
    profit: Math.floor(Math.random() * 2000) + 500
  }));
};

const BarChartCard = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const data = generateData();

  const CustomTooltipContent = ({
    active,
    payload
  }: {
    active?: boolean;
    payload?: Array<{
      color?: string;
      name?: string;
      value?: number;
      payload?: { name?: string };
    }>;
  }) => {
    if (active && payload && payload.length) {
      return (
        <CustomTooltip>
          <Typography variant="subtitle2" fontWeight={600} mb={1}>
            {payload[0].payload?.name}
          </Typography>
          {payload.map((entry, index) => (
            <Box key={`tooltip-${index}`} sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
              <Box sx={{
                width: 12,
                height: 12,
                backgroundColor: entry.color,
                mr: 1,
                borderRadius: '2px'
              }} />
              <Typography variant="body2">
                {entry.name}: <b>{entry.value !== undefined ? entry.value.toLocaleString() : '-'}</b>
              </Typography>
            </Box>
          ))}
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
            Financial Overview
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Monthly performance metrics
          </Typography>
        </Box>
        <Typography variant="body2" color="primary">
          Year 2023
        </Typography>
      </ChartHeader>

      <ChartContainer>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{
              top: 5,
              right: isMobile ? 0 : 20,
              left: isMobile ? -20 : 0,
              bottom: 5,
            }}
            barSize={isMobile ? 20 : 30}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis 
              dataKey="name" 
              tick={{ fontSize: isMobile ? 11 : 12 }}
            />
            <YAxis 
              tick={{ fontSize: isMobile ? 11 : 12 }}
              tickFormatter={(value) => `$${value / 1000}k`}
            />
            <Tooltip content={<CustomTooltipContent />} />
            <Legend 
              wrapperStyle={{
                paddingTop: theme.spacing(2)
              }}
            />
            <Bar 
              dataKey="revenue" 
              name="Revenue" 
              fill={theme.palette.primary.main} 
              radius={[4, 4, 0, 0]}
            />
            <Bar 
              dataKey="expenses" 
              name="Expenses" 
              fill={theme.palette.error.main} 
              radius={[4, 4, 0, 0]}
            />
            <Bar 
              dataKey="profit" 
              name="Profit" 
              fill={theme.palette.success.main} 
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </ChartContainer>
    </StyledChartCard>
  );
};

export default BarChartCard;