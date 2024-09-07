import { Controller, useFormContext } from "react-hook-form";

type TInputProps = {
  name: string;
  type?: string;
  placeholder?: string;
  className: string;
  defaultValue?: string;
  disabled?: boolean;
};

const ReuseInput = ({
  name,
  className,
  placeholder,
  type = "text",
  defaultValue,
  disabled,
}: TInputProps) => {
  const { control } = useFormContext();
  // const capitalizeWords = (input: string) => {
  //   return input.replace(/\b\w/g, (char) => char.toUpperCase());
  // };

  return (
    <Controller
      control={control}
      name={name}
      render={({
        field: { onChange, onBlur, value },
        fieldState: { error },
      }) => (
        <div>
          <input
            onChange={onChange}
            // onChange={(e) => onChange(e.target.value.toUpperCase())}
            // onChange={(e) => onChange(capitalizeWords(e.target.value))}
            onBlur={onBlur}
            value={value}
            className={`${className} ${error ? "border-[#F00C89]" : ""} `}
            type={type}
            placeholder={placeholder}
            defaultValue={defaultValue}
            disabled={disabled}
          />
          {error && (
            <p className="text-[#F00C89] md:text-[18px] text-[14px] font-Noto-Sans-Bengali font-normal">
              {error.message}
            </p>
          )}
        </div>
      )}
    />
  );
};

export default ReuseInput;
