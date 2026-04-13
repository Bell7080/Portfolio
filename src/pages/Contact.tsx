import { useState, type FormEvent } from 'react'
import { motion } from 'framer-motion'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setStatus('sending')
    // EmailJS 연동은 Service ID / Template ID 설정 후 활성화
    // await emailjs.send(SERVICE_ID, TEMPLATE_ID, form, PUBLIC_KEY)
    setTimeout(() => setStatus('sent'), 1000) // 임시 처리
  }

  return (
    <section className="max-w-2xl mx-auto px-6 py-24">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="font-serif text-4xl md:text-5xl mb-4"
      >
        Contact
      </motion.h2>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="text-text-sub mb-12"
      >
        협업·의뢰·채용 문의 환영합니다
      </motion.p>

      <motion.form
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        onSubmit={handleSubmit}
        className="space-y-6"
      >
        <div>
          <label className="block text-xs tracking-wider text-text-sub mb-2">이름</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full bg-transparent border border-white/20 px-4 py-3 text-sm text-text focus:border-accent focus:outline-none transition-colors"
          />
        </div>
        <div>
          <label className="block text-xs tracking-wider text-text-sub mb-2">이메일</label>
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full bg-transparent border border-white/20 px-4 py-3 text-sm text-text focus:border-accent focus:outline-none transition-colors"
          />
        </div>
        <div>
          <label className="block text-xs tracking-wider text-text-sub mb-2">메시지</label>
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            required
            rows={6}
            className="w-full bg-transparent border border-white/20 px-4 py-3 text-sm text-text focus:border-accent focus:outline-none transition-colors resize-none"
          />
        </div>

        <button
          type="submit"
          disabled={status === 'sending' || status === 'sent'}
          className="w-full py-3 border border-accent text-accent text-sm tracking-wider hover:bg-accent hover:text-bg transition-colors disabled:opacity-50"
        >
          {status === 'sending' ? '전송 중...' : status === 'sent' ? '전송 완료!' : '전송하기'}
        </button>

        {status === 'error' && (
          <p className="text-red-400 text-xs text-center">전송에 실패했습니다. 직접 이메일을 보내주세요.</p>
        )}
      </motion.form>

      {/* 소셜 링크 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="mt-12 pt-8 border-t border-white/10 flex flex-wrap gap-6 text-sm text-text-sub"
      >
        <a href="https://github.com/bell7080" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">
          GitHub →
        </a>
      </motion.div>
    </section>
  )
}
