import LegalLayout from '../components/LegalLayout';

const toc = [
  { label: 'Aceptación de los términos', anchor: 'aceptacion' },
  { label: 'Descripción del servicio', anchor: 'servicio' },
  { label: 'Registro y cuenta de usuario', anchor: 'registro' },
  { label: 'Compra de entradas', anchor: 'compra' },
  { label: 'Política de cancelación y reembolsos', anchor: 'cancelacion' },
  { label: 'Conducta del usuario', anchor: 'conducta' },
  { label: 'Propiedad intelectual', anchor: 'propiedad' },
  { label: 'Limitación de responsabilidad', anchor: 'responsabilidad' },
  { label: 'Modificaciones', anchor: 'modificaciones' },
  { label: 'Contacto', anchor: 'contacto-legal' },
];

const sections = [
  {
    title: 'Aceptación de los términos',
    content: [
      'Al acceder y utilizar la plataforma EventHub, usted acepta estar vinculado por estos Términos y Condiciones de Uso, así como por nuestra Política de Privacidad y Política de Cookies.',
      'Si no está de acuerdo con alguno de estos términos, le rogamos que no utilice nuestros servicios. El uso continuado de la plataforma tras la publicación de cambios en estos términos implicará su aceptación de dichos cambios.',
      'Estos términos constituyen un acuerdo legalmente vinculante entre usted y EventHub S.L., con domicilio social en Calle de Alcalá 12, 28014 Madrid, España.',
    ],
  },
  {
    title: 'Descripción del servicio',
    content: [
      'EventHub es una plataforma digital que conecta a organizadores de eventos con compradores de entradas. Actuamos como intermediarios y no somos los organizadores directos de ningún evento publicado en nuestra plataforma.',
      'Nuestros servicios incluyen: la publicación y promoción de eventos, la venta y gestión de entradas, el procesamiento de pagos, el sistema de control de acceso mediante códigos QR y las herramientas de análisis para organizadores.',
      'Nos reservamos el derecho de modificar, suspender o discontinuar cualquier aspecto del servicio en cualquier momento, sin previo aviso y sin incurrir en responsabilidad hacia usted.',
    ],
  },
  {
    title: 'Registro y cuenta de usuario',
    content: [
      'Para acceder a determinadas funciones de la plataforma es necesario crear una cuenta. Usted es responsable de mantener la confidencialidad de sus credenciales de acceso y de todas las actividades realizadas bajo su cuenta.',
      'Debe proporcionar información veraz, completa y actualizada durante el proceso de registro. EventHub se reserva el derecho de suspender o eliminar cuentas que proporcionen información falsa o que incumplan estos términos.',
      'Debe notificarnos inmediatamente en caso de uso no autorizado de su cuenta o cualquier otra violación de seguridad a través de soporte@eventhub.com.',
    ],
  },
  {
    title: 'Compra de entradas',
    content: [
      'Todas las compras realizadas a través de EventHub están sujetas a disponibilidad. Los precios mostrados incluyen IVA y los gastos de gestión, que se detallan claramente antes de confirmar la compra.',
      'Una vez confirmado el pago, recibirá sus entradas por correo electrónico en formato PDF con un código QR único e intransferible. EventHub no se hace responsable de entradas perdidas o dañadas una vez entregadas.',
      'Las entradas adquiridas son válidas únicamente para la fecha, hora y lugar indicados. EventHub no garantiza la validez de entradas adquiridas a través de terceros no autorizados.',
    ],
  },
  {
    title: 'Política de cancelación y reembolsos',
    content: [
      'Los reembolsos están sujetos a la política de cancelación de cada organizador, que se muestra claramente en la página de cada evento. En caso de cancelación del evento por parte del organizador, se emitirá un reembolso completo del importe pagado.',
      'Para solicitar un reembolso cuando la política del evento lo permita, debe hacerlo a través de su área de cliente al menos 24 horas antes del inicio del evento. Los reembolsos se procesan en un plazo de 5 a 7 días laborables.',
      'Los gastos de gestión no son reembolsables salvo en caso de cancelación del evento por el organizador.',
    ],
  },
  {
    title: 'Conducta del usuario',
    content: [
      'Usted se compromete a utilizar la plataforma únicamente con fines lícitos y de acuerdo con estos términos. Queda expresamente prohibido: intentar acceder sin autorización a sistemas o redes vinculados a la plataforma, realizar actos de compra masiva de entradas con fines especulativos (scalping), o publicar contenido falso, difamatorio o que infrinja derechos de terceros.',
      'Nos reservamos el derecho de retirar, sin previo aviso, cualquier contenido que consideremos que incumple estos términos o que resulta inapropiado por cualquier otro motivo.',
    ],
  },
  {
    title: 'Propiedad intelectual',
    content: [
      'Todos los contenidos de la plataforma EventHub, incluyendo textos, gráficos, logotipos, iconos, imágenes y software, son propiedad de EventHub S.L. o de sus proveedores de contenido y están protegidos por las leyes de propiedad intelectual aplicables.',
      'Se concede una licencia limitada, no exclusiva y revocable para acceder y utilizar la plataforma con fines personales y no comerciales. Queda prohibida cualquier reproducción, distribución o uso comercial sin autorización expresa por escrito.',
    ],
  },
  {
    title: 'Limitación de responsabilidad',
    content: [
      'EventHub actúa como intermediario entre organizadores y compradores. En la máxima medida permitida por la ley aplicable, EventHub no será responsable de daños indirectos, incidentales, especiales o consecuentes derivados del uso o la imposibilidad de uso de la plataforma.',
      'Nuestra responsabilidad total hacia usted por cualquier reclamación derivada del uso de la plataforma no superará el importe que usted haya pagado a través de nuestros servicios en los últimos doce meses.',
    ],
  },
  {
    title: 'Modificaciones',
    content: [
      'EventHub se reserva el derecho de modificar estos Términos y Condiciones en cualquier momento. Las modificaciones entrarán en vigor en el momento de su publicación en la plataforma.',
      'Le notificaremos los cambios significativos por correo electrónico o mediante un aviso destacado en la plataforma. El uso continuado de nuestros servicios tras la notificación implica la aceptación de los nuevos términos.',
    ],
  },
  {
    title: 'Contacto',
    content: [
      'Para cualquier consulta relacionada con estos Términos y Condiciones, puede contactarnos a través de legal@eventhub.com o escribirnos a nuestra dirección postal: EventHub S.L., Calle de Alcalá 12, 28014 Madrid, España.',
      'También puede utilizar el formulario de contacto disponible en nuestra plataforma en la sección de Contacto y Soporte.',
    ],
  },
];

export default function TerminosPage() {
  return (
    <LegalLayout
      title="Términos y Condiciones"
      lastUpdated="1 de enero de 2024"
      intro="Bienvenido a EventHub. Estos Términos y Condiciones regulan el acceso y uso de nuestra plataforma de venta de entradas y gestión de eventos. Le rogamos que los lea detenidamente antes de utilizar nuestros servicios."
      sections={sections}
      toc={toc}
    />
  );
}
