<?php
$uploadDir = './uploads/';
$baseUrl = 'https://tudominio.com/uploads/';  // Cambia por tu dominio real

if (!is_dir($uploadDir)) {
    mkdir($uploadDir, 0777, true);
}

if (isset($_FILES['archivo'])) {
    $file = $_FILES['archivo'];
    $fileName = basename($file['name']);
    $uploadFile = $uploadDir . $fileName;

    // Validar tipo de archivo (opcional)
    $allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (!in_array($file['type'], $allowedTypes)) {
        http_response_code(400);
        echo json_encode([
            'status' => 'error',
            'message' => 'Tipo de archivo no permitido. Solo JPEG, PNG o GIF.'
        ]);
        exit;
    }

    // Mover el archivo al directorio destino
    if (move_uploaded_file($file['tmp_name'], $uploadFile)) {
        $fileUrl = $baseUrl . urlencode($fileName); // Codifica espacios, etc.
        echo json_encode([
            'status' => 'success',
            'url' => $fileUrl
        ]);
    } else {
        http_response_code(500);
        echo json_encode([
            'status' => 'error',
            'message' => 'Error al mover el archivo al servidor'
        ]);
    }
} else {
    http_response_code(400);
    echo json_encode([
        'status' => 'error',
        'message' => 'No se recibió ningún archivo'
    ]);
}
?>