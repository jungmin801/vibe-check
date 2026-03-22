import { Public_Sans } from "next/font/google";
import { MusicDnaScreen } from "@/components/screens/InsightsScreen";

const publicSans = Public_Sans({
  subsets: ["latin"],
  weight: ["400", "600", "700", "900"],
});

export default function MusicDnaPage() {
  return (
    <div className={`${publicSans.className} min-h-screen`} data-theme="light">
      <MusicDnaScreen />
    </div>
  );
}
