import { Book, ContentType, KeyPointType } from '../types/book';

export const mockBooks: Book[] = [
  {
    id: '1',
    title: 'Elden Ring Lore',
    author: 'FromSoftware',
    imageUrl:
      'https://firebasestorage.googleapis.com/v0/b/flash-books-dev.appspot.com/o/booksImages%2Fcb481558-15e6-44d8-a9c1-bf3598076468.webp?alt=media&token=4ba9b1f8-80e8-48a8-85a5-fa125798abcf',
    description:
      'Um exame aprofundado da lore do Elden Ring, detalhando a complexa história, personagens, deuses e eventos que moldam o mundo intrigante do jogo.',
    chapters: [
      {
        title: 'História do Mundo',
        content: [
          {
            type: ContentType.PARAGRAPH,
            text: "A história do mundo, segundo os Três Dedos, abre a narrativa com uma reflexão: 'É apenas um ciclo. Fique diante do Elden Ring. Torne-se o Senhor Elden.'",
          },
          {
            type: ContentType.PARAGRAPH,
            text: 'Este é o princípio de uma narrativa rica e complexa, onde a origem do mundo é identificada como proveniente do Um Grande, embora essa entidade permaneça obscura em outros relatos. As fraturas e as almas estão entrelaçadas com uma grande vontade que cometeu um erro primordial, resultando em tormentos, aflições e, finalmente, a necessidade de retornar à unidade.',
          },
          {
            type: ContentType.KEY_POINT,
            keyPointType: KeyPointType.INSIGHT,
            text: 'A criação do Elden Ring ocorre em um contexto onde a ordem e a divindade se entrelaçam e se desencontram, refletindo a luta constante entre os reinos superiores e inferiores da existência.',
          },
          {
            type: ContentType.PARAGRAPH,
            text: 'Nos primórdios do mundo, existia uma grande árvore, a Grande Árvore, e seu Crisol de um ouro primordial, que seria o pré-requisito para a vida. Através de um cerne divino, a vida emergiu, mas imbui-se de impurezas que mais tarde foram vistas com desdém.',
          },
          {
            type: ContentType.PARAGRAPH,
            text: 'As impurezas que surgiram na forma de criaturas respeitadas, como dragões, foram interpretadas como sinais divinos até que a percepção se transformou com o tempo. Os dragões, como criaturas de ouro primordial, habitaram sob a proteção de um deus não nomeado, e sua principal figura, Placidusax, se destacou, construindo Farum Azula, um mausoléu flutuante.',
          },
          {
            type: ContentType.PARAGRAPH,
            text: 'O Grande Crisol e a árvore se tornaram testemunhas de uma era que surgiu sob a luz do cosmos, predizendo a eventual ascensão e queda de reinos.',
          },
          {
            type: ContentType.PARAGRAPH,
            text: 'Com o passar do tempo, o desejo de uma nova ordem levou à criação do Elden Ring, que se tornaria a base de tudo',
          },
          {
            type: ContentType.KEY_POINT,
            keyPointType: KeyPointType.MOMENT,
            text: 'A ascensão de Marika como a nova deusa marcou o fim de uma era e o início da Era da Árvore.',
          },
          {
            type: ContentType.PARAGRAPH,
            text: 'Com Marika estabelecida como deusa, ela criou a Ordem Dourada, removendo a Runa da Morte do Elden Ring. O mundo parecia florescer sob esta nova ordem, mas a estabilidade não duraria.',
          },
        ],
      },
      {
        title: 'Pré-história',
        content: [
          {
            type: ContentType.PARAGRAPH,
            text: 'A era anterior à formação de grandes estruturas começa a mostrar a fragilidade do equilíbrio estabelecido. Em barcaças decoradas de uma história não contada, figuras como Maliketh e os Kanakes começam a se entrelaçar na tapeçaria do destino.',
          },
          {
            type: ContentType.PARAGRAPH,
            text: 'O tempo trouxe os Dragões Antigos à luz, preservando a essência de vida mesmo na eventual perda do Ser Cristalino, que revelaria o próprio poder da Grande Vontade.',
          },
          {
            type: ContentType.KEY_POINT,
            keyPointType: KeyPointType.QUOTE,
            text: "'Todos os que são nascidos de um pecado primeiro estão condenados a repetir o ciclo que criaram.'",
            reference:
              'Exortação de um ancião da árvore, refletindo sobre os erros da criação.',
          },
          {
            type: ContentType.PARAGRAPH,
            text: 'Enquanto as brumas da história se dissipam, os guerreiros de eras passadas se tornaram sombras, e incontáveis guerras moldaram o destino dos seres que percorrem as terras entrelaçadas pela Grande Árvore.',
          },
          {
            type: ContentType.PARAGRAPH,
            text: 'A história começa a tomar forma, revelando não apenas a ascensão de heróis, mas também a queda de deuses, enquanto os reinos se uniam e dividiam, gestando um ambiente de caos e olhos ardentes que buscavam redenção.',
          },
          {
            type: ContentType.PARAGRAPH,
            text: 'Os campeões começaram a emergir, mas o desejo de cada um era regulado por velhas alianças e novos desafios. A Guerra dos Gigantes se tornou um eco distante, um grito de reivindicação da antiga ordem.',
          },
          {
            type: ContentType.KEY_POINT,
            keyPointType: KeyPointType.INSIGHT,
            text: 'A história nos ensina que o desejo de poder e controle pode cegar até mesmo os mais nobres dos corações, como evidenciado pela queda dos Gigantes e dos Dragões.',
          },
          {
            type: ContentType.PARAGRAPH,
            text: 'Em meio a tudo isso, Miquella e Malenia emergem, representando uma nova geração que buscará o legado das ações de seus predecessores, marcando a linha entre o caos e a ordem.',
          },
        ],
      },
      {
        title: 'A Era da Árvore (Godfrey)',
        content: [
          {
            type: ContentType.PARAGRAPH,
            text: 'A Era da Árvore, sob a liderança de Godfrey, se tornou um treinamento feudal onde os guerreiros eram buscados como ícones de força e unidade entre as nações.',
          },
          {
            type: ContentType.PARAGRAPH,
            text: 'Godfrey, conhecido por sua força descomunal, levou as tribos dissentidoras a inacreditáveis vitórias, unificando as terras sob o estandarte da Grande Árvore.',
          },
          {
            type: ContentType.KEY_POINT,
            keyPointType: KeyPointType.MOMENT,
            text: 'O surgimento do casamento de Godfrey com Marika simboliza a fusão de duas forças legais e cria uma nova dualidade na narrativa.',
          },
          {
            type: ContentType.PARAGRAPH,
            text: 'Com a Ordem Dourada solidificada, a terra floresceu em riqueza, mas podas sombrias ameaçavam sua paz, enquanto os ecos da guerra contra os gigantes ainda ressoavam nas memórias das nações.',
          },
          {
            type: ContentType.PARAGRAPH,
            text: 'Godfrey, embora forte, comete um erro monumental ao subestimar as chamas da Revolta que surgiram dos lugares menos esperados.',
          },
          {
            type: ContentType.PARAGRAPH,
            text: 'E assim, os ruins sobre os gigantes despertaram, e a luta contra eles culminou em uma guerra epocamente conhecida que deixaria cicatrizes que se manifestariam em eras futuras.',
          },
          {
            type: ContentType.PARAGRAPH,
            text: 'A jornada de Godfrey e Marika delineia não apenas uma busca por propósito, mas também um ecos e tragédias que viriam a seguir, o prenúncio da desordem que se aproximava.',
          },
          {
            type: ContentType.KEY_POINT,
            keyPointType: KeyPointType.QUOTE,
            text: "'A coroa que pertence a quem é forte não é meramente uma peça de ouro, mas um símbolo de sacrifício e responsabilidade.'",
            reference: 'Explorando a natureza do poder.',
          },
          {
            type: ContentType.PARAGRAPH,
            text: 'Quando a guerra finalmente se acalmou, o que restou foram as ruínas das conquistas e a compreensão de que o conflito estava longe de terminar, enquanto os antigos rivais se reagrupavam nas sombras.',
          },
        ],
      },
    ],
    categoryIds: [10, 4],
    createdAt: '2025-03-26T01:18:24.684Z',
    updatedAt: '2025-03-26T01:18:24.684Z',
  },
  {
    id: '2',
    title: 'A Coragem de Não Agradar',
    author: 'Ichiro Kishimi',
    imageUrl:
      'https://firebasestorage.googleapis.com/v0/b/flash-books-dev.appspot.com/o/booksImages%2F50ef2218-b913-44cb-b69f-771df02c8be7.webp?alt=media&token=8aeb45ff-a575-4c82-b0eb-59898362d96b',
    description:
      'Uma profunda discussão sobre a psicologia adleriana e como ela pode transformar nossas vidas, explorando a essência da liberdade e da felicidade.',
    chapters: [
      {
        title: 'A Primeira Noite',
        content: [
          {
            type: ContentType.PARAGRAPH,
            text: 'Na periferia da antiga cidade, um filósofo ensinava que o mundo é simples e que a felicidade está ao alcance de todos.',
          },
        ],
      },
    ],
    categoryIds: [14, 15, 16, 17],
    createdAt: '2025-03-26T01:14:27.234Z',
    updatedAt: '2025-03-26T01:14:27.234Z',
  },
  {
    id: '3',
    title: 'O Hobbit',
    author: 'J.R.R. Tolkien',
    imageUrl: 'https://placehold.co/160x230',
    description:
      'A história de Bilbo Bolseiro, um hobbit que embarca em uma aventura épica para ajudar um grupo de anões a recuperar seu tesouro.',
    chapters: [
      {
        title: 'Uma Festa Inesperada',
        content: [
          {
            type: ContentType.PARAGRAPH,
            text: 'Em um buraco no chão vivia um hobbit. Não um buraco nojento, sujo e úmido, cheio de restos de minhocas e com um cheiro viscoso, nem um buraco seco, arenoso e sem móveis onde você poderia se sentar: era um buraco-hobbit, e isso significa conforto.',
          },
        ],
      },
    ],
    categoryIds: [1, 2],
    createdAt: '2025-03-26T01:20:00.000Z',
    updatedAt: '2025-03-26T01:20:00.000Z',
  },
  {
    id: '4',
    title: '1984',
    author: 'George Orwell',
    imageUrl: 'https://placehold.co/160x230',
    description:
      'Uma distopia clássica que explora temas de vigilância governamental, manipulação da verdade e controle social.',
    chapters: [
      {
        title: 'Capítulo 1',
        content: [
          {
            type: ContentType.PARAGRAPH,
            text: 'Era um dia frio e brilhante de abril, e os relógios davam treze badaladas.',
          },
        ],
      },
    ],
    categoryIds: [5, 6],
    createdAt: '2025-03-26T01:22:00.000Z',
    updatedAt: '2025-03-26T01:22:00.000Z',
  },
  {
    id: '5',
    title: 'O Pequeno Príncipe',
    author: 'Antoine de Saint-Exupéry',
    imageUrl: 'https://placehold.co/160x230',
    description:
      'Uma história poética que aborda temas como amor, amizade e o sentido da vida através dos olhos de um príncipe de outro planeta.',
    chapters: [
      {
        title: 'Capítulo 1',
        content: [
          {
            type: ContentType.PARAGRAPH,
            text: 'Quando eu tinha seis anos, vi uma vez uma imagem extraordinária em um livro sobre a Floresta Virgem chamado Histórias Vividas.',
          },
        ],
      },
    ],
    categoryIds: [7, 8],
    createdAt: '2025-03-26T01:24:00.000Z',
    updatedAt: '2025-03-26T01:24:00.000Z',
  },
  {
    id: '6',
    title: 'O Senhor dos Anéis',
    author: 'J.R.R. Tolkien',
    imageUrl: 'https://placehold.co/160x230',
    description:
      'Uma épica jornada através da Terra-média para destruir o Um Anel e derrotar o Senhor das Trevas.',
    chapters: [
      {
        title: 'Uma Festa Longamente Esperada',
        content: [
          {
            type: ContentType.PARAGRAPH,
            text: 'Quando o Sr. Bilbo Bolseiro de Bolsão anunciou que em breve celebraria seu centésimo décimo primeiro aniversário com uma festa de especial magnificência, houve muita conversa e excitação em Hobbiton.',
          },
        ],
      },
    ],
    categoryIds: [1, 2],
    createdAt: '2025-03-26T01:26:00.000Z',
    updatedAt: '2025-03-26T01:26:00.000Z',
  },
  {
    id: '7',
    title: 'Harry Potter e a Pedra Filosofal',
    author: 'J.K. Rowling',
    imageUrl: 'https://placehold.co/160x230',
    description:
      'O início da jornada de Harry Potter no mundo mágico de Hogwarts.',
    chapters: [
      {
        title: 'O Menino que Sobreviveu',
        content: [
          {
            type: ContentType.PARAGRAPH,
            text: 'O Sr. e a Sra. Dursley, da rua dos Alfeneiros, nº 4, estavam orgulhosos de dizer que eram perfeitamente normais, muito bem, obrigado.',
          },
        ],
      },
    ],
    categoryIds: [1, 3],
    createdAt: '2025-03-26T01:28:00.000Z',
    updatedAt: '2025-03-26T01:28:00.000Z',
  },
  {
    id: '8',
    title: 'O Nome da Rosa',
    author: 'Umberto Eco',
    imageUrl: 'https://placehold.co/160x230',
    description:
      'Um mistério medieval em uma abadia beneditina, onde um monge franciscano investiga uma série de assassinatos.',
    chapters: [
      {
        title: 'Primeiro Dia',
        content: [
          {
            type: ContentType.PARAGRAPH,
            text: 'Era o fim de novembro. Uma manhã, no final do século XIV, Guilherme de Baskerville e eu chegamos à abadia.',
          },
        ],
      },
    ],
    categoryIds: [9, 10],
    createdAt: '2025-03-26T01:30:00.000Z',
    updatedAt: '2025-03-26T01:30:00.000Z',
  },
  {
    id: '9',
    title: 'O Processo',
    author: 'Franz Kafka',
    imageUrl: 'https://placehold.co/160x230',
    description:
      'A história de Josef K., que é preso e processado por um crime que não conhece, em um sistema judicial absurdo.',
    chapters: [
      {
        title: 'A Prisão',
        content: [
          {
            type: ContentType.PARAGRAPH,
            text: 'Alguém devia ter caluniado Josef K., pois uma manhã ele foi detido sem ter feito mal algum.',
          },
        ],
      },
    ],
    categoryIds: [11, 12],
    createdAt: '2025-03-26T01:32:00.000Z',
    updatedAt: '2025-03-26T01:32:00.000Z',
  },
  {
    id: '10',
    title: 'O Estrangeiro',
    author: 'Albert Camus',
    imageUrl: 'https://placehold.co/160x230',
    description:
      'A história de Meursault, um homem que mata um árabe e enfrenta o absurdo da existência.',
    chapters: [
      {
        title: 'Parte 1',
        content: [
          {
            type: ContentType.PARAGRAPH,
            text: 'Hoje, mamãe morreu. Ou talvez ontem, não sei bem.',
          },
        ],
      },
    ],
    categoryIds: [13, 14],
    createdAt: '2025-03-26T01:34:00.000Z',
    updatedAt: '2025-03-26T01:34:00.000Z',
  },
  {
    id: '11',
    title: 'A Metamorfose',
    author: 'Franz Kafka',
    imageUrl: 'https://placehold.co/160x230',
    description:
      'Gregor Samsa acorda uma manhã transformado em um inseto gigante.',
    chapters: [
      {
        title: 'Capítulo 1',
        content: [
          {
            type: ContentType.PARAGRAPH,
            text: 'Certa manhã, ao despertar de sonhos inquietos, Gregor Samsa encontrou-se em sua cama metamorfoseado em um inseto monstruoso.',
          },
        ],
      },
    ],
    categoryIds: [11, 12],
    createdAt: '2025-03-26T01:36:00.000Z',
    updatedAt: '2025-03-26T01:36:00.000Z',
  },
  {
    id: '12',
    title: 'O Mito de Sísifo',
    author: 'Albert Camus',
    imageUrl: 'https://placehold.co/160x230',
    description:
      'Um ensaio filosófico sobre o absurdo da existência e a busca pelo sentido da vida.',
    chapters: [
      {
        title: 'O Absurdo e o Suicídio',
        content: [
          {
            type: ContentType.PARAGRAPH,
            text: 'Não há senão um problema filosófico verdadeiramente sério: é o suicídio.',
          },
        ],
      },
    ],
    categoryIds: [13, 14],
    createdAt: '2025-03-26T01:38:00.000Z',
    updatedAt: '2025-03-26T01:38:00.000Z',
  },
  {
    id: '13',
    title: 'O Grande Gatsby',
    author: 'F. Scott Fitzgerald',
    imageUrl: 'https://placehold.co/160x230',
    description:
      'A história de Jay Gatsby e sua obsessão pelo passado e pelo amor perdido.',
    chapters: [
      {
        title: 'Capítulo 1',
        content: [
          {
            type: ContentType.PARAGRAPH,
            text: 'Em minha juventude e adolescência mais velha, meu pai me deu alguns conselhos que desde então giram em minha mente.',
          },
        ],
      },
    ],
    categoryIds: [15, 16],
    createdAt: '2025-03-26T01:40:00.000Z',
    updatedAt: '2025-03-26T01:40:00.000Z',
  },
  {
    id: '14',
    title: 'Lolita',
    author: 'Vladimir Nabokov',
    imageUrl: 'https://placehold.co/160x230',
    description:
      'A história controversa de Humbert Humbert e sua obsessão por Dolores Haze.',
    chapters: [
      {
        title: 'Parte 1',
        content: [
          {
            type: ContentType.PARAGRAPH,
            text: 'Lolita, luz de minha vida, fogo de minha virilidade.',
          },
        ],
      },
    ],
    categoryIds: [17, 18],
    createdAt: '2025-03-26T01:42:00.000Z',
    updatedAt: '2025-03-26T01:42:00.000Z',
  },
  {
    id: '15',
    title: 'O Sol é para Todos',
    author: 'Harper Lee',
    imageUrl: 'https://placehold.co/160x230',
    description:
      'A história de Atticus Finch e sua luta contra o racismo no sul dos Estados Unidos.',
    chapters: [
      {
        title: 'Capítulo 1',
        content: [
          {
            type: ContentType.PARAGRAPH,
            text: 'Meu irmão Jem, quando tinha treze anos, quebrou o braço na junta do cotovelo.',
          },
        ],
      },
    ],
    categoryIds: [19, 20],
    createdAt: '2025-03-26T01:44:00.000Z',
    updatedAt: '2025-03-26T01:44:00.000Z',
  },
];
