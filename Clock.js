import React, { Component } from 'react';
import { Text, View } from 'react-native';
import styled from 'styled-components';

export default class Clock extends Component {
  constructor(props) {
    super(props);

    let date = new Date();

    this.state = {
      time: '--:--',
      sec: date.getSeconds() * 6,
      min: date.getMinutes() * 6 + (date.getSeconds() * 6) / 60,
      hour: ((date.getHours() % 12) / 12) * 360 + 90 + (date.getMinutes() * 6 + (date.getSeconds() * 6) / 60) / 12
    };
  }

  componentDidMount() {
    this.timer = setInterval(() => {
      let date = new Date();
      this.setState({
        time: `${date.getHours()}:${date.getMinutes()}`,
        sec: date.getSeconds() * 6,
        min: date.getMinutes() * 6 + (date.getSeconds() * 6) / 60,
        hour: ((date.getHours() % 12) / 12) * 360 + 90 + (date.getMinutes() * 6 + (date.getSeconds() * 6) / 60) / 12
      });
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  render() {
    const { time, sec, min, hour } = this.state;
    const {
      clockSize,
      clockCentreSize,
      clockBorderWidth,
      hourHandOffset,
      hourHandWidth,
      hourHandLength,
      hourHandCurved,
      hourHandColor,
      minuteHandOffset,
      minuteHandWidth,
      minuteHandLength,
      minuteHandCurved,
      minuteHandColor,
      secondHandOffset,
      secondHandLength
    } = this.props;

    return [
      <View key="digital">
        <Text style={{ color: 'white', fontSize: 50 }}>{time}</Text>
      </View>,
      <ClockFrame key="clock" size={clockSize} borderWidth={clockBorderWidth}>
        <ClockHolder borderWidth={clockBorderWidth} size={clockSize}>
          <HoursView
            size={clockSize}
            centerSize={clockCentreSize}
            handWidth={hourHandWidth}
            handLength={hourHandLength}
            handCurved={hourHandCurved}
            handColor={hourHandColor}
            style={[
              {
                transform: [{ rotate: hour + 'deg' }, { translateX: -(hourHandOffset + hourHandLength / 2) }]
              }
            ]}
          />

          <MinutesView
            size={clockSize}
            centerSize={clockCentreSize}
            handWidth={minuteHandWidth}
            handLength={minuteHandLength}
            handCurved={minuteHandCurved}
            handColor={minuteHandColor}
            style={[
              {
                transform: [{ rotate: min + 'deg' }, { translateY: -(minuteHandOffset + minuteHandLength / 2) }]
              }
            ]}
          />

          <SecondsView
            size={clockSize}
            centerSize={clockCentreSize}
            handWidth={minuteHandWidth}
            handLength={minuteHandLength}
            handCurved={minuteHandCurved}
            handColor={minuteHandColor}
            style={[
              {
                transform: [{ rotate: sec + 'deg' }, { translateY: -(secondHandOffset + secondHandLength / 2) }]
              }
            ]}
          />

          <ClockFace size={clockSize} centerSize={clockCentreSize} />
        </ClockHolder>
      </ClockFrame>
    ];
  }
}

const ClockFrame = styled.View`
  width: ${props => props.size};
  aspect-ratio: 1;
  position: relative;
  border-color: #26303e;
  border-width: ${props => props.borderWidth};
  border-radius: ${props => props.size / 2};
`;

const ClockHolder = styled.View`
  width: ${props => props.size};
  aspect-ratio: 1;
  position: absolute;
  right: ${props => -props.borderWidth};
  bottom: ${props => -props.borderWidth};
  border-color: transparent;
`;

const ClockFace = styled.View`
  width: ${props => props.centerSize};
  aspect-ratio: 1;
  background-color: white;
  top: ${props => (props.size - props.centerSize * 2) / 2};
  left: ${props => (props.size - props.centerSize * 2) / 2};
  transform: rotate(45deg);
`;

const ClockHand = styled.View`
  width: 0;
  height: 0;

  position: absolute;
  top: ${props => props.size / 2};
  left: ${props => props.size / 2};

  margin-left: ${props => -props.handLength / 2 - props.centerSize / 2};
  margin-top: ${props => -props.handWidth - props.centerSize / 2};
  margin-bottom: ${props => -props.handWidth};

  padding-top: ${props => props.handWidth};
  padding-bottom: ${props => props.handWidth};
  padding-left: ${props => props.handLength};

  border-top-left-radius: ${props => (props.handCurved ? props.handWidth : 0)};
  border-bottom-left-radius: ${props => (props.handCurved ? props.handWidth : 0)};

  background-color: ${props => (props.handColor ? props.handColor : 'white')};
`;

const HoursView = styled(ClockHand)``;

const MinutesView = styled(ClockHand)`
  margin-left: ${props => -props.centerSize / 2};
  margin-right: ${props => -props.centerSize / 2};
  margin-bottom: 0;
  margin-top: ${props => -props.handLength / 2 - props.centerSize / 2};

  padding-top: ${props => props.handLength};
  padding-bottom: 0;
  padding-left: ${props => props.handWidth};
  padding-right: ${props => props.handWidth};
`;

const SecondsView = styled(ClockHand)`
  margin-left: ${props => -props.centerSize / 2};
  margin-right: ${props => -props.centerSize / 2};
  margin-bottom: 0;
  margin-top: ${props => -props.handLength / 2 - props.centerSize / 2};

  padding-top: ${props => props.handLength};
  padding-bottom: 0;
  padding-left: ${props => props.handWidth};
  padding-right: ${props => props.handWidth};
`;

Clock.defaultProps = {
  clockSize: 220,
  clockBorderWidth: 6,
  clockCentreSize: 12,
  clockCentreColor: 'white',

  hourHandColor: '#F35656',
  hourHandCurved: true,
  hourHandLength: 80,
  hourHandWidth: 1,
  hourHandOffset: 0,

  minuteHandColor: 'white',
  minuteHandCurved: true,
  minuteHandLength: 70,
  minuteHandWidth: 2,
  minuteHandOffset: 0,

  secondHandLength: 70,
  secondHandOffset: 0
};
