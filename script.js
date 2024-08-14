// Array vacío llamado asistencia que se utilizará para almacenar los datos de asistencia de cada persona.
let asistencia = [];

// Función para agregar un nuevo nombre a la lista que ya se tiene
function agregarNombre() {
  const nombre = document.getElementById('nombre').value.trim();
  if (nombre !== '') {
    asistencia.push({ nombre, asistio: false });
    actualizarLista();
    document.getElementById('nombre').value = '';
  }
}

// Función para actualizar la lista de asistencia
function actualizarLista() {
  const lista = document.getElementById('lista-asistencia');
  lista.innerHTML = '';
  asistencia.forEach((persona, index) => {
    const li = document.createElement('li');
    li.innerHTML = `
      <span class="nombre">${persona.nombre}</span>
      <span class="asistencia">
        <input type="radio" id="asistio-${index}" name="asistio-${index}" value="si">
        <label for="asistio-${index}">Sí</label>
        <input type="radio" id="no-asistio-${index}" name="asistio-${index}" value="no">
        <label for="no-asistio-${index}">No</label>
      </span>
      <button class="borrar" data-index="${index}">Borrar</button>
    `;
    lista.appendChild(li);
  });
}

// Función para borrar un nombre de la lista
function borrarNombre(index) {
  asistencia.splice(index, 1);
  actualizarLista();
}

// Función para exportar la lista de asistencia a un archivo TXT
function exportarLista() {
    const texto = asistencia.map((persona, index) => {
      const asistio = document.querySelector(`input[name="asistio-${index}"]:checked`).value;
      return `${persona.nombre}: ${asistio === 'si' ? 'Sí' : 'No'}`;
    }).join('\n');
    const blob = new Blob([texto], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'Asistencia.txt';
    link.click();
  }

// Eventos de agregar un nombre, exportar la lista 
document.getElementById('agregar').addEventListener('click', agregarNombre);
document.getElementById('exportar').addEventListener('click', exportarLista);
document.getElementById('lista-asistencia').addEventListener('click', (e) => {
  if (e.target.classList.contains('borrar')) {
    borrarNombre(e.target.dataset.index);
  }
});

// Cargar datos iniciales
if (localStorage.getItem('asistencia')) {
  asistencia = JSON.parse(localStorage.getItem('asistencia'));
  actualizarLista();
}

// Guardar datos en localStorage
window.addEventListener('beforeunload', () => {
  localStorage.setItem('asistencia', JSON.stringify(asistencia));
});