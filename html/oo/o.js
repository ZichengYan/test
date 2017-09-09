"use strict";

(function (w) {
    let Fun = function () {
        return new Fun.fn.init();
    }

    Fun.fn = Fun.prototype = {
        constructor: Fun,
        init: function () {
            this.gender = "性别"
            this.age = "年龄"
        },
        a:"pop"
    }

    Fun.fn.init.prototype=Fun.fn;
    // Fun.fn.init.prototype = Fun.prototype;
    // console.log(Fun.fn === Fun.prototype);

    Fun.extend = Fun.fn.extend = function () {
        var options, name, src, copy, copyIsArray, clone,
            target = arguments[0] || {},
            i = 1,
            length = arguments.length,
            deep = false;

        // Handle a deep copy situation
        if (typeof target === "boolean") {
            deep = target;
            target = arguments[1] || {};
            // skip the boolean and the target
            i = 2;
        }

        // Handle case when target is a string or something (possible in deep copy)
        if (typeof target !== "object" && !Fun.isFunction(target)) {
            target = {};
        }

        // extend Fun itself if only one argument is passed
        if (length === i) {
            target = this;
            --i;
        }

        for (; i < length; i++) {
            // Only deal with non-null/undefined values
            if ((options = arguments[i]) != null) {
                // Extend the base object
                for (name in options) {
                    src = target[name];
                    copy = options[name];

                    // Prevent never-ending loop
                    if (target === copy) {
                        continue;
                    }

                    // Recurse if we're merging plain objects or arrays
                    if (deep && copy && ( Fun.isPlainObject(copy) || (copyIsArray = Fun.isArray(copy)) )) {
                        if (copyIsArray) {
                            copyIsArray = false;
                            clone = src && Fun.isArray(src) ? src : [];

                        } else {
                            clone = src && Fun.isPlainObject(src) ? src : {};
                        }

                        // Never move original objects, clone them
                        target[name] = Fun.extend(deep, clone, copy);

                        // Don't bring in undefined values
                    } else if (copy !== undefined) {
                        target[name] = copy;
                    }
                }
            }
        }

        // Return the modified object
        return target;
    };


    w.Fun = Fun;
})(window)