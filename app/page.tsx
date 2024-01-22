import Header from "@/components/header";
import PostForm from "@/components/post-form";
import PostFeed from "@/components/posts/post-feed";

export default function Home() {
    return (
      <>
        <Header label="홈"/>
        <PostForm placeholder="트윗 하세요 🚀" isComment={false}/>
        <PostFeed />
      </>

    )
}
