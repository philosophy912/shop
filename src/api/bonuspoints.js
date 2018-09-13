import service from '@/utils/request';

export const createBonusPointsGrade = param => {
  const data = {
    name: param.name,
    level: param.level,
    minPoint: param.minPoint,
    maxPoint: param.maxPoint,
    description: param.description
  };
  return service({
    url: '/member/bonuspoints/ui/createGrade.do',
    method: 'post',
    data
  });
};

export const modifyBonusPointsGrade = param => {
  const data = {
    id: param.id,
    name: param.name,
    level: param.level,
    minPoint: param.minPoint,
    maxPoint: param.maxPoint,
    description: param.description
  };
  return service({
    url: '/member/bonuspoints/ui/modifyGrade.do',
    method: 'post',
    data
  });
};

export const deleteBonusPointsGrade = param => {
  const data = {
    entityId: param.entityId
  };
  return service({
    url: '/member/bonuspoints/ui/deleteGrade.do',
    method: 'post',
    data
  });
};

export const modifyBonusPointsInfo = param => {
  const data = {
    point: param.content,
    id: param.id
  };
  return service({
    url: '/member/bonuspoints/ui/getInfos.do',
    method: 'post',
    data
  });
};

export const executeRedeem = param => {
  const data = {
    name: param.content,
    point: param.point,
    memberName: param.memberName,
    count: param.count
  };
  return service({
    url: '/member/bonuspoints/ui/executeRedeem.do',
    method: 'post',
    data
  });
};

export const saveProduct = param => {
  const data = {
    productId: param.productId,
    point: param.point,
    name: param.name
  };
  return service({
    url: '/member/bonuspoints/ui/saveProduct.do',
    method: 'post',
    data
  });
};

export const deleteProduct = param => {
  const data = {
    entityId: param.entityId
  };
  return service({
    url: '/member/bonuspoints/ui/deleteProduct.do',
    method: 'post',
    data
  });
};
