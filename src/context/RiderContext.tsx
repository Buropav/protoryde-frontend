import React, { createContext, useState, ReactNode } from 'react';

// Context State shape defined
export interface RiderContextState {
  riderId: string | null;
  riderName: string;
  zone: string;
  upiId: string;
  policyId: string | null;
  isBootstrapped: boolean;
}

const defaultState: RiderContextState = {
  riderId: null,
  riderName: 'Pranav',
  zone: 'HSR Layout',
  upiId: '',
  policyId: null,
  isBootstrapped: false,
};

export const RiderContext = createContext<RiderContextState>(defaultState);

export const RiderProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [riderId, setRiderId] = useState<string | null>(null);
  const [riderName, setRiderName] = useState<string>('');
  const [zone, setZone] = useState<string>('HSR Layout');
  const [upiId, setUpiId] = useState<string>('');
  const [policyId, setPolicyId] = useState<string | null>(null);
  const [isBootstrapped, setIsBootstrapped] = useState<boolean>(false);

  return (
    <RiderContext.Provider
      value={{
        riderId,
        riderName,
        zone,
        upiId,
        policyId,
        isBootstrapped,
      }}
    >
      {children}
    </RiderContext.Provider>
  );
};
