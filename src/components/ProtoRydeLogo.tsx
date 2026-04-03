import React from 'react';
import Svg, {
  Defs,
  LinearGradient,
  Stop,
  RadialGradient,
  Filter,
  FeGaussianBlur,
  FeMerge,
  FeMergeNode,
  Path,
  Circle,
} from 'react-native-svg';

export default function ProtoRydeLogo({ width = 120, height = 120 }) {
  return (
    <Svg width={width} height={height} viewBox="0 0 288 288">
      <Defs>
        {/* Shield gradient: bright sky-blue → deep fintech navy */}
        <LinearGradient id="gShield" x1="110" y1="70" x2="178" y2="230" gradientUnits="userSpaceOnUse">
          <Stop offset="0%" stopColor="#3B82F6" />
          <Stop offset="100%" stopColor="#1E3A8A" />
        </LinearGradient>

        {/* Lightning bolt gradient: pale cream → warm gold → deep amber */}
        <LinearGradient id="gBolt" x1="144" y1="95" x2="140" y2="215" gradientUnits="userSpaceOnUse">
          <Stop offset="0%" stopColor="#FEF9C3" />
          <Stop offset="35%" stopColor="#FCD34D" />
          <Stop offset="100%" stopColor="#D97706" />
        </LinearGradient>

        {/* Gloss highlight: radial white lobe, top-left of shield */}
        <RadialGradient id="gGloss" cx="118" cy="102" r="64" gradientUnits="userSpaceOnUse">
          <Stop offset="0%" stopColor="#ffffff" stopOpacity="0.22" />
          <Stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </RadialGradient>

        {/* Soft glow filter for the lightning bolt */}
        <Filter id="fGlow" x="-30%" y="-12%" width="160%" height="124%">
          <FeGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
          <FeMerge>
            <FeMergeNode in="blur" />
            <FeMergeNode in="SourceGraphic" />
          </FeMerge>
        </Filter>
      </Defs>

      {/* SHIELD BODY */}
      <Path
        d="M144,70 L196,89 L196,160 Q196,196 144,228 Q92,196 92,160 L92,89 Z"
        fill="url(#gShield)"
      />

      {/* Gloss overlay */}
      <Path
        d="M144,70 L196,89 L196,160 Q196,196 144,228 Q92,196 92,160 L92,89 Z"
        fill="url(#gGloss)"
      />

      {/* Shield border */}
      <Path
        d="M144,70 L196,89 L196,160 Q196,196 144,228 Q92,196 92,160 L92,89 Z"
        fill="none"
        stroke="#93C5FD"
        strokeWidth="2.5"
        strokeOpacity="0.55"
        strokeLinejoin="round"
      />

      {/* RAIN DROPS */}
      <Circle cx="115" cy="100" r="4" fill="#BFDBFE" fillOpacity="0.72" />
      <Circle cx="106" cy="117" r="3.2" fill="#BFDBFE" fillOpacity="0.58" />
      <Circle cx="120" cy="131" r="2.5" fill="#BFDBFE" fillOpacity="0.44" />

      {/* LIGHTNING BOLT */}
      <Path
        d="M160,95 L138,155 L156,155 L127,213 L149,159 L131,159 Z"
        fill="url(#gBolt)"
        filter="url(#fGlow)"
      />
    </Svg>
  );
}
