import { Student, AttendanceRecord, GeofenceConfig } from '../types';

export const MADRASAH_INFO = {
  name: 'MAN 1 Boyolali',
  subtitle: 'Madrasah Aliyah Negeri 1 Boyolali',
  motto: 'Mandiri Berprestasi, Religius & Berakhlakul Karimah',
  address: 'Jl. Kates No. 34, Siswodipuran, Kec. Boyolali, Kabupaten Boyolali, Jawa Tengah 57311',
  tahunAjaran: '2026 / 2027',
  totalSiswa: 1041,
  totalLakiLaki: 351,
  totalPerempuan: 690,
};

// Lokasi Kompleks MAN 1 Boyolali (Jl. Kates No. 34, Siswodipuran - Ruang Kelas, Mushola, & Gedung Madrasah)
export const DEFAULT_GEOFENCE: GeofenceConfig = {
  latitude: -7.540982,
  longitude: 110.599143,
  radiusMeters: 600,
  locationName: 'MAN 1 Boyolali (Ruang Kelas & Fasilitas Madrasah)',
};

export const CLASSES = [
  // Kelas X (X A s.d. X J)
  'X A', 'X B', 'X C', 'X D', 'X E', 'X F', 'X G', 'X H', 'X I', 'X J',
  // Kelas XI (XI A s.d. XI J)
  'XI A', 'XI B', 'XI C', 'XI D', 'XI E', 'XI F', 'XI G', 'XI H', 'XI I', 'XI J',
  // Kelas XII (XII A s.d. XII J)
  'XII A', 'XII B', 'XII C', 'XII D', 'XII E', 'XII F', 'XII G', 'XII H', 'XII I', 'XII J',
];

export const PRAYER_TIME_CONFIG: Record<string, { startHour: number; startMinute: number; endHour: number; endMinute: number }> = {
  'Dhuha': { startHour: 6, startMinute: 55, endHour: 7, endMinute: 15 },
  'Dzuhur': { startHour: 11, startMinute: 40, endHour: 12, endMinute: 15 },
};

export const INITIAL_STUDENTS: Student[] = [
  {
    "id": "13808",
    "nisn": "13808",
    "name": "Adelia Pramadipta Putri Purwanto",
    "class": "X A",
    "gender": "P"
  },
  {
    "id": "13809",
    "nisn": "13809",
    "name": "Ainunnisha Sulistyaningrum",
    "class": "X A",
    "gender": "P"
  },
  {
    "id": "13810",
    "nisn": "13810",
    "name": "Aisha Aly Ramadhani",
    "class": "X A",
    "gender": "P"
  },
  {
    "id": "13811",
    "nisn": "13811",
    "name": "Aissyah Trihani Larasati",
    "class": "X A",
    "gender": "P"
  },
  {
    "id": "13812",
    "nisn": "13812",
    "name": "Alfriza Novalingga Herlambang",
    "class": "X A",
    "gender": "L"
  },
  {
    "id": "13813",
    "nisn": "13813",
    "name": "Althaf Nehan Azka Muazam",
    "class": "X A",
    "gender": "L"
  },
  {
    "id": "13814",
    "nisn": "13814",
    "name": "Asyifa Fitria Ramadhani",
    "class": "X A",
    "gender": "P"
  },
  {
    "id": "13815",
    "nisn": "13815",
    "name": "Aulia Rohmah",
    "class": "X A",
    "gender": "P"
  },
  {
    "id": "13816",
    "nisn": "13816",
    "name": "Ayu Salsabila",
    "class": "X A",
    "gender": "P"
  },
  {
    "id": "13817",
    "nisn": "13817",
    "name": "Azzam Dwiky Budiarto",
    "class": "X A",
    "gender": "L"
  },
  {
    "id": "13818",
    "nisn": "13818",
    "name": "Carissa Zahro Nuraini",
    "class": "X A",
    "gender": "P"
  },
  {
    "id": "13819",
    "nisn": "13819",
    "name": "Citra Kasih Fairusy Hanifah",
    "class": "X A",
    "gender": "P"
  },
  {
    "id": "13820",
    "nisn": "13820",
    "name": "Farissa Mujahidah",
    "class": "X A",
    "gender": "P"
  },
  {
    "id": "13821",
    "nisn": "13821",
    "name": "Fatika Azaria Zhaida",
    "class": "X A",
    "gender": "P"
  },
  {
    "id": "13822",
    "nisn": "13822",
    "name": "Finza Quds Dzaki",
    "class": "X A",
    "gender": "P"
  },
  {
    "id": "13823",
    "nisn": "13823",
    "name": "Fiorenza Ramadhani Damar Kinanthi",
    "class": "X A",
    "gender": "P"
  },
  {
    "id": "13824",
    "nisn": "13824",
    "name": "Haidar Dzakwan Satya Krida",
    "class": "X A",
    "gender": "L"
  },
  {
    "id": "13825",
    "nisn": "13825",
    "name": "Ilham Aditya Putra",
    "class": "X A",
    "gender": "L"
  },
  {
    "id": "13826",
    "nisn": "13826",
    "name": "Kaleela Adhalia Sahrazade",
    "class": "X A",
    "gender": "P"
  },
  {
    "id": "13827",
    "nisn": "13827",
    "name": "M. Alex Fauzi",
    "class": "X A",
    "gender": "L"
  },
  {
    "id": "13828",
    "nisn": "13828",
    "name": "Maharatih Sri Kameswara Hasti",
    "class": "X A",
    "gender": "P"
  },
  {
    "id": "13829",
    "nisn": "13829",
    "name": "Mufidah Nurul Khasanah",
    "class": "X A",
    "gender": "P"
  },
  {
    "id": "13830",
    "nisn": "13830",
    "name": "Muhammad 'Abidurrahman Abrisam",
    "class": "X A",
    "gender": "L"
  },
  {
    "id": "13831",
    "nisn": "13831",
    "name": "Muhammad 'Athourroja' Imdadurrohman",
    "class": "X A",
    "gender": "L"
  },
  {
    "id": "13832",
    "nisn": "13832",
    "name": "Muhammad Fadhil El Zhar",
    "class": "X A",
    "gender": "L"
  },
  {
    "id": "13833",
    "nisn": "13833",
    "name": "Naaila Mufidah Khoiriyah",
    "class": "X A",
    "gender": "P"
  },
  {
    "id": "13834",
    "nisn": "13834",
    "name": "Nurussifa Septiana",
    "class": "X A",
    "gender": "P"
  },
  {
    "id": "13835",
    "nisn": "13835",
    "name": "Putri Sekar Ramadani",
    "class": "X A",
    "gender": "P"
  },
  {
    "id": "13836",
    "nisn": "13836",
    "name": "Renanda Caesari Widodo",
    "class": "X A",
    "gender": "P"
  },
  {
    "id": "13837",
    "nisn": "13837",
    "name": "Salma Hanuntia Pradani",
    "class": "X A",
    "gender": "P"
  },
  {
    "id": "13838",
    "nisn": "13838",
    "name": "Shaquila Audrey Rasieka Ramadhani",
    "class": "X A",
    "gender": "P"
  },
  {
    "id": "13839",
    "nisn": "13839",
    "name": "Sofiyyah Rosyida",
    "class": "X A",
    "gender": "P"
  },
  {
    "id": "13840",
    "nisn": "13840",
    "name": "Syarifah Prastika Utama",
    "class": "X A",
    "gender": "P"
  },
  {
    "id": "13841",
    "nisn": "13841",
    "name": "Tasnim As Shofi",
    "class": "X A",
    "gender": "P"
  },
  {
    "id": "13842",
    "nisn": "13842",
    "name": "Thaliska Annisa Yuliasti",
    "class": "X A",
    "gender": "P"
  },
  {
    "id": "13843",
    "nisn": "13843",
    "name": "Yusuf Sukma Ningrat",
    "class": "X A",
    "gender": "L"
  },
  {
    "id": "13844",
    "nisn": "13844",
    "name": "Aira Chusna Ayu Noor",
    "class": "X B",
    "gender": "P"
  },
  {
    "id": "13845",
    "nisn": "13845",
    "name": "Ana Altafun Nisa",
    "class": "X B",
    "gender": "P"
  },
  {
    "id": "13846",
    "nisn": "13846",
    "name": "Andrea Chalista Putri",
    "class": "X B",
    "gender": "P"
  },
  {
    "id": "13847",
    "nisn": "13847",
    "name": "Anggie Riri Rahayu",
    "class": "X B",
    "gender": "P"
  },
  {
    "id": "13848",
    "nisn": "13848",
    "name": "Anindita Khoiruniswa Pranoto",
    "class": "X B",
    "gender": "P"
  },
  {
    "id": "13849",
    "nisn": "13849",
    "name": "Azalia Fatimah Az-Zahra",
    "class": "X B",
    "gender": "P"
  },
  {
    "id": "13850",
    "nisn": "13850",
    "name": "Boby Djohan Arjuna Dziqri",
    "class": "X B",
    "gender": "L"
  },
  {
    "id": "13851",
    "nisn": "13851",
    "name": "Dicky Alamsyah Putra",
    "class": "X B",
    "gender": "L"
  },
  {
    "id": "13852",
    "nisn": "13852",
    "name": "Elena Agustina Putri",
    "class": "X B",
    "gender": "P"
  },
  {
    "id": "13853",
    "nisn": "13853",
    "name": "Elsa Fatika Adhiputri",
    "class": "X B",
    "gender": "P"
  },
  {
    "id": "13854",
    "nisn": "13854",
    "name": "Elvaza Jibril Prasetyo",
    "class": "X B",
    "gender": "L"
  },
  {
    "id": "13855",
    "nisn": "13855",
    "name": "Eq Najia Faiz",
    "class": "X B",
    "gender": "L"
  },
  {
    "id": "13856",
    "nisn": "13856",
    "name": "Faizatuz Zahwa",
    "class": "X B",
    "gender": "P"
  },
  {
    "id": "13857",
    "nisn": "13857",
    "name": "Ghibran Nur Shodiq",
    "class": "X B",
    "gender": "L"
  },
  {
    "id": "13858",
    "nisn": "13858",
    "name": "Gilang Nur Sulistyo",
    "class": "X B",
    "gender": "L"
  },
  {
    "id": "13859",
    "nisn": "13859",
    "name": "Iqbal Asha Prasetyo",
    "class": "X B",
    "gender": "L"
  },
  {
    "id": "13860",
    "nisn": "13860",
    "name": "Irsyaad Fauzi Aswangga",
    "class": "X B",
    "gender": "L"
  },
  {
    "id": "13861",
    "nisn": "13861",
    "name": "Jasmine Alya Nadhifah",
    "class": "X B",
    "gender": "P"
  },
  {
    "id": "13862",
    "nisn": "13862",
    "name": "Keyla Azela Atnawati",
    "class": "X B",
    "gender": "P"
  },
  {
    "id": "13863",
    "nisn": "13863",
    "name": "Khansa Pertiwi Adhithia",
    "class": "X B",
    "gender": "P"
  },
  {
    "id": "13864",
    "nisn": "13864",
    "name": "Luthfia Ghina Aqilah",
    "class": "X B",
    "gender": "P"
  },
  {
    "id": "13865",
    "nisn": "13865",
    "name": "Malika Aurora Nur Rahmawati",
    "class": "X B",
    "gender": "P"
  },
  {
    "id": "13866",
    "nisn": "13866",
    "name": "Neysha Nurvita Sari",
    "class": "X B",
    "gender": "P"
  },
  {
    "id": "13867",
    "nisn": "13867",
    "name": "Olyvia Ristanigrum",
    "class": "X B",
    "gender": "P"
  },
  {
    "id": "13868",
    "nisn": "13868",
    "name": "Putri Anindita",
    "class": "X B",
    "gender": "P"
  },
  {
    "id": "13869",
    "nisn": "13869",
    "name": "Raisya Fadilla Husna",
    "class": "X B",
    "gender": "P"
  },
  {
    "id": "13870",
    "nisn": "13870",
    "name": "Sabrina Ardelia Rahman",
    "class": "X B",
    "gender": "P"
  },
  {
    "id": "13871",
    "nisn": "13871",
    "name": "Satrio Putra Santosa",
    "class": "X B",
    "gender": "L"
  },
  {
    "id": "13872",
    "nisn": "13872",
    "name": "Shofia Linda Jatmiko",
    "class": "X B",
    "gender": "P"
  },
  {
    "id": "13873",
    "nisn": "13873",
    "name": "Talitha Mahirah Sakhi",
    "class": "X B",
    "gender": "P"
  },
  {
    "id": "13874",
    "nisn": "13874",
    "name": "Valeska Athasaskya Hapsari",
    "class": "X B",
    "gender": "P"
  },
  {
    "id": "13875",
    "nisn": "13875",
    "name": "Vesil Aulia Putri",
    "class": "X B",
    "gender": "P"
  },
  {
    "id": "13876",
    "nisn": "13876",
    "name": "Viola Maulidiaz Zahwa Safana",
    "class": "X B",
    "gender": "P"
  },
  {
    "id": "13877",
    "nisn": "13877",
    "name": "Wahyu Hafizah Aqilah Nugraha",
    "class": "X B",
    "gender": "P"
  },
  {
    "id": "13878",
    "nisn": "13878",
    "name": "Zidna Yanayira Hasan",
    "class": "X B",
    "gender": "P"
  },
  {
    "id": "13879",
    "nisn": "13879",
    "name": "Zulkarnaen Al Ayyubi",
    "class": "X B",
    "gender": "L"
  },
  {
    "id": "13880",
    "nisn": "13880",
    "name": "Adhelya Queen Latifa",
    "class": "X C",
    "gender": "P"
  },
  {
    "id": "13881",
    "nisn": "13881",
    "name": "Adzkia Zukhrufy Fitriyana",
    "class": "X C",
    "gender": "P"
  },
  {
    "id": "13882",
    "nisn": "13882",
    "name": "Ahmad Hanung Raharjo",
    "class": "X C",
    "gender": "L"
  },
  {
    "id": "13883",
    "nisn": "13883",
    "name": "Aisyah Muna Luthfiah Al Aqiilah",
    "class": "X C",
    "gender": "P"
  },
  {
    "id": "13884",
    "nisn": "13884",
    "name": "Allisha Maura Azzalea",
    "class": "X C",
    "gender": "P"
  },
  {
    "id": "13885",
    "nisn": "13885",
    "name": "Althafia Prameswati",
    "class": "X C",
    "gender": "P"
  },
  {
    "id": "13886",
    "nisn": "13886",
    "name": "Althafunnisa Ramadhani",
    "class": "X C",
    "gender": "P"
  },
  {
    "id": "13887",
    "nisn": "13887",
    "name": "Amelia Dinda Pratista",
    "class": "X C",
    "gender": "P"
  },
  {
    "id": "13888",
    "nisn": "13888",
    "name": "Arifah Farah Azzahro",
    "class": "X C",
    "gender": "P"
  },
  {
    "id": "13889",
    "nisn": "13889",
    "name": "Arini Karini Putri",
    "class": "X C",
    "gender": "P"
  },
  {
    "id": "13890",
    "nisn": "13890",
    "name": "Azzahra Aqhila Irtanto",
    "class": "X C",
    "gender": "P"
  },
  {
    "id": "14162",
    "nisn": "14162",
    "name": "Badi'atul Husna",
    "class": "X C",
    "gender": "P"
  },
  {
    "id": "13891",
    "nisn": "13891",
    "name": "De Ana Syaza Fauziah",
    "class": "X C",
    "gender": "P"
  },
  {
    "id": "13892",
    "nisn": "13892",
    "name": "Dian Putma Yunita",
    "class": "X C",
    "gender": "P"
  },
  {
    "id": "13893",
    "nisn": "13893",
    "name": "Dimas Rafi Arifianto",
    "class": "X C",
    "gender": "L"
  },
  {
    "id": "13894",
    "nisn": "13894",
    "name": "Dini Rahmadhani",
    "class": "X C",
    "gender": "P"
  },
  {
    "id": "13895",
    "nisn": "13895",
    "name": "Diva Afrida Sukma",
    "class": "X C",
    "gender": "P"
  },
  {
    "id": "13896",
    "nisn": "13896",
    "name": "Eka Nurlaela",
    "class": "X C",
    "gender": "P"
  },
  {
    "id": "13897",
    "nisn": "13897",
    "name": "Enjelia Damayanti",
    "class": "X C",
    "gender": "P"
  },
  {
    "id": "13898",
    "nisn": "13898",
    "name": "Faeyza Halwa Nurlasiliya",
    "class": "X C",
    "gender": "P"
  },
  {
    "id": "13899",
    "nisn": "13899",
    "name": "Faranisa Oktaviani",
    "class": "X C",
    "gender": "P"
  },
  {
    "id": "13900",
    "nisn": "13900",
    "name": "Hanifa Rhea Fauziah",
    "class": "X C",
    "gender": "P"
  },
  {
    "id": "13901",
    "nisn": "13901",
    "name": "Lyliana Devinda Kusumaningrum",
    "class": "X C",
    "gender": "P"
  },
  {
    "id": "13902",
    "nisn": "13902",
    "name": "Mochammad Athar Ghassani",
    "class": "X C",
    "gender": "L"
  },
  {
    "id": "13903",
    "nisn": "13903",
    "name": "Muhammad Fakhri Afif",
    "class": "X C",
    "gender": "L"
  },
  {
    "id": "13904",
    "nisn": "13904",
    "name": "Muhammad Guntur Syaifullah",
    "class": "X C",
    "gender": "L"
  },
  {
    "id": "13905",
    "nisn": "13905",
    "name": "Muhammad Iqbal Nurdiansyah",
    "class": "X C",
    "gender": "L"
  },
  {
    "id": "13906",
    "nisn": "13906",
    "name": "Muhammad Toni Octavian",
    "class": "X C",
    "gender": "L"
  },
  {
    "id": "13907",
    "nisn": "13907",
    "name": "Muhammad Zein Triatmaja",
    "class": "X C",
    "gender": "L"
  },
  {
    "id": "13908",
    "nisn": "13908",
    "name": "Mumtaza Ashmaul Karima",
    "class": "X C",
    "gender": "P"
  },
  {
    "id": "13909",
    "nisn": "13909",
    "name": "Nabila Sofwah Az-Zahra",
    "class": "X C",
    "gender": "P"
  },
  {
    "id": "13910",
    "nisn": "13910",
    "name": "Nafinzha Augistia Mutiara Hastomo",
    "class": "X C",
    "gender": "P"
  },
  {
    "id": "13911",
    "nisn": "13911",
    "name": "Pradana Berlian Cahya Saputra",
    "class": "X C",
    "gender": "L"
  },
  {
    "id": "13912",
    "nisn": "13912",
    "name": "Rhahma Agustina",
    "class": "X C",
    "gender": "P"
  },
  {
    "id": "13913",
    "nisn": "13913",
    "name": "Tiara Dewi Purnama",
    "class": "X C",
    "gender": "P"
  },
  {
    "id": "13914",
    "nisn": "13914",
    "name": "Yussuf Adrian Widianto",
    "class": "X C",
    "gender": "L"
  },
  {
    "id": "13915",
    "nisn": "13915",
    "name": "Ahmad Faisal",
    "class": "X D",
    "gender": "L"
  },
  {
    "id": "13916",
    "nisn": "13916",
    "name": "Alan Satria Ardilang",
    "class": "X D",
    "gender": "L"
  },
  {
    "id": "13917",
    "nisn": "13917",
    "name": "Alma Fausta Vica Amoret",
    "class": "X D",
    "gender": "L"
  },
  {
    "id": "13918",
    "nisn": "13918",
    "name": "Anik Rahmawati",
    "class": "X D",
    "gender": "P"
  },
  {
    "id": "13919",
    "nisn": "13919",
    "name": "Aryun Asyfiyatul Mufidah",
    "class": "X D",
    "gender": "P"
  },
  {
    "id": "13920",
    "nisn": "13920",
    "name": "Asyifa Firyal Adeliana",
    "class": "X D",
    "gender": "P"
  },
  {
    "id": "13921",
    "nisn": "13921",
    "name": "Aurel Putri Anggraini",
    "class": "X D",
    "gender": "P"
  },
  {
    "id": "13922",
    "nisn": "13922",
    "name": "Diandra Paramita",
    "class": "X D",
    "gender": "P"
  },
  {
    "id": "13923",
    "nisn": "13923",
    "name": "Fauzan Ahmad Aqila",
    "class": "X D",
    "gender": "L"
  },
  {
    "id": "13924",
    "nisn": "13924",
    "name": "Grovani Aulia Mareta",
    "class": "X D",
    "gender": "P"
  },
  {
    "id": "13925",
    "nisn": "13925",
    "name": "Indrasta Tian Adhany Akbar",
    "class": "X D",
    "gender": "L"
  },
  {
    "id": "13926",
    "nisn": "13926",
    "name": "Irfan Satya Anggara",
    "class": "X D",
    "gender": "L"
  },
  {
    "id": "13927",
    "nisn": "13927",
    "name": "Jasmine Uzma Assyahidah",
    "class": "X D",
    "gender": "P"
  },
  {
    "id": "13928",
    "nisn": "13928",
    "name": "Kafa Billahi Wakila",
    "class": "X D",
    "gender": "P"
  },
  {
    "id": "13929",
    "nisn": "13929",
    "name": "Kaira Franzet Sahquita",
    "class": "X D",
    "gender": "P"
  },
  {
    "id": "13930",
    "nisn": "13930",
    "name": "Khaira Althafunnisa",
    "class": "X D",
    "gender": "P"
  },
  {
    "id": "13931",
    "nisn": "13931",
    "name": "Leny Nur Kholifah",
    "class": "X D",
    "gender": "P"
  },
  {
    "id": "13932",
    "nisn": "13932",
    "name": "Livia Claresta Nugraha",
    "class": "X D",
    "gender": "P"
  },
  {
    "id": "13933",
    "nisn": "13933",
    "name": "Mudmainah Hidayanti",
    "class": "X D",
    "gender": "P"
  },
  {
    "id": "13934",
    "nisn": "13934",
    "name": "Nabil Muhammad Falah",
    "class": "X D",
    "gender": "L"
  },
  {
    "id": "13935",
    "nisn": "13935",
    "name": "Nabila Narfa Zahra",
    "class": "X D",
    "gender": "P"
  },
  {
    "id": "13936",
    "nisn": "13936",
    "name": "Naila Nindi Asheeqa",
    "class": "X D",
    "gender": "P"
  },
  {
    "id": "13937",
    "nisn": "13937",
    "name": "Neyla Cahya Tarisya",
    "class": "X D",
    "gender": "P"
  },
  {
    "id": "13938",
    "nisn": "13938",
    "name": "Rafa Galih Para Mudia",
    "class": "X D",
    "gender": "L"
  },
  {
    "id": "13939",
    "nisn": "13939",
    "name": "Ravika Linda Sholehah",
    "class": "X D",
    "gender": "P"
  },
  {
    "id": "13940",
    "nisn": "13940",
    "name": "Risma Fadilla",
    "class": "X D",
    "gender": "P"
  },
  {
    "id": "13941",
    "nisn": "13941",
    "name": "Salwa Nur Azizah",
    "class": "X D",
    "gender": "P"
  },
  {
    "id": "13942",
    "nisn": "13942",
    "name": "Sampoerna Pandu Negara",
    "class": "X D",
    "gender": "L"
  },
  {
    "id": "13943",
    "nisn": "13943",
    "name": "Shayna Zara Nafisah",
    "class": "X D",
    "gender": "P"
  },
  {
    "id": "13944",
    "nisn": "13944",
    "name": "Sinta Azzahra Miftachul Jannah",
    "class": "X D",
    "gender": "P"
  },
  {
    "id": "13945",
    "nisn": "13945",
    "name": "Sitaresmi Novianita",
    "class": "X D",
    "gender": "P"
  },
  {
    "id": "13946",
    "nisn": "13946",
    "name": "Yahya Zaul Utama",
    "class": "X D",
    "gender": "L"
  },
  {
    "id": "13947",
    "nisn": "13947",
    "name": "Yasmin Aulia Adinar",
    "class": "X D",
    "gender": "P"
  },
  {
    "id": "13948",
    "nisn": "13948",
    "name": "Zakiya Talita Sakhi",
    "class": "X D",
    "gender": "P"
  },
  {
    "id": "13949",
    "nisn": "13949",
    "name": "Zhavira Azizah Hidayana",
    "class": "X D",
    "gender": "P"
  },
  {
    "id": "13950",
    "nisn": "13950",
    "name": "Zilda Salsabila Putri",
    "class": "X D",
    "gender": "P"
  },
  {
    "id": "13951",
    "nisn": "13951",
    "name": "Adib Surya Permana",
    "class": "X E",
    "gender": "L"
  },
  {
    "id": "13952",
    "nisn": "13952",
    "name": "Ali Nugroho",
    "class": "X E",
    "gender": "L"
  },
  {
    "id": "13953",
    "nisn": "13953",
    "name": "Alif Fahrur Rozi",
    "class": "X E",
    "gender": "L"
  },
  {
    "id": "13954",
    "nisn": "13954",
    "name": "Alya Rafidah",
    "class": "X E",
    "gender": "P"
  },
  {
    "id": "13955",
    "nisn": "13955",
    "name": "Anugrah Akbar Ismail Al Iqbal",
    "class": "X E",
    "gender": "L"
  },
  {
    "id": "13956",
    "nisn": "13956",
    "name": "Dina Aulia Zahwa",
    "class": "X E",
    "gender": "P"
  },
  {
    "id": "13957",
    "nisn": "13957",
    "name": "Elvina Elvaretta Maheswari",
    "class": "X E",
    "gender": "P"
  },
  {
    "id": "13958",
    "nisn": "13958",
    "name": "Eni Sulistianingsih",
    "class": "X E",
    "gender": "P"
  },
  {
    "id": "13959",
    "nisn": "13959",
    "name": "Filbert Haeydar Alfaridzi",
    "class": "X E",
    "gender": "L"
  },
  {
    "id": "13960",
    "nisn": "13960",
    "name": "Filza Azzahra Sukma Setyawan",
    "class": "X E",
    "gender": "P"
  },
  {
    "id": "13961",
    "nisn": "13961",
    "name": "Hanaya Adhwa Nabila",
    "class": "X E",
    "gender": "P"
  },
  {
    "id": "13962",
    "nisn": "13962",
    "name": "Hashifa Ummu Zulfa",
    "class": "X E",
    "gender": "P"
  },
  {
    "id": "13963",
    "nisn": "13963",
    "name": "Jauza Hazna Riaya",
    "class": "X E",
    "gender": "P"
  },
  {
    "id": "13964",
    "nisn": "13964",
    "name": "Keisha Aminatunnadhifah",
    "class": "X E",
    "gender": "P"
  },
  {
    "id": "13965",
    "nisn": "13965",
    "name": "Khalisa Maisa Yasmin",
    "class": "X E",
    "gender": "P"
  },
  {
    "id": "13966",
    "nisn": "13966",
    "name": "Kirana Nareswari Wibowo",
    "class": "X E",
    "gender": "P"
  },
  {
    "id": "13967",
    "nisn": "13967",
    "name": "Mareta Dwi Ariyani",
    "class": "X E",
    "gender": "P"
  },
  {
    "id": "13968",
    "nisn": "13968",
    "name": "Maulida Nafiza Az Zahra",
    "class": "X E",
    "gender": "P"
  },
  {
    "id": "13969",
    "nisn": "13969",
    "name": "Maulidya Aisyah Arti Fatihah",
    "class": "X E",
    "gender": "P"
  },
  {
    "id": "13970",
    "nisn": "13970",
    "name": "Miko Khoirul Fatihin",
    "class": "X E",
    "gender": "L"
  },
  {
    "id": "13971",
    "nisn": "13971",
    "name": "Moch Fatchurrohman",
    "class": "X E",
    "gender": "L"
  },
  {
    "id": "13972",
    "nisn": "13972",
    "name": "Muhammad Fatih Setiawan",
    "class": "X E",
    "gender": "L"
  },
  {
    "id": "13973",
    "nisn": "13973",
    "name": "Muhammad Gilang Angga Kusuma",
    "class": "X E",
    "gender": "L"
  },
  {
    "id": "13974",
    "nisn": "13974",
    "name": "Muhammad Nala I'zaz Suherman",
    "class": "X E",
    "gender": "L"
  },
  {
    "id": "13975",
    "nisn": "13975",
    "name": "Nadiya Rijemak Yasmin Adeliya",
    "class": "X E",
    "gender": "P"
  },
  {
    "id": "13976",
    "nisn": "13976",
    "name": "Nafila Briliannida Agnesti",
    "class": "X E",
    "gender": "P"
  },
  {
    "id": "13977",
    "nisn": "13977",
    "name": "Nazlia Annasyah Yudha Putri",
    "class": "X E",
    "gender": "P"
  },
  {
    "id": "13978",
    "nisn": "13978",
    "name": "Ni'mah Luklua Kholida",
    "class": "X E",
    "gender": "P"
  },
  {
    "id": "13979",
    "nisn": "13979",
    "name": "Putri Khansaa Nabiilah",
    "class": "X E",
    "gender": "P"
  },
  {
    "id": "13980",
    "nisn": "13980",
    "name": "Quinnshany Keysha Az Zahra",
    "class": "X E",
    "gender": "P"
  },
  {
    "id": "13981",
    "nisn": "13981",
    "name": "Rafif Ahnaf Abyantara",
    "class": "X E",
    "gender": "L"
  },
  {
    "id": "13982",
    "nisn": "13982",
    "name": "Ramania Najwa Retasya",
    "class": "X E",
    "gender": "P"
  },
  {
    "id": "13983",
    "nisn": "13983",
    "name": "Reyhana Asni Nuraida",
    "class": "X E",
    "gender": "P"
  },
  {
    "id": "13984",
    "nisn": "13984",
    "name": "Satria Putra Pratama",
    "class": "X E",
    "gender": "L"
  },
  {
    "id": "13985",
    "nisn": "13985",
    "name": "Syifa Yuliana",
    "class": "X E",
    "gender": "P"
  },
  {
    "id": "13986",
    "nisn": "13986",
    "name": "Zaskia Syafa Azzahra",
    "class": "X E",
    "gender": "P"
  },
  {
    "id": "13987",
    "nisn": "13987",
    "name": "Adila Nur Fitriana",
    "class": "X F",
    "gender": "P"
  },
  {
    "id": "13988",
    "nisn": "13988",
    "name": "Alfina Nur Fitriani",
    "class": "X F",
    "gender": "P"
  },
  {
    "id": "13989",
    "nisn": "13989",
    "name": "Annaswa Khoirun Pujiati",
    "class": "X F",
    "gender": "P"
  },
  {
    "id": "13991",
    "nisn": "13991",
    "name": "Clara Adelia Kiran Mahadika",
    "class": "X F",
    "gender": "P"
  },
  {
    "id": "13992",
    "nisn": "13992",
    "name": "Desvia Muna Hafsah",
    "class": "X F",
    "gender": "P"
  },
  {
    "id": "13993",
    "nisn": "13993",
    "name": "Dinny Nur Azizah",
    "class": "X F",
    "gender": "P"
  },
  {
    "id": "13994",
    "nisn": "13994",
    "name": "Dyah Valda Cahyaningrum",
    "class": "X F",
    "gender": "P"
  },
  {
    "id": "13995",
    "nisn": "13995",
    "name": "Fadhlan Setiyawan",
    "class": "X F",
    "gender": "L"
  },
  {
    "id": "13996",
    "nisn": "13996",
    "name": "Faisal Maulana Ahsan",
    "class": "X F",
    "gender": "L"
  },
  {
    "id": "13997",
    "nisn": "13997",
    "name": "Fardan Nur",
    "class": "X F",
    "gender": "L"
  },
  {
    "id": "13998",
    "nisn": "13998",
    "name": "Ibra Anugerah Haqiqi",
    "class": "X F",
    "gender": "L"
  },
  {
    "id": "13999",
    "nisn": "13999",
    "name": "Kaila Az-Zahra Rahadian",
    "class": "X F",
    "gender": "P"
  },
  {
    "id": "14000",
    "nisn": "14000",
    "name": "Karrisa Nazwa Angelie",
    "class": "X F",
    "gender": "P"
  },
  {
    "id": "14001",
    "nisn": "14001",
    "name": "Keysha Eka Mayta Kurnia Dinata",
    "class": "X F",
    "gender": "P"
  },
  {
    "id": "14002",
    "nisn": "14002",
    "name": "Luthfi Sakhi Kholfani",
    "class": "X F",
    "gender": "L"
  },
  {
    "id": "14003",
    "nisn": "14003",
    "name": "Luthfi Siroju Hemy",
    "class": "X F",
    "gender": "L"
  },
  {
    "id": "14004",
    "nisn": "14004",
    "name": "Ma’sum Ahmad Khoirudin",
    "class": "X F",
    "gender": "L"
  },
  {
    "id": "14005",
    "nisn": "14005",
    "name": "Messiana Athalia Nur Sabilla",
    "class": "X F",
    "gender": "P"
  },
  {
    "id": "14006",
    "nisn": "14006",
    "name": "Muhamad Haryanto",
    "class": "X F",
    "gender": "L"
  },
  {
    "id": "14008",
    "nisn": "14008",
    "name": "Muhammad Fajar Prasetyo",
    "class": "X F",
    "gender": "L"
  },
  {
    "id": "14009",
    "nisn": "14009",
    "name": "Muhammad Nur Annas",
    "class": "X F",
    "gender": "L"
  },
  {
    "id": "14010",
    "nisn": "14010",
    "name": "Naila Bilqis",
    "class": "X F",
    "gender": "P"
  },
  {
    "id": "14011",
    "nisn": "14011",
    "name": "Narendratama Yahya Ramadhan",
    "class": "X F",
    "gender": "L"
  },
  {
    "id": "14012",
    "nisn": "14012",
    "name": "Nayla Alta Nissya",
    "class": "X F",
    "gender": "P"
  },
  {
    "id": "14013",
    "nisn": "14013",
    "name": "Rendy Ahyar Azaqi",
    "class": "X F",
    "gender": "L"
  },
  {
    "id": "14169",
    "nisn": "14169",
    "name": "Safana Aina'Iya",
    "class": "X F",
    "gender": "P"
  },
  {
    "id": "14014",
    "nisn": "14014",
    "name": "Saira Mafaza Ahmad",
    "class": "X F",
    "gender": "P"
  },
  {
    "id": "14015",
    "nisn": "14015",
    "name": "Syifa Awalia Putri",
    "class": "X F",
    "gender": "P"
  },
  {
    "id": "14016",
    "nisn": "14016",
    "name": "Syifa Dilla Annastasya",
    "class": "X F",
    "gender": "P"
  },
  {
    "id": "14017",
    "nisn": "14017",
    "name": "Titi Fatonah",
    "class": "X F",
    "gender": "P"
  },
  {
    "id": "14018",
    "nisn": "14018",
    "name": "Tri Hartanti",
    "class": "X F",
    "gender": "P"
  },
  {
    "id": "14019",
    "nisn": "14019",
    "name": "Vita Bara Astuti",
    "class": "X F",
    "gender": "P"
  },
  {
    "id": "14020",
    "nisn": "14020",
    "name": "Warda Nur Alifah",
    "class": "X F",
    "gender": "P"
  },
  {
    "id": "14021",
    "nisn": "14021",
    "name": "Yusuf Khoirul Huda Al Azizizy",
    "class": "X F",
    "gender": "L"
  },
  {
    "id": "14022",
    "nisn": "14022",
    "name": "Zulfan Hafiz Abdillah",
    "class": "X F",
    "gender": "L"
  },
  {
    "id": "14023",
    "nisn": "14023",
    "name": "Adyan Adham Hermawan",
    "class": "X G",
    "gender": "L"
  },
  {
    "id": "14024",
    "nisn": "14024",
    "name": "Afnan Amadudin",
    "class": "X G",
    "gender": "L"
  },
  {
    "id": "14025",
    "nisn": "14025",
    "name": "Aina Talitha Ali",
    "class": "X G",
    "gender": "P"
  },
  {
    "id": "14026",
    "nisn": "14026",
    "name": "Annisa Nur Khotimah",
    "class": "X G",
    "gender": "P"
  },
  {
    "id": "14027",
    "nisn": "14027",
    "name": "Asyifa Bilqis Nuraida",
    "class": "X G",
    "gender": "P"
  },
  {
    "id": "14028",
    "nisn": "14028",
    "name": "Balqis Kanaka Salsabila",
    "class": "X G",
    "gender": "P"
  },
  {
    "id": "14029",
    "nisn": "14029",
    "name": "Cahaya Wardani",
    "class": "X G",
    "gender": "P"
  },
  {
    "id": "14030",
    "nisn": "14030",
    "name": "Candra Adi Fareza",
    "class": "X G",
    "gender": "L"
  },
  {
    "id": "14031",
    "nisn": "14031",
    "name": "Dita Aulia Rahmawati",
    "class": "X G",
    "gender": "P"
  },
  {
    "id": "14032",
    "nisn": "14032",
    "name": "Etik Kurniawati",
    "class": "X G",
    "gender": "P"
  },
  {
    "id": "14033",
    "nisn": "14033",
    "name": "Fahreza Aldy Ramadhan",
    "class": "X G",
    "gender": "L"
  },
  {
    "id": "14034",
    "nisn": "14034",
    "name": "Faizatun Naimah",
    "class": "X G",
    "gender": "P"
  },
  {
    "id": "14035",
    "nisn": "14035",
    "name": "Farhan Okta Pratama",
    "class": "X G",
    "gender": "L"
  },
  {
    "id": "14036",
    "nisn": "14036",
    "name": "Jaida Kamilia",
    "class": "X G",
    "gender": "P"
  },
  {
    "id": "14037",
    "nisn": "14037",
    "name": "Jessica Nur Aura",
    "class": "X G",
    "gender": "P"
  },
  {
    "id": "14040",
    "nisn": "14040",
    "name": "Latifah Miftakhul Zahra",
    "class": "X G",
    "gender": "P"
  },
  {
    "id": "14041",
    "nisn": "14041",
    "name": "Maulida 'Indana Zulfa",
    "class": "X G",
    "gender": "P"
  },
  {
    "id": "14042",
    "nisn": "14042",
    "name": "Melani Vanez Setyasih",
    "class": "X G",
    "gender": "P"
  },
  {
    "id": "14043",
    "nisn": "14043",
    "name": "Muhammad Atsaal Alghiankar",
    "class": "X G",
    "gender": "L"
  },
  {
    "id": "14044",
    "nisn": "14044",
    "name": "Muhammad Lucky Ekaputra",
    "class": "X G",
    "gender": "L"
  },
  {
    "id": "14045",
    "nisn": "14045",
    "name": "Naila Musyrifah",
    "class": "X G",
    "gender": "P"
  },
  {
    "id": "14046",
    "nisn": "14046",
    "name": "Naufal Higuain Dasha Setyawan",
    "class": "X G",
    "gender": "L"
  },
  {
    "id": "14047",
    "nisn": "14047",
    "name": "Nurjannah Anandari",
    "class": "X G",
    "gender": "P"
  },
  {
    "id": "14048",
    "nisn": "14048",
    "name": "Raska Hafids Mahesa",
    "class": "X G",
    "gender": "L"
  },
  {
    "id": "14049",
    "nisn": "14049",
    "name": "Rico Amelza Santosa",
    "class": "X G",
    "gender": "L"
  },
  {
    "id": "14050",
    "nisn": "14050",
    "name": "Ruli Akhsanul Ma'arif",
    "class": "X G",
    "gender": "L"
  },
  {
    "id": "14170",
    "nisn": "14170",
    "name": "Syifa Nurhafifah",
    "class": "X G",
    "gender": "P"
  },
  {
    "id": "14051",
    "nisn": "14051",
    "name": "Tania Ayu Meylani",
    "class": "X G",
    "gender": "P"
  },
  {
    "id": "14052",
    "nisn": "14052",
    "name": "Tsaniya Nur Ashila",
    "class": "X G",
    "gender": "P"
  },
  {
    "id": "14053",
    "nisn": "14053",
    "name": "Vena Puspasari",
    "class": "X G",
    "gender": "P"
  },
  {
    "id": "14054",
    "nisn": "14054",
    "name": "Aban Yahya Qois",
    "class": "X H",
    "gender": "L"
  },
  {
    "id": "14055",
    "nisn": "14055",
    "name": "Adam Arrasid Al Bukhori",
    "class": "X H",
    "gender": "L"
  },
  {
    "id": "14056",
    "nisn": "14056",
    "name": "Adelia Reishi Fadillah",
    "class": "X H",
    "gender": "P"
  },
  {
    "id": "14057",
    "nisn": "14057",
    "name": "Ahmad Dava Azzamuddin",
    "class": "X H",
    "gender": "L"
  },
  {
    "id": "14058",
    "nisn": "14058",
    "name": "Alisa Ramadani",
    "class": "X H",
    "gender": "P"
  },
  {
    "id": "14059",
    "nisn": "14059",
    "name": "Ariya Ahsanitthoriq",
    "class": "X H",
    "gender": "L"
  },
  {
    "id": "14060",
    "nisn": "14060",
    "name": "Arwa Amalia Putri",
    "class": "X H",
    "gender": "P"
  },
  {
    "id": "14061",
    "nisn": "14061",
    "name": "Asyifa Rasya Nur Qomariyah",
    "class": "X H",
    "gender": "P"
  },
  {
    "id": "14062",
    "nisn": "14062",
    "name": "Auliasuci Rahmawati",
    "class": "X H",
    "gender": "P"
  },
  {
    "id": "14063",
    "nisn": "14063",
    "name": "Azryl Dian Pratama",
    "class": "X H",
    "gender": "L"
  },
  {
    "id": "14064",
    "nisn": "14064",
    "name": "Deflina Ulfa Tansaniah",
    "class": "X H",
    "gender": "P"
  },
  {
    "id": "14065",
    "nisn": "14065",
    "name": "Dewi Azzahra Miftachul Chusna",
    "class": "X H",
    "gender": "P"
  },
  {
    "id": "14066",
    "nisn": "14066",
    "name": "Dhifaf Salsabilla",
    "class": "X H",
    "gender": "P"
  },
  {
    "id": "14067",
    "nisn": "14067",
    "name": "Divya Khasyi Praba Maheswari",
    "class": "X H",
    "gender": "P"
  },
  {
    "id": "14068",
    "nisn": "14068",
    "name": "Eliana Khusniah",
    "class": "X H",
    "gender": "P"
  },
  {
    "id": "14069",
    "nisn": "14069",
    "name": "Fajar Setya Rini",
    "class": "X H",
    "gender": "P"
  },
  {
    "id": "14070",
    "nisn": "14070",
    "name": "Hanung Naufal Al Furqon",
    "class": "X H",
    "gender": "L"
  },
  {
    "id": "14071",
    "nisn": "14071",
    "name": "Ibnati Naura Tabiina",
    "class": "X H",
    "gender": "P"
  },
  {
    "id": "14072",
    "nisn": "14072",
    "name": "Iman Abid Al Qosim",
    "class": "X H",
    "gender": "L"
  },
  {
    "id": "14073",
    "nisn": "14073",
    "name": "Indrasta Tian Adhana Akbar",
    "class": "X H",
    "gender": "L"
  },
  {
    "id": "14074",
    "nisn": "14074",
    "name": "Isnaini Mulya Ningtyas",
    "class": "X H",
    "gender": "P"
  },
  {
    "id": "14075",
    "nisn": "14075",
    "name": "Muhammad Akhyar Miftahul Pradipta",
    "class": "X H",
    "gender": "L"
  },
  {
    "id": "14076",
    "nisn": "14076",
    "name": "Muhammad Ardana Putra",
    "class": "X H",
    "gender": "L"
  },
  {
    "id": "14077",
    "nisn": "14077",
    "name": "Mutiara Ramadhani",
    "class": "X H",
    "gender": "P"
  },
  {
    "id": "14078",
    "nisn": "14078",
    "name": "Najwa Azzahra",
    "class": "X H",
    "gender": "P"
  },
  {
    "id": "14079",
    "nisn": "14079",
    "name": "Putri Septiyani",
    "class": "X H",
    "gender": "P"
  },
  {
    "id": "14080",
    "nisn": "14080",
    "name": "Qiana Naswa Hoirunnisa",
    "class": "X H",
    "gender": "P"
  },
  {
    "id": "14081",
    "nisn": "14081",
    "name": "Riski Gibran Fauzi",
    "class": "X H",
    "gender": "L"
  },
  {
    "id": "14082",
    "nisn": "14082",
    "name": "Salvania Nur Sabrina",
    "class": "X H",
    "gender": "P"
  },
  {
    "id": "14083",
    "nisn": "14083",
    "name": "Sefina Nur Oktavia",
    "class": "X H",
    "gender": "P"
  },
  {
    "id": "14084",
    "nisn": "14084",
    "name": "Shahira Qurota Nur Aini",
    "class": "X H",
    "gender": "P"
  },
  {
    "id": "14085",
    "nisn": "14085",
    "name": "Syerlita Fitrania Putri",
    "class": "X H",
    "gender": "P"
  },
  {
    "id": "14086",
    "nisn": "14086",
    "name": "Tifanni Yunitasari",
    "class": "X H",
    "gender": "P"
  },
  {
    "id": "14087",
    "nisn": "14087",
    "name": "Widiya Novita Sari",
    "class": "X H",
    "gender": "P"
  },
  {
    "id": "14088",
    "nisn": "14088",
    "name": "Wilda Humaida",
    "class": "X H",
    "gender": "P"
  },
  {
    "id": "14089",
    "nisn": "14089",
    "name": "Zulfahmi Mirzaqul Ahmad",
    "class": "X H",
    "gender": "L"
  },
  {
    "id": "14091",
    "nisn": "14091",
    "name": "Aulia Evita Sari",
    "class": "X I",
    "gender": "P"
  },
  {
    "id": "14092",
    "nisn": "14092",
    "name": "Aulia Sifa'un Nisa'",
    "class": "X I",
    "gender": "P"
  },
  {
    "id": "14093",
    "nisn": "14093",
    "name": "Cinta Tuslimatul Izzati",
    "class": "X I",
    "gender": "P"
  },
  {
    "id": "14094",
    "nisn": "14094",
    "name": "Devin Ega Saputra",
    "class": "X I",
    "gender": "L"
  },
  {
    "id": "14095",
    "nisn": "14095",
    "name": "Dewi Ma'rifatu Solikhah",
    "class": "X I",
    "gender": "P"
  },
  {
    "id": "14096",
    "nisn": "14096",
    "name": "Dimas Eka Prasetyo",
    "class": "X I",
    "gender": "L"
  },
  {
    "id": "14097",
    "nisn": "14097",
    "name": "Dita Virly Ariyani",
    "class": "X I",
    "gender": "P"
  },
  {
    "id": "14098",
    "nisn": "14098",
    "name": "Elham Ali Husaien",
    "class": "X I",
    "gender": "L"
  },
  {
    "id": "14099",
    "nisn": "14099",
    "name": "Elvia Ardelia Azzahra",
    "class": "X I",
    "gender": "P"
  },
  {
    "id": "14100",
    "nisn": "14100",
    "name": "Evelyn Felisha Alam",
    "class": "X I",
    "gender": "P"
  },
  {
    "id": "14101",
    "nisn": "14101",
    "name": "Fairuziyah Nur Fatin",
    "class": "X I",
    "gender": "P"
  },
  {
    "id": "14102",
    "nisn": "14102",
    "name": "Fara Alya Zahira",
    "class": "X I",
    "gender": "P"
  },
  {
    "id": "14103",
    "nisn": "14103",
    "name": "Fauzan Fahrul Ni'am",
    "class": "X I",
    "gender": "L"
  },
  {
    "id": "14104",
    "nisn": "14104",
    "name": "Furqon Ibrahim Al Awwal Ramadhan",
    "class": "X I",
    "gender": "L"
  },
  {
    "id": "14105",
    "nisn": "14105",
    "name": "Inas Anindya Anwar",
    "class": "X I",
    "gender": "P"
  },
  {
    "id": "14106",
    "nisn": "14106",
    "name": "Karunia Ajeng Kusuma",
    "class": "X I",
    "gender": "P"
  },
  {
    "id": "14107",
    "nisn": "14107",
    "name": "Lailatul Khafidzah",
    "class": "X I",
    "gender": "P"
  },
  {
    "id": "14108",
    "nisn": "14108",
    "name": "Luluk Ratna Dewi",
    "class": "X I",
    "gender": "P"
  },
  {
    "id": "14109",
    "nisn": "14109",
    "name": "Miska Aulin Nadlifatus Syifa",
    "class": "X I",
    "gender": "P"
  },
  {
    "id": "14168",
    "nisn": "14168",
    "name": "Muh Fairuz Baroya",
    "class": "X I",
    "gender": "L"
  },
  {
    "id": "14110",
    "nisn": "14110",
    "name": "Muhammad Syahrur Ramadhan",
    "class": "X I",
    "gender": "L"
  },
  {
    "id": "14111",
    "nisn": "14111",
    "name": "Muhammad Zidan Rafka Abdillah",
    "class": "X I",
    "gender": "L"
  },
  {
    "id": "14112",
    "nisn": "14112",
    "name": "Muwaffaqah Fathiyya Hayfa",
    "class": "X I",
    "gender": "P"
  },
  {
    "id": "14113",
    "nisn": "14113",
    "name": "Nafiatul Manahil",
    "class": "X I",
    "gender": "P"
  },
  {
    "id": "14114",
    "nisn": "14114",
    "name": "Natasa Anggraini",
    "class": "X I",
    "gender": "P"
  },
  {
    "id": "14115",
    "nisn": "14115",
    "name": "Naufal Lutfi Perdana",
    "class": "X I",
    "gender": "L"
  },
  {
    "id": "14116",
    "nisn": "14116",
    "name": "Nida Nur Aulia",
    "class": "X I",
    "gender": "P"
  },
  {
    "id": "14117",
    "nisn": "14117",
    "name": "Nisa Aulia Ramdani",
    "class": "X I",
    "gender": "P"
  },
  {
    "id": "14118",
    "nisn": "14118",
    "name": "Noviana Sholekha",
    "class": "X I",
    "gender": "P"
  },
  {
    "id": "14119",
    "nisn": "14119",
    "name": "Qurrotu Aini",
    "class": "X I",
    "gender": "P"
  },
  {
    "id": "14120",
    "nisn": "14120",
    "name": "Rafa Dzaky Al Fariz",
    "class": "X I",
    "gender": "L"
  },
  {
    "id": "14121",
    "nisn": "14121",
    "name": "Riska Amelia Rahmawati",
    "class": "X I",
    "gender": "P"
  },
  {
    "id": "14122",
    "nisn": "14122",
    "name": "Salsabila Meisa Ulandari",
    "class": "X I",
    "gender": "P"
  },
  {
    "id": "14123",
    "nisn": "14123",
    "name": "Shelia Rahmadani",
    "class": "X I",
    "gender": "P"
  },
  {
    "id": "14124",
    "nisn": "14124",
    "name": "Zahratun Shita Aulia",
    "class": "X I",
    "gender": "P"
  },
  {
    "id": "14125",
    "nisn": "14125",
    "name": "Zulfa Aini Salsabila",
    "class": "X I",
    "gender": "P"
  },
  {
    "id": "14126",
    "nisn": "14126",
    "name": "Aisah Dakwatul Mustajibah",
    "class": "X J",
    "gender": "P"
  },
  {
    "id": "14127",
    "nisn": "14127",
    "name": "Anisa Risda Zakiah",
    "class": "X J",
    "gender": "P"
  },
  {
    "id": "14128",
    "nisn": "14128",
    "name": "Anni Kusumawati Lestari",
    "class": "X J",
    "gender": "P"
  },
  {
    "id": "14129",
    "nisn": "14129",
    "name": "Askia Alya Naufa",
    "class": "X J",
    "gender": "P"
  },
  {
    "id": "14130",
    "nisn": "14130",
    "name": "Bunga Qutrotunnada Valent",
    "class": "X J",
    "gender": "P"
  },
  {
    "id": "14131",
    "nisn": "14131",
    "name": "Dava Indra Andriansyah",
    "class": "X J",
    "gender": "L"
  },
  {
    "id": "14132",
    "nisn": "14132",
    "name": "Dewi Fitriani",
    "class": "X J",
    "gender": "P"
  },
  {
    "id": "14133",
    "nisn": "14133",
    "name": "Diah Aprilia Ayu Lestari",
    "class": "X J",
    "gender": "P"
  },
  {
    "id": "14134",
    "nisn": "14134",
    "name": "Diah Aulia Mukti",
    "class": "X J",
    "gender": "P"
  },
  {
    "id": "14135",
    "nisn": "14135",
    "name": "Diah Sri Ayyu Ningsih",
    "class": "X J",
    "gender": "P"
  },
  {
    "id": "14136",
    "nisn": "14136",
    "name": "Edi Suyono",
    "class": "X J",
    "gender": "L"
  },
  {
    "id": "14137",
    "nisn": "14137",
    "name": "Himmatul Ulya",
    "class": "X J",
    "gender": "P"
  },
  {
    "id": "14138",
    "nisn": "14138",
    "name": "Jessita Nur Aulia",
    "class": "X J",
    "gender": "P"
  },
  {
    "id": "14139",
    "nisn": "14139",
    "name": "Khoirunnisa Dwi Fitriyanti",
    "class": "X J",
    "gender": "P"
  },
  {
    "id": "14140",
    "nisn": "14140",
    "name": "La Alik Al Khusna",
    "class": "X J",
    "gender": "P"
  },
  {
    "id": "14141",
    "nisn": "14141",
    "name": "Lailatul Khomisah",
    "class": "X J",
    "gender": "P"
  },
  {
    "id": "14142",
    "nisn": "14142",
    "name": "Mauza Lina Naza Mirza",
    "class": "X J",
    "gender": "P"
  },
  {
    "id": "14143",
    "nisn": "14143",
    "name": "Muhammad Ahsin Lana",
    "class": "X J",
    "gender": "L"
  },
  {
    "id": "14144",
    "nisn": "14144",
    "name": "Muhammad Fikri Alfiansyah",
    "class": "X J",
    "gender": "L"
  },
  {
    "id": "14145",
    "nisn": "14145",
    "name": "Muhammad Haedar Ali",
    "class": "X J",
    "gender": "L"
  },
  {
    "id": "14146",
    "nisn": "14146",
    "name": "Nayla Tsabita Hidayat",
    "class": "X J",
    "gender": "P"
  },
  {
    "id": "14147",
    "nisn": "14147",
    "name": "Rafindra Azhriel Akbar",
    "class": "X J",
    "gender": "L"
  },
  {
    "id": "14148",
    "nisn": "14148",
    "name": "Rifky Adi Pratama",
    "class": "X J",
    "gender": "L"
  },
  {
    "id": "14149",
    "nisn": "14149",
    "name": "Rizki Putra Susanto",
    "class": "X J",
    "gender": "L"
  },
  {
    "id": "14150",
    "nisn": "14150",
    "name": "Rizky Alfian",
    "class": "X J",
    "gender": "L"
  },
  {
    "id": "14151",
    "nisn": "14151",
    "name": "Rizky Ardhi Tria Gumilang",
    "class": "X J",
    "gender": "L"
  },
  {
    "id": "14152",
    "nisn": "14152",
    "name": "Salma Nurannisa'",
    "class": "X J",
    "gender": "P"
  },
  {
    "id": "14153",
    "nisn": "14153",
    "name": "Salsabila Atikah Sari",
    "class": "X J",
    "gender": "P"
  },
  {
    "id": "14154",
    "nisn": "14154",
    "name": "Salsabila Fil Jannah",
    "class": "X J",
    "gender": "P"
  },
  {
    "id": "14155",
    "nisn": "14155",
    "name": "Sri Ekasari",
    "class": "X J",
    "gender": "P"
  },
  {
    "id": "14156",
    "nisn": "14156",
    "name": "Sultony Mukti Sugiarto",
    "class": "X J",
    "gender": "L"
  },
  {
    "id": "14157",
    "nisn": "14157",
    "name": "Syafira Nur Hafidhah",
    "class": "X J",
    "gender": "P"
  },
  {
    "id": "14158",
    "nisn": "14158",
    "name": "Umair Mirza Alfian",
    "class": "X J",
    "gender": "L"
  },
  {
    "id": "14159",
    "nisn": "14159",
    "name": "Wikan Galuh Adetama",
    "class": "X J",
    "gender": "P"
  },
  {
    "id": "14160",
    "nisn": "14160",
    "name": "Zahra Frisca Amelia Devi",
    "class": "X J",
    "gender": "P"
  },
  {
    "id": "14161",
    "nisn": "14161",
    "name": "Zulfan Ramadhan Putra",
    "class": "X J",
    "gender": "L"
  },
  {
    "id": "13447",
    "nisn": "13447",
    "name": "Adam Guna Perdana",
    "class": "XI A",
    "gender": "L"
  },
  {
    "id": "13448",
    "nisn": "13448",
    "name": "Adinda Salma Khorunnisa",
    "class": "XI A",
    "gender": "P"
  },
  {
    "id": "13519",
    "nisn": "13519",
    "name": "Adkha Khilyana Faza",
    "class": "XI A",
    "gender": "P"
  },
  {
    "id": "13449",
    "nisn": "13449",
    "name": "Aluna Anindyafatih Diwathaariq",
    "class": "XI A",
    "gender": "P"
  },
  {
    "id": "13556",
    "nisn": "13556",
    "name": "Anisah Haynar Mahya",
    "class": "XI A",
    "gender": "P"
  },
  {
    "id": "13450",
    "nisn": "13450",
    "name": "Annisa Putri Chalysta",
    "class": "XI A",
    "gender": "P"
  },
  {
    "id": "13451",
    "nisn": "13451",
    "name": "As'Ad Abdul Muhyi Al'Asyrof",
    "class": "XI A",
    "gender": "L"
  },
  {
    "id": "13452",
    "nisn": "13452",
    "name": "Aulia Adzkiasyifa",
    "class": "XI A",
    "gender": "P"
  },
  {
    "id": "13454",
    "nisn": "13454",
    "name": "Aulia Syahidah Anshori",
    "class": "XI A",
    "gender": "P"
  },
  {
    "id": "13455",
    "nisn": "13455",
    "name": "Aurell Annur Azzahra",
    "class": "XI A",
    "gender": "P"
  },
  {
    "id": "13458",
    "nisn": "13458",
    "name": "Dzaki Falah Rosyid",
    "class": "XI A",
    "gender": "L"
  },
  {
    "id": "13568",
    "nisn": "13568",
    "name": "Eko Nur Darussalam",
    "class": "XI A",
    "gender": "L"
  },
  {
    "id": "13569",
    "nisn": "13569",
    "name": "Elin Shelsa Anindita",
    "class": "XI A",
    "gender": "P"
  },
  {
    "id": "13636",
    "nisn": "13636",
    "name": "Falisha Dinayra Andawista",
    "class": "XI A",
    "gender": "P"
  },
  {
    "id": "13460",
    "nisn": "13460",
    "name": "Fatimatuzzahra Kuswantoro",
    "class": "XI A",
    "gender": "P"
  },
  {
    "id": "13461",
    "nisn": "13461",
    "name": "Febrian Rizki Pratama",
    "class": "XI A",
    "gender": "L"
  },
  {
    "id": "13462",
    "nisn": "13462",
    "name": "Intan Nur Rohmah",
    "class": "XI A",
    "gender": "P"
  },
  {
    "id": "13463",
    "nisn": "13463",
    "name": "Izzam Zanuarda Wiratama",
    "class": "XI A",
    "gender": "L"
  },
  {
    "id": "13464",
    "nisn": "13464",
    "name": "Jaballah Akmal Abbas",
    "class": "XI A",
    "gender": "L"
  },
  {
    "id": "13644",
    "nisn": "13644",
    "name": "Jayanti Nur Aini",
    "class": "XI A",
    "gender": "P"
  },
  {
    "id": "13466",
    "nisn": "13466",
    "name": "Kirani Fauziyah Azzahra",
    "class": "XI A",
    "gender": "P"
  },
  {
    "id": "13537",
    "nisn": "13537",
    "name": "Muhammad Rais Faisal",
    "class": "XI A",
    "gender": "L"
  },
  {
    "id": "13681",
    "nisn": "13681",
    "name": "Myiesha Xaviera Ramadhani",
    "class": "XI A",
    "gender": "P"
  },
  {
    "id": "13469",
    "nisn": "13469",
    "name": "Nadine Uvaira Azka",
    "class": "XI A",
    "gender": "P"
  },
  {
    "id": "13581",
    "nisn": "13581",
    "name": "Naura Al Firdauzy",
    "class": "XI A",
    "gender": "P"
  },
  {
    "id": "13472",
    "nisn": "13472",
    "name": "Naura Khalisha Mufida",
    "class": "XI A",
    "gender": "P"
  },
  {
    "id": "13544",
    "nisn": "13544",
    "name": "Pierre Yusuf Arkan Rabbani",
    "class": "XI A",
    "gender": "L"
  },
  {
    "id": "13475",
    "nisn": "13475",
    "name": "Rafka Jamwa Mumtaza",
    "class": "XI A",
    "gender": "L"
  },
  {
    "id": "13511",
    "nisn": "13511",
    "name": "Rijal Firdaus",
    "class": "XI A",
    "gender": "L"
  },
  {
    "id": "13478",
    "nisn": "13478",
    "name": "Sekar Ambarwati",
    "class": "XI A",
    "gender": "P"
  },
  {
    "id": "13551",
    "nisn": "13551",
    "name": "Shafa Nabila Azzahra",
    "class": "XI A",
    "gender": "P"
  },
  {
    "id": "13479",
    "nisn": "13479",
    "name": "Sri Wahyuti",
    "class": "XI A",
    "gender": "P"
  },
  {
    "id": "13480",
    "nisn": "13480",
    "name": "Syifa Nur Rosela",
    "class": "XI A",
    "gender": "P"
  },
  {
    "id": "13552",
    "nisn": "13552",
    "name": "Tifanny Alivia Putri Wijaya",
    "class": "XI A",
    "gender": "P"
  },
  {
    "id": "13481",
    "nisn": "13481",
    "name": "Triyantika Alya Maulida",
    "class": "XI A",
    "gender": "P"
  },
  {
    "id": "13482",
    "nisn": "13482",
    "name": "Wahid Khoirul Azzam",
    "class": "XI A",
    "gender": "L"
  },
  {
    "id": "13483",
    "nisn": "13483",
    "name": "Adyuta Rafif Putranto",
    "class": "XI B",
    "gender": "L"
  },
  {
    "id": "13484",
    "nisn": "13484",
    "name": "Ahmad Hafiidzal Alam Shah",
    "class": "XI B",
    "gender": "L"
  },
  {
    "id": "13485",
    "nisn": "13485",
    "name": "Allaisa Eta Rahmadhani",
    "class": "XI B",
    "gender": "P"
  },
  {
    "id": "13486",
    "nisn": "13486",
    "name": "Annisa Maulida Syfa",
    "class": "XI B",
    "gender": "P"
  },
  {
    "id": "13487",
    "nisn": "13487",
    "name": "Arina Fatimatuzzahra Al Muntadziroh",
    "class": "XI B",
    "gender": "P"
  },
  {
    "id": "13489",
    "nisn": "13489",
    "name": "Citra Nuraini Rahmah",
    "class": "XI B",
    "gender": "P"
  },
  {
    "id": "13490",
    "nisn": "13490",
    "name": "Fani Sri Mulyani",
    "class": "XI B",
    "gender": "P"
  },
  {
    "id": "13491",
    "nisn": "13491",
    "name": "Farida Novianti Lutfia",
    "class": "XI B",
    "gender": "P"
  },
  {
    "id": "13492",
    "nisn": "13492",
    "name": "Faruha Auliya Wardani",
    "class": "XI B",
    "gender": "P"
  },
  {
    "id": "13459",
    "nisn": "13459",
    "name": "Fateh Royyan Arfianto",
    "class": "XI B",
    "gender": "L"
  },
  {
    "id": "13493",
    "nisn": "13493",
    "name": "Fatheyya Nawwara",
    "class": "XI B",
    "gender": "P"
  },
  {
    "id": "13495",
    "nisn": "13495",
    "name": "Hasna Aulia Pasha",
    "class": "XI B",
    "gender": "P"
  },
  {
    "id": "13496",
    "nisn": "13496",
    "name": "Himatul Alliyah",
    "class": "XI B",
    "gender": "P"
  },
  {
    "id": "13497",
    "nisn": "13497",
    "name": "Ida Febriani",
    "class": "XI B",
    "gender": "P"
  },
  {
    "id": "13498",
    "nisn": "13498",
    "name": "Ireyna Rosyida Rahman",
    "class": "XI B",
    "gender": "P"
  },
  {
    "id": "13499",
    "nisn": "13499",
    "name": "Ishaq Mutahar",
    "class": "XI B",
    "gender": "L"
  },
  {
    "id": "13501",
    "nisn": "13501",
    "name": "Mawar Ardana Rahmawati",
    "class": "XI B",
    "gender": "P"
  },
  {
    "id": "14163",
    "nisn": "14163",
    "name": "Morista Irzha 'Arsh Pratiwi",
    "class": "XI B",
    "gender": "P"
  },
  {
    "id": "13502",
    "nisn": "13502",
    "name": "Muhammad Arsyad Raihan",
    "class": "XI B",
    "gender": "L"
  },
  {
    "id": "13503",
    "nisn": "13503",
    "name": "Muhammad Azzam Al Furqon",
    "class": "XI B",
    "gender": "L"
  },
  {
    "id": "13504",
    "nisn": "13504",
    "name": "Muhammad Zidni Nuron",
    "class": "XI B",
    "gender": "L"
  },
  {
    "id": "13505",
    "nisn": "13505",
    "name": "Nabila Nur Azzahra",
    "class": "XI B",
    "gender": "P"
  },
  {
    "id": "13506",
    "nisn": "13506",
    "name": "Naura Setya Aszahidah Salsabila",
    "class": "XI B",
    "gender": "P"
  },
  {
    "id": "13507",
    "nisn": "13507",
    "name": "Neyla Bilqist Saputri",
    "class": "XI B",
    "gender": "P"
  },
  {
    "id": "13508",
    "nisn": "13508",
    "name": "Nia Agustina Khoirun Nisa",
    "class": "XI B",
    "gender": "P"
  },
  {
    "id": "13509",
    "nisn": "13509",
    "name": "Raissa Salsabilla",
    "class": "XI B",
    "gender": "P"
  },
  {
    "id": "13510",
    "nisn": "13510",
    "name": "Ratu Aulia Ramadhani",
    "class": "XI B",
    "gender": "P"
  },
  {
    "id": "13512",
    "nisn": "13512",
    "name": "Rizka Aulia Putri",
    "class": "XI B",
    "gender": "P"
  },
  {
    "id": "13476",
    "nisn": "13476",
    "name": "Sajid Nuril Aqilanuddin",
    "class": "XI B",
    "gender": "L"
  },
  {
    "id": "13513",
    "nisn": "13513",
    "name": "Shinta Dewi Aprilia",
    "class": "XI B",
    "gender": "P"
  },
  {
    "id": "14166",
    "nisn": "14166",
    "name": "Siti Nurasyiah",
    "class": "XI B",
    "gender": "P"
  },
  {
    "id": "13514",
    "nisn": "13514",
    "name": "Syarif Hidayat",
    "class": "XI B",
    "gender": "L"
  },
  {
    "id": "13515",
    "nisn": "13515",
    "name": "Trifia Cikal Naila Tusaadah",
    "class": "XI B",
    "gender": "P"
  },
  {
    "id": "13516",
    "nisn": "13516",
    "name": "Wafiq Az Zahra",
    "class": "XI B",
    "gender": "P"
  },
  {
    "id": "13517",
    "nisn": "13517",
    "name": "Yulia Rahmawati",
    "class": "XI B",
    "gender": "P"
  },
  {
    "id": "13518",
    "nisn": "13518",
    "name": "Zakiyyah Nadya Shafwah",
    "class": "XI B",
    "gender": "P"
  },
  {
    "id": "13520",
    "nisn": "13520",
    "name": "Agus Hanif Hilaludin Hamzah Basit",
    "class": "XI C",
    "gender": "L"
  },
  {
    "id": "13521",
    "nisn": "13521",
    "name": "Alfino Jalu Perkasa",
    "class": "XI C",
    "gender": "L"
  },
  {
    "id": "13522",
    "nisn": "13522",
    "name": "Anggun Khirana Larasati",
    "class": "XI C",
    "gender": "P"
  },
  {
    "id": "13523",
    "nisn": "13523",
    "name": "Aufa Vib Mistsallina",
    "class": "XI C",
    "gender": "P"
  },
  {
    "id": "13453",
    "nisn": "13453",
    "name": "Aulia Safinatunnajah",
    "class": "XI C",
    "gender": "P"
  },
  {
    "id": "13524",
    "nisn": "13524",
    "name": "Daffa Al Farisza",
    "class": "XI C",
    "gender": "L"
  },
  {
    "id": "13457",
    "nisn": "13457",
    "name": "Dimas Syarif Mushaffa",
    "class": "XI C",
    "gender": "L"
  },
  {
    "id": "13525",
    "nisn": "13525",
    "name": "El Haidar Nabiliansyah",
    "class": "XI C",
    "gender": "L"
  },
  {
    "id": "13526",
    "nisn": "13526",
    "name": "Fika Khairanisa",
    "class": "XI C",
    "gender": "P"
  },
  {
    "id": "13527",
    "nisn": "13527",
    "name": "Ida Nur Santi",
    "class": "XI C",
    "gender": "P"
  },
  {
    "id": "13528",
    "nisn": "13528",
    "name": "Ikfina Binuril Hidayah",
    "class": "XI C",
    "gender": "P"
  },
  {
    "id": "13529",
    "nisn": "13529",
    "name": "Intan Nur Agustyn",
    "class": "XI C",
    "gender": "P"
  },
  {
    "id": "13530",
    "nisn": "13530",
    "name": "Iqbal Abdullah Azam",
    "class": "XI C",
    "gender": "L"
  },
  {
    "id": "13531",
    "nisn": "13531",
    "name": "Iqbal Dwi Saputro",
    "class": "XI C",
    "gender": "L"
  },
  {
    "id": "13465",
    "nisn": "13465",
    "name": "Kanza Aleya Metha",
    "class": "XI C",
    "gender": "P"
  },
  {
    "id": "13532",
    "nisn": "13532",
    "name": "Lentera Indrastia",
    "class": "XI C",
    "gender": "P"
  },
  {
    "id": "14165",
    "nisn": "14165",
    "name": "Linang Sayang Senandung Ramadhan",
    "class": "XI C",
    "gender": "P"
  },
  {
    "id": "13533",
    "nisn": "13533",
    "name": "Luna Kadira Azahwah",
    "class": "XI C",
    "gender": "P"
  },
  {
    "id": "13534",
    "nisn": "13534",
    "name": "Lutfiah Akmal Abbas",
    "class": "XI C",
    "gender": "P"
  },
  {
    "id": "13535",
    "nisn": "13535",
    "name": "Muhammad Aksel Fathurrohman",
    "class": "XI C",
    "gender": "L"
  },
  {
    "id": "13536",
    "nisn": "13536",
    "name": "Muhammad Khoirul Arkhan",
    "class": "XI C",
    "gender": "L"
  },
  {
    "id": "13538",
    "nisn": "13538",
    "name": "Muhammad Yusuf",
    "class": "XI C",
    "gender": "L"
  },
  {
    "id": "13539",
    "nisn": "13539",
    "name": "Nadhirotush Sholihah",
    "class": "XI C",
    "gender": "P"
  },
  {
    "id": "13470",
    "nisn": "13470",
    "name": "Nafisa Khairi Umamah",
    "class": "XI C",
    "gender": "P"
  },
  {
    "id": "13540",
    "nisn": "13540",
    "name": "Navira Ainun Nisa",
    "class": "XI C",
    "gender": "P"
  },
  {
    "id": "13541",
    "nisn": "13541",
    "name": "Nia Novita",
    "class": "XI C",
    "gender": "P"
  },
  {
    "id": "13542",
    "nisn": "13542",
    "name": "Novaliza Dian Kumalasari",
    "class": "XI C",
    "gender": "P"
  },
  {
    "id": "13543",
    "nisn": "13543",
    "name": "Nur Emelina",
    "class": "XI C",
    "gender": "P"
  },
  {
    "id": "13545",
    "nisn": "13545",
    "name": "Prehati Yuliani",
    "class": "XI C",
    "gender": "P"
  },
  {
    "id": "13546",
    "nisn": "13546",
    "name": "Raffa Ganendra Rasyidan Ahnaf",
    "class": "XI C",
    "gender": "L"
  },
  {
    "id": "13547",
    "nisn": "13547",
    "name": "Rea Restiana Septin",
    "class": "XI C",
    "gender": "P"
  },
  {
    "id": "13548",
    "nisn": "13548",
    "name": "Sahla Nabila Az Zahroh",
    "class": "XI C",
    "gender": "P"
  },
  {
    "id": "13549",
    "nisn": "13549",
    "name": "Satria Agus Rifa'I",
    "class": "XI C",
    "gender": "L"
  },
  {
    "id": "13550",
    "nisn": "13550",
    "name": "Septira Ita Setyaningrum",
    "class": "XI C",
    "gender": "P"
  },
  {
    "id": "13553",
    "nisn": "13553",
    "name": "Tyas Khoirun Nikma",
    "class": "XI C",
    "gender": "P"
  },
  {
    "id": "13554",
    "nisn": "13554",
    "name": "Yuliyanti",
    "class": "XI C",
    "gender": "P"
  },
  {
    "id": "13555",
    "nisn": "13555",
    "name": "Andika Roikhan Kamil",
    "class": "XI D",
    "gender": "L"
  },
  {
    "id": "13558",
    "nisn": "13558",
    "name": "Arindra Izzatun Nada",
    "class": "XI D",
    "gender": "P"
  },
  {
    "id": "13560",
    "nisn": "13560",
    "name": "Arva Kakha Ardiansyah",
    "class": "XI D",
    "gender": "L"
  },
  {
    "id": "13561",
    "nisn": "13561",
    "name": "Bagas Arya Satya",
    "class": "XI D",
    "gender": "L"
  },
  {
    "id": "13562",
    "nisn": "13562",
    "name": "Batrisya Abidah",
    "class": "XI D",
    "gender": "P"
  },
  {
    "id": "13564",
    "nisn": "13564",
    "name": "Cantika Adenira",
    "class": "XI D",
    "gender": "P"
  },
  {
    "id": "13565",
    "nisn": "13565",
    "name": "Daffa Azmi Al Ubaidillah",
    "class": "XI D",
    "gender": "L"
  },
  {
    "id": "13566",
    "nisn": "13566",
    "name": "Dini",
    "class": "XI D",
    "gender": "P"
  },
  {
    "id": "13567",
    "nisn": "13567",
    "name": "Dwi Aryani Nur Gayatri",
    "class": "XI D",
    "gender": "P"
  },
  {
    "id": "13570",
    "nisn": "13570",
    "name": "Fallabyan Chesta Kanaka",
    "class": "XI D",
    "gender": "L"
  },
  {
    "id": "13571",
    "nisn": "13571",
    "name": "Fitri Sari Rahmadani",
    "class": "XI D",
    "gender": "P"
  },
  {
    "id": "13572",
    "nisn": "13572",
    "name": "Hanif Ibrahim Yusroni Sri Mulyono",
    "class": "XI D",
    "gender": "L"
  },
  {
    "id": "13573",
    "nisn": "13573",
    "name": "Helmi Ariq Al Jundi",
    "class": "XI D",
    "gender": "L"
  },
  {
    "id": "13574",
    "nisn": "13574",
    "name": "Indira Dewi",
    "class": "XI D",
    "gender": "P"
  },
  {
    "id": "13575",
    "nisn": "13575",
    "name": "Kalista Widya Amanda",
    "class": "XI D",
    "gender": "P"
  },
  {
    "id": "13467",
    "nisn": "13467",
    "name": "Latisha Azkia Santoso",
    "class": "XI D",
    "gender": "P"
  },
  {
    "id": "13576",
    "nisn": "13576",
    "name": "Lidya Safitri",
    "class": "XI D",
    "gender": "P"
  },
  {
    "id": "13577",
    "nisn": "13577",
    "name": "Lugas Setia Utami",
    "class": "XI D",
    "gender": "P"
  },
  {
    "id": "13578",
    "nisn": "13578",
    "name": "Muhamad Fajar Roziqin",
    "class": "XI D",
    "gender": "L"
  },
  {
    "id": "13579",
    "nisn": "13579",
    "name": "Muhammad Hanif Abdullah",
    "class": "XI D",
    "gender": "L"
  },
  {
    "id": "13580",
    "nisn": "13580",
    "name": "Muhammad Iqbal Alfarizi",
    "class": "XI D",
    "gender": "L"
  },
  {
    "id": "13468",
    "nisn": "13468",
    "name": "Muhammad Nur Wasik",
    "class": "XI D",
    "gender": "L"
  },
  {
    "id": "13679",
    "nisn": "13679",
    "name": "Muhammad Raihan Akbar",
    "class": "XI D",
    "gender": "L"
  },
  {
    "id": "13471",
    "nisn": "13471",
    "name": "Nafizza Ulinuha Mahgmud",
    "class": "XI D",
    "gender": "P"
  },
  {
    "id": "13582",
    "nisn": "13582",
    "name": "Nawang Socphiana",
    "class": "XI D",
    "gender": "P"
  },
  {
    "id": "13473",
    "nisn": "13473",
    "name": "Nuha Hasiba Desiva Putri",
    "class": "XI D",
    "gender": "P"
  },
  {
    "id": "13583",
    "nisn": "13583",
    "name": "Nurrahma Susanti",
    "class": "XI D",
    "gender": "P"
  },
  {
    "id": "13474",
    "nisn": "13474",
    "name": "Putri Cahyaningsih",
    "class": "XI D",
    "gender": "P"
  },
  {
    "id": "13806",
    "nisn": "13806",
    "name": "Raafi Putra Ramadhan",
    "class": "XI D",
    "gender": "L"
  },
  {
    "id": "13585",
    "nisn": "13585",
    "name": "Resya Nur Farahida",
    "class": "XI D",
    "gender": "P"
  },
  {
    "id": "13586",
    "nisn": "13586",
    "name": "Sabriano Babay Putra",
    "class": "XI D",
    "gender": "L"
  },
  {
    "id": "13587",
    "nisn": "13587",
    "name": "Sabrina Aulia Hanif",
    "class": "XI D",
    "gender": "P"
  },
  {
    "id": "13477",
    "nisn": "13477",
    "name": "Salsabila Rihaadatul Aisya",
    "class": "XI D",
    "gender": "P"
  },
  {
    "id": "13589",
    "nisn": "13589",
    "name": "Titania Tri Arinda Pratiwi",
    "class": "XI D",
    "gender": "P"
  },
  {
    "id": "13590",
    "nisn": "13590",
    "name": "Vicky Elviana",
    "class": "XI D",
    "gender": "P"
  },
  {
    "id": "13690",
    "nisn": "13690",
    "name": "Yasmin Mumtaz",
    "class": "XI D",
    "gender": "P"
  },
  {
    "id": "13591",
    "nisn": "13591",
    "name": "Abdillah",
    "class": "XI E",
    "gender": "L"
  },
  {
    "id": "13592",
    "nisn": "13592",
    "name": "Ajeza Ardianzah",
    "class": "XI E",
    "gender": "P"
  },
  {
    "id": "13594",
    "nisn": "13594",
    "name": "Andina Violedya Fauziyah",
    "class": "XI E",
    "gender": "P"
  },
  {
    "id": "13595",
    "nisn": "13595",
    "name": "Anisah Maftuhah",
    "class": "XI E",
    "gender": "P"
  },
  {
    "id": "13596",
    "nisn": "13596",
    "name": "Arkaan Kamal Rosanto",
    "class": "XI E",
    "gender": "L"
  },
  {
    "id": "13598",
    "nisn": "13598",
    "name": "Bilqis Fauziah Lubis",
    "class": "XI E",
    "gender": "P"
  },
  {
    "id": "13599",
    "nisn": "13599",
    "name": "Fahrini Eka Nastiti",
    "class": "XI E",
    "gender": "P"
  },
  {
    "id": "13638",
    "nisn": "13638",
    "name": "Farel Zaidan Fattah",
    "class": "XI E",
    "gender": "L"
  },
  {
    "id": "13600",
    "nisn": "13600",
    "name": "Febriana Via Nurazizah",
    "class": "XI E",
    "gender": "P"
  },
  {
    "id": "13601",
    "nisn": "13601",
    "name": "Fiona Anggun Dwiyani",
    "class": "XI E",
    "gender": "P"
  },
  {
    "id": "13602",
    "nisn": "13602",
    "name": "Imroatu Fatifatussa'Adah",
    "class": "XI E",
    "gender": "P"
  },
  {
    "id": "13604",
    "nisn": "13604",
    "name": "Januar Tirta Na'Afian",
    "class": "XI E",
    "gender": "L"
  },
  {
    "id": "13605",
    "nisn": "13605",
    "name": "Khaila Alma Putri",
    "class": "XI E",
    "gender": "P"
  },
  {
    "id": "13606",
    "nisn": "13606",
    "name": "Khairunisa Ardina Putri",
    "class": "XI E",
    "gender": "P"
  },
  {
    "id": "13652",
    "nisn": "13652",
    "name": "M. Fairuzzizuan",
    "class": "XI E",
    "gender": "L"
  },
  {
    "id": "13607",
    "nisn": "13607",
    "name": "Maretha Puji Astuti",
    "class": "XI E",
    "gender": "P"
  },
  {
    "id": "13608",
    "nisn": "13608",
    "name": "Mauliya Fakrun Nisa",
    "class": "XI E",
    "gender": "P"
  },
  {
    "id": "13609",
    "nisn": "13609",
    "name": "May Try 'Ainy",
    "class": "XI E",
    "gender": "P"
  },
  {
    "id": "13610",
    "nisn": "13610",
    "name": "Mughny Arkan Khoiry",
    "class": "XI E",
    "gender": "L"
  },
  {
    "id": "13612",
    "nisn": "13612",
    "name": "Muslimah Dewi Nurcahyani",
    "class": "XI E",
    "gender": "P"
  },
  {
    "id": "13613",
    "nisn": "13613",
    "name": "Naava Fitri Athifa",
    "class": "XI E",
    "gender": "P"
  },
  {
    "id": "13614",
    "nisn": "13614",
    "name": "Nindy Cahayani Perwitasari",
    "class": "XI E",
    "gender": "P"
  },
  {
    "id": "13615",
    "nisn": "13615",
    "name": "Nita Aulia",
    "class": "XI E",
    "gender": "P"
  },
  {
    "id": "13616",
    "nisn": "13616",
    "name": "Nurul Qurrota A'Yun",
    "class": "XI E",
    "gender": "P"
  },
  {
    "id": "13617",
    "nisn": "13617",
    "name": "Ocen Arosyidah Nurul Aini",
    "class": "XI E",
    "gender": "P"
  },
  {
    "id": "13618",
    "nisn": "13618",
    "name": "Raniya Fatina Anha",
    "class": "XI E",
    "gender": "P"
  },
  {
    "id": "13619",
    "nisn": "13619",
    "name": "Ririn Wulan Damayanti",
    "class": "XI E",
    "gender": "P"
  },
  {
    "id": "13620",
    "nisn": "13620",
    "name": "Rita Tri Lestari",
    "class": "XI E",
    "gender": "P"
  },
  {
    "id": "13661",
    "nisn": "13661",
    "name": "Salsabila Rahma Abidah",
    "class": "XI E",
    "gender": "P"
  },
  {
    "id": "13622",
    "nisn": "13622",
    "name": "Salwa Fatmawati",
    "class": "XI E",
    "gender": "P"
  },
  {
    "id": "13623",
    "nisn": "13623",
    "name": "Siti Nur Hawa",
    "class": "XI E",
    "gender": "P"
  },
  {
    "id": "13624",
    "nisn": "13624",
    "name": "Taib Humaini",
    "class": "XI E",
    "gender": "L"
  },
  {
    "id": "13803",
    "nisn": "13803",
    "name": "Tashya Azzahra Kusuma Wardhani",
    "class": "XI E",
    "gender": "P"
  },
  {
    "id": "13625",
    "nisn": "13625",
    "name": "Tegar Tyas Sulistyo",
    "class": "XI E",
    "gender": "L"
  },
  {
    "id": "13626",
    "nisn": "13626",
    "name": "Yusron Al Mutaqim",
    "class": "XI E",
    "gender": "L"
  },
  {
    "id": "13627",
    "nisn": "13627",
    "name": "Adinda Atika Az Zahra",
    "class": "XI F",
    "gender": "P"
  },
  {
    "id": "13628",
    "nisn": "13628",
    "name": "Affrilliyana Widyaningrum",
    "class": "XI F",
    "gender": "P"
  },
  {
    "id": "13629",
    "nisn": "13629",
    "name": "Aileen Generosita Efreda Dickyanira",
    "class": "XI F",
    "gender": "P"
  },
  {
    "id": "13630",
    "nisn": "13630",
    "name": "Alifa Nur Fitria Larasati",
    "class": "XI F",
    "gender": "P"
  },
  {
    "id": "13631",
    "nisn": "13631",
    "name": "Amaliya Marfuah",
    "class": "XI F",
    "gender": "P"
  },
  {
    "id": "13632",
    "nisn": "13632",
    "name": "Athaya Luthfi Khairunnisa",
    "class": "XI F",
    "gender": "P"
  },
  {
    "id": "13770",
    "nisn": "13770",
    "name": "Aufi Khasanah",
    "class": "XI F",
    "gender": "P"
  },
  {
    "id": "13737",
    "nisn": "13737",
    "name": "Devina Aprilia Suryaningtyas",
    "class": "XI F",
    "gender": "P"
  },
  {
    "id": "13634",
    "nisn": "13634",
    "name": "Dian Eka Nurmaningsih",
    "class": "XI F",
    "gender": "P"
  },
  {
    "id": "13637",
    "nisn": "13637",
    "name": "Faras Faqihuddin",
    "class": "XI F",
    "gender": "L"
  },
  {
    "id": "13668",
    "nisn": "13668",
    "name": "Febi Afiq Gusniar",
    "class": "XI F",
    "gender": "L"
  },
  {
    "id": "13669",
    "nisn": "13669",
    "name": "Fedora Ilahi",
    "class": "XI F",
    "gender": "L"
  },
  {
    "id": "13640",
    "nisn": "13640",
    "name": "Fitria Rahma Aziza",
    "class": "XI F",
    "gender": "P"
  },
  {
    "id": "13641",
    "nisn": "13641",
    "name": "Haikal Bily",
    "class": "XI F",
    "gender": "L"
  },
  {
    "id": "13642",
    "nisn": "13642",
    "name": "Hamizam Maznan Afzhal Muhammadan",
    "class": "XI F",
    "gender": "L"
  },
  {
    "id": "13643",
    "nisn": "13643",
    "name": "Hendrik Iqbal Setiawan",
    "class": "XI F",
    "gender": "L"
  },
  {
    "id": "13603",
    "nisn": "13603",
    "name": "Indah Lulu Salsabila",
    "class": "XI F",
    "gender": "P"
  },
  {
    "id": "13645",
    "nisn": "13645",
    "name": "Kanza Aulia Putri",
    "class": "XI F",
    "gender": "P"
  },
  {
    "id": "13646",
    "nisn": "13646",
    "name": "Khansa Athalia Widianto",
    "class": "XI F",
    "gender": "P"
  },
  {
    "id": "13647",
    "nisn": "13647",
    "name": "Khoirunnisa Amelia Putri",
    "class": "XI F",
    "gender": "P"
  },
  {
    "id": "13648",
    "nisn": "13648",
    "name": "Kumala Cinta Aulia",
    "class": "XI F",
    "gender": "P"
  },
  {
    "id": "13783",
    "nisn": "13783",
    "name": "Kunti Shofiyatun Nafisah",
    "class": "XI F",
    "gender": "P"
  },
  {
    "id": "13649",
    "nisn": "13649",
    "name": "Lailatul Maimunah Azzahra",
    "class": "XI F",
    "gender": "P"
  },
  {
    "id": "13651",
    "nisn": "13651",
    "name": "Luthfi Rahmawati",
    "class": "XI F",
    "gender": "P"
  },
  {
    "id": "13653",
    "nisn": "13653",
    "name": "Meiya Natania Hafshah",
    "class": "XI F",
    "gender": "P"
  },
  {
    "id": "13654",
    "nisn": "13654",
    "name": "Muhamad Zainul Abidin",
    "class": "XI F",
    "gender": "L"
  },
  {
    "id": "13807",
    "nisn": "13807",
    "name": "Muhammad Ali Ridha",
    "class": "XI F",
    "gender": "L"
  },
  {
    "id": "13655",
    "nisn": "13655",
    "name": "Muhammad Hanny Fakhri Fadhillah",
    "class": "XI F",
    "gender": "L"
  },
  {
    "id": "13678",
    "nisn": "13678",
    "name": "Muhammad Irkham Zain",
    "class": "XI F",
    "gender": "L"
  },
  {
    "id": "13680",
    "nisn": "13680",
    "name": "Muktafi Haiki Azzam",
    "class": "XI F",
    "gender": "L"
  },
  {
    "id": "13657",
    "nisn": "13657",
    "name": "Nabila Choirunnisa",
    "class": "XI F",
    "gender": "P"
  },
  {
    "id": "13658",
    "nisn": "13658",
    "name": "Nandi Pramudya",
    "class": "XI F",
    "gender": "L"
  },
  {
    "id": "13722",
    "nisn": "13722",
    "name": "Novi Wahidatul Maulina",
    "class": "XI F",
    "gender": "P"
  },
  {
    "id": "13660",
    "nisn": "13660",
    "name": "Ridwan Hadi Akmal Fadilah",
    "class": "XI F",
    "gender": "L"
  },
  {
    "id": "13684",
    "nisn": "13684",
    "name": "Rifka Anindya Putri",
    "class": "XI F",
    "gender": "P"
  },
  {
    "id": "13662",
    "nisn": "13662",
    "name": "Zainny Rahma Lathifah",
    "class": "XI F",
    "gender": "P"
  },
  {
    "id": "13663",
    "nisn": "13663",
    "name": "Agustin Villa Rahmawati",
    "class": "XI G",
    "gender": "P"
  },
  {
    "id": "13664",
    "nisn": "13664",
    "name": "Alfino Basri Maulana",
    "class": "XI G",
    "gender": "L"
  },
  {
    "id": "13488",
    "nisn": "13488",
    "name": "Azizah Novitasari",
    "class": "XI G",
    "gender": "P"
  },
  {
    "id": "13563",
    "nisn": "13563",
    "name": "Bilqis Maulita Salsabila",
    "class": "XI G",
    "gender": "P"
  },
  {
    "id": "13666",
    "nisn": "13666",
    "name": "Della Rahmawati",
    "class": "XI G",
    "gender": "P"
  },
  {
    "id": "13633",
    "nisn": "13633",
    "name": "Devilia Larasati",
    "class": "XI G",
    "gender": "P"
  },
  {
    "id": "13667",
    "nisn": "13667",
    "name": "Elvaretta Dhinda Pratiwi",
    "class": "XI G",
    "gender": "P"
  },
  {
    "id": "13639",
    "nisn": "13639",
    "name": "Fatih Makhdania Nirmalasari",
    "class": "XI G",
    "gender": "P"
  },
  {
    "id": "13777",
    "nisn": "13777",
    "name": "Gandra Castra Alraakan",
    "class": "XI G",
    "gender": "L"
  },
  {
    "id": "13671",
    "nisn": "13671",
    "name": "Haidar Yudha Wiratama",
    "class": "XI G",
    "gender": "L"
  },
  {
    "id": "13672",
    "nisn": "13672",
    "name": "Hernando Valda Samas",
    "class": "XI G",
    "gender": "L"
  },
  {
    "id": "13673",
    "nisn": "13673",
    "name": "Keyla Yusufa Aulia Majid",
    "class": "XI G",
    "gender": "L"
  },
  {
    "id": "13500",
    "nisn": "13500",
    "name": "Khoirul Umam",
    "class": "XI G",
    "gender": "L"
  },
  {
    "id": "13674",
    "nisn": "13674",
    "name": "Krisna Andhika Romadhona",
    "class": "XI G",
    "gender": "L"
  },
  {
    "id": "13675",
    "nisn": "13675",
    "name": "Leonel Fadli Fairus",
    "class": "XI G",
    "gender": "L"
  },
  {
    "id": "13650",
    "nisn": "13650",
    "name": "Livia Intan Quraini",
    "class": "XI G",
    "gender": "P"
  },
  {
    "id": "13676",
    "nisn": "13676",
    "name": "Lutfika Rosita Barikhliya",
    "class": "XI G",
    "gender": "P"
  },
  {
    "id": "14164",
    "nisn": "14164",
    "name": "Ozella Nugroho",
    "class": "XI G",
    "gender": "P"
  },
  {
    "id": "13682",
    "nisn": "13682",
    "name": "Putri Aprilia",
    "class": "XI G",
    "gender": "P"
  },
  {
    "id": "13683",
    "nisn": "13683",
    "name": "Ratna Putri Lestari",
    "class": "XI G",
    "gender": "P"
  },
  {
    "id": "13685",
    "nisn": "13685",
    "name": "Riko Dwi Andriyanto",
    "class": "XI G",
    "gender": "L"
  },
  {
    "id": "13687",
    "nisn": "13687",
    "name": "Rizka Handayani",
    "class": "XI G",
    "gender": "P"
  },
  {
    "id": "13689",
    "nisn": "13689",
    "name": "Syafrida Hasna Nuraini",
    "class": "XI G",
    "gender": "P"
  },
  {
    "id": "13691",
    "nisn": "13691",
    "name": "Yunita Eka Olifia",
    "class": "XI G",
    "gender": "P"
  },
  {
    "id": "13692",
    "nisn": "13692",
    "name": "Zaskia Najma Amania",
    "class": "XI G",
    "gender": "P"
  },
  {
    "id": "13693",
    "nisn": "13693",
    "name": "Afida Putri Khoirunisa",
    "class": "XI H",
    "gender": "P"
  },
  {
    "id": "13694",
    "nisn": "13694",
    "name": "Akrom Sholhan Ramadhani",
    "class": "XI H",
    "gender": "L"
  },
  {
    "id": "13695",
    "nisn": "13695",
    "name": "Alinda Dwi Wahyuningsih",
    "class": "XI H",
    "gender": "P"
  },
  {
    "id": "13696",
    "nisn": "13696",
    "name": "Andin Rafika Nimas Woro",
    "class": "XI H",
    "gender": "P"
  },
  {
    "id": "13697",
    "nisn": "13697",
    "name": "Anggun Dwi Bayu Asri",
    "class": "XI H",
    "gender": "P"
  },
  {
    "id": "13699",
    "nisn": "13699",
    "name": "Anisa Rahmawati",
    "class": "XI H",
    "gender": "P"
  },
  {
    "id": "13700",
    "nisn": "13700",
    "name": "Annisa Meidina Amir",
    "class": "XI H",
    "gender": "P"
  },
  {
    "id": "13701",
    "nisn": "13701",
    "name": "Asa Syifa Qolbi",
    "class": "XI H",
    "gender": "P"
  },
  {
    "id": "13702",
    "nisn": "13702",
    "name": "Aulia Rahmadani",
    "class": "XI H",
    "gender": "P"
  },
  {
    "id": "13703",
    "nisn": "13703",
    "name": "Celinsky Sichylia Arthamevira",
    "class": "XI H",
    "gender": "P"
  },
  {
    "id": "13704",
    "nisn": "13704",
    "name": "Devita Purnama Sari",
    "class": "XI H",
    "gender": "P"
  },
  {
    "id": "13456",
    "nisn": "13456",
    "name": "Dewi Nur Khasanah",
    "class": "XI H",
    "gender": "P"
  },
  {
    "id": "13705",
    "nisn": "13705",
    "name": "Diego Faizzata",
    "class": "XI H",
    "gender": "L"
  },
  {
    "id": "13706",
    "nisn": "13706",
    "name": "Fadhillah Firyan Nur Salwa",
    "class": "XI H",
    "gender": "L"
  },
  {
    "id": "13707",
    "nisn": "13707",
    "name": "Febriyana Chusnul Dwiyastuti",
    "class": "XI H",
    "gender": "P"
  },
  {
    "id": "13708",
    "nisn": "13708",
    "name": "Feri Setiawan",
    "class": "XI H",
    "gender": "L"
  },
  {
    "id": "13709",
    "nisn": "13709",
    "name": "Galfin Rafa Ramadhan",
    "class": "XI H",
    "gender": "L"
  },
  {
    "id": "13710",
    "nisn": "13710",
    "name": "Habib Azzam Shiddik",
    "class": "XI H",
    "gender": "L"
  },
  {
    "id": "13711",
    "nisn": "13711",
    "name": "Ikhsan Kamil Isnaini",
    "class": "XI H",
    "gender": "L"
  },
  {
    "id": "13713",
    "nisn": "13713",
    "name": "Khafidh Muhsin Rauf",
    "class": "XI H",
    "gender": "L"
  },
  {
    "id": "13714",
    "nisn": "13714",
    "name": "Leini Setyaningrum",
    "class": "XI H",
    "gender": "P"
  },
  {
    "id": "13802",
    "nisn": "13802",
    "name": "Lusiana Damayanti",
    "class": "XI H",
    "gender": "P"
  },
  {
    "id": "13716",
    "nisn": "13716",
    "name": "Muhamad Fajar Khairudin",
    "class": "XI H",
    "gender": "L"
  },
  {
    "id": "13717",
    "nisn": "13717",
    "name": "Muhammad Nur Ihsan",
    "class": "XI H",
    "gender": "L"
  },
  {
    "id": "13718",
    "nisn": "13718",
    "name": "Naisha Syafa Malinda",
    "class": "XI H",
    "gender": "P"
  },
  {
    "id": "13719",
    "nisn": "13719",
    "name": "Nasya Maulinda Rahma",
    "class": "XI H",
    "gender": "P"
  },
  {
    "id": "13720",
    "nisn": "13720",
    "name": "Naufal Hendry Fauzan",
    "class": "XI H",
    "gender": "L"
  },
  {
    "id": "13721",
    "nisn": "13721",
    "name": "Naurah Nadhifah",
    "class": "XI H",
    "gender": "P"
  },
  {
    "id": "13659",
    "nisn": "13659",
    "name": "Radhite Dhanu Antari",
    "class": "XI H",
    "gender": "L"
  },
  {
    "id": "13723",
    "nisn": "13723",
    "name": "Restu Aji Bramantyo",
    "class": "XI H",
    "gender": "L"
  },
  {
    "id": "13724",
    "nisn": "13724",
    "name": "Rindy Atika Joti Istiqomah",
    "class": "XI H",
    "gender": "P"
  },
  {
    "id": "13725",
    "nisn": "13725",
    "name": "Riyan Rizky Saputra",
    "class": "XI H",
    "gender": "L"
  },
  {
    "id": "13726",
    "nisn": "13726",
    "name": "Rona Indah Nur'Aini",
    "class": "XI H",
    "gender": "P"
  },
  {
    "id": "13727",
    "nisn": "13727",
    "name": "Syifa Aulia Putri",
    "class": "XI H",
    "gender": "P"
  },
  {
    "id": "13728",
    "nisn": "13728",
    "name": "Wina Putri Athaya Almaghfirah",
    "class": "XI H",
    "gender": "P"
  },
  {
    "id": "13764",
    "nisn": "13764",
    "name": "Abdurrohman Al Akhyar",
    "class": "XI I",
    "gender": "L"
  },
  {
    "id": "13730",
    "nisn": "13730",
    "name": "Ahmad Muharrom Al Firdausy",
    "class": "XI I",
    "gender": "L"
  },
  {
    "id": "13767",
    "nisn": "13767",
    "name": "Aisyah Arifatul Abidah",
    "class": "XI I",
    "gender": "P"
  },
  {
    "id": "13732",
    "nisn": "13732",
    "name": "Aris Budiyono",
    "class": "XI I",
    "gender": "L"
  },
  {
    "id": "13733",
    "nisn": "13733",
    "name": "Aufannisa",
    "class": "XI I",
    "gender": "P"
  },
  {
    "id": "13735",
    "nisn": "13735",
    "name": "Cahya Putri Kinasih",
    "class": "XI I",
    "gender": "P"
  },
  {
    "id": "13736",
    "nisn": "13736",
    "name": "Devin Setiawan",
    "class": "XI I",
    "gender": "L"
  },
  {
    "id": "13773",
    "nisn": "13773",
    "name": "Dinar Mulya Pangestu",
    "class": "XI I",
    "gender": "L"
  },
  {
    "id": "13635",
    "nisn": "13635",
    "name": "Faira Tsania Kaila Silmi",
    "class": "XI I",
    "gender": "P"
  },
  {
    "id": "13739",
    "nisn": "13739",
    "name": "Fathimah Azzahra",
    "class": "XI I",
    "gender": "P"
  },
  {
    "id": "13740",
    "nisn": "13740",
    "name": "Felisa Yuliyani",
    "class": "XI I",
    "gender": "P"
  },
  {
    "id": "13741",
    "nisn": "13741",
    "name": "Ghyna Auliya Az Zahra",
    "class": "XI I",
    "gender": "P"
  },
  {
    "id": "13742",
    "nisn": "13742",
    "name": "Guno Nugroho Wati",
    "class": "XI I",
    "gender": "P"
  },
  {
    "id": "13744",
    "nisn": "13744",
    "name": "Hidayatul Mukaromah",
    "class": "XI I",
    "gender": "P"
  },
  {
    "id": "13745",
    "nisn": "13745",
    "name": "Hilma Naila Burki",
    "class": "XI I",
    "gender": "P"
  },
  {
    "id": "13746",
    "nisn": "13746",
    "name": "Jahwa Shafa Azzahra",
    "class": "XI I",
    "gender": "P"
  },
  {
    "id": "13780",
    "nisn": "13780",
    "name": "Jesysca Nur Kasih",
    "class": "XI I",
    "gender": "P"
  },
  {
    "id": "13781",
    "nisn": "13781",
    "name": "Khansa Bela Khairunnisa",
    "class": "XI I",
    "gender": "P"
  },
  {
    "id": "13748",
    "nisn": "13748",
    "name": "Marcell Imeraldi Hutama",
    "class": "XI I",
    "gender": "L"
  },
  {
    "id": "13786",
    "nisn": "13786",
    "name": "Muhamad Khoirul Rizal",
    "class": "XI I",
    "gender": "L"
  },
  {
    "id": "13749",
    "nisn": "13749",
    "name": "Muhammad Artha Aristya Wiguna",
    "class": "XI I",
    "gender": "L"
  },
  {
    "id": "13750",
    "nisn": "13750",
    "name": "Muhammad Lutfi Rochman",
    "class": "XI I",
    "gender": "L"
  },
  {
    "id": "13751",
    "nisn": "13751",
    "name": "Neza Putri Haryanti",
    "class": "XI I",
    "gender": "P"
  },
  {
    "id": "13752",
    "nisn": "13752",
    "name": "Nurul Muslimatul 'Izza",
    "class": "XI I",
    "gender": "P"
  },
  {
    "id": "13753",
    "nisn": "13753",
    "name": "Putri Herlina Maulida",
    "class": "XI I",
    "gender": "P"
  },
  {
    "id": "13754",
    "nisn": "13754",
    "name": "Qithfiya Reiha Nazhifa",
    "class": "XI I",
    "gender": "P"
  },
  {
    "id": "13755",
    "nisn": "13755",
    "name": "Rahma Aliya",
    "class": "XI I",
    "gender": "P"
  },
  {
    "id": "13757",
    "nisn": "13757",
    "name": "Ridwan Oktavian Hegar",
    "class": "XI I",
    "gender": "L"
  },
  {
    "id": "13758",
    "nisn": "13758",
    "name": "Rif`Ah Rufaidah",
    "class": "XI I",
    "gender": "P"
  },
  {
    "id": "13759",
    "nisn": "13759",
    "name": "Ririna Najma Millati",
    "class": "XI I",
    "gender": "P"
  },
  {
    "id": "13760",
    "nisn": "13760",
    "name": "Riska Yunita",
    "class": "XI I",
    "gender": "P"
  },
  {
    "id": "13761",
    "nisn": "13761",
    "name": "Risqi Fatah Fariqi",
    "class": "XI I",
    "gender": "L"
  },
  {
    "id": "13795",
    "nisn": "13795",
    "name": "Rizki Apriliyani",
    "class": "XI I",
    "gender": "P"
  },
  {
    "id": "13763",
    "nisn": "13763",
    "name": "Yuaneta Latifatun Nahdiah",
    "class": "XI I",
    "gender": "P"
  },
  {
    "id": "13729",
    "nisn": "13729",
    "name": "Adilla Luna Nurhayda",
    "class": "XI J",
    "gender": "P"
  },
  {
    "id": "13766",
    "nisn": "13766",
    "name": "Ahmad Zein",
    "class": "XI J",
    "gender": "L"
  },
  {
    "id": "13768",
    "nisn": "13768",
    "name": "Alfan Safa Maulana",
    "class": "XI J",
    "gender": "L"
  },
  {
    "id": "13698",
    "nisn": "13698",
    "name": "Anik Lailatul Widayanti",
    "class": "XI J",
    "gender": "P"
  },
  {
    "id": "13731",
    "nisn": "13731",
    "name": "Annisa Nurrohmah",
    "class": "XI J",
    "gender": "P"
  },
  {
    "id": "13771",
    "nisn": "13771",
    "name": "Bagas Arif Syaifudin",
    "class": "XI J",
    "gender": "L"
  },
  {
    "id": "13772",
    "nisn": "13772",
    "name": "Dewi Kunniatus Sa'Idah Al'Abidin",
    "class": "XI J",
    "gender": "P"
  },
  {
    "id": "13774",
    "nisn": "13774",
    "name": "Dini Kurnia Sari",
    "class": "XI J",
    "gender": "P"
  },
  {
    "id": "13775",
    "nisn": "13775",
    "name": "Farel Aditya Pratama",
    "class": "XI J",
    "gender": "L"
  },
  {
    "id": "13738",
    "nisn": "13738",
    "name": "Farid Wajdi",
    "class": "XI J",
    "gender": "L"
  },
  {
    "id": "13776",
    "nisn": "13776",
    "name": "Firman Bayu Aji Al Huda",
    "class": "XI J",
    "gender": "L"
  },
  {
    "id": "13743",
    "nisn": "13743",
    "name": "Hanan Dwinanto",
    "class": "XI J",
    "gender": "L"
  },
  {
    "id": "13778",
    "nisn": "13778",
    "name": "Idzlal Farras Afifah",
    "class": "XI J",
    "gender": "P"
  },
  {
    "id": "13779",
    "nisn": "13779",
    "name": "Intan Hidayana",
    "class": "XI J",
    "gender": "P"
  },
  {
    "id": "13747",
    "nisn": "13747",
    "name": "Khoirunnisa",
    "class": "XI J",
    "gender": "P"
  },
  {
    "id": "13715",
    "nisn": "13715",
    "name": "Lyla Fajar Febriyani",
    "class": "XI J",
    "gender": "P"
  },
  {
    "id": "13784",
    "nisn": "13784",
    "name": "Maulida Fitriana",
    "class": "XI J",
    "gender": "P"
  },
  {
    "id": "13788",
    "nisn": "13788",
    "name": "Muhamad Ibrahim",
    "class": "XI J",
    "gender": "L"
  },
  {
    "id": "13787",
    "nisn": "13787",
    "name": "Muhammad Ammar Hibban Maulana",
    "class": "XI J",
    "gender": "L"
  },
  {
    "id": "13789",
    "nisn": "13789",
    "name": "Muhammad Nabil Setiawan",
    "class": "XI J",
    "gender": "L"
  },
  {
    "id": "13656",
    "nisn": "13656",
    "name": "Muhammad Wildan Farid",
    "class": "XI J",
    "gender": "L"
  },
  {
    "id": "13790",
    "nisn": "13790",
    "name": "Muhammad Yusuf Bachtiar",
    "class": "XI J",
    "gender": "L"
  },
  {
    "id": "13791",
    "nisn": "13791",
    "name": "Nur Faizin",
    "class": "XI J",
    "gender": "L"
  },
  {
    "id": "13792",
    "nisn": "13792",
    "name": "Rassya Yuliana Putri",
    "class": "XI J",
    "gender": "P"
  },
  {
    "id": "13794",
    "nisn": "13794",
    "name": "Rezky Pirmansyah",
    "class": "XI J",
    "gender": "L"
  },
  {
    "id": "13796",
    "nisn": "13796",
    "name": "Romandika Maulana Ibrahim",
    "class": "XI J",
    "gender": "L"
  },
  {
    "id": "13762",
    "nisn": "13762",
    "name": "Safira Salsabila",
    "class": "XI J",
    "gender": "P"
  },
  {
    "id": "13797",
    "nisn": "13797",
    "name": "Taufik Aziz Ramadhani",
    "class": "XI J",
    "gender": "L"
  },
  {
    "id": "13798",
    "nisn": "13798",
    "name": "Umma Khislia Nuryani",
    "class": "XI J",
    "gender": "P"
  },
  {
    "id": "13799",
    "nisn": "13799",
    "name": "Winda Nurin Irdina Unaisah",
    "class": "XI J",
    "gender": "P"
  },
  {
    "id": "13149",
    "nisn": "13149",
    "name": "Abdan Adli Failasuf",
    "class": "XII A",
    "gender": "L"
  },
  {
    "id": "13151",
    "nisn": "13151",
    "name": "Ajeng Nindyan Danastri",
    "class": "XII A",
    "gender": "P"
  },
  {
    "id": "13154",
    "nisn": "13154",
    "name": "Astri Nayla Kamila",
    "class": "XII A",
    "gender": "P"
  },
  {
    "id": "13155",
    "nisn": "13155",
    "name": "Aulia Inggit Hapsari",
    "class": "XII A",
    "gender": "P"
  },
  {
    "id": "13082",
    "nisn": "13082",
    "name": "Azam Zaidan",
    "class": "XII A",
    "gender": "L"
  },
  {
    "id": "13083",
    "nisn": "13083",
    "name": "Bagas Dwi Saputra",
    "class": "XII A",
    "gender": "L"
  },
  {
    "id": "13194",
    "nisn": "13194",
    "name": "Cahyani Eka Putri",
    "class": "XII A",
    "gender": "P"
  },
  {
    "id": "13123",
    "nisn": "13123",
    "name": "Devina Khairun Nisa",
    "class": "XII A",
    "gender": "P"
  },
  {
    "id": "13156",
    "nisn": "13156",
    "name": "Ditha Maharani Khoirunnisa",
    "class": "XII A",
    "gender": "P"
  },
  {
    "id": "13368",
    "nisn": "13368",
    "name": "Dyah Lakshita Amara Kapti",
    "class": "XII A",
    "gender": "P"
  },
  {
    "id": "13159",
    "nisn": "13159",
    "name": "Ezhar Putra Priyara",
    "class": "XII A",
    "gender": "L"
  },
  {
    "id": "13087",
    "nisn": "13087",
    "name": "Fatmawati Balqis Aulia Karim Ambadar",
    "class": "XII A",
    "gender": "P"
  },
  {
    "id": "13089",
    "nisn": "13089",
    "name": "Frizkia Risma Lathifah",
    "class": "XII A",
    "gender": "P"
  },
  {
    "id": "13200",
    "nisn": "13200",
    "name": "Grovanhas Kianta Subagyo",
    "class": "XII A",
    "gender": "L"
  },
  {
    "id": "13160",
    "nisn": "13160",
    "name": "Hurun'in Chelseana Khairani",
    "class": "XII A",
    "gender": "P"
  },
  {
    "id": "13162",
    "nisn": "13162",
    "name": "Intan Mustalia Luthfi",
    "class": "XII A",
    "gender": "P"
  },
  {
    "id": "13091",
    "nisn": "13091",
    "name": "Jihan Ramadhani Lestari",
    "class": "XII A",
    "gender": "P"
  },
  {
    "id": "13092",
    "nisn": "13092",
    "name": "Kayla Khairun Nissa",
    "class": "XII A",
    "gender": "P"
  },
  {
    "id": "13094",
    "nisn": "13094",
    "name": "M Ghozy Putra Muslim",
    "class": "XII A",
    "gender": "L"
  },
  {
    "id": "13171",
    "nisn": "13171",
    "name": "Muhammad Muflihul Umam",
    "class": "XII A",
    "gender": "L"
  },
  {
    "id": "13135",
    "nisn": "13135",
    "name": "Muhammad Ridwan Abdillah",
    "class": "XII A",
    "gender": "L"
  },
  {
    "id": "13173",
    "nisn": "13173",
    "name": "Nafiisa Chani Fathin",
    "class": "XII A",
    "gender": "P"
  },
  {
    "id": "13174",
    "nisn": "13174",
    "name": "Najwa Fadhilla Syakieb",
    "class": "XII A",
    "gender": "P"
  },
  {
    "id": "13139",
    "nisn": "13139",
    "name": "Naufal Ammar Adi Ahsan",
    "class": "XII A",
    "gender": "L"
  },
  {
    "id": "13101",
    "nisn": "13101",
    "name": "Naura Amalia Pratiwi",
    "class": "XII A",
    "gender": "P"
  },
  {
    "id": "13176",
    "nisn": "13176",
    "name": "Nayaka Mahardika Hartono",
    "class": "XII A",
    "gender": "L"
  },
  {
    "id": "13140",
    "nisn": "13140",
    "name": "Nimas Annisa Cahyaningtyas",
    "class": "XII A",
    "gender": "P"
  },
  {
    "id": "13102",
    "nisn": "13102",
    "name": "Rafif Gyda Pramana Putra",
    "class": "XII A",
    "gender": "L"
  },
  {
    "id": "13179",
    "nisn": "13179",
    "name": "Risma Kirani Dwi Jayanti",
    "class": "XII A",
    "gender": "P"
  },
  {
    "id": "13216",
    "nisn": "13216",
    "name": "Rr.Aisha Hana Salsabilla Murtini",
    "class": "XII A",
    "gender": "P"
  },
  {
    "id": "13217",
    "nisn": "13217",
    "name": "Sabrina Gyem Malika Devara",
    "class": "XII A",
    "gender": "P"
  },
  {
    "id": "13108",
    "nisn": "13108",
    "name": "Sri Wahyuni Prihatin",
    "class": "XII A",
    "gender": "P"
  },
  {
    "id": "13112",
    "nisn": "13112",
    "name": "Windyastuty Cartenz Moneta",
    "class": "XII A",
    "gender": "P"
  },
  {
    "id": "13182",
    "nisn": "13182",
    "name": "Yunantofa Raihan Ashar",
    "class": "XII A",
    "gender": "L"
  },
  {
    "id": "13183",
    "nisn": "13183",
    "name": "Zahra Aulia Azizah",
    "class": "XII A",
    "gender": "P"
  },
  {
    "id": "13148",
    "nisn": "13148",
    "name": "Zaskia Fatimatu Zahra",
    "class": "XII A",
    "gender": "P"
  },
  {
    "id": "13113",
    "nisn": "13113",
    "name": "Afifah Zaidatul Khusna",
    "class": "XII B",
    "gender": "P"
  },
  {
    "id": "13114",
    "nisn": "13114",
    "name": "Ai Safura Tifa Taufiq",
    "class": "XII B",
    "gender": "P"
  },
  {
    "id": "13115",
    "nisn": "13115",
    "name": "Airini Octaviani",
    "class": "XII B",
    "gender": "P"
  },
  {
    "id": "13116",
    "nisn": "13116",
    "name": "Aliya Aninditha Maheswari",
    "class": "XII B",
    "gender": "P"
  },
  {
    "id": "13117",
    "nisn": "13117",
    "name": "Andriyani Zahra",
    "class": "XII B",
    "gender": "P"
  },
  {
    "id": "13118",
    "nisn": "13118",
    "name": "Apriliana Tiara Utami",
    "class": "XII B",
    "gender": "P"
  },
  {
    "id": "13086",
    "nisn": "13086",
    "name": "Cinta Tyas Ramadhani",
    "class": "XII B",
    "gender": "P"
  },
  {
    "id": "13804",
    "nisn": "13804",
    "name": "Collin Lucian Loukeswara",
    "class": "XII B",
    "gender": "L"
  },
  {
    "id": "13119",
    "nisn": "13119",
    "name": "Danendra Farras Maulana Suci",
    "class": "XII B",
    "gender": "L"
  },
  {
    "id": "13120",
    "nisn": "13120",
    "name": "Della Erie Swandari",
    "class": "XII B",
    "gender": "P"
  },
  {
    "id": "13121",
    "nisn": "13121",
    "name": "Denishsya Dzahrotu Shita",
    "class": "XII B",
    "gender": "P"
  },
  {
    "id": "13122",
    "nisn": "13122",
    "name": "Destiva Wahyu Mardiningsih",
    "class": "XII B",
    "gender": "P"
  },
  {
    "id": "13124",
    "nisn": "13124",
    "name": "Dyvina Nabill Firdauzi Wibowo",
    "class": "XII B",
    "gender": "P"
  },
  {
    "id": "13125",
    "nisn": "13125",
    "name": "Fauziah Eliya Putri",
    "class": "XII B",
    "gender": "P"
  },
  {
    "id": "13126",
    "nisn": "13126",
    "name": "Gema Aptha Wijaya",
    "class": "XII B",
    "gender": "L"
  },
  {
    "id": "13127",
    "nisn": "13127",
    "name": "Gisela Septiana",
    "class": "XII B",
    "gender": "P"
  },
  {
    "id": "13128",
    "nisn": "13128",
    "name": "Habibi Alfarizqi",
    "class": "XII B",
    "gender": "L"
  },
  {
    "id": "13129",
    "nisn": "13129",
    "name": "Hanif Fakhruddin",
    "class": "XII B",
    "gender": "L"
  },
  {
    "id": "13130",
    "nisn": "13130",
    "name": "Happy Aura Majid",
    "class": "XII B",
    "gender": "P"
  },
  {
    "id": "13131",
    "nisn": "13131",
    "name": "Keyzar Hannid Taqwa Dzikrulloh",
    "class": "XII B",
    "gender": "L"
  },
  {
    "id": "13132",
    "nisn": "13132",
    "name": "Malika Aurelia",
    "class": "XII B",
    "gender": "P"
  },
  {
    "id": "13133",
    "nisn": "13133",
    "name": "Muhammad Miftakhul Huda",
    "class": "XII B",
    "gender": "L"
  },
  {
    "id": "13134",
    "nisn": "13134",
    "name": "Muhammad Ridho Arrafif",
    "class": "XII B",
    "gender": "L"
  },
  {
    "id": "13098",
    "nisn": "13098",
    "name": "Muhammad Rizqi Ramadhan",
    "class": "XII B",
    "gender": "L"
  },
  {
    "id": "13136",
    "nisn": "13136",
    "name": "Mutia Tastabitul Akmila",
    "class": "XII B",
    "gender": "P"
  },
  {
    "id": "13137",
    "nisn": "13137",
    "name": "Nadia Syifa Adiyati",
    "class": "XII B",
    "gender": "P"
  },
  {
    "id": "13138",
    "nisn": "13138",
    "name": "Naila Handayani Indri",
    "class": "XII B",
    "gender": "P"
  },
  {
    "id": "13099",
    "nisn": "13099",
    "name": "Najwa Keyla Hanin",
    "class": "XII B",
    "gender": "P"
  },
  {
    "id": "13141",
    "nisn": "13141",
    "name": "Nisa Arikhatul Alliyah",
    "class": "XII B",
    "gender": "P"
  },
  {
    "id": "13142",
    "nisn": "13142",
    "name": "Putri Lestari",
    "class": "XII B",
    "gender": "P"
  },
  {
    "id": "13143",
    "nisn": "13143",
    "name": "Radeetya Rashid Ryanshah",
    "class": "XII B",
    "gender": "L"
  },
  {
    "id": "13144",
    "nisn": "13144",
    "name": "Rina Wijayanti",
    "class": "XII B",
    "gender": "P"
  },
  {
    "id": "13145",
    "nisn": "13145",
    "name": "Safha Alifah Anjani",
    "class": "XII B",
    "gender": "P"
  },
  {
    "id": "13146",
    "nisn": "13146",
    "name": "Safira Nur Aulia",
    "class": "XII B",
    "gender": "P"
  },
  {
    "id": "13109",
    "nisn": "13109",
    "name": "Syafa Rahma Kirani",
    "class": "XII B",
    "gender": "P"
  },
  {
    "id": "13147",
    "nisn": "13147",
    "name": "Windiana Ayu Lestari",
    "class": "XII B",
    "gender": "P"
  },
  {
    "id": "13150",
    "nisn": "13150",
    "name": "Adib Chasbia Rahman",
    "class": "XII C",
    "gender": "L"
  },
  {
    "id": "13152",
    "nisn": "13152",
    "name": "Akmal Fahri Navyan Saputra",
    "class": "XII C",
    "gender": "L"
  },
  {
    "id": "13077",
    "nisn": "13077",
    "name": "Alifa Arthafah Tsaqif",
    "class": "XII C",
    "gender": "P"
  },
  {
    "id": "13079",
    "nisn": "13079",
    "name": "Asyifa Dwi Listyana",
    "class": "XII C",
    "gender": "P"
  },
  {
    "id": "13080",
    "nisn": "13080",
    "name": "Aulia Zahra Dewi",
    "class": "XII C",
    "gender": "P"
  },
  {
    "id": "13081",
    "nisn": "13081",
    "name": "Ayudia Salsabila",
    "class": "XII C",
    "gender": "P"
  },
  {
    "id": "13084",
    "nisn": "13084",
    "name": "Cherryke Rahma Nur Anandita",
    "class": "XII C",
    "gender": "P"
  },
  {
    "id": "13085",
    "nisn": "13085",
    "name": "Cika Elmira Dewi",
    "class": "XII C",
    "gender": "P"
  },
  {
    "id": "13157",
    "nisn": "13157",
    "name": "Elya Wahyu Magfiroh",
    "class": "XII C",
    "gender": "P"
  },
  {
    "id": "13158",
    "nisn": "13158",
    "name": "Erlicha Virdayanti",
    "class": "XII C",
    "gender": "P"
  },
  {
    "id": "13088",
    "nisn": "13088",
    "name": "Fina Aweyosi Ristiani",
    "class": "XII C",
    "gender": "P"
  },
  {
    "id": "13161",
    "nisn": "13161",
    "name": "Indah Prameswari Amanda Putri",
    "class": "XII C",
    "gender": "P"
  },
  {
    "id": "13163",
    "nisn": "13163",
    "name": "Isna Nailatul Izzah",
    "class": "XII C",
    "gender": "P"
  },
  {
    "id": "13165",
    "nisn": "13165",
    "name": "Izatunnisa'",
    "class": "XII C",
    "gender": "P"
  },
  {
    "id": "13166",
    "nisn": "13166",
    "name": "Keyzha Rahmatul Janah",
    "class": "XII C",
    "gender": "P"
  },
  {
    "id": "13167",
    "nisn": "13167",
    "name": "Laksita Dwi Purwaningsih",
    "class": "XII C",
    "gender": "P"
  },
  {
    "id": "13093",
    "nisn": "13093",
    "name": "Lestari Sekar Hidayah",
    "class": "XII C",
    "gender": "P"
  },
  {
    "id": "13095",
    "nisn": "13095",
    "name": "Mentari Zahwa Iftiana",
    "class": "XII C",
    "gender": "P"
  },
  {
    "id": "13096",
    "nisn": "13096",
    "name": "Miftakhul Nurizaky",
    "class": "XII C",
    "gender": "L"
  },
  {
    "id": "13168",
    "nisn": "13168",
    "name": "Muhamad Gian Daffa",
    "class": "XII C",
    "gender": "L"
  },
  {
    "id": "13169",
    "nisn": "13169",
    "name": "Muhammad Abdul Ghani",
    "class": "XII C",
    "gender": "L"
  },
  {
    "id": "13170",
    "nisn": "13170",
    "name": "Muhammad Dhirgham Eka Saputra",
    "class": "XII C",
    "gender": "L"
  },
  {
    "id": "13354",
    "nisn": "13354",
    "name": "Muhammad Faiza Yafii",
    "class": "XII C",
    "gender": "L"
  },
  {
    "id": "13172",
    "nisn": "13172",
    "name": "Mustika Bunga Wijaya Kusuma",
    "class": "XII C",
    "gender": "P"
  },
  {
    "id": "13175",
    "nisn": "13175",
    "name": "Nanik Mufidatin",
    "class": "XII C",
    "gender": "P"
  },
  {
    "id": "13100",
    "nisn": "13100",
    "name": "Naufal Mumtaz Rais",
    "class": "XII C",
    "gender": "L"
  },
  {
    "id": "13177",
    "nisn": "13177",
    "name": "Nesya Artha Nabila",
    "class": "XII C",
    "gender": "P"
  },
  {
    "id": "13178",
    "nisn": "13178",
    "name": "Phyta Mareta Nur Adawea",
    "class": "XII C",
    "gender": "P"
  },
  {
    "id": "13103",
    "nisn": "13103",
    "name": "Raihan' Aqil Rafi'i",
    "class": "XII C",
    "gender": "L"
  },
  {
    "id": "13104",
    "nisn": "13104",
    "name": "Rizqi Nur Annisa",
    "class": "XII C",
    "gender": "P"
  },
  {
    "id": "13180",
    "nisn": "13180",
    "name": "Sa' Id 'Azam Nashrullah",
    "class": "XII C",
    "gender": "L"
  },
  {
    "id": "13106",
    "nisn": "13106",
    "name": "Salvi Maya Azzahra",
    "class": "XII C",
    "gender": "P"
  },
  {
    "id": "13110",
    "nisn": "13110",
    "name": "Syafiya Yulfa Nur Faizah",
    "class": "XII C",
    "gender": "P"
  },
  {
    "id": "13181",
    "nisn": "13181",
    "name": "Tantri Aprilia Nur Fadhillah",
    "class": "XII C",
    "gender": "P"
  },
  {
    "id": "13111",
    "nisn": "13111",
    "name": "Vika Aini Putri",
    "class": "XII C",
    "gender": "P"
  },
  {
    "id": "13184",
    "nisn": "13184",
    "name": "Zaidan Iqbal Ramadan",
    "class": "XII C",
    "gender": "L"
  },
  {
    "id": "13185",
    "nisn": "13185",
    "name": "Afifah Nur Soleha Purnamasari",
    "class": "XII D",
    "gender": "P"
  },
  {
    "id": "13186",
    "nisn": "13186",
    "name": "Aguera Putri Az Zahra",
    "class": "XII D",
    "gender": "P"
  },
  {
    "id": "13187",
    "nisn": "13187",
    "name": "Alycia Fitriana",
    "class": "XII D",
    "gender": "P"
  },
  {
    "id": "13188",
    "nisn": "13188",
    "name": "Andika Rahmadanu",
    "class": "XII D",
    "gender": "L"
  },
  {
    "id": "13189",
    "nisn": "13189",
    "name": "Anisa Fawzia Azzahra",
    "class": "XII D",
    "gender": "P"
  },
  {
    "id": "13190",
    "nisn": "13190",
    "name": "Annastasya Ramadhani Wijayanto",
    "class": "XII D",
    "gender": "P"
  },
  {
    "id": "13078",
    "nisn": "13078",
    "name": "Ardenna Winda Maharani",
    "class": "XII D",
    "gender": "P"
  },
  {
    "id": "13191",
    "nisn": "13191",
    "name": "Auliya Ilmi Hartanti",
    "class": "XII D",
    "gender": "P"
  },
  {
    "id": "13192",
    "nisn": "13192",
    "name": "Azinna Musayyadah",
    "class": "XII D",
    "gender": "P"
  },
  {
    "id": "13193",
    "nisn": "13193",
    "name": "Bilqis Ibtihal Dinar",
    "class": "XII D",
    "gender": "P"
  },
  {
    "id": "13195",
    "nisn": "13195",
    "name": "Deasy Apriyana Juwita Sari",
    "class": "XII D",
    "gender": "P"
  },
  {
    "id": "13196",
    "nisn": "13196",
    "name": "Dian Putri Intan Cahaya",
    "class": "XII D",
    "gender": "P"
  },
  {
    "id": "13443",
    "nisn": "13443",
    "name": "Dimas Alfian Saputra",
    "class": "XII D",
    "gender": "L"
  },
  {
    "id": "13197",
    "nisn": "13197",
    "name": "Eiffelyn Zahirah Oktadina",
    "class": "XII D",
    "gender": "P"
  },
  {
    "id": "13198",
    "nisn": "13198",
    "name": "Ela Lailatul Arrohmah",
    "class": "XII D",
    "gender": "P"
  },
  {
    "id": "13199",
    "nisn": "13199",
    "name": "Elipssia Azkia Jingga",
    "class": "XII D",
    "gender": "P"
  },
  {
    "id": "13090",
    "nisn": "13090",
    "name": "Ganesh Zahira Hidayanto",
    "class": "XII D",
    "gender": "P"
  },
  {
    "id": "13201",
    "nisn": "13201",
    "name": "Hudaa Maulana Husnaa Haryanto",
    "class": "XII D",
    "gender": "L"
  },
  {
    "id": "13202",
    "nisn": "13202",
    "name": "Inta Nur Aini",
    "class": "XII D",
    "gender": "P"
  },
  {
    "id": "13205",
    "nisn": "13205",
    "name": "Muhammad Ali Mufti",
    "class": "XII D",
    "gender": "L"
  },
  {
    "id": "13206",
    "nisn": "13206",
    "name": "Muhammad Ghazi Nugroho",
    "class": "XII D",
    "gender": "L"
  },
  {
    "id": "13207",
    "nisn": "13207",
    "name": "Muhammad Rafi Hernanda",
    "class": "XII D",
    "gender": "L"
  },
  {
    "id": "13440",
    "nisn": "13440",
    "name": "Muhammad Ramadhan Assidiqi",
    "class": "XII D",
    "gender": "L"
  },
  {
    "id": "13387",
    "nisn": "13387",
    "name": "Muhammad Syauqi Al Ghifari",
    "class": "XII D",
    "gender": "L"
  },
  {
    "id": "13208",
    "nisn": "13208",
    "name": "Mutiatuz Zakiyah",
    "class": "XII D",
    "gender": "P"
  },
  {
    "id": "13209",
    "nisn": "13209",
    "name": "Naisila Salsabila Ramadhani",
    "class": "XII D",
    "gender": "P"
  },
  {
    "id": "13210",
    "nisn": "13210",
    "name": "Najmah Salsabila Putri Mahfudah",
    "class": "XII D",
    "gender": "P"
  },
  {
    "id": "13212",
    "nisn": "13212",
    "name": "Niken Aulia Norega",
    "class": "XII D",
    "gender": "P"
  },
  {
    "id": "13446",
    "nisn": "13446",
    "name": "Nuzul Ilham Majid",
    "class": "XII D",
    "gender": "L"
  },
  {
    "id": "13213",
    "nisn": "13213",
    "name": "Raghda Abdurrahim",
    "class": "XII D",
    "gender": "P"
  },
  {
    "id": "13214",
    "nisn": "13214",
    "name": "Rahmat Jaelani",
    "class": "XII D",
    "gender": "L"
  },
  {
    "id": "13215",
    "nisn": "13215",
    "name": "Rayza Indira Naylla Putri",
    "class": "XII D",
    "gender": "P"
  },
  {
    "id": "13105",
    "nisn": "13105",
    "name": "Rudua Denta",
    "class": "XII D",
    "gender": "L"
  },
  {
    "id": "13218",
    "nisn": "13218",
    "name": "Salisa Aqniya Rahma",
    "class": "XII D",
    "gender": "P"
  },
  {
    "id": "13219",
    "nisn": "13219",
    "name": "Salma Andhina Putri",
    "class": "XII D",
    "gender": "P"
  },
  {
    "id": "13221",
    "nisn": "13221",
    "name": "Abhinaya Mahanendra Atmaja",
    "class": "XII E",
    "gender": "L"
  },
  {
    "id": "13222",
    "nisn": "13222",
    "name": "Afrah Wafiq Rafeyfa",
    "class": "XII E",
    "gender": "P"
  },
  {
    "id": "13223",
    "nisn": "13223",
    "name": "Agni Hediana Rosadi",
    "class": "XII E",
    "gender": "P"
  },
  {
    "id": "13224",
    "nisn": "13224",
    "name": "Aira Salsa Bella",
    "class": "XII E",
    "gender": "P"
  },
  {
    "id": "13225",
    "nisn": "13225",
    "name": "Angie Widyaviona",
    "class": "XII E",
    "gender": "P"
  },
  {
    "id": "13227",
    "nisn": "13227",
    "name": "Aulia Risma Nurul Wafiqa",
    "class": "XII E",
    "gender": "P"
  },
  {
    "id": "13228",
    "nisn": "13228",
    "name": "Bilal Al Ghifari",
    "class": "XII E",
    "gender": "L"
  },
  {
    "id": "13261",
    "nisn": "13261",
    "name": "Calista Alivia Kirani",
    "class": "XII E",
    "gender": "P"
  },
  {
    "id": "13262",
    "nisn": "13262",
    "name": "Chalisa Zahratussyifa El-Muna",
    "class": "XII E",
    "gender": "P"
  },
  {
    "id": "13265",
    "nisn": "13265",
    "name": "Diyah Eka Saputri",
    "class": "XII E",
    "gender": "P"
  },
  {
    "id": "13267",
    "nisn": "13267",
    "name": "Fahri Ahmad",
    "class": "XII E",
    "gender": "L"
  },
  {
    "id": "13231",
    "nisn": "13231",
    "name": "Farisa Arifatul Chorida",
    "class": "XII E",
    "gender": "P"
  },
  {
    "id": "13232",
    "nisn": "13232",
    "name": "Fitriana Puji Astuti",
    "class": "XII E",
    "gender": "P"
  },
  {
    "id": "13234",
    "nisn": "13234",
    "name": "Hanisa Rekno Tanjung",
    "class": "XII E",
    "gender": "P"
  },
  {
    "id": "13235",
    "nisn": "13235",
    "name": "Icha Aprilia Ningrum",
    "class": "XII E",
    "gender": "P"
  },
  {
    "id": "13236",
    "nisn": "13236",
    "name": "Ivada Hafsah Nafisa",
    "class": "XII E",
    "gender": "P"
  },
  {
    "id": "13278",
    "nisn": "13278",
    "name": "Keysha Dhila Farizqi",
    "class": "XII E",
    "gender": "P"
  },
  {
    "id": "13238",
    "nisn": "13238",
    "name": "Khafid Tri Utomo",
    "class": "XII E",
    "gender": "L"
  },
  {
    "id": "13239",
    "nisn": "13239",
    "name": "Khalisa Inayatul Maula Pd",
    "class": "XII E",
    "gender": "P"
  },
  {
    "id": "13245",
    "nisn": "13245",
    "name": "M.Syahdan Rifqi Baihaqi",
    "class": "XII E",
    "gender": "L"
  },
  {
    "id": "13241",
    "nisn": "13241",
    "name": "Muh. Hardheka Arrizqian Khoironi",
    "class": "XII E",
    "gender": "L"
  },
  {
    "id": "13246",
    "nisn": "13246",
    "name": "Muhamad Ubaid Althafa",
    "class": "XII E",
    "gender": "L"
  },
  {
    "id": "13242",
    "nisn": "13242",
    "name": "Muhammad Aslam Rafif",
    "class": "XII E",
    "gender": "L"
  },
  {
    "id": "13286",
    "nisn": "13286",
    "name": "Nasrallah Galang Robani",
    "class": "XII E",
    "gender": "L"
  },
  {
    "id": "13249",
    "nisn": "13249",
    "name": "Naviza Dinda Putri Pertiwi",
    "class": "XII E",
    "gender": "P"
  },
  {
    "id": "13250",
    "nisn": "13250",
    "name": "Qeenar Kanaya Hayya Syifa",
    "class": "XII E",
    "gender": "P"
  },
  {
    "id": "13251",
    "nisn": "13251",
    "name": "Qirania Fayruz Innayya",
    "class": "XII E",
    "gender": "P"
  },
  {
    "id": "13287",
    "nisn": "13287",
    "name": "Qurrotul A'ini",
    "class": "XII E",
    "gender": "P"
  },
  {
    "id": "13252",
    "nisn": "13252",
    "name": "Sofie Ardya Khanza",
    "class": "XII E",
    "gender": "P"
  },
  {
    "id": "13253",
    "nisn": "13253",
    "name": "Sy Gita Jindan Alfira",
    "class": "XII E",
    "gender": "P"
  },
  {
    "id": "13254",
    "nisn": "13254",
    "name": "Syahda Vania Queena",
    "class": "XII E",
    "gender": "P"
  },
  {
    "id": "13256",
    "nisn": "13256",
    "name": "Zahwa Assyifa Ekaputri",
    "class": "XII E",
    "gender": "P"
  },
  {
    "id": "13332",
    "nisn": "13332",
    "name": "Ahsina Amalia Fadlilatul Aulia",
    "class": "XII F",
    "gender": "P"
  },
  {
    "id": "13296",
    "nisn": "13296",
    "name": "Ainindya Syafaatul Najwa",
    "class": "XII F",
    "gender": "P"
  },
  {
    "id": "13258",
    "nisn": "13258",
    "name": "Ana Zahrotul Awaliyah",
    "class": "XII F",
    "gender": "P"
  },
  {
    "id": "13226",
    "nisn": "13226",
    "name": "Aprillia Desynta Putri",
    "class": "XII F",
    "gender": "P"
  },
  {
    "id": "13259",
    "nisn": "13259",
    "name": "Ariana Dewi Octaviana",
    "class": "XII F",
    "gender": "P"
  },
  {
    "id": "13338",
    "nisn": "13338",
    "name": "Athaya Bagus Bramantito",
    "class": "XII F",
    "gender": "L"
  },
  {
    "id": "13366",
    "nisn": "13366",
    "name": "Athaya Nafi`Ah Anhar",
    "class": "XII F",
    "gender": "P"
  },
  {
    "id": "13260",
    "nisn": "13260",
    "name": "Avicenna Al Falah",
    "class": "XII F",
    "gender": "L"
  },
  {
    "id": "13305",
    "nisn": "13305",
    "name": "Baihaqy Aghnaf",
    "class": "XII F",
    "gender": "L"
  },
  {
    "id": "13263",
    "nisn": "13263",
    "name": "Cherria Wahyu Khairunisa",
    "class": "XII F",
    "gender": "P"
  },
  {
    "id": "13264",
    "nisn": "13264",
    "name": "Daniyal Nur Muhammad",
    "class": "XII F",
    "gender": "L"
  },
  {
    "id": "13229",
    "nisn": "13229",
    "name": "Denista Anjani",
    "class": "XII F",
    "gender": "P"
  },
  {
    "id": "13346",
    "nisn": "13346",
    "name": "Farra Rossa Yunior",
    "class": "XII F",
    "gender": "P"
  },
  {
    "id": "13269",
    "nisn": "13269",
    "name": "Findi Marsha Maulida",
    "class": "XII F",
    "gender": "P"
  },
  {
    "id": "13270",
    "nisn": "13270",
    "name": "Galih Bayu Setyaji",
    "class": "XII F",
    "gender": "L"
  },
  {
    "id": "13274",
    "nisn": "13274",
    "name": "Innayatus Syarifah",
    "class": "XII F",
    "gender": "P"
  },
  {
    "id": "13275",
    "nisn": "13275",
    "name": "Jesika Lutfi Ramadhani",
    "class": "XII F",
    "gender": "P"
  },
  {
    "id": "13276",
    "nisn": "13276",
    "name": "Kayla Javier Nur`Aini",
    "class": "XII F",
    "gender": "P"
  },
  {
    "id": "13350",
    "nisn": "13350",
    "name": "Linda Niswatul Azkiya",
    "class": "XII F",
    "gender": "P"
  },
  {
    "id": "13280",
    "nisn": "13280",
    "name": "Meutearachma Ecka Paramitha",
    "class": "XII F",
    "gender": "P"
  },
  {
    "id": "13283",
    "nisn": "13283",
    "name": "Muhammad Dzulfahmi Akbar",
    "class": "XII F",
    "gender": "L"
  },
  {
    "id": "13243",
    "nisn": "13243",
    "name": "Muhammad Jatiwangi",
    "class": "XII F",
    "gender": "L"
  },
  {
    "id": "13439",
    "nisn": "13439",
    "name": "Muhammad Khalil All Ashlay",
    "class": "XII F",
    "gender": "L"
  },
  {
    "id": "13244",
    "nisn": "13244",
    "name": "Muhammad Sabilal Haqqi",
    "class": "XII F",
    "gender": "L"
  },
  {
    "id": "13314",
    "nisn": "13314",
    "name": "Nabila Zahrotun Nisa",
    "class": "XII F",
    "gender": "P"
  },
  {
    "id": "13315",
    "nisn": "13315",
    "name": "Naila Salsabila Ramadhani",
    "class": "XII F",
    "gender": "P"
  },
  {
    "id": "13248",
    "nisn": "13248",
    "name": "Nihad Sany Sandita",
    "class": "XII F",
    "gender": "L"
  },
  {
    "id": "13320",
    "nisn": "13320",
    "name": "Rakha Akbar Ramadhan",
    "class": "XII F",
    "gender": "L"
  },
  {
    "id": "13438",
    "nisn": "13438",
    "name": "Rizqya Wardaningrum",
    "class": "XII F",
    "gender": "P"
  },
  {
    "id": "13288",
    "nisn": "13288",
    "name": "Rosseyla Griffari",
    "class": "XII F",
    "gender": "P"
  },
  {
    "id": "13289",
    "nisn": "13289",
    "name": "Salma Lutfiana Putri",
    "class": "XII F",
    "gender": "P"
  },
  {
    "id": "13290",
    "nisn": "13290",
    "name": "Selsi Permata Surya",
    "class": "XII F",
    "gender": "P"
  },
  {
    "id": "13291",
    "nisn": "13291",
    "name": "Shafa Nurhaya",
    "class": "XII F",
    "gender": "P"
  },
  {
    "id": "13326",
    "nisn": "13326",
    "name": "Tabita Ragil Azzahra",
    "class": "XII F",
    "gender": "P"
  },
  {
    "id": "13255",
    "nisn": "13255",
    "name": "Yaniz Hanafi Majid",
    "class": "XII F",
    "gender": "L"
  },
  {
    "id": "13292",
    "nisn": "13292",
    "name": "Zahra Auliatun Nisa",
    "class": "XII F",
    "gender": "P"
  },
  {
    "id": "13293",
    "nisn": "13293",
    "name": "Adam Buyung Samodra",
    "class": "XII G",
    "gender": "L"
  },
  {
    "id": "13437",
    "nisn": "13437",
    "name": "Adelia Zahwa Safira",
    "class": "XII G",
    "gender": "P"
  },
  {
    "id": "13295",
    "nisn": "13295",
    "name": "Adnan Khoiru Sofyan",
    "class": "XII G",
    "gender": "L"
  },
  {
    "id": "13257",
    "nisn": "13257",
    "name": "Ahnafta Rakha Devan",
    "class": "XII G",
    "gender": "L"
  },
  {
    "id": "13297",
    "nisn": "13297",
    "name": "Aisha Fawwaz Damayanti",
    "class": "XII G",
    "gender": "P"
  },
  {
    "id": "13298",
    "nisn": "13298",
    "name": "Al Khansa Tsabitul Azmi",
    "class": "XII G",
    "gender": "P"
  },
  {
    "id": "13805",
    "nisn": "13805",
    "name": "Alfiero Ezar Adhitya",
    "class": "XII G",
    "gender": "L"
  },
  {
    "id": "13299",
    "nisn": "13299",
    "name": "Algifarif Pratama Bintang Arjuna",
    "class": "XII G",
    "gender": "L"
  },
  {
    "id": "13300",
    "nisn": "13300",
    "name": "Alifah Nur Faiza",
    "class": "XII G",
    "gender": "P"
  },
  {
    "id": "13301",
    "nisn": "13301",
    "name": "Alvin Dwi Ferdinka",
    "class": "XII G",
    "gender": "L"
  },
  {
    "id": "13302",
    "nisn": "13302",
    "name": "Amin Khoiruddin",
    "class": "XII G",
    "gender": "L"
  },
  {
    "id": "13304",
    "nisn": "13304",
    "name": "Aysila Laila Afifah",
    "class": "XII G",
    "gender": "P"
  },
  {
    "id": "13266",
    "nisn": "13266",
    "name": "Eksan Maulana",
    "class": "XII G",
    "gender": "L"
  },
  {
    "id": "13306",
    "nisn": "13306",
    "name": "Fara Fauzana",
    "class": "XII G",
    "gender": "P"
  },
  {
    "id": "13271",
    "nisn": "13271",
    "name": "Gigih Mulya Sasmita",
    "class": "XII G",
    "gender": "L"
  },
  {
    "id": "13307",
    "nisn": "13307",
    "name": "Imas Feby Hastari",
    "class": "XII G",
    "gender": "P"
  },
  {
    "id": "13308",
    "nisn": "13308",
    "name": "Jazila Ashila Nahdah",
    "class": "XII G",
    "gender": "P"
  },
  {
    "id": "13309",
    "nisn": "13309",
    "name": "Kartika Dewi Nurrohmah",
    "class": "XII G",
    "gender": "P"
  },
  {
    "id": "13277",
    "nisn": "13277",
    "name": "Kevin Sofian Ridho",
    "class": "XII G",
    "gender": "L"
  },
  {
    "id": "13310",
    "nisn": "13310",
    "name": "Kunti Nailatul Muslimah",
    "class": "XII G",
    "gender": "P"
  },
  {
    "id": "13423",
    "nisn": "13423",
    "name": "Lutfiana Putri",
    "class": "XII G",
    "gender": "P"
  },
  {
    "id": "13311",
    "nisn": "13311",
    "name": "Marella Wylie Nathania",
    "class": "XII G",
    "gender": "P"
  },
  {
    "id": "13279",
    "nisn": "13279",
    "name": "Maya Alliya Islami",
    "class": "XII G",
    "gender": "P"
  },
  {
    "id": "13281",
    "nisn": "13281",
    "name": "Muhammad Alaika Fauzan",
    "class": "XII G",
    "gender": "L"
  },
  {
    "id": "13313",
    "nisn": "13313",
    "name": "Muhammad Ibrahim Al Habsyi",
    "class": "XII G",
    "gender": "L"
  },
  {
    "id": "13316",
    "nisn": "13316",
    "name": "Nur Afni Rahayu",
    "class": "XII G",
    "gender": "P"
  },
  {
    "id": "13317",
    "nisn": "13317",
    "name": "Nurcahya Novalia Madani",
    "class": "XII G",
    "gender": "P"
  },
  {
    "id": "13318",
    "nisn": "13318",
    "name": "Putri Yunia Az Zahra",
    "class": "XII G",
    "gender": "P"
  },
  {
    "id": "13319",
    "nisn": "13319",
    "name": "Raisya Aulia Putri",
    "class": "XII G",
    "gender": "P"
  },
  {
    "id": "13321",
    "nisn": "13321",
    "name": "Reisya Eka Agustin",
    "class": "XII G",
    "gender": "P"
  },
  {
    "id": "13322",
    "nisn": "13322",
    "name": "Restu Zacky Al Farizy",
    "class": "XII G",
    "gender": "L"
  },
  {
    "id": "13323",
    "nisn": "13323",
    "name": "Rina Septian Ramadhani",
    "class": "XII G",
    "gender": "P"
  },
  {
    "id": "13324",
    "nisn": "13324",
    "name": "Safarudin",
    "class": "XII G",
    "gender": "L"
  },
  {
    "id": "13325",
    "nisn": "13325",
    "name": "Silfa Anjaini",
    "class": "XII G",
    "gender": "P"
  },
  {
    "id": "13807-xii-h",
    "nisn": "13807-xii-h",
    "name": "Achmad Rizal Daifullah",
    "class": "XII H",
    "gender": "L"
  },
  {
    "id": "13329",
    "nisn": "13329",
    "name": "Adinda Faiz Aryanti",
    "class": "XII H",
    "gender": "P"
  },
  {
    "id": "13331",
    "nisn": "13331",
    "name": "Ahmad Latif Murthado",
    "class": "XII H",
    "gender": "L"
  },
  {
    "id": "13333",
    "nisn": "13333",
    "name": "Aldheila Ayuni Dhamayanti",
    "class": "XII H",
    "gender": "P"
  },
  {
    "id": "13334",
    "nisn": "13334",
    "name": "Andhika Kurnia Aprilla Syah",
    "class": "XII H",
    "gender": "P"
  },
  {
    "id": "13403",
    "nisn": "13403",
    "name": "Alisa Rosyi Makarimah",
    "class": "XII H",
    "gender": "P"
  },
  {
    "id": "13335",
    "nisn": "13335",
    "name": "Andriyana Salma",
    "class": "XII H",
    "gender": "P"
  },
  {
    "id": "13336",
    "nisn": "13336",
    "name": "Anida Eka Shofia",
    "class": "XII H",
    "gender": "P"
  },
  {
    "id": "13445",
    "nisn": "13445",
    "name": "Arina Niswatun Nafiah",
    "class": "XII H",
    "gender": "P"
  },
  {
    "id": "13337",
    "nisn": "13337",
    "name": "Asfida Nur Salsabilah",
    "class": "XII H",
    "gender": "P"
  },
  {
    "id": "13341",
    "nisn": "13341",
    "name": "Bagus Rizal Fauzi",
    "class": "XII H",
    "gender": "L"
  },
  {
    "id": "13342",
    "nisn": "13342",
    "name": "Dian Ramadhani",
    "class": "XII H",
    "gender": "P"
  },
  {
    "id": "13344",
    "nisn": "13344",
    "name": "Egi Muhson Reviyanto",
    "class": "XII H",
    "gender": "L"
  },
  {
    "id": "13268",
    "nisn": "13268",
    "name": "Fakih Prana Rustu Suharjo",
    "class": "XII H",
    "gender": "L"
  },
  {
    "id": "13272",
    "nisn": "13272",
    "name": "Hamid Al Falah",
    "class": "XII H",
    "gender": "L"
  },
  {
    "id": "13348",
    "nisn": "13348",
    "name": "Ikhwan Aditya Tama",
    "class": "XII H",
    "gender": "L"
  },
  {
    "id": "13349",
    "nisn": "13349",
    "name": "Inasa Markha",
    "class": "XII H",
    "gender": "P"
  },
  {
    "id": "13351",
    "nisn": "13351",
    "name": "Lita Dwi Irawati",
    "class": "XII H",
    "gender": "P"
  },
  {
    "id": "13352",
    "nisn": "13352",
    "name": "Marsya Norisa Rahmadhani",
    "class": "XII H",
    "gender": "P"
  },
  {
    "id": "13353",
    "nisn": "13353",
    "name": "Mayta Bunga Nuraini",
    "class": "XII H",
    "gender": "P"
  },
  {
    "id": "13282",
    "nisn": "13282",
    "name": "Muhammad Ariiq Akmal",
    "class": "XII H",
    "gender": "L"
  },
  {
    "id": "13355",
    "nisn": "13355",
    "name": "Muhammad Hilmi Fachriansyah",
    "class": "XII H",
    "gender": "L"
  },
  {
    "id": "13284",
    "nisn": "13284",
    "name": "Muhammad Riyan Saputro",
    "class": "XII H",
    "gender": "L"
  },
  {
    "id": "13285",
    "nisn": "13285",
    "name": "Muhammad Zakky Fairuzy",
    "class": "XII H",
    "gender": "L"
  },
  {
    "id": "13357",
    "nisn": "13357",
    "name": "Rayhan Aji Saputra",
    "class": "XII H",
    "gender": "L"
  },
  {
    "id": "13358",
    "nisn": "13358",
    "name": "Salwa Anindya Putri",
    "class": "XII H",
    "gender": "P"
  },
  {
    "id": "13359",
    "nisn": "13359",
    "name": "Sekar Adyawantari",
    "class": "XII H",
    "gender": "P"
  },
  {
    "id": "13360",
    "nisn": "13360",
    "name": "Shofi Jauhara",
    "class": "XII H",
    "gender": "P"
  },
  {
    "id": "13361",
    "nisn": "13361",
    "name": "Yasmin Khoirunissa",
    "class": "XII H",
    "gender": "P"
  },
  {
    "id": "13362",
    "nisn": "13362",
    "name": "Yoga Bima Pratama",
    "class": "XII H",
    "gender": "L"
  },
  {
    "id": "13363",
    "nisn": "13363",
    "name": "Zahra Adilia",
    "class": "XII H",
    "gender": "P"
  },
  {
    "id": "13364",
    "nisn": "13364",
    "name": "Zhara Nurleha",
    "class": "XII H",
    "gender": "P"
  },
  {
    "id": "13402",
    "nisn": "13402",
    "name": "Aliffah Nasywa Salsabila",
    "class": "XII I",
    "gender": "P"
  },
  {
    "id": "13404",
    "nisn": "13404",
    "name": "Annisa Rizki Nandono",
    "class": "XII I",
    "gender": "P"
  },
  {
    "id": "13407",
    "nisn": "13407",
    "name": "Cantika Nindy Saryanti",
    "class": "XII I",
    "gender": "P"
  },
  {
    "id": "13409",
    "nisn": "13409",
    "name": "Clarissa Syafiatul Lutfiantika Az Zahra",
    "class": "XII I",
    "gender": "P"
  },
  {
    "id": "13367",
    "nisn": "13367",
    "name": "Dinda Ma`Rifatul Izzah",
    "class": "XII I",
    "gender": "P"
  },
  {
    "id": "13371",
    "nisn": "13371",
    "name": "Faiz Ahmad Nashrudin Azam",
    "class": "XII I",
    "gender": "L"
  },
  {
    "id": "13372",
    "nisn": "13372",
    "name": "Farid Insan Fatonah",
    "class": "XII I",
    "gender": "L"
  },
  {
    "id": "13373",
    "nisn": "13373",
    "name": "Faridah Athaya Ramadhani",
    "class": "XII I",
    "gender": "P"
  },
  {
    "id": "13413",
    "nisn": "13413",
    "name": "Fathuh Gunawan",
    "class": "XII I",
    "gender": "L"
  },
  {
    "id": "13376",
    "nisn": "13376",
    "name": "Haikal Maulana Amrullah",
    "class": "XII I",
    "gender": "L"
  },
  {
    "id": "13416",
    "nisn": "13416",
    "name": "Hanesty Agustina Fitriandini",
    "class": "XII I",
    "gender": "P"
  },
  {
    "id": "13444",
    "nisn": "13444",
    "name": "Irham Khathiri",
    "class": "XII I",
    "gender": "L"
  },
  {
    "id": "13418",
    "nisn": "13418",
    "name": "Jabran Sinar Athaya",
    "class": "XII I",
    "gender": "L"
  },
  {
    "id": "13377",
    "nisn": "13377",
    "name": "Javiar Ibnu Sadin",
    "class": "XII I",
    "gender": "L"
  },
  {
    "id": "13378",
    "nisn": "13378",
    "name": "Khofifah Wahyunazila Assibahah",
    "class": "XII I",
    "gender": "P"
  },
  {
    "id": "13379",
    "nisn": "13379",
    "name": "Lathifa Azzahra",
    "class": "XII I",
    "gender": "P"
  },
  {
    "id": "13380",
    "nisn": "13380",
    "name": "Lovely Luna Nayla Nugraha",
    "class": "XII I",
    "gender": "P"
  },
  {
    "id": "13381",
    "nisn": "13381",
    "name": "Luna Aulia",
    "class": "XII I",
    "gender": "P"
  },
  {
    "id": "13424",
    "nisn": "13424",
    "name": "Mandala Susila Yuga",
    "class": "XII I",
    "gender": "L"
  },
  {
    "id": "13384",
    "nisn": "13384",
    "name": "Monalisa Wijaya Saputri",
    "class": "XII I",
    "gender": "P"
  },
  {
    "id": "13386",
    "nisn": "13386",
    "name": "Muhammad Azzam Al Rasyid",
    "class": "XII I",
    "gender": "L"
  },
  {
    "id": "13426",
    "nisn": "13426",
    "name": "Muhammad Ikhsan Pratama",
    "class": "XII I",
    "gender": "L"
  },
  {
    "id": "13390",
    "nisn": "13390",
    "name": "Mutia Rahmawati",
    "class": "XII I",
    "gender": "P"
  },
  {
    "id": "13428",
    "nisn": "13428",
    "name": "Mutiara Fairuzzia Mahdi",
    "class": "XII I",
    "gender": "P"
  },
  {
    "id": "13391",
    "nisn": "13391",
    "name": "Nabilah Husnun Ghoniyah",
    "class": "XII I",
    "gender": "P"
  },
  {
    "id": "13392",
    "nisn": "13392",
    "name": "Naila Rafifah Khairiyah",
    "class": "XII I",
    "gender": "P"
  },
  {
    "id": "13393",
    "nisn": "13393",
    "name": "Najwa Raissa Azzahra",
    "class": "XII I",
    "gender": "P"
  },
  {
    "id": "13430",
    "nisn": "13430",
    "name": "Putri Salsa Bila",
    "class": "XII I",
    "gender": "P"
  },
  {
    "id": "13431",
    "nisn": "13431",
    "name": "Rahma Alya Hamidah Wibowo",
    "class": "XII I",
    "gender": "P"
  },
  {
    "id": "13433",
    "nisn": "13433",
    "name": "Riffa Levina Angesti",
    "class": "XII I",
    "gender": "P"
  },
  {
    "id": "13395",
    "nisn": "13395",
    "name": "Sabina Rara Chanifah",
    "class": "XII I",
    "gender": "P"
  },
  {
    "id": "13434",
    "nisn": "13434",
    "name": "Salma Nur Fadhilah",
    "class": "XII I",
    "gender": "P"
  },
  {
    "id": "13396",
    "nisn": "13396",
    "name": "Shinta Choirun Nisa",
    "class": "XII I",
    "gender": "P"
  },
  {
    "id": "13436",
    "nisn": "13436",
    "name": "Wahyu Nur Safitri",
    "class": "XII I",
    "gender": "P"
  },
  {
    "id": "13399",
    "nisn": "13399",
    "name": "Zahro Izzatul Mujahidah",
    "class": "XII I",
    "gender": "P"
  },
  {
    "id": "13400",
    "nisn": "13400",
    "name": "Zuliani Khazanah",
    "class": "XII I",
    "gender": "P"
  },
  {
    "id": "13401",
    "nisn": "13401",
    "name": "Ali Mahmud",
    "class": "XII J",
    "gender": "L"
  },
  {
    "id": "13405",
    "nisn": "13405",
    "name": "Ariska Yuliyanti",
    "class": "XII J",
    "gender": "P"
  },
  {
    "id": "13365",
    "nisn": "13365",
    "name": "Anjar Novitasari",
    "class": "XII J",
    "gender": "P"
  },
  {
    "id": "13406",
    "nisn": "13406",
    "name": "Aulia Dwi Maharani",
    "class": "XII J",
    "gender": "P"
  },
  {
    "id": "13339",
    "nisn": "13339",
    "name": "Ayu Diah Puspitasari",
    "class": "XII J",
    "gender": "P"
  },
  {
    "id": "13408",
    "nisn": "13408",
    "name": "Charisa Syaila Aira Romadhona",
    "class": "XII J",
    "gender": "P"
  },
  {
    "id": "13410",
    "nisn": "13410",
    "name": "Didik Avi Nurrohman",
    "class": "XII J",
    "gender": "L"
  },
  {
    "id": "13369",
    "nisn": "13369",
    "name": "Ezwar Alshafin Pattiiha",
    "class": "XII J",
    "gender": "L"
  },
  {
    "id": "13370",
    "nisn": "13370",
    "name": "Fadhil Aksan Muhammad",
    "class": "XII J",
    "gender": "L"
  },
  {
    "id": "13411",
    "nisn": "13411",
    "name": "Fahrul Setiawan",
    "class": "XII J",
    "gender": "L"
  },
  {
    "id": "13412",
    "nisn": "13412",
    "name": "Farida Khusnul Khotimah",
    "class": "XII J",
    "gender": "P"
  },
  {
    "id": "13374",
    "nisn": "13374",
    "name": "Farizka Nur Istiqomah",
    "class": "XII J",
    "gender": "P"
  },
  {
    "id": "13414",
    "nisn": "13414",
    "name": "Fikri Amin Prasetio",
    "class": "XII J",
    "gender": "L"
  },
  {
    "id": "13415",
    "nisn": "13415",
    "name": "Guntur Mei Ulyaqin",
    "class": "XII J",
    "gender": "L"
  },
  {
    "id": "13375",
    "nisn": "13375",
    "name": "Hafidz Nurfaizi",
    "class": "XII J",
    "gender": "L"
  },
  {
    "id": "13417",
    "nisn": "13417",
    "name": "Hasna Mey Khoirunisa",
    "class": "XII J",
    "gender": "P"
  },
  {
    "id": "13164",
    "nisn": "13164",
    "name": "Istiqomah Yusriyah",
    "class": "XII J",
    "gender": "P"
  },
  {
    "id": "13419",
    "nisn": "13419",
    "name": "Kahfi Candra Kusuma",
    "class": "XII J",
    "gender": "L"
  },
  {
    "id": "13420",
    "nisn": "13420",
    "name": "Kasih Yaisal Maghfiroh",
    "class": "XII J",
    "gender": "P"
  },
  {
    "id": "13800",
    "nisn": "13800",
    "name": "Khafid Assegaf",
    "class": "XII J",
    "gender": "L"
  },
  {
    "id": "13421",
    "nisn": "13421",
    "name": "Khairoh Haafidzayani",
    "class": "XII J",
    "gender": "P"
  },
  {
    "id": "13422",
    "nisn": "13422",
    "name": "Lukman Nur Hakim",
    "class": "XII J",
    "gender": "L"
  },
  {
    "id": "13382",
    "nisn": "13382",
    "name": "Ma'ruf Kurnianto",
    "class": "XII J",
    "gender": "L"
  },
  {
    "id": "13383",
    "nisn": "13383",
    "name": "Mau'izhah Maula Majid",
    "class": "XII J",
    "gender": "P"
  },
  {
    "id": "13385",
    "nisn": "13385",
    "name": "Muhammad Akhsin Nawawi",
    "class": "XII J",
    "gender": "L"
  },
  {
    "id": "13425",
    "nisn": "13425",
    "name": "Muhammad Faizal Bahri",
    "class": "XII J",
    "gender": "L"
  },
  {
    "id": "13427",
    "nisn": "13427",
    "name": "Muhammad Irfan Maulana",
    "class": "XII J",
    "gender": "L"
  },
  {
    "id": "13388",
    "nisn": "13388",
    "name": "Muhammad Zaki Mubarok",
    "class": "XII J",
    "gender": "L"
  },
  {
    "id": "13389",
    "nisn": "13389",
    "name": "Muhammad Zulfikar Baharudin",
    "class": "XII J",
    "gender": "L"
  },
  {
    "id": "13429",
    "nisn": "13429",
    "name": "Nissa Septia Saffani",
    "class": "XII J",
    "gender": "P"
  },
  {
    "id": "13442",
    "nisn": "13442",
    "name": "Pasya Arska Prasditya",
    "class": "XII J",
    "gender": "L"
  },
  {
    "id": "13432",
    "nisn": "13432",
    "name": "Raiza Nur Cahaya",
    "class": "XII J",
    "gender": "P"
  },
  {
    "id": "13394",
    "nisn": "13394",
    "name": "Rifda Siti Fatimah",
    "class": "XII J",
    "gender": "P"
  },
  {
    "id": "13435",
    "nisn": "13435",
    "name": "Shafira Eka Pratiwi",
    "class": "XII J",
    "gender": "P"
  },
  {
    "id": "13397",
    "nisn": "13397",
    "name": "Siti Umi Khulsum",
    "class": "XII J",
    "gender": "P"
  },
  {
    "id": "13398",
    "nisn": "13398",
    "name": "Wahyu Putri Lestari",
    "class": "XII J",
    "gender": "P"
  }
];

export const DEMO_ATTENDANCE_RECORDS: AttendanceRecord[] = [
  {
    id: 'rec-001',
    name: 'Adelia Pramadipta Putri Purwanto',
    class: 'X A',
    prayer_type: 'Dhuha',
    status: 'Hadir',
    ai_status: 'Valid (Dual Camera: 96%)',
    ai_confidence: 96,
    gps_status: 'Valid (Dalam Radius)',
    gps_distance: 25,
    gps_coords: { latitude: -7.540982, longitude: 110.599143 },
    notes: 'Presensi Dhuha Berjamaah',
    created_at: new Date(Date.now() - 3600000 * 3).toISOString(),
  },
  {
    id: 'rec-002',
    name: 'Ainunnisha Sulistyaningrum',
    class: 'X A',
    prayer_type: 'Dhuha',
    status: 'Hadir',
    ai_status: 'Valid (Dual Camera: 94%)',
    ai_confidence: 94,
    gps_status: 'Valid (Dalam Radius)',
    gps_distance: 12,
    gps_coords: { latitude: -7.540982, longitude: 110.599143 },
    notes: 'Presensi Dhuha Berjamaah',
    created_at: new Date(Date.now() - 3600000 * 2.5).toISOString(),
  }
];
