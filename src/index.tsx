import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { reducer } from './state/reducer';
import BankTransactionsLoader from './components/bank.transactions.loader'

ReactDOM.render(
  <Provider store={createStore(reducer)}>
    <BankTransactionsLoader onLoad={x => console.log(x)} /> 
  </Provider>,
  document.getElementById('root')
)

// import { test } from "./probabilities.tests";
// import { Observable } from 'rxjs/Observable'
// import { Observer } from "rxjs/Observer";
// import * as Papa from 'papaparse'
// import 'rxjs/add/operator/concatMap'
// import 'rxjs/add/operator/map'
// import 'rxjs/add/observable/of'
// import 'rxjs/add/observable/throw'
// import { CsvRecord, bankAccountColumn, nameColumn, parseDateFromCsvRecord, getWordsFromCsvRecord } from "./rabobank/csv";
// import { BankTransaction } from "./bank.transaction";
// import { documentXml } from "./homebank/document.xml";

// test()

// const button = document.getElementById('loadButton') as HTMLButtonElement
// if (button !== undefined) {
//   button.addEventListener('click', () => {

//     const selectedFileInput = document.getElementById('fileInput') as HTMLInputElement
//     if (selectedFileInput.files !== null) {
//       readFile(selectedFileInput.files[0])
//         .map(parseAsXml)
//         .map(documentXml)
//         // .concatMap(asCsvRecords)
//         // .map(toBankTransactions)
//         .subscribe(x => console.log(x), x => console.error(x))
//     }
//   })
// }

// function parseAsXml(s: string): Document {
//   const parser = new DOMParser()
//   return parser.parseFromString(s, "text/xml")
// }

// function readFile(file: File): Observable<string> {
//   return Observable.create((observer: Observer<string>) => {
//     const reader = new FileReader()
//     reader.onload = () => {
//       observer.next(reader.result)
//       observer.complete()
//     }
//     reader.onerror = error => {
//       observer.error(error)
//     }
//     reader.readAsText(file)
//     return () => { }
//   })
// }
