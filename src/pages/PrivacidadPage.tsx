import LegalLayout from '../components/LegalLayout';

const toc = [
  { label: 'Responsable del tratamiento', anchor: 'responsable' },
  { label: 'Datos que recopilamos', anchor: 'datos' },
  { label: 'Finalidad del tratamiento', anchor: 'finalidad' },
  { label: 'Base legal', anchor: 'base-legal' },
  { label: 'Conservación de datos', anchor: 'conservacion' },
  { label: 'Compartición con terceros', anchor: 'terceros' },
  { label: 'Transferencias internacionales', anchor: 'transferencias' },
  { label: 'Tus derechos', anchor: 'derechos' },
  { label: 'Seguridad', anchor: 'seguridad' },
  { label: 'Contacto DPO', anchor: 'dpo' },
];

const sections = [
  {
    title: 'Responsable del tratamiento',
    content: [
      'El responsable del tratamiento de sus datos personales es EventHub S.L., con NIF B-12345678, domicilio social en Calle de Alcalá 12, 28014 Madrid, España, e inscrita en el Registro Mercantil de Madrid.',
      'Puede contactar con nuestro equipo de privacidad en cualquier momento escribiendo a privacidad@eventhub.com.',
    ],
  },
  {
    title: 'Datos que recopilamos',
    content: [
      'Datos de registro: nombre, apellidos, dirección de correo electrónico, contraseña (almacenada de forma cifrada) y número de teléfono opcional.',
      'Datos de compra: información de facturación, historial de entradas adquiridas, método de pago (no almacenamos datos completos de tarjeta; el procesamiento lo realiza nuestro proveedor certificado PCI-DSS).',
      'Datos de uso: páginas visitadas, eventos consultados, búsquedas realizadas, dispositivo y navegador utilizados, dirección IP y datos de geolocalización aproximada.',
      'Comunicaciones: cualquier mensaje enviado a través de nuestro formulario de contacto o al correo de soporte.',
    ],
  },
  {
    title: 'Finalidad del tratamiento',
    content: [
      'Gestión de la cuenta de usuario y prestación de los servicios contratados, incluyendo la compra y entrega de entradas.',
      'Procesamiento de pagos y prevención del fraude.',
      'Envío de comunicaciones transaccionales (confirmaciones de compra, recordatorios de eventos, cambios o cancelaciones).',
      'Con su consentimiento expreso, envío de comunicaciones comerciales sobre eventos, ofertas y novedades de EventHub.',
      'Mejora de la plataforma mediante el análisis agregado y anonimizado del comportamiento de los usuarios.',
      'Cumplimiento de obligaciones legales, fiscales y contables.',
    ],
  },
  {
    title: 'Base legal',
    content: [
      'Ejecución del contrato: el tratamiento necesario para gestionar su cuenta y procesar sus compras se basa en la relación contractual entre usted y EventHub (art. 6.1.b RGPD).',
      'Consentimiento: para el envío de comunicaciones comerciales y para el uso de cookies no esenciales, solicitamos su consentimiento expreso, que puede retirar en cualquier momento (art. 6.1.a RGPD).',
      'Interés legítimo: para la prevención del fraude, la seguridad de la plataforma y el análisis agregado de uso (art. 6.1.f RGPD).',
      'Obligación legal: para el cumplimiento de obligaciones fiscales y contables (art. 6.1.c RGPD).',
    ],
  },
  {
    title: 'Conservación de datos',
    content: [
      'Los datos de cuenta se conservan mientras la cuenta permanezca activa y durante un período adicional de 5 años tras su eliminación, por obligaciones legales y fiscales.',
      'Los datos de compra se conservan durante 10 años conforme a la legislación fiscal española.',
      'Los datos de comunicaciones de soporte se conservan durante 3 años desde la última interacción.',
      'Los datos de uso con fines analíticos se anonomizan a los 26 meses.',
    ],
  },
  {
    title: 'Compartición con terceros',
    content: [
      'No vendemos ni cedemos sus datos personales a terceros con fines comerciales. Compartimos datos únicamente con los siguientes tipos de proveedores de servicios, bajo contratos de encargado del tratamiento conformes al RGPD:',
      'Proveedores de pago (Stripe, PayPal) para el procesamiento de transacciones. Servicios de email transaccional (SendGrid) para el envío de confirmaciones. Servicios de analítica (Google Analytics con anonimización de IP activada). Organizadores de eventos, exclusivamente los datos necesarios para la gestión del acceso al evento (nombre y código QR).',
    ],
  },
  {
    title: 'Transferencias internacionales',
    content: [
      'Algunos de nuestros proveedores pueden procesar datos fuera del Espacio Económico Europeo. En estos casos, nos aseguramos de que existan garantías adecuadas conforme al RGPD, como cláusulas contractuales tipo aprobadas por la Comisión Europea.',
    ],
  },
  {
    title: 'Tus derechos',
    content: [
      'En virtud del RGPD y la LOPDGDD, usted tiene los siguientes derechos sobre sus datos personales:',
      'Acceso: obtener confirmación de si tratamos sus datos y recibir una copia de los mismos. Rectificación: solicitar la corrección de datos inexactos. Supresión ("derecho al olvido"): solicitar la eliminación de sus datos cuando ya no sean necesarios. Limitación: solicitar la restricción del tratamiento en determinadas circunstancias. Portabilidad: recibir sus datos en formato estructurado y legible por máquina. Oposición: oponerse al tratamiento basado en interés legítimo o para fines de marketing directo.',
      'Para ejercer cualquiera de estos derechos, puede escribir a privacidad@eventhub.com adjuntando una copia de su documento de identidad. Responderemos en el plazo máximo de 30 días. Si considera que sus derechos no han sido atendidos, puede presentar una reclamación ante la Agencia Española de Protección de Datos (www.aepd.es).',
    ],
  },
  {
    title: 'Seguridad',
    content: [
      'Implementamos medidas técnicas y organizativas apropiadas para proteger sus datos personales contra el acceso no autorizado, la pérdida o la alteración. Entre otras medidas: cifrado TLS en todas las comunicaciones, cifrado de contraseñas con bcrypt, acceso restringido a datos personales para el personal, y auditorías de seguridad periódicas.',
      'En caso de violación de seguridad que pueda suponer un riesgo para sus derechos, le notificaremos en el plazo legalmente establecido.',
    ],
  },
  {
    title: 'Contacto DPO',
    content: [
      'Hemos designado un Delegado de Protección de Datos (DPO) al que puede dirigirse para cualquier consulta relativa al tratamiento de sus datos personales.',
      'Contacto DPO: dpo@eventhub.com · EventHub S.L., Att. DPO, Calle de Alcalá 12, 28014 Madrid, España.',
    ],
  },
];

export default function PrivacidadPage() {
  return (
    <LegalLayout
      title="Política de Privacidad"
      lastUpdated="1 de enero de 2024"
      intro="En EventHub nos tomamos muy en serio la protección de sus datos personales. Esta Política de Privacidad describe cómo recopilamos, usamos y protegemos su información cuando utiliza nuestra plataforma, de conformidad con el Reglamento General de Protección de Datos (RGPD) y la Ley Orgánica 3/2018 de Protección de Datos Personales (LOPDGDD)."
      sections={sections}
      toc={toc}
    />
  );
}
