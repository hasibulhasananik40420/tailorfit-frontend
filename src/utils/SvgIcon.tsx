export type TSvgIcon = {
    className?: string;
    iconStyle?: string;
    path: string | undefined;
    fill?: string;
  };
  
  export const SvgIcon = ({ className, path, fill, iconStyle }: TSvgIcon) => {
    return (
      <>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill={`${fill ? fill : "none"}`}
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className={`h-6 w-6 ${className}   ${iconStyle} `}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d={path} />
        </svg>
      </>
    );
  };