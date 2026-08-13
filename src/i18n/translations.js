export const languages = [
  { code: 'pl', label: 'PL' },
  { code: 'en', label: 'EN' },
  { code: 'ru', label: 'RU' },
]

export const defaultLanguage = 'pl'

export const translations = {
  pl: {
    nav: {
      overview: 'Overview',
      products: 'Produkty',
      industries: 'Branże',
      partners: 'Partnerzy',
      contact: 'Kontakt',
    },
    hero: {
      badge: 'Dostawca urządzeń przemysłowych',
      title: 'Pompy, wymienniki ciepła i separatory dla przemysłu spożywczego, farmaceutycznego i petrochemicznego',
      subtitle:
        'POLYSVIT z siedzibą w Szczecinie dostarcza sprawdzony sprzęt procesowy najwyższej klasy — jako oficjalny partner Alfa Laval, SPX FLOW/APV i Seital.',
      ctaPrimary: 'Skontaktuj się z nami',
      ctaSecondary: 'Zobacz ofertę',
    },
    overview: {
      eyebrow: 'Overview',
      title: 'O firmie',
      paragraphs: [
        'POLYSVIT Sp. z o.o. to firma inżynieryjno-handlowa z siedzibą w Szczecinie, specjalizująca się w dostawach zaawansowanych urządzeń procesowych dla przemysłu spożywczego, farmaceutycznego oraz rafineryjno-petrochemicznego.',
        'Dostarczamy pompy, wymienniki ciepła, separatory wirówkowe oraz odgazowywacze (deaeratory), łącząc jakość światowych producentów z lokalnym wsparciem technicznym i logistycznym w całej Europie.',
        'Jako oficjalny partner Alfa Laval, SPX FLOW/APV oraz Seital gwarantujemy oryginalny sprzęt, części zamienne oraz profesjonalne doradztwo na każdym etapie projektu.',
      ],
      stats: [
        { value: '3', label: 'branże przemysłu' },
        { value: '4', label: 'kategorie urządzeń' },
        { value: '3', label: 'globalni partnerzy' },
        { value: 'PL / EU', label: 'zasięg dostaw' },
      ],
    },
    products: {
      eyebrow: 'Produkty',
      title: 'Nasza oferta',
      subtitle: 'Sprawdzony sprzęt procesowy dla wymagających instalacji przemysłowych',
      items: [
        {
          title: 'Pompy',
          desc: 'Pompy odśrodkowe, higieniczne i przemysłowe do transportu cieczy, produktów lepkich oraz mediów wrażliwych na ścinanie.',
        },
        {
          title: 'Wymienniki ciepła',
          desc: 'Płytowe i spiralne wymienniki ciepła zapewniające precyzyjną kontrolę temperatury i wysoką efektywność energetyczną.',
        },
        {
          title: 'Separatory',
          desc: 'Wirówkowe separatory i dekantery do klarowania, oczyszczania i rozdziału faz cieczy.',
        },
        {
          title: 'Odgazowywacze (deaeratory)',
          desc: 'Systemy deaeracji usuwające rozpuszczony tlen i gazy, chroniące jakość produktu i trwałość instalacji.',
        },
      ],
    },
    industries: {
      eyebrow: 'Branże',
      title: 'Branże, które obsługujemy',
      items: [
        {
          title: 'Przemysł spożywczy',
          desc: 'Mleczarstwo, przetwórstwo napojów, olejów i tłuszczów — higieniczne rozwiązania zgodne z normami sanitarnymi.',
        },
        {
          title: 'Przemysł farmaceutyczny',
          desc: 'Sprzęt procesowy spełniający rygorystyczne wymagania czystości i powtarzalności produkcji.',
        },
        {
          title: 'Rafineryjny i petrochemiczny',
          desc: 'Urządzenia do pracy w wymagających warunkach ciśnieniowych i temperaturowych instalacji rafineryjnych.',
        },
      ],
    },
    partners: {
      eyebrow: 'Partnerzy',
      title: 'Oficjalny partner',
      subtitle: 'Współpracujemy bezpośrednio z wiodącymi światowymi producentami',
      items: [
        { name: 'Alfa Laval', desc: 'Wymienniki ciepła, separatory i kompletne rozwiązania procesowe.' },
        { name: 'SPX FLOW / APV', desc: 'Pompy higieniczne, wymienniki i homogenizatory dla przemysłu procesowego.' },
        { name: 'Seital', desc: 'Separatory wirówkowe i linie technologiczne dla przemysłu spożywczego.' },
      ],
    },
    contact: {
      eyebrow: 'Kontakt',
      title: 'Skontaktujmy się',
      subtitle: 'Napisz do nas lub zadzwoń — odpowiadamy szybko',
      addressLabel: 'Adres',
      phoneLabel: 'Telefon',
      companyDataTitle: 'Dane rejestrowe',
      legalFormLabel: 'Forma prawna',
      form: {
        name: 'Imię i nazwisko / firma',
        email: 'Adres e-mail',
        message: 'Wiadomość',
        submit: 'Wyślij wiadomość',
        sending: 'Wysyłanie…',
        thanks: 'Dziękujemy! Skontaktujemy się wkrótce.',
        error: 'Nie udało się wysłać wiadomości. Spróbuj ponownie lub zadzwoń.',
      },
    },
    footer: {
      tagline:
        'Dostawca pomp, wymienników ciepła, separatorów i odgazowywaczy dla przemysłu spożywczego, farmaceutycznego i petrochemicznego.',
      rights: 'Wszelkie prawa zastrzeżone.',
    },
  },

  en: {
    nav: {
      overview: 'Overview',
      products: 'Products',
      industries: 'Industries',
      partners: 'Partners',
      contact: 'Contact',
    },
    hero: {
      badge: 'Industrial equipment supplier',
      title: 'Pumps, heat exchangers and separators for the food, pharmaceutical and petrochemical industries',
      subtitle:
        'POLYSVIT, based in Szczecin, supplies proven top-tier process equipment — as an official partner of Alfa Laval, SPX FLOW/APV and Seital.',
      ctaPrimary: 'Contact us',
      ctaSecondary: 'View our offer',
    },
    overview: {
      eyebrow: 'Overview',
      title: 'About us',
      paragraphs: [
        'POLYSVIT Sp. z o.o. is an engineering and trading company based in Szczecin, Poland, specializing in the supply of advanced process equipment for the food, pharmaceutical and oil-refining / petrochemical industries.',
        'We supply pumps, heat exchangers, centrifugal separators and deaerators, combining the quality of world-class manufacturers with local technical and logistics support across Europe.',
        'As an official partner of Alfa Laval, SPX FLOW/APV and Seital, we guarantee genuine equipment, spare parts and expert consulting at every stage of your project.',
      ],
      stats: [
        { value: '3', label: 'industries served' },
        { value: '4', label: 'equipment categories' },
        { value: '3', label: 'global partners' },
        { value: 'PL / EU', label: 'delivery coverage' },
      ],
    },
    products: {
      eyebrow: 'Products',
      title: 'What we supply',
      subtitle: 'Proven process equipment for demanding industrial installations',
      items: [
        {
          title: 'Pumps',
          desc: 'Centrifugal, hygienic and industrial pumps for transferring liquids, viscous products and shear-sensitive media.',
        },
        {
          title: 'Heat exchangers',
          desc: 'Plate and spiral heat exchangers delivering precise temperature control and high energy efficiency.',
        },
        {
          title: 'Separators',
          desc: 'Centrifugal separators and decanters for clarifying, purifying and separating liquid phases.',
        },
        {
          title: 'Deaerators',
          desc: 'Deaeration systems that remove dissolved oxygen and gases, protecting product quality and equipment lifetime.',
        },
      ],
    },
    industries: {
      eyebrow: 'Industries',
      title: 'Industries we serve',
      items: [
        {
          title: 'Food industry',
          desc: 'Dairy, beverage, oil and fat processing — hygienic solutions compliant with sanitary standards.',
        },
        {
          title: 'Pharmaceutical industry',
          desc: 'Process equipment meeting strict cleanliness and production repeatability requirements.',
        },
        {
          title: 'Oil refining & petrochemical',
          desc: 'Equipment built for the demanding pressure and temperature conditions of refinery installations.',
        },
      ],
    },
    partners: {
      eyebrow: 'Partners',
      title: 'Official partner',
      subtitle: 'We work directly with leading global manufacturers',
      items: [
        { name: 'Alfa Laval', desc: 'Heat exchangers, separators and complete process solutions.' },
        { name: 'SPX FLOW / APV', desc: 'Hygienic pumps, heat exchangers and homogenizers for the process industry.' },
        { name: 'Seital', desc: 'Centrifugal separators and technological lines for the food industry.' },
      ],
    },
    contact: {
      eyebrow: 'Contact',
      title: "Let's talk",
      subtitle: 'Write or call us — we respond quickly',
      addressLabel: 'Address',
      phoneLabel: 'Phone',
      companyDataTitle: 'Company registry data',
      legalFormLabel: 'Legal form',
      form: {
        name: 'Name / company',
        email: 'Email address',
        message: 'Message',
        submit: 'Send message',
        sending: 'Sending…',
        thanks: "Thank you! We'll get back to you shortly.",
        error: 'Could not send the message. Please try again or call us.',
      },
    },
    footer: {
      tagline:
        'Supplier of pumps, heat exchangers, separators and deaerators for the food, pharmaceutical and petrochemical industries.',
      rights: 'All rights reserved.',
    },
  },

  ru: {
    nav: {
      overview: 'Обзор',
      products: 'Продукция',
      industries: 'Отрасли',
      partners: 'Партнёры',
      contact: 'Контакты',
    },
    hero: {
      badge: 'Поставщик промышленного оборудования',
      title: 'Насосы, теплообменники и сепараторы для пищевой, фармацевтической и нефтеперерабатывающей промышленности',
      subtitle:
        'POLYSVIT, офис в Щецине, поставляет проверенное оборудование высшего класса — как официальный партнёр Alfa Laval, SPX FLOW/APV и Seital.',
      ctaPrimary: 'Связаться с нами',
      ctaSecondary: 'Смотреть продукцию',
    },
    overview: {
      eyebrow: 'Обзор',
      title: 'О компании',
      paragraphs: [
        'POLYSVIT Sp. z o.o. — инжинирингово-торговая компания с офисом в Щецине (Польша), специализирующаяся на поставках современного технологического оборудования для пищевой, фармацевтической и нефтеперерабатывающей/нефтехимической промышленности.',
        'Мы поставляем насосы, теплообменники, центробежные сепараторы и деаэраторы, сочетая качество ведущих мировых производителей с локальной технической и логистической поддержкой по всей Европе.',
        'Являясь официальным партнёром Alfa Laval, SPX FLOW/APV и Seital, мы гарантируем оригинальное оборудование, запасные части и профессиональные консультации на каждом этапе проекта.',
      ],
      stats: [
        { value: '3', label: 'отрасли' },
        { value: '4', label: 'категории оборудования' },
        { value: '3', label: 'мировых партнёра' },
        { value: 'PL / EU', label: 'география поставок' },
      ],
    },
    products: {
      eyebrow: 'Продукция',
      title: 'Наша продукция',
      subtitle: 'Проверенное технологическое оборудование для требовательных промышленных установок',
      items: [
        {
          title: 'Насосы',
          desc: 'Центробежные, гигиенические и промышленные насосы для перекачки жидкостей, вязких продуктов и сред, чувствительных к сдвиговым нагрузкам.',
        },
        {
          title: 'Теплообменники',
          desc: 'Пластинчатые и спиральные теплообменники, обеспечивающие точный контроль температуры и высокую энергоэффективность.',
        },
        {
          title: 'Сепараторы',
          desc: 'Центробежные сепараторы и декантеры для осветления, очистки и разделения жидких фаз.',
        },
        {
          title: 'Деаэраторы',
          desc: 'Системы деаэрации, удаляющие растворённый кислород и газы — защищают качество продукта и срок службы оборудования.',
        },
      ],
    },
    industries: {
      eyebrow: 'Отрасли',
      title: 'Отрасли, с которыми мы работаем',
      items: [
        {
          title: 'Пищевая промышленность',
          desc: 'Молочная отрасль, переработка напитков, масел и жиров — гигиенические решения, соответствующие санитарным нормам.',
        },
        {
          title: 'Фармацевтическая промышленность',
          desc: 'Технологическое оборудование, отвечающее строгим требованиям чистоты и повторяемости производства.',
        },
        {
          title: 'Нефтепереработка и нефтехимия',
          desc: 'Оборудование для работы в сложных условиях давления и температуры на нефтеперерабатывающих установках.',
        },
      ],
    },
    partners: {
      eyebrow: 'Партнёры',
      title: 'Официальный партнёр',
      subtitle: 'Работаем напрямую с ведущими мировыми производителями',
      items: [
        { name: 'Alfa Laval', desc: 'Теплообменники, сепараторы и комплексные технологические решения.' },
        { name: 'SPX FLOW / APV', desc: 'Гигиенические насосы, теплообменники и гомогенизаторы для перерабатывающей промышленности.' },
        { name: 'Seital', desc: 'Центробежные сепараторы и технологические линии для пищевой промышленности.' },
      ],
    },
    contact: {
      eyebrow: 'Контакты',
      title: 'Свяжитесь с нами',
      subtitle: 'Напишите или позвоните нам — мы быстро ответим',
      addressLabel: 'Адрес',
      phoneLabel: 'Телефон',
      companyDataTitle: 'Регистрационные данные',
      legalFormLabel: 'Организационно-правовая форма',
      form: {
        name: 'Имя / компания',
        email: 'Электронная почта',
        message: 'Сообщение',
        submit: 'Отправить сообщение',
        sending: 'Отправка…',
        thanks: 'Спасибо! Мы свяжемся с вами в ближайшее время.',
        error: 'Не удалось отправить сообщение. Попробуйте ещё раз или позвоните нам.',
      },
    },
    footer: {
      tagline:
        'Поставщик насосов, теплообменников, сепараторов и деаэраторов для пищевой, фармацевтической и нефтеперерабатывающей промышленности.',
      rights: 'Все права защищены.',
    },
  },
}
