// App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PostList from './components/PostList';
import PostForm from './components/PostForm';
import PostDetail from './components/PostDetail';
import BulletinBoard from './components/BulletinBoard';

const App: React.FC = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<PostList />} />
          {/* <Route path="/" element={<PostList />} /> */}
          <Route path="/post/new" element={<PostForm onPostCreatedOrUpdate={() => {}} />} />
          <Route path="/post/:id" element={<PostDetail />} />
          {/* 필요 시 :id 파라미터 등을 이용한 상세/수정 페이지 라우팅 */}
          <Route path="/board" element={<BulletinBoard />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
