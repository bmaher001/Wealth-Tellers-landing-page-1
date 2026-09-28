import { FormEvent, useEffect, useRef, useState } from "react";

const skyline =
  "https://images.unsplash.com/flagged/photo-1559717201-fbb671ff56b7?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=88&w=2200";
const tower =
  "https://images.unsplash.com/photo-1634007626524-f47fa37810a7?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=86&w=1600";
const boardroom =
  "https://images.unsplash.com/photo-1706074740295-d7a79c079562?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=86&w=1800";
const cityNight =
  "https://images.unsplash.com/photo-1708361089093-beef4c4584e7?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=88&w=2200";
const calculatorUrl =
  "https://nrgmr82u42l.typeform.com/costcalculator1?utm_source=xxxxx&utm_medium=xxxxx&utm_campaign=xxxxx&utm_adgroup=xxxxx#keyword=xxxxx";

const standardFeatures = [
  "Business License",
  "Virtual Office",
  "Digital Banking Assistance",
  "Multiple Shareholders",
  "Multiple Business Activities",
  "Dedicated Relationship Manager",
  "Free Access to Co-Working Space",
];

const goldenFeatures = [
  "Everything in Standard",
  "1 Residency Included",
  "Medical Examination",
  "Corporate Tax Registration",
  "Free Access to Co-Working Space",
  "Dedicated Relationship Manager",
];

const structures = [
  {
    code: "01",
    title: "Mainland",
    detail:
      "Residency support, streamlined authority approvals and multiple business activities in one structure.",
    tags: ["100% ownership", "Residency", "Banking assistance"],
  },
  {
    code: "02",
    title: "Free Zone",
    detail:
      "Fast-track approvals, customs advantages and flexible activities for an agile UAE launch.",
    tags: ["100% ownership", "Fast approvals", "Flexible activities"],
  },
  {
    code: "03",
    title: "Offshore",
    detail:
      "International tax and compliance advisory with tailored banking support and remote setup.",
    tags: ["Remote-friendly", "Banking support", "Tax advisory"],
  },
];

const steps = [
  ["Prepare your documents", "Personalized guidance on requirements and paperwork."],
  [
    "Submission & approvals",
    "We prepare and submit your company formation applications.",
  ],
  [
    "Residency & employee support",
    "Smooth residency arrangements for you and your team.",
  ],
  [
    "Corporate bank account",
    "Guidance through opening an account with trusted UAE banks.",
  ],
];

const experts = [
  {
    name: "Natalia Davydova",
    role: "HNWI Division Director",
    image: "/assets/team/01.jpg",
  },
  {
    name: "Ramy Ahmed",
    role: "MENA Region Head — Private Client Services",
    image: "/assets/team/02.jpg",
  },
  {
    name: "Rana Shetiwy",
    role: "Operations Director",
    image: "/assets/team/03.jpg",
  },
  {
    name: "Thamseer Veettil",
    role: "COO",
    image: "/assets/team/04.jpg",
  },
  {
    name: "Likhith Raj Mijar",
    role: "System Administrator",
    image: "/assets/team/05.jpg",
  },
  {
    name: "Asmaa Fouad",
    role: "HR Manager",
    image: "/assets/team/06.jpg",
  },
  {
    name: "Karen",
    role: "Operation Coordinator",
    image: "/assets/team/07.jpg",
  },
  {
    name: "Grenville Fernandes",
    role: "Business Setup Advisor",
    image: "/assets/team/08.jpg",
  },
  {
    name: "Arbaz Shaikh",
    role: "Business Setup Advisor",
    image: "/assets/team/09.jpg",
  },
  {
    name: "Asif Palliyalil Mohammed",
    role: "Head of Finance",
    image: "/assets/team/10.jpg",
  },
  {
    name: "Muhamed Hamza",
    role: "Business Setup Advisor",
    image: "/assets/team/11.jpg",
  },
  {
    name: "Mohamed Magdi",
    role: "Public Relations Manager",
    image: "/assets/team/12.jpg",
  },
  {
    name: "Shahzeb Sehar",
    role: "Relationship Manager",
    image: "/assets/team/13.jpg",
  },
  {
    name: "Andrii Poiendynok",
    role: "Legal Director",
    image: "/assets/team/14.jpg",
  },
  {
    name: "Khalid Hassan",
    role: "Sales Manager",
    image: "/assets/team/15.jpg",
  },
];

const faqs = [
  [
    "What is the cost of a business license in the UAE?",
    "License packages start from AED 12,900 with 100% ownership and fast approval.",
  ],
  [
    "Why choose a UAE Free Zone?",
    "Dubai free zones offer affordable setup, e-commerce flexibility and easy residency processing.",
  ],
  [
    "What’s included in UAE company formation?",
    "Trade license, name approval, residency quota and workspace.",
  ],
  [
    "How long does it take to get a UAE license?",
    "With Wealth Tellers, you can get your UAE license within 2 hours.",
  ],
  [
    "Can I open a bank account with a UAE Free Zone license?",
    "Yes. We help you open a UAE business bank account with leading banks.",
  ],
  [
    "How can I calculate my setup cost?",
    "Use our free cost calculator to get an instant, transparent estimate.",
  ],
];

function revealDelay(index: number, step = 60) {
  return { "--reveal-delay": `${index * step}ms` } as React.CSSProperties;
}

function Arrow() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <path d="M4 10h11M11 5l5 5-5 5" />
    </svg>
  );
}

function BrandMark({ dark = false }: { dark?: boolean }) {
  return (
    <a className={`brand ${dark ? "brand-dark" : ""}`} href="#top" aria-label="Wealth Tellers home">
      <img src="/assets/wealth-tellers-logo.png" alt="Wealth Tellers" />
    </a>
  );
}

function App() {
  const [scrolled, setScrolled] = useState(false);
  const [activePlan, setActivePlan] = useState<"standard" | "golden">("golden");
  const [selectedExpert, setSelectedExpert] = useState(0);
  const [hoveredExpert, setHoveredExpert] = useState<number | null>(null);
  const displayedExpert = hoveredExpert ?? selectedExpert;
  const [openFaq, setOpenFaq] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [calculatorOpen, setCalculatorOpen] = useState(false);
  const heroRef = useRef<HTMLElement>(null);
  const calculatorButtonRef = useRef<HTMLButtonElement>(null);
  const closeCalculatorRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const revealNodes = document.querySelectorAll(".reveal, .reveal-compose, .reveal-media");
    const depthNodes = Array.from(document.querySelectorAll<HTMLElement>("[data-depth]"));
    let parallaxFrame = 0;
    let observer: IntersectionObserver | undefined;

    if (motionQuery.matches) {
      revealNodes.forEach((node) => node.classList.add("is-visible"));
    } else {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add("is-visible");
            observer?.unobserve(entry.target);
          });
        },
        { threshold: 0.18 },
      );
      revealNodes.forEach((node) => observer?.observe(node));
    }

    const updateDepth = () => {
      const viewport = window.innerHeight;
      depthNodes.forEach((node) => {
        const rect = node.getBoundingClientRect();
        if (rect.bottom < -40 || rect.top > viewport + 40) return;
        const amount = Number(node.dataset.depth || "8");
        const progress = (viewport - rect.top) / (viewport + rect.height);
        const shift = Math.max(-amount, Math.min(amount, (0.5 - progress) * amount));
        node.style.setProperty("--depth-shift", `${shift.toFixed(2)}px`);
      });
    };

    const onScroll = () => {
      setScrolled(window.scrollY > 60);
      const progress = Math.min(window.scrollY / (window.innerHeight * 0.85), 1);
      heroRef.current?.style.setProperty("--hero-progress", String(progress));
      const range = document.body.scrollHeight - window.innerHeight;
      document.documentElement.style.setProperty(
        "--scroll-progress",
        String(range > 0 ? window.scrollY / range : 0),
      );
      if (motionQuery.matches || depthNodes.length === 0) return;
      cancelAnimationFrame(parallaxFrame);
      parallaxFrame = requestAnimationFrame(updateDepth);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      observer?.disconnect();
      cancelAnimationFrame(parallaxFrame);
    };
  }, []);

  const handleGlow = (event: React.PointerEvent<HTMLElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty("--x", `${event.clientX - rect.left}px`);
    event.currentTarget.style.setProperty("--y", `${event.clientY - rect.top}px`);
  };

  useEffect(() => {
    if (!calculatorOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeCalculatorRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setCalculatorOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
      calculatorButtonRef.current?.focus();
    };
  }, [calculatorOpen]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  const features = activePlan === "standard" ? standardFeatures : goldenFeatures;

  return (
    <main id="top">
      <div className="scroll-line" aria-hidden="true" />
      <header className={`nav-shell ${scrolled ? "is-compact" : ""}`}>
        <nav className="nav-glass" aria-label="Main navigation">
          <BrandMark />
          <div className="nav-links">
            <a
              href="#structures"
              onClick={(event) => {
                event.preventDefault();
                document.getElementById("structures")?.scrollIntoView({
                  behavior: "smooth",
                  block: "start",
                });
              }}
            >
              Solutions
            </a>
            <a
              href="#process"
              onClick={(event) => {
                event.preventDefault();
                document.getElementById("process")?.scrollIntoView({
                  behavior: "smooth",
                  block: "start",
                });
              }}
            >
              Process
            </a>
            <a
              href="#packages"
              onClick={(event) => {
                event.preventDefault();
                document.getElementById("packages")?.scrollIntoView({
                  behavior: "smooth",
                  block: "start",
                });
              }}
            >
              Packages
            </a>
          </div>
          <a className="nav-cta magnetic" href="#consultation">
            <span>Talk to an advisor</span>
            <Arrow />
          </a>
        </nav>
      </header>

      <section className="hero" ref={heroRef} onPointerMove={handleGlow}>
        <div className="hero-image" style={{ backgroundImage: `url(${skyline})` }} />
        <div className="hero-grain" />
        <div className="hero-glow" />
        <div className="hero-content">
          <div className="hero-kicker">
            <span>UAE business consultancy</span>
            <span>Dubai · United Arab Emirates</span>
          </div>
          <h1 className="hero-title">
            <span className="title-line">Build in Dubai.</span>
            <span className="title-line title-serif">Own what’s next.</span>
          </h1>
          <div className="hero-bottom">
            <p>
              Expert guidance for a fast, transparent and secure UAE business setup — from
              first decision to final approval.
            </p>
            <div className="hero-actions">
              <a className="button button-gold magnetic" href="#consultation">
                <span>Start your business</span>
                <Arrow />
              </a>
              <a className="text-link" href="#packages">
                Explore packages <Arrow />
              </a>
            </div>
          </div>
        </div>
        <div className="trust-float glass" onPointerMove={handleGlow}>
          <div className="google-mark" aria-hidden="true">
            <svg viewBox="0 0 48 48">
              <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z" />
              <path fill="#FF3D00" d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z" />
              <path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0 1 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z" />
              <path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.003-.002 6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z" />
            </svg>
          </div>
          <div className="trust-copy">
            <div className="stars" aria-label="Five gold stars">★★★★★</div>
            <strong>4.9 Rating</strong>
            <span>Top Rated Service</span>
            <span>Verified by Google</span>
          </div>
          <div className="trust-rule" aria-hidden="true" />
          <div className="trust-verified">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 3.1 19.4 6.1v5.5c0 4.4-3 8.4-7.4 9.6-4.4-1.2-7.4-5.2-7.4-9.6V6.1L12 3.1Z" />
              <path d="m8.4 12.1 2.4 2.4 4.8-5" />
            </svg>
            <span>Google<br />Verified</span>
          </div>
        </div>
        <div className="scroll-cue">
          <span>Scroll to discover</span>
          <i />
        </div>
      </section>

      <section className="signal-scene">
        <div className="signal-track" aria-label="Key benefits">
          {[
            "100% business ownership",
            "Competitive setup packages",
            "Effortless remote process",
            "3,000+ business activities",
          ].map((item, index) => (
            <div className="signal-item reveal" key={item} style={revealDelay(index, 70)}>
              <span>0{index + 1}</span>
              <strong>{item}</strong>
            </div>
          ))}
        </div>
        <div className="editorial-statement reveal-compose">
          <span className="section-label reveal-item">A clearer route to the UAE</span>
          <h2 className="reveal-item">
            Ambition moves fast.
            <br />
            <em>Your setup should too.</em>
          </h2>
          <p className="reveal-item">
            Setting up a UAE Free Zone company or applying for a trade license should feel
            effortless and secure. We make it so.
          </p>
        </div>
      </section>

      <section className="image-expanse">
        <div className="expanse-image reveal-media" style={{ backgroundImage: `url(${tower})` }} />
        <div className="expanse-overlay" />
        <p className="vertical-caption">Dubai · Designed for possibility</p>
        <div className="expanse-copy reveal-compose">
          <span className="reveal-item">From just</span>
          <strong className="reveal-item">
            AED <b>4,888</b>
          </strong>
          <p className="reveal-item">Limited-time business setup offer</p>
          <a className="button button-light reveal-item" href="#consultation">
            Claim the offer <Arrow />
          </a>
        </div>
      </section>

      <section className="structures" id="structures">
        <div className="structures-intro reveal-compose">
          <span className="section-label reveal-item">Choose your structure</span>
          <h2 className="reveal-item">One destination.<br />Three strategic routes.</h2>
          <p className="reveal-item">
            We help you explore the most effective setup options in the UAE and guide you
            through every step.
          </p>
        </div>
        <div className="structure-list">
          {structures.map((item, index) => (
            <article className="structure-row reveal" key={item.title} style={revealDelay(index, 75)}>
              <span className="structure-code">{item.code}</span>
              <h3>{item.title}</h3>
              <div>
                <p>{item.detail}</p>
                <ul>
                  {item.tags.map((tag) => <li key={tag}>{tag}</li>)}
                </ul>
              </div>
              <a href="#consultation" aria-label={`Discuss ${item.title} setup`}>
                <Arrow />
              </a>
            </article>
          ))}
        </div>
      </section>

      <section className="process-scene" id="process">
        <div className="process-photo reveal-media" style={{ backgroundImage: `url(${boardroom})` }}>
          <div className="process-heading reveal-compose">
            <span className="section-label reveal-item">The Wealth Tellers method</span>
            <h2 className="reveal-item">From idea<br />to license.</h2>
          </div>
        </div>
        <div className="process-panel glass-dark" onPointerMove={handleGlow}>
          <div className="process-panel-head">
            <span>Streamlined setup process</span>
            <span>04 steps</span>
          </div>
          {steps.map(([title, description], index) => (
            <article className="process-step reveal" key={title} style={revealDelay(index, 60)}>
              <span>0{index + 1}</span>
              <h3>{title}</h3>
              <p>{description}</p>
            </article>
          ))}
          <a className="button button-gold reveal" href="#consultation" style={revealDelay(4, 60)}>
            Start your UAE journey <Arrow />
          </a>
        </div>
      </section>

      <section className="experts-scene" id="experts" data-depth="6">
        <div className="experts-stage">
          <div className="expert-portrait reveal-media" aria-live="polite">
            {experts.map((expert, index) => (
              <img
                className={displayedExpert === index ? "is-active" : ""}
                src={expert.image}
                alt={expert.name}
                loading={index === 0 ? "eager" : "lazy"}
                key={expert.name}
              />
            ))}
            <div className="portrait-wash" />
            <div className="portrait-index">
              <span>{String(displayedExpert + 1).padStart(2, "0")}</span>
              <i />
              <span>{String(experts.length).padStart(2, "0")}</span>
            </div>
            <div className="expert-identity glass-dark">
              <span>Wealth Tellers</span>
              <h3 key={`name-${displayedExpert}`}>{experts[displayedExpert].name}</h3>
              <p key={`role-${displayedExpert}`}>{experts[displayedExpert].role}</p>
            </div>
          </div>

          <div className="expert-column">
            <div className="experts-heading reveal-compose">
              <span className="section-label reveal-item">The people behind the process</span>
              <h2 className="reveal-item">Meet the<br /><em>experts.</em></h2>
              <p className="reveal-item">
                Realize your business goals in the UAE with a team of seasoned professionals
                behind you. Having decades of combined experience, these innovators and expert
                strategists can transform your ideas into measurable success.
              </p>
            </div>
            <div className="expert-directory reveal" style={revealDelay(2, 70)}>
            <div className="expert-mobile-controls">
              <button
                type="button"
                onClick={() => {
                  setHoveredExpert(null);
                  setSelectedExpert((selectedExpert - 1 + experts.length) % experts.length);
                }}
                aria-label="View previous expert"
              >
                <Arrow />
              </button>
              <span>
                {String(displayedExpert + 1).padStart(2, "0")} /{" "}
                {String(experts.length).padStart(2, "0")}
              </span>
              <button
                type="button"
                onClick={() => {
                  setHoveredExpert(null);
                  setSelectedExpert((selectedExpert + 1) % experts.length);
                }}
                aria-label="View next expert"
              >
                <Arrow />
              </button>
            </div>
            <div className="directory-list" role="list" aria-label="Wealth Tellers experts">
              {experts.map((expert, index) => (
                <button
                  className={selectedExpert === index ? "is-active" : ""}
                  aria-pressed={selectedExpert === index}
                  onClick={() => setSelectedExpert(index)}
                  onPointerEnter={() => setHoveredExpert(index)}
                  onPointerLeave={() =>
                    setHoveredExpert((current) => (current === index ? null : current))
                  }
                  type="button"
                  role="listitem"
                  aria-label={`View ${expert.name}, ${expert.role}`}
                  key={expert.name}
                >
                  <img className="expert-thumb" src={expert.image} alt="" loading="lazy" />
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <strong>{expert.name}</strong>
                  <small>{expert.role}</small>
                </button>
              ))}
            </div>
          </div>
          </div>
        </div>
      </section>

      <section className="calculator-scene">
        <div className="calculator-orbit" data-depth="8" aria-hidden="true">
          <span />
          <span />
        </div>
        <div className="calculator-copy reveal-compose">
          <span className="section-label reveal-item">Know before you launch</span>
          <h2 className="reveal-item">Your UAE setup cost, made clear.</h2>
          <p className="reveal-item">
            Get a fast, precise and completely free estimate including license type,
            residency and core fees.
          </p>
          <ul className="reveal-item">
            <li>2-minute estimate</li>
            <li>Transparent pricing</li>
            <li>Mainland & Free Zone options</li>
          </ul>
          <button
            ref={calculatorButtonRef}
            className="button button-ink reveal-item"
            type="button"
            onClick={() => setCalculatorOpen(true)}
          >
            Try the cost calculator <Arrow />
          </button>
          <small className="reveal-item">Final pricing may vary based on activity, approvals and facility requirements.</small>
        </div>
        <div className="calculator-figure reveal" aria-hidden="true" style={revealDelay(1, 90)}>
          <span>AED</span>
          <strong>4,888</strong>
          <div className="calc-rule"><i /></div>
          <p>Indicative starting offer</p>
        </div>
      </section>

      <section className="pricing-scene" id="packages">
        <div className="pricing-heading reveal-compose">
          <span className="section-label reveal-item">Limited-time packages</span>
          <h2 className="reveal-item">Built for your<br /><em>next chapter.</em></h2>
          <p className="reveal-item">Exclusive license packages designed for every entrepreneur.</p>
        </div>
        <div
          className={`pricing-stage glass-dark is-${activePlan} reveal`}
          onPointerMove={handleGlow}
        >
          <div className="plan-tabs" role="tablist" aria-label="Business setup packages">
            <button
              role="tab"
              aria-selected={activePlan === "standard"}
              onClick={() => setActivePlan("standard")}
            >
              <span>01</span> Standard
            </button>
            <button
              role="tab"
              aria-selected={activePlan === "golden"}
              onClick={() => setActivePlan("golden")}
            >
              <span>02</span> Golden <i>Residency included</i>
            </button>
          </div>
          <div className="plan-display">
            <div className="plan-main">
              <span className="plan-eyebrow">
                {activePlan === "golden" ? "The complete launch" : "The essential launch"}
              </span>
              {activePlan === "golden" && (
                <span className="golden-crown" aria-hidden="true">
                  <svg viewBox="0 0 64 42">
                    <path d="M7 33 3 10l16 11L32 4l13 17 16-11-4 23H7Z" />
                    <path d="M9 38h46" />
                    <circle cx="3" cy="9" r="2" />
                    <circle cx="32" cy="3" r="2" />
                    <circle cx="61" cy="9" r="2" />
                  </svg>
                </span>
              )}
              <h3>{activePlan === "golden" ? "Golden Package" : "Standard Package"}</h3>
              <p>
                A focused path to establishing your UAE business, supported by a dedicated
                relationship manager.
              </p>
              <a
                className={`button ${
                  activePlan === "golden" ? "button-gold" : "button-plan-standard"
                }`}
                href="#consultation"
              >
                Get the offer <Arrow />
              </a>
            </div>
            <ul className="plan-features">
              {features.map((feature, index) => (
                <li key={feature} style={{ "--delay": `${index * 45}ms` } as React.CSSProperties}>
                  <span>✓</span>{feature}
                </li>
              ))}
            </ul>
          </div>
          <p className="pricing-note">Additional services and inclusions are available on consultation.</p>
        </div>
      </section>

      <section className="proof-scene">
        <div className="proof-image reveal-media" style={{ backgroundImage: `url(${cityNight})` }} />
        <div className="proof-shade" />
        <div className="proof-copy reveal-compose">
          <div className="stars reveal-item">★★★★★</div>
          <blockquote className="reveal-item">
            “Expert guidance, transparent pricing, and a partner you can trust.”
          </blockquote>
          <div className="proof-meta reveal-item">
            <strong>4.9</strong>
            <span>Top Rated Service<br />Verified by Google</span>
          </div>
        </div>
      </section>

      <section className="faq-scene">
        <div className="faq-heading reveal-compose">
          <span className="section-label reveal-item">Essential intelligence</span>
          <h2 className="reveal-item">Questions, answered<br />with clarity.</h2>
        </div>
        <div className="faq-list">
          {faqs.map(([question, answer], index) => (
            <article className={`faq-item reveal ${openFaq === index ? "is-open" : ""}`} key={question} style={revealDelay(index, 45)}>
              <button
                onClick={() => setOpenFaq(openFaq === index ? -1 : index)}
                aria-expanded={openFaq === index}
              >
                <span>0{index + 1}</span>
                <strong>{question}</strong>
                <i aria-hidden="true" />
              </button>
              <div><p>{answer}</p></div>
            </article>
          ))}
        </div>
      </section>

      <section className="consultation" id="consultation" onPointerMove={handleGlow}>
        <div className="consultation-bg" data-depth="10" style={{ backgroundImage: `url(${skyline})` }} />
        <div className="consultation-copy reveal-compose">
          <span className="section-label reveal-item">Your next move starts here</span>
          <h2 className="reveal-item">Dubai is ready.<br /><em>Are you?</em></h2>
          <p className="reveal-item">Get expert guidance and a clear route to your UAE business setup.</p>
        </div>
        <form className="consultation-form glass reveal" onSubmit={handleSubmit} style={revealDelay(1, 110)}>
          {submitted ? (
            <div className="success-message" role="status">
              <span>Request received</span>
              <h3>Thank you.</h3>
              <p>A Wealth Tellers advisor will contact you shortly.</p>
              <button type="button" onClick={() => setSubmitted(false)}>Submit another request</button>
            </div>
          ) : (
            <>
              <div className="form-head">
                <span>Private consultation</span>
                <strong>Get a call back</strong>
              </div>
              <label>
                <span>Full name</span>
                <input required name="name" autoComplete="name" placeholder="Your name" />
              </label>
              <label>
                <span>Email address</span>
                <input required name="email" type="email" autoComplete="email" placeholder="you@company.com" />
              </label>
              <label>
                <span>Nature of business</span>
                <input required name="business" placeholder="Tell us what you’re building" />
              </label>
              <button className="button button-gold" type="submit">
                Request a consultation <Arrow />
              </button>
              <small>100% Privacy Guaranteed</small>
            </>
          )}
        </form>
      </section>

      <footer>
        <div className="footer-top reveal">
          <BrandMark />
          <p>UAE business setup,<br />told with clarity.</p>
          <a className="text-link" href="#top">Back to top ↑</a>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Wealth Tellers</span>
          <span>
            Disclaimer: Wealth Tellers is a business consultancy firm. All official
            applications are processed directly through the relevant UAE government authorities.
          </span>
          <a href="https://wealthtellers.com/contact-us/" target="_blank" rel="noreferrer">Contact</a>
        </div>
      </footer>
      {calculatorOpen && (
        <div className="calculator-modal" onClick={() => setCalculatorOpen(false)}>
          <div
            className="calculator-dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="calculator-dialog-title"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="calculator-dialog-bar">
              <p id="calculator-dialog-title">Cost calculator</p>
              <button
                ref={closeCalculatorRef}
                type="button"
                onClick={() => setCalculatorOpen(false)}
              >
                Close
              </button>
            </div>
            <iframe
              title="Wealth Tellers cost calculator"
              src={calculatorUrl}
              allow="camera; microphone; autoplay; encrypted-media; fullscreen"
            />
          </div>
        </div>
      )}
    </main>
  );
}

export default App;
