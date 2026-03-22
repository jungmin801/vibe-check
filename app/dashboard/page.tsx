import { Public_Sans } from "next/font/google";
import { MusicInsightsDashboardScreen } from "@/components/screens/DashboardScreen";

const publicSans = Public_Sans({
  subsets: ["latin"],
  weight: ["400", "600", "700", "900"],
});

export default function MusicInsightsPage() {
  return (
    <div className={`${publicSans.className} min-h-screen`} data-theme="light">
      <MusicInsightsDashboardScreen />
    </div>
  );
}
