export interface WiringPin {
  sensorPin: string;
  correctArduinoPin: string;
  label: string;
}

export interface SensorData {
  id: number;
  slug: string;
  title: string;
  subtitle: string;
  icon: string;
  teori: string;
  datasheet: string;
  troubleshooting: string;
  laporanIG: string;
  wiringPins: WiringPin[];
  rewardCode: string;
  neonColor: 'cyan' | 'green' | 'pink' | 'yellow' | 'orange' | 'teal';
}

export const ARDUINO_PINS = [
  '3.3V', '5V', 'GND', 'D2', 'D3', 'D4', 'D5', 'D6', 'D7', 'D8',
  'D9', 'D10', 'D11', 'D12', 'D13', 'A0', 'A1', 'A2', 'A3', 'A4', 'A5'
];

export const SENSORS: SensorData[] = [
  {
    id: 1,
    slug: 'dht11',
    title: 'DHT11',
    subtitle: 'Sensor Suhu & Kelembaban',
    icon: '🌡️',
    teori: 'Membaca kelembaban udara menggunakan kapasitor polimer dan mengukur suhu menggunakan thermistor NTC (Negative Temperature Coefficient).',
    datasheet: 'Tegangan: 3.3V - 5V | Output: Digital Single-bus | Rentang: 20-80% RH, 0-50°C',
    troubleshooting: 'Jika nilai terbaca NaN, pastikan resistor pull-up 10k terpasang di pin data, atau perhatikan jeda pembacaan minimal 2 detik (2000ms).',
    laporanIG: 'Fenomena fluktuasi suhu dan kelembaban ruangan yang tidak terpantau belum mampu menjelaskan inefisiensi sistem pendingin dalam konteks otomasi gedung, sehingga penelitian ini menguji respon termal lingkungan secara presisi. DHT11 mempengaruhi pembacaan sistem karena perubahan resistansi pada thermistor seiring perubahan suhu, hal ini didukung oleh prinsip dasar termodinamika. Metode dipilih karena metode ini mampu menjawab hubungan perubahan suhu fisik dan sinyal digital secara kalkulatif, menunjukkan ketepatan bukan kemudahan. Hasil menunjukkan DHT11 berpengaruh terhadap pembacaan mikrokontroler dengan keakuratan yang dapat memicu aktuator, yang berarti sistem merespons sesuai ambang batas, dan sejalan dengan hukum perpindahan panas.',
    wiringPins: [
      { sensorPin: 'VCC', correctArduinoPin: '5V', label: 'Power Supply' },
      { sensorPin: 'GND', correctArduinoPin: 'GND', label: 'Ground' },
      { sensorPin: 'DATA', correctArduinoPin: 'D2', label: 'Data Signal' },
    ],
    rewardCode: `#include <DHT.h>
#define DHTPIN 2
#define DHTTYPE DHT11

DHT dht(DHTPIN, DHTTYPE);

void setup() {
  Serial.begin(9600);
  dht.begin();
}

void loop() {
  delay(2000);
  float h = dht.readHumidity();
  float t = dht.readTemperature();

  if (isnan(h) || isnan(t)) {
    Serial.println("Gagal membaca DHT11!");
    return;
  }

  Serial.print("Kelembaban: ");
  Serial.print(h);
  Serial.print(" %  |  Suhu: ");
  Serial.print(t);
  Serial.println(" *C");
}`,
    neonColor: 'cyan',
  },
  {
    id: 2,
    slug: 'hcsr04',
    title: 'HC-SR04',
    subtitle: 'Sensor Ultrasonik',
    icon: '📡',
    teori: 'Menggunakan prinsip sonar. Transmitter memancarkan gelombang ultrasonik (40 kHz) dan Receiver menangkap pantulannya untuk menghitung jarak berdasarkan waktu tempuh suara.',
    datasheet: 'Tegangan: 5V | Output: Digital (Trig & Echo) | Jarak Deteksi: 2cm - 400cm',
    troubleshooting: 'Jika jarak tertahan di 0cm terus menerus, pastikan objek pantulan tidak berbahan penyerap suara (seperti spons) dan kabel Trig/Echo tidak terbalik letaknya.',
    laporanIG: 'Fenomena tabrakan pada robot navigasi belum mampu menjelaskan titik buta dalam konteks manuver otonom, sehingga penelitian ini menguji deteksi halangan proksimal. HC-SR04 mempengaruhi manuver robot karena memanfaatkan selisih waktu tempuh gelombang ultrasonik untuk kalkulasi jarak, hal ini didukung oleh fisika akustik. Metode dipilih karena metode ini mampu menjawab hubungan waktu pantul gelombang dan jarak fisik secara matematis, menunjukkan ketepatan bukan kemudahan. Hasil menunjukkan pantulan gelombang berpengaruh terhadap jarak terukur, yang berarti aktuator rem dapat dipicu sebelum benturan, dan sejalan dengan teori propagasi suara.',
    wiringPins: [
      { sensorPin: 'VCC', correctArduinoPin: '5V', label: 'Power Supply' },
      { sensorPin: 'GND', correctArduinoPin: 'GND', label: 'Ground' },
      { sensorPin: 'TRIG', correctArduinoPin: 'D9', label: 'Trigger Signal' },
      { sensorPin: 'ECHO', correctArduinoPin: 'D10', label: 'Echo Signal' },
    ],
    rewardCode: `#define TRIG_PIN 9
#define ECHO_PIN 10

void setup() {
  Serial.begin(9600);
  pinMode(TRIG_PIN, OUTPUT);
  pinMode(ECHO_PIN, INPUT);
}

void loop() {
  digitalWrite(TRIG_PIN, LOW);
  delayMicroseconds(2);
  digitalWrite(TRIG_PIN, HIGH);
  delayMicroseconds(10);
  digitalWrite(TRIG_PIN, LOW);

  long duration = pulseIn(ECHO_PIN, HIGH);
  float distance = duration * 0.034 / 2;

  Serial.print("Jarak: ");
  Serial.print(distance);
  Serial.println(" cm");
  delay(500);
}`,
    neonColor: 'green',
  },
  {
    id: 3,
    slug: 'ldr',
    title: 'LDR',
    subtitle: 'Light Dependent Resistor',
    icon: '💡',
    teori: 'Nilai resistansinya akan menurun secara drastis saat terpapar cahaya terang, dan meningkat sangat tinggi dalam kondisi gelap gulita.',
    datasheet: 'Tegangan: 3.3V - 5V | Output: Analog (Membutuhkan Voltage Divider) / Digital (via Komparator) | Spektrum: Cahaya Tampak',
    troubleshooting: 'Jika nilai ADC tertahan di 0 atau 4095, periksa rangkaian voltage divider; resistor referensi (biasanya 10k Ohm) mungkin tidak terhubung ke Ground.',
    laporanIG: 'Fenomena pemborosan energi lampu penerangan jalan belum mampu menjelaskan efisiensi daya dalam konteks smart city, sehingga penelitian ini menguji ambang batas intensitas cahaya. LDR mempengaruhi saklar otomatis karena sifat fotokonduktivitas material semikonduktor yang menurunkan resistansi saat terkena foton, hal ini didukung oleh prinsip efek fotolistrik internal. Metode dipilih karena metode ini mampu menjawab hubungan intensitas foton dan perubahan voltase secara proporsional, menunjukkan ketepatan bukan kemudahan. Hasil menunjukkan LDR berpengaruh terhadap logika relay, yang berarti lampu menyala tepat saat senja, dan sejalan dengan teori fotokonduktivitas elektron.',
    wiringPins: [
      { sensorPin: 'VCC', correctArduinoPin: '5V', label: 'Power Supply' },
      { sensorPin: 'GND', correctArduinoPin: 'GND', label: 'Ground' },
      { sensorPin: 'AOUT', correctArduinoPin: 'A0', label: 'Analog Output' },
    ],
    rewardCode: `#define LDR_PIN A0
#define LED_PIN 13

void setup() {
  Serial.begin(9600);
  pinMode(LED_PIN, OUTPUT);
}

void loop() {
  int ldrValue = analogRead(LDR_PIN);
  Serial.print("Intensitas Cahaya: ");
  Serial.println(ldrValue);

  // Jika gelap (nilai tinggi), nyalakan LED
  if (ldrValue > 700) {
    digitalWrite(LED_PIN, HIGH);
    Serial.println("Status: GELAP - Lampu ON");
  } else {
    digitalWrite(LED_PIN, LOW);
    Serial.println("Status: TERANG - Lampu OFF");
  }
  delay(200);
}`,
    neonColor: 'yellow',
  },
  {
    id: 4,
    slug: 'pir',
    title: 'PIR',
    subtitle: 'Passive Infrared Sensor',
    icon: '👁️',
    teori: 'Mendeteksi perubahan pancaran radiasi inframerah dari panas tubuh manusia atau hewan yang bergerak melewati jangkauan lensa Fresnel-nya.',
    datasheet: 'Tegangan: 5V | Output: Digital (High/Low) | Jangkauan: Hingga 7 meter (110 derajat)',
    troubleshooting: 'Sensor mendeteksi gerakan palsu (False Trigger)? Putar potensiometer Tx (Time Delay) ke arah berlawanan jarum jam, dan jauhkan dari paparan sinar matahari langsung atau AC.',
    laporanIG: 'Fenomena penyusupan di area terlarang belum mampu menjelaskan kelemahan keamanan perimeter dalam konteks sistem alarm, sehingga penelitian ini menguji deteksi radiasi termal bergerak. PIR mempengaruhi trigger alarm karena material piroelektrik menghasilkan tegangan saat terpapar fluktuasi inframerah tubuh, hal ini didukung oleh hukum radiasi benda hitam. Metode dipilih karena metode ini mampu menjawab hubungan pergerakan panas dan sinyal digital secara pasif, menunjukkan ketepatan bukan kemudahan. Hasil menunjukkan PIR berpengaruh terhadap status keamanan, yang berarti alarm berbunyi murni karena pergerakan makhluk hidup, dan sejalan dengan teori termal piroelektrik.',
    wiringPins: [
      { sensorPin: 'VCC', correctArduinoPin: '5V', label: 'Power Supply' },
      { sensorPin: 'GND', correctArduinoPin: 'GND', label: 'Ground' },
      { sensorPin: 'OUT', correctArduinoPin: 'D7', label: 'Digital Output' },
    ],
    rewardCode: `#define PIR_PIN 7
#define BUZZER_PIN 13

void setup() {
  Serial.begin(9600);
  pinMode(PIR_PIN, INPUT);
  pinMode(BUZZER_PIN, OUTPUT);
  Serial.println("PIR Warming up...");
  delay(30000); // Warm-up 30 detik
  Serial.println("Siap mendeteksi!");
}

void loop() {
  int motionState = digitalRead(PIR_PIN);

  if (motionState == HIGH) {
    digitalWrite(BUZZER_PIN, HIGH);
    Serial.println("GERAK TERDETEKSI! Alarm ON!");
  } else {
    digitalWrite(BUZZER_PIN, LOW);
    Serial.println("Area Aman.");
  }
  delay(100);
}`,
    neonColor: 'pink',
  },
  {
    id: 5,
    slug: 'ttp223',
    title: 'TTP223',
    subtitle: 'Capacitive Touch Sensor',
    icon: '👆',
    teori: 'Memanfaatkan sifat kapasitansi tubuh manusia. Saat jari mendekat ke area sentuh, kapasitansi parasitik berubah, memicu IC untuk mengirimkan sinyal logika HIGH.',
    datasheet: 'Tegangan: 2.0V - 5.5V | Output: Digital | Response Time: ~60ms (Fast mode)',
    troubleshooting: 'Jika ditekan tapi tidak responsif, pastikan tidak ada material konduktif logam yang menghalangi pad sensor, dan pastikan ground sistem terhubung stabil.',
    laporanIG: 'Fenomena ausnya saklar mekanis belum mampu menjelaskan daya tahan input antarmuka dalam konteks smart home, sehingga penelitian ini menguji keandalan pemicu kapasitif. TTP223 mempengaruhi saklar alat karena ujung jari manusia mengubah dielektrik lokal yang meningkatkan kapasitansi sirkuit, hal ini didukung oleh prinsip medan elektrostatik. Metode dipilih karena metode ini mampu menjawab hubungan sentuhan tanpa tekanan fisik dan perubahan logika secara instan, menunjukkan ketepatan bukan kemudahan. Hasil menunjukkan sentuhan jari berpengaruh terhadap pemicuan relay, yang berarti masa pakai tombol menjadi tak terbatas, dan sejalan dengan teori kapasitansi listrik.',
    wiringPins: [
      { sensorPin: 'VCC', correctArduinoPin: '3.3V', label: 'Power Supply' },
      { sensorPin: 'GND', correctArduinoPin: 'GND', label: 'Ground' },
      { sensorPin: 'SIG', correctArduinoPin: 'D3', label: 'Signal Output' },
    ],
    rewardCode: `#define TOUCH_PIN 3
#define LED_PIN 13

bool ledState = false;

void setup() {
  Serial.begin(9600);
  pinMode(TOUCH_PIN, INPUT);
  pinMode(LED_PIN, OUTPUT);
}

void loop() {
  if (digitalRead(TOUCH_PIN) == HIGH) {
    ledState = !ledState;
    digitalWrite(LED_PIN, ledState);
    Serial.print("Touch! LED: ");
    Serial.println(ledState ? "ON" : "OFF");
    delay(300); // Debounce
  }
}`,
    neonColor: 'teal',
  },
  {
    id: 6,
    slug: 'mq2',
    title: 'MQ-2',
    subtitle: 'Sensor Gas & Asap',
    icon: '💨',
    teori: 'Material elemen pemanas SnO2 akan bereaksi ketika terkena gas mudah terbakar (LPG, Metana) atau asap, menurunkan resistansi internal dan menghasilkan tegangan analog yang lebih tinggi.',
    datasheet: 'Tegangan: 5V (Wajib stabil untuk pemanas) | Output: Analog & Digital | Deteksi: LPG, Asap, Alkohol, Propana',
    troubleshooting: 'Sensor terasa panas saat disentuh? Itu normal. Jika nilai pembacaan tidak stabil, biarkan sensor menyala (Burn-in) selama 24 jam pertama kali untuk menstabilkan elemen pemanas.',
    laporanIG: 'Fenomena kebocoran tabung LPG belum mampu menjelaskan lambatnya mitigasi kebakaran dalam konteks keselamatan dapur, sehingga penelitian ini menguji deteksi konsentrasi hidrokarbon. MQ-2 mempengaruhi peringatan bahaya karena gas mudah terbakar menurunkan resistansi pada lapisan timah dioksida (SnO2), hal ini didukung oleh teori kimia-fisika semikonduktor. Metode dipilih karena metode ini mampu menjawab hubungan konsentrasi gas spesifik dan variasi tegangan secara real-time, menunjukkan ketepatan bukan kemudahan. Hasil menunjukkan MQ-2 berpengaruh terhadap sistem exhaust darurat, yang berarti asap terekstraksi sebelum titik nyala tercapai, dan sejalan dengan prinsip konduktivitas oksida logam.',
    wiringPins: [
      { sensorPin: 'VCC', correctArduinoPin: '5V', label: 'Power Supply' },
      { sensorPin: 'GND', correctArduinoPin: 'GND', label: 'Ground' },
      { sensorPin: 'AOUT', correctArduinoPin: 'A0', label: 'Analog Output' },
      { sensorPin: 'DOUT', correctArduinoPin: 'D8', label: 'Digital Output' },
    ],
    rewardCode: `#define MQ2_ANALOG_PIN A0
#define MQ2_DIGITAL_PIN 8
#define BUZZER_PIN 13
#define GAS_THRESHOLD 400

void setup() {
  Serial.begin(9600);
  pinMode(MQ2_DIGITAL_PIN, INPUT);
  pinMode(BUZZER_PIN, OUTPUT);
  Serial.println("MQ-2 Warming up 60 detik...");
  delay(60000);
}

void loop() {
  int gasLevel = analogRead(MQ2_ANALOG_PIN);
  bool digitalAlert = digitalRead(MQ2_DIGITAL_PIN) == LOW;

  Serial.print("Level Gas: ");
  Serial.print(gasLevel);

  if (gasLevel > GAS_THRESHOLD || digitalAlert) {
    digitalWrite(BUZZER_PIN, HIGH);
    Serial.println(" | BAHAYA! GAS TERDETEKSI!");
  } else {
    digitalWrite(BUZZER_PIN, LOW);
    Serial.println(" | Normal.");
  }
  delay(500);
}`,
    neonColor: 'orange',
  },
  {
    id: 7,
    slug: 'rain',
    title: 'Rain Sensor',
    subtitle: 'Sensor Hujan',
    icon: '🌧️',
    teori: 'Papan nikel bertindak sebagai resistor variabel. Air hujan bersifat konduktif, sehingga ketika tetesan air jatuh ke papan, ia menghubungkan jalur nikel dan menurunkan resistansinya.',
    datasheet: 'Tegangan: 3.3V - 5V | Output: Analog (Tingkat curah) & Digital (Ambang batas) | Material Panel: Anti-oksidasi/Nikel',
    troubleshooting: 'Sensor lambat mendeteksi reda? Air mungkin masih menggenang di papan sirkuit. Posisikan papan detektor dalam sudut miring (sekitar 30-45 derajat) agar air hujan langsung mengalir jatuh.',
    laporanIG: 'Fenomena jemuran yang basah akibat hujan tiba-tiba belum mampu menjelaskan lambatnya respon mekanis dalam konteks otomasi rumah tangga, sehingga penelitian ini menguji presisi deteksi konduktivitas presipitasi. Rain Sensor mempengaruhi penarikan atap mekanis karena air hujan mengkonduksikan jalur tembaga berlapis nikel yang mengubah nilai tegangan, hal ini didukung oleh teori elektrolit cairan. Metode dipilih karena metode ini mampu menjawab hubungan volume tetesan curah hujan dan tingkat sinyal analog secara linier, menunjukkan ketepatan bukan kemudahan. Hasil menunjukkan air hujan berpengaruh terhadap aktuator motor DC, yang berarti atap tertutup secara otonom, dan sejalan dengan sifat konduktivitas air mineral.',
    wiringPins: [
      { sensorPin: 'VCC', correctArduinoPin: '5V', label: 'Power Supply' },
      { sensorPin: 'GND', correctArduinoPin: 'GND', label: 'Ground' },
      { sensorPin: 'AOUT', correctArduinoPin: 'A1', label: 'Analog Output' },
      { sensorPin: 'DOUT', correctArduinoPin: 'D4', label: 'Digital Output' },
    ],
    rewardCode: `#define RAIN_ANALOG A1
#define RAIN_DIGITAL 4
#define MOTOR_PIN 13

void setup() {
  Serial.begin(9600);
  pinMode(RAIN_DIGITAL, INPUT);
  pinMode(MOTOR_PIN, OUTPUT);
}

void loop() {
  int rainLevel = analogRead(RAIN_ANALOG);
  bool isRaining = digitalRead(RAIN_DIGITAL) == LOW;

  Serial.print("Level Hujan: ");
  Serial.print(rainLevel);
  Serial.print(" | Status: ");

  if (isRaining) {
    digitalWrite(MOTOR_PIN, HIGH);
    Serial.println("HUJAN - Atap Menutup!");
  } else {
    digitalWrite(MOTOR_PIN, LOW);
    Serial.println("Tidak Hujan - Atap Terbuka.");
  }
  delay(300);
}`,
    neonColor: 'cyan',
  },
  {
    id: 8,
    slug: 'ir',
    title: 'IR Obstacle',
    subtitle: 'Sensor Halangan Jarak Dekat',
    icon: '🔴',
    teori: 'Terdiri dari dioda pemancar inframerah dan fotodioda penerima. Jika ada objek putih/terang di depan, cahaya dipantulkan kembali ke penerima. Jika objek hitam, cahaya diserap.',
    datasheet: 'Tegangan: 3.3V - 5V | Output: Digital | Rentang Efektif: 2cm - 30cm (dapat disesuaikan)',
    troubleshooting: 'LED hijau indikator menyala terus padahal tidak ada halangan? Putar trimpot kalibrasi untuk mengurangi tingkat sensitivitas cahaya inframerahnya.',
    laporanIG: 'Fenomena mesin konveyor yang menabrakkan barang belum mampu menjelaskan cacat penyortiran dalam konteks perakitan industri, sehingga penelitian ini menguji deteksi proksimitas optik. IR Obstacle mempengaruhi penghitung barang karena fotodioda menangkap pantulan spektrum inframerah dari objek di depannya, hal ini didukung oleh hukum refleksi optik. Metode dipilih karena metode ini mampu menjawab hubungan jarak objek dekat dan pemicuan logika tanpa jeda waktu, menunjukkan ketepatan bukan kemudahan. Hasil menunjukkan IR Obstacle berpengaruh terhadap kalkulasi item di konveyor, yang berarti barang tersortir sempurna, dan sejalan dengan prinsip pantulan gelombang elektromagnetik.',
    wiringPins: [
      { sensorPin: 'VCC', correctArduinoPin: '5V', label: 'Power Supply' },
      { sensorPin: 'GND', correctArduinoPin: 'GND', label: 'Ground' },
      { sensorPin: 'OUT', correctArduinoPin: 'D5', label: 'Digital Output' },
    ],
    rewardCode: `#define IR_PIN 5
#define COUNTER_LED 13

int itemCount = 0;
bool lastState = HIGH;

void setup() {
  Serial.begin(9600);
  pinMode(IR_PIN, INPUT);
  pinMode(COUNTER_LED, OUTPUT);
}

void loop() {
  bool currentState = digitalRead(IR_PIN);

  // Deteksi rising edge (objek lewat)
  if (lastState == LOW && currentState == HIGH) {
    itemCount++;
    digitalWrite(COUNTER_LED, HIGH);
    Serial.print("Item terdeteksi! Total: ");
    Serial.println(itemCount);
    delay(50);
    digitalWrite(COUNTER_LED, LOW);
  }

  lastState = currentState;
  delay(10);
}`,
    neonColor: 'pink',
  },
  {
    id: 9,
    slug: 'soil',
    title: 'Soil Moisture',
    subtitle: 'Sensor Kelembaban Tanah',
    icon: '🌱',
    teori: 'Memiliki dua probe elektroda untuk mengukur hambatan antar partikel tanah. Tanah yang basah sangat konduktif, menghasilkan resistansi rendah. Tanah kering bertindak sebagai isolator.',
    datasheet: 'Tegangan: 3.3V - 5V | Output: Analog & Digital | Probe: Anti-korosi berlapis emas (direkomendasikan)',
    troubleshooting: 'Pembacaan tidak konsisten? Elektroda murah mudah berkarat karena elektrolisis. Ubah kode agar sensor menyala (melalui pin digital) hanya beberapa detik saat melakukan pembacaan untuk mencegah korosi cepat.',
    laporanIG: 'Fenomena layunya tanaman akibat penyiraman tidak terjadwal belum mampu menjelaskan pemborosan air dalam konteks smart agriculture, sehingga penelitian ini menguji tingkat saturasi tanah secara langsung. Soil Moisture mempengaruhi sistem irigasi karena kandungan air bertindak sebagai elektrolit yang menurunkan resistansi antara dua probe, hal ini didukung oleh prinsip konduktivitas ionik. Metode dipilih karena metode ini mampu menjawab hubungan kebasahan tanah dan debit air pompa secara kuantitatif, menunjukkan ketepatan bukan kemudahan. Hasil menunjukkan probe konduktif berpengaruh terhadap durasi aktifnya pompa air, yang berarti akar tanaman mendapat nutrisi optimal, dan sejalan dengan teori hambatan larutan.',
    wiringPins: [
      { sensorPin: 'VCC', correctArduinoPin: '5V', label: 'Power Supply' },
      { sensorPin: 'GND', correctArduinoPin: 'GND', label: 'Ground' },
      { sensorPin: 'AOUT', correctArduinoPin: 'A2', label: 'Analog Output' },
      { sensorPin: 'DOUT', correctArduinoPin: 'D6', label: 'Digital Output' },
    ],
    rewardCode: `#define SOIL_ANALOG A2
#define SOIL_DIGITAL 6
#define PUMP_PIN 13
#define SENSOR_POWER 7 // Pin untuk power sensor

void setup() {
  Serial.begin(9600);
  pinMode(SOIL_DIGITAL, INPUT);
  pinMode(PUMP_PIN, OUTPUT);
  pinMode(SENSOR_POWER, OUTPUT);
  digitalWrite(SENSOR_POWER, LOW); // Default mati
}

void loop() {
  // Nyalakan sensor hanya saat baca
  digitalWrite(SENSOR_POWER, HIGH);
  delay(100);

  int moisture = analogRead(SOIL_ANALOG);
  bool isDry = digitalRead(SOIL_DIGITAL) == HIGH;

  digitalWrite(SENSOR_POWER, LOW); // Matikan sensor

  Serial.print("Kelembaban Tanah: ");
  Serial.print(moisture);

  if (isDry) {
    digitalWrite(PUMP_PIN, HIGH);
    Serial.println(" | KERING - Pompa ON!");
  } else {
    digitalWrite(PUMP_PIN, LOW);
    Serial.println(" | LEMBAB - Pompa OFF.");
  }
  delay(5000); // Baca tiap 5 detik
}`,
    neonColor: 'green',
  },
  {
    id: 10,
    slug: 'mpu6050',
    title: 'MPU6050',
    subtitle: 'Gyroscope & Accelerometer',
    icon: '🔄',
    teori: 'Modul MEMS (Micro-Electro-Mechanical Systems) 6-Axis yang mendeteksi percepatan gravitasi bumi dan kecepatan sudut (kemiringan) menggunakan massa mikro yang bergerak secara kapasitif di dalam cip.',
    datasheet: 'Tegangan: 3.3V - 5V | Komunikasi: I2C (SDA, SCL) | Fitur: 3-Axis Gyro, 3-Axis Accel, DMP terintegrasi',
    troubleshooting: 'Nilai sudut (Pitch/Roll) bergeser perlahan meski sensor diam (Drifting)? Implementasikan Complementary Filter atau Kalman Filter pada kode software untuk menggabungkan data Gyro dan Accel.',
    laporanIG: 'Fenomena jatuhnya drone saat diterpa angin belum mampu menjelaskan hilangnya keseimbangan dalam konteks sistem penerbangan UAV, sehingga penelitian ini menguji orientasi spasial tiga dimensi. MPU6050 mempengaruhi penyeimbang rotor karena pergerakan mekanis MEMS di dalam cip mendistorsi medan kapasitif yang menghasilkan data derajat kemiringan, hal ini didukung oleh hukum fisika inersia gerak. Metode dipilih karena metode ini mampu menjawab hubungan percepatan gravitasi dan derajat orientasi sudut secara simultan, menunjukkan ketepatan bukan kemudahan. Hasil menunjukkan MPU6050 berpengaruh terhadap putaran dinamis baling-baling, yang berarti drone kembali ke posisi hovering, dan sejalan dengan teori kinematika mekanika klasik.',
    wiringPins: [
      { sensorPin: 'VCC', correctArduinoPin: '3.3V', label: 'Power Supply' },
      { sensorPin: 'GND', correctArduinoPin: 'GND', label: 'Ground' },
      { sensorPin: 'SDA', correctArduinoPin: 'A4', label: 'I2C Data' },
      { sensorPin: 'SCL', correctArduinoPin: 'A5', label: 'I2C Clock' },
    ],
    rewardCode: `#include <Wire.h>
#include <MPU6050.h>

MPU6050 mpu;

void setup() {
  Serial.begin(9600);
  Wire.begin();
  mpu.initialize();

  if (mpu.testConnection()) {
    Serial.println("MPU6050 Terhubung!");
  } else {
    Serial.println("Koneksi gagal!");
  }
}

void loop() {
  int16_t ax, ay, az, gx, gy, gz;
  mpu.getMotion6(&ax, &ay, &az, &gx, &gy, &gz);

  // Complementary Filter
  float pitch = atan2(ay, az) * 180 / PI;
  float roll  = atan2(ax, az) * 180 / PI;

  Serial.print("Pitch: "); Serial.print(pitch);
  Serial.print("° | Roll: "); Serial.print(roll);
  Serial.println("°");
  delay(100);
}`,
    neonColor: 'teal',
  },
];
