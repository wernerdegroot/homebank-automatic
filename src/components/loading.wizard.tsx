import * as React from 'react'
import './loading.wizard.scss'

export class LoadingWizard extends React.PureComponent<{}> {
  render() {
    return (
      <div className="loadingWizard">
        <div className="panel">
          <div className="header">Step 1.</div> 
          <div className="instruction">Select the Homebank file (extension .xhb).</div>
          <div className="actions">What</div>
        </div>
      </div>
    )
  }
}