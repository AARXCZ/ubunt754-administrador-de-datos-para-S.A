 const form = document.getElementById('uploadForm');
    const tableBody = document.getElementById('fileTableBody');

    form.addEventListener('submit', async function (e) {
      e.preventDefault();
      const formData = new FormData(form);

      const response = await fetch('subir.php', {
        method: 'POST',
        body: formData
      });

      const result = await response.json();

      if (result.success) {
        const row = document.createElement('tr');
        const fecha = new Date().toLocaleDateString();

        row.innerHTML = `
          <td>${tableBody.children.length + 1}</td>
          <td>${result.filename}</td>
          <td>${formData.get('comentario')}</td>
          <td>${fecha}</td>
          <td><a href="${result.filepath}" download>Descargar</a></td>
        `;
        tableBody.appendChild(row);
        form.reset();
      } else {
        alert('Error: ' + result.error);
      }
    });