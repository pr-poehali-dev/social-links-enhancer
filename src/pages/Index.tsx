import { useState, useEffect } from "react";

/* ── helpers ────────────────────────────────────────────── */
function useReveal() {
  useEffect(() => {
    const run = () => {
      document.querySelectorAll<HTMLElement>(".reveal").forEach((el) => {
        if (el.getBoundingClientRect().top < window.innerHeight - 60)
          el.classList.add("vis");
      });
    };
    run();
    window.addEventListener("scroll", run, { passive: true });
    return () => window.removeEventListener("scroll", run);
  }, []);
}

/* ── FAQ ────────────────────────────────────────────────── */
function Faq({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="faq-i">
      <button
        className="w-full text-left px-5 py-4 flex items-center justify-between gap-4"
        onClick={() => setOpen(!open)}
      >
        <span className="font-semibold text-white text-sm leading-snug">{q}</span>
        <span className="text-purple-400 text-lg flex-shrink-0 font-bold">{open ? "−" : "+"}</span>
      </button>
      {open && (
        <div className="px-5 pb-4 text-gray-300 text-sm leading-relaxed border-t border-white/5 pt-3">
          {a}
        </div>
      )}
    </div>
  );
}

/* ── Popup ──────────────────────────────────────────────── */
function Popup({ onClose }: { onClose: () => void }) {
  const [ok, setOk] = useState(false);
  const [f, setF] = useState({ name: "", phone: "", msg: "" });
  const sub = (e: React.FormEvent) => { e.preventDefault(); setOk(true); };
  return (
    <div className="pop-ov" onClick={onClose}>
      <div className="pop-box" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white text-xl leading-none">✕</button>
        {ok ? (
          <div className="text-center py-8">
            <div className="text-5xl mb-4">🚀</div>
            <h3 className="text-xl font-bold text-white mb-2" style={{ fontFamily: "Montserrat" }}>Заявка отправлена!</h3>
            <p className="text-gray-400 text-sm">Свяжемся в течение 30 минут.</p>
          </div>
        ) : (
          <>
            <h3 className="text-xl font-bold text-white mb-1" style={{ fontFamily: "Montserrat" }}>Оставить заявку на SMM+</h3>
            <p className="text-gray-400 text-sm mb-5">Первый месяц — скидка до 30% для новых клиентов!</p>
            <form onSubmit={sub} className="space-y-3">
              <input className="fi" placeholder="Ваше имя" required value={f.name} onChange={(e) => setF({ ...f, name: e.target.value })} />
              <input className="fi" placeholder="Телефон / WhatsApp" required value={f.phone} onChange={(e) => setF({ ...f, phone: e.target.value })} />
              <textarea className="fi" rows={3} placeholder="О вашем бизнесе (необязательно)" value={f.msg} onChange={(e) => setF({ ...f, msg: e.target.value })} />
              <button type="submit" className="btn-p w-full justify-center">Получить консультацию бесплатно</button>
              <p className="text-gray-600 text-xs text-center">Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности</p>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

/* ── Contact Form ───────────────────────────────────────── */
function ContactForm() {
  const [ok, setOk] = useState(false);
  const [f, setF] = useState({ name: "", phone: "", biz: "", goal: "" });
  const sub = (e: React.FormEvent) => { e.preventDefault(); setOk(true); };
  if (ok) return (
    <div className="card-d p-8 text-center rounded-2xl">
      <div className="text-5xl mb-3">🚀</div>
      <h3 className="text-lg font-bold text-white mb-1" style={{ fontFamily: "Montserrat" }}>Заявка отправлена!</h3>
      <p className="text-gray-400 text-sm">Свяжемся с вами в течение 30 минут.</p>
    </div>
  );
  return (
    <form onSubmit={sub} className="space-y-3">
      <input className="fi" placeholder="Ваше имя *" required value={f.name} onChange={(e) => setF({ ...f, name: e.target.value })} />
      <input className="fi" placeholder="Телефон / WhatsApp *" required value={f.phone} onChange={(e) => setF({ ...f, phone: e.target.value })} />
      <input className="fi" placeholder="Ваш бизнес (санаторий, клиника, магазин...)" value={f.biz} onChange={(e) => setF({ ...f, biz: e.target.value })} />
      <textarea className="fi" rows={3} placeholder="Ваша цель (ТОП Яндекса, больше заявок...)" value={f.goal} onChange={(e) => setF({ ...f, goal: e.target.value })} />
      <button type="submit" className="btn-p w-full justify-center">🚀 Отправить заявку</button>
      <p className="text-gray-600 text-xs text-center">Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности</p>
    </form>
  );
}

/* ══════════════════════════════════════════════════════════
   MAIN PAGE
══════════════════════════════════════════════════════════ */
export default function Index() {
  useReveal();
  const [popup, setPopup] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  const socials = [
    { name: "ВКонтакте",     url: "https://vk.com/sanruno",               emoji: "🔵" },
    { name: "Одноклассники", url: "https://ok.ru/sanruno",                emoji: "🟠" },
    { name: "Телеграм",      url: "https://t.me/sanruno",                 emoji: "✈️" },
    { name: "Дзен",          url: "https://dzen.ru/runokmv",              emoji: "⚡" },
    { name: "Rutube",        url: "https://rutube.ru/channel/68163885/",  emoji: "📺" },
    { name: "VK Видео",      url: "https://vkvideo.ru/@sanruno",          emoji: "🎬" },
  ];

  const services = [
    { icon: "📱", title: "SMM+ Продвижение",   desc: "Комплексное ведение соцсетей: ВКонтакте, Одноклассники, Telegram. Рост аудитории и позиций в Яндексе." },
    { icon: "🤝", title: "Воронки продаж",     desc: "Путь клиента от первого касания до покупки. Автоматические цепочки сообщений и прогрева." },
    { icon: "🎯", title: "Контент-маркетинг",  desc: "Экспертный контент, ранжируемый в Яндексе. Тексты, визуал, видеоролики для Rutube." },
    { icon: "🔍", title: "SEO-оптимизация",    desc: "Оптимизация профилей соцсетей под алгоритмы Яндекса. Вывод в ТОП поисковой выдачи." },
    { icon: "📊", title: "Аналитика и отчёты", desc: "Еженедельный мониторинг позиций в Яндексе. Подробные отчёты с цифрами и динамикой." },
    { icon: "🤖", title: "Автоматизация SMM",  desc: "ИИ-инструменты, чат-боты, голосовые заявки — работаем пока вы в пути." },
  ];

  const steps = [
    { n: "01", title: "Разработка стратегии",   desc: "Анализ ниши, конкурентов, ЦА. Контент-план на 3 месяца вперёд." },
    { n: "02", title: "Создание контента",       desc: "Тексты, фото, видео, графика. Контент, который любят алгоритмы и люди." },
    { n: "03", title: "Публикация и мониторинг", desc: "Регулярные публикации по расписанию. Еженедельный мониторинг позиций." },
    { n: "04", title: "Оптимизация и масштаб",   desc: "Анализируем, масштабируем. Растём вместе с вашим бизнесом." },
  ];

  const faqItems = [
    { q: "Почему вы работаете с SMM-агентством и продвижением в поиске?", a: "Мы специализируемся на органическом продвижении через соцсети. Алгоритмы Яндекса активно индексируют ВКонтакте, ОК, Telegram, Rutube — это позволяет вашему бизнесу занять несколько позиций в выдаче без рекламных затрат." },
    { q: "Сколько времени нужно для выхода в ТОП-10 Яндекса?", a: "По нашему опыту — от 2 до 6 месяцев в зависимости от ниши и конкурентности. Санаторий Руно занял 6 позиций в ТОП-10 за 6 месяцев работы." },
    { q: "Основа вашей работы — качественный контент или технические настройки?", a: "И то, и другое. Мы оптимизируем профили соцсетей под алгоритмы Яндекса и создаём ценный контент. Баланс SEO-оптимизации и живого контента — наш ключевой подход." },
    { q: "«Нам казалось, что реклама в Яндекс.Бизнес достаточна — зачем ещё соцсети?»", a: "Кейс санатория Руно наглядно показывает: бизнес-аккаунты ВКонтакте и ОК заняли позиции ВЫШЕ платных объявлений Яндекс.Карт. Органический трафик обходит платную рекламу." },
    { q: "Что произошло с позициями Телеграм после замедления?", a: "После официального замедления Telegram Яндекс резко изменил алгоритмы. Мы оперативно перераспределили усилия на ВКонтакте, ОК и Rutube, сохранив и укрепив позиции клиента." },
  ];

  const navLinks = [
    { href: "#how",      label: "Как работаем" },
    { href: "#cases",    label: "Кейсы" },
    { href: "#prices",   label: "Тарифы" },
    { href: "#services", label: "Услуги" },
    { href: "#faq",      label: "FAQ" },
    { href: "#contacts", label: "Контакты" },
  ];

  return (
    <div style={{ background: "var(--bg)", minHeight: "100vh" }}>

      {/* ══ TOP INFO BAR ══════════════════════════════════════════ */}
      <div className="topbar">
        ✦ Специализация: Продвижение в соцсетях + Поисковая оптимизация для бизнеса ✦ Рейтинг ВТ: 6 ✦ 19 лет опыта ✦
      </div>

      {/* ══ HEADER ════════════════════════════════════════════════ */}
      <header
        className={`hdr ${scrolled ? "shadow-lg shadow-black/50" : ""}`}
        style={{ top: "29px" }}
      >
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">

          <div className="flex items-center gap-3 flex-shrink-0">
            <div className="w-9 h-9 rounded-lg grad-vio flex items-center justify-center">
              <span className="text-white font-black text-xs" style={{ fontFamily: "Montserrat" }}>МИГ</span>
            </div>
            <div>
              <div className="text-white font-bold text-sm leading-none" style={{ fontFamily: "Montserrat" }}>ООО «МИГ»</div>
              <div className="text-gray-400 text-xs">SMM+ Агентство</div>
            </div>
          </div>

          <nav className="hidden lg:flex items-center gap-5 text-sm text-gray-300">
            {navLinks.map((n) => (
              <a key={n.href} href={n.href} className="hover:text-white transition-colors duration-200">
                {n.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3 flex-shrink-0">
            <a href="tel:+79155835022" className="hidden md:block text-white font-semibold text-sm hover:text-purple-300 transition-colors">
              +7 (915) 583-50-22
            </a>
            <button onClick={() => setPopup(true)} className="btn-p text-sm py-2 px-4">
              Оставить заявку
            </button>
          </div>
        </div>
      </header>

      {/* ══ HERO ══════════════════════════════════════════════════ */}
      <section
        className="grid-bg relative overflow-hidden"
        style={{ paddingTop: "120px", paddingBottom: "60px", background: "var(--bg)" }}
      >
        <div className="absolute top-16 right-8 w-80 h-80 rounded-full opacity-[.09] blur-3xl pointer-events-none"
          style={{ background: "radial-gradient(circle,#7c3aed,transparent)" }} />
        <div className="absolute bottom-4 left-4 w-56 h-56 rounded-full opacity-[.08] blur-3xl pointer-events-none"
          style={{ background: "radial-gradient(circle,#3b82f6,transparent)" }} />

        <div className="max-w-6xl mx-auto px-4 relative z-10">

          <div className="grid lg:grid-cols-2 gap-10 items-start mb-10">

            <div>
              <div className="badge anim-fade-up mb-4">SMM+ Агентство нового поколения</div>

              <h1
                className="anim-fade-up d1 text-3xl md:text-5xl font-black leading-tight mb-4"
                style={{ fontFamily: "Montserrat" }}
              >
                Маркетинговое агентство{" "}
                <span className="grad-text">SMM+</span>{" "}
                для бизнеса{" "}
                <span className="grad-text">любого масштаба</span>
              </h1>

              <p className="anim-fade-up d2 text-gray-300 text-base mb-2">
                Специализируемся на продвижении в соцсетях и поиске
              </p>
              <p className="anim-fade-up d3 text-white text-lg font-bold mb-6" style={{ fontFamily: "Montserrat" }}>
                Выводим клиентов в ТОП-10 Яндекса{" "}
                <span className="grad-gold">БЕЗ РЕКЛАМНОГО БЮДЖЕТА</span>
              </p>

              <div className="anim-fade-up d4 flex flex-wrap gap-3">
                <button onClick={() => setPopup(true)} className="btn-p anim-pulse">
                  🚀 Получить консультацию
                </button>
                <a href="#cases" className="btn-o">Смотреть кейсы</a>
              </div>
            </div>

            <div className="anim-fade-up d3 grid grid-cols-2 gap-4">
              {[
                { num: "19",  sub: "лет опыта" },
                { num: "6",   sub: "ВТ Рейтинг" },
                { num: "195+", sub: "кейсов" },
                { num: "0 ₽", sub: "рекламный бюджет в кейсе" },
              ].map((s, i) => (
                <div key={i} className="card-d p-5 text-center">
                  <div className="text-3xl font-black mb-1 grad-text" style={{ fontFamily: "Montserrat" }}>{s.num}</div>
                  <div className="text-gray-400 text-xs">{s.sub}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Platform pills */}
          <div className="anim-fade-up d5 flex flex-wrap items-center justify-center gap-2 mb-8">
            <span className="text-gray-400 text-sm mr-1">Выводим в ТОП:</span>
            {socials.map((s) => (
              <a
                key={s.url}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm text-white font-medium hover:scale-105 transition-transform no-underline"
                style={{ background: "rgba(124,58,237,.15)", border: "1px solid rgba(124,58,237,.25)", textDecoration: "none" }}
              >
                <span>{s.emoji}</span>{s.name}
              </a>
            ))}
          </div>

          {/* Headline banner */}
          <div
            className="anim-fade-up d6 rounded-2xl p-6 text-center"
            style={{ background: "rgba(124,58,237,.1)", border: "1px solid rgba(124,58,237,.3)" }}
          >
            <p className="text-sm text-purple-300 mb-2 font-semibold" style={{ fontFamily: "Montserrat" }}>
              НАШЕ ПОРТФОЛИО —{" "}
              <span style={{ color: "#a855f7" }}>Санаторий «Руно»</span>{" "}
              и{" "}
              <span style={{ color: "#a855f7" }}>Криотерапия КМВ</span>
            </p>
            <p className="text-white text-lg md:text-xl font-black" style={{ fontFamily: "Montserrat" }}>
              ТОП-10 Яндекса за 6 мес —{" "}
              <span className="grad-gold">6-ТЬ ПОЗИЦИЙ БЕЗ РЕКЛАМНОГО БЮДЖЕТА</span>
            </p>
            <div className="flex flex-wrap justify-center gap-2 mt-4">
              {socials.map((s) => (
                <a
                  key={s.url}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm text-white font-medium hover:scale-105 transition-transform"
                  style={{ background: "rgba(255,255,255,.07)", border: "1px solid rgba(255,255,255,.12)", textDecoration: "none" }}
                >
                  <span>{s.emoji}</span>{s.name}
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ CASES ═════════════════════════════════════════════════ */}
      <section id="cases" style={{ padding: "72px 0", background: "var(--bg2)" }}>
        <div className="max-w-6xl mx-auto px-4">

          <div className="text-center mb-10 reveal">
            <div className="badge mb-3">Портфолио</div>
            <div className="sec-div" />
            <h2 className="text-2xl md:text-3xl font-black text-white leading-snug" style={{ fontFamily: "Montserrat" }}>
              Кейс: санаторий «Руно» — 2026<br />
              <span className="text-xl font-bold text-gray-300">в режиме реального времени</span>
            </h2>
          </div>

          {/* Two-col case */}
          <div className="card-d p-7 mb-6 reveal">
            <div className="grid lg:grid-cols-2 gap-8">
              <div>
                <p className="text-purple-300 font-bold text-sm mb-4" style={{ fontFamily: "Montserrat" }}>
                  ТОП-10 позиций санатория в Яндексе за 2 месяца:<br />
                  <span className="text-white">ЗАНЯТО 6-ТЬ ПОЗИЦИЙ — даже без рекламного бюджета</span>
                </p>
                <ul className="space-y-2 mb-5">
                  {["Официальный сайт санатория", "ВКонтакте", "Одноклассники", "Telegram", "Rutube", "Дзен"].map((item, i) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-gray-200">
                      <span
                        className="w-5 h-5 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0"
                        style={{ background: "linear-gradient(135deg,#7c3aed,#3b82f6)", fontSize: "10px" }}
                      >{i + 1}</span>
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="rounded-xl p-4" style={{ background: "rgba(124,58,237,.1)", border: "1px solid rgba(124,58,237,.25)" }}>
                  <p className="text-gray-300 text-xs leading-relaxed">
                    <strong className="text-white">Один запрос</strong> приводит более{" "}
                    <strong className="text-white">11 000 пользователей</strong> в месяц
                  </p>
                </div>
              </div>

              <div>
                <p className="text-purple-300 font-bold text-sm mb-4" style={{ fontFamily: "Montserrat" }}>Какой получили результат</p>
                <div className="space-y-3 mb-4">
                  {[
                    { icon: "⭐", text: "Из 10 позиций первой страницы Яндекса — 6 занимают ресурсы санатория" },
                    { icon: "📍", text: "Бизнес-аккаунты ВК и ОК — позиции ВЫШЕ Яндекс Карты (на которые настроена платная реклама!)" },
                    { icon: "🏆", text: "Соцсети санатория выше мощного агрегатора 2ГИС!" },
                  ].map((item, i) => (
                    <div key={i} className="flex gap-3 items-start">
                      <span className="text-lg flex-shrink-0">{item.icon}</span>
                      <p className="text-gray-200 text-sm leading-relaxed">{item.text}</p>
                    </div>
                  ))}
                </div>
                <div
                  className="rounded-xl p-4"
                  style={{ background: "rgba(245,158,11,.09)", border: "1px solid rgba(245,158,11,.35)" }}
                >
                  <p className="text-xs font-bold leading-relaxed" style={{ color: "#f59e0b", fontFamily: "Montserrat" }}>
                    ВСЕ СОЦСЕТИ ВЫШЕ АГРЕГАТОРА 2ГИС, А АККАУНТЫ РУНО ВК И ОК — ВЫШЕ ЯНДЕКС КАРТ, НА КОТОРЫЕ У РУНО НАСТРОЕНА ПЛАТНАЯ РЕКЛАМА В ЯНДЕКС БИЗНЕС!
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Screenshots */}
          <div className="card-d p-7 mb-6 reveal">
            <div className="text-center mb-6">
              <div className="badge mb-3">Кейсы</div>
              <h3 className="text-xl font-black text-white mb-1" style={{ fontFamily: "Montserrat" }}>
                Кейсы: 6-ть позиций в ТОП-10
              </h3>
              <p className="text-gray-400 text-sm">Скриншоты поисковой выдачи Яндекса</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-5">
              <div>
                <p className="text-gray-300 text-xs font-semibold mb-2 text-center">📍 Санаторий Руно Пятигорск официальный — январь 2026</p>
                <div className="ss-card">
                  <img src="https://cdn.poehali.dev/files/b7d43657-0643-4b77-8fd1-118b9f0d1a5d.png" alt="Позиции соцсетей Руно" style={{ filter: "brightness(1.06) contrast(1.08) saturate(1.1)" }} />
                  <div className="absolute bottom-0 left-0 right-0 p-2 text-center text-xs text-white font-semibold" style={{ background: "linear-gradient(transparent,rgba(13,13,26,.95))" }}>
                    Санаторий Руно • январь 2026
                  </div>
                </div>
              </div>
              <div>
                <p className="text-gray-300 text-xs font-semibold mb-2 text-center">📍 Криотерапия КМВ — январь 2026</p>
                <div className="ss-card">
                  <img src="https://cdn.poehali.dev/files/8887345c-c476-4d8e-8f9f-33b8d9d1fe08.jpg" alt="Криотерапия КМВ позиции" style={{ filter: "brightness(1.06) contrast(1.08) saturate(1.1)" }} />
                  <div className="absolute bottom-0 left-0 right-0 p-2 text-center text-xs text-white font-semibold" style={{ background: "linear-gradient(transparent,rgba(13,13,26,.95))" }}>
                    Криотерапия КМВ • январь 2026
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-xl p-4 text-center" style={{ background: "rgba(59,130,246,.08)", border: "1px solid rgba(59,130,246,.2)" }}>
              <p className="text-blue-300 text-xs">🔍 Агентство постоянно мониторит позиции в Яндекс поиске и оперативно реагирует на изменения алгоритмов</p>
            </div>
          </div>

          {/* After TG sanctions */}
          <div className="card-d p-7 reveal">
            <div className="text-center mb-6">
              <h3 className="text-xl font-black text-white mb-1" style={{ fontFamily: "Montserrat" }}>
                Позиции соцсетей Руно после санкций Телеграм
              </h3>
              <p className="text-gray-400 text-sm">Конец февраля 2026 — мониторинг продолжается</p>
            </div>
            <div className="max-w-xl mx-auto mb-5">
              <div className="ss-card">
                <img src="https://cdn.poehali.dev/files/4133d2a9-f191-4f00-a5b4-d9a2a49364a5.png" alt="Позиции Руно после замедления Telegram" style={{ filter: "brightness(1.06) contrast(1.08) saturate(1.1)" }} />
                <div className="absolute bottom-0 left-0 right-0 p-2 text-center text-xs text-white font-semibold" style={{ background: "linear-gradient(transparent,rgba(13,13,26,.95))" }}>
                  Февраль 2026 — после замедления Telegram
                </div>
              </div>
            </div>
            <div className="rounded-xl p-4 mb-6" style={{ background: "rgba(239,68,68,.07)", border: "1px solid rgba(239,68,68,.23)" }}>
              <p className="text-red-300 text-sm leading-relaxed">
                ⚠️ <strong>Важно:</strong> После официального замедления Telegram в России Яндекс резко поменял алгоритмы — Telegram-каналы практически исчезли из выдачи. Мы оперативно перераспределили усилия на ВКонтакте, ОК и Rutube, сохранив позиции.
              </p>
            </div>
            <div className="text-center">
              <p className="text-5xl md:text-7xl font-black grad-gold" style={{ fontFamily: "Montserrat", lineHeight: 1.1 }}>БЕЗ<br />РЕКЛАМНОГО<br />БЮДЖЕТА</p>
            </div>
          </div>

        </div>
      </section>

      {/* ══ HOW WE WORK ═══════════════════════════════════════════ */}
      <section id="how" style={{ padding: "72px 0", background: "var(--bg)" }}>
        <div className="max-w-6xl mx-auto px-4">

          <div className="text-center mb-10 reveal">
            <div className="badge mb-3">Процесс</div>
            <div className="sec-div" />
            <h2 className="text-2xl md:text-3xl font-black text-white" style={{ fontFamily: "Montserrat" }}>Как мы работаем</h2>
          </div>

          {/* Kwork image */}
          <div className="reveal mb-10">
            <img
              src="https://cdn.poehali.dev/projects/845baa51-5026-4a78-a93e-39993cb8e9e6/bucket/9cbdf7cc-58d1-442b-bdb1-35c0e0d3f6df.jpg"
              alt="Как мы работаем"
              className="w-full rounded-2xl"
              style={{ border: "1px solid rgba(124,58,237,.25)", boxShadow: "0 16px 56px rgba(124,58,237,.15)" }}
            />
          </div>

          <div className="grid md:grid-cols-4 gap-5">
            {steps.map((s, i) => (
              <div key={i} className="card-d p-6 text-center reveal">
                <div className="snum mx-auto mb-4">{s.n}</div>
                <h3 className="text-white font-bold mb-2 text-sm" style={{ fontFamily: "Montserrat" }}>{s.title}</h3>
                <p className="text-gray-400 text-xs leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-8 reveal">
            <button onClick={() => setPopup(true)} className="btn-p">Оставить заявку</button>
          </div>
        </div>
      </section>

      {/* ══ FUNNEL ════════════════════════════════════════════════ */}
      <section style={{ padding: "72px 0", background: "var(--bg2)" }}>
        <div className="max-w-5xl mx-auto px-4">

          <div className="text-center mb-10 reveal">
            <div className="badge mb-3">Система</div>
            <div className="sec-div" />
            <h2 className="text-2xl md:text-3xl font-black text-white" style={{ fontFamily: "Montserrat" }}>Воронка продаж через соцсети</h2>
            <p className="text-gray-400 mt-3 text-sm max-w-lg mx-auto">Каждый шаг выстроен так, чтобы незнакомец превратился в постоянного клиента</p>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {[
              { s: "1", e: "🔍", title: "Охват в поиске",    desc: "Клиент ищет «санаторий Пятигорск» — видит ваши аккаунты на 5–8 позициях ТОП-10 Яндекса." },
              { s: "2", e: "👁", title: "Первый контакт",    desc: "Переходит в соцсеть — видит экспертный контент, отзывы, фото, актуальные цены." },
              { s: "3", e: "💬", title: "Вовлечение",        desc: "Подписывается, задаёт вопросы. Чат-бот отвечает в течение 5 минут." },
              { s: "4", e: "📞", title: "Заявка",            desc: "Форма бронирования или звонок. Клиент уже «тёплый» — не нужно тратить бюджет." },
              { s: "5", e: "🏨", title: "Покупка",           desc: "Бронирование, оплата, заезд. Клиент доволен — оставляет отзыв, укрепляющий позиции." },
              { s: "6", e: "🔄", title: "Повторные продажи", desc: "Контент-маркетинг удерживает аудиторию. Повторные визиты без рекламы." },
            ].map((item) => (
              <div key={item.s} className="f-step reveal">
                <div className="snum">{item.s}</div>
                <div>
                  <div className="text-white font-bold mb-1 text-sm" style={{ fontFamily: "Montserrat" }}>{item.e} {item.title}</div>
                  <p className="text-gray-400 text-xs leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-8 reveal">
            <button onClick={() => setPopup(true)} className="btn-p">Оставить заявку</button>
          </div>
        </div>
      </section>

      {/* ══ PRICES ════════════════════════════════════════════════ */}
      <section id="prices" style={{ padding: "72px 0", background: "var(--bg)" }}>
        <div className="max-w-6xl mx-auto px-4">

          <div className="text-center mb-10 reveal">
            <div className="badge mb-3">Стоимость</div>
            <div className="sec-div" />
            <h2 className="text-2xl md:text-3xl font-black text-white" style={{ fontFamily: "Montserrat" }}>Цены и тарифы</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6 items-center mb-10">
            <div className="pr-card reveal">
              <div className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-2">Старт</div>
              <div className="text-3xl font-black text-white mb-1" style={{ fontFamily: "Montserrat" }}>35 000 <span className="text-base font-normal text-gray-400">₽/мес</span></div>
              <p className="text-gray-500 text-xs mb-4">Для малого бизнеса</p>
              <ul className="space-y-2 mb-5 text-sm">
                {["1 соцсеть (ВКонтакте)", "12 публикаций/мес", "Базовая SEO-оптимизация", "Ежемесячный отчёт", "Email поддержка"].map((f) => (
                  <li key={f} className="flex items-center gap-2 text-gray-300"><span className="text-purple-400">✓</span>{f}</li>
                ))}
              </ul>
              <button onClick={() => setPopup(true)} className="btn-o w-full justify-center text-sm">Выбрать тариф</button>
            </div>

            <div className="pr-card hot reveal">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 text-xs font-bold px-4 py-1 rounded-full text-white" style={{ background: "linear-gradient(90deg,var(--vio),var(--blue))" }}>ПОПУЛЯРНЫЙ</div>
              <div className="text-purple-300 text-xs font-bold uppercase tracking-wider mb-2">Профи</div>
              <div className="text-4xl font-black text-white mb-1" style={{ fontFamily: "Montserrat" }}>65 000 <span className="text-base font-normal text-gray-400">₽/мес</span></div>
              <p className="text-gray-500 text-xs mb-4">Для среднего бизнеса</p>
              <ul className="space-y-2 mb-5 text-sm">
                {["3 соцсети (ВК + ОК + Telegram)", "30 публикаций/мес", "Полная SEO-оптимизация", "Еженедельный мониторинг", "Воронка продаж", "Чат-бот", "Приоритетная поддержка"].map((f) => (
                  <li key={f} className="flex items-center gap-2 text-gray-200"><span className="text-purple-400">✓</span>{f}</li>
                ))}
              </ul>
              <button onClick={() => setPopup(true)} className="btn-p w-full justify-center text-sm">Выбрать тариф</button>
            </div>

            <div className="pr-card reveal">
              <div className="text-blue-400 text-xs font-bold uppercase tracking-wider mb-2">Лидер</div>
              <div className="text-3xl font-black text-white mb-1" style={{ fontFamily: "Montserrat" }}>95 000 <span className="text-base font-normal text-gray-400">₽/мес</span></div>
              <p className="text-gray-500 text-xs mb-4">Для крупного бизнеса</p>
              <ul className="space-y-2 mb-5 text-sm">
                {["Все 6 платформ", "60+ публикаций/мес", "Видеоконтент для Rutube", "Ежедневный мониторинг", "Воронка + автоматизация", "ИИ-инструменты", "Голосовые заявки", "Персональный менеджер"].map((f) => (
                  <li key={f} className="flex items-center gap-2 text-gray-300"><span className="text-purple-400">✓</span>{f}</li>
                ))}
              </ul>
              <button onClick={() => setPopup(true)} className="btn-o w-full justify-center text-sm">Выбрать тариф</button>
            </div>
          </div>

          <div className="rounded-2xl p-8 text-center reveal" style={{ background: "linear-gradient(135deg,rgba(124,58,237,.18) 0%,rgba(59,130,246,.13) 100%)", border: "1px solid rgba(124,58,237,.35)" }}>
            <h3 className="text-xl font-black text-white mb-2" style={{ fontFamily: "Montserrat" }}>Только для новых клиентов</h3>
            <p className="text-gray-300 text-sm mb-1">Оставьте заявку прямо сейчас и получите</p>
            <p className="text-white font-bold text-lg mb-5">
              скидку <span className="grad-gold text-3xl font-black">30%</span> на первый месяц продвижения!
            </p>
            <button onClick={() => setPopup(true)} className="btn-p anim-pulse">🎁 Получить скидку сейчас</button>
          </div>
        </div>
      </section>

      {/* ══ SERVICES ══════════════════════════════════════════════ */}
      <section id="services" style={{ padding: "72px 0", background: "var(--bg2)" }}>
        <div className="max-w-6xl mx-auto px-4">

          <div className="text-center mb-10 reveal">
            <div className="badge mb-3">Направления</div>
            <div className="sec-div" />
            <h2 className="text-2xl md:text-3xl font-black text-white" style={{ fontFamily: "Montserrat" }}>Услуги для роста бизнеса</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {services.map((s, i) => (
              <div key={i} className="svc-card card-d p-6 reveal">
                <div className="svc-icon">{s.icon}</div>
                <h3 className="text-white font-bold mb-2 text-sm" style={{ fontFamily: "Montserrat" }}>{s.title}</h3>
                <p className="text-gray-400 text-xs leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ FAQ ═══════════════════════════════════════════════════ */}
      <section id="faq" style={{ padding: "72px 0", background: "var(--bg)" }}>
        <div className="max-w-3xl mx-auto px-4">

          <div className="text-center mb-10 reveal">
            <div className="badge mb-3">FAQ</div>
            <div className="sec-div" />
            <h2 className="text-2xl md:text-3xl font-black text-white" style={{ fontFamily: "Montserrat" }}>Частые вопросы</h2>
          </div>

          <div className="reveal">
            {faqItems.map((item, i) => <Faq key={i} q={item.q} a={item.a} />)}
          </div>
        </div>
      </section>

      {/* ══ CONTACTS ══════════════════════════════════════════════ */}
      <section id="contacts" style={{ padding: "72px 0", background: "var(--bg2)" }}>
        <div className="max-w-6xl mx-auto px-4">

          <div className="text-center mb-10 reveal">
            <div className="badge mb-3">Связаться</div>
            <div className="sec-div" />
            <h2 className="text-2xl md:text-3xl font-black text-white" style={{ fontFamily: "Montserrat" }}>Контакты</h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-10">

            <div className="reveal">
              <div className="rounded-2xl p-7" style={{ background: "linear-gradient(135deg,rgba(124,58,237,.12),rgba(59,130,246,.08))", border: "1px solid rgba(124,58,237,.25)" }}>
                <div className="text-white font-bold text-base mb-5" style={{ fontFamily: "Montserrat" }}>ООО «МИГ» —</div>

                <div className="space-y-4 mb-5">
                  <div className="flex items-center gap-4">
                    <div className="soc-l text-lg">📞</div>
                    <div>
                      <div className="text-gray-400 text-xs mb-0.5">Телефон</div>
                      <a href="tel:+79155835022" className="text-white font-semibold text-sm hover:text-purple-300 transition-colors">+7 (915) 583-50-22</a>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="soc-l text-lg">✉️</div>
                    <div>
                      <div className="text-gray-400 text-xs mb-0.5">E-mail</div>
                      <a href="mailto:235577@mail.ru" className="text-white font-semibold text-sm hover:text-purple-300 transition-colors">235577@mail.ru</a>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <a href="https://t.me/AIPROBIZZ" target="_blank" rel="noopener noreferrer" className="soc-l text-lg" style={{ background: "rgba(42,171,238,.14)", borderColor: "rgba(42,171,238,.35)" }}>✈️</a>
                    <div>
                      <div className="text-gray-400 text-xs mb-0.5">Telegram</div>
                      <a href="https://t.me/AIPROBIZZ" target="_blank" rel="noopener noreferrer" className="text-white font-semibold text-sm hover:text-blue-300 transition-colors">@AIPROBIZZ</a>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <a href="https://wa.me/79155835022" target="_blank" rel="noopener noreferrer" className="soc-l text-lg" style={{ background: "rgba(37,211,102,.14)", borderColor: "rgba(37,211,102,.35)" }}>📱</a>
                    <div>
                      <div className="text-gray-400 text-xs mb-0.5">WhatsApp</div>
                      <a href="https://wa.me/79155835022" target="_blank" rel="noopener noreferrer" className="text-white font-semibold text-sm hover:text-green-300 transition-colors">+7 (915) 583-50-22</a>
                    </div>
                  </div>
                </div>

                <div className="border-t pt-5" style={{ borderColor: "rgba(124,58,237,.2)" }}>
                  <p className="text-gray-400 text-xs mb-3">Соцсети санатория «Руно» — кейс в реальном времени:</p>
                  <div className="grid grid-cols-2 gap-2">
                    {socials.map((s) => (
                      <a
                        key={s.url}
                        href={s.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-3 py-2 rounded-lg text-white font-medium hover:scale-[1.03] transition-transform"
                        style={{ background: "rgba(255,255,255,.06)", border: "1px solid rgba(255,255,255,.1)", textDecoration: "none" }}
                      >
                        <span>{s.emoji}</span>
                        <span className="text-xs">{s.name}</span>
                      </a>
                    ))}
                  </div>
                </div>

                <div className="mt-4 rounded-xl p-4 flex items-center gap-3" style={{ background: "rgba(245,158,11,.09)", border: "1px solid rgba(245,158,11,.28)" }}>
                  <span className="text-2xl">💎</span>
                  <div>
                    <p className="text-white font-bold text-sm" style={{ fontFamily: "Montserrat" }}>Голосовая заявка на SMM.</p>
                    <p className="text-gray-400 text-xs">Оставьте аудио-заявку, пока вы в пути</p>
                  </div>
                </div>

                <div className="mt-4 text-xs text-gray-500 space-y-0.5">
                  <p>Тел./ WhatsApp: <a href="tel:+79155835022" className="text-gray-400 hover:text-white transition-colors">+7 (915) 583-50-22</a></p>
                  <p>Telegram: <a href="https://t.me/AIPROBIZZ" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">@AIPROBIZZ</a></p>
                </div>
              </div>
            </div>

            <div className="reveal">
              <h3 className="text-white font-bold text-base mb-5" style={{ fontFamily: "Montserrat" }}>Оставить заявку</h3>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* ══ FOOTER ════════════════════════════════════════════════ */}
      <footer style={{ padding: "48px 0 82px", background: "#090912", borderTop: "1px solid rgba(124,58,237,.14)" }}>
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">

            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 rounded-lg grad-vio flex items-center justify-center">
                  <span className="text-white font-black text-xs" style={{ fontFamily: "Montserrat" }}>МИГ</span>
                </div>
                <div>
                  <div className="text-white font-bold text-sm" style={{ fontFamily: "Montserrat" }}>ООО «МИГ»</div>
                  <div className="text-gray-600 text-xs">SMM+ Агентство</div>
                </div>
              </div>
              <p className="text-gray-600 text-xs leading-relaxed">Маркетинговое агентство нового поколения. Выводим бизнес в ТОП без рекламного бюджета.</p>
            </div>

            <div>
              <h4 className="text-white font-semibold text-sm mb-3" style={{ fontFamily: "Montserrat" }}>Навигация</h4>
              <ul className="space-y-2 text-gray-500 text-xs">
                {navLinks.map((n) => (
                  <li key={n.href}><a href={n.href} className="hover:text-white transition-colors">{n.label}</a></li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold text-sm mb-3" style={{ fontFamily: "Montserrat" }}>Соцсети кейса</h4>
              <ul className="space-y-2 text-xs">
                {socials.map((s) => (
                  <li key={s.url}>
                    <a href={s.url} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white transition-colors flex items-center gap-1.5">
                      <span>{s.emoji}</span>{s.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold text-sm mb-3" style={{ fontFamily: "Montserrat" }}>Контакты</h4>
              <ul className="space-y-2 text-xs">
                <li><a href="tel:+79155835022" className="text-gray-500 hover:text-white transition-colors">+7 (915) 583-50-22</a></li>
                <li><a href="mailto:235577@mail.ru" className="text-gray-500 hover:text-white transition-colors">235577@mail.ru</a></li>
                <li><a href="https://t.me/AIPROBIZZ" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-blue-300 transition-colors">✈️ @AIPROBIZZ</a></li>
                <li><a href="https://wa.me/79155835022" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-green-300 transition-colors">📱 WhatsApp</a></li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-6" style={{ borderTop: "1px solid rgba(124,58,237,.1)" }}>
            <p className="text-gray-700 text-xs">© 2024–2026 ООО «МИГ». Все права защищены.</p>
            <div className="flex gap-2">
              {socials.map((s) => (
                <a key={s.url} href={s.url} target="_blank" rel="noopener noreferrer" className="soc-l text-sm" title={s.name}>{s.emoji}</a>
              ))}
            </div>
          </div>
        </div>
      </footer>

      {/* ══ STICKY BOTTOM BAR ═════════════════════════════════════ */}
      <div className="bot-bar py-2 px-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between gap-4">
          <p className="text-gray-400 text-xs hidden md:block">
            🚀 Готовы вывести ваш бизнес в ТОП-10 Яндекса без рекламного бюджета?
          </p>
          <button onClick={() => setPopup(true)} className="btn-p py-2 px-5 text-sm ml-auto">
            Оставить заявку
          </button>
        </div>
      </div>

      {/* ══ FLOAT WhatsApp ════════════════════════════════════════ */}
      <a href="https://wa.me/79155835022" target="_blank" rel="noopener noreferrer" className="wa-btn">
        📱 WhatsApp
      </a>

      {/* ══ POPUP ═════════════════════════════════════════════════ */}
      {popup && <Popup onClose={() => setPopup(false)} />}
    </div>
  );
}
