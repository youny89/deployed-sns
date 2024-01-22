import Header from "@/components/header"
import NotificationFeed from "@/components/notifications/notification-feed"

const NotificationPage = () => {
    return (
        <>
            <Header label="알림" showBackArrow/>
            <NotificationFeed />
        </>
    )
}

export default NotificationPage