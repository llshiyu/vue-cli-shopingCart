<template>
  <div class="loadmore">
    <!-- <div class="loadmore__header"></div> -->
    <div class="loadmore__body">
      <slot></slot>
    </div>
    <div class="loadmore__footer">
      <span v-if="loading">
        <i class="tc-loading"></i>
        <span>正在加载</span>
      </span>
      <span v-else-if="loadable">上拉加载更多</span>
      <span v-else>没有更多了</span>
    </div>
  </div>
</template>

<script type="text/babel">
  import axios from 'axios'

  const CancelToken = axios.CancelToken

  export default {
    data() {
      return {
        /**
         * 总页数（由服务端返回）
         * @type {number}
         */
        count: 0,

        /**
         * 是否正在拖拽中
         * @type {boolean}
         */
        dragging: false,

        /**
         * 已加载次数
         * @type {number}
         */
        times: 0,

        /**
         * 已开始记载
         * @type {boolean}
         */
        started: false,

        /**
         * 正在加载中
         * @type {boolean}
         */
        loading: false,
      }
    },

    props: {
      /**
       * 初始化后自动开始加载数据
       */
      autoload: {
        type: Boolean,
        default: true,
      },

      /**
       * 离组件最近的可滚动父级元素（用于监听事件及获取滚动条位置）
       */
      container: {
        // Selector or Element
        default: 'body',
      },

      /**
       * 禁用组件
       */
      disabled: {
        type: Boolean,
        default: false,
      },

      /**
       * Axios请求参数配置对象
       * {@link https://github.com/mzabriskie/axios#request-config}
       */
      options: {
        type: Object,
        default: null,
      },

      /**
       * 起始页码
       */
      page: {
        type: Number,
        default: 1,
      },

      /**
       * 每页加载数据条数
       */
      rows: {
        type: Number,
        default: 10,
      },

      /**
       * 数据加载请求地址
       */
      url: {
        type: String,
        default: '',
      },
    },

    computed: {
      /**
       * 是否可以加载
       * @returns {boolean} 是与否
       */
      loadable() {
        return !this.disabled && (!this.started || (this.page + this.times) <= this.count)
      },
    },

    mounted() {
      let container = this.container

      if (container) {
        if (typeof container === 'string') {
          container = document.querySelector(container)
        } else if (!container.querySelector) {
          container = document.body
        }
      }

      if (!container) {
        container = document.body
      }

      this.$container = container
      this.onPointerDown = this.pointerdown.bind(this)
      this.onPointerMove = this.pointermove.bind(this)
      this.onPointerUp = this.pointerup.bind(this)

      if (global.PointerEvent) {
        container.addEventListener('pointerdown', this.onPointerDown, false)
        container.addEventListener('pointermove', this.onPointerMove, false)
        container.addEventListener('pointerup', this.onPointerUp, false)
        container.addEventListener('pointercancel', this.onPointerUp, false)
      } else {
        container.addEventListener('touchstart', this.onPointerDown, false)
        container.addEventListener('touchmove', this.onPointerMove, false)
        container.addEventListener('touchend', this.onPointerUp, false)
        container.addEventListener('touchcancel', this.onPointerUp, false)
        container.addEventListener('mousedown', this.onPointerDown, false)
        container.addEventListener('mousemove', this.onPointerMove, false)
        container.addEventListener('mouseup', this.onPointerUp, false)
      }

      if (this.autoload) {
        this.load()
      }
    },

    // eslint-disable-next-line
    beforeDestroy() {
      const container = this.$container

      if (global.PointerEvent) {
        container.removeEventListener('pointerdown', this.onPointerDown, false)
        container.removeEventListener('pointermove', this.onPointerMove, false)
        container.removeEventListener('pointerup', this.onPointerUp, false)
        container.removeEventListener('pointercancel', this.onPointerUp, false)
      } else {
        container.removeEventListener('touchstart', this.onPointerDown, false)
        container.removeEventListener('touchmove', this.onPointerMove, false)
        container.removeEventListener('touchend', this.onPointerUp, false)
        container.removeEventListener('touchcancel', this.onPointerUp, false)
        container.removeEventListener('mousedown', this.onPointerDown, false)
        container.removeEventListener('mousemove', this.onPointerMove, false)
        container.removeEventListener('mouseup', this.onPointerUp, false)
      }

      if (this.loading && this.cancel) {
        this.cancel()
      }
    },

    methods: {
      /**
       * 加载一组数据的方法
       */
      load() {
        if (this.disabled || this.loading) {
          return
        }

        this.started = true
        this.loading = true

        const params = {
          currentPage: this.page + this.times,
          pageSize: this.rows,
        }
        const options = Object.assign({}, this.options, {
          url: this.url,
          cancelToken: new CancelToken((cancel) => {
            this.cancel = cancel
          }),
        })

        if (String(options.method).toUpperCase() === 'POST') {
          options.data = Object.assign({}, options.data, params)
        } else {
          options.params = Object.assign({}, options.params, params)
        }

        this.$axios.request(options).then((res) => {
          const data = res.result

          this.times += 1
          this.loading = false
          this.count = data.pageCount
          this.$emit('success', data.list)
          this.$emit('complete')
        }).catch((e) => {
          this.loading = false
          this.$emit('error', e)
          this.$emit('complete')
        })
      },

      /**
       * 重置加载相关变量
       */
      reset() {
        this.count = 0
        this.times = 0
        this.started = false
        this.loading = false
      },

      /**
       *重新开始加载
       */
      restart() {
        this.reset()
        this.load()
      },

      /**
       * 鼠标按下事件处理函数
       * @param {Object} e - 事件对象
       */
      pointerdown(e) {
        if (this.disabled || !this.loadable || this.loading) {
          return
        }

        this.dragging = true
        this.pageY = e.changedTouches ? e.changedTouches[0].pageY : e.pageY
      },

      /**
       * 鼠标移动事件处理函数
       * @param {Object} e - 事件对象
       */
      pointermove(e) {
        if (!this.dragging) {
          return
        }

        const container = this.$container
        const pageY = e.changedTouches ? e.changedTouches[0].pageY : e.pageY
        const moveY = pageY - this.pageY

        // 如果已经向下滚动到页面最底部
        if (moveY < 0 && (container.scrollTop + Math.min(
          global.innerHeight,
          container.clientHeight,
        )) >= container.scrollHeight) {
          // 阻止原生的上拉拖动会露出页面底部空白区域的行为（主要针对iOS版微信）
          e.preventDefault()

          // 如果上拉距离超过50像素，则加载下一页
          if (moveY < -50) {
            this.pageY = pageY
            this.load()
          }
        }
      },

      /**
       * 鼠标松开事件处理函数
       */
      pointerup() {
        this.dragging = false
      },
    },
  }
</script>
