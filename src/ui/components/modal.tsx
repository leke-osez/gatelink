// import { Fragment } from "react";
// import { Dialog, Transition } from "@headlessui/react";
// import {
//   DialogContent,
//   DialogOverlay,
//   DialogPortal,
//   DialogRoot,
// } from "./RadixModal";
import { cn } from "@/utils/style";
import * as Dialog from "@radix-ui/react-dialog";
import { useRef, type ReactNode } from "react";
import { Button } from "./button";
import CloseIcon from "#/assets/comps/closeIcon";
 // import { useClickOutside } from "@/hooks/useClickOutside";

export interface ModalCompProps {
  isOpen: boolean;
  close: () => void;
  children: ReactNode;
  dialogClassName?: string;
  shouldPreventUserFromClosing?: boolean; // specifies if user should not be able to close the modal.
  showCloseButton?: boolean;
  canCloseOnOverlayClick?: boolean;
  toggle?: () => void;
  open?: () => void;
  contentClass?: string;
  title?: string;
}

export const Modal = ({
  isOpen,
  children,
  dialogClassName,
  shouldPreventUserFromClosing,
  close,
  // toggle,
  showCloseButton,
  // canCloseOnOverlayClick,
  // open,
  contentClass,
  title,
}: ModalCompProps) => {
  const handleClose = shouldPreventUserFromClosing
    ? () => {
        return;
      }
    : close;
  const modalRef = useRef<HTMLDivElement | null>(null);

  // if (canCloseOnOverlayClick && modalRef) {
  //   useClickOutside(modalRef, close);
  // }

  return (
    // <Transition.Root show={isOpen} as={Fragment}>
    // <DialogRoot
    //   // as="div"
    //   // className="relative z-[292929]"
    //   open={isOpen}
    //   // defaultOpen
    // >
    //   <DialogPortal>
    //     {/* overlay */}

    //     <DialogOverlay className="fixed inset-0 bg-[rgba(0,0,0,0.25)] bg-opacity-75 transition-opacity" />

    //     {/* main modal container */}
    //     <DialogContent className="fixed inset-0 z-10 overflow-y-auto">
    //       <div className="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
    //         {/* main modal panel */}
    //         <div
    //           className={cn(
    //             `relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all min-w-[100px] max-w-[99%]  min-h-fit max-h-[90vh] ${
    //               dialogClassName ? dialogClassName : ""
    //             }`
    //           )}
    //         >
    //           {showCloseButton && (
    //             <div className="w-full flex justify-end px-3">
    //               <Button
    //                 className="px-1"
    //                 variant={"plain"}
    //                 onClick={handleClose}
    //               >
    //                 {<CloseIcon />}
    //               </Button>
    //             </div>
    //           )}
    //           {children}
    //         </div>
    //       </div>
    //     </DialogContent>
    //   </DialogPortal>
    // </DialogRoot>

    <Dialog.Root open={isOpen} onOpenChange={close} modal={true}>
      <Dialog.Portal>
        <Dialog.Overlay className="z-999 fixed inset-0 bg-[rgba(0,0,0,0.25)] bg-opacity-75 transition-opacity" />
        <Dialog.Content
          className={cn(
            "z-999 bg-white fixed top-1/2 w-full  max-w-[97vw] sm:max-w-[80vw] md:max-w-[70vw] max-h-[90vh] left-1/2 -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-lg  shadow-xl transition-all",
            contentClass,
          )}
        >
          <div
            className="flex min-h-full w-full items-center justify-center text-center sm:items-center sm:p-0 "
            ref={modalRef}
          >
            <Dialog.Title>{title}</Dialog.Title>

            {/* main modal panel */}
            <div
              className={cn(
                `relative transform overflow-hidden text-left  sm:min-w-25 w-full min-h-fit max-h-[90vh] ${
                  dialogClassName ? dialogClassName : ""
                }`,
              )}
            >
              {showCloseButton && (
                <div className="w-full flex justify-end">
                  <Button
                    className=" w-9 h-9 p-0"
                    variant={"plain"}
                    onClick={handleClose}
                  >
                    {<CloseIcon />}
                  </Button>
                </div>
              )}
              {children}
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>

    // </Transition.Root>
  );
};