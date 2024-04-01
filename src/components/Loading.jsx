import { Loader2 } from "lucide-react";

const Loading = () => {
  return (
    <div className="flex items-center justify-center h-96">
      <Loader2 className="animate-spin h-6 w-6" />
    </div>
  );
};

export default Loading;
