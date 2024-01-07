class Timeouts {
  constructor () {
    this.inhaleAnimation = null
    this.inhaleCountdownInterval = null
    this.holdInAnimation = null
    this.holdInCountdownInterval = null
    this.exhaleAnimation = null
    this.exhaleCountdownInterval = null
    this.holdOutAnimation = null
    this.holdOutCountdownInterval = null
  }

  inhaleAnimation: ReturnType<typeof setTimeout> | null
  inhaleCountdownInterval: ReturnType<typeof setInterval> | null
  exhaleAnimation: ReturnType<typeof setTimeout> | null
  exhaleCountdownInterval: ReturnType<typeof setInterval> | null
  holdInAnimation: ReturnType<typeof setTimeout> | null
  holdInCountdownInterval: ReturnType<typeof setInterval> | null
  holdOutAnimation: ReturnType<typeof setTimeout> | null
  holdOutCountdownInterval: ReturnType<typeof setInterval> | null

  setInhaleAnimation (timer: ReturnType<typeof setTimeout>): boolean {
    if (this.inhaleAnimation !== null) {
      clearTimeout(this.inhaleAnimation)
    }
    this.inhaleAnimation = timer
    return true
  }

  setInhaleCountdownInterval (
    interval: ReturnType<typeof setInterval>
  ): boolean {
    if (this.inhaleCountdownInterval !== null) {
      clearInterval(this.inhaleCountdownInterval)
    }
    this.inhaleCountdownInterval = interval
    return true
  }

  setHoldInAnimation (timer: ReturnType<typeof setTimeout>): boolean {
    if (this.holdInAnimation !== null) {
      clearTimeout(this.holdInAnimation)
    }
    this.holdInAnimation = timer
    return true
  }

  setHoldInCountdownInterval (
    interval: ReturnType<typeof setInterval>
  ): boolean {
    if (this.holdInCountdownInterval !== null) {
      clearInterval(this.holdInCountdownInterval)
    }
    this.holdInCountdownInterval = interval
    return true
  }

  setHoldOutAnimation (timer: ReturnType<typeof setTimeout>): boolean {
    if (this.holdOutAnimation !== null) {
      clearTimeout(this.holdOutAnimation)
    }
    this.holdOutAnimation = timer
    return true
  }

  setHoldOutCountdownInterval (
    interval: ReturnType<typeof setInterval>
  ): boolean {
    if (this.holdOutCountdownInterval !== null) {
      clearInterval(this.holdOutCountdownInterval)
    }
    this.holdOutCountdownInterval = interval
    return true
  }

  setExhaleAnimation (timer: ReturnType<typeof setTimeout>): boolean {
    if (this.exhaleAnimation !== null) {
      clearTimeout(this.exhaleAnimation)
    }
    this.exhaleAnimation = timer
    return true
  }

  setExhaleCountdownInterval (
    interval: ReturnType<typeof setInterval>
  ): boolean {
    if (this.exhaleCountdownInterval !== null) {
      clearInterval(this.exhaleCountdownInterval)
    }
    this.exhaleCountdownInterval = interval
    return true
  }

  resetAnimations (): void {
    clearTimeout(this.inhaleAnimation!)
    this.inhaleAnimation = null
    clearInterval(this.inhaleCountdownInterval!)
    this.inhaleCountdownInterval = null
    clearTimeout(this.holdInAnimation!)
    this.holdInAnimation = null
    clearInterval(this.holdInCountdownInterval!)
    this.holdInCountdownInterval = null
    clearTimeout(this.exhaleAnimation!)
    this.exhaleAnimation = null
    clearInterval(this.exhaleCountdownInterval!)
    this.exhaleCountdownInterval = null
    clearTimeout(this.holdOutAnimation!)
    this.holdOutAnimation = null
    clearInterval(this.holdOutCountdownInterval!)
    this.holdOutCountdownInterval = null
  }
}

export const SharedIntervals = new Timeouts()
