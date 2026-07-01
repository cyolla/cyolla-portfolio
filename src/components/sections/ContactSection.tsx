import emailjs from '@emailjs/browser';
import { motion } from 'framer-motion';
import { FormEvent, useState } from 'react';
import { FiGithub, FiLinkedin, FiMail, FiPhone, FiSend } from 'react-icons/fi';
import { personalInfo } from '../../data/portfolio';
import { SectionShell } from '../SectionShell';

type ContactSectionProps = {
  aiOpen: boolean;
  onCloseAssistant: () => void;
};

type MessageState = {
  type: 'idle' | 'success' | 'error';
  text: string;
};

const quickReplies = [
  {
    prompt: 'What does Cyolla focus on?',
    answer:
      'Cyolla focuses on software engineering, full stack web application development, QA-aware delivery, and applied AI experimentation.',
  },
  {
    prompt: 'How can we collaborate?',
    answer:
      'You can collaborate through product engineering, frontend systems, API-driven full stack work, testing-heavy delivery, or AI-backed feature prototypes.',
  },
  {
    prompt: 'Where is Cyolla based?',
    answer: 'Cyolla is based in India and currently available for work opportunities.',
  },
];

export function ContactSection({ aiOpen, onCloseAssistant }: ContactSectionProps) {
  const [status, setStatus] = useState<MessageState>({ type: 'idle', text: '' });
  const [assistantText, setAssistantText] = useState(quickReplies[0].answer);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;

    try {
      await emailjs.sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        form,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
      );
      form.reset();
      setStatus({ type: 'success', text: 'Message transmitted successfully to Mission Control.' });
    } catch {
      setStatus({
        type: 'error',
        text: 'EmailJS credentials are required before launch. Add your Vite environment keys to activate the contact channel.',
      });
    }
  };

  return (
    <SectionShell
      id="contact"
      eyebrow="Space Station"
      title="Mission Control is ready for contact"
      description="Reach out for engineering opportunities, full stack collaboration, frontend design systems, or product builds that need thoughtful execution."
    >
      <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="space-y-6">
          <div className="glass-panel p-7">
            <h3 className="text-2xl font-semibold text-white">Direct Channels</h3>
            <div className="mt-6 space-y-4">
              <a href={`mailto:${personalInfo.email}`} className="contact-row">
                <FiMail />
                {personalInfo.email}
              </a>
              <a href={`tel:${personalInfo.phone}`} className="contact-row">
                <FiPhone />
                {personalInfo.phone}
              </a>
              <a href={personalInfo.github} target="_blank" rel="noreferrer" className="contact-row">
                <FiGithub />
                GitHub
              </a>
              <a href={personalInfo.linkedin} target="_blank" rel="noreferrer" className="contact-row">
                <FiLinkedin />
                LinkedIn
              </a>
            </div>
          </div>

          <motion.div
            className="glass-panel p-7"
            animate={aiOpen ? { boxShadow: '0 0 45px rgba(34, 211, 238, 0.28)' } : { boxShadow: '0 0 0 rgba(0,0,0,0)' }}
          >
            <div className="flex items-center justify-between gap-4">
              <div>
                <h3 className="text-2xl font-semibold text-white">Onboard AI Assistant</h3>
                <p className="mt-2 text-slate-300">Ask the local mission guide quick questions about Cyolla.</p>
              </div>
              <button type="button" onClick={onCloseAssistant} className="button-secondary">
                {aiOpen ? 'Close Panel' : 'Standby'}
              </button>
            </div>
            <div className="mt-6 rounded-[1.5rem] border border-white/10 bg-slate-950/55 p-5">
              <p className="text-sm leading-7 text-slate-200">{assistantText}</p>
            </div>
            <div className="mt-5 flex flex-wrap gap-3">
              {quickReplies.map((reply) => (
                <button key={reply.prompt} type="button" className="skill-chip" onClick={() => setAssistantText(reply.answer)}>
                  {reply.prompt}
                </button>
              ))}
            </div>
          </motion.div>
        </div>

        <form onSubmit={handleSubmit} className="glass-panel p-7">
          <h3 className="text-2xl font-semibold text-white">Send Message</h3>
          <div className="mt-6 grid gap-4">
            <input name="from_name" required placeholder="Name" className="contact-input" />
            <input name="from_email" type="email" required placeholder="Email" className="contact-input" />
            <textarea name="message" required placeholder="Message" rows={6} className="contact-input resize-none" />
          </div>
          <button type="submit" className="button-primary mt-6">
            Send Message
            <FiSend />
          </button>
          {status.text && (
            <p className={`mt-4 text-sm ${status.type === 'success' ? 'text-cyan-200' : 'text-amber-200'}`}>{status.text}</p>
          )}
        </form>
      </div>
    </SectionShell>
  );
}
