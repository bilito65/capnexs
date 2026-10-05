import React, { useState } from 'react';
import { LanguageProvider } from './context/LanguageContext';
import { SoundProvider } from './context/SoundContext';
import { MarketTickerBar } from './components/header/MarketTickerBar';
import { Navbar } from './components/header/Navbar';
import { HeroSection } from './components/hero/HeroSection';
import { FinancialDesk } from './components/desk/FinancialDesk';
import { ToolsSuite } from './components/tools/ToolsSuite';
import { NexaAiDesk } from './components/ai/NexaAiDesk';
import { SolutionsSection } from './components/solutions/SolutionsSection';
import { PayoteEcosystemSection } from './components/ecosystem/PayoteEcosystemSection';
import { PricingSection } from './components/pricing/PricingSection';
import { InsightsSection } from './components/insights/InsightsSection';
import { Footer } from './components/footer/Footer';
import { CapnexsScoreModal } from './components/tools/CapnexsScoreModal';
import { BookingModal } from './components/booking/BookingModal';
import { MarketAsset } from './types';

export const AppContent: React.FC = () => {
  const [isScoreModalOpen, setIsScoreModalOpen] = useState(false);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [nexaActivePrompt, setNexaActivePrompt] = useState<string | undefined>(undefined);

  const handleAskNexa = (promptText: string) => {
    setNexaActivePrompt(promptText);
    const nexaElement = document.getElementById('nexa-desk');
    if (nexaElement) {
      nexaElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectAssetFromTicker = (asset: MarketAsset) => {
    handleAskNexa(`¿Cuál es el panorama y tendencia actual para ${asset.name} (${asset.symbol}) y qué oportunidades ofrece en República Dominicana?`);
  };

  const handleExploreTools = () => {
    const toolsEl = document.getElementById('tools-suite');
    if (toolsEl) {
      toolsEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-payote-black text-payote-cream selection:bg-payote-gold selection:text-payote-black flex flex-col font-sans">
      {/* 1. Real-time Market Ticker Header */}
      <MarketTickerBar onSelectAsset={handleSelectAssetFromTicker} />

      {/* 2. Glassmorphic Navigation Bar */}
      <Navbar
        onOpenScoreModal={() => setIsScoreModalOpen(true)}
        onOpenBookingModal={() => setIsBookingModalOpen(true)}
        onOpenNexaModal={() => {
          const nexaEl = document.getElementById('nexa-desk');
          if (nexaEl) nexaEl.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* 3. Hero Section with 3D WebGL Financial Nexus */}
      <main className="flex-1">
        <HeroSection
          onOpenScoreModal={() => setIsScoreModalOpen(true)}
          onOpenBookingModal={() => setIsBookingModalOpen(true)}
          onExploreTools={handleExploreTools}
        />

        {/* 4. Financial Desk (Currencies, Dominican Macro, S&P500, Gold, Crypto) */}
        <FinancialDesk onAskNexa={handleAskNexa} />

        {/* 5. Proprietary Financial Tools Suite (Mortgage, DTI, Currency, Investment, Health) */}
        <ToolsSuite
          onOpenScoreModal={() => setIsScoreModalOpen(true)}
          onAskNexa={handleAskNexa}
        />

        {/* 6. NEXA AI Desk (Multi-agent Financial Intelligence) */}
        <NexaAiDesk
          initialPrompt={nexaActivePrompt}
          onOpenBooking={() => setIsBookingModalOpen(true)}
          onOpenScore={() => setIsScoreModalOpen(true)}
        />

        {/* 7. Solutions & Business Lines */}
        <SolutionsSection
          onOpenBooking={() => setIsBookingModalOpen(true)}
          onOpenScore={() => setIsScoreModalOpen(true)}
        />

        {/* 8. Payote Group Ecosystem Synergy & 3D Orbit */}
        <PayoteEcosystemSection
          onOpenBooking={() => setIsBookingModalOpen(true)}
          onAskNexa={handleAskNexa}
        />

        {/* 9. Pricing Structure & Private Client Card */}
        <PricingSection
          onOpenScore={() => setIsScoreModalOpen(true)}
          onOpenBooking={() => setIsBookingModalOpen(true)}
        />

        {/* 10. Editorial Insights & Capital Brief */}
        <InsightsSection onAskNexa={handleAskNexa} />
      </main>

      {/* 11. Institutional Footer */}
      <Footer
        onOpenScore={() => setIsScoreModalOpen(true)}
        onOpenBooking={() => setIsBookingModalOpen(true)}
      />

      {/* Global Interactive Modals */}
      <CapnexsScoreModal
        isOpen={isScoreModalOpen}
        onClose={() => setIsScoreModalOpen(false)}
        onOpenBooking={() => setIsBookingModalOpen(true)}
        onAskNexa={handleAskNexa}
      />

      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
      />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <LanguageProvider>
      <SoundProvider>
        <AppContent />
      </SoundProvider>
    </LanguageProvider>
  );
};

export default App;
