<?php
require 'db_connection.php';

header('Content-Type: text/plain; charset=utf-8');

try {
    // Get all tables
    $tables = $conn->query("SHOW TABLES")->fetchAll(PDO::FETCH_COLUMN);
    
    foreach ($tables as $table) {
        echo "TABLE: $table\n";
        echo str_repeat("=", 50) . "\n";
        
        // Get table structure
        $structure = $conn->query("DESCRIBE $table")->fetchAll();
        echo "STRUCTURE:\n";
        print_r($structure);
        
        // Get first 5 rows
        $data = $conn->query("SELECT * FROM $table LIMIT 5")->fetchAll();
        echo "SAMPLE DATA:\n";
        print_r($data);
        
        echo "\n\n";
    }
} catch (PDOException $e) {
    die("Error: " . $e->getMessage());
}