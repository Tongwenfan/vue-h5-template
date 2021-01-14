import { post } from "../http";


// 请求 示例
// 审批工单
export const approval = (data) => {
  return post(`/worksheet/approval/${data.sheetNo}`,data.data);
}
