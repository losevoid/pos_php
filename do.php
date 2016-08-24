<html>
<html>

<head>
    <title>處理單號</title>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
</head>

<body>
    <?php

$link_ID = mysql_connect('localhost', 'nuucsie', 'nuucsie');


mysql_select_db('nuucsie');


mysql_query('SET CHARACTER SET UTF8;');


mysql_query("INSERT INTO list (item,price) values('". $_POST['resitem'] ."','". $_POST['resprice'] ."');", $link_ID);


mysql_close($link_ID);


$record = mysql_fetch_row($result);

?>
        <form action="index.html" method="POST">
            <input type="submit" value="回主頁"><br>
        </form>
</body>

</html>
