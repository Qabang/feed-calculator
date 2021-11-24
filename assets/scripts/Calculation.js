class Calculation {
  constructor(data) {
    this.data = data.values
  }

  get baseNeed() {
    return this.calcBaseNeed()
  }

  get workNeed() {
    return this.calcWorkNeed(this.baseNeed)
  }

  get feedTotal() {
    return this.calcFeedTotal()
  }

  calcBaseNeed() {
    console.log('Getting calculation...')
    let mj = 0.5 * parseInt(this.data.weight) ** 0.75

    // General need for the adult easy keep horse.
    let baseNeed = {
      mj: mj,
      smrp: mj * 6,
      ca: parseFloat(this.data.weight / 100) * 4,
      p: parseFloat(this.data.weight / 100) * 2.8,
      mg: parseFloat(this.data.weight / 100) * 1.5,
      selenium: parseFloat(this.data.weight / 100) * 0.2,
    }

    // Alter values for enegy and protein based on if the horse is a hard keep or a normal keep.
    if (this.data.bodyType == 'type-normal') {
      baseNeed.mj = baseNeed.mj * 1.05
      baseNeed.smrp = baseNeed.smrp * 1.05
    } else if (this.data.bodyType == 'type-hard') {
      baseNeed.mj = baseNeed.mj * 1.1
      baseNeed.smrp = baseNeed.smrp * 1.1
    }

    // Round down to 2 decimals if needed.
    Object.keys(baseNeed).forEach((obj) => {
      baseNeed[obj] = Math.round((baseNeed[obj] + Number.EPSILON) * 100) / 100
    })
    console.log('Done calculation...')
    return baseNeed
  }

  calcWorkNeed(baseNeed) {
    // Set default values to 0.
    let walk_mj, walk_smrp, trot_mj, trot_smrp
    walk_mj = walk_smrp = trot_mj = trot_smrp = 0

    let workNeed = {
      mj: 0,
      smrp: 0,
      ca: 0,
      p: 0,
      mg: 0,
      selenium: 0,
    }

    // Calculate amount of energy and protein is being used based on the walk
    // and trot time.
    walk_mj = (((0.2 / 100) * this.data.weight) / 10) * this.data.walkTime
    walk_smrp = 6 * walk_mj

    trot_mj = (((1.3 / 100) * this.data.weight) / 10) * this.data.trotTime
    trot_smrp = 6 * trot_mj

    workNeed.mj = walk_mj + trot_mj
    workNeed.smrp = walk_smrp + trot_smrp

    const percent_work = (workNeed.mj / baseNeed.mj) * 100
    const weightParam = this.data.weight / 100

    // calculate minerals based on % of work.
    if (percent_work < 30 && percent_work > 0) {
      // If the work percent is less than 30% and above 0%.
      workNeed.ca = 6 * weightParam
      workNeed.p = 3.6 * weightParam
      workNeed.mg = 1.9 * weightParam
    } else if (percent_work >= 30 && percent_work < 50) {
      workNeed.ca = 7 * weightParam
      workNeed.p = 4.2 * weightParam
      workNeed.mg = 2.3 * weightParam
    } else if (percent_work > 50) {
      workNeed.ca = 8 * weightParam
      workNeed.p = 5.8 * weightParam
      workNeed.mg = 3 * weightParam
    }

    // Round down to 2 decimals if needed.
    Object.keys(workNeed).forEach((obj) => {
      workNeed[obj] = Math.round((workNeed[obj] + Number.EPSILON) * 100) / 100
    })

    return workNeed
  }

  calcFeedTotal() {
    const feedData = this.data
    let result = {
      mj: 0,
      smrp: 0,
      ca: 0,
      p: 0,
      mg: 0,
      selenium: 0,
    }

    let i = 1
    Object.keys(feedData).forEach((key) => {
      // Check if key value cointains the string. If add values to result.
      switch (true) {
        case key.includes('mj'):
          if (feedData[key] !== null) {
            let solidsPercent = feedData[`solids${i}`]
              ? feedData[`solids${i}`] / 100
              : 1
            let amount = feedData[`amount${i}`] || 0
            let sum = parseFloat(feedData[key]) * amount * solidsPercent
            result.mj += sum
          }
          break
        case key.includes('smrp'):
          if (feedData[key] !== null) {
            let solidsPercent = feedData[`solids${i}`]
              ? feedData[`solids${i}`] / 100
              : 1
            let amount = feedData[`amount${i}`] || 0
            let sum = parseFloat(feedData[key]) * amount * solidsPercent
            result.smrp += sum
          }
          break
        case key.includes('ca'):
          if (feedData[key] !== null) {
            let solidsPercent = feedData[`solids${i}`]
              ? feedData[`solids${i}`] / 100
              : 1
            let amount = feedData[`amount${i}`] || 0
            let sum = parseFloat(feedData[key]) * amount * solidsPercent
            result.ca += sum
          }
          break
        case key.includes('p'):
          if (feedData[key] !== null) {
            let solidsPercent = feedData[`solids${i}`]
              ? feedData[`solids${i}`] / 100
              : 1
            let amount = feedData[`amount${i}`] || 0
            let sum = parseFloat(feedData[key]) * amount * solidsPercent
            result.p += sum
          }
          break
        case key.includes('mg'):
          if (feedData[key] !== null) {
            let solidsPercent = feedData[`solids${i}`]
              ? feedData[`solids${i}`] / 100
              : 1
            let amount = feedData[`amount${i}`] || 0
            let sum = parseFloat(feedData[key]) * amount * solidsPercent
            result.mg += sum
          }
          break
        case key.includes('selenium'):
          if (feedData[key] !== null) {
            let solidsPercent = feedData[`solids${i}`]
              ? feedData[`solids${i}`] / 100
              : 1
            let amount = feedData[`amount${i}`] || 0
            let sum = parseFloat(feedData[key]) * amount * solidsPercent
            result.selenium += sum
          }
          break

        default:
          console.warn(key, 'The key is not handled in the switch statement')
          break
      }

      if (i < 10) {
        i++
      } else {
        i = 1
      }
    })

    // Round down to 2 decimals if needed.
    Object.keys(result).forEach((obj) => {
      result[obj] = Math.round((result[obj] + Number.EPSILON) * 100) / 100
    })

    return result
  }
}

export { Calculation }
