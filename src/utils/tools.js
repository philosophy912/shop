// 小于0的数字前面加0
const appendZero = number => number <= 9 ? ('0' + number) : number;

// 根据尺寸获取图片
const splitUrl = (url, size) => {
  const array = url.split('.');
  return array[0] + '_' + size + 'X' + size + '.' + array[1];
};

export default class Tools {
  // 对象属性已定义
  static isUndefined = obj => typeof (obj) === 'undefined';
  // 对象属性未定义
  static isNotUndefined = obj => !Tools.isUndefined(obj);
  // 对象是否为空
  static isEmpty = obj => (obj === null || obj === '' || typeof (obj) === 'undefined');
  // 对象非空
  static isNotEmpty = obj => !Tools.isEmpty(obj);

  static isNull = obj => obj === null;

  static isNotNull = obj => !Tools.isNull(obj);

  static isZero = obj => obj === 0;

  static isNotZero = obj => !Tools.isZero(obj);

  static isEqual = (obj1, obj2) => obj1 === obj2;

  static isNotEqual = (obj1, obj2) => !Tools.isEqual(obj1, obj2);

  // 根据long时间获取具体的年月日时分秒
  static formatDate = date => {
    const datetime = new Date(date);
    return {
      Year: 1900 + datetime.getYear(),
      Month: appendZero((datetime.getMonth() + 1)),
      Day: appendZero(datetime.getDate()),
      Hour: appendZero(datetime.getHours()),
      Minute: appendZero(datetime.getMinutes()),
      Second: appendZero(datetime.getSeconds())
    };
  }

  // 根据图片地址重新计算然后获取重绘后的图片地址
  static resizeImage = (url, size) => Tools.isEmpty(url) ? url : splitUrl(url, size);
  // 性别设置
  static sex = value => {
    switch (value) {
      case 'M':
        return '男';
      case 'F':
        return '女';
      case '男':
        return 'M';
      case '女':
        return 'F';
      default:
        return null;
    }
  }

  // 格式化时间
  static formatTime = (value, separate) => {
    const datetime = Tools.formatDate(value);
    return datetime.Year + separate + datetime.Month + separate + datetime.Day;
  };

  static date2Long = date => {
    const dt = new Date(date.replace(new RegExp('/-/g', 'g'), '/'));
    console.log(dt);
    console.error(dt.getTime());
    return new Date(date.replace(new RegExp('/-/g', 'g'), '/')).getTime();
  }

  // table的表格formatter
  static formatit = (row, column, cellValue) => {
    if (typeof (cellValue) === 'boolean') {
      return cellValue ? '是' : '否';
    }
    if (column.label === '性别') {
      return Tools.sex(cellValue);
    } else if (column.label === '生日') {
      return Tools.isNotEmpty(cellValue) ? Tools.formatTime(cellValue, '-') : cellValue;
    }
    if (column.label === '付款类型') {
      return cellValue === 'BALANCE' ? '余额' : '现金';
    }
    if (column.label === '寄送方式') {
      return cellValue === 'EXPRESS' ? '快递' : '自取';
    }
    if (column.label === '订单状态') {
      switch (cellValue) {
        case 'SUCCESS':
          return '等待发货';
        case 'NOTPAY':
          return '等待付款';
        case 'REFUND':
          return '已退款';
        case 'CLOSED':
          return '交易关闭';
        case 'FINISHED':
          return '完成订单';
        case 'PAYERROR':
          return '付款错误';
        case 'DISPATCHED':
          return '已发货';
      }
    }
    return cellValue;
  };

  // 设置默认的值
  static setDefault = (data, value) => {
    return Tools.isNotEmpty(data) ? data : value;
  };
  // 处理Select选项为element规定的样子
  static dealForSelect = data => {
    const result = [];
    data.forEach(item => {
      result.push({
        value: item.id,
        label: item.name
      });
    });
    return result;
  }
  // 将数组转换成字符串
  static url2Str = images => images.map(image => image.name).join(';');

  // 将字符串转换成数组
  static url2List = image => {
    if (Tools.isEmpty(image)) {
      return [];
    } else {
      return image.split(';').map(image => {
        return {url: image};
      });
    }
  };
};
