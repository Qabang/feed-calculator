class Calculation {
  constructor(data) {
    if (data.values === undefined) {
      throw new Error("Data is missing a 'values' key");
    }

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

  get toxicAmounts() {
    return this.calcToxicAmounts()
  }

  growthNeed(age) {
    let dailyGrowthRate = 0

    // Daily growth in Kg.
    if (age >= 1 && age < 2) {
      dailyGrowthRate = 0.00114 * parseFloat(this.data.weight)
    } else if (age >= 2 && age <= 3) {
      dailyGrowthRate = 0.0003 * parseFloat(this.data.weight)
    }

    let months = age * 12
    const a = 1350 + 67.94 * months - 1.093 * months ** 2
    return (dailyGrowthRate * a * 13.45) / 1000
  }

  baseNeedConstants(age) {
    let baseConstants = {
      mj: null,
      smrp: null,
      ca: null,
      p: null,
      mg: null,
      na: null,
      fe: null,
      cu: null,
      zn: null,
      mn: null,
      selenium: null,
    }

    switch (age !== null) {
      // The Young horse, age 1 years old.
      case age >= 1 && age < 2:
        baseConstants = {
          mj: 0.59,
          smrp: 7.5,
          ca: 7.5,
          p: 4.2,
          mg: 1.6,
          na: 3.8 * 0.4,
          fe: 50,
          cu: 12,
          zn: 50,
          mn: 50,
          selenium: 0.2,
        }

        break
      // The Young horse, age between 2-3 years old.
      case age >= 2 && age <= 3:
        baseConstants = {
          mj: 0.57,
          smrp: 6.5,
          ca: 6.2,
          p: 3.4,
          mg: 1.5,
          na: 5.1 * 0.4,
          fe: 50,
          cu: 12,
          zn: 50,
          mn: 50,
          selenium: 0.2,
        }
        break
      // The adult horse, age between 4-19 years old.
      case age > 3 && age <= 19:
        baseConstants = {
          mj: 0.5,
          smrp: 6,
          ca: 4,
          p: 2.8,
          mg: 1.9,
          na: 5.1 * 0.4,
          fe: 50,
          cu: 12,
          zn: 50,
          mn: 50,
          selenium: 0.2,
        }
        break
      // The old horse, age above 19 years old.
      case age > 19:
        baseConstants = {
          mj: 0.5,
          smrp: 12,
          ca: 4,
          p: 2.8,
          mg: 1.5,
          na: 5.1 * 0.4,
          fe: 50,
          cu: 12,
          zn: 50,
          mn: 50,
          selenium: 0.2,
        }
        break
      default:
        // TODO LOG ERROR console.log('Error in age switch:', age, baseConstants)
        break
    }

    return baseConstants
  }

  calcBaseNeed() {
    console.log("*** Calc base", this.data)
    const currentYear = new Date().getFullYear()
    const age = parseInt(currentYear) - parseInt(this.data.born)
    const baseConstants = this.baseNeedConstants(age)
    const growthAddition = this.growthNeed(age)
    let weight = parseFloat(this.data.weight)

    // Calculate weight if horse is growing.
    if (age >= 1 && age < 2) {
      weight = weight * 0.67
    } else if (age >= 2 && age <= 3) {
      weight = weight * 0.89
    }

    let mj = growthAddition + baseConstants.mj * weight ** 0.75

    // General need for the adult easy keep horse.
    let baseNeed = {
      mj: mj,
      smrp: mj * baseConstants.smrp,
      ca: (weight / 100) * baseConstants.ca,
      p: (weight / 100) * baseConstants.p,
      mg: (weight / 100) * baseConstants.mg,
      na: (weight / 100) * baseConstants.na,
      fe: (weight / 100) * baseConstants.fe,
      cu: (weight / 100) * baseConstants.cu,
      zn: (weight / 100) * baseConstants.zn,
      mn: (weight / 100) * baseConstants.mn,
      selenium: (weight / 100) * baseConstants.selenium,
    }
    console.log(baseNeed)
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
      na: 0,
      fe: 0,
      cu: 0,
      zn: 0,
      mn: 0,
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

    if (workNeed.mj > 0) {
      workNeed.fe = (50 * this.data.weight) / 100
      workNeed.mn = (50 * this.data.weight) / 100
      workNeed.cu = (13 * this.data.weight) / 100
      workNeed.zn = (50 * this.data.weight) / 100
    }

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
    const EXCLUDED_LABELS = ['name', 'solids', 'amount']
    const feedData = this.data
    let result = {
      mj: 0,
      smrp: 0,
      ca: 0,
      p: 0,
      mg: 0,
      na: 0,
      fe: 0,
      cu: 0,
      zn: 0,
      mn: 0,
      selenium: 0,
    }

    feedData.forEach((row) => {
      let solidsPercent = row[`solids`] ? row[`solids`] / 100 : 1
      let amount = row.amount || 0

      let filteredFeedDataKeys = Object.keys(row).filter(
        (key) => !EXCLUDED_LABELS.includes(key)
      )

      filteredFeedDataKeys.forEach((key) => {
        if (row[key] !== '') {
          let sum = parseFloat(row[key]) * amount * solidsPercent
          result[key] += sum
        }
      })
    })

    // Round down to 2 decimals if needed.
    Object.keys(result).forEach((obj) => {
      result[obj] = Math.round((result[obj] + Number.EPSILON) * 100) / 100
    })

    return result
  }

  calcToxicAmounts() {
    const currentYear = new Date().getFullYear()
    const age = parseInt(currentYear) - parseInt(this.data.profile.born)
    let weight = parseFloat(this.data.profile.weight)
    let values = {}

    // Calculate weight if horse is growing.
    if (age >= 1 && age < 2) {
      weight = weight * 0.67
    } else if (age >= 2 && age <= 3) {
      weight = weight * 0.89
    }

    weight = weight / 100

    const ToxicValues = {
      fe: 3000 * weight,
      mn: 3000 * weight,
      cu: 2400 * weight,
      zn: 1500 * weight,
      selenium: 5 * weight,
    }

    const feedResult = this.data.resultData

    Object.keys(ToxicValues).forEach((key) => {
      if (feedResult[key] >= ToxicValues[key]) {
        values[key] = ToxicValues[key]
      }
    })

    return values
  }
}

export { Calculation }
