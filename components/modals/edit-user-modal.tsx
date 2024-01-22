'use client';

import useEditUserModal from "@/hooks/useEditUserModal"
import Modal from "../modal"
import useCurrentUser from "@/hooks/useCurrentUser";
import useUser from "@/hooks/useUser";
import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import Input from "../input";
import ImageUpload from "../image-upload";

const EditUserModal = () => {
    const { data: currentUser } = useCurrentUser();
    const editUserModal = useEditUserModal();
    const { mutate: mutateFetchedUser } = useUser(currentUser?.id);

    const [isLoading, setIsLoading] = useState(false);

    const [profileImage, setProfileImage] = useState('')
    const [coverImage, setCoverImage] = useState('')
    const [name, setName] = useState('')
    const [username, setUsername] = useState('')
    const [bio, setBio] = useState('')

    // set default 
    useEffect(()=>{
        setProfileImage(currentUser?.profileImage)
        setCoverImage(currentUser?.coverImage)
        setName(currentUser?.name)
        setUsername(currentUser?.username)
        setBio(currentUser?.bio)
    },[currentUser])

    const onSubmit = useCallback(async () => {
        try {
            setIsLoading(true)
            await axios.patch(`/api/users/`,{
                name, username, bio, coverImage, profileImage
            })
            mutateFetchedUser();
            toast.success('프로필 업데이트 완료!')
            editUserModal.onClose();
        } catch (error) {
            console.log(error)
            toast.error('SERVER ERROR');
        } finally {
            setIsLoading(false);
        }
    },[name, username, bio, coverImage, profileImage])

    const bodyContent = (
        <div className="flex flex-col gap-4">
            <ImageUpload label="프로필 사진" disabled={isLoading} value={profileImage} onChange={(image)=> setProfileImage(image)}/>
            <ImageUpload label="커버 사진" disabled={isLoading} value={coverImage} onChange={(image)=> setCoverImage(image)}/>
            <Input placeholder="이름" onChange={e=> setName(e.target.value)} value={name} disabled={isLoading}/>
            <Input placeholder="닉네임" onChange={e=> setUsername(e.target.value)} value={username} disabled={isLoading}/>
            <Input placeholder="자기소개" onChange={e=> setBio(e.target.value)} value={bio} disabled={isLoading}/>
        </div>
    )

    return (
        <Modal 
            title="프로필 수정"
            actionLabel="업데이트"
            body={bodyContent}
            onSubmit={onSubmit}
            onClose={editUserModal.onClose}
            isOpen={editUserModal.isOpen}
        />
    )
}

export default EditUserModal