import React from 'react';
import { Scatter, ScatterChart, XAxis, YAxis, ZAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
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
    height: '300px'
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
    borderRadius: '50%',
    marginRight: theme.spacing(1)
  }
}));

// Sample Data Generator
const generateScatterData = () => {
  const categories = ['Electronics', 'Fashion', 'Home', 'Beauty', 'Sports'];
  return categories.map(category => ({
    category,
    data: Array.from({ length: 20 }, (_, i) => ({
      x: Math.floor(Math.random() * 100) + 10,
      y: Math.floor(Math.random() * 100) + 10,
      z: Math.floor(Math.random() * 20) + 5,
    }))
  }));
};

const ScatterChartCard = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const data = generateScatterData();
  const colors = [
    theme.palette.primary.main,
    theme.palette.secondary.main,
    theme.palette.error.main,
    theme.palette.warning.main,
    theme.palette.success.main
  ];

  const CustomTooltipContent = ({
    active,
    payload
  }: {
    active?: boolean;
    payload?: Array<{
      x?: number;
      y?: number;
      z?: number;
      payload?: any;
    }>;
  }) => {
    if (active && payload && payload.length) {
      const { x, y, z, payload: pointPayload } = payload[0];
      return (
        <CustomTooltip>
          <Typography variant="subtitle2" fontWeight={600} mb={1}>
            {pointPayload.category}
          </Typography>
          <Typography variant="body2">
            <Box component="span" sx={{ color: theme.palette.text.secondary }}>Price: </Box>
            <b>${x}</b>
          </Typography>
          <Typography variant="body2">
            <Box component="span" sx={{ color: theme.palette.text.secondary }}>Rating: </Box>
            <b>{y}/100</b>
          </Typography>
          <Typography variant="body2">
            <Box component="span" sx={{ color: theme.palette.text.secondary }}>Sales: </Box>
            <b>{z}k</b>
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
            Price vs Rating correlation
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          {data.map((item, index) => (
            <LegendItem key={index}>
              <Box 
                className="legend-color" 
                sx={{ bgcolor: colors[index % colors.length] }} 
              />
              <Typography variant="body2">{item.category}</Typography>
            </LegendItem>
          ))}
        </Box>
      </ChartHeader>

      <ChartContainer>
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart
            margin={{
              top: 20,
              right: isMobile ? 10 : 20,
              left: isMobile ? -20 : 0,
              bottom: 0,
            }}
          >
            <CartesianGrid 
              strokeDasharray="3 3" 
              stroke={theme.palette.divider}
            />
            <XAxis 
              type="number" 
              dataKey="x" 
              name="Price" 
              unit="$" 
              tick={{ fontSize: isMobile ? 10 : 12 }}
              label={{ 
                value: 'Price ($)', 
                position: 'insideBottomRight', 
                offset: -10,
                fontSize: isMobile ? 11 : 12
              }}
            />
            <YAxis 
              type="number" 
              dataKey="y" 
              name="Rating" 
              unit="/100" 
              tick={{ fontSize: isMobile ? 10 : 12 }}
              label={{ 
                value: 'Rating (/100)', 
                angle: -90, 
                position: 'insideLeft',
                fontSize: isMobile ? 11 : 12
              }}
            />
            <ZAxis 
              type="number" 
              dataKey="z" 
              range={[60, 400]} 
              name="Sales" 
              unit="k" 
            />
            <Tooltip 
              content={<CustomTooltipContent />} 
              cursor={{ strokeDasharray: '3 3' }}
            />
            {data.map((item, index) => (
              <Scatter
                key={index}
                name={item.category}
                data={item.data}
                fill={colors[index % colors.length]}
                fillOpacity={0.8}
                stroke={theme.palette.background.paper}
                strokeWidth={1}
              />
            ))}
          </ScatterChart>
        </ResponsiveContainer>
      </ChartContainer>
    </StyledChartCard>
  );
};

export default ScatterChartCard;