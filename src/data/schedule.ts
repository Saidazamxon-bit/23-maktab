export type ClassLevel = '5-sinf' | '6-sinf' | '7-sinf' | '8-sinf' | '9-sinf' | '10-sinf' | '11-sinf';

export interface ScheduleItem {
  time: string;
  subject: string;
  teacher: string;
  room: string;
}

export interface DaySchedule {
  day: string;
  lessons: ScheduleItem[];
}

export const scheduleByClass: Record<ClassLevel, DaySchedule[]> = {
  '5-sinf': [
    { day: 'Dushanba', lessons: [
      { time: '08:00 — 08:45', subject: 'Matematika', teacher: 'Dilnoza Karimova', room: 'A-204' },
      { time: '09:00 — 09:45', subject: 'Ona tili', teacher: 'Nargiza Rakhimova', room: 'B-101' },
      { time: '10:00 — 10:45', subject: 'Informatika', teacher: 'Muhammadjon Samadov', room: 'IT-12' },
    ] },
    { day: 'Seshanba', lessons: [
      { time: '08:00 — 08:45', subject: 'Tarix', teacher: 'Shaxnoza Ergasheva', room: 'C-305' },
      { time: '09:00 — 09:45', subject: 'Ingliz tili', teacher: 'Javohir Toshmatov', room: 'B-205' },
      { time: '10:00 — 10:45', subject: 'Matematika', teacher: 'Akbar Mavlonov', room: 'A-204' },
    ] },
    { day: 'Chorshanba', lessons: [
      { time: '08:00 — 08:45', subject: 'Ona tili', teacher: 'Nargiza Rakhimova', room: 'B-101' },
      { time: '09:00 — 09:45', subject: 'Matematika', teacher: 'Dilnoza Karimova', room: 'A-204' },
      { time: '10:00 — 10:45', subject: 'Informatika', teacher: 'Muhammadjon Samadov', room: 'IT-12' },
    ] },
  ],
  '6-sinf': [
    { day: 'Dushanba', lessons: [
      { time: '08:00 — 08:45', subject: 'Matematika', teacher: 'Dilnoza Karimova', room: 'A-204' },
      { time: '09:00 — 09:45', subject: 'Tarix', teacher: 'Shaxnoza Ergasheva', room: 'C-305' },
      { time: '10:00 — 10:45', subject: 'Ingliz tili', teacher: 'Javohir Toshmatov', room: 'B-205' },
    ] },
    { day: 'Payshanba', lessons: [
      { time: '08:00 — 08:45', subject: 'Informatika', teacher: 'Muhammadjon Samadov', room: 'IT-12' },
      { time: '09:00 — 09:45', subject: 'Ona tili', teacher: 'Nargiza Rakhimova', room: 'B-101' },
      { time: '10:00 — 10:45', subject: 'Matematika', teacher: 'Akbar Mavlonov', room: 'A-204' },
    ] },
    { day: 'Juma', lessons: [
      { time: '08:00 — 08:45', subject: 'Tarix', teacher: 'Shaxnoza Ergasheva', room: 'C-305' },
      { time: '09:00 — 09:45', subject: 'Ingliz tili', teacher: 'Javohir Toshmatov', room: 'B-205' },
      { time: '10:00 — 10:45', subject: 'Matematika', teacher: 'Dilnoza Karimova', room: 'A-204' },
    ] },
  ],
  '7-sinf': [
    { day: 'Dushanba', lessons: [
      { time: '08:00 — 08:45', subject: 'Fizika', teacher: 'Azizbek Yusupov', room: 'C-310' },
      { time: '09:00 — 09:45', subject: 'Matematika', teacher: 'Akbar Mavlonov', room: 'A-204' },
      { time: '10:00 — 10:45', subject: 'Ona tili', teacher: 'Nargiza Rakhimova', room: 'B-101' },
    ] },
    { day: 'Seshanba', lessons: [
      { time: '08:00 — 08:45', subject: 'Informatika', teacher: 'Muhammadjon Samadov', room: 'IT-12' },
      { time: '09:00 — 09:45', subject: 'Ingliz tili', teacher: 'Javohir Toshmatov', room: 'B-205' },
      { time: '10:00 — 10:45', subject: 'Tarix', teacher: 'Shaxnoza Ergasheva', room: 'C-305' },
    ] },
    { day: 'Payshanba', lessons: [
      { time: '08:00 — 08:45', subject: 'Matematika', teacher: 'Dilnoza Karimova', room: 'A-204' },
      { time: '09:00 — 09:45', subject: 'Ona tili', teacher: 'Nargiza Rakhimova', room: 'B-101' },
      { time: '10:00 — 10:45', subject: 'Informatika', teacher: 'Muhammadjon Samadov', room: 'IT-12' },
    ] },
  ],
  '8-sinf': [
    { day: 'Dushanba', lessons: [
      { time: '08:00 — 08:45', subject: 'Kimyo', teacher: 'Malika Akhmedova', room: 'C-220' },
      { time: '09:00 — 09:45', subject: 'Matematika', teacher: 'Akbar Mavlonov', room: 'A-204' },
      { time: '10:00 — 10:45', subject: 'Ingliz tili', teacher: 'Javohir Toshmatov', room: 'B-205' },
    ] },
    { day: 'Chorshanba', lessons: [
      { time: '08:00 — 08:45', subject: 'Tarix', teacher: 'Shaxnoza Ergasheva', room: 'C-305' },
      { time: '09:00 — 09:45', subject: 'Informatika', teacher: 'Muhammadjon Samadov', room: 'IT-12' },
      { time: '10:00 — 10:45', subject: 'Ona tili', teacher: 'Nargiza Rakhimova', room: 'B-101' },
    ] },
    { day: 'Juma', lessons: [
      { time: '08:00 — 08:45', subject: 'Matematika', teacher: 'Dilnoza Karimova', room: 'A-204' },
      { time: '09:00 — 09:45', subject: 'Fizika', teacher: 'Azizbek Yusupov', room: 'C-310' },
      { time: '10:00 — 10:45', subject: 'Ingliz tili', teacher: 'Javohir Toshmatov', room: 'B-205' },
    ] },
  ],
  '9-sinf': [
    { day: 'Dushanba', lessons: [
      { time: '08:00 — 08:45', subject: 'Informatika', teacher: 'Muhammadjon Samadov', room: 'IT-12' },
      { time: '09:00 — 09:45', subject: 'Matematika', teacher: 'Akbar Mavlonov', room: 'A-204' },
      { time: '10:00 — 10:45', subject: 'Tarix', teacher: 'Shaxnoza Ergasheva', room: 'C-305' },
    ] },
    { day: 'Seshanba', lessons: [
      { time: '08:00 — 08:45', subject: 'Ingliz tili', teacher: 'Javohir Toshmatov', room: 'B-205' },
      { time: '09:00 — 09:45', subject: 'Ona tili', teacher: 'Nargiza Rakhimova', room: 'B-101' },
      { time: '10:00 — 10:45', subject: 'Fizika', teacher: 'Azizbek Yusupov', room: 'C-310' },
    ] },
    { day: 'Chorshanba', lessons: [
      { time: '08:00 — 08:45', subject: 'Matematika', teacher: 'Dilnoza Karimova', room: 'A-204' },
      { time: '09:00 — 09:45', subject: 'Tarix', teacher: 'Shaxnoza Ergasheva', room: 'C-305' },
      { time: '10:00 — 10:45', subject: 'Informatika', teacher: 'Muhammadjon Samadov', room: 'IT-12' },
    ] },
  ],
  '10-sinf': [
    { day: 'Dushanba', lessons: [
      { time: '08:00 — 08:45', subject: 'Matematika', teacher: 'Akbar Mavlonov', room: 'A-204' },
      { time: '09:00 — 09:45', subject: 'Ingliz tili', teacher: 'Javohir Toshmatov', room: 'B-205' },
      { time: '10:00 — 10:45', subject: 'Fizika', teacher: 'Azizbek Yusupov', room: 'C-310' },
    ] },
    { day: 'Payshanba', lessons: [
      { time: '08:00 — 08:45', subject: 'Informatika', teacher: 'Muhammadjon Samadov', room: 'IT-12' },
      { time: '09:00 — 09:45', subject: 'Ona tili', teacher: 'Nargiza Rakhimova', room: 'B-101' },
      { time: '10:00 — 10:45', subject: 'Tarix', teacher: 'Shaxnoza Ergasheva', room: 'C-305' },
    ] },
    { day: 'Juma', lessons: [
      { time: '08:00 — 08:45', subject: 'Matematika', teacher: 'Dilnoza Karimova', room: 'A-204' },
      { time: '09:00 — 09:45', subject: 'Ingliz tili', teacher: 'Javohir Toshmatov', room: 'B-205' },
      { time: '10:00 — 10:45', subject: 'Informatika', teacher: 'Muhammadjon Samadov', room: 'IT-12' },
    ] },
  ],
  '11-sinf': [
    { day: 'Dushanba', lessons: [
      { time: '08:00 — 08:45', subject: 'Matematika', teacher: 'Akbar Mavlonov', room: 'A-204' },
      { time: '09:00 — 09:45', subject: 'Ingliz tili', teacher: 'Javohir Toshmatov', room: 'B-205' },
      { time: '10:00 — 10:45', subject: 'Tarix', teacher: 'Shaxnoza Ergasheva', room: 'C-305' },
    ] },
    { day: 'Seshanba', lessons: [
      { time: '08:00 — 08:45', subject: 'Fizika', teacher: 'Azizbek Yusupov', room: 'C-310' },
      { time: '09:00 — 09:45', subject: 'Informatika', teacher: 'Muhammadjon Samadov', room: 'IT-12' },
      { time: '10:00 — 10:45', subject: 'Ona tili', teacher: 'Nargiza Rakhimova', room: 'B-101' },
    ] },
    { day: 'Juma', lessons: [
      { time: '08:00 — 08:45', subject: 'Matematika', teacher: 'Dilnoza Karimova', room: 'A-204' },
      { time: '09:00 — 09:45', subject: 'Tarix', teacher: 'Shaxnoza Ergasheva', room: 'C-305' },
      { time: '10:00 — 10:45', subject: 'Ingliz tili', teacher: 'Javohir Toshmatov', room: 'B-205' },
    ] },
  ],
}

export const classLevels: ClassLevel[] = ['5-sinf', '6-sinf', '7-sinf', '8-sinf', '9-sinf', '10-sinf', '11-sinf']
