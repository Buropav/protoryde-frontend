import React from 'react';
import { Image, StyleSheet } from 'react-native';

interface ProtoRydeLogoProps {
  width?: number;
  height?: number;
}

/**
 * ProtoRyde brand logo component.
 * Uses the motorcycle shield logo PNG asset.
 */
export default function ProtoRydeLogo({ width = 120, height = 120 }: ProtoRydeLogoProps) {
  return (
    <Image
      source={require('../../assets/protoryde-logo.png')}
      style={[styles.logo, { width, height }]}
      resizeMode="contain"
    />
  );
}

const styles = StyleSheet.create({
  logo: {
    // Default sizing handled by props
  },
});
