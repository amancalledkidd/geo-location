import { Component, type ReactChild, type ReactChildren } from 'react'

interface ScriptLoadedState {
  scriptLoaded: boolean
}

interface ScriptLoadedProps {
  // eslint-disable-next-line @typescript-eslint/ban-types
  children: ReactChild | ReactChildren | Function
}

function SpanIntro(): JSX.Element {
  return (
    <span>
      <a href='#section-introduction'>Enter API Key</a> to see examples
    </span>
  )
}

class ScriptLoaded extends Component<ScriptLoadedProps, ScriptLoadedState> {
    interval: number | undefined;
  
    constructor(props: ScriptLoadedProps) {
      super(props);
      this.state = {
        scriptLoaded: !!window.google,
      };
    }
  
    componentDidMount() {
      this.interval = window.setInterval(this.checkIfScriptLoaded, 200);
    }
  
    checkIfScriptLoaded = (): void => {
      if (window.google && !this.state.scriptLoaded) {
        this.setState({ scriptLoaded: true }, this.setScriptLoadedCallback);
      }
    };
  
    setScriptLoadedCallback = (): void => {
      window.clearInterval(this.interval);
    };
  
    componentWillUnmount(): void {
      window.clearInterval(this.interval);
    }
  
    render(): JSX.Element {
      if (!this.state.scriptLoaded) {
        return <SpanIntro />;
      }
  
      return this.props.children instanceof Function ? this.props.children() : this.props.children;
    }
  }

export default ScriptLoaded