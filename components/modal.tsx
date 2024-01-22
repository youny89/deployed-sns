'use client';

import { useCallback } from "react";
import { AiOutlineClose } from "react-icons/ai";
import Button from "./button";

interface ModalProps {
    isOpen?: boolean;
    onClose:()=>void;
    onSubmit:()=>void;
    title?: string;
    body?:React.ReactElement;
    footer?:React.ReactElement;
    actionLabel:string;
    disabled?:boolean;
}


const Modal:React.FC<ModalProps> = ({
    isOpen,
    onClose,
    onSubmit,
    title,
    body,
    footer,
    actionLabel,
    disabled
}) => {
    const handleClose = useCallback(() => {
        if(disabled) return;

        onClose();
    },[disabled, onClose])

    const handleSubmit = useCallback(()=>{
        if(disabled) return;
        onSubmit();
    },[disabled, onSubmit])

    if(!isOpen) return null;

    return (
        <>  
            {/* background drop */}
            <div className="
                justify-center items-center flex
                overflow-x-hidden
                fixed inset-0
                z-50
                outline-none
                focus:outline-none
                bg-neutral-800
                opacity-90
            ">  
                {/* responsive */}
                <div className="
                    relative
                    w-full h-full my-6 mx-auto
                    lg:max-w-3xl
                    lg:w-3/6
                    lg:h-auto
                    
                ">
                    {/* Content */}
                    <div className="
                        relative
                        w-full h-full
                        border-0 rounded-lg shadow-lg
                        flex flex-col
                        outline-none focus:outlie-none
                        bg-black
                        lg:h-auto
                    ">
                        {/* HEADER */}
                        <div className="flex items-center justify-between p-10 rounded-t">
                            <h3 className="text-3xl font-semibold text-white">{title}</h3>
                            <button onClick={handleClose} className="p-1 ml-auto border-0 text-white hover:opacity-70 transition">
                                <AiOutlineClose size={20}/>
                            </button>
                        </div>
                        {/* BODY */}
                        <div className="relative p-10 flex-auto">
                            {body}
                        </div>
                        {/* FOOTER */}
                        <div className="flex flex-col gap-2 p-10">
                            <Button
                                disabled={disabled}
                                label={actionLabel}
                                secondary
                                fullWidth
                                large
                                onClick={handleSubmit}
                            />
                            {footer}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Modal