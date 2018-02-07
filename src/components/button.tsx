import * as React from 'react'
import './button.scss'

export class Button extends React.PureComponent<{ caption: string, style?: 'primary' }> {
  render() {
    const classNames = ['button']
    if (this.props.style !== undefined) {
      classNames.push(this.props.style)
    }
    return <div className={classNames.join(' ')}>{this.props.caption}</div>
  }
}