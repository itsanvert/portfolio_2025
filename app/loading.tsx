import { GifLoader } from "@/components/ui/loader";

import { t } from "i18next";

export default function LoadingPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br">
      <GifLoader className="w-24 h-24 mb-6" />
    </div>
  );
}
