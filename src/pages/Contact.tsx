import { useState, type FormEvent } from 'react'
import { motion } from 'framer-motion'
import emailjs from '@emailjs/browser'
import SectionLabel from '@/components/ui/SectionLabel'

// ── EmailJS 키 설정 ────────────────────────────────────────────
// 환경변수 없이도 동작하도록 기본값 '' 처리
// .env.local 파일에 아래 세 줄 추가하면 바로 작동:
//   VITE_EMAILJS_SERVICE_ID=service_xxxxxxx
//   VITE_EMAILJS_TEMPLATE_ID=template_xxxxxxx
//   VITE_EMAILJS_PUBLIC_KEY=xxxxxxxxxxxxxxxxxxxx
const SERVICE_ID  = import.meta.env.VITE_EMAILJS_SERVICE_ID  ?? ''
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID ?? ''
const PUBLIC_KEY  = import.meta.env.VITE_EMAILJS_PUBLIC_KEY  ?? ''

export default function Contact() {
  const [form,   setForm]   = useState({ from_name: '', from_email: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
      setStatus('error')
      return
    }
    setStatus('sending')
    try {
      await emailjs.send(SERVICE_ID, TEMPLATE_ID, form, PUBLIC_KEY)
      setStatus('sent')
      setForm({ from_name: '', from_email: '', message: '' })
    } catch {
      setStatus('error')
    }
  }

  const SOCIALS = [
    { label: 'GitHub', href: 'https://github.com/bell7080' },
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
                <span className="font-mono text-xs tracking-widest text-sub group-hover:text-accent transition-colors">
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
          {([
            { field: 'from_name',  label: 'NAME',    type: 'text',  placeholder: '이름' },
            { field: 'from_email', label: 'EMAIL',   type: 'email', placeholder: 'email@example.com' },
          ] as const).map(({ field, label, type, placeholder }) => (
            <div key={field}>
              <label className="font-mono text-xs tracking-[0.3em] text-dim uppercase block mb-2">
                {label}
              </label>
              <input
                name={field}
                type={type}
                value={form[field]}
                onChange={handleChange}
                required
                className="w-full bg-transparent border border-[var(--color-border)] px-4 py-3 font-mono text-sm text-[#f0f0f0] focus:border-accent focus:outline-none focus:ring-0 transition-colors placeholder:text-dim"
                placeholder={placeholder}
              />
            </div>
          ))}

          <div>
            <label className="font-mono text-xs tracking-[0.3em] text-dim uppercase block mb-2">
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
            className="w-full py-3.5 border border-accent font-mono text-xs tracking-[0.3em] text-accent hover:bg-accent hover:text-[#0d0d0d] transition-colors disabled:opacity-40"
          >
            {status === 'sending' ? 'SENDING...' : status === 'sent' ? 'SENT ✓' : 'SEND MESSAGE →'}
          </button>

          {status === 'error' && (
            <p className="font-mono text-xs text-red-400 text-center tracking-widest">
              {!SERVICE_ID ? 'EmailJS 키 미설정 — 아래 안내 참고' : '전송 실패. 잠시 후 다시 시도해주세요.'}
            </p>
          )}

          {/* 키 미설정 시 안내 */}
          {!SERVICE_ID && (
            <div className="border border-dashed border-[var(--color-border)] p-4 text-xs font-mono text-dim space-y-1">
              <p className="text-accent/80 mb-2 tracking-widest uppercase text-xs">EmailJS 미연동 상태</p>
              <p>1. emailjs.com 가입 → Gmail 연결 → Service ID 확인</p>
              <p>2. Email Templates 생성 → Template ID 확인</p>
              <p>3. Account → API Keys → Public Key 복사</p>
              <p className="mt-2 text-dim/60">.env.local 파일에 세 가지 키 입력 후 재시작</p>
            </div>
          )}
        </motion.form>

      </div>
    </section>
  )
}
