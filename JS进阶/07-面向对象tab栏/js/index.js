var that;
class Tab {
    constructor(id) {
            that = this;
            this.main = document.querySelector(id); //获取传递进来的元素
            this.addtab = this.main.querySelector('.addtab');
            this.ul = this.main.querySelector('ul');
            this.tabscon = this.main.querySelector('.tabscon');
            this.init(); //new实例化对象就会执行constructor这个构造函数
        }
        //init 初始化操作，让相关的元素添加绑定事件
    init() {
            this.updateNode();
            this.addtab.onclick = this.addTab;
            for (var i = 0; i < this.lis.length; i++) {
                this.lis[i].index = i;
                this.lis[i].onclick = this.toggleTab; //不写this.toggleTab()，否则在页面加载的时候就会调用这个方法
                this.remove[i].onclick = this.removeTab;
                this.spans[i].ondblclick = this.editTab;
                this.sections[i].ondblclick = this.editTab;
            }
        }
        // 1.切换功能
    toggleTab() {
            that.clearClass();
            this.className = 'cur';
            that.sections[this.index].className = 'cur';

        }
        // 2.添加功能
    addTab() {
            /* var li = document.createElement('li');
            li.className = 'cur';
            var section = document.createElement('section');
            section.className = 'cur';
            li.innerHTML = "<span>测试</span><i class='icon'>×</i>";
            section.innerHTML = '测试' + random ;
            that.ul.appendChild(li);
            that.tabscon.appendChild(section); */
            that.clearClass();
            var random = Math.random();
            var li = '<li class="cur"><span>测试</span><i class="icon">×</i></li>';
            var section = '<section class="cur">测试' + random + '</section>';
            that.ul.insertAdjacentHTML('beforeend', li);
            that.tabscon.insertAdjacentHTML('beforeend', section);
            that.init();
        }
        // 3.删除功能
    removeTab(e) {
            e.stopPropagation();
            var index = this.parentNode.index;

            /* that.ul.removeChild(that.ul.children[index]);
            that.tabscon.removeChild(that.tabscon.children[index]); */
            that.lis[index].remove();
            that.sections[index].remove();
            that.init();
            // 当我们删除的不是选中状态的那个li，让当前选中的li状态保持不变
            if (document.querySelector('.cur')) return;
            // 当我们删除了选中状态这个li时，让前一个li处于选中状态
            index--;
            // 自动调用点击事件
            /*  if (index < 0) {
                 return false;
             } */
            //  有这个按钮才执行自动调用点击事件
            that.lis[index] && that.lis[index].click();
        }
        // 4.修改功能
    editTab() {
            // 获取当前元素的内容
            var str = this.innerHTML;
            // 双击禁止选中文字
            window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();
            this.innerHTML = '<input type="text">';
            var input = this.children[0];
            input.value = str;
            input.select(); //让文本框的文字处于选定状态
            // 文本框失去焦点把文本框的内容赋值给span
            input.onblur = function() {
                    this.parentNode.innerHTML = this.value;
                }
                // 按下回车把文本框的内容赋值给span
            input.onkeyup = function(e) {
                if (e.keyCode === 13) {
                    this.blur();
                }
            }
        }
        // 清除tab栏和内容项的样式
    clearClass() {
            for (var i = 0; i < this.lis.length; i++) {
                this.lis[i].className = '';
                this.sections[i].className = '';
            }
        }
        //获取所有的li和section
    updateNode() {
        this.lis = this.main.querySelectorAll('li');
        this.sections = this.main.querySelectorAll('section');
        this.remove = this.main.querySelectorAll('.icon');
        this.spans = this.main.querySelectorAll('.firstnav li span:first-child');

    }
}
new Tab("#tab");