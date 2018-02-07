import * as React from 'react'
import './loading.wizard.scss'
import { Button } from './button';

export class LoadingWizard extends React.PureComponent<{}> {
  render() {
    return (
      <div className="loadingWizard">
        <div className="panel">
          <div className="header">Step 1.</div>
          <div className="instruction">Select the Homebank file (extension .xhb).</div>
          <div className="actions">
            <div className="action">
              <Button caption="Go" style="primary" />
            </div>
            <div className="action">
              <Button caption="Cancel" />
            </div>
          </div>
        </div>
      </div>
    )
  }
}