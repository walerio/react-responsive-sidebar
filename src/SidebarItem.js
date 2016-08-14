import React, { Component, PropTypes } from 'react';
import LinkContainer from './LinkContainer';
import color from 'color';
import Radium from 'radium'

class SidebarItem extends Component {

  constructor(props) {
    super(props)
    this.state = {
      hover: false
    }
    this.onClick = this.onClick.bind(this)
    this.onMouseEnter = this.onMouseEnter.bind(this)
    this.onMouseLeave = this.onMouseLeave.bind(this)
  }

  onClick() {
    if (this.props.onClick) {
      this.props.onClick()
    }
  }

  onMouseEnter() {
    this.setState({hover: true})
  }

  onMouseLeave() {
    this.setState({hover: false})
  }

  icon = (i, style) => {
    return i ? <div style={style}>{i}</div> : null
  };

  render() {

    let background = this.props.background
    const type = this.props.type
    if (type === "header") {
      if (this.state.hover) {
        background = color(this.props.background).darken(0.4).hexString()
      } else {
        background = color(this.props.background).darken(0.3).hexString()
      }
    } else if (type === "selector") {
      if (this.state.hover) {
        background = color(this.props.background).darken(0.25).hexString()
      } else {
        background = color(this.props.background).darken(0.2).hexString()
      }
    } else if (this.state.hover) {
      background = color(this.props.background).lighten(0.4).hexString()
    } else if (this.props.href && this.context.router && this.context.router.isActive(this.props.href)) {
      background = color(this.props.background).lighten(0.3).hexString()
    }

    const styles = getStyles(this.props);

    const selectorIconStyle = {
      float: 'right'
    }

    const { leftIcon, rightIcon } = this.props


    // const icon = this.props.icon ? type === "selector" ? null : <div style={iconStyle}>{this.props.icon}</div> : null
    // const selectorIcon = type === "selector" ? <div style={selectorIconStyle}>{this.props.icon}</div> : null

    return (
      <LinkContainer
        style={styles.container}
        href={this.props.href}
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}
        onClick={this.props.onClick}>
        {this.icon(leftIcon, styles.icons.left)}
        {this.props.title}
        {this.icon(rightIcon, styles.icons.right)}
      </LinkContainer>
    )
  }
}

SidebarItem.defaultProps = {
  textAlign: 'left',
  // background: "#009688",
}

SidebarItem.propTypes = {
  title: PropTypes.string,
  background: PropTypes.string,
  color: PropTypes.string,
  href: PropTypes.string,
  leftIcon: PropTypes.element,
  rightIcon: PropTypes.element,
  textAlign: PropTypes.string,
  onClick: PropTypes.func,
}

SidebarItem.contextTypes = {
  router: React.PropTypes.object
}

const getStyles = (props) => {
  return {
    container: {
      width: '100%',
      height: '48px',
      background: props.background,
      color: props.color,
      lineHeight: '30px',
      textAlign: props.textAlign,
      fontSize: props.type === "header" ? '14px' : '18px',
      fontWeight: 700,
      padding: '10px 14px',
      boxSizing: 'border-box',
      cursor: 'pointer'
    },
    icons: {
      left: {
        float: 'left',
        marginRight: '14px',
        lineHeight: '24px',
      },
      right: {
        float: 'right',
        marginLeft: '14px',
        lineHeight: '24px',
      }
    },
  }
}

export default Radium(SidebarItem);
