/**
 * 公用js文件
 */
/**
 * ACE jQgrid 加载底部栏图标s
 */
$(document).ready(function (){
    ishasKpd();
    isBtnAuth();
});

function updatePagerIcons(table) {
    var replacement = {
        'ui-icon-seek-first': 'ace-icon fa fa-angle-double-left bigger-140',
        'ui-icon-seek-prev': 'ace-icon fa fa-angle-left bigger-140',
        'ui-icon-seek-next': 'ace-icon fa fa-angle-right bigger-140',
        'ui-icon-seek-end': 'ace-icon fa fa-angle-double-right bigger-140'
    };
    $('.ui-pg-table:not(.navtable) > tbody > tr > .ui-pg-button > .ui-icon').each(function () {
        var icon = $(this);
        var $class = $.trim(icon.attr('class').replace('ui-icon', ''));
        if ($class in replacement) icon.attr('class', 'ui-icon ' + replacement[$class]);
    });
}
/**
 * 关闭当前显示的页面，跳回第一页签
 */
function closeCurrentPage() {
    window.parent.$("#menuTabs span.active").click();
}
/**
 * 窗口缩放事件绑定,调整jqgrid自适应窗口大小
 */
function resizeJqGrid(gridTableId) {
    window.onresize = function doResize() {
        var ps = pageSize();
        $("#" + gridTableId).jqGrid('setGridWidth', ps.winWidths - 25).jqGrid('setGridHeight', ps.winHeights - 180);
    }
}
function pageSize() {
    var winWidth, winHeight;
    if (window.innerHeight) {// all except IE
        winWidth = window.innerWidth;
        winHeight = window.innerHeight;
    } else if (document.documentElement && document.documentElement.clientHeight) {// IE 6 Strict Mode
        winWidth = document.documentElement.clientWidth;
        winHeight = document.documentElement.clientHeight;
    } else if (document.body) { // other
        winWidth = document.body.clientWidth;
        winHeight = document.body.clientHeight;
    }//for small pages with total size less then the viewport
    return {winWidths: winWidth, winHeights: winHeight};
}
/**
 * @Describe 修改折叠事件的绑定
 */
function collapseLink() {
    $('.collapse-link').off("click");
    $('.collapse-link').on('click', function () {
        var $BOX_PANEL = $(this).closest('.x_panel'),
            $ICON = $(this).find('i'),
            $BOX_CONTENT = $BOX_PANEL.find('.form-horizontal');

        if ($BOX_PANEL.attr('style')) {
            $BOX_CONTENT.slideToggle(300, function () {
                $BOX_PANEL.removeAttr('style');
            });
        } else {
            $BOX_CONTENT.slideToggle(300, function () {
                $BOX_PANEL.css({"padding-bottom": "0px", "margin-bottom": "0px"});
            });
        }

        $ICON.toggleClass('fa-chevron-up fa-chevron-down');
    });
}

//角色权限列表
function getTree(item, result) {
    var resultAdd = [];
    if (item.length > 0) {
        var length = item.length;
        for (var i = 0; i < length; i++) {
            result.push({
                'id': item[i].id,
                'name': item[i].authName,
                'parent': item[i].parentId == '0' ? '#' : item[i].parentId,
                'text': item[i].authName,
                'state': {'selected': false},
            });

        }
    }
    return result;
}

//获取机构树
var userTaxNo = '', commonFlag = true;
var user_temp = "";
var user_tempId = "";
function getOrgTree(treeClass, parClass, user, isCallback) {
    //$.jstree.destroy('.' + treeClass);
    $('.' + treeClass).show();

    if ($('.' + parClass).attr("data-method") == "search") {
        $('.' + treeClass).jstree({
            'core': {
                'data': window.top.result
            },
            "plugins": ["checkbox"],
            //"checkbox": {
            //    "keep_selected_style": true,//是否默认选中
            //    "three_state": true,//父子级别级联选择
            //    "tie_selection": false
            //}
        });
        console.log('result',window.top.result);

        var arr = [];
        $('.' + treeClass).off("changed.jstree");
        $('.' + treeClass).on('changed.jstree', function (e, data) {
            user_temp = '';
            user_tempId = '';
            var selNode = $('.' + treeClass).jstree().get_checked(true);
            var userName = $('.' + parClass + '> .organName').val();
            arr = userName.split(',');
            if(selNode.length != 0){
                $.each(selNode, function (i,val) {
                    user_temp = user_temp + ','+ val.text;
                    if (user_temp.substr(0, 1) == ',') {
                        user_temp = user_temp.substr(1);
                    }
                    user_tempId = user_tempId + ',' + val.id;
                    if (user_tempId.substr(0, 1) == ',') {
                        user_tempId = user_tempId.substr(1);
                    }
                })
            }else{
                user_temp = '';
                user_tempId = '';
            }

            $('.' + parClass + '> .organName').val(user_temp);
            $('.' + parClass + '> .organId').val(user_tempId);
            if(isCallback=='xxgl'){
                callbackMethod(user_tempId);
            }
        });
    }
    else {
        $('.' + treeClass).jstree({
            'core': {
                'data': window.top.result
            }
        });

        $('.' + treeClass).off("changed.jstree");
        $('.' + treeClass).on('changed.jstree', function (e, data) {
            $('.' + parClass + '> .organName').val(data.node.text);
            $('.' + parClass + '> .organId').val(data.node.id);
            $('.' + treeClass).hide();
            if (user == "") {
                if(isCallback=='true'){
                    callbackMethod(data.node.id);
                }
            } else {
                for (var i = 0; i < window.top.length; i++) {
                    //window.top.taxNo = list[i].taxNo;
                    userTaxNo = window.top.list[i].taxNo;
                    if (window.top.list[i].deptName == data.node.text) {
                        if ($("#" + user + " " + ".mparentDeptCode")) {
                            $("#" + user + " " + ".mparentDeptCode").val(window.top.list[i].deptCode);
                        }
                        else if($("#" + user + " " + ".mtaxNo")){
                            $("#" + user + " " + ".mtaxNo").val("");
                        }
                        $("#" + user + " " + ".mparentTaxNo").val(window.top.list[i].taxNo);
                        if(isCallback=='true'){
                            callbackMethod(data.node.id);
                        }
                        else if(isCallback == 'taxNo'){
                            backSellerTaxNo(window.top.list[i].taxNo,!commonFlag);
                        }
                        return
                    }
                }
            }

        });
    }
}

//隐藏机构树
function hideTree(treeClass) {
    setTimeout(function () {
        $('.' + treeClass).hide();
    }, 200)
}


//清空上级机构
function clearOrg(parClass) {
    var organName = $('.' + parClass + '> .organName').val();//上级机构名称
    if (organName == "") {
        $('.' + parClass + '> .organId').val('');
        userTaxNo = '';
    }
}


function layuiAlert(alertMsg) {
    layer.alert('<big>' + alertMsg + '</big>', {
        icon: 0,
        title: '<span style="color:#2679b5;"><big>提示信息</big></span>',
        skin: 'layer-ext-moon', //该皮肤由layer.seaning.com友情扩展。
        zIndex: layer.zIndex
    });
}

function ajaxSuccessAlert(alertMsg, layerId) {
    layer.close(layerId);
    layer.alert('<big>' + alertMsg + '</big>', {
        icon: 6,
        title: '<span style="color:#2679b5;"><big>提示信息</big></span>',
        skin: 'layer-ext-moon', //该皮肤由layer.seaning.com友情扩展。
        zIndex: layer.zIndex
    });
}


Array.prototype.remove = function (val) {
    var index = this.indexOf(val);
    if (index > -1) {
        this.splice(index, 1);
    }
};



// 判断当前浏览器是否支持placeholder属性
function placeholderSupport() {
    return 'placeholder' in document.createElement('input');
}

//兼容placeholder
$(function(){
    if(!placeholderSupport()){   // 判断浏览器是否支持 placeholder
        $(document).ready(function(){
            //默认遍历循环添加placeholder
            $('[placeholder]').each(function(){
                $(this).parent().append("<span class='placeholder'>"+$(this).attr('placeholder')+"</span>");
                $(".placeholder").css( {position: relative,
                    top:'-2em',
                    left: '1em',
                    color: '#767676'
                });
            })
            $('[placeholder]').blur(function(){
                if($(this).val()!=""){  //如果当前值不为空，隐藏placeholder
                    $(this).parent().find('span.placeholder').hide();
                }
                else{
                    $(this).parent().find('span.placeholder').show();
                }
            })
        });
    }
});

//将时间戳转化标准格式
function formatDate(time)   {
    var date= new Date(time);
    var   year=date.getYear()+1900;
    var   month=date.getMonth()+1;
    var   date=date.getDate();
    //var   hour=date.getHours();
    //var   minute=date.getMinutes();
    //var   second=date.getSeconds();
    //return   year+"-"+month+"-"+date+"   "+hour+":"+minute+":"+second;
    return   year+"-"+month+"-"+date;
}

// 判断当前用户是否有开票点信息
//console.log('GlobalYh ===',window.top.GlobalYh);
function ishasKpd(){
    var userMessage = window.top.GlobalYh;
    if( userMessage.userAuthType == '2' ){
        $('div[data-method = search] .organId').val(userMessage.deptId);
        $('div[data-method = search] .organName').val(userMessage.deptName);
        $('div[data-method = search] .organName').attr("disabled","disabled");
        $('#xxfpcxtj_billingNo').hide();
    }else{
        $('div[data-method = search] .organName').removeAttr("disabled");
        $('div[data-method = search] .organId').val('');
        $('#xxfpcxtj_billingNo').show();
    }

}

// 判断按钮权限
var btnArr = [];
function isBtnAuth() {
    var btnCodes = window.top.buttonAuth;
    $("#LAY_demo button").each(function (index, item) {
        var btnTemp = ($(this).attr('btncode'));
        btnArr.push(btnTemp);
    })

    $.each(btnArr, function (k, val){
        if(btnCodes.indexOf(val) == -1){
            //$("#LAY_demo button[btncode = " + val + "]").hide();
            $("#LAY_demo button[btncode = " + val + "]").addClass('layui-btn-disabled');
            $("#LAY_demo button[btncode = " + val + "]").hide();
        }else{
            //$("#LAY_demo button[btncode = " + val + "]").show();
            $("#LAY_demo button[btncode = " + val + "]").removeClass('layui-btn-disabled');
            $('#LAY_demo').show();
        }

    })
}

// 表格遮罩层
function load(load){
    layui.use(['layer'], function(){
        var layer = layui.layer;
        if(load == undefined){
            layer.load(3);
            return;
        }else if(load == "loading"){
            layer.closeAll("loading");
            return false;
        }
    });
}




