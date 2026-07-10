import { Link } from 'wouter';
import { Users, User, ArrowLeft, Heart } from 'lucide-react';
import { useSettings } from '../hooks/use-settings';
import { Layout } from '../components/layout';

export default function About() {
  const { playClick } = useSettings();

  const members = [
    { role: 'หัวหน้าโครงการ', name: 'ศุภณัฐ โคตมา', id: '2' },
    { role: 'สมาชิก', name: 'ธนรัตน์ ไพศาล', id: '1' },
    { role: 'สมาชิก', name: 'สุวัฒน์ เจิมจันทึก', id: '6' },
    { role: 'สมาชิก', name: 'กมลวิชย์ มูลเชื้อ', id: '4' },
    { role: 'สมาชิก', name: 'ติณภัทร์ พลับพลาไชย', id: '8' },
    { role: 'สมาชิก', name: 'อภิญญา นิยมส์ย์', id: '7' },
  ];

  return (
    <Layout>
      <div className="bg-card p-6 md:p-8 rounded-3xl border-b-8 border-card-border shadow-xl w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="flex items-center gap-4 mb-6">
          <div className="p-4 bg-secondary/20 rounded-full text-secondary">
            <Users className="w-8 h-8" />
          </div>
          <h1 className="text-3xl font-bold text-foreground tracking-tight">คณะผู้จัดทำ</h1>
        </div>

        <div className="mb-6 p-4 bg-muted rounded-2xl text-center">
          <p className="text-sm text-muted-foreground font-semibold mb-1">ครูผู้สอน</p>
          <p className="text-lg font-bold text-foreground">ครูวิเชียร</p>
          <p className="text-sm text-muted-foreground mt-2">รายวิชา ว30182</p>
          <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
            โรงเรียนทีปังกรวิทยาพัฒน์ (มัธยมวัดหัตถสารเกษตร)<br/>
            ในพระราชูปถัมภ์
          </p>
        </div>

        <div className="space-y-3 mb-8 max-h-[45vh] overflow-y-auto pr-2 custom-scrollbar">
          {members.map((m, i) => (
            <div key={i} className="flex items-center p-3 md:p-4 bg-muted rounded-2xl hover:bg-muted/80 transition-colors">
              <div className={`p-3 rounded-full mr-4 shadow-sm text-white ${m.role === 'หัวหน้าโครงการ' ? 'bg-yellow-500' : 'bg-primary'}`}>
                {m.role === 'หัวหน้าโครงการ' ? <Heart className="w-5 h-5" fill="currentColor" /> : <User className="w-5 h-5" />}
              </div>
              <div className="flex-1">
                <p className="text-xs md:text-sm font-semibold text-muted-foreground">{m.role}</p>
                <p className="text-lg md:text-xl font-bold text-foreground leading-tight">{m.name}</p>
              </div>
              <div className="bg-background px-3 py-1 rounded-full border border-border shadow-sm text-foreground font-mono font-bold text-sm">
                เลขที่ {m.id}
              </div>
            </div>
          ))}
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
