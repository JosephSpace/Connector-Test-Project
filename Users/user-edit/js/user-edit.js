//db.php
<?php
$connect = new PDO("mysql:host=localhost;dbname=testingdb", "root", "");
?>


//list.php
<?php  
include('db.php');
 
$query = "SELECT * FROM tbl_user ORDER BY userid DESC";
$statement = $connect->prepare($query);
if($statement->execute())
{
  while($row = $statement->fetch(PDO::FETCH_ASSOC))
  {
    $data[] = $row;
  }
  echo json_encode($data);
}
 
?>




//insert_update.php
<?php
include('db.php');
 
$message = '';
 
$form_data = json_decode(file_get_contents("php://input"));
  
if ($form_data->txtid == '0') {
 
    $data = array(
     ':txtname'  => $form_data->txtname,
     ':txtusername'  => $form_data->txtusername
    ); 
         
    $query = "
     INSERT INTO tbl_user 
     (fullname, username) VALUES 
     (:txtname, :txtusername)
    ";
 
    $statement = $connect->prepare($query);
 
    if($statement->execute($data))
    {
     $message = 'Data Inserted';
    }else {
     $message = 'Error';    
    }   
}else {
     
    $data = array(
     ':txtname'  => $form_data->txtname,
     ':txtusername'  => $form_data->txtusername,
     ':txtid'  => $form_data->txtid
    ); 
     
    $query = "
     UPDATE tbl_user 
     SET fullname = :txtname, username = :txtusername 
     WHERE userid = :txtid
    ";
 
    $statement = $connect->prepare($query);
    if($statement->execute($data))
    {
     $message = 'Data Edited';
    }
}   
echo $message; 
?>



/delete.php
<?php
include('db.php');
 
$message = '';
 
$data = json_decode(file_get_contents("php://input"));
$id = $data->id;  
$query = "DELETE FROM tbl_user WHERE userid='$id'";  
 
$statement = $connect->prepare($query);
if($statement->execute())
{
 $message = 'Data Deleted';
}else{
  $message = 'Error';   
}   
echo $message;
?>