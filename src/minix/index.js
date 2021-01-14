import { ChangeSessionStorage } from "@/utils/utils";   
import {
    querySheetDetail,
    getListCompensationBySheetNo,
    getListWriteOffBySheetNo,
  } from "@/api/consultant/index";
export const myMinix = {
    data () {
        return {
            minixSheetNo: null,
            isShow: true
        }
    },
    created () {
        this.minixSheetNo = ChangeSessionStorage().get('sheetNo');
    },
    mounted() {
        
    },
    methods: {
        minixInit () {
            this.minixQuerySheet();
            this.minixGetListCompensationBy();
            this.minixGetListWriteOffBy()
        },
        minixQuerySheet () {
            querySheetDetail(this.minixSheetNo).then((res) => {
                // 获取派单信息
                this.sheetState = res.workSheet.sheetState;
                // this.changeTabs(res.workSheet.sheetState);
                // 判断状态是否为已提交
                this.isShow = res.workSheet.sheetState >3 ?false:true
                this.$store.dispatch("consultnt/getSheetDetailActions", { ...res });
            });
        },
        minixGetListCompensationBy () {
            // 获取所有工单补偿信息
            getListCompensationBySheetNo(this.minixSheetNo).then((res) => {
                this.$store.dispatch("consultnt/getHandlingActions", res);
            });
        },
        minixGetListWriteOffBy () {
            // 获取所有工单核销信息
            getListWriteOffBySheetNo(this.minixSheetNo).then((res) => {
                this.$store.dispatch("consultnt/getWriteOffActions", res);
            });
        }
    }
}