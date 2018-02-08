import * as React from 'react'

export class FileSelector extends React.PureComponent<{}> {

  private fileInputRef: HTMLInputElement | null = null

  render() {
    return (
      <input name="" className="file-selector-input" type="file" ref={this.setFileInputRef} onChange={(e) => {
        this.forceUpdate()
      }} />
    )
  }

  private setFileInputRef = (ref: HTMLInputElement) => {
    this.fileInputRef = ref
  }
}