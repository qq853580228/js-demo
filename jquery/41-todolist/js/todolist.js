$(function() {
    // 按下回车 把完整的数据存储到本地存储里
    load();
    $("#title").on("keydown", function(event) {
        if (event.keyCode === 13) {
            if ($(this).val() === "") {
                alert("请输入你要进行的操作！")
            } else {
                // 先读取本地存储原来的数据
                var local = getData();
                // 把local数组的数据需要更新，把最新的数据追加给本地存储
                local.push({ title: $(this).val(), done: false });
                savaData(local);
                load();
                $(this).val("");
            }
        }
    });
    // 删除数据
    $("ol").on("click", "a", function() {
        var data = getData();
        var index = $(this).attr("index");
        data.splice(index, 1);
        savaData(data);
        load();
    });
    // 点击复选框，修改done的值
    $("ol, ul").on("click", "input", function() {
        var data = getData();
        var index = $(this).siblings("a").attr("index");
        data[index].done = $(this).prop("checked");
        savaData(data);
        load();
    });
    // 封装了读取本地存储的数据
    function getData() {
        var data = localStorage.getItem("todolist");
        if (data !== null) {
            return JSON.parse(data);
        } else {
            return [];
        }
    }
    // 封装了保存到本地存储的数据
    function savaData(data) {
        localStorage.setItem("todolist", JSON.stringify(data));
    }
    // 封装了加载渲染本地存储的数据
    function load() {
        // 先读取本地存储的数据
        var data = getData();
        // 遍历之前要先情况ol里面的内容
        $("ol,ul").empty();
        // 通过遍历，把数据取出来
        var ing = 0;
        var ed = 0;
        $.each(data, function(index, dt) {
            if (dt.done) {
                ed++;
                $("ul").prepend("<li><input type='checkbox' checked='checked'> <p>" + dt.title + "</p> <a href='javascript:;' index='" + index + "'></a></li>");
            } else {
                ing++;
                // 有几条数据，就在ol中生成几个小li
                $("ol").prepend("<li><input type='checkbox'> <p>" + dt.title + "</p> <a href='javascript:;' index='" + index + "'></a></li>");
            }
        });
        $("#todocount").text(ing);
        $("#donecount").text(ed);
    }
});