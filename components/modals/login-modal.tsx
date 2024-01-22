'use client';

import useLoginModal from "@/hooks/useLoginModal"
import { useCallback, useState } from "react";
import Input from "../input";
import Modal from "../modal";
import useRegisterModal from "@/hooks/useRegisgterModal";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";

const LoginModal = () => {
    
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const loginModal = useLoginModal();
    const registerModal = useRegisterModal();

    const onSubmit =useCallback(async()=>{
        try {
            setIsLoading(true)
            const response = await signIn('credentials',{ email, password})
            console.log({response})
            toast.success(`${email} 로그인 완료!`);
            loginModal.onClose();

        } catch (error) {
            console.log(error)
            toast.error('로그인 실패');
        } finally { setIsLoading(false) }
    },[loginModal, email, password])

    const onToggle = useCallback(()=>{
        if(isLoading) return;

        registerModal.onOpen();
        loginModal.onClose();
    },[isLoading,registerModal, loginModal])


    const bodyContent = (
        <div className="flex flex-col gap-4">
            <Input
                placeholder="이메일"
                onChange={e=> setEmail(e.target.value)}
                type="email"
                disabled={isLoading}
                value={email}
            />
            <Input
                placeholder="비밀번호"
                onChange={e=> setPassword(e.target.value)}
                type="password"
                value={password}
                disabled={isLoading}
            />
        </div>
    )

    const footerContent = (
        <div className="text-neutral-400 text-center mt-4 ">
            <p>
                아직 계정이 없으신가요?
                <span onClick={onToggle} className="px-1 text-white cursor-pointer hover:underline">회원가입</span>
            </p>
        </div>
    )

    return <Modal 
        isOpen={loginModal.isOpen}
        onClose={loginModal.onClose}
        onSubmit={onSubmit}
        title="로그인 하세요"
        actionLabel="로그인"
        disabled={isLoading}
        body={bodyContent}
        footer={footerContent}
    />
}

export default LoginModal