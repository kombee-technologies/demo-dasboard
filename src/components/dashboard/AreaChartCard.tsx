import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import {
  Box,
  Typography,
  useTheme,
  styled,
  Paper,
  useMediaQuery,
  Stack
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

const LegendItem = styled(Stack)(({ theme }) => ({
  flexDirection: 'row',
  alignItems: 'center',
  marginRight: theme.spacing(2),
  '& .legend-color': {
    width: 12,
    height: 12,
    borderRadius: 2,
    marginRight: theme.spacing(1)
  }
}));

// Sample Data Generator
const generateAreaData = () => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'];
  return months.map(month => ({
    name: month,
    productA: Math.floor(Math.random() * 5000) + 1000,
    productB: Math.floor(Math.random() * 4000) + 500,
    productC: Math.floor(Math.random() * 3000) + 200
  }));
};

const AreaChartCard = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const data = generateAreaData();

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
                {entry.name}: <b>${(entry.value ?? 0).toLocaleString()}</b>
              </Typography>
            </Box>
          ))}
          <Typography variant="caption" color="text.secondary" mt={1} display="block">
            Total: <b>${payload.reduce((sum, entry) => sum + (entry.value ?? 0), 0).toLocaleString()}</b>
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
            Product Performance
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Monthly sales distribution
          </Typography>
        </Box>
        <Box sx={{ display: 'flex' }}>
          <LegendItem>
            <Box className="legend-color" sx={{ bgcolor: theme.palette.primary.main }} />
            <Typography variant="body2">Product A</Typography>
          </LegendItem>
          <LegendItem>
            <Box className="legend-color" sx={{ bgcolor: theme.palette.secondary.main }} />
            <Typography variant="body2">Product B</Typography>
          </LegendItem>
          <LegendItem>
            <Box className="legend-color" sx={{ bgcolor: theme.palette.success.main }} />
            <Typography variant="body2">Product C</Typography>
          </LegendItem>
        </Box>
      </ChartHeader>

      <ChartContainer>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{
              top: 10,
              right: isMobile ? 0 : 20,
              left: isMobile ? -20 : 0,
              bottom: 0,
            }}
            stackOffset="expand" // For normalized area chart
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
              tick={{ fontSize: isMobile ? 11 : 12 }}
              tickFormatter={(value) => `${value * 100}%`}
              domain={[0, 1]}
            />
            <Tooltip content={<CustomTooltipContent />} />
            <Area
              type="monotone"
              dataKey="productA"
              name="Product A"
              stackId="1"
              stroke={theme.palette.primary.main}
              fill={theme.palette.primary.light}
              fillOpacity={0.8}
            />
            <Area
              type="monotone"
              dataKey="productB"
              name="Product B"
              stackId="1"
              stroke={theme.palette.secondary.main}
              fill={theme.palette.secondary.light}
              fillOpacity={0.8}
            />
            <Area
              type="monotone"
              dataKey="productC"
              name="Product C"
              stackId="1"
              stroke={theme.palette.success.main}
              fill={theme.palette.success.light}
              fillOpacity={0.8}
            />
          </AreaChart>
        </ResponsiveContainer>
      </ChartContainer>
    </StyledChartCard>
  );
};

export default AreaChartCard;