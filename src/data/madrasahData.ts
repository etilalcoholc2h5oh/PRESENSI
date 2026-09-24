import { Student, AttendanceRecord, GeofenceConfig } from '../types';

export const MADRASAH_INFO = {
  name: 'MAN 1 Boyolali',
  subtitle: 'Madrasah Aliyah Negeri 1 Boyolali',
  motto: 'Mandiri Berprestasi, Religius & Berakhlakul Karimah',
  address: 'Jl. Kates No. 34, Siswodipuran, Kec. Boyolali, Kabupaten Boyolali, Jawa Tengah 57311',
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
    "id": "S0006",
    "nisn": "00800000111",
    "name": "Alif Firmansyah Rahman",
    "class": "X A",
    "gender": "L"
  },
  {
    "id": "S0024",
    "nisn": "00800000124",
    "name": "Annisa Dewanti Safitri",
    "class": "X A",
    "gender": "P"
  },
  {
    "id": "S0018",
    "nisn": "00800000112",
    "name": "Annisa Lestari Susanti",
    "class": "X A",
    "gender": "P"
  },
  {
    "id": "S0010",
    "nisn": "00800000119",
    "name": "Dimas Rizki Pratama",
    "class": "X A",
    "gender": "L"
  },
  {
    "id": "S0007",
    "nisn": "00800000113",
    "name": "Eko Nur Santoso",
    "class": "X A",
    "gender": "L"
  },
  {
    "id": "S0013",
    "nisn": "00800000102",
    "name": "Erna Nur Utami",
    "class": "X A",
    "gender": "P"
  },
  {
    "id": "S0019",
    "nisn": "00800000114",
    "name": "Erna Rahmatika Lestari",
    "class": "X A",
    "gender": "P"
  },
  {
    "id": "S0011",
    "nisn": "00800000121",
    "name": "Hafizh Ardiansyah Nugraha",
    "class": "X A",
    "gender": "L"
  },
  {
    "id": "S0001",
    "nisn": "00800000101",
    "name": "Hafizh Putra Saputra",
    "class": "X A",
    "gender": "L"
  },
  {
    "id": "S0008",
    "nisn": "00800000115",
    "name": "Hendro Akbar Triyono",
    "class": "X A",
    "gender": "L"
  },
  {
    "id": "S0020",
    "nisn": "00800000116",
    "name": "Indah Fitriani Widyaningrum",
    "class": "X A",
    "gender": "P"
  },
  {
    "id": "S0014",
    "nisn": "00800000104",
    "name": "Indah Wulandari Sulastri",
    "class": "X A",
    "gender": "P"
  },
  {
    "id": "S0012",
    "nisn": "00800000123",
    "name": "Kevin Gunawan Utomo",
    "class": "X A",
    "gender": "L"
  },
  {
    "id": "S0002",
    "nisn": "00800000103",
    "name": "Kevin Hidayat Setiadi",
    "class": "X A",
    "gender": "L"
  },
  {
    "id": "S0009",
    "nisn": "00800000117",
    "name": "Muhammad Santoso Purnomo",
    "class": "X A",
    "gender": "L"
  },
  {
    "id": "S0015",
    "nisn": "00800000106",
    "name": "Nabila Amalia Handayani",
    "class": "X A",
    "gender": "P"
  },
  {
    "id": "S0021",
    "nisn": "00800000118",
    "name": "Nabila Khaerunnisa Sari",
    "class": "X A",
    "gender": "P"
  },
  {
    "id": "S0003",
    "nisn": "00800000105",
    "name": "Naufal Nugroho Wicaksono",
    "class": "X A",
    "gender": "L"
  },
  {
    "id": "S0004",
    "nisn": "00800000107",
    "name": "Rizky Fauzi Hermawan",
    "class": "X A",
    "gender": "L"
  },
  {
    "id": "S0016",
    "nisn": "00800000108",
    "name": "Salma Anggraini Wulandari",
    "class": "X A",
    "gender": "P"
  },
  {
    "id": "S0022",
    "nisn": "00800000120",
    "name": "Salma Aulia Anggraini",
    "class": "X A",
    "gender": "P"
  },
  {
    "id": "S0005",
    "nisn": "00800000109",
    "name": "Wahyu Ramadhan Pamungkas",
    "class": "X A",
    "gender": "L"
  },
  {
    "id": "S0017",
    "nisn": "00800000110",
    "name": "Wulan Khoirun Kurniasari",
    "class": "X A",
    "gender": "P"
  },
  {
    "id": "S0023",
    "nisn": "00800000122",
    "name": "Wulan Salsabila Ramadhani",
    "class": "X A",
    "gender": "P"
  },
  {
    "id": "S0031",
    "nisn": "00800000143",
    "name": "Aditya Mahendra Hidayatullah",
    "class": "X B",
    "gender": "L"
  },
  {
    "id": "S0028",
    "nisn": "00800000137",
    "name": "Bayu Hakim Nugraha",
    "class": "X B",
    "gender": "L"
  },
  {
    "id": "S0047",
    "nisn": "00800000152",
    "name": "Citra Anggraini Mulyani",
    "class": "X B",
    "gender": "P"
  },
  {
    "id": "S0041",
    "nisn": "00800000140",
    "name": "Citra Hidayati Novitasari",
    "class": "X B",
    "gender": "P"
  },
  {
    "id": "S0032",
    "nisn": "00800000145",
    "name": "Fajar Kusuma Mustofa",
    "class": "X B",
    "gender": "L"
  },
  {
    "id": "S0029",
    "nisn": "00800000139",
    "name": "Farhan Saputra Utomo",
    "class": "X B",
    "gender": "L"
  },
  {
    "id": "S0048",
    "nisn": "00800000154",
    "name": "Fitri Khoirun Utami",
    "class": "X B",
    "gender": "P"
  },
  {
    "id": "S0042",
    "nisn": "00800000142",
    "name": "Fitri Rahma Pratiwi",
    "class": "X B",
    "gender": "P"
  },
  {
    "id": "S0033",
    "nisn": "00800000147",
    "name": "Ilham Wibowo Pramono",
    "class": "X B",
    "gender": "L"
  },
  {
    "id": "S0030",
    "nisn": "00800000141",
    "name": "Irfan Pratama Sulistyo",
    "class": "X B",
    "gender": "L"
  },
  {
    "id": "S0043",
    "nisn": "00800000144",
    "name": "Kartika Az-Zahra Setianingsih",
    "class": "X B",
    "gender": "P"
  },
  {
    "id": "S0037",
    "nisn": "00800000132",
    "name": "Kartika Syahputri Anggraini",
    "class": "X B",
    "gender": "P"
  },
  {
    "id": "S0034",
    "nisn": "00800000149",
    "name": "Lukman Putra Suryanto",
    "class": "X B",
    "gender": "L"
  },
  {
    "id": "S0025",
    "nisn": "00800000131",
    "name": "Pratama Gunawan Triyono",
    "class": "X B",
    "gender": "L"
  },
  {
    "id": "S0035",
    "nisn": "00800000151",
    "name": "Pratama Hidayat Wijaya",
    "class": "X B",
    "gender": "L"
  },
  {
    "id": "S0044",
    "nisn": "00800000146",
    "name": "Putri Nur Puspitasari",
    "class": "X B",
    "gender": "P"
  },
  {
    "id": "S0038",
    "nisn": "00800000134",
    "name": "Putri Permatasari Ramadhani",
    "class": "X B",
    "gender": "P"
  },
  {
    "id": "S0036",
    "nisn": "00800000153",
    "name": "Syahrul Nugroho Kurniawan",
    "class": "X B",
    "gender": "L"
  },
  {
    "id": "S0026",
    "nisn": "00800000133",
    "name": "Syahrul Prasetya Purnomo",
    "class": "X B",
    "gender": "L"
  },
  {
    "id": "S0039",
    "nisn": "00800000136",
    "name": "Tiara Safitri Safitri",
    "class": "X B",
    "gender": "P"
  },
  {
    "id": "S0045",
    "nisn": "00800000148",
    "name": "Tiara Wulandari Kusumawardani",
    "class": "X B",
    "gender": "P"
  },
  {
    "id": "S0027",
    "nisn": "00800000135",
    "name": "Yusuf Setiawan Pratama",
    "class": "X B",
    "gender": "L"
  },
  {
    "id": "S0046",
    "nisn": "00800000150",
    "name": "Zahra Amalia Febriana",
    "class": "X B",
    "gender": "P"
  },
  {
    "id": "S0040",
    "nisn": "00800000138",
    "name": "Zahra Kusuma Rahmawati",
    "class": "X B",
    "gender": "P"
  },
  {
    "id": "S0052",
    "nisn": "00800000167",
    "name": "Ahmad Firmansyah Wijaya",
    "class": "X C",
    "gender": "L"
  },
  {
    "id": "S0063",
    "nisn": "00800000166",
    "name": "Anisa Khaerunnisa Utami",
    "class": "X C",
    "gender": "P"
  },
  {
    "id": "S0069",
    "nisn": "00800000178",
    "name": "Anisa Permatasari Lestari",
    "class": "X C",
    "gender": "P"
  },
  {
    "id": "S0053",
    "nisn": "00800000169",
    "name": "Bagas Nur Kurniawan",
    "class": "X C",
    "gender": "L"
  },
  {
    "id": "S0050",
    "nisn": "00800000163",
    "name": "Danang Fauzi Pramono",
    "class": "X C",
    "gender": "L"
  },
  {
    "id": "S0060",
    "nisn": "00800000183",
    "name": "Danang Setiawan Rahman",
    "class": "X C",
    "gender": "L"
  },
  {
    "id": "S0064",
    "nisn": "00800000168",
    "name": "Dina Aulia Sulastri",
    "class": "X C",
    "gender": "P"
  },
  {
    "id": "S0070",
    "nisn": "00800000180",
    "name": "Dina Safitri Widyaningrum",
    "class": "X C",
    "gender": "P"
  },
  {
    "id": "S0054",
    "nisn": "00800000171",
    "name": "Galih Akbar Kusuma",
    "class": "X C",
    "gender": "L"
  },
  {
    "id": "S0051",
    "nisn": "00800000165",
    "name": "Gilang Ramadhan Suryanto",
    "class": "X C",
    "gender": "L"
  },
  {
    "id": "S0071",
    "nisn": "00800000182",
    "name": "Hana Kusuma Sari",
    "class": "X C",
    "gender": "P"
  },
  {
    "id": "S0065",
    "nisn": "00800000170",
    "name": "Hana Salsabila Handayani",
    "class": "X C",
    "gender": "P"
  },
  {
    "id": "S0055",
    "nisn": "00800000173",
    "name": "Joko Santoso Saputra",
    "class": "X C",
    "gender": "L"
  },
  {
    "id": "S0056",
    "nisn": "00800000175",
    "name": "Maulana Rizki Setiadi",
    "class": "X C",
    "gender": "L"
  },
  {
    "id": "S0066",
    "nisn": "00800000172",
    "name": "Maya Dewanti Wulandari",
    "class": "X C",
    "gender": "P"
  },
  {
    "id": "S0072",
    "nisn": "00800000184",
    "name": "Maya Hidayati Anggraini",
    "class": "X C",
    "gender": "P"
  },
  {
    "id": "S0057",
    "nisn": "00800000177",
    "name": "Rafi Ardiansyah Wicaksono",
    "class": "X C",
    "gender": "L"
  },
  {
    "id": "S0067",
    "nisn": "00800000174",
    "name": "Rina Maharani Kurniasari",
    "class": "X C",
    "gender": "P"
  },
  {
    "id": "S0061",
    "nisn": "00800000162",
    "name": "Rina Rahmatika Febriana",
    "class": "X C",
    "gender": "P"
  },
  {
    "id": "S0058",
    "nisn": "00800000179",
    "name": "Taufik Gunawan Hermawan",
    "class": "X C",
    "gender": "L"
  },
  {
    "id": "S0062",
    "nisn": "00800000164",
    "name": "Vina Fitriani Mulyani",
    "class": "X C",
    "gender": "P"
  },
  {
    "id": "S0068",
    "nisn": "00800000176",
    "name": "Vina Syahputri Susanti",
    "class": "X C",
    "gender": "P"
  },
  {
    "id": "S0049",
    "nisn": "00800000161",
    "name": "Zackya Nugroho Mustofa",
    "class": "X C",
    "gender": "L"
  },
  {
    "id": "S0059",
    "nisn": "00800000181",
    "name": "Zackya Prasetya Pamungkas",
    "class": "X C",
    "gender": "L"
  },
  {
    "id": "S0081",
    "nisn": "00800000207",
    "name": "Alif Hidayat Pratama",
    "class": "X D",
    "gender": "L"
  },
  {
    "id": "S0086",
    "nisn": "00800000194",
    "name": "Bella Nur Sari",
    "class": "X D",
    "gender": "P"
  },
  {
    "id": "S0092",
    "nisn": "00800000206",
    "name": "Bella Rahmatika Pratiwi",
    "class": "X D",
    "gender": "P"
  },
  {
    "id": "S0075",
    "nisn": "00800000195",
    "name": "Dimas Saputra Hermawan",
    "class": "X D",
    "gender": "L"
  },
  {
    "id": "S0082",
    "nisn": "00800000209",
    "name": "Eko Nugroho Nugraha",
    "class": "X D",
    "gender": "L"
  },
  {
    "id": "S0093",
    "nisn": "00800000208",
    "name": "Fatimah Fitriani Setianingsih",
    "class": "X D",
    "gender": "P"
  },
  {
    "id": "S0087",
    "nisn": "00800000196",
    "name": "Fatimah Wulandari Anggraini",
    "class": "X D",
    "gender": "P"
  },
  {
    "id": "S0076",
    "nisn": "00800000197",
    "name": "Hafizh Pratama Pamungkas",
    "class": "X D",
    "gender": "L"
  },
  {
    "id": "S0083",
    "nisn": "00800000211",
    "name": "Hendro Fauzi Utomo",
    "class": "X D",
    "gender": "L"
  },
  {
    "id": "S0073",
    "nisn": "00800000191",
    "name": "Hendro Setiawan Setiadi",
    "class": "X D",
    "gender": "L"
  },
  {
    "id": "S0088",
    "nisn": "00800000198",
    "name": "Intan Amalia Ramadhani",
    "class": "X D",
    "gender": "P"
  },
  {
    "id": "S0094",
    "nisn": "00800000210",
    "name": "Intan Khaerunnisa Puspitasari",
    "class": "X D",
    "gender": "P"
  },
  {
    "id": "S0077",
    "nisn": "00800000199",
    "name": "Kevin Mahendra Rahman",
    "class": "X D",
    "gender": "L"
  },
  {
    "id": "S0074",
    "nisn": "00800000193",
    "name": "Muhammad Hakim Wicaksono",
    "class": "X D",
    "gender": "L"
  },
  {
    "id": "S0084",
    "nisn": "00800000213",
    "name": "Muhammad Ramadhan Sulistyo",
    "class": "X D",
    "gender": "L"
  },
  {
    "id": "S0078",
    "nisn": "00800000201",
    "name": "Naufal Kusuma Santoso",
    "class": "X D",
    "gender": "L"
  },
  {
    "id": "S0089",
    "nisn": "00800000200",
    "name": "Nurul Anggraini Safitri",
    "class": "X D",
    "gender": "P"
  },
  {
    "id": "S0095",
    "nisn": "00800000212",
    "name": "Nurul Aulia Kusumawardani",
    "class": "X D",
    "gender": "P"
  },
  {
    "id": "S0079",
    "nisn": "00800000203",
    "name": "Rizky Wibowo Triyono",
    "class": "X D",
    "gender": "L"
  },
  {
    "id": "S0090",
    "nisn": "00800000202",
    "name": "Siti Khoirun Rahmawati",
    "class": "X D",
    "gender": "P"
  },
  {
    "id": "S0096",
    "nisn": "00800000214",
    "name": "Siti Salsabila Febriana",
    "class": "X D",
    "gender": "P"
  },
  {
    "id": "S0080",
    "nisn": "00800000205",
    "name": "Wahyu Putra Purnomo",
    "class": "X D",
    "gender": "L"
  },
  {
    "id": "S0085",
    "nisn": "00800000192",
    "name": "Yuliana Az-Zahra Widyaningrum",
    "class": "X D",
    "gender": "P"
  },
  {
    "id": "S0091",
    "nisn": "00800000204",
    "name": "Yuliana Lestari Novitasari",
    "class": "X D",
    "gender": "P"
  },
  {
    "id": "S0106",
    "nisn": "00800000239",
    "name": "Aditya Setiawan Wijaya",
    "class": "X E",
    "gender": "L"
  },
  {
    "id": "S0120",
    "nisn": "00800000244",
    "name": "Aisyah Anggraini Widyaningrum",
    "class": "X E",
    "gender": "P"
  },
  {
    "id": "S0114",
    "nisn": "00800000232",
    "name": "Aisyah Hidayati Sulastri",
    "class": "X E",
    "gender": "P"
  },
  {
    "id": "S0103",
    "nisn": "00800000233",
    "name": "Bayu Ardiansyah Mustofa",
    "class": "X E",
    "gender": "L"
  },
  {
    "id": "S0109",
    "nisn": "00800000222",
    "name": "Dewi Maharani Puspitasari",
    "class": "X E",
    "gender": "P"
  },
  {
    "id": "S0115",
    "nisn": "00800000234",
    "name": "Dewi Rahma Handayani",
    "class": "X E",
    "gender": "P"
  },
  {
    "id": "S0107",
    "nisn": "00800000241",
    "name": "Fajar Hakim Kurniawan",
    "class": "X E",
    "gender": "L"
  },
  {
    "id": "S0097",
    "nisn": "00800000221",
    "name": "Fajar Ramadhan Purnomo",
    "class": "X E",
    "gender": "L"
  },
  {
    "id": "S0104",
    "nisn": "00800000235",
    "name": "Farhan Gunawan Pramono",
    "class": "X E",
    "gender": "L"
  },
  {
    "id": "S0116",
    "nisn": "00800000236",
    "name": "Gita Az-Zahra Wulandari",
    "class": "X E",
    "gender": "P"
  },
  {
    "id": "S0110",
    "nisn": "00800000224",
    "name": "Gita Syahputri Kusumawardani",
    "class": "X E",
    "gender": "P"
  },
  {
    "id": "S0098",
    "nisn": "00800000223",
    "name": "Ilham Firmansyah Pratama",
    "class": "X E",
    "gender": "L"
  },
  {
    "id": "S0108",
    "nisn": "00800000243",
    "name": "Ilham Saputra Kusuma",
    "class": "X E",
    "gender": "L"
  },
  {
    "id": "S0105",
    "nisn": "00800000237",
    "name": "Irfan Prasetya Suryanto",
    "class": "X E",
    "gender": "L"
  },
  {
    "id": "S0117",
    "nisn": "00800000238",
    "name": "Laila Nur Kurniasari",
    "class": "X E",
    "gender": "P"
  },
  {
    "id": "S0111",
    "nisn": "00800000226",
    "name": "Laila Permatasari Febriana",
    "class": "X E",
    "gender": "P"
  },
  {
    "id": "S0099",
    "nisn": "00800000225",
    "name": "Lukman Nur Nugraha",
    "class": "X E",
    "gender": "L"
  },
  {
    "id": "S0100",
    "nisn": "00800000227",
    "name": "Pratama Akbar Utomo",
    "class": "X E",
    "gender": "L"
  },
  {
    "id": "S0112",
    "nisn": "00800000228",
    "name": "Rani Safitri Mulyani",
    "class": "X E",
    "gender": "P"
  },
  {
    "id": "S0118",
    "nisn": "00800000240",
    "name": "Rani Wulandari Susanti",
    "class": "X E",
    "gender": "P"
  },
  {
    "id": "S0101",
    "nisn": "00800000229",
    "name": "Syahrul Santoso Sulistyo",
    "class": "X E",
    "gender": "L"
  },
  {
    "id": "S0119",
    "nisn": "00800000242",
    "name": "Ulfa Amalia Lestari",
    "class": "X E",
    "gender": "P"
  },
  {
    "id": "S0113",
    "nisn": "00800000230",
    "name": "Ulfa Kusuma Utami",
    "class": "X E",
    "gender": "P"
  },
  {
    "id": "S0102",
    "nisn": "00800000231",
    "name": "Yusuf Rizki Hidayatullah",
    "class": "X E",
    "gender": "L"
  },
  {
    "id": "S0127",
    "nisn": "00800000263",
    "name": "Ahmad Hidayat Setiadi",
    "class": "X F",
    "gender": "L"
  },
  {
    "id": "S0137",
    "nisn": "00800000260",
    "name": "Annisa Aulia Anggraini",
    "class": "X F",
    "gender": "P"
  },
  {
    "id": "S0143",
    "nisn": "00800000272",
    "name": "Annisa Safitri Setianingsih",
    "class": "X F",
    "gender": "P"
  },
  {
    "id": "S0128",
    "nisn": "00800000265",
    "name": "Bagas Nugroho Wicaksono",
    "class": "X F",
    "gender": "L"
  },
  {
    "id": "S0125",
    "nisn": "00800000259",
    "name": "Danang Wibowo Kusuma",
    "class": "X F",
    "gender": "L"
  },
  {
    "id": "S0144",
    "nisn": "00800000274",
    "name": "Erna Kusuma Puspitasari",
    "class": "X F",
    "gender": "P"
  },
  {
    "id": "S0138",
    "nisn": "00800000262",
    "name": "Erna Salsabila Ramadhani",
    "class": "X F",
    "gender": "P"
  },
  {
    "id": "S0129",
    "nisn": "00800000267",
    "name": "Galih Fauzi Hermawan",
    "class": "X F",
    "gender": "L"
  },
  {
    "id": "S0126",
    "nisn": "00800000261",
    "name": "Gilang Putra Saputra",
    "class": "X F",
    "gender": "L"
  },
  {
    "id": "S0139",
    "nisn": "00800000264",
    "name": "Indah Dewanti Safitri",
    "class": "X F",
    "gender": "P"
  },
  {
    "id": "S0133",
    "nisn": "00800000252",
    "name": "Indah Lestari Susanti",
    "class": "X F",
    "gender": "P"
  },
  {
    "id": "S0130",
    "nisn": "00800000269",
    "name": "Joko Ramadhan Pamungkas",
    "class": "X F",
    "gender": "L"
  },
  {
    "id": "S0131",
    "nisn": "00800000271",
    "name": "Maulana Firmansyah Rahman",
    "class": "X F",
    "gender": "L"
  },
  {
    "id": "S0121",
    "nisn": "00800000251",
    "name": "Maulana Saputra Pramono",
    "class": "X F",
    "gender": "L"
  },
  {
    "id": "S0140",
    "nisn": "00800000266",
    "name": "Nabila Maharani Rahmawati",
    "class": "X F",
    "gender": "P"
  },
  {
    "id": "S0134",
    "nisn": "00800000254",
    "name": "Nabila Rahmatika Lestari",
    "class": "X F",
    "gender": "P"
  },
  {
    "id": "S0132",
    "nisn": "00800000273",
    "name": "Rafi Nur Santoso",
    "class": "X F",
    "gender": "L"
  },
  {
    "id": "S0122",
    "nisn": "00800000253",
    "name": "Rafi Pratama Suryanto",
    "class": "X F",
    "gender": "L"
  },
  {
    "id": "S0135",
    "nisn": "00800000256",
    "name": "Salma Fitriani Widyaningrum",
    "class": "X F",
    "gender": "P"
  },
  {
    "id": "S0141",
    "nisn": "00800000268",
    "name": "Salma Syahputri Novitasari",
    "class": "X F",
    "gender": "P"
  },
  {
    "id": "S0123",
    "nisn": "00800000255",
    "name": "Taufik Mahendra Wijaya",
    "class": "X F",
    "gender": "L"
  },
  {
    "id": "S0136",
    "nisn": "00800000258",
    "name": "Wulan Khaerunnisa Sari",
    "class": "X F",
    "gender": "P"
  },
  {
    "id": "S0142",
    "nisn": "00800000270",
    "name": "Wulan Permatasari Pratiwi",
    "class": "X F",
    "gender": "P"
  },
  {
    "id": "S0124",
    "nisn": "00800000257",
    "name": "Zackya Kusuma Kurniawan",
    "class": "X F",
    "gender": "L"
  },
  {
    "id": "S0146",
    "nisn": "00800000283",
    "name": "Alif Akbar Hermawan",
    "class": "X G",
    "gender": "L"
  },
  {
    "id": "S0156",
    "nisn": "00800000303",
    "name": "Alif Mahendra Hidayatullah",
    "class": "X G",
    "gender": "L"
  },
  {
    "id": "S0166",
    "nisn": "00800000300",
    "name": "Citra Fitriani Wulandari",
    "class": "X G",
    "gender": "P"
  },
  {
    "id": "S0160",
    "nisn": "00800000288",
    "name": "Citra Wulandari Kusumawardani",
    "class": "X G",
    "gender": "P"
  },
  {
    "id": "S0150",
    "nisn": "00800000291",
    "name": "Dimas Gunawan Triyono",
    "class": "X G",
    "gender": "L"
  },
  {
    "id": "S0147",
    "nisn": "00800000285",
    "name": "Eko Santoso Pamungkas",
    "class": "X G",
    "gender": "L"
  },
  {
    "id": "S0161",
    "nisn": "00800000290",
    "name": "Fitri Amalia Febriana",
    "class": "X G",
    "gender": "P"
  },
  {
    "id": "S0167",
    "nisn": "00800000302",
    "name": "Fitri Khaerunnisa Kurniasari",
    "class": "X G",
    "gender": "P"
  },
  {
    "id": "S0151",
    "nisn": "00800000293",
    "name": "Hafizh Prasetya Purnomo",
    "class": "X G",
    "gender": "L"
  },
  {
    "id": "S0148",
    "nisn": "00800000287",
    "name": "Hendro Rizki Rahman",
    "class": "X G",
    "gender": "L"
  },
  {
    "id": "S0162",
    "nisn": "00800000292",
    "name": "Kartika Anggraini Mulyani",
    "class": "X G",
    "gender": "P"
  },
  {
    "id": "S0168",
    "nisn": "00800000304",
    "name": "Kartika Aulia Susanti",
    "class": "X G",
    "gender": "P"
  },
  {
    "id": "S0152",
    "nisn": "00800000295",
    "name": "Kevin Setiawan Pratama",
    "class": "X G",
    "gender": "L"
  },
  {
    "id": "S0149",
    "nisn": "00800000289",
    "name": "Muhammad Ardiansyah Santoso",
    "class": "X G",
    "gender": "L"
  },
  {
    "id": "S0153",
    "nisn": "00800000297",
    "name": "Naufal Hakim Nugraha",
    "class": "X G",
    "gender": "L"
  },
  {
    "id": "S0163",
    "nisn": "00800000294",
    "name": "Putri Khoirun Utami",
    "class": "X G",
    "gender": "P"
  },
  {
    "id": "S0157",
    "nisn": "00800000282",
    "name": "Putri Rahma Pratiwi",
    "class": "X G",
    "gender": "P"
  },
  {
    "id": "S0154",
    "nisn": "00800000299",
    "name": "Rizky Saputra Utomo",
    "class": "X G",
    "gender": "L"
  },
  {
    "id": "S0158",
    "nisn": "00800000284",
    "name": "Tiara Az-Zahra Setianingsih",
    "class": "X G",
    "gender": "P"
  },
  {
    "id": "S0164",
    "nisn": "00800000296",
    "name": "Tiara Lestari Sulastri",
    "class": "X G",
    "gender": "P"
  },
  {
    "id": "S0145",
    "nisn": "00800000281",
    "name": "Wahyu Nur Wicaksono",
    "class": "X G",
    "gender": "L"
  },
  {
    "id": "S0155",
    "nisn": "00800000301",
    "name": "Wahyu Pratama Sulistyo",
    "class": "X G",
    "gender": "L"
  },
  {
    "id": "S0159",
    "nisn": "00800000286",
    "name": "Zahra Nur Puspitasari",
    "class": "X G",
    "gender": "P"
  },
  {
    "id": "S0165",
    "nisn": "00800000298",
    "name": "Zahra Rahmatika Handayani",
    "class": "X G",
    "gender": "P"
  },
  {
    "id": "S0171",
    "nisn": "00800000315",
    "name": "Aditya Wibowo Utomo",
    "class": "X H",
    "gender": "L"
  },
  {
    "id": "S0182",
    "nisn": "00800000314",
    "name": "Anisa Maharani Kurniasari",
    "class": "X H",
    "gender": "P"
  },
  {
    "id": "S0188",
    "nisn": "00800000326",
    "name": "Anisa Rahma Ramadhani",
    "class": "X H",
    "gender": "P"
  },
  {
    "id": "S0178",
    "nisn": "00800000329",
    "name": "Bayu Nur Kurniawan",
    "class": "X H",
    "gender": "L"
  },
  {
    "id": "S0189",
    "nisn": "00800000328",
    "name": "Dina Az-Zahra Safitri",
    "class": "X H",
    "gender": "P"
  },
  {
    "id": "S0183",
    "nisn": "00800000316",
    "name": "Dina Syahputri Susanti",
    "class": "X H",
    "gender": "P"
  },
  {
    "id": "S0172",
    "nisn": "00800000317",
    "name": "Fajar Putra Sulistyo",
    "class": "X H",
    "gender": "L"
  },
  {
    "id": "S0179",
    "nisn": "00800000331",
    "name": "Farhan Akbar Kusuma",
    "class": "X H",
    "gender": "L"
  },
  {
    "id": "S0169",
    "nisn": "00800000311",
    "name": "Farhan Mahendra Pratama",
    "class": "X H",
    "gender": "L"
  },
  {
    "id": "S0190",
    "nisn": "00800000330",
    "name": "Hana Nur Rahmawati",
    "class": "X H",
    "gender": "P"
  },
  {
    "id": "S0184",
    "nisn": "00800000318",
    "name": "Hana Permatasari Lestari",
    "class": "X H",
    "gender": "P"
  },
  {
    "id": "S0173",
    "nisn": "00800000319",
    "name": "Ilham Hidayat Hidayatullah",
    "class": "X H",
    "gender": "L"
  },
  {
    "id": "S0170",
    "nisn": "00800000313",
    "name": "Irfan Kusuma Nugraha",
    "class": "X H",
    "gender": "L"
  },
  {
    "id": "S0180",
    "nisn": "00800000333",
    "name": "Irfan Santoso Saputra",
    "class": "X H",
    "gender": "L"
  },
  {
    "id": "S0174",
    "nisn": "00800000321",
    "name": "Lukman Nugroho Mustofa",
    "class": "X H",
    "gender": "L"
  },
  {
    "id": "S0185",
    "nisn": "00800000320",
    "name": "Maya Safitri Widyaningrum",
    "class": "X H",
    "gender": "P"
  },
  {
    "id": "S0191",
    "nisn": "00800000332",
    "name": "Maya Wulandari Novitasari",
    "class": "X H",
    "gender": "P"
  },
  {
    "id": "S0175",
    "nisn": "00800000323",
    "name": "Pratama Fauzi Pramono",
    "class": "X H",
    "gender": "L"
  },
  {
    "id": "S0192",
    "nisn": "00800000334",
    "name": "Rina Amalia Pratiwi",
    "class": "X H",
    "gender": "P"
  },
  {
    "id": "S0186",
    "nisn": "00800000322",
    "name": "Rina Kusuma Sari",
    "class": "X H",
    "gender": "P"
  },
  {
    "id": "S0176",
    "nisn": "00800000325",
    "name": "Syahrul Ramadhan Suryanto",
    "class": "X H",
    "gender": "L"
  },
  {
    "id": "S0181",
    "nisn": "00800000312",
    "name": "Vina Dewanti Wulandari",
    "class": "X H",
    "gender": "P"
  },
  {
    "id": "S0187",
    "nisn": "00800000324",
    "name": "Vina Hidayati Anggraini",
    "class": "X H",
    "gender": "P"
  },
  {
    "id": "S0177",
    "nisn": "00800000327",
    "name": "Yusuf Firmansyah Wijaya",
    "class": "X H",
    "gender": "L"
  },
  {
    "id": "S0202",
    "nisn": "00800000359",
    "name": "Ahmad Mahendra Rahman",
    "class": "X I",
    "gender": "L"
  },
  {
    "id": "S0203",
    "nisn": "00800000361",
    "name": "Bagas Kusuma Santoso",
    "class": "X I",
    "gender": "L"
  },
  {
    "id": "S0193",
    "nisn": "00800000341",
    "name": "Bagas Santoso Suryanto",
    "class": "X I",
    "gender": "L"
  },
  {
    "id": "S0205",
    "nisn": "00800000342",
    "name": "Bella Khoirun Rahmawati",
    "class": "X I",
    "gender": "P"
  },
  {
    "id": "S0211",
    "nisn": "00800000354",
    "name": "Bella Salsabila Febriana",
    "class": "X I",
    "gender": "P"
  },
  {
    "id": "S0200",
    "nisn": "00800000355",
    "name": "Danang Saputra Hermawan",
    "class": "X I",
    "gender": "L"
  },
  {
    "id": "S0212",
    "nisn": "00800000356",
    "name": "Fatimah Dewanti Mulyani",
    "class": "X I",
    "gender": "P"
  },
  {
    "id": "S0206",
    "nisn": "00800000344",
    "name": "Fatimah Lestari Novitasari",
    "class": "X I",
    "gender": "P"
  },
  {
    "id": "S0194",
    "nisn": "00800000343",
    "name": "Galih Rizki Wijaya",
    "class": "X I",
    "gender": "L"
  },
  {
    "id": "S0204",
    "nisn": "00800000363",
    "name": "Galih Wibowo Triyono",
    "class": "X I",
    "gender": "L"
  },
  {
    "id": "S0201",
    "nisn": "00800000357",
    "name": "Gilang Pratama Pamungkas",
    "class": "X I",
    "gender": "L"
  },
  {
    "id": "S0213",
    "nisn": "00800000358",
    "name": "Intan Maharani Utami",
    "class": "X I",
    "gender": "P"
  },
  {
    "id": "S0207",
    "nisn": "00800000346",
    "name": "Intan Rahmatika Pratiwi",
    "class": "X I",
    "gender": "P"
  },
  {
    "id": "S0195",
    "nisn": "00800000345",
    "name": "Joko Ardiansyah Kurniawan",
    "class": "X I",
    "gender": "L"
  },
  {
    "id": "S0196",
    "nisn": "00800000347",
    "name": "Maulana Gunawan Kusuma",
    "class": "X I",
    "gender": "L"
  },
  {
    "id": "S0208",
    "nisn": "00800000348",
    "name": "Nurul Fitriani Setianingsih",
    "class": "X I",
    "gender": "P"
  },
  {
    "id": "S0214",
    "nisn": "00800000360",
    "name": "Nurul Syahputri Sulastri",
    "class": "X I",
    "gender": "P"
  },
  {
    "id": "S0197",
    "nisn": "00800000349",
    "name": "Rafi Prasetya Saputra",
    "class": "X I",
    "gender": "L"
  },
  {
    "id": "S0209",
    "nisn": "00800000350",
    "name": "Siti Khaerunnisa Puspitasari",
    "class": "X I",
    "gender": "P"
  },
  {
    "id": "S0215",
    "nisn": "00800000362",
    "name": "Siti Permatasari Handayani",
    "class": "X I",
    "gender": "P"
  },
  {
    "id": "S0198",
    "nisn": "00800000351",
    "name": "Taufik Setiawan Setiadi",
    "class": "X I",
    "gender": "L"
  },
  {
    "id": "S0210",
    "nisn": "00800000352",
    "name": "Yuliana Aulia Kusumawardani",
    "class": "X I",
    "gender": "P"
  },
  {
    "id": "S0216",
    "nisn": "00800000364",
    "name": "Yuliana Safitri Wulandari",
    "class": "X I",
    "gender": "P"
  },
  {
    "id": "S0199",
    "nisn": "00800000353",
    "name": "Zackya Hakim Wicaksono",
    "class": "X I",
    "gender": "L"
  },
  {
    "id": "S0239",
    "nisn": "00800000392",
    "name": "Aisyah Fitriani Safitri",
    "class": "X J",
    "gender": "P"
  },
  {
    "id": "S0233",
    "nisn": "00800000380",
    "name": "Aisyah Wulandari Susanti",
    "class": "X J",
    "gender": "P"
  },
  {
    "id": "S0221",
    "nisn": "00800000379",
    "name": "Alif Fauzi Triyono",
    "class": "X J",
    "gender": "L"
  },
  {
    "id": "S0234",
    "nisn": "00800000382",
    "name": "Dewi Amalia Lestari",
    "class": "X J",
    "gender": "P"
  },
  {
    "id": "S0240",
    "nisn": "00800000394",
    "name": "Dewi Khaerunnisa Rahmawati",
    "class": "X J",
    "gender": "P"
  },
  {
    "id": "S0225",
    "nisn": "00800000387",
    "name": "Dimas Akbar Utomo",
    "class": "X J",
    "gender": "L"
  },
  {
    "id": "S0222",
    "nisn": "00800000381",
    "name": "Eko Ramadhan Purnomo",
    "class": "X J",
    "gender": "L"
  },
  {
    "id": "S0235",
    "nisn": "00800000384",
    "name": "Gita Anggraini Widyaningrum",
    "class": "X J",
    "gender": "P"
  },
  {
    "id": "S0229",
    "nisn": "00800000372",
    "name": "Gita Hidayati Sulastri",
    "class": "X J",
    "gender": "P"
  },
  {
    "id": "S0226",
    "nisn": "00800000389",
    "name": "Hafizh Santoso Sulistyo",
    "class": "X J",
    "gender": "L"
  },
  {
    "id": "S0223",
    "nisn": "00800000383",
    "name": "Hendro Firmansyah Pratama",
    "class": "X J",
    "gender": "L"
  },
  {
    "id": "S0227",
    "nisn": "00800000391",
    "name": "Kevin Rizki Hidayatullah",
    "class": "X J",
    "gender": "L"
  },
  {
    "id": "S0217",
    "nisn": "00800000371",
    "name": "Kevin Wibowo Hermawan",
    "class": "X J",
    "gender": "L"
  },
  {
    "id": "S0236",
    "nisn": "00800000386",
    "name": "Laila Khoirun Sari",
    "class": "X J",
    "gender": "P"
  },
  {
    "id": "S0230",
    "nisn": "00800000374",
    "name": "Laila Rahma Handayani",
    "class": "X J",
    "gender": "P"
  },
  {
    "id": "S0224",
    "nisn": "00800000385",
    "name": "Muhammad Nur Nugraha",
    "class": "X J",
    "gender": "L"
  },
  {
    "id": "S0228",
    "nisn": "00800000393",
    "name": "Naufal Ardiansyah Mustofa",
    "class": "X J",
    "gender": "L"
  },
  {
    "id": "S0218",
    "nisn": "00800000373",
    "name": "Naufal Putra Pamungkas",
    "class": "X J",
    "gender": "L"
  },
  {
    "id": "S0231",
    "nisn": "00800000376",
    "name": "Rani Az-Zahra Wulandari",
    "class": "X J",
    "gender": "P"
  },
  {
    "id": "S0237",
    "nisn": "00800000388",
    "name": "Rani Lestari Anggraini",
    "class": "X J",
    "gender": "P"
  },
  {
    "id": "S0219",
    "nisn": "00800000375",
    "name": "Rizky Hidayat Rahman",
    "class": "X J",
    "gender": "L"
  },
  {
    "id": "S0232",
    "nisn": "00800000378",
    "name": "Ulfa Nur Kurniasari",
    "class": "X J",
    "gender": "P"
  },
  {
    "id": "S0238",
    "nisn": "00800000390",
    "name": "Ulfa Rahmatika Ramadhani",
    "class": "X J",
    "gender": "P"
  },
  {
    "id": "S0220",
    "nisn": "00800000377",
    "name": "Wahyu Nugroho Santoso",
    "class": "X J",
    "gender": "L"
  },
  {
    "id": "S0246",
    "nisn": "00700000411",
    "name": "Aditya Saputra Pramono",
    "class": "XI A",
    "gender": "L"
  },
  {
    "id": "S0262",
    "nisn": "00700000420",
    "name": "Annisa Az-Zahra Mulyani",
    "class": "XI A",
    "gender": "P"
  },
  {
    "id": "S0256",
    "nisn": "00700000408",
    "name": "Annisa Syahputri Novitasari",
    "class": "XI A",
    "gender": "P"
  },
  {
    "id": "S0243",
    "nisn": "00700000405",
    "name": "Bayu Prasetya Sulistyo",
    "class": "XI A",
    "gender": "L"
  },
  {
    "id": "S0263",
    "nisn": "00700000422",
    "name": "Erna Nur Utami",
    "class": "XI A",
    "gender": "P"
  },
  {
    "id": "S0257",
    "nisn": "00700000410",
    "name": "Erna Permatasari Pratiwi",
    "class": "XI A",
    "gender": "P"
  },
  {
    "id": "S0247",
    "nisn": "00700000413",
    "name": "Fajar Pratama Suryanto",
    "class": "XI A",
    "gender": "L"
  },
  {
    "id": "S0244",
    "nisn": "00700000407",
    "name": "Farhan Setiawan Hidayatullah",
    "class": "XI A",
    "gender": "L"
  },
  {
    "id": "S0248",
    "nisn": "00700000415",
    "name": "Ilham Mahendra Wijaya",
    "class": "XI A",
    "gender": "L"
  },
  {
    "id": "S0258",
    "nisn": "00700000412",
    "name": "Indah Safitri Setianingsih",
    "class": "XI A",
    "gender": "P"
  },
  {
    "id": "S0264",
    "nisn": "00700000424",
    "name": "Indah Wulandari Sulastri",
    "class": "XI A",
    "gender": "P"
  },
  {
    "id": "S0245",
    "nisn": "00700000409",
    "name": "Irfan Hakim Mustofa",
    "class": "XI A",
    "gender": "L"
  },
  {
    "id": "S0249",
    "nisn": "00700000417",
    "name": "Lukman Kusuma Kurniawan",
    "class": "XI A",
    "gender": "L"
  },
  {
    "id": "S0259",
    "nisn": "00700000414",
    "name": "Nabila Kusuma Puspitasari",
    "class": "XI A",
    "gender": "P"
  },
  {
    "id": "S0253",
    "nisn": "00700000402",
    "name": "Nabila Salsabila Ramadhani",
    "class": "XI A",
    "gender": "P"
  },
  {
    "id": "S0250",
    "nisn": "00700000419",
    "name": "Pratama Wibowo Kusuma",
    "class": "XI A",
    "gender": "L"
  },
  {
    "id": "S0254",
    "nisn": "00700000404",
    "name": "Salma Dewanti Safitri",
    "class": "XI A",
    "gender": "P"
  },
  {
    "id": "S0260",
    "nisn": "00700000416",
    "name": "Salma Hidayati Kusumawardani",
    "class": "XI A",
    "gender": "P"
  },
  {
    "id": "S0241",
    "nisn": "00700000401",
    "name": "Syahrul Ardiansyah Nugraha",
    "class": "XI A",
    "gender": "L"
  },
  {
    "id": "S0251",
    "nisn": "00700000421",
    "name": "Syahrul Putra Saputra",
    "class": "XI A",
    "gender": "L"
  },
  {
    "id": "S0255",
    "nisn": "00700000406",
    "name": "Wulan Maharani Rahmawati",
    "class": "XI A",
    "gender": "P"
  },
  {
    "id": "S0261",
    "nisn": "00700000418",
    "name": "Wulan Rahma Febriana",
    "class": "XI A",
    "gender": "P"
  },
  {
    "id": "S0242",
    "nisn": "00700000403",
    "name": "Yusuf Gunawan Utomo",
    "class": "XI A",
    "gender": "L"
  },
  {
    "id": "S0252",
    "nisn": "00700000423",
    "name": "Yusuf Hidayat Setiadi",
    "class": "XI A",
    "gender": "L"
  },
  {
    "id": "S0267",
    "nisn": "00700000435",
    "name": "Ahmad Fauzi Kusuma",
    "class": "XI B",
    "gender": "L"
  },
  {
    "id": "S0268",
    "nisn": "00700000437",
    "name": "Bagas Ramadhan Saputra",
    "class": "XI B",
    "gender": "L"
  },
  {
    "id": "S0285",
    "nisn": "00700000448",
    "name": "Citra Dewanti Widyaningrum",
    "class": "XI B",
    "gender": "P"
  },
  {
    "id": "S0279",
    "nisn": "00700000436",
    "name": "Citra Lestari Sulastri",
    "class": "XI B",
    "gender": "P"
  },
  {
    "id": "S0275",
    "nisn": "00700000451",
    "name": "Danang Gunawan Triyono",
    "class": "XI B",
    "gender": "L"
  },
  {
    "id": "S0265",
    "nisn": "00700000431",
    "name": "Danang Hidayat Wijaya",
    "class": "XI B",
    "gender": "L"
  },
  {
    "id": "S0286",
    "nisn": "00700000450",
    "name": "Fitri Maharani Sari",
    "class": "XI B",
    "gender": "P"
  },
  {
    "id": "S0280",
    "nisn": "00700000438",
    "name": "Fitri Rahmatika Handayani",
    "class": "XI B",
    "gender": "P"
  },
  {
    "id": "S0269",
    "nisn": "00700000439",
    "name": "Galih Firmansyah Setiadi",
    "class": "XI B",
    "gender": "L"
  },
  {
    "id": "S0266",
    "nisn": "00700000433",
    "name": "Gilang Nugroho Kurniawan",
    "class": "XI B",
    "gender": "L"
  },
  {
    "id": "S0276",
    "nisn": "00700000453",
    "name": "Gilang Prasetya Purnomo",
    "class": "XI B",
    "gender": "L"
  },
  {
    "id": "S0270",
    "nisn": "00700000441",
    "name": "Joko Nur Wicaksono",
    "class": "XI B",
    "gender": "L"
  },
  {
    "id": "S0281",
    "nisn": "00700000440",
    "name": "Kartika Fitriani Wulandari",
    "class": "XI B",
    "gender": "P"
  },
  {
    "id": "S0287",
    "nisn": "00700000452",
    "name": "Kartika Syahputri Anggraini",
    "class": "XI B",
    "gender": "P"
  },
  {
    "id": "S0271",
    "nisn": "00700000443",
    "name": "Maulana Akbar Hermawan",
    "class": "XI B",
    "gender": "L"
  },
  {
    "id": "S0282",
    "nisn": "00700000442",
    "name": "Putri Khaerunnisa Kurniasari",
    "class": "XI B",
    "gender": "P"
  },
  {
    "id": "S0288",
    "nisn": "00700000454",
    "name": "Putri Permatasari Ramadhani",
    "class": "XI B",
    "gender": "P"
  },
  {
    "id": "S0272",
    "nisn": "00700000445",
    "name": "Rafi Santoso Pamungkas",
    "class": "XI B",
    "gender": "L"
  },
  {
    "id": "S0273",
    "nisn": "00700000447",
    "name": "Taufik Rizki Rahman",
    "class": "XI B",
    "gender": "L"
  },
  {
    "id": "S0277",
    "nisn": "00700000432",
    "name": "Tiara Anggraini Mulyani",
    "class": "XI B",
    "gender": "P"
  },
  {
    "id": "S0283",
    "nisn": "00700000444",
    "name": "Tiara Aulia Susanti",
    "class": "XI B",
    "gender": "P"
  },
  {
    "id": "S0274",
    "nisn": "00700000449",
    "name": "Zackya Ardiansyah Santoso",
    "class": "XI B",
    "gender": "L"
  },
  {
    "id": "S0278",
    "nisn": "00700000434",
    "name": "Zahra Khoirun Utami",
    "class": "XI B",
    "gender": "P"
  },
  {
    "id": "S0284",
    "nisn": "00700000446",
    "name": "Zahra Salsabila Lestari",
    "class": "XI B",
    "gender": "P"
  },
  {
    "id": "S0296",
    "nisn": "00700000475",
    "name": "Alif Wibowo Utomo",
    "class": "XI C",
    "gender": "L"
  },
  {
    "id": "S0307",
    "nisn": "00700000474",
    "name": "Anisa Amalia Pratiwi",
    "class": "XI C",
    "gender": "P"
  },
  {
    "id": "S0301",
    "nisn": "00700000462",
    "name": "Anisa Kusuma Sari",
    "class": "XI C",
    "gender": "P"
  },
  {
    "id": "S0300",
    "nisn": "00700000483",
    "name": "Dimas Fauzi Pramono",
    "class": "XI C",
    "gender": "L"
  },
  {
    "id": "S0290",
    "nisn": "00700000463",
    "name": "Dimas Setiawan Rahman",
    "class": "XI C",
    "gender": "L"
  },
  {
    "id": "S0308",
    "nisn": "00700000476",
    "name": "Dina Anggraini Setianingsih",
    "class": "XI C",
    "gender": "P"
  },
  {
    "id": "S0302",
    "nisn": "00700000464",
    "name": "Dina Hidayati Anggraini",
    "class": "XI C",
    "gender": "P"
  },
  {
    "id": "S0297",
    "nisn": "00700000477",
    "name": "Eko Putra Sulistyo",
    "class": "XI C",
    "gender": "L"
  },
  {
    "id": "S0291",
    "nisn": "00700000465",
    "name": "Hafizh Hakim Santoso",
    "class": "XI C",
    "gender": "L"
  },
  {
    "id": "S0309",
    "nisn": "00700000478",
    "name": "Hana Khoirun Puspitasari",
    "class": "XI C",
    "gender": "P"
  },
  {
    "id": "S0303",
    "nisn": "00700000466",
    "name": "Hana Rahma Ramadhani",
    "class": "XI C",
    "gender": "P"
  },
  {
    "id": "S0298",
    "nisn": "00700000479",
    "name": "Hendro Hidayat Hidayatullah",
    "class": "XI C",
    "gender": "L"
  },
  {
    "id": "S0292",
    "nisn": "00700000467",
    "name": "Kevin Saputra Triyono",
    "class": "XI C",
    "gender": "L"
  },
  {
    "id": "S0304",
    "nisn": "00700000468",
    "name": "Maya Az-Zahra Safitri",
    "class": "XI C",
    "gender": "P"
  },
  {
    "id": "S0310",
    "nisn": "00700000480",
    "name": "Maya Lestari Kusumawardani",
    "class": "XI C",
    "gender": "P"
  },
  {
    "id": "S0299",
    "nisn": "00700000481",
    "name": "Muhammad Nugroho Mustofa",
    "class": "XI C",
    "gender": "L"
  },
  {
    "id": "S0289",
    "nisn": "00700000461",
    "name": "Muhammad Prasetya Pamungkas",
    "class": "XI C",
    "gender": "L"
  },
  {
    "id": "S0293",
    "nisn": "00700000469",
    "name": "Naufal Pratama Purnomo",
    "class": "XI C",
    "gender": "L"
  },
  {
    "id": "S0305",
    "nisn": "00700000470",
    "name": "Rina Nur Rahmawati",
    "class": "XI C",
    "gender": "P"
  },
  {
    "id": "S0311",
    "nisn": "00700000482",
    "name": "Rina Rahmatika Febriana",
    "class": "XI C",
    "gender": "P"
  },
  {
    "id": "S0294",
    "nisn": "00700000471",
    "name": "Rizky Mahendra Pratama",
    "class": "XI C",
    "gender": "L"
  },
  {
    "id": "S0312",
    "nisn": "00700000484",
    "name": "Vina Fitriani Mulyani",
    "class": "XI C",
    "gender": "P"
  },
  {
    "id": "S0306",
    "nisn": "00700000472",
    "name": "Vina Wulandari Novitasari",
    "class": "XI C",
    "gender": "P"
  },
  {
    "id": "S0295",
    "nisn": "00700000473",
    "name": "Wahyu Kusuma Nugraha",
    "class": "XI C",
    "gender": "L"
  },
  {
    "id": "S0321",
    "nisn": "00700000507",
    "name": "Aditya Gunawan Kusuma",
    "class": "XI D",
    "gender": "L"
  },
  {
    "id": "S0318",
    "nisn": "00700000501",
    "name": "Bayu Santoso Suryanto",
    "class": "XI D",
    "gender": "L"
  },
  {
    "id": "S0336",
    "nisn": "00700000514",
    "name": "Bella Nur Sari",
    "class": "XI D",
    "gender": "P"
  },
  {
    "id": "S0330",
    "nisn": "00700000502",
    "name": "Bella Permatasari Handayani",
    "class": "XI D",
    "gender": "P"
  },
  {
    "id": "S0322",
    "nisn": "00700000509",
    "name": "Fajar Prasetya Saputra",
    "class": "XI D",
    "gender": "L"
  },
  {
    "id": "S0319",
    "nisn": "00700000503",
    "name": "Farhan Rizki Wijaya",
    "class": "XI D",
    "gender": "L"
  },
  {
    "id": "S0325",
    "nisn": "00700000492",
    "name": "Fatimah Aulia Kusumawardani",
    "class": "XI D",
    "gender": "P"
  },
  {
    "id": "S0331",
    "nisn": "00700000504",
    "name": "Fatimah Safitri Wulandari",
    "class": "XI D",
    "gender": "P"
  },
  {
    "id": "S0313",
    "nisn": "00700000491",
    "name": "Ilham Fauzi Utomo",
    "class": "XI D",
    "gender": "L"
  },
  {
    "id": "S0323",
    "nisn": "00700000511",
    "name": "Ilham Setiawan Setiadi",
    "class": "XI D",
    "gender": "L"
  },
  {
    "id": "S0332",
    "nisn": "00700000506",
    "name": "Intan Kusuma Kurniasari",
    "class": "XI D",
    "gender": "P"
  },
  {
    "id": "S0326",
    "nisn": "00700000494",
    "name": "Intan Salsabila Febriana",
    "class": "XI D",
    "gender": "P"
  },
  {
    "id": "S0320",
    "nisn": "00700000505",
    "name": "Irfan Ardiansyah Kurniawan",
    "class": "XI D",
    "gender": "L"
  },
  {
    "id": "S0324",
    "nisn": "00700000513",
    "name": "Lukman Hakim Wicaksono",
    "class": "XI D",
    "gender": "L"
  },
  {
    "id": "S0314",
    "nisn": "00700000493",
    "name": "Lukman Ramadhan Sulistyo",
    "class": "XI D",
    "gender": "L"
  },
  {
    "id": "S0327",
    "nisn": "00700000496",
    "name": "Nurul Dewanti Mulyani",
    "class": "XI D",
    "gender": "P"
  },
  {
    "id": "S0333",
    "nisn": "00700000508",
    "name": "Nurul Hidayati Susanti",
    "class": "XI D",
    "gender": "P"
  },
  {
    "id": "S0315",
    "nisn": "00700000495",
    "name": "Pratama Firmansyah Hidayatullah",
    "class": "XI D",
    "gender": "L"
  },
  {
    "id": "S0328",
    "nisn": "00700000498",
    "name": "Siti Maharani Utami",
    "class": "XI D",
    "gender": "P"
  },
  {
    "id": "S0334",
    "nisn": "00700000510",
    "name": "Siti Rahma Lestari",
    "class": "XI D",
    "gender": "P"
  },
  {
    "id": "S0316",
    "nisn": "00700000497",
    "name": "Syahrul Nur Mustofa",
    "class": "XI D",
    "gender": "L"
  },
  {
    "id": "S0335",
    "nisn": "00700000512",
    "name": "Yuliana Az-Zahra Widyaningrum",
    "class": "XI D",
    "gender": "P"
  },
  {
    "id": "S0329",
    "nisn": "00700000500",
    "name": "Yuliana Syahputri Sulastri",
    "class": "XI D",
    "gender": "P"
  },
  {
    "id": "S0317",
    "nisn": "00700000499",
    "name": "Yusuf Akbar Pramono",
    "class": "XI D",
    "gender": "L"
  },
  {
    "id": "S0342",
    "nisn": "00700000531",
    "name": "Ahmad Wibowo Hermawan",
    "class": "XI E",
    "gender": "L"
  },
  {
    "id": "S0358",
    "nisn": "00700000540",
    "name": "Aisyah Dewanti Setianingsih",
    "class": "XI E",
    "gender": "P"
  },
  {
    "id": "S0352",
    "nisn": "00700000528",
    "name": "Aisyah Lestari Anggraini",
    "class": "XI E",
    "gender": "P"
  },
  {
    "id": "S0343",
    "nisn": "00700000533",
    "name": "Bagas Putra Pamungkas",
    "class": "XI E",
    "gender": "L"
  },
  {
    "id": "S0340",
    "nisn": "00700000527",
    "name": "Danang Mahendra Setiadi",
    "class": "XI E",
    "gender": "L"
  },
  {
    "id": "S0359",
    "nisn": "00700000542",
    "name": "Dewi Maharani Puspitasari",
    "class": "XI E",
    "gender": "P"
  },
  {
    "id": "S0353",
    "nisn": "00700000530",
    "name": "Dewi Rahmatika Ramadhani",
    "class": "XI E",
    "gender": "P"
  },
  {
    "id": "S0344",
    "nisn": "00700000535",
    "name": "Galih Hidayat Rahman",
    "class": "XI E",
    "gender": "L"
  },
  {
    "id": "S0341",
    "nisn": "00700000529",
    "name": "Gilang Kusuma Wicaksono",
    "class": "XI E",
    "gender": "L"
  },
  {
    "id": "S0354",
    "nisn": "00700000532",
    "name": "Gita Fitriani Safitri",
    "class": "XI E",
    "gender": "P"
  },
  {
    "id": "S0360",
    "nisn": "00700000544",
    "name": "Gita Syahputri Kusumawardani",
    "class": "XI E",
    "gender": "P"
  },
  {
    "id": "S0345",
    "nisn": "00700000537",
    "name": "Joko Nugroho Santoso",
    "class": "XI E",
    "gender": "L"
  },
  {
    "id": "S0349",
    "nisn": "00700000522",
    "name": "Laila Amalia Lestari",
    "class": "XI E",
    "gender": "P"
  },
  {
    "id": "S0355",
    "nisn": "00700000534",
    "name": "Laila Khaerunnisa Rahmawati",
    "class": "XI E",
    "gender": "P"
  },
  {
    "id": "S0346",
    "nisn": "00700000539",
    "name": "Maulana Fauzi Triyono",
    "class": "XI E",
    "gender": "L"
  },
  {
    "id": "S0337",
    "nisn": "00700000521",
    "name": "Rafi Hakim Kurniawan",
    "class": "XI E",
    "gender": "L"
  },
  {
    "id": "S0347",
    "nisn": "00700000541",
    "name": "Rafi Ramadhan Purnomo",
    "class": "XI E",
    "gender": "L"
  },
  {
    "id": "S0350",
    "nisn": "00700000524",
    "name": "Rani Anggraini Widyaningrum",
    "class": "XI E",
    "gender": "P"
  },
  {
    "id": "S0356",
    "nisn": "00700000536",
    "name": "Rani Aulia Novitasari",
    "class": "XI E",
    "gender": "P"
  },
  {
    "id": "S0348",
    "nisn": "00700000543",
    "name": "Taufik Firmansyah Pratama",
    "class": "XI E",
    "gender": "L"
  },
  {
    "id": "S0338",
    "nisn": "00700000523",
    "name": "Taufik Saputra Kusuma",
    "class": "XI E",
    "gender": "L"
  },
  {
    "id": "S0351",
    "nisn": "00700000526",
    "name": "Ulfa Khoirun Sari",
    "class": "XI E",
    "gender": "P"
  },
  {
    "id": "S0357",
    "nisn": "00700000538",
    "name": "Ulfa Salsabila Pratiwi",
    "class": "XI E",
    "gender": "P"
  },
  {
    "id": "S0339",
    "nisn": "00700000525",
    "name": "Zackya Pratama Saputra",
    "class": "XI E",
    "gender": "L"
  },
  {
    "id": "S0361",
    "nisn": "00700000551",
    "name": "Alif Firmansyah Rahman",
    "class": "XI F",
    "gender": "L"
  },
  {
    "id": "S0371",
    "nisn": "00700000571",
    "name": "Alif Saputra Pramono",
    "class": "XI F",
    "gender": "L"
  },
  {
    "id": "S0381",
    "nisn": "00700000568",
    "name": "Annisa Anggraini Wulandari",
    "class": "XI F",
    "gender": "P"
  },
  {
    "id": "S0375",
    "nisn": "00700000556",
    "name": "Annisa Hidayati Kusumawardani",
    "class": "XI F",
    "gender": "P"
  },
  {
    "id": "S0365",
    "nisn": "00700000559",
    "name": "Dimas Rizki Pratama",
    "class": "XI F",
    "gender": "L"
  },
  {
    "id": "S0362",
    "nisn": "00700000553",
    "name": "Eko Nur Santoso",
    "class": "XI F",
    "gender": "L"
  },
  {
    "id": "S0372",
    "nisn": "00700000573",
    "name": "Eko Pratama Suryanto",
    "class": "XI F",
    "gender": "L"
  },
  {
    "id": "S0382",
    "nisn": "00700000570",
    "name": "Erna Khoirun Kurniasari",
    "class": "XI F",
    "gender": "P"
  },
  {
    "id": "S0376",
    "nisn": "00700000558",
    "name": "Erna Rahma Febriana",
    "class": "XI F",
    "gender": "P"
  },
  {
    "id": "S0366",
    "nisn": "00700000561",
    "name": "Hafizh Ardiansyah Nugraha",
    "class": "XI F",
    "gender": "L"
  },
  {
    "id": "S0363",
    "nisn": "00700000555",
    "name": "Hendro Akbar Triyono",
    "class": "XI F",
    "gender": "L"
  },
  {
    "id": "S0377",
    "nisn": "00700000560",
    "name": "Indah Az-Zahra Mulyani",
    "class": "XI F",
    "gender": "P"
  },
  {
    "id": "S0383",
    "nisn": "00700000572",
    "name": "Indah Lestari Susanti",
    "class": "XI F",
    "gender": "P"
  },
  {
    "id": "S0367",
    "nisn": "00700000563",
    "name": "Kevin Gunawan Utomo",
    "class": "XI F",
    "gender": "L"
  },
  {
    "id": "S0364",
    "nisn": "00700000557",
    "name": "Muhammad Santoso Purnomo",
    "class": "XI F",
    "gender": "L"
  },
  {
    "id": "S0378",
    "nisn": "00700000562",
    "name": "Nabila Nur Utami",
    "class": "XI F",
    "gender": "P"
  },
  {
    "id": "S0384",
    "nisn": "00700000574",
    "name": "Nabila Rahmatika Lestari",
    "class": "XI F",
    "gender": "P"
  },
  {
    "id": "S0368",
    "nisn": "00700000565",
    "name": "Naufal Prasetya Sulistyo",
    "class": "XI F",
    "gender": "L"
  },
  {
    "id": "S0369",
    "nisn": "00700000567",
    "name": "Rizky Setiawan Hidayatullah",
    "class": "XI F",
    "gender": "L"
  },
  {
    "id": "S0373",
    "nisn": "00700000552",
    "name": "Salma Safitri Setianingsih",
    "class": "XI F",
    "gender": "P"
  },
  {
    "id": "S0379",
    "nisn": "00700000564",
    "name": "Salma Wulandari Sulastri",
    "class": "XI F",
    "gender": "P"
  },
  {
    "id": "S0370",
    "nisn": "00700000569",
    "name": "Wahyu Hakim Mustofa",
    "class": "XI F",
    "gender": "L"
  },
  {
    "id": "S0380",
    "nisn": "00700000566",
    "name": "Wulan Amalia Handayani",
    "class": "XI F",
    "gender": "P"
  },
  {
    "id": "S0374",
    "nisn": "00700000554",
    "name": "Wulan Kusuma Puspitasari",
    "class": "XI F",
    "gender": "P"
  },
  {
    "id": "S0396",
    "nisn": "00700000603",
    "name": "Aditya Akbar Hermawan",
    "class": "XI G",
    "gender": "L"
  },
  {
    "id": "S0386",
    "nisn": "00700000583",
    "name": "Aditya Mahendra Hidayatullah",
    "class": "XI G",
    "gender": "L"
  },
  {
    "id": "S0393",
    "nisn": "00700000597",
    "name": "Bayu Ramadhan Saputra",
    "class": "XI G",
    "gender": "L"
  },
  {
    "id": "S0398",
    "nisn": "00700000584",
    "name": "Citra Aulia Susanti",
    "class": "XI G",
    "gender": "P"
  },
  {
    "id": "S0404",
    "nisn": "00700000596",
    "name": "Citra Safitri Safitri",
    "class": "XI G",
    "gender": "P"
  },
  {
    "id": "S0387",
    "nisn": "00700000585",
    "name": "Fajar Kusuma Mustofa",
    "class": "XI G",
    "gender": "L"
  },
  {
    "id": "S0394",
    "nisn": "00700000599",
    "name": "Farhan Firmansyah Setiadi",
    "class": "XI G",
    "gender": "L"
  },
  {
    "id": "S0405",
    "nisn": "00700000598",
    "name": "Fitri Kusuma Rahmawati",
    "class": "XI G",
    "gender": "P"
  },
  {
    "id": "S0399",
    "nisn": "00700000586",
    "name": "Fitri Salsabila Lestari",
    "class": "XI G",
    "gender": "P"
  },
  {
    "id": "S0388",
    "nisn": "00700000587",
    "name": "Ilham Wibowo Pramono",
    "class": "XI G",
    "gender": "L"
  },
  {
    "id": "S0395",
    "nisn": "00700000601",
    "name": "Irfan Nur Wicaksono",
    "class": "XI G",
    "gender": "L"
  },
  {
    "id": "S0385",
    "nisn": "00700000581",
    "name": "Irfan Pratama Sulistyo",
    "class": "XI G",
    "gender": "L"
  },
  {
    "id": "S0400",
    "nisn": "00700000588",
    "name": "Kartika Dewanti Widyaningrum",
    "class": "XI G",
    "gender": "P"
  },
  {
    "id": "S0406",
    "nisn": "00700000600",
    "name": "Kartika Hidayati Novitasari",
    "class": "XI G",
    "gender": "P"
  },
  {
    "id": "S0389",
    "nisn": "00700000589",
    "name": "Lukman Putra Suryanto",
    "class": "XI G",
    "gender": "L"
  },
  {
    "id": "S0390",
    "nisn": "00700000591",
    "name": "Pratama Hidayat Wijaya",
    "class": "XI G",
    "gender": "L"
  },
  {
    "id": "S0401",
    "nisn": "00700000590",
    "name": "Putri Maharani Sari",
    "class": "XI G",
    "gender": "P"
  },
  {
    "id": "S0407",
    "nisn": "00700000602",
    "name": "Putri Rahma Pratiwi",
    "class": "XI G",
    "gender": "P"
  },
  {
    "id": "S0391",
    "nisn": "00700000593",
    "name": "Syahrul Nugroho Kurniawan",
    "class": "XI G",
    "gender": "L"
  },
  {
    "id": "S0408",
    "nisn": "00700000604",
    "name": "Tiara Az-Zahra Setianingsih",
    "class": "XI G",
    "gender": "P"
  },
  {
    "id": "S0402",
    "nisn": "00700000592",
    "name": "Tiara Syahputri Anggraini",
    "class": "XI G",
    "gender": "P"
  },
  {
    "id": "S0392",
    "nisn": "00700000595",
    "name": "Yusuf Fauzi Kusuma",
    "class": "XI G",
    "gender": "L"
  },
  {
    "id": "S0397",
    "nisn": "00700000582",
    "name": "Zahra Khaerunnisa Kurniasari",
    "class": "XI G",
    "gender": "P"
  },
  {
    "id": "S0403",
    "nisn": "00700000594",
    "name": "Zahra Permatasari Ramadhani",
    "class": "XI G",
    "gender": "P"
  },
  {
    "id": "S0417",
    "nisn": "00700000627",
    "name": "Ahmad Saputra Triyono",
    "class": "XI H",
    "gender": "L"
  },
  {
    "id": "S0432",
    "nisn": "00700000634",
    "name": "Anisa Maharani Kurniasari",
    "class": "XI H",
    "gender": "P"
  },
  {
    "id": "S0426",
    "nisn": "00700000622",
    "name": "Anisa Rahmatika Febriana",
    "class": "XI H",
    "gender": "P"
  },
  {
    "id": "S0418",
    "nisn": "00700000629",
    "name": "Bagas Pratama Purnomo",
    "class": "XI H",
    "gender": "L"
  },
  {
    "id": "S0415",
    "nisn": "00700000623",
    "name": "Danang Setiawan Rahman",
    "class": "XI H",
    "gender": "L"
  },
  {
    "id": "S0427",
    "nisn": "00700000624",
    "name": "Dina Fitriani Mulyani",
    "class": "XI H",
    "gender": "P"
  },
  {
    "id": "S0421",
    "nisn": "00700000612",
    "name": "Dina Wulandari Novitasari",
    "class": "XI H",
    "gender": "P"
  },
  {
    "id": "S0409",
    "nisn": "00700000611",
    "name": "Galih Akbar Kusuma",
    "class": "XI H",
    "gender": "L"
  },
  {
    "id": "S0419",
    "nisn": "00700000631",
    "name": "Galih Mahendra Pratama",
    "class": "XI H",
    "gender": "L"
  },
  {
    "id": "S0416",
    "nisn": "00700000625",
    "name": "Gilang Hakim Santoso",
    "class": "XI H",
    "gender": "L"
  },
  {
    "id": "S0422",
    "nisn": "00700000614",
    "name": "Hana Amalia Pratiwi",
    "class": "XI H",
    "gender": "P"
  },
  {
    "id": "S0428",
    "nisn": "00700000626",
    "name": "Hana Khaerunnisa Utami",
    "class": "XI H",
    "gender": "P"
  },
  {
    "id": "S0420",
    "nisn": "00700000633",
    "name": "Joko Kusuma Nugraha",
    "class": "XI H",
    "gender": "L"
  },
  {
    "id": "S0410",
    "nisn": "00700000613",
    "name": "Joko Santoso Saputra",
    "class": "XI H",
    "gender": "L"
  },
  {
    "id": "S0411",
    "nisn": "00700000615",
    "name": "Maulana Rizki Setiadi",
    "class": "XI H",
    "gender": "L"
  },
  {
    "id": "S0423",
    "nisn": "00700000616",
    "name": "Maya Anggraini Setianingsih",
    "class": "XI H",
    "gender": "P"
  },
  {
    "id": "S0429",
    "nisn": "00700000628",
    "name": "Maya Aulia Sulastri",
    "class": "XI H",
    "gender": "P"
  },
  {
    "id": "S0412",
    "nisn": "00700000617",
    "name": "Rafi Ardiansyah Wicaksono",
    "class": "XI H",
    "gender": "L"
  },
  {
    "id": "S0424",
    "nisn": "00700000618",
    "name": "Rina Khoirun Puspitasari",
    "class": "XI H",
    "gender": "P"
  },
  {
    "id": "S0430",
    "nisn": "00700000630",
    "name": "Rina Salsabila Handayani",
    "class": "XI H",
    "gender": "P"
  },
  {
    "id": "S0413",
    "nisn": "00700000619",
    "name": "Taufik Gunawan Hermawan",
    "class": "XI H",
    "gender": "L"
  },
  {
    "id": "S0431",
    "nisn": "00700000632",
    "name": "Vina Dewanti Wulandari",
    "class": "XI H",
    "gender": "P"
  },
  {
    "id": "S0425",
    "nisn": "00700000620",
    "name": "Vina Lestari Kusumawardani",
    "class": "XI H",
    "gender": "P"
  },
  {
    "id": "S0414",
    "nisn": "00700000621",
    "name": "Zackya Prasetya Pamungkas",
    "class": "XI H",
    "gender": "L"
  },
  {
    "id": "S0436",
    "nisn": "00700000647",
    "name": "Alif Hidayat Pratama",
    "class": "XI I",
    "gender": "L"
  },
  {
    "id": "S0455",
    "nisn": "00700000662",
    "name": "Bella Khoirun Rahmawati",
    "class": "XI I",
    "gender": "P"
  },
  {
    "id": "S0449",
    "nisn": "00700000650",
    "name": "Bella Rahma Lestari",
    "class": "XI I",
    "gender": "P"
  },
  {
    "id": "S0440",
    "nisn": "00700000655",
    "name": "Dimas Firmansyah Hidayatullah",
    "class": "XI I",
    "gender": "L"
  },
  {
    "id": "S0437",
    "nisn": "00700000649",
    "name": "Eko Nugroho Nugraha",
    "class": "XI I",
    "gender": "L"
  },
  {
    "id": "S0450",
    "nisn": "00700000652",
    "name": "Fatimah Az-Zahra Widyaningrum",
    "class": "XI I",
    "gender": "P"
  },
  {
    "id": "S0456",
    "nisn": "00700000664",
    "name": "Fatimah Lestari Novitasari",
    "class": "XI I",
    "gender": "P"
  },
  {
    "id": "S0441",
    "nisn": "00700000657",
    "name": "Hafizh Nur Mustofa",
    "class": "XI I",
    "gender": "L"
  },
  {
    "id": "S0438",
    "nisn": "00700000651",
    "name": "Hendro Fauzi Utomo",
    "class": "XI I",
    "gender": "L"
  },
  {
    "id": "S0451",
    "nisn": "00700000654",
    "name": "Intan Nur Sari",
    "class": "XI I",
    "gender": "P"
  },
  {
    "id": "S0445",
    "nisn": "00700000642",
    "name": "Intan Permatasari Handayani",
    "class": "XI I",
    "gender": "P"
  },
  {
    "id": "S0442",
    "nisn": "00700000659",
    "name": "Kevin Akbar Pramono",
    "class": "XI I",
    "gender": "L"
  },
  {
    "id": "S0439",
    "nisn": "00700000653",
    "name": "Muhammad Ramadhan Sulistyo",
    "class": "XI I",
    "gender": "L"
  },
  {
    "id": "S0433",
    "nisn": "00700000641",
    "name": "Naufal Kusuma Santoso",
    "class": "XI I",
    "gender": "L"
  },
  {
    "id": "S0443",
    "nisn": "00700000661",
    "name": "Naufal Santoso Suryanto",
    "class": "XI I",
    "gender": "L"
  },
  {
    "id": "S0446",
    "nisn": "00700000644",
    "name": "Nurul Safitri Wulandari",
    "class": "XI I",
    "gender": "P"
  },
  {
    "id": "S0452",
    "nisn": "00700000656",
    "name": "Nurul Wulandari Anggraini",
    "class": "XI I",
    "gender": "P"
  },
  {
    "id": "S0444",
    "nisn": "00700000663",
    "name": "Rizky Rizki Wijaya",
    "class": "XI I",
    "gender": "L"
  },
  {
    "id": "S0434",
    "nisn": "00700000643",
    "name": "Rizky Wibowo Triyono",
    "class": "XI I",
    "gender": "L"
  },
  {
    "id": "S0453",
    "nisn": "00700000658",
    "name": "Siti Amalia Ramadhani",
    "class": "XI I",
    "gender": "P"
  },
  {
    "id": "S0447",
    "nisn": "00700000646",
    "name": "Siti Kusuma Kurniasari",
    "class": "XI I",
    "gender": "P"
  },
  {
    "id": "S0435",
    "nisn": "00700000645",
    "name": "Wahyu Putra Purnomo",
    "class": "XI I",
    "gender": "L"
  },
  {
    "id": "S0454",
    "nisn": "00700000660",
    "name": "Yuliana Anggraini Safitri",
    "class": "XI I",
    "gender": "P"
  },
  {
    "id": "S0448",
    "nisn": "00700000648",
    "name": "Yuliana Hidayati Susanti",
    "class": "XI I",
    "gender": "P"
  },
  {
    "id": "S0461",
    "nisn": "00700000679",
    "name": "Aditya Setiawan Wijaya",
    "class": "XI J",
    "gender": "L"
  },
  {
    "id": "S0471",
    "nisn": "00700000676",
    "name": "Aisyah Aulia Novitasari",
    "class": "XI J",
    "gender": "P"
  },
  {
    "id": "S0477",
    "nisn": "00700000688",
    "name": "Aisyah Safitri Mulyani",
    "class": "XI J",
    "gender": "P"
  },
  {
    "id": "S0458",
    "nisn": "00700000673",
    "name": "Bayu Ardiansyah Mustofa",
    "class": "XI J",
    "gender": "L"
  },
  {
    "id": "S0468",
    "nisn": "00700000693",
    "name": "Bayu Putra Pamungkas",
    "class": "XI J",
    "gender": "L"
  },
  {
    "id": "S0478",
    "nisn": "00700000690",
    "name": "Dewi Kusuma Utami",
    "class": "XI J",
    "gender": "P"
  },
  {
    "id": "S0472",
    "nisn": "00700000678",
    "name": "Dewi Salsabila Pratiwi",
    "class": "XI J",
    "gender": "P"
  },
  {
    "id": "S0462",
    "nisn": "00700000681",
    "name": "Fajar Hakim Kurniawan",
    "class": "XI J",
    "gender": "L"
  },
  {
    "id": "S0459",
    "nisn": "00700000675",
    "name": "Farhan Gunawan Pramono",
    "class": "XI J",
    "gender": "L"
  },
  {
    "id": "S0473",
    "nisn": "00700000680",
    "name": "Gita Dewanti Setianingsih",
    "class": "XI J",
    "gender": "P"
  },
  {
    "id": "S0479",
    "nisn": "00700000692",
    "name": "Gita Hidayati Sulastri",
    "class": "XI J",
    "gender": "P"
  },
  {
    "id": "S0463",
    "nisn": "00700000683",
    "name": "Ilham Saputra Kusuma",
    "class": "XI J",
    "gender": "L"
  },
  {
    "id": "S0460",
    "nisn": "00700000677",
    "name": "Irfan Prasetya Suryanto",
    "class": "XI J",
    "gender": "L"
  },
  {
    "id": "S0474",
    "nisn": "00700000682",
    "name": "Laila Maharani Puspitasari",
    "class": "XI J",
    "gender": "P"
  },
  {
    "id": "S0480",
    "nisn": "00700000694",
    "name": "Laila Rahma Handayani",
    "class": "XI J",
    "gender": "P"
  },
  {
    "id": "S0464",
    "nisn": "00700000685",
    "name": "Lukman Pratama Saputra",
    "class": "XI J",
    "gender": "L"
  },
  {
    "id": "S0465",
    "nisn": "00700000687",
    "name": "Pratama Mahendra Setiadi",
    "class": "XI J",
    "gender": "L"
  },
  {
    "id": "S0469",
    "nisn": "00700000672",
    "name": "Rani Fitriani Safitri",
    "class": "XI J",
    "gender": "P"
  },
  {
    "id": "S0475",
    "nisn": "00700000684",
    "name": "Rani Syahputri Kusumawardani",
    "class": "XI J",
    "gender": "P"
  },
  {
    "id": "S0466",
    "nisn": "00700000689",
    "name": "Syahrul Kusuma Wicaksono",
    "class": "XI J",
    "gender": "L"
  },
  {
    "id": "S0470",
    "nisn": "00700000674",
    "name": "Ulfa Khaerunnisa Rahmawati",
    "class": "XI J",
    "gender": "P"
  },
  {
    "id": "S0476",
    "nisn": "00700000686",
    "name": "Ulfa Permatasari Febriana",
    "class": "XI J",
    "gender": "P"
  },
  {
    "id": "S0457",
    "nisn": "00700000671",
    "name": "Yusuf Rizki Hidayatullah",
    "class": "XI J",
    "gender": "L"
  },
  {
    "id": "S0467",
    "nisn": "00700000691",
    "name": "Yusuf Wibowo Hermawan",
    "class": "XI J",
    "gender": "L"
  },
  {
    "id": "S0492",
    "nisn": "00600000723",
    "name": "Ahmad Gunawan Utomo",
    "class": "XII A",
    "gender": "L"
  },
  {
    "id": "S0482",
    "nisn": "00600000703",
    "name": "Ahmad Hidayat Setiadi",
    "class": "XII A",
    "gender": "L"
  },
  {
    "id": "S0500",
    "nisn": "00600000716",
    "name": "Annisa Fitriani Widyaningrum",
    "class": "XII A",
    "gender": "P"
  },
  {
    "id": "S0494",
    "nisn": "00600000704",
    "name": "Annisa Wulandari Sulastri",
    "class": "XII A",
    "gender": "P"
  },
  {
    "id": "S0483",
    "nisn": "00600000705",
    "name": "Bagas Nugroho Wicaksono",
    "class": "XII A",
    "gender": "L"
  },
  {
    "id": "S0490",
    "nisn": "00600000719",
    "name": "Danang Rizki Pratama",
    "class": "XII A",
    "gender": "L"
  },
  {
    "id": "S0495",
    "nisn": "00600000706",
    "name": "Erna Amalia Handayani",
    "class": "XII A",
    "gender": "P"
  },
  {
    "id": "S0501",
    "nisn": "00600000718",
    "name": "Erna Khaerunnisa Sari",
    "class": "XII A",
    "gender": "P"
  },
  {
    "id": "S0484",
    "nisn": "00600000707",
    "name": "Galih Fauzi Hermawan",
    "class": "XII A",
    "gender": "L"
  },
  {
    "id": "S0491",
    "nisn": "00600000721",
    "name": "Gilang Ardiansyah Nugraha",
    "class": "XII A",
    "gender": "L"
  },
  {
    "id": "S0481",
    "nisn": "00600000701",
    "name": "Gilang Putra Saputra",
    "class": "XII A",
    "gender": "L"
  },
  {
    "id": "S0496",
    "nisn": "00600000708",
    "name": "Indah Anggraini Wulandari",
    "class": "XII A",
    "gender": "P"
  },
  {
    "id": "S0502",
    "nisn": "00600000720",
    "name": "Indah Aulia Anggraini",
    "class": "XII A",
    "gender": "P"
  },
  {
    "id": "S0485",
    "nisn": "00600000709",
    "name": "Joko Ramadhan Pamungkas",
    "class": "XII A",
    "gender": "L"
  },
  {
    "id": "S0486",
    "nisn": "00600000711",
    "name": "Maulana Firmansyah Rahman",
    "class": "XII A",
    "gender": "L"
  },
  {
    "id": "S0497",
    "nisn": "00600000710",
    "name": "Nabila Khoirun Kurniasari",
    "class": "XII A",
    "gender": "P"
  },
  {
    "id": "S0503",
    "nisn": "00600000722",
    "name": "Nabila Salsabila Ramadhani",
    "class": "XII A",
    "gender": "P"
  },
  {
    "id": "S0487",
    "nisn": "00600000713",
    "name": "Rafi Nur Santoso",
    "class": "XII A",
    "gender": "L"
  },
  {
    "id": "S0504",
    "nisn": "00600000724",
    "name": "Salma Dewanti Safitri",
    "class": "XII A",
    "gender": "P"
  },
  {
    "id": "S0498",
    "nisn": "00600000712",
    "name": "Salma Lestari Susanti",
    "class": "XII A",
    "gender": "P"
  },
  {
    "id": "S0488",
    "nisn": "00600000715",
    "name": "Taufik Akbar Triyono",
    "class": "XII A",
    "gender": "L"
  },
  {
    "id": "S0493",
    "nisn": "00600000702",
    "name": "Wulan Nur Utami",
    "class": "XII A",
    "gender": "P"
  },
  {
    "id": "S0499",
    "nisn": "00600000714",
    "name": "Wulan Rahmatika Lestari",
    "class": "XII A",
    "gender": "P"
  },
  {
    "id": "S0489",
    "nisn": "00600000717",
    "name": "Zackya Santoso Purnomo",
    "class": "XII A",
    "gender": "L"
  },
  {
    "id": "S0511",
    "nisn": "00600000743",
    "name": "Alif Mahendra Hidayatullah",
    "class": "XII B",
    "gender": "L"
  },
  {
    "id": "S0523",
    "nisn": "00600000744",
    "name": "Citra Az-Zahra Setianingsih",
    "class": "XII B",
    "gender": "P"
  },
  {
    "id": "S0517",
    "nisn": "00600000732",
    "name": "Citra Syahputri Anggraini",
    "class": "XII B",
    "gender": "P"
  },
  {
    "id": "S0505",
    "nisn": "00600000731",
    "name": "Dimas Gunawan Triyono",
    "class": "XII B",
    "gender": "L"
  },
  {
    "id": "S0515",
    "nisn": "00600000751",
    "name": "Dimas Hidayat Wijaya",
    "class": "XII B",
    "gender": "L"
  },
  {
    "id": "S0512",
    "nisn": "00600000745",
    "name": "Eko Kusuma Mustofa",
    "class": "XII B",
    "gender": "L"
  },
  {
    "id": "S0524",
    "nisn": "00600000746",
    "name": "Fitri Nur Puspitasari",
    "class": "XII B",
    "gender": "P"
  },
  {
    "id": "S0518",
    "nisn": "00600000734",
    "name": "Fitri Permatasari Ramadhani",
    "class": "XII B",
    "gender": "P"
  },
  {
    "id": "S0516",
    "nisn": "00600000753",
    "name": "Hafizh Nugroho Kurniawan",
    "class": "XII B",
    "gender": "L"
  },
  {
    "id": "S0506",
    "nisn": "00600000733",
    "name": "Hafizh Prasetya Purnomo",
    "class": "XII B",
    "gender": "L"
  },
  {
    "id": "S0513",
    "nisn": "00600000747",
    "name": "Hendro Wibowo Pramono",
    "class": "XII B",
    "gender": "L"
  },
  {
    "id": "S0519",
    "nisn": "00600000736",
    "name": "Kartika Safitri Safitri",
    "class": "XII B",
    "gender": "P"
  },
  {
    "id": "S0525",
    "nisn": "00600000748",
    "name": "Kartika Wulandari Kusumawardani",
    "class": "XII B",
    "gender": "P"
  },
  {
    "id": "S0507",
    "nisn": "00600000735",
    "name": "Kevin Setiawan Pratama",
    "class": "XII B",
    "gender": "L"
  },
  {
    "id": "S0514",
    "nisn": "00600000749",
    "name": "Muhammad Putra Suryanto",
    "class": "XII B",
    "gender": "L"
  },
  {
    "id": "S0508",
    "nisn": "00600000737",
    "name": "Naufal Hakim Nugraha",
    "class": "XII B",
    "gender": "L"
  },
  {
    "id": "S0526",
    "nisn": "00600000750",
    "name": "Putri Amalia Febriana",
    "class": "XII B",
    "gender": "P"
  },
  {
    "id": "S0520",
    "nisn": "00600000738",
    "name": "Putri Kusuma Rahmawati",
    "class": "XII B",
    "gender": "P"
  },
  {
    "id": "S0509",
    "nisn": "00600000739",
    "name": "Rizky Saputra Utomo",
    "class": "XII B",
    "gender": "L"
  },
  {
    "id": "S0527",
    "nisn": "00600000752",
    "name": "Tiara Anggraini Mulyani",
    "class": "XII B",
    "gender": "P"
  },
  {
    "id": "S0521",
    "nisn": "00600000740",
    "name": "Tiara Hidayati Novitasari",
    "class": "XII B",
    "gender": "P"
  },
  {
    "id": "S0510",
    "nisn": "00600000741",
    "name": "Wahyu Pratama Sulistyo",
    "class": "XII B",
    "gender": "L"
  },
  {
    "id": "S0528",
    "nisn": "00600000754",
    "name": "Zahra Khoirun Utami",
    "class": "XII B",
    "gender": "P"
  },
  {
    "id": "S0522",
    "nisn": "00600000742",
    "name": "Zahra Rahma Pratiwi",
    "class": "XII B",
    "gender": "P"
  },
  {
    "id": "S0536",
    "nisn": "00600000775",
    "name": "Aditya Rizki Setiadi",
    "class": "XII C",
    "gender": "L"
  },
  {
    "id": "S0551",
    "nisn": "00600000782",
    "name": "Anisa Kusuma Sari",
    "class": "XII C",
    "gender": "P"
  },
  {
    "id": "S0545",
    "nisn": "00600000770",
    "name": "Anisa Salsabila Handayani",
    "class": "XII C",
    "gender": "P"
  },
  {
    "id": "S0533",
    "nisn": "00600000769",
    "name": "Bayu Nur Kurniawan",
    "class": "XII C",
    "gender": "L"
  },
  {
    "id": "S0546",
    "nisn": "00600000772",
    "name": "Dina Dewanti Wulandari",
    "class": "XII C",
    "gender": "P"
  },
  {
    "id": "S0552",
    "nisn": "00600000784",
    "name": "Dina Hidayati Anggraini",
    "class": "XII C",
    "gender": "P"
  },
  {
    "id": "S0537",
    "nisn": "00600000777",
    "name": "Fajar Ardiansyah Wicaksono",
    "class": "XII C",
    "gender": "L"
  },
  {
    "id": "S0534",
    "nisn": "00600000771",
    "name": "Farhan Akbar Kusuma",
    "class": "XII C",
    "gender": "L"
  },
  {
    "id": "S0547",
    "nisn": "00600000774",
    "name": "Hana Maharani Kurniasari",
    "class": "XII C",
    "gender": "P"
  },
  {
    "id": "S0541",
    "nisn": "00600000762",
    "name": "Hana Rahmatika Febriana",
    "class": "XII C",
    "gender": "P"
  },
  {
    "id": "S0538",
    "nisn": "00600000779",
    "name": "Ilham Gunawan Hermawan",
    "class": "XII C",
    "gender": "L"
  },
  {
    "id": "S0535",
    "nisn": "00600000773",
    "name": "Irfan Santoso Saputra",
    "class": "XII C",
    "gender": "L"
  },
  {
    "id": "S0529",
    "nisn": "00600000761",
    "name": "Lukman Nugroho Mustofa",
    "class": "XII C",
    "gender": "L"
  },
  {
    "id": "S0539",
    "nisn": "00600000781",
    "name": "Lukman Prasetya Pamungkas",
    "class": "XII C",
    "gender": "L"
  },
  {
    "id": "S0542",
    "nisn": "00600000764",
    "name": "Maya Fitriani Mulyani",
    "class": "XII C",
    "gender": "P"
  },
  {
    "id": "S0548",
    "nisn": "00600000776",
    "name": "Maya Syahputri Susanti",
    "class": "XII C",
    "gender": "P"
  },
  {
    "id": "S0530",
    "nisn": "00600000763",
    "name": "Pratama Fauzi Pramono",
    "class": "XII C",
    "gender": "L"
  },
  {
    "id": "S0540",
    "nisn": "00600000783",
    "name": "Pratama Setiawan Rahman",
    "class": "XII C",
    "gender": "L"
  },
  {
    "id": "S0543",
    "nisn": "00600000766",
    "name": "Rina Khaerunnisa Utami",
    "class": "XII C",
    "gender": "P"
  },
  {
    "id": "S0549",
    "nisn": "00600000778",
    "name": "Rina Permatasari Lestari",
    "class": "XII C",
    "gender": "P"
  },
  {
    "id": "S0531",
    "nisn": "00600000765",
    "name": "Syahrul Ramadhan Suryanto",
    "class": "XII C",
    "gender": "L"
  },
  {
    "id": "S0544",
    "nisn": "00600000768",
    "name": "Vina Aulia Sulastri",
    "class": "XII C",
    "gender": "P"
  },
  {
    "id": "S0550",
    "nisn": "00600000780",
    "name": "Vina Safitri Widyaningrum",
    "class": "XII C",
    "gender": "P"
  },
  {
    "id": "S0532",
    "nisn": "00600000767",
    "name": "Yusuf Firmansyah Wijaya",
    "class": "XII C",
    "gender": "L"
  },
  {
    "id": "S0557",
    "nisn": "00600000799",
    "name": "Ahmad Mahendra Rahman",
    "class": "XII D",
    "gender": "L"
  },
  {
    "id": "S0558",
    "nisn": "00600000801",
    "name": "Bagas Kusuma Santoso",
    "class": "XII D",
    "gender": "L"
  },
  {
    "id": "S0568",
    "nisn": "00600000798",
    "name": "Bella Amalia Ramadhani",
    "class": "XII D",
    "gender": "P"
  },
  {
    "id": "S0574",
    "nisn": "00600000810",
    "name": "Bella Khaerunnisa Puspitasari",
    "class": "XII D",
    "gender": "P"
  },
  {
    "id": "S0555",
    "nisn": "00600000795",
    "name": "Danang Saputra Hermawan",
    "class": "XII D",
    "gender": "L"
  },
  {
    "id": "S0569",
    "nisn": "00600000800",
    "name": "Fatimah Anggraini Safitri",
    "class": "XII D",
    "gender": "P"
  },
  {
    "id": "S0575",
    "nisn": "00600000812",
    "name": "Fatimah Aulia Kusumawardani",
    "class": "XII D",
    "gender": "P"
  },
  {
    "id": "S0559",
    "nisn": "00600000803",
    "name": "Galih Wibowo Triyono",
    "class": "XII D",
    "gender": "L"
  },
  {
    "id": "S0556",
    "nisn": "00600000797",
    "name": "Gilang Pratama Pamungkas",
    "class": "XII D",
    "gender": "L"
  },
  {
    "id": "S0570",
    "nisn": "00600000802",
    "name": "Intan Khoirun Rahmawati",
    "class": "XII D",
    "gender": "P"
  },
  {
    "id": "S0576",
    "nisn": "00600000814",
    "name": "Intan Salsabila Febriana",
    "class": "XII D",
    "gender": "P"
  },
  {
    "id": "S0560",
    "nisn": "00600000805",
    "name": "Joko Putra Purnomo",
    "class": "XII D",
    "gender": "L"
  },
  {
    "id": "S0561",
    "nisn": "00600000807",
    "name": "Maulana Hidayat Pratama",
    "class": "XII D",
    "gender": "L"
  },
  {
    "id": "S0565",
    "nisn": "00600000792",
    "name": "Nurul Az-Zahra Widyaningrum",
    "class": "XII D",
    "gender": "P"
  },
  {
    "id": "S0571",
    "nisn": "00600000804",
    "name": "Nurul Lestari Novitasari",
    "class": "XII D",
    "gender": "P"
  },
  {
    "id": "S0562",
    "nisn": "00600000809",
    "name": "Rafi Nugroho Nugraha",
    "class": "XII D",
    "gender": "L"
  },
  {
    "id": "S0566",
    "nisn": "00600000794",
    "name": "Siti Nur Sari",
    "class": "XII D",
    "gender": "P"
  },
  {
    "id": "S0572",
    "nisn": "00600000806",
    "name": "Siti Rahmatika Pratiwi",
    "class": "XII D",
    "gender": "P"
  },
  {
    "id": "S0563",
    "nisn": "00600000811",
    "name": "Taufik Fauzi Utomo",
    "class": "XII D",
    "gender": "L"
  },
  {
    "id": "S0553",
    "nisn": "00600000791",
    "name": "Taufik Setiawan Setiadi",
    "class": "XII D",
    "gender": "L"
  },
  {
    "id": "S0573",
    "nisn": "00600000808",
    "name": "Yuliana Fitriani Setianingsih",
    "class": "XII D",
    "gender": "P"
  },
  {
    "id": "S0567",
    "nisn": "00600000796",
    "name": "Yuliana Wulandari Anggraini",
    "class": "XII D",
    "gender": "P"
  },
  {
    "id": "S0554",
    "nisn": "00600000793",
    "name": "Zackya Hakim Wicaksono",
    "class": "XII D",
    "gender": "L"
  },
  {
    "id": "S0564",
    "nisn": "00600000813",
    "name": "Zackya Ramadhan Sulistyo",
    "class": "XII D",
    "gender": "L"
  },
  {
    "id": "S0596",
    "nisn": "00600000836",
    "name": "Aisyah Az-Zahra Wulandari",
    "class": "XII E",
    "gender": "P"
  },
  {
    "id": "S0590",
    "nisn": "00600000824",
    "name": "Aisyah Syahputri Kusumawardani",
    "class": "XII E",
    "gender": "P"
  },
  {
    "id": "S0586",
    "nisn": "00600000839",
    "name": "Alif Setiawan Wijaya",
    "class": "XII E",
    "gender": "L"
  },
  {
    "id": "S0597",
    "nisn": "00600000838",
    "name": "Dewi Nur Kurniasari",
    "class": "XII E",
    "gender": "P"
  },
  {
    "id": "S0591",
    "nisn": "00600000826",
    "name": "Dewi Permatasari Febriana",
    "class": "XII E",
    "gender": "P"
  },
  {
    "id": "S0580",
    "nisn": "00600000827",
    "name": "Dimas Akbar Utomo",
    "class": "XII E",
    "gender": "L"
  },
  {
    "id": "S0587",
    "nisn": "00600000841",
    "name": "Eko Hakim Kurniawan",
    "class": "XII E",
    "gender": "L"
  },
  {
    "id": "S0577",
    "nisn": "00600000821",
    "name": "Eko Ramadhan Purnomo",
    "class": "XII E",
    "gender": "L"
  },
  {
    "id": "S0592",
    "nisn": "00600000828",
    "name": "Gita Safitri Mulyani",
    "class": "XII E",
    "gender": "P"
  },
  {
    "id": "S0598",
    "nisn": "00600000840",
    "name": "Gita Wulandari Susanti",
    "class": "XII E",
    "gender": "P"
  },
  {
    "id": "S0581",
    "nisn": "00600000829",
    "name": "Hafizh Santoso Sulistyo",
    "class": "XII E",
    "gender": "L"
  },
  {
    "id": "S0578",
    "nisn": "00600000823",
    "name": "Hendro Firmansyah Pratama",
    "class": "XII E",
    "gender": "L"
  },
  {
    "id": "S0588",
    "nisn": "00600000843",
    "name": "Hendro Saputra Kusuma",
    "class": "XII E",
    "gender": "L"
  },
  {
    "id": "S0582",
    "nisn": "00600000831",
    "name": "Kevin Rizki Hidayatullah",
    "class": "XII E",
    "gender": "L"
  },
  {
    "id": "S0599",
    "nisn": "00600000842",
    "name": "Laila Amalia Lestari",
    "class": "XII E",
    "gender": "P"
  },
  {
    "id": "S0593",
    "nisn": "00600000830",
    "name": "Laila Kusuma Utami",
    "class": "XII E",
    "gender": "P"
  },
  {
    "id": "S0579",
    "nisn": "00600000825",
    "name": "Muhammad Nur Nugraha",
    "class": "XII E",
    "gender": "L"
  },
  {
    "id": "S0583",
    "nisn": "00600000833",
    "name": "Naufal Ardiansyah Mustofa",
    "class": "XII E",
    "gender": "L"
  },
  {
    "id": "S0600",
    "nisn": "00600000844",
    "name": "Rani Anggraini Widyaningrum",
    "class": "XII E",
    "gender": "P"
  },
  {
    "id": "S0594",
    "nisn": "00600000832",
    "name": "Rani Hidayati Sulastri",
    "class": "XII E",
    "gender": "P"
  },
  {
    "id": "S0584",
    "nisn": "00600000835",
    "name": "Rizky Gunawan Pramono",
    "class": "XII E",
    "gender": "L"
  },
  {
    "id": "S0589",
    "nisn": "00600000822",
    "name": "Ulfa Maharani Puspitasari",
    "class": "XII E",
    "gender": "P"
  },
  {
    "id": "S0595",
    "nisn": "00600000834",
    "name": "Ulfa Rahma Handayani",
    "class": "XII E",
    "gender": "P"
  },
  {
    "id": "S0585",
    "nisn": "00600000837",
    "name": "Wahyu Prasetya Suryanto",
    "class": "XII E",
    "gender": "L"
  },
  {
    "id": "S0611",
    "nisn": "00600000871",
    "name": "Aditya Firmansyah Rahman",
    "class": "XII F",
    "gender": "L"
  },
  {
    "id": "S0601",
    "nisn": "00600000851",
    "name": "Aditya Saputra Pramono",
    "class": "XII F",
    "gender": "L"
  },
  {
    "id": "S0619",
    "nisn": "00600000864",
    "name": "Annisa Dewanti Safitri",
    "class": "XII F",
    "gender": "P"
  },
  {
    "id": "S0613",
    "nisn": "00600000852",
    "name": "Annisa Lestari Susanti",
    "class": "XII F",
    "gender": "P"
  },
  {
    "id": "S0608",
    "nisn": "00600000865",
    "name": "Bayu Nugroho Wicaksono",
    "class": "XII F",
    "gender": "L"
  },
  {
    "id": "S0620",
    "nisn": "00600000866",
    "name": "Erna Maharani Rahmawati",
    "class": "XII F",
    "gender": "P"
  },
  {
    "id": "S0614",
    "nisn": "00600000854",
    "name": "Erna Rahmatika Lestari",
    "class": "XII F",
    "gender": "P"
  },
  {
    "id": "S0612",
    "nisn": "00600000873",
    "name": "Fajar Nur Santoso",
    "class": "XII F",
    "gender": "L"
  },
  {
    "id": "S0602",
    "nisn": "00600000853",
    "name": "Fajar Pratama Suryanto",
    "class": "XII F",
    "gender": "L"
  },
  {
    "id": "S0609",
    "nisn": "00600000867",
    "name": "Farhan Fauzi Hermawan",
    "class": "XII F",
    "gender": "L"
  },
  {
    "id": "S0603",
    "nisn": "00600000855",
    "name": "Ilham Mahendra Wijaya",
    "class": "XII F",
    "gender": "L"
  },
  {
    "id": "S0615",
    "nisn": "00600000856",
    "name": "Indah Fitriani Widyaningrum",
    "class": "XII F",
    "gender": "P"
  },
  {
    "id": "S0621",
    "nisn": "00600000868",
    "name": "Indah Syahputri Novitasari",
    "class": "XII F",
    "gender": "P"
  },
  {
    "id": "S0610",
    "nisn": "00600000869",
    "name": "Irfan Ramadhan Pamungkas",
    "class": "XII F",
    "gender": "L"
  },
  {
    "id": "S0604",
    "nisn": "00600000857",
    "name": "Lukman Kusuma Kurniawan",
    "class": "XII F",
    "gender": "L"
  },
  {
    "id": "S0616",
    "nisn": "00600000858",
    "name": "Nabila Khaerunnisa Sari",
    "class": "XII F",
    "gender": "P"
  },
  {
    "id": "S0622",
    "nisn": "00600000870",
    "name": "Nabila Permatasari Pratiwi",
    "class": "XII F",
    "gender": "P"
  },
  {
    "id": "S0605",
    "nisn": "00600000859",
    "name": "Pratama Wibowo Kusuma",
    "class": "XII F",
    "gender": "L"
  },
  {
    "id": "S0617",
    "nisn": "00600000860",
    "name": "Salma Aulia Anggraini",
    "class": "XII F",
    "gender": "P"
  },
  {
    "id": "S0623",
    "nisn": "00600000872",
    "name": "Salma Safitri Setianingsih",
    "class": "XII F",
    "gender": "P"
  },
  {
    "id": "S0606",
    "nisn": "00600000861",
    "name": "Syahrul Putra Saputra",
    "class": "XII F",
    "gender": "L"
  },
  {
    "id": "S0624",
    "nisn": "00600000874",
    "name": "Wulan Kusuma Puspitasari",
    "class": "XII F",
    "gender": "P"
  },
  {
    "id": "S0618",
    "nisn": "00600000862",
    "name": "Wulan Salsabila Ramadhani",
    "class": "XII F",
    "gender": "P"
  },
  {
    "id": "S0607",
    "nisn": "00600000863",
    "name": "Yusuf Hidayat Setiadi",
    "class": "XII F",
    "gender": "L"
  },
  {
    "id": "S0632",
    "nisn": "00600000895",
    "name": "Ahmad Setiawan Pratama",
    "class": "XII G",
    "gender": "L"
  },
  {
    "id": "S0633",
    "nisn": "00600000897",
    "name": "Bagas Hakim Nugraha",
    "class": "XII G",
    "gender": "L"
  },
  {
    "id": "S0642",
    "nisn": "00600000892",
    "name": "Citra Anggraini Mulyani",
    "class": "XII G",
    "gender": "P"
  },
  {
    "id": "S0648",
    "nisn": "00600000904",
    "name": "Citra Aulia Susanti",
    "class": "XII G",
    "gender": "P"
  },
  {
    "id": "S0630",
    "nisn": "00600000891",
    "name": "Danang Gunawan Triyono",
    "class": "XII G",
    "gender": "L"
  },
  {
    "id": "S0643",
    "nisn": "00600000894",
    "name": "Fitri Khoirun Utami",
    "class": "XII G",
    "gender": "P"
  },
  {
    "id": "S0637",
    "nisn": "00600000882",
    "name": "Fitri Rahma Pratiwi",
    "class": "XII G",
    "gender": "P"
  },
  {
    "id": "S0634",
    "nisn": "00600000899",
    "name": "Galih Saputra Utomo",
    "class": "XII G",
    "gender": "L"
  },
  {
    "id": "S0631",
    "nisn": "00600000893",
    "name": "Gilang Prasetya Purnomo",
    "class": "XII G",
    "gender": "L"
  },
  {
    "id": "S0625",
    "nisn": "00600000881",
    "name": "Joko Nur Wicaksono",
    "class": "XII G",
    "gender": "L"
  },
  {
    "id": "S0635",
    "nisn": "00600000901",
    "name": "Joko Pratama Sulistyo",
    "class": "XII G",
    "gender": "L"
  },
  {
    "id": "S0638",
    "nisn": "00600000884",
    "name": "Kartika Az-Zahra Setianingsih",
    "class": "XII G",
    "gender": "P"
  },
  {
    "id": "S0644",
    "nisn": "00600000896",
    "name": "Kartika Lestari Sulastri",
    "class": "XII G",
    "gender": "P"
  },
  {
    "id": "S0626",
    "nisn": "00600000883",
    "name": "Maulana Akbar Hermawan",
    "class": "XII G",
    "gender": "L"
  },
  {
    "id": "S0636",
    "nisn": "00600000903",
    "name": "Maulana Mahendra Hidayatullah",
    "class": "XII G",
    "gender": "L"
  },
  {
    "id": "S0639",
    "nisn": "00600000886",
    "name": "Putri Nur Puspitasari",
    "class": "XII G",
    "gender": "P"
  },
  {
    "id": "S0645",
    "nisn": "00600000898",
    "name": "Putri Rahmatika Handayani",
    "class": "XII G",
    "gender": "P"
  },
  {
    "id": "S0627",
    "nisn": "00600000885",
    "name": "Rafi Santoso Pamungkas",
    "class": "XII G",
    "gender": "L"
  },
  {
    "id": "S0628",
    "nisn": "00600000887",
    "name": "Taufik Rizki Rahman",
    "class": "XII G",
    "gender": "L"
  },
  {
    "id": "S0646",
    "nisn": "00600000900",
    "name": "Tiara Fitriani Wulandari",
    "class": "XII G",
    "gender": "P"
  },
  {
    "id": "S0640",
    "nisn": "00600000888",
    "name": "Tiara Wulandari Kusumawardani",
    "class": "XII G",
    "gender": "P"
  },
  {
    "id": "S0629",
    "nisn": "00600000889",
    "name": "Zackya Ardiansyah Santoso",
    "class": "XII G",
    "gender": "L"
  },
  {
    "id": "S0641",
    "nisn": "00600000890",
    "name": "Zahra Amalia Febriana",
    "class": "XII G",
    "gender": "P"
  },
  {
    "id": "S0647",
    "nisn": "00600000902",
    "name": "Zahra Khaerunnisa Kurniasari",
    "class": "XII G",
    "gender": "P"
  },
  {
    "id": "S0651",
    "nisn": "00600000915",
    "name": "Alif Wibowo Utomo",
    "class": "XII H",
    "gender": "L"
  },
  {
    "id": "S0670",
    "nisn": "00600000930",
    "name": "Anisa Nur Rahmawati",
    "class": "XII H",
    "gender": "P"
  },
  {
    "id": "S0664",
    "nisn": "00600000918",
    "name": "Anisa Permatasari Lestari",
    "class": "XII H",
    "gender": "P"
  },
  {
    "id": "S0655",
    "nisn": "00600000923",
    "name": "Dimas Fauzi Pramono",
    "class": "XII H",
    "gender": "L"
  },
  {
    "id": "S0665",
    "nisn": "00600000920",
    "name": "Dina Safitri Widyaningrum",
    "class": "XII H",
    "gender": "P"
  },
  {
    "id": "S0671",
    "nisn": "00600000932",
    "name": "Dina Wulandari Novitasari",
    "class": "XII H",
    "gender": "P"
  },
  {
    "id": "S0652",
    "nisn": "00600000917",
    "name": "Eko Putra Sulistyo",
    "class": "XII H",
    "gender": "L"
  },
  {
    "id": "S0656",
    "nisn": "00600000925",
    "name": "Hafizh Ramadhan Suryanto",
    "class": "XII H",
    "gender": "L"
  },
  {
    "id": "S0672",
    "nisn": "00600000934",
    "name": "Hana Amalia Pratiwi",
    "class": "XII H",
    "gender": "P"
  },
  {
    "id": "S0666",
    "nisn": "00600000922",
    "name": "Hana Kusuma Sari",
    "class": "XII H",
    "gender": "P"
  },
  {
    "id": "S0653",
    "nisn": "00600000919",
    "name": "Hendro Hidayat Hidayatullah",
    "class": "XII H",
    "gender": "L"
  },
  {
    "id": "S0657",
    "nisn": "00600000927",
    "name": "Kevin Firmansyah Wijaya",
    "class": "XII H",
    "gender": "L"
  },
  {
    "id": "S0661",
    "nisn": "00600000912",
    "name": "Maya Dewanti Wulandari",
    "class": "XII H",
    "gender": "P"
  },
  {
    "id": "S0667",
    "nisn": "00600000924",
    "name": "Maya Hidayati Anggraini",
    "class": "XII H",
    "gender": "P"
  },
  {
    "id": "S0654",
    "nisn": "00600000921",
    "name": "Muhammad Nugroho Mustofa",
    "class": "XII H",
    "gender": "L"
  },
  {
    "id": "S0658",
    "nisn": "00600000929",
    "name": "Naufal Nur Kurniawan",
    "class": "XII H",
    "gender": "L"
  },
  {
    "id": "S0662",
    "nisn": "00600000914",
    "name": "Rina Maharani Kurniasari",
    "class": "XII H",
    "gender": "P"
  },
  {
    "id": "S0668",
    "nisn": "00600000926",
    "name": "Rina Rahma Ramadhani",
    "class": "XII H",
    "gender": "P"
  },
  {
    "id": "S0659",
    "nisn": "00600000931",
    "name": "Rizky Akbar Kusuma",
    "class": "XII H",
    "gender": "L"
  },
  {
    "id": "S0649",
    "nisn": "00600000911",
    "name": "Rizky Mahendra Pratama",
    "class": "XII H",
    "gender": "L"
  },
  {
    "id": "S0669",
    "nisn": "00600000928",
    "name": "Vina Az-Zahra Safitri",
    "class": "XII H",
    "gender": "P"
  },
  {
    "id": "S0663",
    "nisn": "00600000916",
    "name": "Vina Syahputri Susanti",
    "class": "XII H",
    "gender": "P"
  },
  {
    "id": "S0650",
    "nisn": "00600000913",
    "name": "Wahyu Kusuma Nugraha",
    "class": "XII H",
    "gender": "L"
  },
  {
    "id": "S0660",
    "nisn": "00600000933",
    "name": "Wahyu Santoso Saputra",
    "class": "XII H",
    "gender": "L"
  },
  {
    "id": "S0676",
    "nisn": "00600000947",
    "name": "Aditya Gunawan Kusuma",
    "class": "XII I",
    "gender": "L"
  },
  {
    "id": "S0683",
    "nisn": "00600000961",
    "name": "Bayu Kusuma Santoso",
    "class": "XII I",
    "gender": "L"
  },
  {
    "id": "S0673",
    "nisn": "00600000941",
    "name": "Bayu Santoso Suryanto",
    "class": "XII I",
    "gender": "L"
  },
  {
    "id": "S0693",
    "nisn": "00600000958",
    "name": "Bella Maharani Utami",
    "class": "XII I",
    "gender": "P"
  },
  {
    "id": "S0687",
    "nisn": "00600000946",
    "name": "Bella Rahmatika Pratiwi",
    "class": "XII I",
    "gender": "P"
  },
  {
    "id": "S0677",
    "nisn": "00600000949",
    "name": "Fajar Prasetya Saputra",
    "class": "XII I",
    "gender": "L"
  },
  {
    "id": "S0674",
    "nisn": "00600000943",
    "name": "Farhan Rizki Wijaya",
    "class": "XII I",
    "gender": "L"
  },
  {
    "id": "S0684",
    "nisn": "00600000963",
    "name": "Farhan Wibowo Triyono",
    "class": "XII I",
    "gender": "L"
  },
  {
    "id": "S0688",
    "nisn": "00600000948",
    "name": "Fatimah Fitriani Setianingsih",
    "class": "XII I",
    "gender": "P"
  },
  {
    "id": "S0694",
    "nisn": "00600000960",
    "name": "Fatimah Syahputri Sulastri",
    "class": "XII I",
    "gender": "P"
  },
  {
    "id": "S0678",
    "nisn": "00600000951",
    "name": "Ilham Setiawan Setiadi",
    "class": "XII I",
    "gender": "L"
  },
  {
    "id": "S0689",
    "nisn": "00600000950",
    "name": "Intan Khaerunnisa Puspitasari",
    "class": "XII I",
    "gender": "P"
  },
  {
    "id": "S0695",
    "nisn": "00600000962",
    "name": "Intan Permatasari Handayani",
    "class": "XII I",
    "gender": "P"
  },
  {
    "id": "S0675",
    "nisn": "00600000945",
    "name": "Irfan Ardiansyah Kurniawan",
    "class": "XII I",
    "gender": "L"
  },
  {
    "id": "S0679",
    "nisn": "00600000953",
    "name": "Lukman Hakim Wicaksono",
    "class": "XII I",
    "gender": "L"
  },
  {
    "id": "S0690",
    "nisn": "00600000952",
    "name": "Nurul Aulia Kusumawardani",
    "class": "XII I",
    "gender": "P"
  },
  {
    "id": "S0696",
    "nisn": "00600000964",
    "name": "Nurul Safitri Wulandari",
    "class": "XII I",
    "gender": "P"
  },
  {
    "id": "S0680",
    "nisn": "00600000955",
    "name": "Pratama Saputra Hermawan",
    "class": "XII I",
    "gender": "L"
  },
  {
    "id": "S0685",
    "nisn": "00600000942",
    "name": "Siti Khoirun Rahmawati",
    "class": "XII I",
    "gender": "P"
  },
  {
    "id": "S0691",
    "nisn": "00600000954",
    "name": "Siti Salsabila Febriana",
    "class": "XII I",
    "gender": "P"
  },
  {
    "id": "S0681",
    "nisn": "00600000957",
    "name": "Syahrul Pratama Pamungkas",
    "class": "XII I",
    "gender": "L"
  },
  {
    "id": "S0692",
    "nisn": "00600000956",
    "name": "Yuliana Dewanti Mulyani",
    "class": "XII I",
    "gender": "P"
  },
  {
    "id": "S0686",
    "nisn": "00600000944",
    "name": "Yuliana Lestari Novitasari",
    "class": "XII I",
    "gender": "P"
  },
  {
    "id": "S0682",
    "nisn": "00600000959",
    "name": "Yusuf Mahendra Rahman",
    "class": "XII I",
    "gender": "L"
  },
  {
    "id": "S0707",
    "nisn": "00600000991",
    "name": "Ahmad Rizki Hidayatullah",
    "class": "XII J",
    "gender": "L"
  },
  {
    "id": "S0697",
    "nisn": "00600000971",
    "name": "Ahmad Wibowo Hermawan",
    "class": "XII J",
    "gender": "L"
  },
  {
    "id": "S0715",
    "nisn": "00600000984",
    "name": "Aisyah Anggraini Widyaningrum",
    "class": "XII J",
    "gender": "P"
  },
  {
    "id": "S0709",
    "nisn": "00600000972",
    "name": "Aisyah Hidayati Sulastri",
    "class": "XII J",
    "gender": "P"
  },
  {
    "id": "S0708",
    "nisn": "00600000993",
    "name": "Bagas Ardiansyah Mustofa",
    "class": "XII J",
    "gender": "L"
  },
  {
    "id": "S0698",
    "nisn": "00600000973",
    "name": "Bagas Putra Pamungkas",
    "class": "XII J",
    "gender": "L"
  },
  {
    "id": "S0705",
    "nisn": "00600000987",
    "name": "Danang Akbar Utomo",
    "class": "XII J",
    "gender": "L"
  },
  {
    "id": "S0716",
    "nisn": "00600000986",
    "name": "Dewi Khoirun Sari",
    "class": "XII J",
    "gender": "P"
  },
  {
    "id": "S0710",
    "nisn": "00600000974",
    "name": "Dewi Rahma Handayani",
    "class": "XII J",
    "gender": "P"
  },
  {
    "id": "S0699",
    "nisn": "00600000975",
    "name": "Galih Hidayat Rahman",
    "class": "XII J",
    "gender": "L"
  },
  {
    "id": "S0706",
    "nisn": "00600000989",
    "name": "Gilang Santoso Sulistyo",
    "class": "XII J",
    "gender": "L"
  },
  {
    "id": "S0711",
    "nisn": "00600000976",
    "name": "Gita Az-Zahra Wulandari",
    "class": "XII J",
    "gender": "P"
  },
  {
    "id": "S0717",
    "nisn": "00600000988",
    "name": "Gita Lestari Anggraini",
    "class": "XII J",
    "gender": "P"
  },
  {
    "id": "S0700",
    "nisn": "00600000977",
    "name": "Joko Nugroho Santoso",
    "class": "XII J",
    "gender": "L"
  },
  {
    "id": "S0712",
    "nisn": "00600000978",
    "name": "Laila Nur Kurniasari",
    "class": "XII J",
    "gender": "P"
  },
  {
    "id": "S0718",
    "nisn": "00600000990",
    "name": "Laila Rahmatika Ramadhani",
    "class": "XII J",
    "gender": "P"
  },
  {
    "id": "S0701",
    "nisn": "00600000979",
    "name": "Maulana Fauzi Triyono",
    "class": "XII J",
    "gender": "L"
  },
  {
    "id": "S0702",
    "nisn": "00600000981",
    "name": "Rafi Ramadhan Purnomo",
    "class": "XII J",
    "gender": "L"
  },
  {
    "id": "S0719",
    "nisn": "00600000992",
    "name": "Rani Fitriani Safitri",
    "class": "XII J",
    "gender": "P"
  },
  {
    "id": "S0713",
    "nisn": "00600000980",
    "name": "Rani Wulandari Susanti",
    "class": "XII J",
    "gender": "P"
  },
  {
    "id": "S0703",
    "nisn": "00600000983",
    "name": "Taufik Firmansyah Pratama",
    "class": "XII J",
    "gender": "L"
  },
  {
    "id": "S0714",
    "nisn": "00600000982",
    "name": "Ulfa Amalia Lestari",
    "class": "XII J",
    "gender": "P"
  },
  {
    "id": "S0720",
    "nisn": "00600000994",
    "name": "Ulfa Khaerunnisa Rahmawati",
    "class": "XII J",
    "gender": "P"
  },
  {
    "id": "S0704",
    "nisn": "00600000985",
    "name": "Zackya Nur Nugraha",
    "class": "XII J",
    "gender": "L"
  }
];

export const DEMO_ATTENDANCE_RECORDS: AttendanceRecord[] = [
  {
    id: 'rec-001',
    name: 'Ahmad Fauzi Kurniawan',
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
    name: 'Aisyah Aulia Rahmawati',
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
