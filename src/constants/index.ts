export * from './colors';
export * from './typography';

export const theme = {
  colors: require('./colors').colors,
  fonts: require('./typography').fonts,
  fontWeights: require('./typography').fontWeights,
  fontSizes: require('./typography').fontSizes,
  lineHeights: require('./typography').lineHeights,
  letterSpacings: require('./typography').letterSpacings,
  spacing: require('./typography').spacing,
  borderRadius: require('./typography').borderRadius,
  shadows: require('./typography').shadows,
};

export default theme;