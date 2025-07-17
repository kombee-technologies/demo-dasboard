import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
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

// Sample Data Generator
const generateLineData = () => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'];
  return months.map(month => ({
    name: month,
    users: Math.floor(Math.random() * 1000) + 500,
    sessions: Math.floor(Math.random() * 3000) + 1000,
    retention: Math.floor(Math.random() * 40) + 60
  }));
};

const LineChartCard = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const data = generateLineData();

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
            <Box key={`tooltip-${index}`} sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              mb: 0.5 
            }}>
              <Box sx={{
                width: 12,
                height: 12,
                backgroundColor: entry.color,
                mr: 1,
                borderRadius: '2px'
              }} />
              <Typography variant="body2">
                {entry.name}: <b>{entry.name === 'Retention Rate' ? `${entry.value}%` : entry.value?.toLocaleString()}</b>
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
            User Analytics
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Monthly trends and metrics
          </Typography>
        </Box>
        <Typography variant="body2" color="primary">
          Current Year
        </Typography>
      </ChartHeader>

      <ChartContainer>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{
              top: 5,
              right: isMobile ? 0 : 20,
              left: isMobile ? -20 : 0,
              bottom: 5,
            }}
          >
            <CartesianGrid 
              strokeDasharray="3 3" 
              vertical={false} 
              stroke={theme.palette.divider}
            />
            <XAxis 
              dataKey="name" 
              tick={{ fontSize: isMobile ? 11 : 12 }}
              tickMargin={10}
            />
            <YAxis 
              yAxisId="left"
              tick={{ fontSize: isMobile ? 11 : 12 }}
              tickFormatter={(value) => value.toLocaleString()}
            />
            <YAxis 
              yAxisId="right"
              orientation="right"
              domain={[0, 100]}
              tick={{ fontSize: isMobile ? 11 : 12 }}
              tickFormatter={(value) => `${value}%`}
            />
            <Tooltip content={<CustomTooltipContent />} />
            <Legend 
              wrapperStyle={{
                paddingTop: theme.spacing(2)
              }}
            />
            <Line
              yAxisId="left"
              dataKey="users"
              name="Active Users"
              stroke={theme.palette.primary.main}
              strokeWidth={2}
              dot={{ r: isMobile ? 3 : 4 }}
              activeDot={{ r: isMobile ? 5 : 6 }}
            />
            <Line
              yAxisId="left"
              dataKey="sessions"
              name="Sessions"
              stroke={theme.palette.secondary.main}
              strokeWidth={2}
              dot={{ r: isMobile ? 3 : 4 }}
              activeDot={{ r: isMobile ? 5 : 6 }}
            />
            <Line
              yAxisId="right"
              dataKey="retention"
              name="Retention Rate"
              stroke={theme.palette.success.main}
              strokeWidth={2}
              dot={{ r: isMobile ? 3 : 4 }}
              activeDot={{ r: isMobile ? 5 : 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </ChartContainer>
    </StyledChartCard>
  );
};

export default LineChartCard;