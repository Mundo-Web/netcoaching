import React from "react"

const Details = ({ coachee, coach, process_topic, start_date, session_frequency, sessions, session_duration, total_amount, day, time, location, ...props }) => {
  const days = {
    'L': 'Lunes',
    'M': 'Martes',
    'X': 'Miércoles',
    'J': 'Jueves',
    'V': 'Viernes',
    'S': 'Sábado',
    'D': 'Domingo'
  }
  const frequencies = {
    'weekly': 'Semanal',
    'biweekly': 'Quincenal',
    'monthly': 'Mensual'
  }
  const calculateNewDate = (initialDate, range, quantity) => {
    if (!moment.isMoment(initialDate)) {
      return console.error('initialDate debe ser un objeto Moment válido');
    }

    if (!Object.keys(frequencies).includes(range)) {
      return console.error("range debe ser 'weekly', 'biweekly', o 'monthly'");
    }

    if (!Number.isInteger(quantity) || quantity < 0) {
      return console.error('quantity debe ser un número entero no negativo');
    }

    let newDate = initialDate.clone();

    switch (range) {
      case 'weekly':
        newDate.add(7 * (quantity - 1), 'days');
        break;
      case 'biweekly':
        newDate.add(14 * (quantity - 1), 'days');
        break;
      case 'monthly':
        newDate.add((quantity - 1), 'months');
        break;
    }

    return newDate.format('dddd, LL');
  }
  return <>
    <h2 className="text-center mt-0">ACUERDO DEL PROCESO DE COACHING</h2>
    <h4>
      Señor(a)/ Señorita:<br />
      Estimado(a): <strong>{coachee?.name} {coachee?.lastname}</strong>
    </h4>
    <h4 className='mt-2'><strong>Tema:</strong> {process_topic}</h4>

    <p>Es una gran satisfacción empezar a trabajar contigo como tu coach y que pongamos en marcha todo tu potencial para que obtengas las metas que te propongas. Juntos vamos a descubrir y/o confirmar qué quieres realmente y la manera de lograrlo. Se trata de poner en juego tus habilidades para que tengas más éxito con lo que deseas; establecerás nuevos compromisos y si lo eliges, yo te acompañaré hasta lograrlos; mi compromiso es con tu compromiso. ¡Tú eres el protagonista de esta relación!</p>

    <p>Tener un claro <b>Acuerdo de Coaching</b> establece los cimientos para nuestro trabajo. Los elementos y desarrollo del mismo los detallo a continuación:</p>

    <h3 className="mt-2">¿Qué es Coaching?</h3>
    <p>Es una metodología que apoya al coachée a lograr resultados específicos en las áreas que decida. A través de la escucha activa y de una conversación respetuosa que se lleva a cabo bajo los marcos de la libertad, respeto y confidencialidad, siguiendo, además, las pautas y las técnicas propias del Coaching, se busca expandir las habilidades para realizar importantes cambios, avances y resultados. Los servicios de Coaching no deben de confundirse con, ni ser un sustituto de terapia, mentoría, consejería, asesoría o diagnóstico legal o médico.</p>

    <h3 className="mt-2">Compromisos y Acuerdos</h3>
    <div className="row">
      <div>
        <h4>Como coach, puedes esperar de mí:</h4>
        <ol>
          <li>Que te proporcione una relación de Coaching abierta, honesta, profesional y comprometida.</li>
          <li>Un socio que te ayude a sacar lo mejor, lo más profundo, lo verdadero y auténtico de ti.</li>
          <li>Una persona que te proporcione seguridad, soporte, apoyo y un entorno en el que te permitas reflexionar, explorar y crear. Las sesiones son espacios personales para ti.</li>
          <li>Que te brinde un marco de relación sustentada en el respeto, libertad, reserva y confidencialidad de cada una de nuestras sesiones.</li>
          <li>Que expanda tu visión de lo que es posible y que te ayude a descubrir nuevos puntos de vista a través de la toma de consciencia y reflexión.</li>
          <li>Que te dé información y un feedback claro, directo y sincero.</li>
          <li>Que evitaré aconsejarte y dejar de lado mis juicios y posiciones personales respecto a tus creencias, conductas y comportamientos.</li>
          <li>Que haré mi mayor esfuerzo y compromiso para hacer de esto una relación satisfactoria, exitosa y fructífera.</li>
        </ol>
      </div>
      <div >
        <h4>Como cliente/coachée, espero de ti:</h4>
        <ol>
          <li>Que cultives una honestidad total contigo misma.</li>
          <li>Que te comprometas contigo misma para lograr resultados que sean realmente importantes y relevantes para ti.</li>
          <li>Que te atrevas a hacer las cosas de maneras diferentes y que practiques nuevos comportamientos si así lo consideras pertinente y adecuado para tu desarrollo personal y profesional.</li>
          <li>Que me proporciones feedback acerca de mi actuación como coach y de las sesiones de coaching y cómo éstas tienen valor y significado para ti.</li>
          <li>Que te sientas en la libertad de mencionar tus puntos de vista y opiniones, o de discrepar si así lo consideras, respecto a la información o comentarios que te pueda proporcionar durante las sesiones.</li>
          <li>Que hagas tuyos tus progresos y tus logros.</li>
          <li>Que te reconozcas generosamente cada vez que logres metas y objetivos aunque sean pequeños.</li>
        </ol>
      </div>
    </div>

    <h3 className="mt-2">Naturaleza de la relación de Coaching</h3>
    <p>Comienzas este proceso de Coaching sabiendo que tú tienes el poder y la capacidad de crear lo que quieres para ti, así como la sabiduría para tomar las mejores decisiones y como elegir los caminos y medios para lograr tus resultados, yo te acompañaré y seré tu socio en todo esto; en mi rol de coach me comprometo a dar lo mejor de mí, actuando profesionalmente, siempre enfocado en tus objetivos. Esto significa que solo tú eres responsable de tus resultados y de los que se deriven directa o indirectamente de esta relación de coaching.</p>

    <h3 className="mt-2">Condiciones para el proceso de Coaching</h3>
    <p>Hemos acordado para este proceso sujetarnos a las condiciones que se mencionan a continuación:</p>
    <div className="mb-1">
      <strong className="me-1">Fecha de inicio:</strong>
      {moment(start_date).format('dddd, LL')}
    </div>
    <div className="mb-1">
      <strong className="me-1">Fecha de fin:</strong>
      {calculateNewDate(moment(start_date), session_frequency, sessions)}
    </div>
    <div className="mb-1">
      <strong className="me-1">Cantidad de sesiones:</strong>
      {sessions}
    </div>
    <div className="mb-1">
      <strong className="me-1">Duración de cada sesión:</strong>
      {session_duration} horas
    </div>
    <div className="mb-1">
      <strong className="me-1">Frecuencia:</strong>
      {frequencies[session_frequency]}
    </div>
    <div className="mb-1">
      <strong className="me-1">Monto:</strong>
      USD {Number(total_amount).toFixed(2)}
    </div>
    <div className="mb-1">
      <strong className="me-1">Día:</strong>
      {days[day]}
    </div>
    <div className="mb-1">
      <strong className="me-1">Horario:</strong>
      {moment(time, 'HH:mm:ss').format('HH:mm')}
    </div>
    <div className="mb-1">
      <strong className="me-1">Lugar:</strong>
      {
        ['http://', 'https://'].some(x => String(location).startsWith(x))
          ? <a href={location} target="_blank" rel="noopener noreferrer">{location}</a>
          : location
      }
    </div>

    <h3 className="mt-2">Otros aspectos importantes</h3>
    <h4>Modificación de horarios:</h4>
    <p>Si surgiera algún cambio o impedimento de último momento, por favor avísame con 3 de anticipación por lo menos y coordinaremos una nueva cita, yo por mi parte haré lo mismo; de no mediar aviso previo, la sesión programada se considerará como brindada.</p>
    <p>También es necesario que tomes las previsiones adecuadas para asistir con toda puntualidad a nuestras citas, cualquier demora o retraso cuenta dentro del tiempo de la sesión misma.</p>

    <h4>Espacio entre las sesiones:</h4>
    <p>Para asegurar de obtener el máximo provecho a esta experiencia, te invito a venir a cada sesión preparado con los puntos que quieres tratar. Asimismo, es importante que puedas destinar un tiempo entre las sesiones, para valorar el progreso que has hecho desde la última reunión y en el proceso en general, para luego considerar cómo quieres utilizar la siguiente sesión. Para ello puedes ayudarte empleando las siguientes preguntas:</p>
    <ul>
      <li>¿Qué progresos he realizado desde mi última sesión?</li>
      <li>¿Qué desafíos u obstáculos se me presentaron? ¿Cómo los manejé? ¿Cuáles necesito todavía resolver?</li>
      <li>¿Qué nuevas ideas u oportunidades han surgido?</li>
      <li>¿En qué quiero concentrarme en la sesión siguiente?</li>
    </ul>

    <h4>Relación coach-coachee:</h4>
    <p>La honestidad y la confianza son piezas fundamentales en toda relación de Coaching, por lo que como tu coach espero y deseo que siempre me hables sinceramente de todo lo que va bien en la relación de coaching, de todo lo que no te gusta y lo que se podría mejorar o cambiar. Me comprometo contigo a hacer todo lo que esté a mi alcance para satisfacer tus necesidades y expectativas.</p>

    <p className="mt-2">El acuerdo supone la aceptación y compromiso del coachée en cada uno de sus términos y condiciones.</p>

    <h4 className="mt-2">Yo, Carlos Manuel Gamboa Palomino, he leído el presente acuerdo y estoy conforme en todas sus partes.</h4>
    <p>Lima, {moment().format('dddd LL')}.</p>

    <div className="row mt-5">
      <div className="col-md-6">
        <div className="border-top pt-2">
          <p className="text-center mb-1">{coachee?.name} {coachee?.lastname}</p>
          <p className="text-center mb-0"><strong>Coachee</strong></p>
        </div>
      </div>
      <div className="col-md-6">
        <div className="border-top pt-2">
          <p className="text-center mb-1">{coach?.name} {coach?.lastname}</p>
          <p className="text-center mb-0"><strong>Coach</strong></p>
        </div>
      </div>
    </div>
  </>
}

export default Details