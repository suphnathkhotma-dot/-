import { Link } from 'wouter';
import { ArrowLeft, Wrench } from 'lucide-react';
import { useSettings } from '../hooks/use-settings';
import { Layout } from '../components/layout';

export default function Tools() {
  const { playClick } = useSettings();

  const tools = [
    { name: 'Google Gemini', logo: 'logos/gemini.png', desc: 'ช่วยวางแผนระบบ วิเคราะห์โครงสร้าง และเสนอแนวทางการออกแบบเว็บไซต์' },
    { name: 'GitHub', logo: 'logos/github.png', desc: 'ใช้จัดเก็บซอร์สโค้ด ควบคุมเวอร์ชัน และจัดระเบียบไฟล์ภายในโปรเจกต์' },
    { name: 'Google Stitch', logo: 'logos/stitch.png', desc: 'ใช้ออกแบบหน้าตาเว็บไซต์ (UI) และสร้างต้นแบบการใช้งาน (Prototype)' },
    { name: 'Vercel', logo: 'logos/vercel.png', desc: 'ใช้สำหรับเผยแพร่เว็บไซต์ (Deploy) และสร้างลิงก์สำหรับเข้าถึงเว็บไซต์ผ่านอินเทอร์เน็ต' },
    { name: 'Grok', logo: 'logos/grok.jpg', desc: 'ช่วยแนะนำและพัฒนาโค้ดบางส่วนเพื่อเพิ่มประสิทธิภาพในการทำงาน' },
  ];

  return (
    <Layout>
      <div className="bg-card p-6 md:p-8 rounded-3xl border-b-8 border-card-border shadow-xl w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="flex items-center gap-4 mb-6">
          <div className="p-4 bg-primary/10 rounded-full text-primary">
            <Wrench className="w-8 h-8" />
          </div>
          <h1 className="text-3xl font-bold text-foreground tracking-tight">เครื่องมือที่ใช้พัฒนา</h1>
        </div>

        <div className="space-y-3 mb-8 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
          {tools.map((t, i) => (
            <div key={i} className="flex items-center gap-4 p-3 md:p-4 bg-muted rounded-2xl">
              <div className="w-14 h-14 shrink-0 rounded-full bg-background border border-border shadow-sm overflow-hidden">
                <img src={`${import.meta.env.BASE_URL}${t.logo}`} alt={`${t.name} logo`} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-foreground">{t.name}</p>
                <p className="text-xs md:text-sm text-muted-foreground leading-snug">{t.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <Link
          href="/about"
          onClick={() => playClick()}
          className="flex items-center justify-center gap-2 w-full py-4 bg-secondary text-secondary-foreground font-bold rounded-2xl border-b-4 border-secondary-foreground/20 shadow-md hover:-translate-y-1 active:scale-95 transition-all text-xl"
        >
          <ArrowLeft className="w-6 h-6" />
          กลับ
        </Link>
      </div>
    </Layout>
  );
}
