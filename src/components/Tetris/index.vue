<template>
    <div class="tetris">
        <div class="head" v-if="!operatingHandle">
            <h1>俄罗斯方块</h1>
            <Button type="primary" @click="start">开始</Button>
            <Button type="primary" @click="stop">暂停</Button>
            <Button type="primary" @click="reset">重置</Button>
            <p>score: <span :style="{color:(score>0?'#ff0000':'#000')}">{{score}}</span></p>
        </div>
        <div class="game">
            <table>
                <tr v-for="(item,i) in mapHeight" :key="i">
                    <td v-for="(jtem,j) in mapWidth" :key="j" :class="isTetris(i,j)||isBody(i,j)?'active':''"></td>
                </tr>
            </table>
        </div>
        <OperatingHandle :operatingHandle="operatingHandle" @left="change(-1)" @right="change(1)"
                         @top="deformTetris(++deformT)" @bottom="change(2)" @enter="start" @stop="stop"
                         @reset="reset"></OperatingHandle>
    </div>
</template>

<script>
    import OperatingHandle from '../OperatingHandle/OperatingHandle';

    export default {
        name: "index",
        components: {
            OperatingHandle
        },
        data() {
            return {
                score: 0,
                mapWidth: 18,
                mapHeight: 25,
                isStart: 0,
                shapePosition: {
                    1: [[[0, 0], [1, 0], [0, 1], [1, 1]]], // 方块
                    2: [[[0, 0], [0, 1], [0, 2], [0, 3]], [[0, 0], [1, 0], [2, 0], [3, 0]]], // 一 总共2种
                    3: [[[0, 0], [0, 1], [1, 1], [1, 2]], [[0, 1], [1, 1], [1, 0], [2, 0]]], // Z  总共2种
                    4: [[[0, 0], [1, 0], [1, 1], [2, 1]], [[1, 0], [1, 1], [0, 1], [0, 2]]], // N         总共2种
                    5: [[[0, 0], [1, 0], [2, 0], [2, 1]], [[0, 0], [0, 1], [0, 2], [1, 0]], [[0, 0], [0, 1], [1, 1], [2, 1]], [[1, 0], [1, 1], [1, 2], [0, 2]]], // L         总共4种
                    6: [[[0, 1], [1, 1], [2, 1], [2, 0]], [[0, 0], [1, 0], [1, 1], [1, 2]], [[0, 0], [1, 0], [2, 0], [0, 1]], [[0, 0], [0, 1], [0, 2], [1, 2]]], // L的镜像   总共4种
                    7: [[[0, 0], [0, 1], [0, 2], [1, 1]], [[0, 0], [1, 0], [2, 0], [1, 1]], [[1, 0], [1, 1], [1, 2], [0, 1]], [[1, 0], [0, 1], [1, 1], [2, 1]]]  // T         总共4种
                }, // 模型坐标
                shapeRandomI: 1, // 随机模型坐标
                deformT: 0, // 变形
                tetrisPosition: [], // 上方掉落的方块
                bodyPosition: [], // 下方堆积的方块
                direction: 2, // 方向 -1left 1right -2up(暂时不做) 2down
                timer: null,
                operatingHandle: false, // 操作手柄
            }
        },
        created() {
            const u = navigator.userAgent;
            const isIos = /(iPhone|iPad|iPod|iOS)/i.test(u);
            const isAndroid = /(Android)/i.test(u);
            if (isAndroid || isIos) {
                this.operatingHandle = true;
                // this.$alert('请用电脑打开', '暂不支持手机端', {
                //     confirmButtonText: '确定',
                //     callback: action => {
                //         this.$message({
                //             type: 'info',
                //             message: `action: ${ action }`
                //         });
                //         this.$router.push({
                //             name: "Home"
                //         });
                //     }
                // });
            } else {
                this.operatingHandle = false;
                this.pcKey()
            }
            this.init();
        },
        mounted() {
        },
        methods: {
            init() {
                this.getTetrisPosition();
            },
            getTetrisPosition() {
                this.tetrisPosition = [];
                this.shapeRandomI = this.getRandom(7) + 1; // 随机模型坐标
                this.deformTetris(this.deformT);
            }, // 获取上方掉落的方块
            deformTetris() {
                let len = this.shapePosition[this.shapeRandomI].length;
                this.deformT = this.deformT > len - 1 ? 0 : this.deformT;
                let newTetrisPosition = this.deepCopy(this.shapePosition[this.shapeRandomI][this.deformT]);
                if(this.tetrisPosition.length) {
                    for(let i=0;i<newTetrisPosition.length;i++){
                        newTetrisPosition[i][0] += this.tetrisPosition[0][0];
                        newTetrisPosition[i][1] += this.tetrisPosition[0][1];
                    }
                }else{
                    newTetrisPosition.forEach((item, i) => {
                        item[1] += (this.mapWidth - 4) / 2;
                    });
                }

                // this.tetrisPosition = this.deepCopy(this.shapePosition[this.shapeRandomI][this.deformT]);
                // this.tetrisPosition.forEach((item, i) => {
                //     item[1] += (this.mapWidth - 4) / 2;
                // });
                this.tetrisPosition = newTetrisPosition;
                this.$forceUpdate();
                // console.log(this.tetrisPosition, this.shapePosition)
            }, // 变形
            deepCopy(t) {
                return JSON.parse(JSON.stringify(t))
            }, // 深拷贝
            getRandom(t) {
                return parseInt(Math.random() * t);
            }, // 获取随机数 0到t-1的整数
            start() {
                // console.log('start')
                if(!this.isStart){
                    this.isStart = 1;
                    this.timer = setInterval(() => {
                        this.autoRun();
                    }, 600)
                }
            },
            stop() {
                // console.log('stop');
                this.isStart = 0;
                clearInterval(this.timer);
            },
            reset() {
                this.stop();
                this.timer = null;
                this.getTetrisPosition();
                this.bodyPosition = [];
                // this.start();
            },
            autoRun() {
                let dx = 0, dy = 0;
                switch (this.direction) { // 方向 -1left 1right 2down
                    case 1:
                    case '1':
                        dx = 0;
                        dy = 1;
                        this.direction = 2;
                        break;
                    case -1:
                    case '-1':
                        dx = 0;
                        dy = -1;
                        this.direction = 2;
                        break;
                    case 2:
                    case '2':
                        dx = 1;
                        dy = 0;
                        break;
                    default:
                        dx = 0;
                        dy = 0;
                        break;
                }

                if (this.isOver()) {
                    alert('over');
                    this.stop();
                    this.timer = null;
                    return
                }

                if (this.isAddBody()) {
                    // console.log('addBody');
                    this.stop();
                    this.getBody();
                    this.deformT = 0;
                    this.getTetrisPosition();
                    this.start();
                    return
                }

                this.tetrisPosition.forEach((item, i) => {
                    item[0] += dx;
                    item[1] += dy;
                });
                this.$forceUpdate();
                // console.log('run');
            },
            isOver() {
                for (let i = 0; i < this.bodyPosition.length; i++) {
                    let overX = 0, overY = (this.mapWidth - 4) / 2;
                    if ((this.bodyPosition[i][0] === overX && this.bodyPosition[i][1] === overY)
                        || (this.bodyPosition[i][0] === overX && this.bodyPosition[i][1] === overY + 1)
                        || (this.bodyPosition[i][0] === overX && this.bodyPosition[i][1] === overY + 2)
                        || (this.bodyPosition[i][0] === overX && this.bodyPosition[i][1] === overY + 3)) {
                        return 1
                    }
                }
                return 0;
            },
            isAddBody() {
                let t = 0;
                this.tetrisPosition.forEach((item, i) => {
                    // console.log(item[0],item[1],this.isBody(item[0],item[1]))
                    if (item[0] >= this.mapHeight - 1 || this.isBodyAround(item[0], item[1])) {
                        t = 1;
                    }
                });
                return t
            }, // 是否要往body里增加块
            isBodyAround(x, y) {
                for (let i = 0; i < this.bodyPosition.length; i++) {
                    let topX = this.bodyPosition[i][0] - 1;
                    let bottomX = this.bodyPosition[i][0] + 1;
                    let leftY = this.bodyPosition[i][1] - 1;
                    let rightY = this.bodyPosition[i][1] + 1;
                    if ((topX === x && this.bodyPosition[i][1] === y)
                        || (bottomX === x && this.bodyPosition[i][1] === y)
                        || (this.bodyPosition[i][0] === x && leftY === y)
                        || (this.bodyPosition[i][0] === x && rightY === y)) {
                        return 1
                    }
                }
                return 0;
            }, // 是否在body四周
            getBody() {
                this.tetrisPosition.forEach((item, i) => {
                    this.bodyPosition.push(item)
                });
                this.$forceUpdate();
                // console.log(this.bodyPosition,'body')
            }, // 获取下方堆积的块
            isTetris(x, y) {
                // this.tetrisPosition.forEach((item, i) => {
                //   if (item[0] === x && item[1] === y) {
                //     console.log(x,y)
                //     return 1;
                //   }
                // });
                for (let i = 0; i < this.tetrisPosition.length; i++) {
                    if (this.tetrisPosition[i][0] === x && this.tetrisPosition[i][1] === y) {
                        return 1;
                    }
                }
                return 0;
            }, // 上面掉下来的块
            isBody(x, y) {
                // this.bodyPosition.forEach((item, i) => {
                //   if (item[0] === x && item[1] === y) {
                //     return 1;
                //   }
                // });
                for (let i = 0; i < this.bodyPosition.length; i++) {
                    if (this.bodyPosition[i][0] === x && this.bodyPosition[i][1] === y) {
                        return 1;
                    }
                }
                return 0;
            }, // 下面堆积的块
            pcKey() {
                document.onkeydown = (e) => {
                    let key = window.event.keyCode;
                    switch (key) {
                        case 13: // 回车
                            this.start();
                            break;
                        case 37: // left
                            this.change(-1);
                            break;
                        case 39: // right
                            this.change(1);
                            break;
                        case 38: // up
                            this.deformTetris(++this.deformT);
                            break;
                        case 40: // down
                            this.change(2);
                            break;
                        default:
                            break;
                    }
                }
            }, // 监听按键
            change(t) {
                // console.log('on')
                if (!this.isStart) {
                    return
                } // 未开始不能按键
                let f = true;
                this.tetrisPosition.forEach((item, i) => {
                    if ((item[1] - 1 < 0 && t === -1) || (item[1] + 1 > this.mapWidth - 1 && t === 1)) {
                        f = false;
                    }
                }); // 左右边界
                if (f) {
                    this.direction = t;
                } else {
                    this.direction = 2;
                }
                this.autoRun();
            } // 按键变化
        }
    }
</script>

<style lang="less" scoped>
    .tetris {
        margin-top: -60px;
        .head {
            h1 {
                font-size: 40px;
                font-weight: bold;
            }
            button {
                margin-top: 10px;
            }
            p {
                font-size: 25px;
                margin: 10px auto;
                .score {

                }
            }
        }
        .game {
            width: max-content;
            height: max-content;
            margin: 10px auto 20px;
            background-color: #000;
            table {
                margin: 0;
                border-spacing: 0;
                td {
                    border-left: 1px solid #bbada0;
                    border-top: 1px solid #bbada0;
                }
                .active {
                    background-color: #f65e3b;
                }
            }
        }
    }
</style>
