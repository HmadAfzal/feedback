import React from "react";

const MagicButton = ({
  title,
  icon,
  position,
  otherClasses,
}: {
  title: string;
  icon: React.ReactNode;
  position: string;
  otherClasses?: string;
}) => {
  return (
    <button
      className="relative inline-flex h-12 w-full md:w-60 md:mt-10 mt-6 overflow-hidden rounded-lg p-[1px] focus:outline-none"
    >
      <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#FEC89A_0%,#EA580C_50%,#FEC89A_100%)]
" />

      <span
        className={`inline-flex h-full w-full cursor-pointer items-center justify-center rounded-lg
              dark:bg-black dark:hover:bg-neutral-900 bg-neutral-800 text-white hover:bg-neutral-700  transition-all  px-6 text-sm md:text-md font-medium backdrop-blur-3xl gap-2 ${otherClasses}`}
      >
        {position === "left" && icon}
        {title}
        {position === "right" && icon}
      </span>
    </button>
  );
};

export default MagicButton;
