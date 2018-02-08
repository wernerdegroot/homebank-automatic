import * as React from 'react'
import './loading.wizard.scss'
import { Button } from './button';
import { LoadHomebankStep } from './loading.wizard/load.homebank.step';

export class LoadingWizard extends React.PureComponent<{}> {
  render() {
    return (
      <div className="loadingWizard">
        <div className="panel">
          <LoadHomebankStep />
        </div>
      </div>
    )
  }
}