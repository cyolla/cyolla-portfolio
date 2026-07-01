import { Suspense, lazy, useEffect, useMemo, useRef, useState } from 'react';
import gsap from 'gsap';
import { FiMic, FiMoon, FiMusic, FiPause, FiSun, FiVolume2 } from 'react-icons/fi';
import { HeroSection } from './components/sections/HeroSection';
import { CustomCursor } from './components/CustomCursor';
import { HeaderNav } from './components/HeaderNav';
import { LoadingScreen } from './components/LoadingScreen';
import { OrbitalNav } from './components/OrbitalNav';
import { navigation, personalInfo } from './data/portfolio';
import { useLenis } from './hooks/useLenis';

const SpaceScene = lazy(() => import('./components/SpaceScene').then((module) => ({ default: module.SpaceScene })));
const AboutSection = lazy(() => import('./components/sections/AboutSection').then((module) => ({ default: module.AboutSection })));
const SkillsSection = lazy(() => import('./components/sections/SkillsSection').then((module) => ({ default: module.SkillsSection })));
const ExperienceSection = lazy(() =>
  import('./components/sections/ExperienceSection').then((module) => ({ default: module.ExperienceSection })),
);
const ProjectsSection = lazy(() => import('./components/sections/ProjectsSection').then((module) => ({ default: module.ProjectsSection })));
const CertificationsSection = lazy(() =>
  import('./components/sections/CertificationsSection').then((module) => ({ default: module.CertificationsSection })),
);
const GitHubSection = lazy(() => import('./components/sections/GitHubSection').then((module) => ({ default: module.GitHubSection })));
const ContactSection = lazy(() => import('./components/sections/ContactSection').then((module) => ({ default: module.ContactSection })));

function useScrollSpy(ids: string[]) {
  const [activeId, setActiveId] = useState(ids[0]);

  useEffect(() => {
    const observers = ids
      .map((id) => {
        const element = document.getElementById(id);
        if (!element) return null;
        const observer = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) setActiveId(id);
          },
          { rootMargin: '-30% 0px -45% 0px', threshold: 0.2 },
        );
        observer.observe(element);
        return observer;
      })
      .filter(Boolean) as IntersectionObserver[];

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, [ids]);

  return activeId;
}

export default function App() {
  useLenis();
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [musicOn, setMusicOn] = useState(false);
  const [soundOn, setSoundOn] = useState(true);
  const [assistantOpen, setAssistantOpen] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [musicError, setMusicError] = useState('');
  const audioContextRef = useRef<AudioContext | null>(null);
  const ambientNodesRef = useRef<{
    oscillators: OscillatorNode[];
    gains: GainNode[];
    master: GainNode | null;
    lfo: OscillatorNode | null;
    lfoGain: GainNode | null;
    pulse: number | null;
  } | null>(null);

  const sectionIds = useMemo(() => ['home', ...navigation.map((item) => item.id)], []);
  const headerNavItems = useMemo(
    () => [
      { id: 'home', label: 'Home' },
      { id: 'about', label: 'About' },
      { id: 'projects', label: 'Projects' },
      { id: 'github', label: 'GitHub' },
      { id: 'contact', label: 'Contact' },
    ],
    [],
  );
  const activeId = useScrollSpy(sectionIds);

  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 2600);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  useEffect(() => {
    const updateProgress = () => {
      const height = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(height <= 0 ? 0 : (window.scrollY / height) * 100);
    };

    updateProgress();
    window.addEventListener('scroll', updateProgress, { passive: true });
    return () => window.removeEventListener('scroll', updateProgress);
  }, []);

  useEffect(() => {
    const targets = document.querySelectorAll('.glass-panel, .button-primary, .button-secondary, .skill-chip');
    gsap.fromTo(
      targets,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1, stagger: 0.05, ease: 'power3.out', delay: 2 },
    );
  }, []);

  useEffect(() => {
    const clickHandler = () => {
      if (!soundOn) return;
      if (!audioContextRef.current) audioContextRef.current = new AudioContext();
      const context = audioContextRef.current;
      void context.resume();
      const oscillator = context.createOscillator();
      const gain = context.createGain();
      oscillator.connect(gain);
      gain.connect(context.destination);
      oscillator.type = 'triangle';
      oscillator.frequency.value = 440;
      gain.gain.value = 0.02;
      oscillator.start();
      oscillator.stop(context.currentTime + 0.06);
    };

    window.addEventListener('click', clickHandler);
    return () => window.removeEventListener('click', clickHandler);
  }, [soundOn]);

  useEffect(() => {
    return () => {
      const nodes = ambientNodesRef.current;
      if (!nodes) return;
      nodes.oscillators.forEach((oscillator) => {
        oscillator.stop();
        oscillator.disconnect();
      });
      nodes.gains.forEach((gain) => gain.disconnect());
      nodes.lfo?.stop();
      nodes.lfo?.disconnect();
      nodes.lfoGain?.disconnect();
      nodes.master?.disconnect();
      if (nodes.pulse !== null) window.clearInterval(nodes.pulse);
    };
  }, []);

  const stopMusic = () => {
    const nodes = ambientNodesRef.current;
    if (!nodes) {
      setMusicOn(false);
      return;
    }

    nodes.oscillators.forEach((oscillator) => {
      oscillator.stop();
      oscillator.disconnect();
    });
    nodes.gains.forEach((gain) => gain.disconnect());
    nodes.lfo?.stop();
    nodes.lfo?.disconnect();
    nodes.lfoGain?.disconnect();
    nodes.master?.disconnect();
    if (nodes.pulse != null) window.clearInterval(nodes.pulse);
    ambientNodesRef.current = null;
    setMusicOn(false);
  };

  const toggleMusic = async () => {
    try {
      if (!audioContextRef.current) audioContextRef.current = new AudioContext();
      const context = audioContextRef.current;
      await context.resume();
      setMusicError('');

      if (ambientNodesRef.current) {
        stopMusic();
        return;
      }

      const master = context.createGain();
      master.gain.value = 0.08;
      master.connect(context.destination);

      const frequencies = [130.81, 196, 261.63];
      const oscillators = frequencies.map((frequency, index) => {
        const oscillator = context.createOscillator();
        const gain = context.createGain();
        oscillator.type = index === 0 ? 'sine' : index === 1 ? 'triangle' : 'sawtooth';
        oscillator.frequency.value = frequency;
        gain.gain.value = index === 0 ? 0.22 : index === 1 ? 0.12 : 0.06;
        oscillator.connect(gain);
        gain.connect(master);
        oscillator.start();
        return { oscillator, gain };
      });

      const lfo = context.createOscillator();
      const lfoGain = context.createGain();
      lfo.type = 'sine';
      lfo.frequency.value = 0.12;
      lfoGain.gain.value = 26;
      lfo.connect(lfoGain);
      lfoGain.connect(oscillators[0].oscillator.frequency);
      lfo.start();

      const pulse = window.setInterval(() => {
        if (!ambientNodesRef.current) return;
        const time = context.currentTime;
        master.gain.cancelScheduledValues(time);
        master.gain.setValueAtTime(master.gain.value, time);
        master.gain.linearRampToValueAtTime(0.12, time + 0.6);
        master.gain.linearRampToValueAtTime(0.08, time + 1.8);
      }, 1800);

      ambientNodesRef.current = {
        oscillators: oscillators.map((item) => item.oscillator),
        gains: oscillators.map((item) => item.gain),
        master,
        lfo,
        lfoGain,
        pulse,
      };
      setMusicOn(true);
    } catch {
      setMusicError('Audio is blocked by the browser. Click the page once, then press Music On again.');
      stopMusic();
    }
  };

  const toggleVoice = () => {
    const synth = window.speechSynthesis;
    if (!voiceEnabled) {
      const utterance = new SpeechSynthesisUtterance(
        `${personalInfo.name}. ${personalInfo.headline}. Mission control is ready for collaboration.`,
      );
      utterance.rate = 1;
      synth.speak(utterance);
      setVoiceEnabled(true);
      setAssistantOpen(true);
      return;
    }

    synth.cancel();
    setVoiceEnabled(false);
  };

  return (
    <div className="min-h-screen overflow-x-hidden" style={{ color: 'var(--text)' }}>
      <LoadingScreen finished={!loading} />
      <Suspense fallback={<div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(79,70,229,0.35),_rgba(3,7,18,0.98)_55%)]" />}>
        <SpaceScene />
      </Suspense>
      <CustomCursor />
      <HeaderNav
        activeId={activeId}
        items={headerNavItems}
        controls={
          <>
            <button type="button" className="control-pill" onClick={() => setTheme((current) => (current === 'dark' ? 'light' : 'dark'))}>
              {theme === 'dark' ? <FiSun /> : <FiMoon />}
              {theme === 'dark' ? 'Light' : 'Dark'}
            </button>
            <button type="button" className="control-pill" onClick={() => void toggleMusic()}>
              {musicOn ? <FiPause /> : <FiMusic />}
              {musicOn ? 'Music Off' : 'Music On'}
            </button>
            <button type="button" className="control-pill" onClick={() => setSoundOn((current) => !current)}>
              <FiVolume2 />
              {soundOn ? 'FX On' : 'FX Off'}
            </button>
            <button type="button" className="control-pill" onClick={toggleVoice}>
              <FiMic />
              {voiceEnabled ? 'Voice Off' : 'Voice On'}
            </button>
          </>
        }
      />
      <OrbitalNav activeId={activeId} items={navigation} />

      <div className="fixed left-0 top-0 z-50 h-1 bg-[linear-gradient(90deg,#22d3ee,#8b5cf6)]" style={{ width: `${scrollProgress}%` }} />

      <main className="xl:pl-[22rem]">
        <HeroSection onOpenAssistant={() => setAssistantOpen(true)} />
        {musicError && (
          <div className="mx-auto mt-24 w-full max-w-5xl px-4 sm:px-6 lg:px-10">
            <div className="rounded-2xl border border-amber-300/20 bg-amber-300/10 px-4 py-3 text-sm text-amber-100">
              {musicError}
            </div>
          </div>
        )}
        <Suspense fallback={<div className="h-24" />}>
          <AboutSection />
          <SkillsSection />
          <ExperienceSection />
          <ProjectsSection />
          <CertificationsSection />
          <GitHubSection />
          <ContactSection aiOpen={assistantOpen} onCloseAssistant={() => setAssistantOpen((current) => !current)} />
        </Suspense>
      </main>
    </div>
  );
}
