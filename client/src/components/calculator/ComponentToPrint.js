import * as React from 'react'
import PdfView from './PdfView'

export class ComponentToPrint extends React.PureComponent {
  constructor(props) {
    super(props)

    this.state = { checked: false }
  }
  canvasEl

  setRef = (ref) => (this.canvasEl = ref)

  render() {
    const { feedData, profileName, work, calculations, quotas, warnings } =
      this.props

    if (calculations[0] === undefined || calculations[0] === null) {
      return 'Something went wrong, Please try again or contact me about this error, at sandra.lindstrm@gmail.com'
    }

    return (
      <PdfView
        feedData={feedData}
        profileName={profileName}
        work={work}
        calculations={calculations}
        quotas={quotas}
        warnings={warnings}
      />
    )
  }
}

export const FunctionalComponentToPrint = React.forwardRef((props, ref) => {
  return (
    <ComponentToPrint
      ref={ref}
      feedData={props.feedData}
      profileName={props.profileName}
      work={props.work}
      calculations={props.calculations}
      quotas={props.quotas}
      warnings={props.warnings}
    />
  )
})
