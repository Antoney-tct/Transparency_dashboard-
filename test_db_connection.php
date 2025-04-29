<?php
// Include the database connection file
require_once 'db_connect.php';

// Test if connection is successful
if ($conn) {
    echo "<h2>Database Connection Test</h2>";
    echo "<p>Database connection successful!</p>";
    echo "<p>Connected to: <strong>" . DB_NAME . "</strong> on <strong>" . DB_SERVER . "</strong></p>";
    echo "<p>Character set: <strong>" . $conn->character_set_name() . "</strong></p>";
    
    // Test a simple query
    $test_query = "SHOW TABLES";
    $result = $conn->query($test_query);
    
    if ($result) {
        echo "<h3>Tables in the database:</h3>";
        if ($result->num_rows > 0) {
            echo "<ul>";
            while ($row = $result->fetch_array()) {
                echo "<li>" . $row[0] . "</li>";
            }
            echo "</ul>";
        } else {
            echo "<p>No tables found in the database.</p>";
        }
        $result->free();
    } else {
        echo "<p style='color:red'>Error executing query: " . $conn->error . "</p>";
    }
    
    // Close the connection
    $conn->close();
    echo "<p>Connection closed.</p>";
} else {
    echo "<p style='color:red'>Failed to connect to the database.</p>";
}
?>
