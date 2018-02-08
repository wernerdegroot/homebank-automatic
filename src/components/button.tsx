import * as React from 'react'
import './button.scss'

export class Button extends React.PureComponent<{ caption: string, style?: 'primary', disabled?: boolean }> {
  render() {
    const classNames = ['button']
    if (this.props.disabled !== undefined && this.props.disabled === true) {
      classNames.push('disabled')
    }
    if (this.props.style !== undefined) {
      classNames.push(this.props.style)
    }
    return <button type="button" disabled={this.props.disabled || false} className={classNames.join(' ')}>{this.props.caption}</button>
  }
}