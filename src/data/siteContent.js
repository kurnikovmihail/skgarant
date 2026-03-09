export const navigation = [
  { id: 'about', label: 'О компании' },
  { id: 'projects', label: 'Проекты' },
  { id: 'services', label: 'Услуги' },
  { id: 'contacts', label: 'Контакты' },
]

export const heroContent = {
  title: 'Строим дома, в которых хочется жить',
  subtitle:
    'Проектируем и строим современные дома под ключ с прозрачной сметой, фиксированными сроками и личным контролем каждого этапа.',
  image:
    'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=2000',
  benefits: ['Работаем по договору', 'Прозрачная смета', 'Собственная команда'],
}

export const aboutContent = {
  title: 'СК «Гаранд» - современная строительная компания',
  text:
    'Мы специализируемся на частных домах и коттеджах, где важны архитектура, долговечность и спокойный сервис без навязчивых продаж. Клиент получает понятный процесс, прозрачные этапы и один ответственный подряд.',
  extra:
    'За 10 лет мы сформировали собственные бригады, стандартизировали контроль качества и выстроили процесс так, чтобы вы могли наблюдать за строительством без стресса.',
  image:
    'https://images.pexels.com/photos/534220/pexels-photo-534220.jpeg?auto=compress&cs=tinysrgb&w=1600',
  stats: [
    { value: '80+', label: 'Построенных домов' },
    { value: '10 лет', label: 'Практического опыта' },
    { value: '12', label: 'Собственных бригад' },
    { value: '1 регион', label: 'Работаем локально и глубоко' },
  ],
}

export const services = [
  {
    code: '01',
    title: 'Строительство домов под ключ',
    description:
      'Полный цикл от идеи и проекта до сдачи дома и инженерных систем в рабочем состоянии.',
  },
  {
    code: '02',
    title: 'Архитектурное проектирование',
    description:
      'Разрабатываем проекты с учетом участка, бюджета и повседневных сценариев жизни семьи.',
  },
  {
    code: '03',
    title: 'Фундаментные работы',
    description:
      'Подбираем тип фундамента после анализа грунта и проектных нагрузок, без шаблонных решений.',
  },
  {
    code: '04',
    title: 'Коробка дома',
    description:
      'Возводим стены, перекрытия и кровлю с четким соблюдением технологии и строительных норм.',
  },
  {
    code: '05',
    title: 'Отделка и инженерия',
    description:
      'Внутренние работы, разводка коммуникаций и подготовка дома к комфортной эксплуатации.',
  },
]

export const projects = [
  {
    slug: 'skandi-140',
    title: 'Дом «Сканди 140»',
    area: '140 м²',
    city: 'Екатеринбург',
    timeline: '6 месяцев',
    image:
      'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=1600',
    heroImage:
      'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=2000',
    summary:
      'Компактный дом с панорамным остеклением, теплым фасадом и чистой современной архитектурой.',
    location: 'КП Зеленый берег',
    family: 'Семья из 4 человек',
    technology: 'Газобетон + монолитные узлы',
    features: [
      'Плоская кровля с внутренним водоотводом',
      'Терраса с выходом из кухни-гостиной',
      'Инженерные сети подготовлены под умный дом',
      'Фасад: штукатурка + терракотовый акцент',
    ],
    buildStages: [
      'Подготовка участка и геодезия',
      'Фундаментная плита и ввод коммуникаций',
      'Возведение коробки и кровельная система',
      'Инженерные работы, отделка и благоустройство',
    ],
    gallery: [
      'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=1400',
      'https://images.pexels.com/photos/53610/large-home-residential-house-architecture-53610.jpeg?auto=compress&cs=tinysrgb&w=1400',
      'https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg?auto=compress&cs=tinysrgb&w=1400',
      'https://images.pexels.com/photos/221540/pexels-photo-221540.jpeg?auto=compress&cs=tinysrgb&w=1400',
    ],
  },
  {
    slug: 'urban-185',
    title: 'Дом «Urban 185»',
    area: '185 м²',
    city: 'Верхняя Пышма',
    timeline: '8 месяцев',
    image:
      'https://images.pexels.com/photos/221540/pexels-photo-221540.jpeg?auto=compress&cs=tinysrgb&w=1600',
    heroImage:
      'https://images.pexels.com/photos/323705/pexels-photo-323705.jpeg?auto=compress&cs=tinysrgb&w=2000',
    summary:
      'Двухэтажный городской дом с кабинетом, мастер-спальней и отдельным техническим блоком.',
    location: 'Лесной квартал',
    family: 'Семья из 5 человек',
    technology: 'Керамический блок + монолит',
    features: [
      'Высокие потолки 3.2 м в общей зоне',
      'Теплый контур рассчитан под уральский климат',
      'Фасад из фиброцементных панелей',
      'Навес на 2 автомобиля и кладовая',
    ],
    buildStages: [
      'Архитектурная концепция и рабочие чертежи',
      'Подготовка участка и свайно-ростверковый фундамент',
      'Возведение коробки и фасадные работы',
      'Интерьеры, инженерия и пусконаладка систем',
    ],
    gallery: [
      'https://images.pexels.com/photos/209296/pexels-photo-209296.jpeg?auto=compress&cs=tinysrgb&w=1400',
      'https://images.pexels.com/photos/280229/pexels-photo-280229.jpeg?auto=compress&cs=tinysrgb&w=1400',
      'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=1400',
      'https://images.pexels.com/photos/280221/pexels-photo-280221.jpeg?auto=compress&cs=tinysrgb&w=1400',
    ],
  },
  {
    slug: 'duo-120',
    title: 'Дом «Duo 120»',
    area: '120 м²',
    city: 'Березовский',
    timeline: '5 месяцев',
    image:
      'https://images.pexels.com/photos/534220/pexels-photo-534220.jpeg?auto=compress&cs=tinysrgb&w=1600',
    heroImage:
      'https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg?auto=compress&cs=tinysrgb&w=2000',
    summary:
      'Функциональный одноэтажный дом с акцентом на удобную планировку и быстрый цикл строительства.',
    location: 'КП Сосновый бор',
    family: 'Молодая семья с ребенком',
    technology: 'Каркасная технология премиум-класса',
    features: [
      'Три спальни и просторная гостиная',
      'Энергоэффективные окна с мультифункциональным стеклом',
      'Быстрая сборка за счет заводских узлов',
      'Готовность под чистовую отделку',
    ],
    buildStages: [
      'Предпроектное обследование участка',
      'Сборка конструктивного каркаса',
      'Монтаж инженерных сетей',
      'Подготовка дома к внутренней отделке',
    ],
    gallery: [
      'https://images.pexels.com/photos/259962/pexels-photo-259962.jpeg?auto=compress&cs=tinysrgb&w=1400',
      'https://images.pexels.com/photos/323776/pexels-photo-323776.jpeg?auto=compress&cs=tinysrgb&w=1400',
      'https://images.pexels.com/photos/280222/pexels-photo-280222.jpeg?auto=compress&cs=tinysrgb&w=1400',
      'https://images.pexels.com/photos/1732414/pexels-photo-1732414.jpeg?auto=compress&cs=tinysrgb&w=1400',
    ],
  },
]

export const processSteps = [
  {
    title: 'Консультация',
    description: 'Обсуждаем задачи, бюджет, участок и сроки. Фиксируем понятный вектор работы.',
  },
  {
    title: 'Проектирование',
    description: 'Разрабатываем проект и смету, согласовываем архитектуру и технические решения.',
  },
  {
    title: 'Подготовка участка',
    description: 'Организуем площадку, подвод коммуникаций и полный старт строительных работ.',
  },
  {
    title: 'Строительство',
    description: 'Пошагово строим объект с фотоотчетами и регулярным контролем качества.',
  },
  {
    title: 'Сдача дома',
    description: 'Передаем готовый дом, документы и гарантийные обязательства по договору.',
  },
]

export const advantages = [
  'Работаем строго по договору',
  'Фиксируем стоимость после согласования сметы',
  'Собственные строительные бригады',
  'Технический контроль качества на каждом этапе',
  'Гарантия на выполненные работы',
  'Понятная коммуникация с персональным менеджером',
]

export const reviews = [
  {
    name: 'Ольга и Андрей',
    project: 'Дом «Сканди 140»',
    text:
      'Команда построила дом за 6 месяцев, как и обещали. Все этапы были прозрачными, а смета осталась в рамках согласованной суммы.',
    image:
      'https://images.pexels.com/photos/280229/pexels-photo-280229.jpeg?auto=compress&cs=tinysrgb&w=900',
  },
  {
    name: 'Семья Мироновых',
    project: 'Дом «Urban 185»',
    text:
      'Понравился подход: без давления, спокойно, с аргументацией по каждому решению. Контроль и качество на уровне архитектурного бюро.',
    image:
      'https://images.pexels.com/photos/323705/pexels-photo-323705.jpeg?auto=compress&cs=tinysrgb&w=900',
  },
  {
    name: 'Дмитрий К.',
    project: 'Дом «Duo 120»',
    text:
      'Искали подрядчика, которому можно доверить стройку полностью. Получили понятный процесс, аккуратную работу и прогнозируемый результат.',
    image:
      'https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg?auto=compress&cs=tinysrgb&w=900',
  },
]

export const contacts = {
  phone: '+7 (343) 200-72-10',
  phoneRaw: '+73432007210',
  email: 'info@skgarand.ru',
  office: 'г. Екатеринбург, ул. Чапаева, 12',
  schedule: 'Пн-Сб: 09:00-19:00',
  mapEmbed:
    'https://www.openstreetmap.org/export/embed.html?bbox=60.5902%2C56.8238%2C60.6325%2C56.8538&layer=mapnik&marker=56.8385%2C60.6113',
}
