import { Link } from 'wouter';
import { ArrowLeft, HelpCircle, Plus, Minus, X, Divide, Superscript, Sigma, Scale, Shuffle } from 'lucide-react';
import { useSettings } from '../hooks/use-settings';
import { Layout } from '../components/layout';

export default function HowToPlay() {
  const { playClick } = useSettings();

  const rules = [
    { icon: Plus, color: 'text-green-500', text: 'บวก: เลือกคำตอบที่ถูกต้องจากการบวกเลข 2 จำนวน' },
    { icon: Minus, color: 'text-pink-500', text: 'ลบ: เลือกคำตอบที่ถูกต้องจากการลบเลข 2 จำนวน' },
    { icon: X, color: 'text-blue-500', text: 'คูณ: เลือกคำตอบที่ถูกต้องจากการคูณเลข 2 จำนวน' },
    { icon: Divide, color: 'text-orange-500', text: 'หาร: เลือกคำตอบที่ถูกต้องจากการหารเลข 2 จำนวน' },
    { icon: Superscript, color: 'text-purple-500', text: 'เลขยกกำลัง: หาค่าของฐานที่ยกกำลังด้วยเลขชี้กำลัง' },
    { icon: Sigma, color: 'text-teal-500', text: 'สแควรูท: หาค่ารากที่สองของจำนวนที่กำหนด' },
    { icon: Scale, color: 'text-rose-500', text: 'เครื่องหมายเปรียบเทียบ: เลือก >, < หรือ = ให้ถูกต้อง' },
    { icon: Shuffle, color: 'text-primary', text: 'เล่นทั้งหมด: สุ่มโจทย์จากทุกหมวดหมู่ ไม่จำกัดจำนวนข้อ' },
  ];

  return (
    <Layout>
      <div className="bg-card p-6 md:p-8 rounded-3xl border-b-8 border-card-border shadow-xl w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="flex items-center gap-4 mb-6">
          <div className="p-4 bg-primary/10 rounded-full text-primary">
            <HelpCircle className="w-8 h-8" />
          </div>
          <h1 className="text-3xl font-bold text-foreground tracking-tight">วิธีเล่น</h1>
        </div>

        <div className="space-y-3 mb-8 max-h-[55vh] overflow-y-auto pr-2 custom-scrollbar">
          {rules.map((r, i) => (
            <div key={i} className="flex items-start gap-4 p-4 bg-muted rounded-2xl">
              <div className="p-2.5 bg-background rounded-full shadow-sm shrink-0">
                <r.icon className={`w-5 h-5 ${r.color}`} strokeWidth={2.5} />
              </div>
              <p className="text-foreground font-medium leading-relaxed pt-1.5">{r.text}</p>
            </div>
          ))}
          <div className="p-4 bg-primary/10 rounded-2xl text-sm text-foreground">
            เลือกคำตอบที่คิดว่าถูกต้อง ระบบจะเฉลยและไปข้อต่อไปให้อัตโนมัติ กดปุ่ม
            "เลิกเล่น" เมื่อต้องการดูสรุปผลคะแนน
          </div>
        </div>

        <Link
          href="/"
          onClick={() => playClick()}
          className="flex items-center justify-center gap-2 w-full py-4 bg-secondary text-secondary-foreground font-bold rounded-2xl border-b-4 border-secondary-foreground/20 shadow-md hover:-translate-y-1 active:scale-95 transition-all text-xl"
        >
          <ArrowLeft className="w-6 h-6" />
          กลับหน้าแรก
        </Link>
      </div>
    </Layout>
  );
}
