import { Desk, Floor, AppNotification, UserProfile } from './types';

export const INITIAL_USER: UserProfile = {
  name: 'Alex Rivers',
  email: 'alex.rivers@uni.edu',
  studentId: '294021',
  departmentEn: 'Computer Science & AI',
  departmentTr: 'Bilgisayar Bilimi ve Yapay Zeka',
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
};

export const FLOORS: Floor[] = [
  { id: 'f0', number: 0, nameEn: 'Ground Floor', nameTr: 'Zemin Kat', quietAreaCount: 8, groupAreaCount: 6 },
  { id: 'f1', number: 1, nameEn: '1st Floor', nameTr: '1. Kat', quietAreaCount: 12, groupAreaCount: 4 },
  { id: 'f2', number: 2, nameEn: '2nd Floor', nameTr: '2. Kat', quietAreaCount: 15, groupAreaCount: 2 },
  { id: 'f3', number: 3, nameEn: '3rd Floor', nameTr: '3. Kat', quietAreaCount: 18, groupAreaCount: 0 },
];

export const DESKS: Desk[] = [
  // Ground floor desks (some quiet, some group/standard)
  { id: 'd0-12', number: 12, floorId: 'f0', status: 'available', type: 'quiet', hasPower: true, hasWindow: true, hasPrinterClose: true, hasRestroomClose: true, section: 'Quiet Study Area / Sessiz Çalışma', gridX: 3, gridY: 1 },
  { id: 'd0-4', number: 4, floorId: 'f0', status: 'occupied', type: 'standard', hasPower: false, hasWindow: true, hasPrinterClose: false, hasRestroomClose: true, section: 'Main Study Area / Ana Çalışma', gridX: 5, gridY: 1 },
  { id: 'd0-5', number: 5, floorId: 'f0', status: 'belongings', type: 'quiet', hasPower: true, hasWindow: false, hasPrinterClose: true, hasRestroomClose: false, section: 'Quiet Study Area / Sessiz Çalışma', gridX: 3, gridY: 3, estimatedReturnTime: '15 mins', belongingsDetectedAt: '6 mins ago' },
  { id: 'd0-10', number: 10, floorId: 'f0', status: 'available', type: 'quiet', hasPower: true, hasWindow: true, hasPrinterClose: false, hasRestroomClose: true, section: 'Quiet Study Area / Sessiz Çalışma', gridX: 1, gridY: 1 },
  { id: 'd0-24', number: 24, floorId: 'f0', status: 'occupied', type: 'group', hasPower: true, hasWindow: false, hasPrinterClose: true, hasRestroomClose: false, section: 'Group Study Area / Grup Çalışma', gridX: 7, gridY: 3 },
  { id: 'd0-7', number: 7, floorId: 'f0', status: 'out-of-service', type: 'standard', hasPower: true, hasWindow: false, hasPrinterClose: false, hasRestroomClose: true, section: 'Main Study Area / Ana Çalışma', gridX: 5, gridY: 3 },
  { id: 'd0-8', number: 8, floorId: 'f0', status: 'available', type: 'group', hasPower: true, hasWindow: true, hasPrinterClose: true, hasRestroomClose: true, section: 'Group Study Area / Grup Çalışma', gridX: 7, gridY: 1 },

  // Floor 1 desks
  { id: 'd1-1', number: 1, floorId: 'f1', status: 'available', type: 'quiet', hasPower: true, hasWindow: true, hasPrinterClose: false, hasRestroomClose: true, section: 'Section A - Window Study', gridX: 2, gridY: 1 },
  { id: 'd1-2', number: 2, floorId: 'f1', status: 'occupied', type: 'quiet', hasPower: true, hasWindow: true, hasPrinterClose: false, hasRestroomClose: true, section: 'Section A - Window Study', gridX: 4, gridY: 1 },
  { id: 'd1-3', number: 3, floorId: 'f1', status: 'belongings', type: 'standard', hasPower: false, hasWindow: false, hasPrinterClose: true, hasRestroomClose: true, section: 'Central Workspace', gridX: 2, gridY: 3, estimatedReturnTime: '10 mins', belongingsDetectedAt: '3 mins ago' },
  { id: 'd1-4', number: 4, floorId: 'f1', status: 'available', type: 'group', hasPower: true, hasWindow: false, hasPrinterClose: true, hasRestroomClose: false, section: 'Group Rooms', gridX: 6, gridY: 2 },
  { id: 'd1-5', number: 5, floorId: 'f1', status: 'occupied', type: 'standard', hasPower: true, hasWindow: true, hasPrinterClose: true, hasRestroomClose: true, section: 'Central Workspace', gridX: 4, gridY: 3 },

  // Floor 2 desks
  { id: 'd2-1', number: 1, floorId: 'f2', status: 'occupied', type: 'quiet', hasPower: true, hasWindow: true, hasPrinterClose: false, hasRestroomClose: true, section: 'Quiet Zone North', gridX: 2, gridY: 2 },
  { id: 'd2-2', number: 2, floorId: 'f2', status: 'available', type: 'quiet', hasPower: true, hasWindow: true, hasPrinterClose: false, hasRestroomClose: true, section: 'Quiet Zone North', gridX: 4, gridY: 2 },
  { id: 'd2-15', number: 15, floorId: 'f2', status: 'belongings', type: 'quiet', hasPower: true, hasWindow: false, hasPrinterClose: true, hasRestroomClose: true, section: 'Quiet Zone Central', gridX: 3, gridY: 4, estimatedReturnTime: '20 mins', belongingsDetectedAt: '12 mins ago' },
  { id: 'd2-6', number: 6, floorId: 'f2', status: 'out-of-service', type: 'standard', hasPower: false, hasWindow: true, hasPrinterClose: false, hasRestroomClose: true, section: 'Study Cubicles', gridX: 6, gridY: 1 },

  // Floor 3 desks
  { id: 'd3-1', number: 1, floorId: 'f3', status: 'available', type: 'quiet', hasPower: true, hasWindow: true, hasPrinterClose: true, hasRestroomClose: true, section: 'Silent Floor West', gridX: 1, gridY: 2 },
  { id: 'd3-2', number: 2, floorId: 'f3', status: 'available', type: 'quiet', hasPower: true, hasWindow: true, hasPrinterClose: true, hasRestroomClose: true, section: 'Silent Floor West', gridX: 3, gridY: 2 },
  { id: 'd3-3', number: 3, floorId: 'f3', status: 'occupied', type: 'quiet', hasPower: true, hasWindow: false, hasPrinterClose: false, hasRestroomClose: true, section: 'Silent Floor Central', gridX: 5, gridY: 2 },
  { id: 'd3-4', number: 4, floorId: 'f3', status: 'belongings', type: 'quiet', hasPower: true, hasWindow: true, hasPrinterClose: false, hasRestroomClose: false, section: 'Silent Floor Central', gridX: 3, gridY: 4, estimatedReturnTime: '25 mins', belongingsDetectedAt: '5 mins ago' },
];

export const INITIAL_NOTIFICATIONS: AppNotification[] = [
  {
    id: 'n1',
    titleEn: 'Desk 12 Watch Alert 🔔',
    titleTr: 'Masa 12 Durum Uyarısı 🔔',
    messageEn: 'Desk 12 on Ground Floor has just become fully available according to computer vision scanners!',
    messageTr: 'Zemin Kattaki 12 numaralı masa, bilgisayarlı görü kameralarına göre şu an tamamen boşaldı!',
    time: '2 mins ago',
    type: 'alert',
    read: false,
  },
  {
    id: 'n2',
    titleEn: 'Absence Warning ⚠️',
    titleTr: 'Masa Boş Bırakma Uyarısı ⚠️',
    messageEn: 'Your camera state is marked as "Belongings Only" on Desk 12. If you are absent for over 15 minutes, your desk reservation will expire and be released.',
    messageTr: '12 No\'lu masada sadece eşyalarınız tespit edildi. 15 dakikadan uzun süre dönmezseniz, masa kullanımı sonlandırılıp serbest kalacaktır.',
    time: '5 mins ago',
    type: 'alarm',
    read: false,
  },
  {
    id: 'n3',
    titleEn: 'Library Closing Notice 🕒',
    titleTr: 'Kütüphane Kapanış Duyurusu 🕒',
    messageEn: 'Central Library will close at 23:00 tonight. AI camera mapping services will shut down shortly after.',
    messageTr: 'Merkez Kütüphane bu akşam 23:00\'te kapanacaktır. Yapay zeka kamera tarama hizmetleri de ardından sonlandırılacaktır.',
    time: '2 hours ago',
    type: 'info',
    read: true,
  },
  {
    id: 'n4',
    titleEn: 'Staff announcement 📋',
    titleTr: 'Kütüphane Personeli Duyurusu 📋',
    messageEn: 'Group Room D is closed on Floor 1 for maintenance. Desks #22-#25 are temporarily unavailable.',
    messageTr: '1. Katta bulunan Grup Çalışma Odası D bakım nedeniyle kapalıdır. 22-25 No\'lu masalar geçici olarak servis dışı.',
    time: '1 day ago',
    type: 'info',
    read: true,
  }
];

export const FAQS = [
  {
    qEn: 'How does BookMyDesk track empty or filled spaces?',
    qTr: 'BookMyDesk boş veya dolu yerleri nasıl takip ediyor?',
    aEn: 'High-mount overhead cameras analyze desks in real-time. Our computer vision algorithm detects if a person is sitting (Occupied), if the space is clear (Available), or if objects like bags and laptops are present without a user (Belongings Detected, temporarily locked).',
    aTr: 'Tavana monte edilmiş yüksek çözünürlüklü kameralar, masaları gerçek zamanlı analiz eder. Bilgisayarlı görü algoritmamız sıradaki bireyin bulunup bulunmadığını (Dolu), alanın boş olduğunu (Boş) ya da kullanıcı olmadan çanta veya dizüstü bilgisayar gibi eşyaların bulunduğunu (Sadece Eşya Var, geçici olarak rezerve) tespit eder.'
  },
  {
    qEn: 'Why can I not book a desk from home?',
    qTr: 'Neden evden masa rezervasyonu yapamıyorum?',
    aEn: 'BookMyDesk is designed to promote active, immediate usage and prevent library seat squatting. You simply go to the library, look at the live status screen, find a clear green desk, walk over, and sit down! No pre-booking hassle or empty unused reservations.',
    aTr: 'BookMyDesk, kütüphane masalarının verimli kullanılmasını sağlamak ve haksız yer tutmaları engellemek için tasarlanmıştır. Kütüphaneye geldiğinizde anlık durumu kontrol edip yeşil renkli masalara doğrudan oturabilirsiniz. Önceden yapılıp kullanılmayan rezervasyon karmaşasını önler.'
  },
  {
    qEn: 'What is the "I\'m leaving temporarily" option?',
    qTr: '"Geçici olarak ayrılıyorum" seçeneği nedir?',
    aEn: 'If you need to grab a coffee or print a file, tap "I\'m leaving temporarily" in the My Desk tab. This signals the AI system to expect objects on your chair. You will get a 15-minute timer countdown to return before the desk space is flagged for public use.',
    aTr: 'Kahve almaya veya çıktı almaya gitmeniz gerekirse, "Masa" sekmesinde "Geçici Olarak Ayrılıyorum" butonuna dokunabilirsiniz. Bu, yapay zeka kamerasına koltuğunuzda eşya kalacağını bildirir. Masanız halka açılmadan önce geri dönmeniz için 15 dakikalık bir geri sayım sayacı başlar.'
  },
  {
    qEn: 'Does the system record video of me studying?',
    qTr: 'Sistem ders çalışırken videomu kaydediyor mu?',
    aEn: 'Absolutely not. The ceiling-mounted sensors process imagery strictly edge-on-device. It instantly translates shapes into low-fidelity occupancy statuses (0, 1, or 2) and deletes the frame. We respect your complete privacy.',
    aTr: 'Kesinlikle hayır. Tavana monte sensörler, görüntüleri tamamen cihaz üzerinde (edge-AI) işler. Görüntüyü anında düşük doğruluklu doluluk durumlarına (0, 1 veya 2) dönüştürür ve kareyi siler. Gizliliğinize tamamen saygı duyulmaktadır.'
  }
];
