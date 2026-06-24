import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
  useMemo,
} from 'react';
import { Campaign, CampaignId } from '../types';
import { CAMPAIGNS } from '../data/campaigns';

interface CampaignContextValue {
  activeCampaign: Campaign | null;
  setCampaign: (id: CampaignId) => void;
}

const CampaignContext = createContext<CampaignContextValue>({
  activeCampaign: null,
  setCampaign: () => {},
});

export const CampaignProvider = ({
  children,
  initialCampaign,
}: {
  children: ReactNode;
  initialCampaign?: CampaignId;
}) => {
  const [activeCampaign, setActiveCampaign] = useState<Campaign | null>(
    initialCampaign && initialCampaign in CAMPAIGNS
      ? CAMPAIGNS[initialCampaign] ?? null
      : null,
  );

  const setCampaign = useCallback((id: CampaignId) => {
    if (!id) {
      setActiveCampaign(null);
      return;
    }
    const campaign = CAMPAIGNS[id];
    if (campaign) {
      setActiveCampaign(campaign);
    }
  }, []);

  const value = useMemo(
    () => ({ activeCampaign, setCampaign }),
    [activeCampaign, setCampaign],
  );

  return (
    <CampaignContext.Provider value={value}>{children}</CampaignContext.Provider>
  );
};

export const useCampaign = () => useContext(CampaignContext);
