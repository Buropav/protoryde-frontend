import React from 'react';
import Svg, { Path, Circle, G } from 'react-native-svg';

interface ProtoRydeLogoProps {
  width?: number;
  height?: number;
  color?: string;
}

export default function ProtoRydeLogo({ 
  width = 120, 
  height = 120,
  color = "#8AB4F8" // Default icy blue color matching the uploaded image
}: ProtoRydeLogoProps) {
  return (
    <Svg width={width} height={height} viewBox="0 0 100 100">
      <G stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none">
        {/* Canopy / Shield (Outer) */}
        <Path d="M 20,50 L 20,40 Q 20,25 50,25 Q 80,25 80,40 L 80,50" />
        {/* Canopy / Shield (Inner) */}
        <Path d="M 28,45 L 28,40 Q 28,31 50,31 Q 72,31 72,40 L 72,45" />

        {/* Rider Head */}
        <Circle cx="50" cy="42" r="4" />
        
        {/* Rider Shoulders / Arms */}
        <Path d="M 40,55 Q 43,49 50,49 Q 57,49 60,55" />
        
        {/* Rider Legs */}
        <Path d="M 41,75 Q 43,65 47,65" />
        <Path d="M 59,75 Q 57,65 53,65" />

        {/* Motorcycle Handlebars */}
        <Path d="M 35,55 L 45,55" />
        <Path d="M 65,55 L 55,55" />

        {/* Motorcycle Front Fork / Wheel body */}
        <Path d="M 50,68 L 50,85" />
        
        {/* Headlight (Gold/Yellow) */}
        <Circle cx="50" cy="62" r="4.5" fill="#FCE28B" stroke="none" />

        {/* Bottom swoosh line */}
        <Path d="M 20,88 L 55,88 Q 75,88 85,65" strokeWidth="2" />
      </G>
    </Svg>
  );
}
