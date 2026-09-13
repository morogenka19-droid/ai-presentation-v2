import React, { useState } from 'react';
import './App.css';

function App() {
  const [topic, setTopic] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [template, setTemplate] = useState('modern');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    try {
      const response = await fetch('http://127.0.0.1:8000/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          topic,
          template 
        }),
      });

      if (!response.ok) {
        throw new Error('Ошибка генерации');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `Презентация_${topic.slice(0, 20)}.pptx`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);

      setResult('✅ Презентация успешно создана и скачана!');
    } catch (error) {
      setResult('❌ Ошибка: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <header className="header">
        <div className="logo">✨ AI Presentation</div>
        <nav>
          <a href="#create">Создать</a>
          <a href="#templates">Шаблоны</a>
        </nav>
      </header>

      <main className="main">
        <div className="hero">
          <h1>🎨 Создай презентацию за минуту</h1>
          <p className="subtitle">
            Искусственный интеллект сделает всё за тебя — просто введи тему
          </p>
        </div>

        <div className="card">
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <input
                type="text"
                placeholder="Например: Искусственный интеллект в медицине"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                required
                disabled={loading}
              />
              <button type="submit" disabled={loading}>
                {loading ? '⏳ Генерация...' : '🚀 Создать презентацию'}
              </button>
            </div>

            <div className="template-selector">
              <label>Выбери стиль:</label>
              <div className="template-buttons">
                <button 
                  type="button"
                  className={template === 'modern' ? 'active' : ''}
                  onClick={() => setTemplate('modern')}
                >
                  ✨ Современный
                </button>
                <button 
                  type="button"
                  className={template === 'business' ? 'active' : ''}
                  onClick={() => setTemplate('business')}
                >
                  💼 Деловой
                </button>
                <button 
                  type="button"
                  className={template === 'creative' ? 'active' : ''}
                  onClick={() => setTemplate('creative')}
                >
                  🎨 Креативный
                </button>
              </div>
            </div>
          </form>

          {result && (
            <div className={`result ${result.includes('✅') ? 'success' : 'error'}`}>
              {result}
            </div>
          )}

          {loading && (
            <div className="loader">
              <div className="spinner"></div>
              <p>ИИ придумывает слайды...</p>
            </div>
          )}
        </div>

        <div className="features">
          <div className="feature">
            <span className="icon">🤖</span>
            <h3>Умный ИИ</h3>
            <p>Генерирует структуру и содержание</p>
          </div>
          <div className="feature">
            <span className="icon">⚡</span>
            <h3>Быстро</h3>
            <p>Презентация готова за 30 секунд</p>
          </div>
          <div className="feature">
            <span className="icon">🎨</span>
            <h3>Красиво</h3>
            <p>Современный дизайн и шаблоны</p>
          </div>
          <div className="feature">
            <span className="icon">📥</span>
            <h3>Скачай</h3>
            <p>Готовый файл .pptx на компьютер</p>
          </div>
        </div>
      </main>

      <footer className="footer">
        <p>© 2026 AI Presentation Generator — Сделано с ❤️</p>
      </footer>
    </div>
  );
}

export default App;