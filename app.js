// 零启AI — 全站共用脚本

document.addEventListener('DOMContentLoaded', () => {
  const path = location.pathname;

  // 高亮当前导航项
  document.querySelectorAll('.nav-links a').forEach(a => {
    const href = a.getAttribute('href') || '';
    if (path.includes(href) && href !== '/' && href !== '../' && href !== 'index.html') {
      a.classList.add('active');
    }
  });

  // ── 注入导航按钮组（搜索 + 暗色模式 + 汉堡菜单） ──
  const navInner = document.querySelector('.nav-inner');
  if (navInner && !document.getElementById('nav-actions')) {
    const actionsDiv = document.createElement('div');
    actionsDiv.className = 'nav-actions';
    actionsDiv.id = 'nav-actions';

    // 搜索按钮
    actionsDiv.innerHTML = `
      <button class="nav-action-btn" id="search-toggle" title="搜索" aria-label="搜索">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
      </button>
      <button class="nav-action-btn" id="theme-toggle" title="切换暗色模式" aria-label="切换暗色模式">
        <svg id="theme-icon-dark" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" style="display:none"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
        <svg id="theme-icon-light" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
      </button>
    `;

    // 汉堡菜单按钮（移动端显示）
    const toggleBtn = document.createElement('button');
    toggleBtn.className = 'nav-toggle-btn';
    toggleBtn.id = 'nav-toggle';
    toggleBtn.setAttribute('aria-label', '菜单');
    toggleBtn.innerHTML = '<span></span><span></span><span></span>';

    // 追加到 nav-inner 末尾（CSS flex + margin-left:auto 处理布局顺序）
    navInner.appendChild(actionsDiv);
    navInner.appendChild(toggleBtn);
  }

  // ── 搜索功能 ──
  const searchToggle = document.getElementById('search-toggle');
  if (searchToggle && !document.getElementById('search-overlay')) {
    // 创建搜索覆盖层
    const overlay = document.createElement('div');
    overlay.className = 'search-overlay';
    overlay.id = 'search-overlay';
    overlay.innerHTML = `
      <div class="search-box">
        <div class="search-input-wrap">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
          <input type="text" id="search-input" placeholder="搜索工具、教程、关键词..." autocomplete="off">
        </div>
        <div class="search-results" id="search-results"></div>
      </div>
    `;
    document.body.appendChild(overlay);

    // 搜索数据（全站工具索引）
    const searchData = [
      { title: 'Claude', desc: '小龙虾 · Anthropic国际顶级AI对话助手', url: '/tools/chat.html#claude', icon: '🦞' },
      { title: 'ChatGPT', desc: 'OpenAI · 全球最广泛使用的AI对话工具', url: '/tools/chat.html#chatgpt', icon: '🤖' },
      { title: 'Kimi', desc: '月之暗面 · 国内直连 · 200万字长文本', url: '/tools/chat.html#kimi', icon: '🌙' },
      { title: '豆包', desc: '字节跳动 · 多模态AI对话助手', url: '/tools/chat.html#doubao', icon: '🫘' },
      { title: 'DeepSeek', desc: '深度求索 · 数学代码推理能力突出', url: '/tools/chat.html#deepseek', icon: '🔍' },
      { title: '通义千问', desc: '阿里巴巴 · 企业级AI应用生态', url: '/tools/chat.html#qwen', icon: '🌿' },
      { title: 'Midjourney', desc: '国际顶级AI绘图工具 · 艺术风格多样', url: '/tools/image.html#midjourney', icon: '🎨' },
      { title: '即梦AI', desc: '字节跳动 · 中文提示词 · 图文视频', url: '/tools/image.html#jimeng', icon: '✨' },
      { title: 'Stable Diffusion', desc: '开源AI绘图 · Fooocus安装 · 100集教程', url: '/tools/image.html#sd', icon: '🖼️' },
      { title: '可灵AI', desc: '快手 · 文生视频/图生视频 · 国际一流', url: '/tools/video.html#kling', icon: '🎬' },
      { title: 'Runway Gen-3', desc: '国际领先AI视频生成 · 影视广告', url: '/tools/video.html#runway', icon: '🎞️' },
      { title: 'Suno', desc: '全球最热门AI音乐生成 · 支持中文', url: '/tools/video.html#suno', icon: '🎵' },
      { title: 'Udio', desc: 'AI音乐创作 · 人声和编曲细节更优', url: '/tools/video.html#udio', icon: '🎸' },
      { title: '剪映AI', desc: '字节跳动 · AI字幕/配音/抠图', url: '/tools/video.html#jianying', icon: '✂️' },
      { title: '腾讯智影', desc: '数字人口播视频制作', url: '/tools/video.html#zhiying', icon: '🎥' },
      { title: '魔音工坊', desc: '500+声音 · AI配音/有声书', url: '/tools/video.html#moyin', icon: '🎙️' },
      { title: 'ElevenLabs', desc: '语音克隆 · 29种语言', url: '/tools/video.html#elevenlabs', icon: '🔊' },
      { title: '网易见外', desc: '语音转文字/视频翻译/OCR · 完全免费', url: '/tools/video.html#jianwai', icon: '🌐' },
      { title: 'Ollama', desc: '本地模型运行框架 · Llama/Hermes/DeepSeek', url: '/tools/local.html#ollama', icon: '🦙' },
      { title: 'Hermes Agent', desc: 'NousResearch · Agent专项优化模型', url: '/tools/local.html#hermes', icon: '🐺' },
      { title: 'OpenClaw AI Agent', desc: '多模型自托管平台 · 20+平台接入', url: '/tools/local.html#openclaw', icon: '🦀' },
      { title: 'Dify', desc: '可视化工作流 · RAG知识库', url: '/tools/local.html#dify', icon: '⚡' },
      { title: 'Coze扣子', desc: '字节跳动 · 零代码智能体搭建', url: '/tools/local.html#coze', icon: '🔧' },
      { title: 'Cursor', desc: '最热门AI编程编辑器 · VS Code深度定制', url: '/tools/local.html#cursor', icon: '📝' },
      { title: 'WorkBuddy', desc: '腾讯云AI智能开发助手 · 小程序+IDE', url: '/tools/local.html#workbuddy', icon: '🐟' },
      { title: 'GPTs', desc: 'ChatGPT自定义AI助手 · 知识库', url: '/tools/local.html#gpts', icon: '🤖' },
      { title: 'WPS AI', desc: '金山办公 · AI续写/润色/摘要', url: '/tools/office.html#wpsai', icon: '📝' },
      { title: 'Gamma', desc: 'AI PPT生成 · 输入主题自动制作', url: '/tools/office.html#gamma', icon: '🎭' },
      { title: 'Kimi PDF阅读', desc: '200万字上下文 · 深度阅读PDF', url: '/tools/office.html#kimi-pdf', icon: '🌙' },
      { title: 'Claude PDF分析', desc: '多PDF对比 · 学术研究/合同审查', url: '/tools/office.html#claude-pdf', icon: '🦞' },
      { title: 'Obsidian', desc: '首选推荐 · 本地Markdown笔记', url: '/tools/notes.html', icon: '⬛' },
      { title: '学习路径', desc: '三阶段系统学习AI · 入门到深度应用', url: '/learn/index.html', icon: '📚' },
      { title: '零基础入门', desc: '从AI是什么开始 · 5种提示词写法', url: '/learn/beginner.html', icon: '🌱' },
      { title: '进阶提升', desc: 'Prompt Engineering · AI绘图 · AI编程', url: '/learn/intermediate.html', icon: '⚡' },
      { title: '深度应用', desc: 'Agent搭建 · 本地部署 · 应用上架', url: '/learn/advanced.html', icon: '🚀' },
      { title: '24周学习计划', desc: '5阶段体系化学习路线', url: '/learn/plan.html', icon: '📅' },
      { title: '功能对比', desc: '工具横向对比 · 免费额度/中文/场景', url: '/compare/index.html', icon: '⚖️' },
    ];

    const searchInput = document.getElementById('search-input');
    const searchResults = document.getElementById('search-results');

    searchToggle.addEventListener('click', () => {
      overlay.classList.add('open');
      setTimeout(() => searchInput.focus(), 100);
    });

    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) overlay.classList.remove('open');
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') overlay.classList.remove('open');
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        overlay.classList.add('open');
        setTimeout(() => searchInput.focus(), 100);
      }
    });

    searchInput.addEventListener('input', () => {
      const q = searchInput.value.trim().toLowerCase();
      if (!q) { searchResults.innerHTML = ''; return; }

      const results = searchData.filter(item =>
        item.title.toLowerCase().includes(q) ||
        item.desc.toLowerCase().includes(q)
      ).slice(0, 8);

      if (results.length === 0) {
        searchResults.innerHTML = '<div class="search-empty">没有找到相关工具，试试其他关键词</div>';
      } else {
        searchResults.innerHTML = results.map(r => `
          <a href="${r.url}" class="search-result-item">
            <span class="search-result-icon">${r.icon}</span>
            <div class="search-result-text">
              <h4>${r.title}</h4>
              <p>${r.desc}</p>
            </div>
          </a>
        `).join('');
      }
    });
  }

  // ── 暗色模式 ──
  const themeToggle = document.getElementById('theme-toggle');
  const iconDark = document.getElementById('theme-icon-dark');
  const iconLight = document.getElementById('theme-icon-light');

  // 读取保存的主题
  const savedTheme = localStorage.getItem('lingqi-theme');
  if (savedTheme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
    if (iconDark) iconDark.style.display = 'block';
    if (iconLight) iconLight.style.display = 'none';
  } else {
    if (iconDark) iconDark.style.display = 'none';
    if (iconLight) iconLight.style.display = 'block';
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      if (isDark) {
        document.documentElement.removeAttribute('data-theme');
        localStorage.setItem('lingqi-theme', 'light');
        if (iconDark) iconDark.style.display = 'none';
        if (iconLight) iconLight.style.display = 'block';
      } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('lingqi-theme', 'dark');
        if (iconDark) iconDark.style.display = 'block';
        if (iconLight) iconLight.style.display = 'none';
      }
    });
  }

  // ── 移动端汉堡菜单 ──
  const toggle = document.getElementById('nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  if (toggle && navLinks) {
    toggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      toggle.classList.toggle('open');
    });
    // 点击导航链接后关闭菜单
    navLinks.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        navLinks.classList.remove('open');
        toggle.classList.remove('open');
      });
    });
  }
});
