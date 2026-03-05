import LegalLayout from '../components/LegalLayout';

const toc = [
  { label: '¿Qué son las cookies?', anchor: 'que-son' },
  { label: 'Cookies que utilizamos', anchor: 'tipos' },
  { label: 'Cookies de terceros', anchor: 'terceros' },
  { label: 'Cómo gestionar las cookies', anchor: 'gestion' },
  { label: 'Consecuencias de desactivar cookies', anchor: 'consecuencias' },
  { label: 'Actualizaciones', anchor: 'actualizaciones' },
];

const sections = [
  {
    title: '¿Qué son las cookies?',
    content: [
      'Las cookies son pequeños archivos de texto que los sitios web almacenan en su dispositivo (ordenador, tablet o móvil) cuando los visita. Permiten que el sitio recuerde sus acciones y preferencias durante un período de tiempo, para que no tenga que volver a introducirlos cada vez que vuelva al sitio o navegue de una página a otra.',
      'Además de las cookies, también utilizamos tecnologías similares como el almacenamiento local (localStorage) y píxeles de seguimiento, que funcionan de forma parecida. En esta política nos referimos a todas estas tecnologías como "cookies" de forma colectiva.',
    ],
  },
  {
    title: 'Cookies que utilizamos',
    content: [
      'Cookies estrictamente necesarias (siempre activas): Son imprescindibles para el funcionamiento básico de la plataforma. Incluyen cookies de sesión, autenticación y seguridad. Sin ellas, la plataforma no puede funcionar correctamente. No requieren su consentimiento.',
      'Cookies de preferencias: Permiten recordar sus preferencias y configuración (como el idioma o la región). Mejoran su experiencia de uso sin recopilar datos de comportamiento.',
      'Cookies analíticas (requieren consentimiento): Nos ayudan a entender cómo interactúan los usuarios con la plataforma, qué páginas son más visitadas y cómo mejorar la experiencia. Utilizamos Google Analytics con anonimización de IP activada. Los datos son agregados y no permiten identificar a usuarios individuales.',
      'Cookies de marketing (requieren consentimiento): Utilizadas para mostrar publicidad relevante sobre eventos que puedan interesarle, tanto en nuestra plataforma como en sitios de terceros. También permiten medir la efectividad de nuestras campañas publicitarias.',
    ],
  },
  {
    title: 'Cookies de terceros',
    content: [
      'Algunos de nuestros socios pueden establecer cookies en su dispositivo cuando visita nuestra plataforma. A continuación listamos los principales:',
      'Google Analytics (analítica): Recopila datos de uso de forma anonimizada para mejorar la plataforma. Política de privacidad: policies.google.com/privacy',
      'Stripe (pagos): Necesario para el procesamiento seguro de pagos. Establece cookies de seguridad antifraude. Política de privacidad: stripe.com/privacy',
      'Facebook Pixel (marketing, opcional): Permite medir la efectividad de anuncios en Facebook e Instagram. Política de privacidad: facebook.com/privacy/policy',
      'Hotjar (experiencia de usuario, opcional): Genera mapas de calor y grabaciones de sesión anonimizadas para mejorar el diseño. Política de privacidad: hotjar.com/legal/privacy',
    ],
  },
  {
    title: 'Cómo gestionar las cookies',
    content: [
      'Panel de preferencias: Puede gestionar sus preferencias de cookies en cualquier momento haciendo clic en el enlace "Configurar cookies" disponible en el pie de página de la plataforma.',
      'Configuración del navegador: Puede configurar su navegador para aceptar o rechazar todas las cookies, o para que le avise cuando se envíe una cookie. Consulte la documentación de su navegador para más información: Chrome (support.google.com/chrome), Firefox (support.mozilla.org), Safari (support.apple.com), Edge (support.microsoft.com).',
      'Herramientas de opt-out de terceros: Para las cookies de Google Analytics puede usar el complemento de inhabilitación disponible en tools.google.com/dlpage/gaoptout. Para publicidad basada en intereses puede visitar youronlinechoices.eu.',
    ],
  },
  {
    title: 'Consecuencias de desactivar cookies',
    content: [
      'La desactivación de cookies estrictamente necesarias impedirá el correcto funcionamiento de la plataforma; no podrá iniciar sesión ni completar compras.',
      'La desactivación de cookies de preferencias hará que deba configurar sus preferencias en cada visita.',
      'La desactivación de cookies analíticas y de marketing no afecta a la funcionalidad de la plataforma, pero nos impide mejorar la experiencia y mostrarle contenido relevante.',
    ],
  },
  {
    title: 'Actualizaciones',
    content: [
      'Podemos actualizar esta Política de Cookies periódicamente para reflejar cambios en las cookies que utilizamos o por otros motivos operativos, legales o normativos. Le notificaremos cualquier cambio significativo a través de un aviso en la plataforma o por correo electrónico.',
      'Le recomendamos revisar esta política periódicamente para estar informado sobre el uso que hacemos de las cookies. La fecha de la última actualización se indica al inicio de este documento.',
      '¿Tiene preguntas sobre nuestra política de cookies? Escríbanos a privacidad@eventhub.com.',
    ],
  },
];

export default function CookiesPage() {
  return (
    <LegalLayout
      title="Política de Cookies"
      lastUpdated="1 de enero de 2024"
      intro="Esta Política de Cookies explica qué son las cookies, qué tipos utilizamos en EventHub, para qué las usamos y cómo puede gestionar sus preferencias. Su privacidad es importante para nosotros y queremos que comprenda exactamente cómo utilizamos estas tecnologías."
      sections={sections}
      toc={toc}
    />
  );
}
