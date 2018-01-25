import _md5 from 'md5';

class Utils {
    extend() {
        let target = arguments[0] || {},
            i = 1,
            length = arguments.length;
        for (; i < length; i++) {
            for (let k in arguments[i]) {
                if (arguments[i].hasOwnProperty(k)) {
                    target[k] = arguments[i][k];
                }
            }
        }
        return target;
    }

    md5(data) {
        return _md5(data);
    }

    /**
     *
     * @param that 当前作用域this
     * @param msg 提示消息
     */
    successMsg(that, msg) {
        that.$message({
            showClose: true,
            message: msg || '操作成功',
            type: 'success'
        })
    }

    /**
     *
     * @param that 当前作用域this
     * @param msg 提示消息
     */
    errorMsg(that, msg) {
        that.$message({
            showClose: true,
            message: msg || '操作失败',
            type: 'error'
        })
    }

    /**
     *
     * @param that 当前作用域this
     * @param formname ref
     */
    resetForm(that, formname) {
        that.$refs[formname] && that.$refs[formname].resetFields();
    }

    /**
     * 更新tableData列表
     * @param that 当前作用域this
     */
    updateList(that) {
        that.$refs.childPagination.getList();
    }

    currentTime() {
        return (new Date(parseInt(Date.now()))).toLocaleString().replace(/:\d{1,2}$/, ' ');
    }

    itar(arr, that, cb, cb2) {
        let len = arr.length;
        let i = 0;
        cb2 && cb2();
        for (; i < len; i++) {
            if (cb) {
                if (cb.call(that, arr[i])) {
                    return false;
                }
            }
        }
    }
}

export default Utils;

