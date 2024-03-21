import { useEffect, useState } from 'react'
import './Quotas.scss'
import HelpBox from './HelpBox'

function Quotas({ data }) {
  const [errors, setErrors] = useState({})
  const [caPQuota, setCaPQuota] = useState('')
  const [caMgQuota, setCaMgQuota] = useState('')
  const [smrpMjQuota, setSmrpMjQuota] = useState('')
  const [feCuQuota, setFeCuQuota] = useState('')
  const [znCuQuota, setZnCuQuota] = useState('')
  const [mnCuQuota, setMnCuQuota] = useState('')

  useEffect(() => {
    /**
     * function that calculatis the ratio between 2 values.
     * @returns string number-ratio to one
     */
    function calculateRatio(value1, value2) {
      for (let num = value2; num > 1; num--) {
        if (value1 % num === 0 && value2 % num === 0) {
          value1 = value1 / num
          value2 = value2 / num
        }
      }
      var ratio = round(value1 / value2, 1) + ' : 1'
      return ratio
    }

    const checkErrors = async () => {
      let errObj = {}
      // calcium/phosphor
      if (caPQuota !== '' && (caPQuota > 2.0 || caPQuota < 1.2)) {
        errObj.caP = 'Should be between 1.2 - 2.0'
      }
      // calcium/magnesium
      if (caMgQuota !== '' && (caMgQuota > 2.1 || caMgQuota < 1.5)) {
        errObj.caMg = 'Should be between 1.5 - 2.1'
      }

      if (smrpMjQuota !== '' && (smrpMjQuota > 8.0 || smrpMjQuota < 6.0)) {
        errObj.smrpMj = 'Should be around 6 \n\n depending on the horse '
      }

      if (
        parseFloat(feCuQuota.split(':')[0]) > 4.5 ||
        parseFloat(feCuQuota.split(':')[0]) < 3.0
      ) {
        errObj.feCu = 'Should be between 3:1 - 4:1'
      }

      if (
        parseFloat(znCuQuota.split(':')[0]) > 4.5 ||
        parseFloat(znCuQuota.split(':')[0]) < 3.0
      ) {
        errObj.znCu = 'Should be between 3:1 - 4:1'
      }

      if (
        parseFloat(mnCuQuota.split(':')[0]) > 4.5 ||
        parseFloat(mnCuQuota.split(':')[0]) < 3.0
      ) {
        errObj.mnCu = 'Should be between 3:1 - 4:1'
      }

      setErrors(errObj)
    }

    if (data.ca !== 0 && data.p !== 0) {
      setCaPQuota(round(data.ca / data.p, 1))
    }

    if (data.ca !== 0 && data.mg !== 0) {
      setCaMgQuota(round(data.ca / data.mg, 1))
    }
    if (data.smrp !== 0 && data.mj !== 0) {
      setSmrpMjQuota(round(data.smrp / data.mj, 1))
    }

    if (data.cu !== 0) {
      if (data.fe !== 0) {
        setFeCuQuota(calculateRatio(data.fe, data.cu))
      }
      if (data.zn !== 0) {
        setZnCuQuota(calculateRatio(data.zn, data.cu))
      }
      if (data.mn !== 0) {
        setMnCuQuota(calculateRatio(data.mn, data.cu))
      }
    }

    return checkErrors()
  }, [data, caPQuota, caMgQuota, smrpMjQuota, feCuQuota, znCuQuota, mnCuQuota])

  // function that round down decimal values. defaults precision to 0 decimals.
  function round(value, precision) {
    var multiplier = Math.pow(10, precision || 0)
    return Math.round(value * multiplier) / multiplier
  }

  return (
    <>
      <section className='quotas-wrapper'>

        <HelpBox>
          {/* //TODO FIX CONTENT */}
          in the pony mare. This does not take into account other pro-
          tein needs of the uterus. Using only fetal protein deposition
          and the 50 percent efficiency of use of protein in pregnancy
          for fetal growth estimated by Meyer (1983a) results in an
          additional need of 130 g CP/d and 45 g CP/d over mainte-
          nance for fetal growth in the horse and pony, respectively.
          Using a digestibility of 79 percent, in order to provide 130 g
          and 45 g of protein for fetal growth, an additional 165 g and
          57 g of CP must be provided in the diet for horses (500kg)
          and ponies (200kg), respectively. Bell et al. (1995) deter-
          mined body composition of calves of known gestational age.
          Nonlinear regression was applied, and an equation estimated
          total fetal and uterine protein deposition. Fetal protein dep-
          osition was much higher for calves than that estimated by
          Platt’s (1984) equation and Meyer’s (1983a) estimation of
          fetal protein composition for horses. The difference between
          fetal protein deposition and total uterine protein deposition
          (assumed to be placental protein need), however, was ap-
          proximately 20 g CP/d. Using 50 percent efficiency, this
          adds 40 g CP/d to the mare’s need during mid- to late preg-
          nancy. Therefore, the 5

        </HelpBox>
        <table id="quotas" cellPadding={0} cellSpacing={0}>
          <thead>
            <tr>
              <th>Energy / protein</th>
              <th>Macro minerals</th>
              <th>Micro minerals</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <span className="cell-title">Mj / smrp</span>
                {smrpMjQuota || '-'}
                {errors.smrpMj && (
                  <span className="cell-error">{errors.smrpMj}</span>
                )}
              </td>
              <td>
                <span className="cell-title">Ca / P</span>
                {caPQuota || '-'}
                {errors.caP && <span className="cell-error">{errors.caP}</span>}
              </td>
              <td>
                <span className="cell-title">Fe / Cu</span>
                {feCuQuota || '-'}
                {errors.feCu && <span className="cell-error">{errors.feCu}</span>}
              </td>
            </tr>
            <tr>
              <td></td>
              <td>
                <span className="cell-title">Ca / Mg</span>
                {caMgQuota || '-'}
                {errors.caMg && <span className="cell-error">{errors.caMg}</span>}
              </td>
              <td>
                <span className="cell-title">Zn / Cu</span>
                {znCuQuota || '-'}
                {errors.znCu && <span className="cell-error">{errors.znCu}</span>}
              </td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td>
                <span className="cell-title">Mn / Cu</span>
                {mnCuQuota || '-'}
                {errors.mnCu && <span className="cell-error">{errors.mnCu}</span>}
              </td>
            </tr>
          </tbody>
        </table>
      </section>
    </>
  )
}

export default Quotas
