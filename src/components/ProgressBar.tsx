import { ElementRef, useRef } from "react";

interface ProgressBarProps {
  percent: number;
  onClick: (percent: number) => void;
}

export function ProgressBar({ percent, onClick }: ProgressBarProps) {
  const ref = useRef<ElementRef<"div">>();

  const onClickHandler = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    const rect = ref.current!.getBoundingClientRect();
    const percent = Math.min(Math.max(0, e.clientX - rect.x), rect.width)/ rect.width;
    onClick(percent);
  };

  return (
    <div
      ref={ref}
      className="flex w-full h-6 bg-gray-200 rounded-full overflow-hidden dark:bg-gray-700"
      onClick={onClickHandler}
    >
      <div
        className="flex flex-col justify-center overflow-hidden bg-blue-500"
        onClick={() => {}}
        role="progressbar"
        style={{ width: percent + "%" }}
        // aria-valuenow="75"
        // aria-valuemin="0"
        // aria-valuemax="100"
      ></div>
    </div>
  );
}
