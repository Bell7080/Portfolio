import { useState, type FormEvent } from 'react'
import { motion } from 'framer-motion'
import SectionLabel from '@/components/ui/SectionLabel'

export default function Contact() {
  const [form,   setForm]   = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setStatus('sending')
    // TODO: emailjs.send(SERVICE_ID, TEMPLATE_ID, form, PUBLIC_KEY)
    setTimeout(() => setStatus('sent'), 1000)
  }

  const SOCIALS = [
    { label: 'GitHub',    href: 'https://github.com/bell7080' },
  ]

  return (
    <section className="max-w-4xl mx-auto px-8 md:px-16 py-24">
      <SectionLabel number="07" label="Contact" />

      <div className="grid md:grid-cols-2 gap-16 items-start">

        {/* 왼쪽: CTA 텍스트 */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className="font-serif text-3xl md:text-4xl leading-snug mb-6">
            협업·의뢰·채용<br />
            <span className="text-accent">문의 환영합니다.</span>
          </h2>
          <p className="text-sub leading-relaxed mb-10">
            AI 아트 디렉팅, 세계관 설계, 콘텐츠 기획, 바이브 코딩 프로젝트 등
            어떤 형태의 협업이든 편하게 연락주세요.
          </p>

          <div className="space-y-3">
            {SOCIALS.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between py-3 border-b border-[var(--color-border)] group"
              >
                <span className="font-mono text-[11px] tracking-widest text-sub group-hover:text-accent transition-colors">
                  {label}
                </span>
                <span className="font-mono text-xs text-dim group-hover:text-accent transition-colors">→</span>
              </a>
            ))}
          </div>
        </motion.div>

        {/* 오른쪽: 폼 */}
        <motion.form
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          onSubmit={handleSubmit}
          className="space-y-5"
        >
          {(['name', 'email'] as const).map(field => (
            <div key={field}>
              <label className="font-mono text-[10px] tracking-[0.3em] text-dim uppercase block mb-2">
                {field === 'name' ? 'NAME' : 'EMAIL'}
              </label>
              <input
                name={field}
                type={field === 'email' ? 'email' : 'text'}
                value={form[field]}
                onChange={handleChange}
                required
                className="w-full bg-transparent border border-[var(--color-border)] px-4 py-3 font-mono text-sm text-[#f0f0f0] focus:border-accent focus:outline-none focus:ring-0 transition-colors placeholder:text-dim"
                placeholder={field === 'name' ? '이름' : 'email@example.com'}
              />
            </div>
          ))}
          <div>
            <label className="font-mono text-[10px] tracking-[0.3em] text-dim uppercase block mb-2">
              MESSAGE
            </label>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              required
              rows={6}
              className="w-full bg-transparent border border-[var(--color-border)] px-4 py-3 font-mono text-sm text-[#f0f0f0] focus:border-accent focus:outline-none focus:ring-0 transition-colors resize-none placeholder:text-dim"
              placeholder="프로젝트 내용, 협업 형태 등을 간략히 작성해주세요"
            />
          </div>

          <button
            type="submit"
            disabled={status === 'sending' || status === 'sent'}
            className="w-full py-3.5 border border-accent font-mono text-xs tracking-[0.3em] text-accent hover:bg-accent hover:text-[#0d0d0d] transition-colors disabled:opacity-40 group relative overflow-hidden"
          >
            <span className="relative z-10">
              {status === 'sending' ? 'SENDING...' : status === 'sent' ? 'SENT ✓' : 'SEND MESSAGE →'}
            </span>
          </button>

          {status === 'error' && (
            <p className="font-mono text-[10px] text-red-400 text-center tracking-widest">
              전송 실패. 직접 이메일을 보내주세요.
            </p>
          )}
        </motion.form>

      </div>
    </section>
  )
}
