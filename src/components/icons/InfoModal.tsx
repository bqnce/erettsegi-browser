import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog.tsx";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip.tsx";

import { Info } from "lucide-react";

const InfoModal = ({ darkMode }: { darkMode: boolean }) => {
  return (
    <Dialog>
      <TooltipProvider>
        <Tooltip delayDuration={150}>
          <DialogTrigger asChild>
            <TooltipTrigger
              className={`p-2 rounded-lg border transition-colors duration-300 cursor-pointer dark:border-[#1f1f1f] dark:hover:bg-[#090909] border-[#dcdcdc] hover:bg-[#eeeeee]"}`}
            >
              <Info color={darkMode ? "#dbdbdb" : "#090909"} />
            </TooltipTrigger>
          </DialogTrigger>
          <TooltipContent
            className={`border select-none dark:border-[#2f2f2f] dark:text-[#dbdbdb] dark:bg-[#121212] border-[#dbdbdb] text-[#070707] bg-[#f5f5f5]"}`}
          >
            <p>Információk</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <DialogContent
        className={`sm:w-[500px] dark:bg-[#050505] dark:text-[#dbdbdb] dark:border-[#141414] dark:shadow-[#040404] bg-[#f5f5f5] text-[#070707] shadow-[#f5f5f5]"}`}
      >
        <DialogHeader>
          <DialogTitle className="flex flex-row items-center gap-2">
            Érettségi Kereső - 2025
          </DialogTitle>
          <br />
          <DialogDescription
            className={`text-wrap text-start dark:text-[#9f9f9f] text-[#050505]"}`}
          >
            Az{" "}
            <span className={`font-medium dark:text-white text-black"}`}>
              Érettségi Kereső
            </span>{" "}
            gyors és egyszerű megoldást kínál az érettségi feladatok
            böngészésére és letöltésére.
            <br />
            <br />
            <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent font-medium">
              Szűrés tárgy, év, időszak és szint alapján,
            </span>{" "}
            hogy gyorsan megtaláld a szükséges feladatokat, útmutatókat és
            hanganyagokat.
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default InfoModal;
