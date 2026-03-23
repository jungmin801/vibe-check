import { Public_Sans } from "next/font/google";
import { LoginScreen } from "@/components/screens/LoginScreen";

const publicSans = Public_Sans({
  subsets: ["latin"],
  weight: ["400", "600", "700", "900"],
});

export default function Home() {
  return (
    <div className={`${publicSans.className} min-h-screen`}>
      <LoginScreen />
    </div>
  );
}
