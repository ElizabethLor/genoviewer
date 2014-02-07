
var nop = function() {
};

var fnv1aHash = function(str, it) {
    var FNV1_32A_INIT = 0x811c9dc5;
    var hval = FNV1_32A_INIT;
    for (var i = 0; i < str.length; ++i)
    {
        hval ^= str.charCodeAt(i);
        hval += (hval << 1) + (hval << 4) + (hval << 7) + (hval << 8) + (hval << 24);
    }
    if (it > 4) {
        return '#' + (hval >>> 0).toString(16).substring(0, 6);
    } else {
        return fnv1aHash((hval.toString(16) + (hval >>> 0).toString(16)), it + 1);
    }
};

var getRGB = function(str) {
    return fnv1aHash(str, 0);
};

var getRGBArray = function(arr) {
    var ret = [];
    for (var i = 0; i < arr.length; i++) {
        ret.push(getRGB(arr[i]));
    }
    return ret;
};