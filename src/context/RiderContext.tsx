import React, { createContext, useState, ReactNode } from 'react';

// Context State shape defined
export interface RiderContextState {
  riderId: string | null;
  riderName: string;
  zone: string;
  upiId: string;
  policyId: string | null;
  isBootstrapped: boolean;
  setRiderInfo: (info: { riderId?: string | null; riderName?: string; zone?: string; upiId?: string }) => void;
  setPolicyId: (id: string | null) => void;
  setBootstrapped: (val: boolean) => void;
}

const defaultState: RiderContextState = {
  riderId: null,
  riderName: '',
  zone: 'HSR Layout',
  upiId: '',
  policyId: null,
  isBootstrapped: false,
  setRiderInfo: () => {},
  setPolicyId: () => {},
  setBootstrapped: () => {},
};

export const RiderContext = createContext<RiderContextState | undefined>(undefined);

export const RiderProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [riderId, setRiderId] = useState<string | null>(null);
  const [riderName, setRiderName] = useState<string>('');
  const [zone, setZone] = useState<string>('HSR Layout');
  const [upiId, setUpiId] = useState<string>('');
  const [policyId, setPolicyId] = useState<string | null>(null);
  const [isBootstrapped, setIsBootstrapped] = useState<boolean>(false);

  const setRiderInfo = (info: { riderId?: string | null; riderName?: string; zone?: string; upiId?: string }) => {
    if (info.riderId !== undefined) setRiderId(info.riderId);
    if (info.riderName !== undefined) setRiderName(info.riderName);
    if (info.zone !== undefined) setZone(info.zone);
    if (info.upiId !== undefined) setUpiId(info.upiId);
  };

  return (
    <RiderContext.Provider
      value={{
        riderId,
        riderName,
        zone,
        upiId,
        policyId,
        isBootstrapped,
        setRiderInfo,
        setPolicyId,
        setBootstrapped: setIsBootstrapped,
      }}
    >
      {children}
    </RiderContext.Provider>
  );
};
