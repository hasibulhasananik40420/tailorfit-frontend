import {
    Dialog,
    DialogPanel,
    Transition,
    TransitionChild,
  } from "@headlessui/react";
  
 
  interface UserModalProps {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
  }
  
  const NotificationModal = ({ isOpen, setIsOpen }: UserModalProps) => {
    function close() {
      setIsOpen(false);
    }
  
    // function handleProfileClick() {
    //   close();
    // }
  
    
  
    return (
      <div className="">
        <Transition appear show={isOpen}>
          <Dialog
            as="div"
            className="relative z-10 focus:outline-none"
            onClose={close}
          >
            <div className="fixed inset-0 z-10 max-w-[1920px] mx-auto">
              <div className="flex justify-end items-start 2xl:mt-[90px] mt-[70px] mr-5 2xl:mr-[30px] ">
                <TransitionChild
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 transform-[scale(95%)]"
                  enterTo="opacity-100 transform-[scale(100%)]"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 transform-[scale(100%)]"
                  leaveTo="opacity-0 transform-[scale(95%)]"
                >
                  <DialogPanel
                    className="min-w-[248px]  rounded-[8px] bg-white   "
                    style={{ boxShadow: "0px 0px 25px 0px rgba(0, 0, 0, 0.12)" }}
                  >
                    <div className="flex gap-[10px] items-center p-5">
                      <p className="text-[16px] font-Poppins font-medium text-switchColor">Notification</p>
                    </div>
  
                    <div className="w-full border-[1px] border-borderColor "></div>
  
                    <div className="flex flex-col gap-[10px] p-[10px]">
                     
  
                    <p className="text-[16px] text-center font-Poppins font-medium text-switchColor">No Notification yet !!</p>

  
                      
                    </div>
                  </DialogPanel>
                </TransitionChild>
              </div>
            </div>
          </Dialog>
        </Transition>
      </div>
    );
  };
  
  export default NotificationModal;
  