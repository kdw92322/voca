import './Login.css';
import { useEffect, useState } from 'react';

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
        <>
      <h2>Login</h2><form action="" method="POST">
      <div className="input-box">
        <input id="username" type="text" name="username" placeholder="아이디" value={username} onChange={({ target:{value} }) => setUsername(value)} />
        <label for="username">아이디</label>
      </div>
      <div className="input-box">
        <input id="password" type="password" name="password" placeholder="비밀번호" value={password} onChange={({ target:{value} }) => setPassword(value)}/>
        <label for="password">비밀번호</label>
      </div>
      <div id="forgot">비밀번호 찾기</div>
      <input type="submit" value="로그인" />

    </form></>
  )
}

export default LoginPage