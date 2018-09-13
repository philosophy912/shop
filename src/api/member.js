import service from '@/utils/request';
import md5 from 'blueimp-md5';
import Logger from 'chivy';
const log = new Logger('api/product');

export const createMember = param => {
  const data = {
    name: param.name,
    mobile: param.phone,
    email: param.email,
    nick: param.nick,
    gradeId: param.selects,
    description: param.desc
  };
  return service({
    url: '/member/show/ui/createMember.do',
    method: 'post',
    data
  });
};

export const updateMember = param => {
  const data = {
    id: param.id,
    name: param.name,
    mobile: param.mobile,
    email: param.email,
    nick: param.nick,
    gradeId: param.gradeId,
    description: param.description
  };
  log.debug('updateMember data is ' + JSON.stringify(data));
  return service({
    url: '/member/show/ui/updateMember.do',
    method: 'post',
    data
  });
};

export const deleteMember = param => {
  const data = {
    entityId: param.entityId
  };
  return service({
    url: '/member/show/ui/deleteMember.do',
    method: 'post',
    data
  });
};

export const getMemberGradesforSelect = () => {
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
    url: '/member/show/ui/getMemberGrades.do',
    method: 'post',
    data
  });
};

export const createMemberGrade = param => {
  const data = {
    name: param.name,
    discount: param.discount,
    description: param.description
  };
  return service({
    url: '/member/show/ui/createMemberGrade.do',
    method: 'post',
    data
  });
};

export const updateMemberGrade = param => {
  const data = {
    id: param.id,
    name: param.name,
    discount: param.discount,
    description: param.description
  };
  log.debug('updateMemberGrade post data is ' + JSON.stringify(data));
  return service({
    url: '/member/show/ui/updateMemberGrade.do',
    method: 'post',
    data
  });
};

export const deleteMemberGrade = param => {
  const data = {
    entityId: param.entityId
  };
  return service({
    url: '/member/show/ui/deleteMemberGrade.do',
    method: 'post',
    data
  });
};

export const rechargeBalance = param => {
  const data = {
    name: param.name,
    balance: param.balance
  };
  return service({
    url: '/member/show/ui/rechargeBalance.do',
    method: 'post',
    data
  });
};

export const modifyPassword = param => {
  const data = {
    entityId: param.entityId,
    entityName: md5(param.entityName)
  };
  return service({
    url: '/member/show/ui/modifyPassword.do',
    method: 'post',
    data
  });
};

export const modifyBasicInfo = param => {
  const data = {
    name: param.name,
    genderStr: param.genderStr,
    birthDay: param.birthDay,
    address: param.address,
    region: param.region,
    memberId: param.memberId
  };
  return service({
    url: '/member/show/ui/modifyBasicInfo.do',
    method: 'post',
    data
  });
};
