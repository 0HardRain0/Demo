// App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PostList from './components/PostList';
import PostForm from './components/PostForm';
import PostDetail from './components/PostDetail';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PostList />} />
        <Route path="/post/new" element={<PostForm onSubmit={() => {}} />} />
        <Route path="/post/:id" element={<PostDetail postId={1} />} />
        {/* 필요 시 :id 파라미터 등을 이용한 상세/수정 페이지 라우팅 */}
      </Routes>
    </Router>
  );
}

export default App;
