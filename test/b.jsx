import React from 'react';

function TestComponent() {
  return (
    <div>
      <h1>欢迎来到我们的网站</h1>
      <p>这是一个示例组件，包含中文字符，用于本地化测试。</p>
      <button onClick={() => console.log('点击事件')}>点击这里</button>
      <p>更多信息: 请访问我们的<a href="#">网站</a>。</p>
    </div>
  );
}

export default TestComponent;
