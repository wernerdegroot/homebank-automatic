import * as React from 'react'

import { Button } from '../button'

export class LoadHomebankStep extends React.PureComponent<{}> {

  private fileInputRef: HTMLInputElement | null = null

  render() {
    return (
      <>
      <div className="header">Step 1.</div>
      <div className="body">
        <p>Select the Homebank file (extension .xhb).</p>
        <input type="file" ref={this.setFileInputRef} onChange={(e) => {
          this.forceUpdate()
        }} />
      </div>
      <div className="actions">
        <div className="action">
          <Button caption="Next" style="primary" disabled={!this.isLoadButtonEnabled()} />
        </div>
        <div className="action">
          <Button caption="Back" disabled={true} />
        </div>
      </div>
      </>
    )
  }

  isLoadButtonEnabled(): boolean {
    return this.fileInputRef !== null
      && this.fileInputRef.files !== null
      && this.fileInputRef.files.length === 1
  }

  setFileInputRef = (ref: HTMLInputElement) => {
    this.fileInputRef = ref
  }
}