import { Switch } from "@headlessui/react";
import { useState } from "react";

const SwitchLanguage = () => {
  const [enabled, setEnabled] = useState(false);

  return (
    <div className="">
      <div className="flex gap-2 items-center">
        <p
          className={`text-[14px] font-Poppins font-normal leading-[15.4px] ${
            !enabled ? "text-[#F00C89]" : "lg:text-switchColor text-white"
          }`}
        >
          ENG
        </p>

        <Switch
          checked={enabled}
          onChange={setEnabled}
          className="group relative flex h-6 w-[40px] cursor-pointer rounded-full bg-[#F00C89] pt-[2px] pl-[2px] transition-colors duration-200 ease-in-out focus:outline-none data-[focus]:outline-1 data-[focus]:outline-white data-[checked]:bg-[#F00C89]"
        >
          <span
            aria-hidden="true"
            className="pointer-events-none inline-block size-5 translate-x-0 rounded-full bg-white ring-0 shadow-lg transition duration-200 ease-in-out group-data-[checked]:translate-x-4"
          />
        </Switch>

        <p
          className={`text-[14px] font-Noto-Sans-Bengali font-normal leading-[15.4px] ${
            enabled ? "text-[#F00C89]" : "lg:text-switchColor text-white"
          }`}
        >
          বাংলা
        </p>
      </div>
    </div>
  );
};

export default SwitchLanguage;
