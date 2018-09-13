import service from '@/utils/request';
/* import Logger from 'chivy';
const log = new Logger('api/product'); */

export const createCategory = param => {
  const data = {
    name: param.name,
    description: param.description
  };
  return service({
    url: '/category/show/ui/createCategory.do',
    method: 'post',
    data
  });
};

export const updateCategory = param => {
  const data = {
    id: param.id,
    name: param.name,
    description: param.description
  };
  return service({
    url: '/category/show/ui/updateCategory.do',
    method: 'post',
    data
  });
};

export const deleteCategory = param => {
  const data = {
    entityId: param.entityId
  };
  return service({
    url: '/category/show/ui/deleteCategory.do',
    method: 'post',
    data
  });
};

export const createProducts = param => {
  const data = {
    name: param.name,
    classifyId: param.classifyId,
    price: param.price,
    memberPrice: param.memberPrice,
    imageUrl: param.imageUrl,
    imageSliderUrl: param.imageSliderUrl,
    slider: param.slider,
    canBook: param.canBook,
    creatPeriod: param.creatPeriod,
    description: param.description,
    enable: param.enable
  };
  return service({
    url: '/product/show/ui/createProducts.do',
    method: 'post',
    data
  });
};

export const deleteProducts = param => {
  const data = {
    entityId: param.entityId
  };
  return service({
    url: '/product/show/ui/deleteProducts.do',
    method: 'post',
    data
  });
};

export const updateProducts = param => {
  const data = {
    id: param.id,
    name: param.name,
    classifyId: param.classifyId,
    price: param.price,
    memberPrice: param.memberPrice,
    imageUrl: param.imageUrl,
    imageSliderUrl: param.imageSliderUrl,
    slider: param.slider,
    canBook: param.canBook,
    creatPeriod: param.creatPeriod,
    description: param.description,
    enable: param.enable
  };
  return service({
    url: '/product/show/ui/updateProducts.do',
    method: 'post',
    data
  });
};

export const getCategoryforSelect = () => {
  const data = {
    entityId: '',
    entityName: '',
    envData: {
      pageNo: 1,
      // 分类数量超过100个时候会出问题
      pageSize: 100
    }
  };
  return service({
    url: '/category/show/ui/getCategory.do',
    method: 'post',
    data
  });
};
