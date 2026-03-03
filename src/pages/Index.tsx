import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

// ─── Scroll Reveal Hook ───────────────────────────────────────────────────────
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1 }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

// ─── FAQ Item ─────────────────────────────────────────────────────────────────
function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="faq-item">
      <button
        className="w-full text-left px-6 py-5 flex items-center justify-between gap-4"
        onClick={() => setOpen(!open)}
      >
        <span className="font-semibold text-white text-[15px] leading-snug">{q}</span>
        <span className="text-purple-400 text-xl flex-shrink-0">
          {open ? "−" : "+"}
        </span>
      </button>
      {open && (
        <div className="px-6 pb-5 text-gray-300 text-sm leading-relaxed border-t border-white/5 pt-4">
          {a}
        </div>
      )}
    </div>
  );
}

// ─── Popup Form ───────────────────────────────────────────────────────────────
function PopupForm({ onClose }: { onClose: () => void }) {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", comment: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: connect Google Sheets
    setSent(true);
  };

  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className="popup-box" onClick={(e) => e.stopPropagation()}>
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white text-xl"
        >
          ✕
        </button>
        {sent ? (
          <div className="text-center py-8">
            <div className="text-5xl mb-4">🚀</div>
            <h3 className="text-xl font-bold text-white mb-2">Заявка отправлена!</h3>
            <p className="text-gray-400">Мы свяжемся с вами в течение 30 минут.</p>
          </div>
        ) : (
          <>
            <h3 className="text-2xl font-bold text-white mb-2" style={{ fontFamily: 'Montserrat' }}>
              Оставить заявку на SMM+
            </h3>
            <p className="text-gray-400 text-sm mb-6">
              Первый месяц — скидка до 30% для новых клиентов!
            </p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                className="form-input"
                placeholder="Ваше имя"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
              <input
                className="form-input"
                placeholder="Телефон / WhatsApp"
                required
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
              />
              <textarea
                className="form-input"
                placeholder="Расскажите о вашем бизнесе (необязательно)"
                rows={3}
                value={form.comment}
                onChange={(e) => setForm({ ...form, comment: e.target.value })}
              />
              <button type="submit" className="btn-primary w-full justify-center">
                Получить консультацию бесплатно
              </button>
              <p className="text-gray-500 text-xs text-center">
                Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности
              </p>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function Index() {
  useReveal();
  const [showPopup, setShowPopup] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const socials = [
    { label: "ВКонтакте", url: "https://vk.com/sanruno", emoji: "🔵", color: "#4680C2" },
    { label: "Одноклассники", url: "https://ok.ru/sanruno", emoji: "🟠", color: "#ee8208" },
    { label: "Телеграм", url: "https://t.me/sanruno", emoji: "✈️", color: "#2AABEE" },
    { label: "Дзен", url: "https://dzen.ru/runokmv", emoji: "⚡", color: "#ff6000" },
    { label: "Rutube", url: "https://rutube.ru/channel/68163885/", emoji: "📺", color: "#cc2222" },
    { label: "VK Видео", url: "https://vkvideo.ru/@sanruno", emoji: "🎬", color: "#4680C2" },
  ];

  const services = [
    { icon: "📱", title: "SMM+ Продвижение", desc: "Комплексное ведение соцсетей: ВКонтакте, Одноклассники, Telegram. Создание и публикация контента, рост аудитории." },
    { icon: "🤝", title: "Воронки продаж", desc: "Выстраиваем путь клиента от первого касания до покупки. Автоматические цепочки сообщений и прогрева." },
    { icon: "🎯", title: "Контент-маркетинг", desc: "Создание экспертного контента, который ранжируется в Яндексе. Тексты, визуал, видеоролики для Rutube." },
    { icon: "🔍", title: "SEO-оптимизация", desc: "Оптимизация профилей соцсетей под алгоритмы Яндекса. Вывод бизнес-аккаунтов в ТОП поисковой выдачи." },
    { icon: "📊", title: "Аналитика и отчёты", desc: "Еженедельный мониторинг позиций в Яндексе. Подробные отчёты с цифрами и динамикой роста." },
    { icon: "🤖", title: "Автоматизация SMM", desc: "ИИ-инструменты для создания контента, чат-боты, голосовые заявки — работаем пока вы в пути." },
  ];

  const steps = [
    { n: "01", title: "Разработка стратегии", desc: "Анализ ниши, конкурентов, целевой аудитории. Формируем контент-план на 3 месяца." },
    { n: "02", title: "Создание контента", desc: "Тексты, фото, видео, графика. Контент, который нравится алгоритмам Яндекса и живым людям." },
    { n: "03", title: "Публикация & монетинг", desc: "Регулярные публикации по расписанию. Еженедельный мониторинг позиций." },
    { n: "04", title: "Оптимизация & масштаб", desc: "Анализируем результаты, масштабируем то, что работает. Растём вместе с вашим бизнесом." },
  ];

  const faqItems = [
    {
      q: "Почему вы работаете с SMM-агентством и продвижением в поиске?",
      a: "Мы специализируемся на органическом продвижении через социальные сети. Алгоритмы Яндекса активно индексируют ВКонтакте, ОК, Telegram, Rutube — это позволяет вашему бизнесу занять несколько позиций в выдаче без рекламных затрат."
    },
    {
      q: "Сколько времени нужно для выхода в ТОП-10 Яндекса?",
      a: "По нашему опыту — от 2 до 6 месяцев в зависимости от ниши и конкурентности. Санаторий Руно занял 6 позиций в ТОП-10 за 6 месяцев работы."
    },
    {
      q: "Основа вашей работы — качественный контент или технические настройки?",
      a: "И то, и другое. Мы оптимизируем профили соцсетей под алгоритмы Яндекса и при этом создаём ценный контент, который читают живые люди. Баланс технической SEO-оптимизации и живого контента — наш ключевой подход."
    },
    {
      q: "«Нам казалось, что реклама в Яндекс.Бизнес достаточна — зачем ещё соцсети?»",
      a: "Отличный вопрос! Кейс санатория Руно наглядно показывает: бизнес-аккаунты ВКонтакте и ОК заняли позиции ВЫШЕ платных объявлений Яндекс.Карт. То есть органический трафик обходит платную рекламу. Почему не использовать оба канала?"
    },
    {
      q: "Что произошло с позициями Телеграм после замедления?",
      a: "После официального замедления Telegram в России Яндекс резко изменил алгоритмы — Telegram-каналы практически исчезли из поисковой выдачи. Мы оперативно перераспределили усилия на ВКонтакте, ОК и Rutube, сохранив и даже укрепив общие позиции клиента."
    },
  ];

  return (
    <div className="noise-overlay" style={{ background: "var(--bg-dark)", minHeight: "100vh" }}>

      {/* ── STICKY HEADER ─────────────────────────────────────────── */}
      <header className={`sticky-header ${scrolled ? "shadow-lg shadow-black/40" : ""}`}>
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg gradient-violet flex items-center justify-center">
              <span className="text-white font-black text-sm" style={{ fontFamily: "Montserrat" }}>МИГ</span>
            </div>
            <div>
              <div className="text-white font-bold text-sm leading-none" style={{ fontFamily: "Montserrat" }}>ООО «МИГ»</div>
              <div className="text-gray-400 text-xs">Маркетинговое агентство</div>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-6 text-sm text-gray-300">
            <a href="#how" className="hover:text-white transition-colors">Как работаем</a>
            <a href="#cases" className="hover:text-white transition-colors">Кейсы</a>
            <a href="#prices" className="hover:text-white transition-colors">Тарифы</a>
            <a href="#services" className="hover:text-white transition-colors">Услуги</a>
            <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
            <a href="#contacts" className="hover:text-white transition-colors">Контакты</a>
          </nav>

          <button
            onClick={() => setShowPopup(true)}
            className="btn-primary text-sm py-2 px-5"
          >
            Оставить заявку
          </button>
        </div>
      </header>

      {/* ── HERO ──────────────────────────────────────────────────── */}
      <section className="mesh-bg grid-bg pt-28 pb-20 px-4 relative overflow-hidden">
        <div
          className="absolute top-20 right-10 w-72 h-72 rounded-full opacity-10 blur-3xl"
          style={{ background: "radial-gradient(circle, #7c3aed, transparent)" }}
        />
        <div
          className="absolute bottom-10 left-5 w-48 h-48 rounded-full opacity-10 blur-3xl"
          style={{ background: "radial-gradient(circle, #3b82f6, transparent)" }}
        />

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="badge-violet inline-block mb-6 animate-fade-up">
            SMM+ Агентство нового поколения
          </div>

          <h1
            className="text-4xl md:text-6xl font-black leading-tight mb-6 animate-fade-up delay-100"
            style={{ fontFamily: "Montserrat" }}
          >
            Маркетинговое агентство{" "}
            <span className="gradient-violet-text">SMM+</span> для бизнеса{" "}
            <span className="gradient-violet-text">любого масштаба</span>
          </h1>

          <p className="text-gray-300 text-lg md:text-xl mb-4 max-w-2xl mx-auto animate-fade-up delay-200">
            Специализируемся на продвижении в соцсетях и поиске —
          </p>
          <p className="text-white text-xl md:text-2xl font-bold mb-10 animate-fade-up delay-300" style={{ fontFamily: "Montserrat" }}>
            Выводим клиентов в ТОП-10 Яндекса{" "}
            <span className="gradient-gold-text">БЕЗ РЕКЛАМНОГО БЮДЖЕТА</span>
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 animate-fade-up delay-400">
            {[
              { num: "19", label: "лет опыта" },
              { num: "6", label: "ВТ Рейтинг" },
              { num: "195+", label: "Реализованных кейсов" },
              { num: "0", label: "Затрат на рекламу в кейсе" },
            ].map((s, i) => (
              <div key={i} className="card-dark p-5">
                <div
                  className="text-3xl font-black mb-1 gradient-violet-text"
                  style={{ fontFamily: "Montserrat" }}
                >
                  {s.num}
                </div>
                <div className="text-gray-400 text-xs">{s.label}</div>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-4 justify-center animate-fade-up delay-500">
            <button onClick={() => setShowPopup(true)} className="btn-primary animate-pulse-glow">
              🚀 Получить консультацию
            </button>
            <a href="#cases" className="btn-outline">
              Смотреть кейсы
            </a>
          </div>

          {/* Hero image */}
          <div className="mt-14 max-w-lg mx-auto animate-float">
            <img
              src="https://cdn.poehali.dev/files/a7872ccc-2281-443d-99f6-17e063298075.jpg"
              alt="В ТОП-10 поисковой выдачи без платного трафика"
              className="w-full rounded-2xl"
              style={{
                boxShadow: "0 30px 80px rgba(124,58,237,0.3)",
                border: "2px solid rgba(124,58,237,0.4)",
              }}
            />
          </div>
        </div>
      </section>

      {/* ── КАК МЫ РАБОТАЕМ ───────────────────────────────────────── */}
      <section id="how" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14 reveal">
            <div className="badge-violet inline-block mb-4">Процесс</div>
            <div className="section-divider" />
            <h2 className="text-3xl md:text-4xl font-black text-white" style={{ fontFamily: "Montserrat" }}>
              Как мы работаем
            </h2>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {steps.map((s, i) => (
              <div key={i} className={`card-dark p-6 text-center reveal delay-${(i + 1) * 100}`}>
                <div className="step-number mx-auto mb-4">{s.n}</div>
                <h3 className="text-white font-bold mb-3 text-sm" style={{ fontFamily: "Montserrat" }}>
                  {s.title}
                </h3>
                <p className="text-gray-400 text-xs leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PORTFOLIO / CASES ─────────────────────────────────────── */}
      <section id="cases" className="py-20 px-4" style={{ background: "var(--bg-card2)" }}>
        <div className="max-w-6xl mx-auto">
          {/* Portfolio Header */}
          <div className="text-center mb-12 reveal">
            <div className="badge-violet inline-block mb-4">Портфолио</div>
            <div className="section-divider" />
            <h2 className="text-3xl md:text-4xl font-black text-white leading-snug" style={{ fontFamily: "Montserrat" }}>
              НАШЕ ПОРТФОЛИО —<br />
              <span className="gradient-violet-text">в режиме реального времени</span>,<br />
              <span className="text-gray-300 text-2xl font-semibold">
                без монтажа и ретуши — веришь нам по одной простой причине: ты видишь результат
              </span>
            </h2>
          </div>

          {/* Case: Санаторий Руно */}
          <div className="card-dark p-8 mb-8 reveal">
            <div className="flex flex-col md:flex-row gap-6 mb-6">
              <div className="flex-1">
                <div className="badge-violet mb-3 inline-block">Кейс</div>
                <h3 className="text-2xl font-black text-white mb-4" style={{ fontFamily: "Montserrat" }}>
                  Санаторий «Руно» и Криотерапия КМВ
                </h3>
                <div className="mb-4">
                  <p className="text-gray-300 text-sm mb-3 font-semibold">Что было сделано:</p>
                  <ul className="space-y-2">
                    {["Официальный сайт", "ВКонтакте", "Одноклассники", "Telegram", "Rutube", "Дзен"].map((item) => (
                      <li key={item} className="flex items-center gap-2 text-sm text-gray-300">
                        <span className="text-green-400">✓</span> {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="flex-1">
                <p className="text-gray-300 text-sm mb-3 font-semibold">Трафик в Яндексе без бюджета:</p>
                <div className="space-y-3">
                  {[
                    "6-ть позиций в ТОП-10 выдачи по запросу «санаторий руно пятигорск официальный»",
                    "Занято 6 из 10 строк первой страницы Яндекса ресурсами санатория",
                    "Один запрос приводит более 11 000 пользователей в месяц",
                  ].map((item, i) => (
                    <div key={i} className="flex gap-3 items-start">
                      <span className="text-purple-400 text-lg flex-shrink-0">⭐</span>
                      <p className="text-gray-200 text-sm leading-relaxed">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* РЕЗУЛЬТАТЫ */}
            <div
              className="rounded-xl p-5 mb-6"
              style={{ background: "rgba(124,58,237,0.08)", border: "1px solid rgba(124,58,237,0.2)" }}
            >
              <p className="text-white font-bold mb-3 text-base" style={{ fontFamily: "Montserrat" }}>
                ✅ Результат за 6 месяцев работы:
              </p>
              <ul className="space-y-2 text-sm">
                <li className="text-gray-200 leading-relaxed">
                  📌 Из 10 позиций на первой странице Яндекс поиска{" "}
                  <strong className="text-white">занимают ресурсы санатория</strong>;
                </li>
                <li className="text-gray-200 leading-relaxed">
                  📌 Бизнес-аккаунты Руно в ВК и ОК в поисковой выдаче{" "}
                  <strong className="text-white">занимают позиции выше Яндекс Карты</strong>{" "}
                  (на которые настроена платная реклама Руно!);
                </li>
                <li className="text-gray-200 leading-relaxed">
                  📌 Позиции соцсетей Руно в ВК, ОК и мессенджера Телеграм{" "}
                  <strong className="text-white">выше мощного агрегатора 2ГИС!</strong>
                </li>
              </ul>
            </div>

            {/* KEY HIGHLIGHT */}
            <div
              className="rounded-xl p-5 mb-6"
              style={{
                background: "rgba(245,158,11,0.08)",
                border: "2px solid rgba(245,158,11,0.4)",
              }}
            >
              <p
                className="text-[#f59e0b] font-black text-base md:text-lg leading-relaxed text-center uppercase"
                style={{ fontFamily: "Montserrat", letterSpacing: "0.01em" }}
              >
                ВСЕ СОЦСЕТИ НАХОДЯТСЯ ВЫШЕ ТАКОГО КРУПНОГО АГРЕГАТОРА — 2ГИС, А АККАУНТЫ РУНО ВК И ОК — ВЫШЕ ТАКОГО «МОНСТРА» КАК ЯНДЕКС КАРТЫ, НА КОТОРЫЕ У РУНО НАСТРОЕНА ПЛАТНАЯ РЕКЛАМА В ЯНДЕКС БИЗНЕС!
              </p>
            </div>

            <p className="text-gray-400 text-xs italic text-center">
              * Агентство постоянно мониторит позиции выдачи в Яндекс поиске
            </p>
          </div>

          {/* ─── КЕЙСЫ: 6 ПОЗИЦИЙ В ТОП-10 ─── */}
          <div className="card-dark p-8 mb-8 reveal">
            <div className="text-center mb-6">
              <div className="badge-violet inline-block mb-3">Кейсы</div>
              <h3 className="text-2xl font-black text-white" style={{ fontFamily: "Montserrat" }}>
                Кейсы: 6-ть позиций в ТОП-10
              </h3>
              <p className="text-gray-400 text-sm mt-2">Скриншот поисковой выдачи Яндекса — январь 2026</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              {/* Screenshot 1 — Руно */}
              <div>
                <p className="text-gray-300 text-sm font-semibold mb-3 text-center">
                  📍 Позиции соцсетей Руно в конце января 2026 года
                </p>
                <div className="screenshot-card">
                  <img
                    src="https://cdn.poehali.dev/files/b7d43657-0643-4b77-8fd1-118b9f0d1a5d.png"
                    alt="Позиции соцсетей Руно — январь 2026"
                    style={{ filter: "brightness(1.08) contrast(1.1) saturate(1.15) sharpen(1)" }}
                  />
                  <div
                    className="absolute bottom-0 left-0 right-0 p-3 text-center text-xs text-white font-semibold"
                    style={{
                      background: "linear-gradient(transparent, rgba(13,13,26,0.95))",
                    }}
                  >
                    Санаторий Руно Пятигорск официальный
                  </div>
                </div>
              </div>
              {/* Screenshot 2 — Криотерапия КМВ */}
              <div>
                <p className="text-gray-300 text-sm font-semibold mb-3 text-center">
                  📍 Криотерапия КМВ — январь 2026
                </p>
                <div className="screenshot-card">
                  <img
                    src="https://cdn.poehali.dev/files/8887345c-c476-4d8e-8f9f-33b8d9d1fe08.jpg"
                    alt="Криотерапия КМВ — позиции"
                    style={{ filter: "brightness(1.08) contrast(1.1) saturate(1.15)" }}
                  />
                  <div
                    className="absolute bottom-0 left-0 right-0 p-3 text-center text-xs text-white font-semibold"
                    style={{
                      background: "linear-gradient(transparent, rgba(13,13,26,0.95))",
                    }}
                  >
                    Криотерапия КМВ
                  </div>
                </div>
              </div>
            </div>

            <div
              className="rounded-xl p-4 text-center"
              style={{ background: "rgba(59,130,246,0.08)", border: "1px solid rgba(59,130,246,0.2)" }}
            >
              <p className="text-blue-300 text-sm">
                🔍 Агентство постоянно мониторит позиции в Яндекс поиске и оперативно реагирует на изменения алгоритмов
              </p>
            </div>
          </div>

          {/* ─── ПОСЛЕ САНКЦИЙ ТЕЛЕГРАМ ─── */}
          <div className="card-dark p-8 reveal">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-black text-white mb-2" style={{ fontFamily: "Montserrat" }}>
                Позиции соцсетей Руно после санкций Телеграм
              </h3>
              <p className="text-gray-400 text-sm">конец февраля 2026 — мониторинг продолжается</p>
            </div>

            <div className="max-w-2xl mx-auto mb-6">
              <div className="screenshot-card">
                <img
                  src="https://cdn.poehali.dev/files/4133d2a9-f191-4f00-a5b4-d9a2a49364a5.png"
                  alt="Позиции Руно после замедления Телеграм"
                  style={{ filter: "brightness(1.08) contrast(1.1) saturate(1.15)" }}
                />
                <div
                  className="absolute bottom-0 left-0 right-0 p-3 text-center text-xs text-white font-semibold"
                  style={{
                    background: "linear-gradient(transparent, rgba(13,13,26,0.95))",
                  }}
                >
                  Скриншот поисковой выдачи Яндекса — февраль 2026
                </div>
              </div>
            </div>

            <div
              className="rounded-xl p-5"
              style={{ background: "rgba(239,68,68,0.07)", border: "1px solid rgba(239,68,68,0.25)" }}
            >
              <p className="text-red-300 text-sm leading-relaxed">
                ⚠️ <strong>Важно:</strong> После официального замедления Telegram в России Яндекс резко поменял алгоритмы —
                Telegram-каналы практически исчезли из поисковой выдачи. Найти Telegram в поиске стало невозможно.
                Мы оперативно перераспределили усилия на ВКонтакте, ОК и Rutube, сохранив сильные позиции клиента.
              </p>
            </div>

            {/* Без рекламного бюджета */}
            <div className="text-center mt-8">
              <p
                className="text-5xl md:text-6xl font-black gradient-gold-text"
                style={{ fontFamily: "Montserrat" }}
              >
                БЕЗ РЕКЛАМНОГО БЮДЖЕТА
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── ВОРОНКА ПРОДАЖ ────────────────────────────────────────── */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14 reveal">
            <div className="badge-violet inline-block mb-4">Система</div>
            <div className="section-divider" />
            <h2 className="text-3xl md:text-4xl font-black text-white" style={{ fontFamily: "Montserrat" }}>
              Воронка продаж через соцсети
            </h2>
            <p className="text-gray-400 mt-4 max-w-xl mx-auto text-sm">
              Каждый шаг выстроен так, чтобы незнакомец превратился в постоянного клиента
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              { emoji: "🔍", step: "1", title: "Охват в поиске", desc: "Клиент ищет «санаторий Пятигорск» — видит ваши аккаунты на 5–8 позициях ТОП-10 Яндекса." },
              { emoji: "👁", step: "2", title: "Первый контакт", desc: "Переходит в соцсеть — видит экспертный контент, отзывы, фото, актуальные цены." },
              { emoji: "💬", step: "3", title: "Вовлечение", desc: "Подписывается, задаёт вопросы. Чат-бот или менеджер отвечает в течение 5 минут." },
              { emoji: "📞", step: "4", title: "Заявка", desc: "Форма бронирования или звонок. Клиент уже «тёплый» — вы не тратите бюджет на убеждение." },
              { emoji: "🏨", step: "5", title: "Покупка", desc: "Бронирование, оплата, заезд. Клиент доволен — оставляет отзыв, который укрепляет позиции." },
              { emoji: "🔄", step: "6", title: "Повторные продажи", desc: "Контент-маркетинг удерживает аудиторию. Повторные визиты без рекламы." },
            ].map((item, i) => (
              <div key={i} className={`funnel-step reveal delay-${(i % 3 + 1) * 100}`}>
                <div className="step-number">{item.step}</div>
                <div>
                  <div className="text-white font-bold mb-1 text-sm" style={{ fontFamily: "Montserrat" }}>
                    {item.emoji} {item.title}
                  </div>
                  <p className="text-gray-400 text-xs leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ТАРИФЫ ────────────────────────────────────────────────── */}
      <section id="prices" className="py-20 px-4" style={{ background: "var(--bg-card2)" }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14 reveal">
            <div className="badge-violet inline-block mb-4">Стоимость</div>
            <div className="section-divider" />
            <h2 className="text-3xl md:text-4xl font-black text-white" style={{ fontFamily: "Montserrat" }}>
              Цены и тарифы
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6 items-center">
            {/* Старт */}
            <div className="price-card reveal">
              <div className="text-gray-400 text-sm font-semibold mb-2 uppercase tracking-wider">Старт</div>
              <div className="text-3xl font-black text-white mb-1" style={{ fontFamily: "Montserrat" }}>
                35 000 <span className="text-lg font-normal text-gray-400">₽/мес</span>
              </div>
              <p className="text-gray-400 text-xs mb-5">Для малого бизнеса</p>
              <ul className="space-y-2 mb-6 text-sm">
                {["1 соцсеть (ВКонтакте)", "12 публикаций/мес", "Базовая SEO-оптимизация", "Ежемесячный отчёт", "Email поддержка"].map((f) => (
                  <li key={f} className="flex items-center gap-2 text-gray-300">
                    <span className="text-purple-400">✓</span> {f}
                  </li>
                ))}
              </ul>
              <button onClick={() => setShowPopup(true)} className="btn-outline w-full justify-center">
                Выбрать тариф
              </button>
            </div>

            {/* Профи */}
            <div className="price-card popular reveal delay-200">
              <div
                className="absolute -top-3 left-1/2 -translate-x-1/2 text-xs font-bold px-4 py-1 rounded-full text-white"
                style={{ background: "linear-gradient(90deg, var(--violet), var(--blue))" }}
              >
                ПОПУЛЯРНЫЙ
              </div>
              <div className="text-purple-300 text-sm font-semibold mb-2 uppercase tracking-wider">Профи</div>
              <div className="text-4xl font-black text-white mb-1" style={{ fontFamily: "Montserrat" }}>
                65 000 <span className="text-lg font-normal text-gray-400">₽/мес</span>
              </div>
              <p className="text-gray-400 text-xs mb-5">Для среднего бизнеса</p>
              <ul className="space-y-2 mb-6 text-sm">
                {["3 соцсети (ВК + ОК + Telegram)", "30 публикаций/мес", "Полная SEO-оптимизация", "Еженедельный мониторинг позиций", "Воронка продаж", "Чат-бот", "Приоритетная поддержка"].map((f) => (
                  <li key={f} className="flex items-center gap-2 text-gray-200">
                    <span className="text-purple-400">✓</span> {f}
                  </li>
                ))}
              </ul>
              <button onClick={() => setShowPopup(true)} className="btn-primary w-full justify-center">
                Выбрать тариф
              </button>
            </div>

            {/* Лидер */}
            <div className="price-card reveal delay-300">
              <div className="text-blue-400 text-sm font-semibold mb-2 uppercase tracking-wider">Лидер</div>
              <div className="text-3xl font-black text-white mb-1" style={{ fontFamily: "Montserrat" }}>
                95 000 <span className="text-lg font-normal text-gray-400">₽/мес</span>
              </div>
              <p className="text-gray-400 text-xs mb-5">Для крупного бизнеса</p>
              <ul className="space-y-2 mb-6 text-sm">
                {["Все 6 платформ", "60+ публикаций/мес", "Видеоконтент для Rutube", "Ежедневный мониторинг", "Воронка + автоматизация", "ИИ-инструменты", "Голосовые заявки", "Персональный менеджер"].map((f) => (
                  <li key={f} className="flex items-center gap-2 text-gray-300">
                    <span className="text-purple-400">✓</span> {f}
                  </li>
                ))}
              </ul>
              <button onClick={() => setShowPopup(true)} className="btn-outline w-full justify-center">
                Выбрать тариф
              </button>
            </div>
          </div>

          {/* CTA акция */}
          <div
            className="mt-12 rounded-2xl p-8 text-center reveal"
            style={{
              background: "linear-gradient(135deg, rgba(124,58,237,0.2) 0%, rgba(59,130,246,0.15) 100%)",
              border: "1px solid rgba(124,58,237,0.35)",
            }}
          >
            <h3 className="text-2xl font-black text-white mb-3" style={{ fontFamily: "Montserrat" }}>
              Только для новых клиентов
            </h3>
            <p className="text-gray-300 mb-2">Оставьте заявку прямо сейчас и</p>
            <p className="text-xl font-bold text-white mb-6">
              получите скидку до{" "}
              <span className="gradient-gold-text text-3xl font-black">30%</span>{" "}
              на первый месяц продвижения!
            </p>
            <button onClick={() => setShowPopup(true)} className="btn-primary animate-pulse-glow">
              🎁 Получить скидку сейчас
            </button>
          </div>
        </div>
      </section>

      {/* ── УСЛУГИ ────────────────────────────────────────────────── */}
      <section id="services" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14 reveal">
            <div className="badge-violet inline-block mb-4">Направления</div>
            <div className="section-divider" />
            <h2 className="text-3xl md:text-4xl font-black text-white" style={{ fontFamily: "Montserrat" }}>
              Услуги для роста бизнеса
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {services.map((s, i) => (
              <div
                key={i}
                className={`service-card card-dark p-6 reveal delay-${(i % 3 + 1) * 100}`}
              >
                <div className="service-icon text-2xl">{s.icon}</div>
                <h3 className="text-white font-bold mb-3 text-base" style={{ fontFamily: "Montserrat" }}>
                  {s.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── СОЦСЕТИ КЛИЕНТА ───────────────────────────────────────── */}
      <section className="py-16 px-4" style={{ background: "var(--bg-card2)" }}>
        <div className="max-w-4xl mx-auto text-center reveal">
          <h3 className="text-xl font-bold text-white mb-2" style={{ fontFamily: "Montserrat" }}>
            Соцсети санатория «Руно» — наш кейс в реальном времени
          </h3>
          <p className="text-gray-400 text-sm mb-8">Кликайте — все ссылки рабочие и активные</p>

          <div className="flex flex-wrap justify-center gap-4">
            {socials.map((s) => (
              <a
                key={s.url}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="card-dark flex items-center gap-3 px-5 py-3 rounded-xl hover:scale-105 transition-all duration-300 text-sm font-semibold text-white no-underline"
                style={{ borderColor: s.color + "44" }}
              >
                <span className="text-xl">{s.emoji}</span>
                {s.label}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────────────── */}
      <section id="faq" className="py-20 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-14 reveal">
            <div className="badge-violet inline-block mb-4">FAQ</div>
            <div className="section-divider" />
            <h2 className="text-3xl md:text-4xl font-black text-white" style={{ fontFamily: "Montserrat" }}>
              Частые вопросы
            </h2>
          </div>

          <div className="reveal">
            {faqItems.map((item, i) => (
              <FaqItem key={i} q={item.q} a={item.a} />
            ))}
          </div>
        </div>
      </section>

      {/* ── КОНТАКТЫ ──────────────────────────────────────────────── */}
      <section id="contacts" className="py-20 px-4" style={{ background: "var(--bg-card2)" }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14 reveal">
            <div className="badge-violet inline-block mb-4">Связаться</div>
            <div className="section-divider" />
            <h2 className="text-3xl md:text-4xl font-black text-white" style={{ fontFamily: "Montserrat" }}>
              Контакты
            </h2>
            <p className="text-gray-400 mt-3 text-sm">Свяжитесь с нами любым удобным способом</p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Контактная информация */}
            <div className="reveal">
              <div
                className="rounded-2xl p-8"
                style={{
                  background: "linear-gradient(135deg, rgba(124,58,237,0.12), rgba(59,130,246,0.08))",
                  border: "1px solid rgba(124,58,237,0.25)",
                }}
              >
                <div className="text-white font-bold text-lg mb-6" style={{ fontFamily: "Montserrat" }}>
                  ООО «МИГ»
                </div>

                <div className="space-y-5">
                  <div className="flex items-center gap-4">
                    <div className="social-link text-lg">📞</div>
                    <div>
                      <div className="text-gray-400 text-xs mb-1">Телефон</div>
                      <a href="tel:+79155835022" className="text-white font-semibold text-base hover:text-purple-300 transition-colors">
                        +7 (915) 583-50-22
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="social-link text-lg">✉️</div>
                    <div>
                      <div className="text-gray-400 text-xs mb-1">E-mail</div>
                      <a href="mailto:235577@mail.ru" className="text-white font-semibold hover:text-purple-300 transition-colors">
                        235577@mail.ru
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <a
                      href="https://t.me/AIPROBIZZ"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="social-link text-xl"
                      style={{ background: "rgba(42,171,238,0.15)", borderColor: "rgba(42,171,238,0.4)" }}
                    >
                      ✈️
                    </a>
                    <div>
                      <div className="text-gray-400 text-xs mb-1">Telegram</div>
                      <a href="https://t.me/AIPROBIZZ" target="_blank" rel="noopener noreferrer" className="text-white font-semibold hover:text-blue-300 transition-colors">
                        @AIPROBIZZ
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <a
                      href="https://wa.me/79155835022"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="social-link text-xl"
                      style={{ background: "rgba(37,211,102,0.15)", borderColor: "rgba(37,211,102,0.4)" }}
                    >
                      📱
                    </a>
                    <div>
                      <div className="text-gray-400 text-xs mb-1">WhatsApp</div>
                      <a href="https://wa.me/79155835022" target="_blank" rel="noopener noreferrer" className="text-white font-semibold hover:text-green-300 transition-colors">
                        +7 (915) 583-50-22
                      </a>
                    </div>
                  </div>
                </div>

                {/* Голосовая заявка */}
                <div
                  className="mt-6 rounded-xl p-4 flex items-center gap-3"
                  style={{
                    background: "rgba(245,158,11,0.1)",
                    border: "1px solid rgba(245,158,11,0.3)",
                  }}
                >
                  <span className="text-2xl">💎</span>
                  <div>
                    <p className="text-white font-bold text-sm">Голосовая заявка на SMM.</p>
                    <p className="text-gray-400 text-xs">Оставьте аудио-заявку, пока вы в пути</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Форма */}
            <div className="reveal delay-200">
              <h3 className="text-white font-bold text-lg mb-6" style={{ fontFamily: "Montserrat" }}>
                Оставить заявку
              </h3>
              <ContactForm onSubmit={() => setShowPopup(false)} />
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ────────────────────────────────────────────────── */}
      <footer
        className="py-12 px-4"
        style={{ background: "#090912", borderTop: "1px solid rgba(124,58,237,0.15)" }}
      >
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-10">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg gradient-violet flex items-center justify-center">
                  <span className="text-white font-black text-xs" style={{ fontFamily: "Montserrat" }}>МИГ</span>
                </div>
                <div>
                  <div className="text-white font-bold text-sm" style={{ fontFamily: "Montserrat" }}>ООО «МИГ»</div>
                  <div className="text-gray-500 text-xs">SMM+ Агентство</div>
                </div>
              </div>
              <p className="text-gray-500 text-xs leading-relaxed">
                Маркетинговое агентство нового поколения. Выводим бизнес в ТОП без рекламного бюджета.
              </p>
            </div>

            {/* Navigation */}
            <div>
              <h4 className="text-white font-semibold text-sm mb-4" style={{ fontFamily: "Montserrat" }}>Навигация</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#how" className="hover:text-white transition-colors">Как работаем</a></li>
                <li><a href="#cases" className="hover:text-white transition-colors">Кейсы</a></li>
                <li><a href="#prices" className="hover:text-white transition-colors">Тарифы</a></li>
                <li><a href="#services" className="hover:text-white transition-colors">Услуги</a></li>
                <li><a href="#faq" className="hover:text-white transition-colors">FAQ</a></li>
                <li><a href="#contacts" className="hover:text-white transition-colors">Контакты</a></li>
              </ul>
            </div>

            {/* Cases */}
            <div>
              <h4 className="text-white font-semibold text-sm mb-4" style={{ fontFamily: "Montserrat" }}>Кейсы</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#cases" className="hover:text-white transition-colors">Санаторий «Руно»</a></li>
                <li><a href="#cases" className="hover:text-white transition-colors">Криотерапия КМВ</a></li>
                <li><a href="#cases" className="hover:text-white transition-colors">Кейсы: 6-ть позиций в ТОП-10</a></li>
              </ul>
            </div>

            {/* Contacts */}
            <div>
              <h4 className="text-white font-semibold text-sm mb-4" style={{ fontFamily: "Montserrat" }}>Контакты</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="tel:+79155835022" className="text-gray-400 hover:text-white transition-colors">
                    +7 (915) 583-50-22
                  </a>
                </li>
                <li>
                  <a href="mailto:235577@mail.ru" className="text-gray-400 hover:text-white transition-colors">
                    235577@mail.ru
                  </a>
                </li>
                <li>
                  <a href="https://t.me/AIPROBIZZ" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-300 transition-colors">
                    ✈️ @AIPROBIZZ
                  </a>
                </li>
                <li>
                  <a href="https://wa.me/79155835022" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-green-300 transition-colors">
                    📱 WhatsApp
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div
            className="border-t pt-6 flex flex-col md:flex-row items-center justify-between gap-4"
            style={{ borderColor: "rgba(124,58,237,0.15)" }}
          >
            <p className="text-gray-600 text-xs">
              © 2024–2026 ООО «МИГ» — Маркетинговое агентство. Все права защищены.
            </p>
            <div className="flex gap-3">
              {socials.map((s) => (
                <a
                  key={s.url}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link text-base"
                  title={s.label}
                >
                  {s.emoji}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>

      {/* ── STICKY CTA ────────────────────────────────────────────── */}
      <div className="sticky-cta py-2 px-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between gap-4">
          <p className="text-gray-300 text-sm hidden md:block">
            🚀 Готовы вывести ваш бизнес в ТОП-10 Яндекса без рекламного бюджета?
          </p>
          <button
            onClick={() => setShowPopup(true)}
            className="btn-primary py-2 px-6 text-sm ml-auto"
          >
            Оставить заявку
          </button>
        </div>
      </div>

      {/* ── FLOATING BTN ──────────────────────────────────────────── */}
      <div className="floating-btn">
        <a
          href="https://wa.me/79155835022"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary py-3 px-4 rounded-xl animate-pulse-glow text-sm"
          style={{ boxShadow: "0 8px 32px rgba(37,211,102,0.4)", background: "linear-gradient(135deg, #25d366, #128c7e)" }}
        >
          📱 WhatsApp
        </a>
      </div>

      {/* ── POPUP ─────────────────────────────────────────────────── */}
      {showPopup && <PopupForm onClose={() => setShowPopup(false)} />}
    </div>
  );
}

// ─── Contact Form (inline) ───────────────────────────────────────────────────
function ContactForm({ onSubmit }: { onSubmit: () => void }) {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", business: "", goal: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: connect Google Sheets
    setSent(true);
  };

  if (sent) {
    return (
      <div className="card-dark p-8 text-center rounded-2xl">
        <div className="text-5xl mb-4">🚀</div>
        <h3 className="text-xl font-bold text-white mb-2" style={{ fontFamily: "Montserrat" }}>
          Заявка отправлена!
        </h3>
        <p className="text-gray-400 text-sm">Свяжемся с вами в течение 30 минут в рабочее время.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        className="form-input"
        placeholder="Ваше имя *"
        required
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />
      <input
        className="form-input"
        placeholder="Телефон / WhatsApp *"
        required
        value={form.phone}
        onChange={(e) => setForm({ ...form, phone: e.target.value })}
      />
      <input
        className="form-input"
        placeholder="Ваш бизнес (санаторий, клиника, магазин...)"
        value={form.business}
        onChange={(e) => setForm({ ...form, business: e.target.value })}
      />
      <textarea
        className="form-input"
        placeholder="Ваша цель (ТОП Яндекса, больше подписчиков, заявки...)"
        rows={3}
        value={form.goal}
        onChange={(e) => setForm({ ...form, goal: e.target.value })}
      />
      <button type="submit" className="btn-primary w-full justify-center">
        🚀 Отправить заявку
      </button>
      <p className="text-gray-600 text-xs text-center">
        Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности
      </p>
    </form>
  );
}
