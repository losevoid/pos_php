<html>
<head>

<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
</head>
<body>
<h2 align="center">查看單號</h2>
<?php

$link_ID = mysql_connect('localhost', 'nuucsie', 'nuucsie');


mysql_select_db('nuucsie');


mysql_query('SET CHARACTER SET UTF8;');

$result = mysql_query("SELECT * FROM list;", $link_ID);


mysql_close($link_ID);

?>
<table border="1">
<?php
 while($record = mysql_fetch_array($result))
	{
	?>
	<tr>
    <td><?php	echo '單號：' . $record[listid] . '<br>'; ?></td>
	<td><?php   echo '項目：' . $record[item] . '<br>'; ?></td>
	<td><?php   echo '價錢：' . $record[price] . '<br>'; ?></td>
	</tr>
	<?php
}
?>
</table>
<form action="index.html" method="POST">
<input type="submit" value="回主頁"><br>
</form>
</body>
</html>