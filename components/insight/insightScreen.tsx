import { AppHeader } from "@/components/shared/AppHeader";
import { ArtistAnalysisSection } from "@/components/insight/ArtistAnalysisSection";
import { InsightHeroSection } from "@/components/insight/InsightHeroSection";
import { InsightMetricsSection } from "@/components/insight/InsightMetricsSection";
import { PageContainer } from "@/components/shared/PageContainer";

export function MusicDnaScreen() {
  return (
    <div className="app-backdrop min-h-screen text-ink antialiased">
      <AppHeader activeNav="Insights" />

      <PageContainer className="pb-16 pt-8">
        <InsightHeroSection />
        <InsightMetricsSection />
        <ArtistAnalysisSection />
      </PageContainer>
    </div>
  );
}
