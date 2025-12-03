import { useEffect, useState, useRef } from "react"
import getPost from "./lib/getPosts";

// - 처음 렌더링 시 10개의 데이터가 보여집니다.
// - 마지막 요소가  화면에 보이면 이어서 10개의 데이터가 더 보여집니다. → 무한스크롤 구현
function App() {
  const [posts, setPosts] = useState([]);
  const [visibleCount, setVisibleCount] = useState(10); // 화면에 보여줄 개수
  const lastPostRef = useRef(null);

  // 전체 데이터 한 번만 가져오기
  useEffect(() => {
    getPost().then(data => {
      setPosts(data);
    });
  }, []);

  useEffect(() => {
    if (!lastPostRef.current) return;

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setVisibleCount(prev => prev + 10);
        }
      });
    });

    observer.observe(lastPostRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div style={styles.container}>
      {posts.slice(0, visibleCount).map((post, index) => (
        <div key={post.id + index} style={styles.item}>
          <h2>{index + 1}. {post.title}</h2>
          <p>{post.body}</p>
        </div>
      ))}
      <div ref={lastPostRef} style={styles.lastPost} />
    </div>
  )
}

const styles= {
  container: {
    width: '100%',
    padding: 20,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  item: {
    width: '50%',
    border: '1px solid #000',
    padding: 24,
    margin: 24,
    borderRadius: 12,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  lastPost: {
    height: 100,
  }
}

export default App