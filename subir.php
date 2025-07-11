<?php
$response = ['success' => false];

if (isset($_FILES['archivo'])) {
    $uploadDir = 'uploads/';
    if (!is_dir($uploadDir)) {
        mkdir($uploadDir, 0777, true);
    }

    $nombreOriginal = basename($_FILES['archivo']['name']);
    $rutaFinal = $uploadDir . time() . "_" . $nombreOriginal;

    if (move_uploaded_file($_FILES['archivo']['tmp_name'], $rutaFinal)) {
        $response['success'] = true;
        $response['filename'] = $nombreOriginal;
        $response['filepath'] = $rutaFinal;
    } else {
        $response['error'] = 'Error al mover el archivo';
    }
} else {
    $response['error'] = 'No se recibió archivo';
}

header('Content-Type: application/json');
echo json_encode($response);
