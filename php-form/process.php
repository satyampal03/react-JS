<?php
// 1. Connect to MySQL
$conn = mysqli_connect("localhost", "root", "", "contact_form_db");

if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

// 2. Get form data
$name = $_POST["name"];
$email = $_POST["email"];
$message = $_POST["message"];

// 3. Validate data (basic)
if (!empty($name) && !empty($email) && !empty($message)) {

    // 4. Prepare SQL query to insert data into the table
    $sql = "INSERT INTO contacts (name, email, message) 
            VALUES ('$name', '$email', '$message')";

    // 5. Execute the query and check if it was successful
    if (mysqli_query($conn, $sql)) {
        echo "<h2>Thank you, $name!</h2>";
        echo "<p>Email: $email</p>";
        echo "<p>Message: $message</p>";
    } else {
        echo "Error: " . mysqli_error($conn);
    }

} else {
    echo "All fields are required.";
}

// 6. Close the connection
mysqli_close($conn);
?>
