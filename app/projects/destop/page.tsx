import { GifLoader } from "@/components/ui/loader";

import { t } from "i18next";
import { Processing } from "@/components/ui/processing";

export default function ProcessingPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br">
      <Processing className="w-24 h-24 mb-6" />
      <h1 className="text-2xl font-semibold text-gray-800 mb-4">
        {t("processing.title")}
      </h1>
    </div>
  );
}

