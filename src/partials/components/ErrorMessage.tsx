import { FC } from "react";

type TProps = {
  message: string | undefined;
};

const ErrorMessage: FC<TProps> = ({ message }) => {
  return (
    <div className="flex items-center gap-1 w-full">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2}
        stroke="#F24444"
        className="w-5 h-5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
        />
      </svg>
      <span className="text-red-600 text-sm max-sm:text-xs font-semibold">
        {message}
      </span>
    </div>
  );
};
export default ErrorMessage;
