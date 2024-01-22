'use client';

import { useCallback, useState } from "react";
import Input from "../input";
import Modal from "../modal";
import useRegisterModal from "@/hooks/useRegisgterModal";
import useLoginModal from "@/hooks/useLoginModal";
import axios from "axios";
import toast from "react-hot-toast";
import { signIn } from "next-auth/react";

const RegisterModal = () => {
    const [name, setName] = useState('')
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();

    const onSubmit =useCallback(async()=>{
        try {
            setIsLoading(true)
            const response = await axios.post('/api/register',{
                email, password, username, name
            })
            console.log({response});
            toast.success('회원가입 완료!');
            await signIn('credentials',{email, password});

            registerModal.onClose();
        } catch (error) {
            console.log(error)
            toast.error('회원가입 실패')
        } finally { setIsLoading(false) }
    },[registerModal, email, password, username, name])

    const onToggle = useCallback(()=>{
        if(isLoading) return;

        registerModal.onClose();
        loginModal.onOpen();
    },[isLoading,registerModal, loginModal])

    const bodyContent = (
        <div className="flex flex-col gap-4">
            <Input
                placeholder="이름"
                onChange={e=> setName(e.target.value)}
                type="text"
                disabled={isLoading}
                value={name}
            />
            <Input
                placeholder="닉네임"
                onChange={e=> setUsername(e.target.value)}
                type="text"
                disabled={isLoading}
                value={username}
            />
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
                이미 계정이 있으신가요?
                <span onClick={onToggle} className="px-1 text-white cursor-pointer hover:underline">로그인</span>
            </p>
        </div>
    )

    return <Modal 
        isOpen={registerModal.isOpen}
        onClose={registerModal.onClose}
        onSubmit={onSubmit}
        title="새로운 계정을 만드세요"
        actionLabel="회원가입"
        disabled={isLoading}
        body={bodyContent}
        footer={footerContent}
    />
}

export default RegisterModal