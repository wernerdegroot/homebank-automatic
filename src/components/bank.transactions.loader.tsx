import * as React from 'react'
import { BankTransaction } from '../bank.transaction';
import { csvStringAsBankTransactions } from '../rabobank/csv';
import { readFile } from '../files/reader'
import 'rxjs/add/operator/map'
import { Validated } from '../util/validated';

type BankTransactionsLoaderProps = Readonly<{
  onLoad: (bankTransactions: Validated<string, BankTransaction[]>) => void
}>

export default class BankTransactionsLoader extends React.PureComponent<BankTransactionsLoaderProps> {

  private fileInputRef: HTMLInputElement | null = null

  render() {
    return (
      <div>
        <input type="file" ref={this.setFileInputRef} onChange={(e) => {
          this.forceUpdate()
        }} />
        <button type="button" disabled={!this.isLoadButtonEnabled()} onClick={this.onLoad}>Load</button>
      </div>
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

  onLoad = () => {
    if (this.fileInputRef !== null && this.fileInputRef.files !== null && this.fileInputRef.files.length === 1) {
      readFile(this.fileInputRef.files[0])
        .map(csvStringAsBankTransactions)
        .subscribe(this.props.onLoad)
    }
  }
}