import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Navbar from './components/Navbar'
import headsetImg from './assets/headset.png'
import workflowImg from './assets/workflow.png'
import callcenterVideo from './assets/Callcenter.mp4'
import voicebotsVideo from './assets/Voicebots.mp4'
import chatVideo from './assets/Chat.mp4'
import growthVideo from './assets/Business growth charts.mp4'

function FadeInSection({ children, className = '', delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/* ─── HERO ─── */
function HeroSection() {
  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const headsetY = useTransform(scrollYProgress, [0, 1], [0, 100])

  return (
    <section ref={heroRef} className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-b from-white via-slate-50 to-white">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-[0.4]" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, #cbd5e1 1px, transparent 0)`,
        backgroundSize: '40px 40px'
      }} />

      {/* Headset merged into background, right side */}
      <motion.img
        src={headsetImg}
        alt=""
        aria-hidden="true"
        style={{ y: headsetY }}
        initial={{ opacity: 0, scale: 0.9, rotate: 0 }}
        animate={{ opacity: 0.9, scale: 1, rotate: 10 }}
        transition={{ duration: 1.2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="pointer-events-none select-none absolute -right-20 md:-right-40 top-1/2 -translate-y-1/2 w-[120vw] max-w-[1400px] min-w-[900px] drop-shadow-[0_40px_80px_rgba(249,115,22,0.15)]"
      />
      {/* Glow behind headset to blend it into the dark theme */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[90vw] h-[90vw] max-w-[66rem] max-h-[66rem] bg-gradient-to-br from-ox/20 via-ob/10 to-transparent rounded-full blur-[100px]" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-16 py-32">
        <div className="max-w-3xl">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold leading-[1.05] tracking-tight text-slate-900"
          >
            Intelligence That<br />
            <span className="bg-gradient-to-r from-ox via-orange-300 to-ob bg-clip-text text-transparent">
              Understands & Responds
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-6 text-base md:text-lg text-slate-500 max-w-xl leading-relaxed"
          >
            From first contact to lasting loyalty — we blend AI-powered automation with human expertise to deliver customer experiences that build businesses.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-10 flex gap-4 flex-wrap"
          >
            <a
              href="#services"
              className="px-8 py-3.5 bg-ox text-white text-sm font-semibold rounded-full shadow-lg shadow-ox/20 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
            >
              Explore Our Services
            </a>
            <a
              href="#contact"
              className="px-8 py-3.5 border border-slate-200 text-slate-500 text-sm font-medium rounded-full hover:border-slate-300 hover:text-slate-700 transition-all duration-300"
            >
              Get a Demo
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="mt-16 flex items-center gap-8 text-xs text-slate-400"
          >
            {[
              { label: '24/7 Multilingual Support', color: 'bg-ox' },
              { label: 'NASSCOM Member', color: 'bg-ob' },
              { label: 'ISO Certified', color: 'bg-emerald-400' },
            ].map((s) => (
              <span key={s.label} className="flex items-center gap-2">
                <span className={`w-1.5 h-1.5 rounded-full ${s.color}`} />
                {s.label}
              </span>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <motion.svg
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-slate-300" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
        >
          <path d="M7 13l5 5 5-5M7 6l5 5 5-5" />
        </motion.svg>
      </motion.div>
    </section>
  )
}

/* ─── SERVICE SECTIONS ─── */
const services = [
  {
    id: 'support',
    num: '01',
    label: 'Omnichannel Support Hub',
    title: 'Every Customer\nStarts Here',
    desc: 'From the first ring to the final resolution — our expert team handles inbound calls, emails, and chats with precision, empathy, and speed. The foundation of great customer experience.',
    stat: 'Trusted by Apollo Hospitals, Cloud Nine & Jafron Biomedical',
    color: '#f97316',
    accent: '#ec4899',
    video: callcenterVideo,
  },
  {
    id: 'ivr',
    num: '02',
    label: 'Generative AI IVR',
    title: 'From Voice to\nIntelligent Response',
    desc: 'No more endless menu trees. Our AI-powered IVR understands natural language, detects sentiment, and routes intelligently — resolving queries in seconds, in multiple languages.',
    stat: '24/7 multilingual, always-on IVR',
    color: '#2563eb',
    accent: '#06b6d4',
    video: voicebotsVideo,
  },
  {
    id: 'chatbots',
    num: '03',
    label: 'AI Chatbots',
    title: 'Conversations That\nConvert',
    desc: 'Intelligent chatbots that handle sales, support, and scheduling across WhatsApp, web, and social. Context-aware, memory-driven, and available 24/7.',
    stat: 'Seamless escalation to human agents',
    color: '#7c3aed',
    accent: '#d946ef',
    video: chatVideo,
  },
  {
    id: 'automation',
    num: '04',
    label: 'Intelligent Automation',
    title: 'Workflows That\nRun Themselves',
    desc: 'CRM-integrated pipelines that route, prioritize, and resolve without human touch. Real-time dashboards, AI insights, and zero-touch lead nurturing.',
    stat: 'Data-driven insights for smarter decisions',
    color: '#0d9488',
    accent: '#22c55e',
    image: workflowImg,
  },
  {
    id: 'growth',
    num: '05',
    label: 'Revenue Impact',
    title: 'Growth That\nCompounds',
    desc: 'Every automation, every smart interaction, every routed lead — directly contributes to your bottom line. Real-time dashboards turn support activity into decisions you can act on.',
    stat: 'NASSCOM member · ISO certified',
    color: '#e11d48',
    accent: '#f59e0b',
    video: growthVideo,
  },
]

function ServiceSection({ service, index }) {
  const isReversed = index % 2 === 1
  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] })
  const mediaY = useTransform(scrollYProgress, [0, 1], [30, -30])
  const maskDirection = isReversed ? 'to right' : 'to left'
  const maskGradient = `linear-gradient(${maskDirection}, black 45%, transparent 95%)`

  return (
    <section ref={sectionRef} id={service.id} className="relative py-20 md:py-32 px-6 md:px-16 bg-white overflow-hidden">
      {/* Colorful glow accents, revealed through the faded side of the video */}
      <div
        className={`absolute -top-24 w-[420px] h-[420px] rounded-full blur-[110px] opacity-40 ${isReversed ? '-right-24' : '-left-24'}`}
        style={{ background: `radial-gradient(circle, ${service.color}, transparent 70%)` }}
      />
      <div
        className={`absolute bottom-0 w-[380px] h-[380px] rounded-full blur-[120px] opacity-30 ${isReversed ? '-left-16' : '-right-16'}`}
        style={{ background: `radial-gradient(circle, ${service.accent}, transparent 70%)` }}
      />

      {/* Media merged across the full section, faded toward the text side */}
      {service.video ? (
        <>
          {/* Mobile: contained, above the text */}
          <video
            src={service.video}
            autoPlay
            loop
            muted
            playsInline
            className="md:hidden relative w-full aspect-video rounded-2xl object-cover mb-10 shadow-lg"
          />
          {/* Desktop: covers the whole section, fading out on the text side */}
          <motion.video
            src={service.video}
            autoPlay
            loop
            muted
            playsInline
            style={{
              y: mediaY,
              WebkitMaskImage: maskGradient,
              maskImage: maskGradient,
            }}
            className={`hidden md:block pointer-events-none absolute inset-y-0 w-1/2 h-full object-cover ${
              isReversed ? 'left-0' : 'right-0'
            }`}
          />
        </>
      ) : service.image ? (
        <>
          {/* Mobile: contained card, above the text */}
          <img
            src={service.image}
            alt=""
            aria-hidden="true"
            className="md:hidden relative w-full rounded-2xl object-contain bg-white mb-10 shadow-lg border border-slate-200/70 p-3"
          />
          {/* Desktop: a floating, tilted dashboard card that overlaps into the text side */}
          <motion.div
            style={{ y: mediaY }}
            initial={{ opacity: 0, rotate: 0 }}
            whileInView={{ opacity: 1, rotate: isReversed ? -4 : 4 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className={`hidden md:block pointer-events-none absolute top-1/2 -translate-y-1/2 w-[62vw] max-w-3xl ${
              isReversed ? 'left-[2%]' : 'right-[2%]'
            }`}
          >
            <img
              src={service.image}
              alt=""
              aria-hidden="true"
              className="w-full h-auto rounded-[1.75rem] object-contain bg-white shadow-2xl shadow-slate-300/60 border border-slate-200/70 p-4"
            />
          </motion.div>
        </>
      ) : (
        <div
          className={`hidden md:flex absolute top-1/2 -translate-y-1/2 w-[36vw] max-w-lg aspect-square items-center justify-center rounded-full opacity-[0.08] ${
            isReversed ? 'left-0' : 'right-0'
          }`}
          style={{ background: service.color }}
        >
          <svg width="45%" height="45%" viewBox="0 0 24 24" fill="none" stroke={service.color} strokeWidth="1">
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <circle cx="8.5" cy="8.5" r="1.5" />
            <path d="M21 15l-5-5L5 21" />
          </svg>
        </div>
      )}

      <div className="relative max-w-7xl mx-auto">
        <div className={`flex ${isReversed ? 'md:justify-end' : 'md:justify-start'}`}>
          <FadeInSection>
            <div className="space-y-5 max-w-lg">
              <span className="text-7xl md:text-8xl font-light select-none pointer-events-none leading-none block" style={{ color: `${service.color}15` }}>
                {service.num}
              </span>
              <span className="text-xs font-semibold tracking-[0.2em] uppercase block" style={{ color: service.color }}>
                {service.label}
              </span>
              <h2 className="text-3xl md:text-5xl font-bold leading-tight text-slate-900 whitespace-pre-line">
                {service.title}
              </h2>
              <p className="text-base md:text-lg leading-relaxed text-slate-500">
                {service.desc}
              </p>
              <div className="flex items-center gap-3 pt-2">
                <span className="w-8 h-px" style={{ backgroundColor: service.color }} />
                <span className="text-sm font-medium" style={{ color: service.color }}>
                  {service.stat}
                </span>
              </div>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
              >
                Learn more
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </FadeInSection>
        </div>
      </div>
    </section>
  )
}

/* ─── KPI STRIP ─── */
function KPIStrip() {
  const items = [
    'Inbound Call Center Outsourcing',
    'Generative AI IVR',
    '24/7 Multilingual Support',
    'AI + Human Hybrid Teams',
    'Seamless Human Escalation',
    'NASSCOM Member',
    'ISO Certified',
    'Trusted by Apollo Hospitals',
    'Trusted by Cloud Nine Hospitals',
    'Trusted by Jafron Biomedical',
  ]
  const row = [...items, ...items]
  return (
    <section className="relative py-6 bg-white border-y border-slate-100 overflow-hidden">
      <div className="flex w-max animate-marquee motion-reduce:animate-none">
        {row.map((label, i) => (
          <span
            key={i}
            className="flex-shrink-0 mx-2.5 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white border border-slate-200 shadow-sm text-sm font-medium text-slate-600 whitespace-nowrap"
          >
            <span className={`w-1.5 h-1.5 rounded-full ${i % 2 === 0 ? 'bg-ox' : 'bg-ob'}`} />
            {label}
          </span>
        ))}
      </div>
    </section>
  )
}

/* ─── TESTIMONIAL ─── */
function TestimonialSection() {
  return (
    <section className="py-20 md:py-28 px-6 md:px-16 bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-3xl mx-auto text-center">
        <FadeInSection>
          <span className="text-xs font-semibold tracking-[0.2em] uppercase text-ox">Testimonial</span>
        </FadeInSection>
        <FadeInSection delay={0.1}>
          <blockquote className="mt-8 text-xl md:text-2xl text-slate-600 leading-relaxed font-medium">
            &ldquo;Open Mind has been an exceptional partner for Apollo Hospitals. Their AI-powered support desk improved our patient response time by 60% while maintaining the human touch our patients deserve.&rdquo;
          </blockquote>
          <div className="mt-8 flex items-center justify-center gap-4">
            {/* Placeholder avatar */}
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-ox to-ob flex items-center justify-center text-white font-bold text-sm">
              NL
            </div>
            <div className="text-left">
              <p className="font-semibold text-slate-800">Neeraj Lal</p>
              <p className="text-sm text-slate-400">COO, Apollo Hospitals, Gujarat Region</p>
            </div>
          </div>
        </FadeInSection>
        {/* Client logos placeholder */}
        <FadeInSection delay={0.2}>
          <div className="mt-16 flex items-center justify-center gap-8 md:gap-16 flex-wrap opacity-30">
            {['Apollo', 'Cloud Nine', 'Jafron'].map((name) => (
              <div key={name} className="h-8 flex items-center text-sm font-semibold text-slate-300 tracking-widest uppercase">
                {name}
              </div>
            ))}
          </div>
        </FadeInSection>
      </div>
    </section>
  )
}

/* ─── CTA ─── */
function CTASection() {
  return (
    <section id="contact" className="py-20 md:py-28 px-6 md:px-16 bg-white">
      <div className="max-w-3xl mx-auto text-center">
        <FadeInSection>
          <span className="text-xs font-semibold tracking-[0.2em] uppercase text-ox">Get Started</span>
        </FadeInSection>
        <FadeInSection delay={0.1}>
          <h2 className="mt-4 text-3xl md:text-5xl font-bold text-slate-900">
            Ready to Transform Your<br />Customer Experience?
          </h2>
          <p className="mt-4 text-base md:text-lg text-slate-400 max-w-lg mx-auto leading-relaxed">
            Schedule a live demo with our team and see how Open Mind can help you scale support without compromising quality.
          </p>
        </FadeInSection>
        <FadeInSection delay={0.2}>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:+919811331600"
              className="px-8 py-3.5 bg-ox text-white text-sm font-semibold rounded-full shadow-lg shadow-ox/20 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
            >
              Call +91 9811331600
            </a>
            <a
              href="mailto:connect@openmind.in"
              className="px-8 py-3.5 border border-slate-200 text-slate-500 text-sm font-medium rounded-full hover:border-slate-300 hover:text-slate-700 transition-all duration-300"
            >
              Email connect@openmind.in
            </a>
          </div>
        </FadeInSection>
      </div>
    </section>
  )
}

/* ─── FOOTER ─── */
function FooterSection() {
  return (
    <footer className="border-t border-slate-100 py-16 px-6 md:px-16 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-12">
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <img src="https://raw.githubusercontent.com/inder20216/openmind-assets/main/logo.png" alt="OpenMind Logo" className="h-7 w-auto" />
            </div>
            <p className="text-sm text-slate-400 leading-relaxed max-w-xs">
              AI-powered customer support outsourcing. We help enterprises deliver world-class experiences at scale.
            </p>
          </div>
          <div>
            <h4 className="text-xs font-semibold tracking-widest uppercase text-slate-400 mb-5">Services</h4>
            <div className="space-y-3">
              {['Inbound Call Center', 'Customer Support', 'Lead Management', 'AI Chatbots', 'IVR Solutions'].map((s) => (
                <a key={s} href="#" className="block text-sm text-slate-400 hover:text-slate-700 transition-colors">{s}</a>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-xs font-semibold tracking-widest uppercase text-slate-400 mb-5">Company</h4>
            <div className="space-y-3">
              {['Overview', 'Our Mission', 'Management', 'Careers', 'Blog'].map((s) => (
                <a key={s} href="#" className="block text-sm text-slate-400 hover:text-slate-700 transition-colors">{s}</a>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-xs font-semibold tracking-widest uppercase text-slate-400 mb-5">Contact</h4>
            <div className="space-y-3 text-sm text-slate-400">
              <a href="tel:+919811331600" className="block hover:text-slate-700 transition-colors">+91 9811331600</a>
              <a href="mailto:connect@openmind.in" className="block hover:text-slate-700 transition-colors">connect@openmind.in</a>
              <p className="leading-relaxed">
                B3-943, 9th Floor, Spaze IT-Tech Park<br />
                Sohna Road, Gurgaon
              </p>
            </div>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-300">
          <p>&copy; 2026 Open Mind Services Limited. All rights reserved.</p>
          <div className="flex gap-6">
            {['Privacy Policy', 'Terms & Conditions'].map((s) => (
              <a key={s} href="#" className="hover:text-slate-500 transition-colors">{s}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

/* ─── APP ─── */
export default function App() {
  return (
    <div className="min-h-screen bg-white text-slate-900 antialiased selection:bg-ox/20">
      <Navbar />
      <HeroSection />
      <KPIStrip />

      {/* Service sections */}
      {services.map((service, i) => (
        <ServiceSection key={service.id} service={service} index={i} />
      ))}

      <TestimonialSection />
      <CTASection />
      <FooterSection />
    </div>
  )
}
