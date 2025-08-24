import { GifLoader } from "@/components/ui/loader";


export default function LoadingPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br">
      <GifLoader className="w-24 h-24 mb-6" />
    </div>
  );
}
