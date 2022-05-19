import { useEffect, useState } from 'react'
import './Quotas.scss'

function Quotas({ data }) {
  const [errors, setErrors] = useState({})
  const [caPQuota, setCaPQuota] = useState('')
  const [caMgQuota, setCaMgQuota] = useState('')
  const [smrpMjQuota, setSmrpMjQuota] = useState('')
  const [feCuQuota, setFeCuQuota] = useState('')
  const [znCuQuota, setZnCuQuota] = useState('')
  const [mnCuQuota, setMnCuQuota] = useState('')

  useEffect(() => {
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

  const checkErrors = async () => {
    let errObj = {}
    if (caPQuota !== '' && (caPQuota > 2.0 || caPQuota < 1.2)) {
      errObj.caP = 'Should be between 1.2 - 2.0'
    }

    if (caMgQuota !== '' && (caMgQuota > 2.0 || caMgQuota < 2.1)) {
      errObj.caMg = 'Should be between 1.5 - 2.1'
    }

    if (smrpMjQuota !== '' && (smrpMjQuota > 8.0 || smrpMjQuota < 6.0)) {
      errObj.smrpMj = 'Should be around 6-7 \n\n depending on the horse '
    }

    if (
      parseFloat(feCuQuota.split(':')[0]) > 4.5 ||
      parseFloat(feCuQuota.split(':')[0]) < 3.5
    ) {
      errObj.feCu = 'Should be 4:1'
    }

    if (
      parseFloat(znCuQuota.split(':')[0]) > 3.5 ||
      parseFloat(znCuQuota.split(':')[0]) < 2.5
    ) {
      errObj.znCu = 'Should be 3:1'
    }

    if (
      parseFloat(mnCuQuota.split(':')[0]) > 4.5 ||
      parseFloat(mnCuQuota.split(':')[0]) < 2.5
    ) {
      errObj.mnCu = 'Should be 3:1'
    }

    setErrors(errObj)
  }
  /**
   * function that calculatis the ratio between 2 values.
   * @returns string number-ratio to one
   */
  function calculateRatio(value1, value2) {
    for (let num = value2; num > 1; num--) {
      if (value1 % num == 0 && value2 % num == 0) {
        value1 = value1 / num
        value2 = value2 / num
      }
    }
    var ratio = round(value1 / value2, 1) + ' : 1'
    return ratio
  }

  // function that round down decimal values. defaults precision to 0 decimals.
  function round(value, precision) {
    var multiplier = Math.pow(10, precision || 0)
    return Math.round(value * multiplier) / multiplier
  }

  return (
    <>
      <h3>Quotas:</h3>
      <table id="quotas">
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
    </>
  )
}

export default Quotas
