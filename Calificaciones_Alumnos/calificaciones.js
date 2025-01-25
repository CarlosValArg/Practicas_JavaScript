const formularioAlumnos = document.getElementById('formularioAlumnos');
const tableBody = document.getElementById('tableBody');
const alumnos = [];

formularioAlumnos.addEventListener('submit', function (event) {
    event.preventDefault();

    const firstName = document.getElementById('firstName').value.trim().toUpperCase();
    const lastName = document.getElementById('lastName').value;
    const grade = document.getElementById('grade').value;
    const primerLetra = firstName.charAt(0);
    const ultimaLetra = firstName.substring(firstName.length - 1);

    const alumno = {
        nombre: firstName,
        primerLetra: primerLetra,
        ultimaLetra: ultimaLetra,
        apellido: lastName,
        longitudApellido: lastName.length,
        calificacion: grade
    };

    alumnos.push(alumno);

    const fila = document.createElement('tr');
    fila.innerHTML = `
    <td>${firstName} (${primerLetra}-${ultimaLetra})</td>
    <td>${lastName} (${alumno.longitudApellido} letras)</td>
    <td>${grade}</td>
      `;
    tableBody.appendChild(fila);

    console.log(alumnos);

    formularioAlumnos.reset();
});