$(document).foundation();
//MQTT

var client = mqtt.connect('mqtt://test.mosquitto.org:8080');

client.on('connect', function () {
    console.log("Connect Mqtt Server!");
    client.subscribe('/nuu/csie/pos/order/item/add');
});

client.on('message', function (topic, msg) {
    console.log(msg.toString());
    var data = eval('(' + msg + ')');
    console.log(data.name + "," + data.price + "," + data.no);

});
//MQTT End

var total = 0;
var no = 0;
var i = 1;

function REClick() {
    $('.saleitem').off('click');
    console.log('Click List ITEM!');
    $('.saleitem').on('click', function () {
        console.log(this);
        removeItem(no);
    });
}
var resfd = "";
$('.item').on('click', function () {
    ++no;
    total += $(this).children().last().text() * 1;
    $('#list').append('<div id="no_' + no + '"class="row listItem" onclick="removeItem(' + no + ');"><div class="column small-2">' + no + '</div><div class="column small-6">' + $(this).children().first().next().text() + '</div><div class = "column small-4 text-right" > ' + $(this).children().last().text() + ' </div></div> ');
    client.publish('/nuu/csie/pos/order/item/add', '{"no":' + no + ',"name":"' + $(this).children().first().next().text() +
        '","price":"' + $(this).children().last().text() +
        '"}');
    var resi = $(this).children().first().next().text();
    resfd += resi + ",";
    $('#total').text('總額:' + total);
    var resp = total;
    $('#resprice').val(resp);
    $('#resitem').val(resfd);
    console.log(resfd);
});

function paybtn() {
    createOrder();
}

function removeItem(no) {
    console.log(no);
    total -= $('#no_' + no).children().last().text() * 1;
    $('#total').text('總額:' + total);
    $('#no_' + no).remove();

    client.publish('/nuu/csie/pos/order/item/del', '{"no":' + no + '}');
}

function createOrder() {
    console.log("Create New Order!");
    $('#list').empty();
    total = 0;
    no = 0;
    $('#total').text('總額:' + total);
    client.publish('/nuu/csie/pos/order/item/del', "{}");
}
