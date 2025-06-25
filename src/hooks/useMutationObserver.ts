import { ref, onMounted, onUnmounted } from 'vue'

const useMutationObserver = (target: any, callback: any, options: any) => {
  let observer

  const observe = () => {
    if (target.value) {
      observer = new MutationObserver(callback)
      observer.observe(target.value, options)
    }
  }

  const stop = () => {
    if (observer) {
      observer.disconnect()
      observer = null
    }
  }

  onMounted(() => {
    observe()
  })

  onUnmounted(() => {
    stop()
  })
}

export default useMutationObserver
