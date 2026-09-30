import { FormEvent, useEffect, useRef, useState } from "react";

const asset = (path: string) => `${import.meta.env.BASE_URL}${path}`;

type SceneAsset = {
  name: string;
  mobile: number;
  desktop: number;
  width: number;
  height: number;
};

const scenes = {
  skyline: { name: "skyline", mobile: 1800, desktop: 2400, width: 2400, height: 1600 },
  tower: { name: "tower", mobile: 1100, desktop: 2000, width: 2000, height: 2999 },
  boardroom: { name: "boardroom", mobile: 1400, desktop: 2000, width: 2000, height: 1125 },
  cityNight: { name: "city-night", mobile: 1600, desktop: 2400, width: 2400, height: 1706 },
} as const satisfies Record<string, SceneAsset>;

function sceneFile(scene: SceneAsset, width: number, ext: string) {
  return asset(`assets/scenes/${scene.name}-${width}.${ext}`);
}

function ScenePicture({
  scene,
  className,
  eager = false,
  alt = "",
}: {
  scene: SceneAsset;
  className?: string;
  eager?: boolean;
  alt?: string;
}) {
  return (
    <picture className={className}>
      <source media="(max-width: 759px)" type="image/avif" srcSet={sceneFile(scene, scene.mobile, "avif")} />
      <source media="(min-width: 760px)" type="image/avif" srcSet={sceneFile(scene, scene.desktop, "avif")} />
      <source media="(max-width: 759px)" type="image/webp" srcSet={sceneFile(scene, scene.mobile, "webp")} />
      <source media="(min-width: 760px)" type="image/webp" srcSet={sceneFile(scene, scene.desktop, "webp")} />
      <img
        src={sceneFile(scene, eager ? scene.desktop : scene.mobile, "jpg")}
        alt={alt}
        width={scene.width}
        height={scene.height}
        loading={eager ? "eager" : "lazy"}
        fetchPriority={eager ? "high" : "low"}
        decoding={eager ? "auto" : "async"}
      />
    </picture>
  );
}

function DeferredCover({ className, scene }: { className: string; scene: SceneAsset }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    let cancelled = false;

    const apply = () => {
      if (cancelled || !node) return;
      const narrow = window.matchMedia("(max-width: 759px)").matches;
      const width = narrow ? scene.mobile : scene.desktop;
      const avif = sceneFile(scene, width, "avif");
      const webp = sceneFile(scene, width, "webp");
      const jpg = sceneFile(scene, width, "jpg");
      const modern = CSS.supports("background-image", `image-set(url("${avif}") type("image/avif"))`);
      node.style.backgroundImage = modern
        ? `image-set(url("${avif}") type("image/avif"), url("${webp}") type("image/webp"), url("${jpg}") type("image/jpeg"))`
        : `url("${webp}")`;
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        apply();
        observer.disconnect();
      },
      { rootMargin: "240px 0px" },
    );
    observer.observe(node);
    return () => {
      cancelled = true;
      observer.disconnect();
    };
  }, [scene]);

  return <div ref={ref} className={className} />;
}
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

type PlanId = "standard" | "golden";

const plans = {
  standard: {
    id: "standard" as const,
    index: "01",
    name: "Standard Package",
    short: "Standard",
    price: "4,888",
    currency: "AED",
    eyebrow: "The essential launch",
    note: "",
  },
  golden: {
    id: "golden" as const,
    index: "02",
    name: "Golden Package",
    short: "Golden",
    price: "10,800",
    currency: "AED",
    eyebrow: "The complete launch",
    note: "Residency included",
  },
};

const planOrder: PlanId[] = ["standard", "golden"];

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
    image: asset("assets/team/01.webp"),
    width: 795,
    height: 1000,
  },
  {
    name: "Ramy Ahmed",
    role: "MENA Region Head — Private Client Services",
    image: asset("assets/team/02.webp"),
    width: 795,
    height: 1000,
  },
  {
    name: "Rana Shetiwy",
    role: "Operations Director",
    image: asset("assets/team/03.webp"),
    width: 795,
    height: 1000,
  },
  {
    name: "Thamseer Veettil",
    role: "COO",
    image: asset("assets/team/04.webp"),
    width: 795,
    height: 1000,
  },
  {
    name: "Likhith Raj Mijar",
    role: "System Administrator",
    image: asset("assets/team/05.webp"),
    width: 795,
    height: 1000,
  },
  {
    name: "Asmaa Fouad",
    role: "HR Manager",
    image: asset("assets/team/06.webp"),
    width: 795,
    height: 1000,
  },
  {
    name: "Karen",
    role: "Operation Coordinator",
    image: asset("assets/team/07.webp"),
    width: 795,
    height: 1000,
  },
  {
    name: "Grenville Fernandes",
    role: "Business Setup Advisor",
    image: asset("assets/team/08.webp"),
    width: 795,
    height: 1000,
  },
  {
    name: "Arbaz Shaikh",
    role: "Business Setup Advisor",
    image: asset("assets/team/09.webp"),
    width: 795,
    height: 1000,
  },
  {
    name: "Asif Palliyalil Mohammed",
    role: "Head of Finance",
    image: asset("assets/team/10.webp"),
    width: 795,
    height: 1000,
  },
  {
    name: "Muhamed Hamza",
    role: "Business Setup Advisor",
    image: asset("assets/team/11.webp"),
    width: 795,
    height: 1000,
  },
  {
    name: "Mohamed Magdi",
    role: "Public Relations Manager",
    image: asset("assets/team/12.webp"),
    width: 864,
    height: 1128,
  },
  {
    name: "Shahzeb Sehar",
    role: "Relationship Manager",
    image: asset("assets/team/13.webp"),
    width: 795,
    height: 1000,
  },
  {
    name: "Andrii Poiendynok",
    role: "Legal Director",
    image: asset("assets/team/14.webp"),
    width: 1100,
    height: 1649,
  },
  {
    name: "Khalid Hassan",
    role: "Sales Manager",
    image: asset("assets/team/15.webp"),
    width: 795,
    height: 1000,
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

const pageUrl = "https://works.bishoyzaki.com/wealth-tellers/";

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${pageUrl}#organization`,
      name: "Wealth Tellers",
      url: pageUrl,
      logo: `${pageUrl}assets/wealth-tellers-logo.png`,
      description:
        "Wealth Tellers is a business consultancy for UAE company formation in Dubai.",
      areaServed: {
        "@type": "Country",
        name: "United Arab Emirates",
      },
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "customer support",
        url: "https://wealthtellers.com/contact-us/",
      },
    },
    {
      "@type": "WebSite",
      "@id": `${pageUrl}#website`,
      name: "Wealth Tellers",
      url: pageUrl,
      inLanguage: "en",
      publisher: { "@id": `${pageUrl}#organization` },
    },
    {
      "@type": "ProfessionalService",
      "@id": `${pageUrl}#service`,
      name: "UAE business setup consultancy",
      url: pageUrl,
      description:
        "Expert guidance for a fast, transparent and secure UAE business setup in Dubai, from the first decision to final approval.",
      provider: { "@id": `${pageUrl}#organization` },
      areaServed: [
        { "@type": "City", name: "Dubai" },
        { "@type": "Country", name: "United Arab Emirates" },
      ],
      serviceType: [
        "Mainland company formation",
        "Free Zone company formation",
        "Offshore company formation",
      ],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "UAE business setup packages",
        itemListElement: [
          {
            "@type": "Offer",
            name: "Standard Package",
            description: `The essential launch. Includes ${standardFeatures.join(", ")}.`,
            price: "4888",
            priceCurrency: "AED",
            url: `${pageUrl}#packages`,
            availability: "https://schema.org/InStock",
          },
          {
            "@type": "Offer",
            name: "Golden Package",
            description: `The complete launch, with residency included. Includes ${goldenFeatures.join(", ")}.`,
            price: "10800",
            priceCurrency: "AED",
            url: `${pageUrl}#packages`,
            availability: "https://schema.org/InStock",
          },
        ],
      },
    },
    {
      "@type": "FAQPage",
      "@id": `${pageUrl}#faq`,
      url: `${pageUrl}#faq`,
      mainEntity: faqs.map(([question, answer]) => ({
        "@type": "Question",
        name: question,
        acceptedAnswer: {
          "@type": "Answer",
          text: answer,
        },
      })),
    },
  ],
};

function formatCount(value: number, group: boolean) {
  return group ? value.toLocaleString("en-US") : String(value);
}

function SettleFigure({
  from,
  to,
  group = false,
  duration = 1000,
  offer = false,
  padded = false,
}: {
  from: number;
  to: number;
  group?: boolean;
  duration?: number;
  offer?: boolean;
  padded?: boolean;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [value, setValue] = useState(from);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setValue(to);
      return;
    }

    let frame = 0;
    let played = false;

    const play = () => {
      if (played) return;
      played = true;
      const start = performance.now();
      let lastPaint = 0;
      let shown = from;

      const tick = (now: number) => {
        const progress = Math.min(1, (now - start) / duration);
        const eased = 1 - (1 - progress) ** 3;
        const next = progress === 1 ? to : Math.round(from + (to - from) * eased);
        if (progress === 1 || now - lastPaint >= 70) {
          if (next !== shown) {
            shown = next;
            setValue(next);
          }
          lastPaint = now;
        }
        if (progress < 1) frame = requestAnimationFrame(tick);
        else setValue(to);
      };

      frame = requestAnimationFrame(tick);
    };

    const finish = () => {
      if (played) return;
      played = true;
      setValue(to);
    };

    const check = () => {
      const rect = node.getBoundingClientRect();
      if (rect.width === 0 && rect.height === 0) return false;
      if (rect.bottom < 24) {
        finish();
        return true;
      }
      if (rect.top < window.innerHeight * 0.9) {
        play();
        return true;
      }
      return false;
    };

    if (check()) {
      return () => cancelAnimationFrame(frame);
    }

    const onScroll = () => {
      if (check()) window.removeEventListener("scroll", onScroll);
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, [from, to, duration]);

  const className = `settle-figure${offer ? " offer-value" : ""}${padded ? " is-padded" : ""}`;

  return (
    <span ref={ref} className={className}>
      <span className="visually-hidden">{formatCount(to, group)}</span>
      <span aria-hidden="true">{formatCount(value, group)}</span>
    </span>
  );
}

function ExpertPortrait({
  expert,
  index,
}: {
  expert: (typeof experts)[number];
  index: number;
}) {
  const [current, setCurrent] = useState(index);
  const [incoming, setIncoming] = useState<number | null>(null);
  const reduced = useRef(false);

  useEffect(() => {
    reduced.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  useEffect(() => {
    if (reduced.current) {
      setCurrent(index);
      setIncoming(null);
      return;
    }
    if (index === current) {
      setIncoming(null);
      return;
    }
    setIncoming(index);
    const timeout = window.setTimeout(() => {
      setCurrent(index);
      setIncoming(null);
    }, 560);
    return () => window.clearTimeout(timeout);
  }, [index, current]);

  return (
    <div className="expert-portrait">
      <img src={experts[current].image} alt="" width={experts[current].width} height={experts[current].height} loading="lazy" decoding="async" />
      {incoming !== null && incoming !== current && (
        <img
          className="is-incoming"
          src={experts[incoming].image}
          alt=""
          width={experts[incoming].width}
          height={experts[incoming].height}
          loading="lazy"
          decoding="async"
          key={incoming}
          onAnimationEnd={() => {
            setCurrent(incoming);
            setIncoming(null);
          }}
        />
      )}
      <div className="portrait-wash" />
      <div className="portrait-index">
        <span>{String(index + 1).padStart(2, "0")}</span>
        <i />
        <span>{String(experts.length).padStart(2, "0")}</span>
      </div>
      <div className="expert-identity glass-dark">
        <span>Wealth Tellers</span>
        <div className="identity-text" key={expert.name} aria-live="polite">
          <h3>{expert.name}</h3>
          <p>{expert.role}</p>
        </div>
      </div>
    </div>
  );
}

function SignalMark({ name }: { name: "ownership" | "packages" | "remote" | "activities" }) {
  const props = {
    viewBox: "0 0 32 32",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.85,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };

  if (name === "ownership") {
    return (
      <svg {...props}>
        <path d="M5.5 27h21" />
        <path d="M8 27V13.4L16 7l8 6.4V27" />
        <path d="M13.2 27v-6.2h5.6V27" />
        <path d="M11.2 16.4h2.3M18.5 16.4h2.3" />
      </svg>
    );
  }

  if (name === "packages") {
    return (
      <svg {...props}>
        <path d="M6 13.1 16 8.2l10 4.9v10.2L16 28.2 6 23.3V13.1Z" />
        <path d="M6 13.1 16 18.1l10-5" />
        <path d="M16 18.1v10.1" />
      </svg>
    );
  }

  if (name === "remote") {
    return (
      <svg {...props}>
        <circle cx="16" cy="16" r="9.4" />
        <ellipse cx="16" cy="16" rx="4.5" ry="9.4" />
        <path d="M6.6 16h18.8" />
      </svg>
    );
  }

  return (
    <svg {...props}>
      <rect x="5.25" y="5.25" width="8.6" height="8.6" />
      <rect x="18.15" y="5.25" width="8.6" height="8.6" />
      <rect x="5.25" y="18.15" width="8.6" height="8.6" />
      <rect x="18.15" y="18.15" width="8.6" height="8.6" />
    </svg>
  );
}

function Arrow() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <path d="M4 10h11M11 5l5 5-5 5" />
    </svg>
  );
}

function SelectionMark({ selected }: { selected: boolean }) {
  return (
    <span className={`selection-mark ${selected ? "is-selected" : ""}`} aria-hidden="true">
      {selected && (
        <svg viewBox="0 0 16 16">
          <path d="M3.4 8.2 6.3 11.1 12.6 4.8" />
        </svg>
      )}
    </span>
  );
}

function BrandMark({ dark = false }: { dark?: boolean }) {
  return (
    <a className={`brand ${dark ? "brand-dark" : ""}`} href="#top" aria-label="Wealth Tellers home">
      <img src={asset("assets/wealth-tellers-logo.png")} alt="Wealth Tellers" width={150} height={65} />
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
  const [submittedPlan, setSubmittedPlan] = useState<PlanId>("golden");
  const [calculatorOpen, setCalculatorOpen] = useState(false);
  const heroRef = useRef<HTMLElement>(null);
  const processRef = useRef<HTMLElement>(null);
  const processStepRefs = useRef<(HTMLElement | null)[]>([]);
  const calculatorSceneRef = useRef<HTMLElement>(null);
  const calculatorButtonRef = useRef<HTMLButtonElement>(null);
  const closeCalculatorRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const reduced = motionQuery.matches;

    const readProgress = () => {
      const range = document.documentElement.scrollHeight - window.innerHeight;
      return range > 0 ? window.scrollY / range : 0;
    };

    const applyLine = (value: number) => {
      document.documentElement.style.setProperty("--scroll-progress", value.toFixed(4));
    };

    const processTarget = () => {
      const root = processRef.current;
      const list = root?.querySelector<HTMLElement>(".process-steps");
      if (!list) return 0;
      const rect = list.getBoundingClientRect();
      const viewport = window.innerHeight;
      const start = viewport * 0.78;
      const span = Math.max(rect.height * 0.92, viewport * 0.42);
      return Math.min(1, Math.max(0, (start - rect.top) / span));
    };

    const applyProcess = (value: number) => {
      const root = processRef.current;
      const nodes = processStepRefs.current.filter((node): node is HTMLElement => Boolean(node));
      if (!root || nodes.length === 0) return;
      if (reduced) {
        nodes.forEach((node) => node.style.removeProperty("--focus"));
        return;
      }
      const list = root.querySelector<HTMLElement>(".process-steps");
      if (!list) return;
      const max = nodes.length - 1;
      const position = value * max;
      const listTop = list.getBoundingClientRect().top;
      const tops = nodes.map((node) => node.getBoundingClientRect().top - listTop);
      const index = Math.min(max, Math.max(0, Math.floor(position)));
      const fraction = position - index;
      const nextTop = tops[Math.min(index + 1, max)] ?? tops[index] ?? 0;
      const accent = (tops[index] ?? 0) + (nextTop - (tops[index] ?? 0)) * fraction;
      list.style.setProperty("--accent-y", `${accent.toFixed(2)}px`);
      nodes.forEach((node, step) => {
        const focus = Math.max(0, 1 - Math.abs(step - position));
        node.style.setProperty("--focus", focus.toFixed(3));
      });
    };

    const updateHero = () => {
      const compact = window.scrollY > 60;
      setScrolled((current) => (current === compact ? current : compact));

      const hero = heroRef.current;
      if (hero) {
        const progress = Math.min(window.scrollY / (window.innerHeight * 0.85), 1);
        hero.style.setProperty("--hero-progress", reduced ? "0" : String(progress));
        if (!reduced && window.scrollY > 0) hero.classList.add("is-parallax");
      }

      if (reduced) return;
      const viewport = window.innerHeight;
      document.querySelectorAll<HTMLElement>("[data-scene]").forEach((node) => {
        const rect = node.getBoundingClientRect();
        if (rect.bottom < -80 || rect.top > viewport + 80) return;
        const shift = ((viewport * 0.5 - (rect.top + rect.height * 0.5)) / viewport) * 22;
        node.style.setProperty("--scene-shift", `${shift.toFixed(2)}px`);
      });
    };

    let line = 0;
    let flow = 0;
    let timer = 0;

    const step = () => {
      timer = 0;
      const lineTarget = readProgress();
      const flowTarget = reduced ? 0 : processTarget();
      line += (lineTarget - line) * (reduced ? 1 : 0.34);
      flow += (flowTarget - flow) * (reduced ? 1 : 0.28);
      if (Math.abs(lineTarget - line) < 0.001) line = lineTarget;
      if (Math.abs(flowTarget - flow) < 0.001) flow = flowTarget;
      applyLine(line);
      if (!reduced) applyProcess(flow);
      if (line !== lineTarget || flow !== flowTarget) timer = window.setTimeout(step, 16);
    };

    const onScroll = () => {
      updateHero();
      window.clearTimeout(timer);
      timer = 0;
      step();
    };

    const revealNodes = document.querySelectorAll<HTMLElement>("[data-reveal]");
    let observer: IntersectionObserver | undefined;
    let costFrame = 0;
    let costTimer = 0;
    const costScene = calculatorSceneRef.current;

    const playCostDigits = () => {
      const tail = costScene?.querySelector<HTMLElement>(".cost-tail");
      if (!tail) return;
      const from = 60;
      const to = 88;
      const duration = 820;
      const start = performance.now();
      let lastPaint = 0;
      let shown = from;
      tail.textContent = String(from);

      const tick = (now: number) => {
        const progress = Math.min(1, (now - start) / duration);
        const eased = 1 - (1 - progress) ** 3;
        const next = progress === 1 ? to : Math.round(from + (to - from) * eased);
        if (progress === 1 || now - lastPaint >= 90) {
          if (next !== shown) {
            shown = next;
            tail.textContent = String(next);
          }
          lastPaint = now;
        }
        if (progress < 1) costFrame = requestAnimationFrame(tick);
        else tail.textContent = String(to);
      };

      costFrame = requestAnimationFrame(tick);
    };

    const enterCost = () => {
      if (!costScene || costScene.classList.contains("is-in")) return true;
      const rect = costScene.getBoundingClientRect();
      if (rect.height === 0) return false;
      const visible = Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0);
      const ratio = visible / rect.height;
      const alreadyPassed = rect.bottom < 24;
      if (!alreadyPassed && ratio < 0.27) return false;
      if (alreadyPassed) {
        const tail = costScene.querySelector(".cost-tail");
        if (tail) tail.textContent = "88";
      }
      costScene.classList.add("is-in");
      if (!reduced && !alreadyPassed) {
        costTimer = window.setTimeout(playCostDigits, 360);
      }
      return true;
    };

    const onCostScroll = () => {
      if (enterCost()) window.removeEventListener("scroll", onCostScroll);
    };
    if (reduced) {
      revealNodes.forEach((node) => node.classList.add("is-in"));
    } else {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add("is-in");
            observer?.unobserve(entry.target);
          });
        },
        { threshold: 0.18, rootMargin: "0px 0px -4% 0px" },
      );
      revealNodes.forEach((node) => observer?.observe(node));
    }

    if (costScene) {
      if (reduced) {
        costScene.classList.add("is-in");
      } else {
        const tail = costScene.querySelector(".cost-tail");
        if (tail) tail.textContent = "60";
        costScene.classList.add("is-armed");
        requestAnimationFrame(() => {
          if (!enterCost()) window.addEventListener("scroll", onCostScroll, { passive: true });
        });
      }
    }

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.clearTimeout(timer);
      window.clearTimeout(costTimer);
      cancelAnimationFrame(costFrame);
      window.removeEventListener("scroll", onCostScroll);
      observer?.disconnect();
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
    setSubmittedPlan(activePlan);
    setSubmitted(true);
  };

  const plan = plans[activePlan];
  const structuredJson = JSON.stringify(structuredData).replace(/</g, "\\u003c");

  const onPlanTabsKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const current = planOrder.indexOf(activePlan);
    let next: PlanId | null = null;
    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      next = planOrder[(current + 1) % planOrder.length];
    } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      next = planOrder[(current - 1 + planOrder.length) % planOrder.length];
    } else if (event.key === "Home") {
      next = "standard";
    } else if (event.key === "End") {
      next = "golden";
    }
    if (!next) return;
    event.preventDefault();
    setActivePlan(next);
    document.getElementById(`plan-tab-${next}`)?.focus();
  };

  return (
    <main id="top">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: structuredJson }} />
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
            <span>Talk to us</span>
            <Arrow />
          </a>
        </nav>
      </header>

      <section className="hero" ref={heroRef}>
        <ScenePicture scene={scenes.skyline} className="hero-image" eager alt="" />
        <div className="hero-grain" />
        <div className="hero-glow" />
        <div className="hero-content">
          <div className="hero-kicker">
            <span>UAE business consultancy</span>
            <span>Dubai · United Arab Emirates</span>
          </div>
          <h1 className="hero-title">
            <span className="title-mask">
              <span className="title-line">Build in Dubai.</span>
            </span>
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

      <section className="signal-scene" aria-labelledby="benefits-heading">
        <h2 id="benefits-heading" className="visually-hidden">Business setup benefits</h2>
        <div className="signal-track">
          {[
            {
              key: "ownership" as const,
              figure: { from: 96, to: 100, suffix: "%", padded: true, duration: 900 },
              label: "Business ownership",
            },
            { key: "packages" as const, lead: "Competitive", label: "Setup packages" },
            { key: "remote" as const, lead: "Effortless", label: "Remote process" },
            {
              key: "activities" as const,
              figure: { from: 2970, to: 3000, suffix: "+", group: true, duration: 1050 },
              label: "Business activities",
            },
          ].map((item) => (
            <article className="signal-item" key={item.key}>
              <span className="signal-icon">
                <SignalMark name={item.key} />
              </span>
              <p className={`signal-lead${item.figure ? "" : " is-word"}`}>
                {item.figure ? (
                  <span className="signal-stat">
                    <SettleFigure
                      from={item.figure.from}
                      to={item.figure.to}
                      group={item.figure.group}
                      duration={item.figure.duration}
                      padded={item.figure.padded}
                    />
                    {item.figure.suffix}
                  </span>
                ) : (
                  item.lead
                )}
              </p>
              <p className="signal-label">{item.label}</p>
            </article>
          ))}
        </div>
        <div className="editorial-statement" data-reveal>
          <span className="section-label copy-in">A clearer route to the UAE</span>
          <h2 className="heading-clip">
            <span className="clip-line"><span>Ambition moves fast.</span></span>
            <span className="clip-line"><span><em>Your setup should too.</em></span></span>
          </h2>
          <p className="copy-in">
            Setting up a UAE Free Zone company or applying for a trade license should feel
            effortless and secure. We make it so.
          </p>
        </div>
      </section>

      <section className="image-expanse">
        <DeferredCover className="expanse-image" scene={scenes.tower} />
        <div className="expanse-overlay" />
        <p className="vertical-caption">Dubai · Designed for possibility</p>
        <div className="expanse-copy" data-reveal>
          <span className="copy-in">From just</span>
          <strong>
            AED <SettleFigure from={4860} to={4888} group duration={1100} offer />
          </strong>
          <p className="copy-in">Limited-time business setup offer</p>
          <a className="button button-light copy-in" href="#consultation">
            Claim the offer <Arrow />
          </a>
        </div>
      </section>

      <section className="structures" id="services">
        <span id="structures" className="section-anchor" />
        <div className="structures-intro" data-reveal>
          <span className="section-label copy-in">Choose your structure</span>
          <h2 className="heading-glide">One destination.<br />Three strategic routes.</h2>
          <p className="copy-in">
            We help you explore the most effective setup options in the UAE and guide you
            through every step.
          </p>
        </div>
        <div className="structure-list">
          {structures.map((item, index) => (
            <article
              className="structure-row"
              key={item.title}
              data-reveal
              style={{ "--reveal-delay": `${index * 90}ms` } as React.CSSProperties}
            >
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

      <section className="process-scene" id="process" ref={processRef}>
        <div className="process-photo">
          <ScenePicture scene={scenes.boardroom} alt="" />
          <div className="process-heading" data-reveal>
            <span className="section-label copy-in">The Wealth Tellers method</span>
            <h2 className="heading-rise">From idea<br />to license.</h2>
          </div>
        </div>
        <div className="process-panel glass-dark" onPointerMove={handleGlow}>
          <div className="process-panel-head">
            <span>Streamlined setup process</span>
            <span>04 steps</span>
          </div>
          <div className="process-steps">
            <div className="process-accent" aria-hidden="true" />
            {steps.map(([title, description], index) => (
              <article
                className="process-step"
                key={title}
                ref={(node) => {
                  processStepRefs.current[index] = node;
                }}
              >
                <span>0{index + 1}</span>
                <h3>{title}</h3>
                <p>{description}</p>
              </article>
            ))}
          </div>
          <a className="button button-gold" href="#consultation">
            Start your UAE journey <Arrow />
          </a>
        </div>
      </section>

      <section className="experts-scene" id="experts">
        <div className="experts-stage">
          <ExpertPortrait expert={experts[displayedExpert]} index={displayedExpert} />

          <div className="expert-column">
            <div className="experts-heading" data-reveal>
              <span className="section-label copy-in">The people behind the process</span>
              <h2 className="heading-rise">Meet the<br /><em>experts.</em></h2>
              <p className="copy-in">
                Realize your business goals in the UAE with a team of seasoned professionals
                behind you. Having decades of combined experience, these innovators and expert
                strategists can transform your ideas into measurable success.
              </p>
            </div>
            <div className="expert-directory">
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
            <div className="directory-list">
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
                  key={expert.name}
                >
                  <img className="expert-thumb" src={expert.image} alt="" width={expert.width} height={expert.height} loading="lazy" decoding="async" />
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

      <section className="calculator-scene" ref={calculatorSceneRef}>
        <div className="calculator-orbit" aria-hidden="true">
          <span />
          <span />
        </div>
        <div className="calculator-copy">
          <span className="section-label cost-kicker">Know before you launch</span>
          <h2 className="cost-title">
            <span className="cost-mask"><span>Your UAE setup</span></span>
            <span className="cost-mask"><span>cost, made</span></span>
            <span className="cost-mask"><span>clear.</span></span>
          </h2>
          <p className="cost-copy">
            Get a fast, precise and completely free estimate including license type,
            residency and core fees.
          </p>
          <ul className="cost-pills">
            <li>2-minute estimate</li>
            <li>Transparent pricing</li>
            <li>Mainland & Free Zone options</li>
          </ul>
          <button
            ref={calculatorButtonRef}
            className="button button-ink cost-action"
            type="button"
            onClick={() => setCalculatorOpen(true)}
          >
            Try the cost calculator <Arrow />
          </button>
          <small className="cost-fine">Final pricing may vary based on activity, approvals and facility requirements.</small>
        </div>
        <div className="calculator-figure">
          <span className="cost-currency">AED</span>
          <strong className="cost-amount">
            <span className="visually-hidden">4,888</span>
            <span aria-hidden="true">4,8<span className="cost-tail">88</span></span>
          </strong>
          <div className="calc-rule"><i /></div>
          <p className="cost-caption">Indicative starting offer</p>
        </div>
      </section>

      <section className="pricing-scene" id="packages">
        <div className="pricing-heading" data-reveal>
          <span className="section-label copy-in">Limited-time packages</span>
          <h2 className="heading-rise">Built for your<br /><em>next chapter.</em></h2>
          <p className="copy-in">Exclusive license packages designed for every entrepreneur.</p>
        </div>
        <div
          className={`pricing-stage glass-dark is-${activePlan}`}
          onPointerMove={handleGlow}
        >
          <div
            className="plan-tabs"
            role="tablist"
            aria-label="Business setup packages"
            onKeyDown={onPlanTabsKeyDown}
          >
            {planOrder.map((id) => {
              const item = plans[id];
              const selected = activePlan === id;
              return (
                <button
                  key={id}
                  id={`plan-tab-${id}`}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  aria-controls={`plan-panel-${id}`}
                  tabIndex={selected ? 0 : -1}
                  onClick={() => setActivePlan(id)}
                >
                  <span className="plan-tab-index">{item.index}</span>
                  <span className="plan-tab-copy">
                    <strong>{item.short}</strong>
                    <em>
                      <small>{item.currency}</small>
                      {item.price}
                    </em>
                    {item.note ? <i className="plan-tab-note">{item.note}</i> : null}
                  </span>
                  <span className="plan-tab-state">
                    <SelectionMark selected={selected} />
                    {selected ? "Selected" : "Select"}
                  </span>
                </button>
              );
            })}
          </div>
          {planOrder.map((id) => {
            const item = plans[id];
            const selected = activePlan === id;
            const itemFeatures = id === "standard" ? standardFeatures : goldenFeatures;
            return (
              <div
                className="plan-display"
                id={`plan-panel-${id}`}
                role="tabpanel"
                key={id}
                hidden={!selected}
                aria-labelledby={`plan-tab-${id}`}
              >
                <div className="plan-main">
                  <span className="plan-eyebrow">{item.eyebrow}</span>
                  {id === "golden" && (
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
                  <h3>{item.name}</h3>
                  <p className="plan-price">
                    <small>{item.currency}</small>
                    <strong>{item.price}</strong>
                  </p>
                  <p>
                    A focused path to establishing your UAE business, supported by a dedicated
                    relationship manager.
                  </p>
                  <a
                    className={`button ${
                      id === "golden" ? "button-gold" : "button-plan-standard"
                    }`}
                    href="#consultation"
                  >
                    Start with {item.short} <Arrow />
                  </a>
                </div>
                <ul className="plan-features">
                  {itemFeatures.map((feature) => (
                    <li key={feature}>
                      <span>✓</span>{feature}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
          <p className="pricing-note">Additional services and inclusions are available on consultation.</p>
        </div>
      </section>

      <section className="proof-scene">
        <DeferredCover className="proof-image" scene={scenes.cityNight} />
        <div className="proof-shade" />
        <div className="proof-copy" data-reveal>
          <div className="stars copy-in">★★★★★</div>
          <blockquote className="heading-rise">
            “Expert guidance, transparent pricing, and a partner you can trust.”
          </blockquote>
          <div className="proof-meta copy-in">
            <strong>4.9</strong>
            <span>Top Rated Service<br />Verified by Google</span>
          </div>
        </div>
      </section>

      <section className="faq-scene" id="faq">
        <div className="faq-heading" data-reveal>
          <span className="section-label copy-in">Essential intelligence</span>
          <h2><span className="heading-rise">Questions, answered<br />with clarity.</span></h2>
        </div>
        <div className="faq-list">
          {faqs.map(([question, answer], index) => (
            <article className={`faq-item ${openFaq === index ? "is-open" : ""}`} key={question}>
              <button
                type="button"
                onClick={() => setOpenFaq(openFaq === index ? -1 : index)}
                aria-expanded={openFaq === index}
                aria-controls={`faq-answer-${index}`}
              >
                <span>0{index + 1}</span>
                <strong>{question}</strong>
                <i aria-hidden="true" />
              </button>
              <div id={`faq-answer-${index}`}><p>{answer}</p></div>
            </article>
          ))}
        </div>
      </section>

      <section className={`consultation is-${activePlan}`} id="contact" onPointerMove={handleGlow} data-scene="consult">
        <span id="consultation" className="section-anchor" />
        <ScenePicture scene={scenes.skyline} className="consultation-bg" alt="" />
        <div className="consultation-copy" data-reveal>
          <span className="section-label copy-in">Your next move starts here</span>
          <h2 className="heading-rise">Dubai is ready.<br /><em>Are you?</em></h2>
          <p className="copy-in">Get expert guidance and a clear route to your UAE business setup.</p>
          <div className="consult-offer" aria-live="polite">
            <span>Selected package</span>
            <strong>{plan.name}</strong>
            <p className="consult-offer-price">
              <small>{plan.currency}</small>
              <b>{plan.price}</b>
            </p>
          </div>
        </div>
        <form className={`consultation-form glass is-${activePlan}`} onSubmit={handleSubmit}>
          {submitted ? (
            <div className="success-message" role="status">
              <span>Request received</span>
              <h3>Thank you.</h3>
              <p>
                {`A Wealth Tellers advisor will contact you about the ${plans[submittedPlan].name}, ${plans[submittedPlan].currency} ${plans[submittedPlan].price}.`}
              </p>
              <button type="button" onClick={() => setSubmitted(false)}>Submit another request</button>
            </div>
          ) : (
            <>
              <div className="form-head">
                <span>Private consultation</span>
                <strong>Start with {plan.short}</strong>
              </div>
              <div className="plan-choice" role="group" aria-label="Package of interest">
                <span className="plan-choice-label">Package of interest</span>
                <div>
                  {planOrder.map((id) => {
                    const item = plans[id];
                    const selected = activePlan === id;
                    return (
                      <button
                        key={id}
                        type="button"
                        className={`is-${id}`}
                        aria-pressed={selected}
                        onClick={() => setActivePlan(id)}
                      >
                        <SelectionMark selected={selected} />
                        <span>
                          <strong>{item.short}</strong>
                          <em>{item.currency} {item.price}</em>
                        </span>
                        <i>{selected ? "Selected" : "Select"}</i>
                      </button>
                    );
                  })}
                </div>
              </div>
              <input type="hidden" name="package" value={`${plan.name} · ${plan.currency} ${plan.price}`} />
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
              <button
                className={`button ${activePlan === "golden" ? "button-gold" : "button-plan-standard"}`}
                type="submit"
              >
                Start with {plan.short} <Arrow />
              </button>
              <small>
                {plan.name} · {plan.currency} {plan.price} · 100% privacy guaranteed
              </small>
            </>
          )}
        </form>
      </section>

      <footer>
        <div className="footer-top">
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
