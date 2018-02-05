import { Observable } from "rxjs/Observable";
import { Observer } from "rxjs/Observer";

export function readFile(file: File): Observable<string> {
  return Observable.create((observer: Observer<string>) => {
    const reader = new FileReader()
    reader.onload = () => {
      observer.next(reader.result)
      observer.complete()
    }
    reader.onerror = error => {
      observer.error(error)
    }
    reader.readAsText(file)
    return () => { }
  })
}