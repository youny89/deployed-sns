import EditUserModal from "@/components/modals/edit-user-modal"
import LoginModal from "@/components/modals/login-modal"
import RegisterModal from "@/components/modals/register-modal"

const ModalProvider = () => {
    return (
        <>
            <LoginModal />
            <RegisterModal />
            <EditUserModal />
        </>
    )
}

export default ModalProvider