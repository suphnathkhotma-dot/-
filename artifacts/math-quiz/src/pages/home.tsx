import { Link } from 'wouter';
import { Calculator, Plus, Minus, X, Divide, Superscript, Sigma, Scale, Shuffle } from 'lucide-react';
import { useSettings } from '../hooks/use-settings';
import { Layout } from '../components/layout';

export default function Home() {
  const { playClick } = useSettings();

  const categories = [
    { id: '+', label: 'บวก', icon: Plus, color: 'text-green-500', bg: 'bg-green-100 dark:bg-green-950/50' },
    { id: '-', label: 'ลบ', icon: Minus, color: 'text-pink-500', bg: 'bg-pink-100 dark:bg-pink-950/50' },
    { id: 'x', label: 'คูณ', icon: X, color: 'text-blue-500', bg: 'bg-blue-100 dark:bg-blue-950/50' },
    { id: '÷', label: 'หาร', icon: Divide, color: 'text-orange-500', bg: 'bg-orange-100 dark:bg-orange-950/50' },
    { id: '^', label: 'เลขยกกำลัง', icon: Superscript, color: 'text-purple-500', bg: 'bg-purple-100 dark:bg-purple-950/50' },
    { id: 'sqrt', label: 'สแควรูท', icon: Sigma, color: 'text-teal-500', bg: 'bg-teal-100 dark:bg-teal-950/50' },
    { id: 'compare', label: 'เปรียบเทียบ', icon: Scale, color: 'text-rose-500', bg: 'bg-rose-100 dark:bg-rose-950/50' },
  ];

  return (
    <Layout>
      <div className="flex flex-col items-center gap-8 animate-in fade-in zoom-in duration-500">
        <div className="bg-card p-6 md:p-8 rounded-3xl border-b-8 border-card-border shadow-xl text-center w-full">
          <div className="flex justify-center mb-6">
            <div className="p-5 bg-primary/10 rounded-full animate-bounce text-primary">
              <Calculator size={56} strokeWidth={2.5} />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-3 drop-shadow-sm font-sans tracking-tight">
            เกมตอบคำถาม<br/>
            <span className="text-primary text-5xl md:text-6xl uppercase tracking-wider block mt-2">คณิตศาสตร์</span>
          </h1>
          <p className="text-muted-foreground text-lg mb-8">เลือกหมวดหมู่ที่ต้องการฝึกฝน</p>
          
          <div className="grid grid-cols-2 gap-4 w-full">
            {categories.map((cat) => (
              <Link 
                key={cat.id} 
                href={`/play?category=${encodeURIComponent(cat.id)}`}
                onClick={() => playClick()}
                className={`flex flex-col items-center justify-center py-6 px-4 rounded-2xl border-b-4 border-transparent shadow-sm hover:border-b-0 hover:translate-y-1 active:scale-95 transition-all ${cat.bg}`}
              >
                <cat.icon className={`w-9 h-9 mb-3 ${cat.color}`} strokeWidth={2.5} />
                <span className="text-lg font-bold text-foreground text-center leading-tight">{cat.label}</span>
              </Link>
            ))}
          </div>
          <Link
            href={`/play?category=mixed`}
            onClick={() => playClick()}
            className="mt-4 flex flex-row items-center justify-center gap-3 w-full p-5 rounded-2xl bg-primary text-primary-foreground border-b-4 border-primary-foreground/30 shadow-md hover:border-b-0 hover:translate-y-1 active:scale-95 transition-all"
          >
            <Shuffle className="w-7 h-7" strokeWidth={2.5} />
            <span className="text-2xl font-bold">เล่นทั้งหมด</span>
          </Link>
        </div>
      </div>
    </Layout>
  );
}
