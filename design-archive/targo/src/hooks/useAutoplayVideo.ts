import { useEffect, useRef } from 'react'

/** Retry muted playback when a browser delays or blocks background autoplay. */
export function useAutoplayVideo() {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const play = () => {
      video.muted = true
      video.defaultMuted = true
      if (video.paused) {
        try {
          void video.play()?.catch(() => {})
        } catch {
          // Some browsers throw synchronously before media is ready.
        }
      }
    }

    play()
    const retry = window.setInterval(play, 1000)
    video.addEventListener('canplay', play)
    document.addEventListener('click', play, { once: true })
    document.addEventListener('touchstart', play, { once: true, passive: true })

    return () => {
      window.clearInterval(retry)
      video.removeEventListener('canplay', play)
      document.removeEventListener('click', play)
      document.removeEventListener('touchstart', play)
    }
  }, [])

  return videoRef
}
