import React, { Component } from 'react';
import { Text, View } from 'react-native';
import styled from 'styled-components';

/* Config - imports */
import COLORS from '../../config/colors';

/* Utils - imports */
import { getCurrentTime } from '../../utils/help';

export default class Clock extends Component {
  constructor(props) {
    super(props);

    this.state = getCurrentTime();
  }

  componentDidMount() {
    this.timer = setInterval(() => {
      this.setState(getCurrentTime());
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  rotateFunction(value, type, offset, length) {
    return {
      transform: [{ rotate: value + 'deg' }, { [type]: -(offset + length / 2) }]
    };
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
      secondHandWidth,
      secondHandLength,
      secondHandCurved,
      secondHandColor
    } = this.props;

    return [
      <View key="digital">
        <Text style={{ color: COLORS.white, fontSize: 50 }}>{time}</Text>
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
            style={[this.rotateFunction(hour, 'translateX', hourHandOffset, hourHandLength)]}
          />

          <MinutesView
            size={clockSize}
            centerSize={clockCentreSize}
            handWidth={minuteHandWidth}
            handLength={minuteHandLength}
            handCurved={minuteHandCurved}
            handColor={minuteHandColor}
            style={[this.rotateFunction(min, 'translateY', minuteHandOffset, minuteHandLength)]}
          />

          <SecondsView
            size={clockSize}
            centerSize={clockCentreSize}
            handWidth={secondHandWidth}
            handLength={secondHandLength}
            handCurved={secondHandCurved}
            handColor={secondHandColor}
            style={[this.rotateFunction(sec, 'translateY', secondHandOffset, secondHandLength)]}
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
  border-color: ${COLORS.clockBorder};
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

  background-color: ${props => (props.handColor ? props.handColor : COLORS.white)};
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
  clockCentreColor: COLORS.white,

  hourHandColor: COLORS.secondary,
  hourHandCurved: true,
  hourHandLength: 80,
  hourHandWidth: 1,
  hourHandOffset: 0,

  minuteHandColor: COLORS.white,
  minuteHandCurved: true,
  minuteHandLength: 70,
  minuteHandWidth: 2,
  minuteHandOffset: 0,

  secondHandColor: COLORS.white,
  secondHandCurved: true,
  secondHandLength: 90,
  secondHandWidth: 0.5,
  secondHandOffset: 0
};
