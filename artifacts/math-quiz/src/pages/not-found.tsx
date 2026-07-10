import { Card, CardContent } from '@/components/ui/card';
import { AlertCircle } from 'lucide-react';
import { Link } from 'wouter';

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background px-4">
      <Card className="w-full max-w-md">
        <CardContent className="pt-6 text-center">
          <div className="flex flex-col items-center gap-3 mb-4">
            <AlertCircle className="h-10 w-10 text-destructive" />
            <h1 className="text-2xl font-bold text-foreground">
              ไม่พบหน้าที่คุณต้องการ
            </h1>
          </div>

          <p className="mt-2 text-sm text-muted-foreground">
            หน้านี้อาจถูกย้ายหรือไม่มีอยู่จริง ลองกลับไปที่หน้าแรกของเกม
          </p>

          <Link
            href="/"
            className="mt-6 inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground"
          >
            กลับหน้าแรก
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
